# Research scope and conclusions

Checked: **2026-09-22**

The website in `docs/` was synthesized from primary papers, official repositories, and official framework documentation. The complete linked bibliography is maintained on [`docs/sources.html`](../docs/sources.html).

## Core conclusions

1. `USER.md`, `MEMORY.md`, and dated Markdown notes are useful file conventions, not industry standards.
2. The cross-system architectural convergence is progressive disclosure: tiny always-on orientation, searchable deeper memory, and provenance-linked raw evidence.
3. Retrieval is necessary for attention, latency, cost, freshness, authorization, contradiction handling, and diagnosis—not only context-window size.
4. No universal retriever is state of the art. The practical frontier is a composite pipeline of hard filters, lexical and semantic candidates, fusion, reranking, bounded evidence assembly, and iterative search when needed.
5. Dense embeddings alone are weak on exact identifiers, temporal state, relational evidence, multi-hop completeness, and global synthesis.
6. Benchmark retrieval, fixed-reader QA, and whole-agent outcomes separately.
7. Current task-specific exemplars include Hindsight for conversational memory, HippoRAG 2 for associative multi-hop retrieval, Graphiti for temporal facts, and AgentRunbook-C for file-native environment experience.
8. Cross-paper scores are not directly comparable unless data versions, writers, readers, prompts, judges, and budgets are held constant.

## First benchmark suite

- Private product-shaped qrels on every change
- Cleaned LongMemEval and current LoCoMo as the first public conversation suites
- MemBench slices and MemoryAgentBench EventQA/FactConsolidation for broader capabilities
- LongMemEval-V2 for trajectory memory
- MemoryArena only when claiming improved task-agent outcomes
- BEIR, MTEB/AIR-Bench, and BRIGHT for retriever screening, not headline memory claims
