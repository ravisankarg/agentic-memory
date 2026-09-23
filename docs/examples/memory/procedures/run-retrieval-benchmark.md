---
id: proc_retrieval_benchmark_v1
type: procedure
scope:
  project_id: agentic-memory
status: active
observed_at: 2026-09-22T17:45:00+05:30
valid_from: 2026-09-22
provenance: derived
trust: reviewed
sensitivity: public
---

# Run a retrieval benchmark

1. Pin the corpus, query set, qrels, chunker, and random seed.
2. Ingest events sequentially and capture write/index latency.
3. Run BM25, dense, hybrid RRF, and hybrid + reranker with identical memory units.
4. Apply authorization, scope, status, and valid-time filters before ranking.
5. Report strict Recall-all@k, Recall-any@k, nDCG, MRR, context tokens, and p50/p95 latency.
6. Feed each evidence pack to the same frozen reader and prompt.
7. Compare no-memory, full-context, and oracle-evidence controls.
8. Classify errors as retrieval, stale/conflicting evidence, reader, or abstention failures.
9. Add graph, hierarchy, or iterative search only if the error table identifies a matching gap.
10. Save retrieved IDs, scores, prompts, outputs, and judge rationales for reproducibility.
