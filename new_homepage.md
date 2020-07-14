# Jonas Groschwitz

<img align= right width=300 src="http://www.coli.uni-saarland.de/~jonasg/profile.jpg" alt="That's me"/>

[Google Scholar](https://scholar.google.com/citations?user=T6vXIdwAAAAJ) | [Semantics Scholar](https://www.semanticscholar.org/author/Jonas-Groschwitz/2960997) | [CV](http://www.coli.uni-saarland.de/~jonasg/CV_Eng.pdf)


Email: jonasg (Klammeraffe) coli.uni-saarland.de
Location: Room 1.03 in Building C7.2 
<br>

## About me

I'm a PostDoc at Saarland University in the group of Alexander Koller. I'm a computational linguist but also a mathematician (and I'm afraid it might show sometimes). Welcome to my humble online home!


## Research Interests

Generally speaking, I am interested in the intersection of symbolic and neural methods. Specifically, I spent my PhD developing a new algebra for semantic composition (the AM algebra) and a neural semantic graph parser that does not predict the semantic graph directly, but rather an *AM dependency tree* that serves as a compositional structure, constructing the graph from its lexical parts. And it [works](https://www.aclweb.org/anthology/P19-1450/)!

Current research interests include compositional methods for natural language generation, as well as semi- and unsupervised methods for learning symbolic latent variables.

## PhD Thesis

My thesis develops the AM dependency parser, a semantic parser for Abstract Meaning Representation (AMR; [Banarescu et al., 2013](https://www.aclweb.org/anthology/W13-2322/)) that owes its strong performance to its effective combination of neural and compositional methods. The AM dependency parser drops the restrictive syntactic constraints of classic compositional approaches, instead relying only on semantic types and meaningful semantic operations as structural guides. The ability of neural networks to encode contextual information allows the parser to make correct decisions in the absence of hard syntactic constraints.

Consequently, the thesis focuses on terms for semantic representations, which are algebraic ‘building instructions’. The thesis first examines the suitability of the HR algebra (a general tool for building graphs; [Courcelle and Engelfriet, 2012](https://www.labri.fr/perso/courcell/Book/TheBook.pdf)) for this purpose; finds it unsuitable; and then develops the linguistically motivated AM algebra. Representing the terms over the AM algebra as dependency trees further simplifies the semantic construction. In particular, the move from the HR algebra to the AM algebra and then to AM dependency trees drastically removes the ambiguity of latent structural information required for training the model. In conclusion, using the AM dependency trees as latent structures we obtain a simple compositional semantic parser, where neural tagging and dependency models predict interpretable, meaningful operations that construct the AMR.

* [**Jonas Groschwitz** (2019), PhD thesis](http://www.coli.uni-saarland.de/~jonasg/thesis.pdf), *Methods for taking semantic graphs apart and putting them back together again*, Saarland University and Macquarie University

## Publications

### 2019

* Donatelli, L., Fowlie, M., **Groschwitz, J.**, Koller, A., Lindemann, M., Mina, M., & Weißenhorn, P. (2019). [Saarland at MRP 2019: Compositional parsing across all graphbanks](https://www.aclweb.org/anthology/K19-2006/) . In *Proceedings of the Shared Task on Cross-Framework Meaning Representation Parsing at the 2019 Conference on Natural Language Learning *(pp. 66-75).

* Lindemann, M., **Groschwitz, J.**, & Koller, A. (2019). [Compositional Semantic Parsing across Graphbanks.](https://www.aclweb.org/anthology/P19-1450/)  In *Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics* (ACL 57) (pp. 4576-4585).

	>Most semantic parsers that map sentences to graph-based meaning representations are hand-designed for specific graphbanks. We present a compositional neural semantic parser which achieves, for the first time, competitive accuracies across a diverse range of graphbanks. Incorporating BERT embeddings and multi-task learning improves the accuracy further, setting new states of the art on DM, PAS, PSD, AMR 2015 and EDS.

### 2018

* **Jonas Groschwitz**, Matthias Lindemann, Meaghan Fowlie, Mark Johnson, and Alexander Koller. [AMR Dependency Parsing with a Typed Semantic Algebra](https://www.aclweb.org/anthology/P18-1170/) . In *Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics* (ACL), Melbourne 

	>We present a semantic parser for Abstract Meaning Representations which learns to parse strings into tree representations of the compositional structure of an AMR graph. This allows us to use standard neural techniques for supertagging and dependency tree parsing, constrained by a linguistically principled type system. We present two approximative decoding algorithms, which achieve state-of-the-art accuracy and outperform strong baselines.
	


### 2017

* **Jonas Groschwitz**, Meaghan Fowlie, Mark Johnson, and Alexander Koller.[ A constrained graph algebra for semantic parsing with AMRs.](https://www.aclweb.org/anthology/W17-6810/)  In *Proceedings of the 12th International Conference on Computational Semantics* (IWCS), Montpellier.

* Teichmann, C., Koller, A., & **Groschwitz, J**. (2017)).[Coarse-to-fine parsing for expressive grammar formalisms.](https://www.aclweb.org/anthology/W17-6317/)  In Proceedings of the 15th International Conference on Parsing Technologies (pp. 122-127). 

	>We generalize coarse-to-fine parsing to grammar formalisms that are more expressive than PCFGs and/or describe languages of trees or graphs. We evaluate our algorithm on PCFG, PTAG, and graph parsing. While we achieve the expected performance gains on PCFGs, coarse-to-fine does not help for PTAG and can even slow down parsing for graphs. We discuss the implications of this finding.
	
*  **Groschwitz, J.** and Szabó, T. (2017) [Sharp Thresholds for Half-Random Games II](http://arxiv.org/abs/1602.04628) Graphs and Combinatorics Volume 33, Issue 2, 1 March 2017, Pages 387-401

 	>We study biased Maker-Breaker positional games between two players, one of whom is playing randomly against an opponent with an optimal strategy. In this work we focus on the case of Breaker playing randomly and Maker being “clever”. The reverse scenario is treated in a separate paper. We determine the sharp threshold bias of classical games played on the edge set of the complete graph Kn, such as connectivity, perfect matching, Hamiltonicity, and minimum degree-1 and -2. In all of these games, the threshold is equal to the trivial upper bound implied by the number of edges needed for Maker to occupy a winning set. Moreover, we show that CleverMaker can not only win against asymptotically optimal bias, but can do so very fast, wasting only logarithmically many moves (while the winning set sizes are linear in n).


### 2016

* **Jonas Groschwitz**, Alexander Koller and Mark Johnson, [Efficient techniques for parsing with tree automata.](https://www.aclweb.org/anthology/P16-1192/)  In Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics (ACL), Berlin.
### 2015

* **Jonas Groschwitz**, Alexander Koller and Christoph Teichmann, [Graph parsing with s-graph grammars](https://www.aclweb.org/anthology/P15-1143/). In *Proceedings of the 53rd Annual Meeting of the Association for Computational Linguistics and the 7th International Joint Conference on Natural Language Processing* (Volume 1: Long Papers) (pp. 1481-1490).)

	>A  key  problem  in  semantic  parsing  withgraph-based  semantic  representations  isgraph  parsing,   i.e.  computing  all  pos-sible  analyses  of  a  given  graph  accord-ing  to  a  grammar.    This  problem  arisesin   training   synchronous   string-to-graphgrammars,  and  when  generating  stringsfrom them. We present two algorithms forgraph  parsing  (bottom-up  and  top-down)with  s-graph  grammars.    On  the  relatedproblem of graph parsing with hyperedgereplacement  grammars,  our  implementa-tions outperform the best previous systemby several orders of magnitude.
	
* **Groschwitz, J.** and Szabó, T. (2016), Sharp thresholds for half‐random games I.[Sharp thresholds for half‐random games I.](https://arxiv.org/abs/1507.06688)  Random Structures and Algorithms, 49: 766-794. doi:10.1002/rsa.20681

	>We study biased Maker-Breaker positional games between two players, one of whom is playing randomly against an opponent with an optimal strategy. In this paper we consider the scenario when Maker plays randomly and Breaker is “clever”, and determine the sharp threshold bias of classical graph games, such as connectivity, Hamiltonicity, and minimum degree-k. We treat the other case, that is when Breaker plays randomly, in a separate paper. The traditional, deterministic version of these games, with two optimal players playing, are known to obey the so-called probabilistic intuition. That is, the threshold bias of these games is asymptotically equal to the threshold bias of their random counterpart, where players just take edges uniformly at random. We find, that despite this remarkably precise agreement of the results of the deterministic and the random games, playing randomly against an optimal opponent is not a good idea: the threshold bias tilts significantly more towards the random player. An important qualitative aspect of the probabilistic intuition carries through nevertheless: the bottleneck for Maker to occupy a connected graph is still the ability to avoid isolated vertices in her graph.
	


<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI4ODIwMzk4NSw2Nzc3OTA4NjVdfQ==
-->