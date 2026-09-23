# Agentic Memory

A research-backed field guide and experimental starting point for durable, searchable memory systems for AI agents.

## Read the guide

The static site lives in [`docs/`](docs/) and is ready for GitHub Pages:

- [`docs/index.html`](docs/index.html) — memory files, architecture, retrieval, and the 2026 frontier
- [`docs/benchmarks.html`](docs/benchmarks.html) — benchmark catalog and reproducible evaluation plan
- [`docs/sources.html`](docs/sources.html) — primary papers, repositories, and official documentation

To preview locally:

```bash
python3 -m http.server 8000 --directory docs
```

Then open `http://localhost:8000`.

## Included starter material

- [`examples/memory/`](examples/memory/) — a transparent Markdown memory layout
- [`research/SOURCES.md`](research/SOURCES.md) — dated research scope and core conclusions
- [`.github/workflows/pages.yml`](.github/workflows/pages.yml) — dependency-free GitHub Pages deployment

## Core position

Memory filenames are conventions, not standards. The recommended baseline is a human-readable canonical store plus a disposable sidecar index:

`hard scope/time filters → BM25 + dense candidates → rank fusion → reranking → bounded cited evidence`

Graph, hierarchy, and agentic file inspection should be added only when benchmark failures justify their cost.
