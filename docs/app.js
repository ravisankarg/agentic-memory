(function () {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const progress = document.querySelector("[data-progress]");

  const savedTheme = localStorage.getItem("agentic-memory-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    root.dataset.theme = savedTheme;
  }

  function activeTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function syncThemeLabel() {
    if (!themeButton) return;
    const next = activeTheme() === "dark" ? "light" : "dark";
    themeButton.setAttribute("aria-label", `Use ${next} theme`);
    themeButton.textContent = activeTheme() === "dark" ? "☼" : "◐";
  }

  syncThemeLabel();

  themeButton?.addEventListener("click", function () {
    const next = activeTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("agentic-memory-theme", next);
    syncThemeLabel();
  });

  menuButton?.addEventListener("click", function () {
    const open = nav?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  function updateProgress() {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    progress.style.width = `${pct}%`;
  }

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  document.querySelectorAll("pre").forEach(function (pre) {
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code block");
    button.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        button.textContent = "Copied";
      } catch (_error) {
        button.textContent = "Select text";
      }
      window.setTimeout(() => { button.textContent = "Copy"; }, 1500);
    });
    wrapper.appendChild(button);
  });

  const tocLinks = Array.from(document.querySelectorAll(".toc a[href^='#']"));
  const observedSections = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (tocLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      tocLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1] });
    observedSections.forEach((section) => observer.observe(section));
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, notation: "compact" }).format(value);
  }

  const budgetLab = document.querySelector("[data-budget-lab]");
  if (budgetLab) {
    const days = budgetLab.querySelector("[data-days]");
    const perDay = budgetLab.querySelector("[data-per-day]");
    const topK = budgetLab.querySelector("[data-top-k]");
    const daysOut = budgetLab.querySelector("[data-days-out]");
    const perDayOut = budgetLab.querySelector("[data-per-day-out]");
    const topKOut = budgetLab.querySelector("[data-top-k-out]");
    const fullOut = budgetLab.querySelector("[data-full-context]");
    const retrievedOut = budgetLab.querySelector("[data-retrieved-context]");
    const reductionOut = budgetLab.querySelector("[data-reduction]");

    function calculateBudget() {
      const d = Number(days.value);
      const t = Number(perDay.value);
      const k = Number(topK.value);
      const full = d * t;
      const retrieved = 650 + k * 240;
      const reduction = Math.max(0, 100 * (1 - retrieved / full));
      daysOut.value = `${d} days`;
      perDayOut.value = `${formatNumber(t)} tokens/day`;
      topKOut.value = `${k} memories`;
      fullOut.textContent = formatNumber(full);
      retrievedOut.textContent = formatNumber(retrieved);
      reductionOut.textContent = `${reduction.toFixed(1)}%`;
    }

    [days, perDay, topK].forEach((input) => input.addEventListener("input", calculateBudget));
    calculateBudget();
  }

  const methodLab = document.querySelector("[data-method-lab]");
  if (methodLab) {
    const shape = methodLab.querySelector("[data-query-shape]");
    const scale = methodLab.querySelector("[data-corpus-scale]");
    const updateRate = methodLab.querySelector("[data-update-rate]");
    const title = methodLab.querySelector("[data-method-title]");
    const explanation = methodLab.querySelector("[data-method-explanation]");

    const methods = {
      exact: {
        title: "Metadata filters + BM25/FTS",
        text: "Preserve identifiers, paths, error codes, dates, and quoted phrases. Add dense retrieval only as a recall channel; exact lexical matches should stay first-class."
      },
      semantic: {
        title: "Hybrid BM25 + dense, fused with RRF",
        text: "Lexical and semantic signals fail differently. Retrieve broadly from both, fuse ranks, then cross-encode the shortlist for precision."
      },
      temporal: {
        title: "Hybrid retrieval with validity-time filtering",
        text: "Resolve event time, valid-from/to, current status, and supersession before ranking. Expand adjacent episodes and retain the history behind the current fact."
      },
      multihop: {
        title: "Hybrid seed retrieval + graph or iterative expansion",
        text: "Use entities and relations to connect evidence across memories, or let a controller issue follow-up searches. Stop only when all required evidence is present."
      },
      global: {
        title: "Hierarchical summaries with leaf evidence",
        text: "Retrieve at topic/session/project level first, then drill into raw evidence. A flat top-k chunk search is structurally weak for corpus-wide synthesis."
      },
      workflow: {
        title: "Procedural pool + agentic file inspection",
        text: "Route to runbooks, successful trajectories, and gotchas. A tool-using controller can inspect manifests and files when a single similarity query cannot reconstruct a workflow."
      }
    };

    function recommend() {
      const base = methods[shape.value] || methods.semantic;
      const additions = [];
      if (scale.value === "small") additions.push("Keep a full-context fallback; it may be the simplest high-recall path.");
      if (scale.value === "large") additions.push("Use ANN or late interaction only after measuring exact-search latency at your scale.");
      if (updateRate.value === "high") additions.push("Prefer append-and-supersede records plus incremental lexical/vector updates.");
      title.textContent = base.title;
      explanation.textContent = `${base.text} ${additions.join(" ")}`.trim();
    }

    [shape, scale, updateRate].forEach((select) => select.addEventListener("change", recommend));
    recommend();
  }

  const filterButtons = document.querySelectorAll("[data-filter]");
  const benchmarkCards = document.querySelectorAll("[data-benchmark-category]");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selected = button.dataset.filter;
      filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      benchmarkCards.forEach(function (card) {
        const categories = card.dataset.benchmarkCategory.split(" ");
        card.hidden = selected !== "all" && !categories.includes(selected);
      });
    });
  });
})();
