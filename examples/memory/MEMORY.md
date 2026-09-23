# Durable memory index

This is a compact, curated router into deeper memory. It is not a transcript archive.

## Current project decisions

- Canonical memory remains human-readable Markdown plus append-only source events.
- Search indexes are rebuildable sidecars and never the source of truth.
- The first retrieval baseline is scope/time filtering, BM25 + dense candidates, RRF, reranking, and bounded source expansion.
- Graph, hierarchy, and agentic search require benchmark evidence before adoption.

## Topic index

- Project state: [`entities/project-agentic-memory.md`](entities/project-agentic-memory.md)
- Benchmark procedure: [`procedures/run-retrieval-benchmark.md`](procedures/run-retrieval-benchmark.md)
- Latest working notes: [`daily/2026-09-22.md`](daily/2026-09-22.md)

## Maintenance contract

- Keep this file compact enough to load as startup orientation.
- Promote only durable, well-supported information.
- Update or supersede contradictions; do not leave two facts marked current.
- Preserve links to source evidence for audit and deletion.
