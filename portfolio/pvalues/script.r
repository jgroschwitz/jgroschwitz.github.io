library(ggplot2)  # for drawing the plots
library(tidyr)  # for reshaping the data for the plots
library(xtable)  # for exporting as latex table


compute_posterior <- function(prior, pvalue) {
	denominator = pvalue*prior
	divisor = pvalue*prior + 1 - prior
	return (denominator/divisor)
}

plot_for_pvalue <- function(pvalue) {
	priors_for_plot = c(0:100)*0.01
	posteriors = unlist(lapply(priors_for_plot, function(x) compute_posterior(x, pvalue)))
	data_for_plot <- data.frame("Prior" = priors_for_plot, "PosteriorBelief" = posteriors, "PriorBelief" = priors_for_plot)
	data_for_plot <- pivot_longer(data_for_plot, cols=c("PosteriorBelief", "PriorBelief"), names_to="name", values_to="value")
	legend_labels = c("PosteriorBelief"="Posterior Belief", "PriorBelief"="Reference: If Belief Unchanged")
	print(data_for_plot)
	pl <- ggplot(data_for_plot) +
		geom_line(aes(x=Prior, y=value, group=name, colour=name, linetype=name, size=name)) +
		labs(x="Belief before experiment (Prior)", y="Belief after Experiment (Posterior)") + 
		coord_cartesian(xlim=c(0, 1), ylim=c(0, 1), expand=FALSE) +
		scale_color_manual("", values = c("PosteriorBelief"="darkblue", "PriorBelief"="black"), labels = legend_labels) + 
		scale_linetype_manual("", values = c("PosteriorBelief"=1, "PriorBelief"=2), labels = legend_labels) + 
		scale_size_manual("", values = c("PosteriorBelief"=1.4, "PriorBelief"=1), labels = legend_labels) +
		theme(legend.position=c(.255, 0.98)) +
		theme(text=element_text(size=18)) + 
		theme(axis.title.x = element_text(margin = margin(t = 10, r = 0, b = 0, l = 0))) + 
		theme(axis.title.y = element_text(margin = margin(t = 0, r = 10, b = 0, l = 0))) +
		theme(plot.margin = margin(t = 20, r = 20, b = 10, l = 10))
	print(pl)
	ggsave(paste("plot", as.character(pvalue), ".pdf"), plot=pl, device="pdf")
}

pvalues = c(0.001, 0.01, 0.05, 0.5)

lapply(pvalues, plot_for_pvalue)

write_table_for_pvalue <- function(pvalue) {
	priors_for_table = c(0.001, 0.05, 0.2, 0.5, 0.8, 0.95, 0.999)
	posteriors = unlist(lapply(priors_for_table, function(x) compute_posterior(x, pvalue)))
	data_frame = data.frame("Prior" = priors_for_table, "Posterior" = posteriors)
	data_frame = t(data_frame)
	print(data_frame)
	print.xtable(xtable(data_frame, digits=c(2), align=c("llllllll"), display=c("fg", "fg", "fg", "fg", "fg", "fg", "fg", "fg")), include.colnames = FALSE, file = paste("table", as.character(pvalue), ".tex"))
}

lapply(pvalues, write_table_for_pvalue)






