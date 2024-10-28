library(ggplot2)
library(tidyr)


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
	print(data_for_plot)
	pl <- ggplot(data_for_plot) +
		geom_line(aes(x=Prior, y=value, group=name, colour=name, linetype=name, size=name)) +
		labs(x="Prior", y="Posterior") + 
		coord_cartesian(xlim=c(0, 1), ylim=c(0, 1), expand=FALSE) +
		scale_color_manual("", values = c("PosteriorBelief"="darkblue", "PriorBelief"="black")) + 
		scale_linetype_manual("", values = c("PosteriorBelief"=1, "PriorBelief"=2)) + 
		scale_size_manual("", values = c("PosteriorBelief"=1.4, "PriorBelief"=1)) +
		theme(legend.position=c(.095,0.95))
	print(pl)
	ggsave(paste("plot", as.character(pvalue), ".pdf"), plot=pl, device="pdf")
}

pvalues = c(0.001, 0.05, 0.5)

lapply(pvalues, plot_for_pvalue)







