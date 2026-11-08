(() => {
  const CREDITS = {
    name: "DsMans0021",
    github: "https://github.com/DsMans0021",
    linktree: "https://linktr.ee/dsmans0021",
    site: "https://dsmans0021.com"
  };

  const SUBJECTS = {
    physics: {
      id: "physics",
      name: "Physics",
      ar: "الفيزياء",
      subtitle: "Properties of Matter & Heat",
      arSub: "خواص المادة والحرارة",
      icon: "Φ",
      category: "sciences",
      pages: [
        { file: "index.html", en: "Overview", ar: "نظرة عامة", id: "home" },
        { file: "units.html", en: "Units", ar: "الوحدات", id: "units", topic: true },
        { file: "fluids.html", en: "Fluid Statics", ar: "الموائع الساكنة", id: "fluids", topic: true },
        { file: "deformation.html", en: "Deformation", ar: "التشوه", id: "deformation", topic: true },
        { file: "temperature.html", en: "Temperature", ar: "الحرارة", id: "temperature", topic: true },
        { file: "thermodynamics.html", en: "First Law", ar: "القانون الأول", id: "thermo", topic: true },
        { file: "expansion.html", en: "Expansion", ar: "التمدد", id: "expansion", bonus: true },
        { file: "thermal-energy.html", en: "Thermal Energy", ar: "الطاقة الحرارية", id: "thermal", bonus: true },
        { file: "ideal-gas.html", en: "Ideal Gas", ar: "الغاز المثالي", id: "gas", bonus: true },
        { file: "formulas.html", en: "Formula Vault", ar: "بنك القوانين", id: "formulas" },
        { file: "final-exam.html", en: "Final Exam", ar: "امتحان شامل", id: "exam" }
      ]
    },
    chemistry: {
      id: "chemistry",
      name: "Chemistry",
      ar: "الكيمياء",
      subtitle: "Gases & Material Balance",
      arSub: "الغازات والموازنة المادية",
      icon: "Ch",
      category: "sciences",
      pages: [
        { file: "index.html", en: "Overview", ar: "نظرة عامة", id: "home" },
        { file: "gases.html", en: "Ideal & Real Gases", ar: "الغازات المثالية والحقيقية", id: "gases", topic: true },
        { file: "material-balance.html", en: "Material Balance", ar: "الموازنة المادية", id: "balance", topic: true },
        { file: "formulas.html", en: "Formula Vault", ar: "بنك القوانين", id: "formulas" },
        { file: "final-exam.html", en: "Final Exam", ar: "امتحان شامل", id: "exam" }
      ]
    },
    algebra: {
      id: "algebra",
      name: "Algebra",
      ar: "الجبر",
      subtitle: "Complex · Equations · Numerical · Gauss",
      arSub: "الأعداد المركبة · المعادلات · التحليل العددي · جاوس",
      icon: "∑",
      category: "math",
      pages: [
        { file: "index.html", en: "Overview", ar: "نظرة عامة", id: "home" },
        { file: "complex-numbers.html", en: "Complex Numbers", ar: "الأعداد المركبة", id: "complex", topic: true },
        { file: "theory-of-equations.html", en: "Theory of Equations", ar: "نظرية المعادلات", id: "equations", topic: true },
        { file: "numerical-analysis.html", en: "Numerical Analysis", ar: "التحليل العددي", id: "numerical", topic: true },
        { file: "gauss-method.html", en: "Gauss's Method", ar: "طريقة جاوس", id: "gauss", topic: true },
        { file: "formulas.html", en: "Formula Vault", ar: "بنك القوانين", id: "formulas" },
        { file: "final-exam.html", en: "Final Exam", ar: "امتحان شامل", id: "exam" }
      ]
    },
    mechanics: {
      id: "mechanics",
      name: "Mechanics",
      ar: "الميكانيكا",
      subtitle: "Statics",
      arSub: "الاستاتيكا",
      icon: "M",
      category: "engineering",
      pages: [
        { file: "index.html", en: "Overview", ar: "نظرة عامة", id: "home" },
        { file: "vectors.html", en: "Vectors", ar: "المتجهات", id: "vectors", topic: true },
        { file: "forces.html", en: "Forces", ar: "القوى", id: "forces", topic: true },
        { file: "moments.html", en: "Moments", ar: "العزوم", id: "moments", topic: true },
        { file: "equilibrium.html", en: "Equilibrium", ar: "الاتزان", id: "equilibrium", topic: true },
        { file: "wrench.html", en: "Wrench", ar: "المفتاح", id: "wrench", topic: true },
        { file: "friction.html", en: "Friction", ar: "الاحتكاك", id: "friction", topic: true },
        { file: "formulas.html", en: "Formula Vault", ar: "بنك القوانين", id: "formulas" },
        { file: "final-exam.html", en: "Final Exam", ar: "امتحان شامل", id: "exam" }
      ]
    }
  };

  const CATEGORIES = {
    sciences: { en: "Sciences", ar: "العلوم", desc: "Physics and chemistry — the core science subjects." },
    math: { en: "Mathematics", ar: "الرياضيات", desc: "Algebra, complex numbers, equations, numerical methods and Gauss." },
    engineering: { en: "Engineering", ar: "الهندسة", desc: "Statics — vectors, forces, moments, equilibrium and friction." }
  };

  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const subjectId = document.body.dataset.subject || "home";
  const isHome = subjectId === "home";
  const subject = SUBJECTS[subjectId] || null;
  const langKey = "ml-lang";
  const lastKey = "ml-last";

  const readJSON = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
  };
  const writeJSON = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  };

  function doneKey(id) { return "ml-done-" + id; }

  function getDone(id) {
    let list = readJSON(doneKey(id), []);
    if (!Array.isArray(list)) list = [];
    if (id === "physics" && list.length === 0) {
      const legacy = readJSON("pmh-done", []);
      if (Array.isArray(legacy) && legacy.length) {
        list = legacy;
        writeJSON(doneKey(id), list);
      }
    }
    return list;
  }
  const setDone = (id, list) => writeJSON(doneKey(id), list);

  function topicPages(s) {
    return s.pages.filter(p => p.topic);
  }

  function pageUrl(s, file) {
    return isHome ? `${s.id}/${file}` : file;
  }

  function navLabel(p) {
    return `${p.en} · ${p.ar}`;
  }

  function buildHeader() {
    const el = document.querySelector("[data-site-header]");
    if (!el) return;

    const homeHref = isHome ? "index.html" : "../index.html";
    const mark = isHome ? "ML" : subject.icon;
    const title = isHome ? "Midterm Lab" : subject.name;
    const sub = isHome ? "ALL SUBJECTS · MIDTERM 2027" : `${subject.subtitle} · ${subject.arSub}`;

    let links = "";
    if (isHome) {
      links = Object.values(SUBJECTS).map(s =>
        `<a href="${s.id}/index.html" data-en="${s.name}" data-ar="${s.ar}">${s.name} · ${s.ar}</a>`
      ).join("") + `<a href="#credits" data-en="Credits" data-ar="المطور">Credits · المطور</a>`;
    } else {
      links = `<a href="../index.html" class="home-link" data-en="All subjects" data-ar="كل المواد">All subjects · كل المواد</a>` +
        subject.pages.map(p => {
          const active = current === p.file.toLowerCase() ? " active" : "";
          return `<a href="${p.file}" class="${active.trim()}" data-en="${p.en}" data-ar="${p.ar}">${p.en} · ${p.ar}</a>`;
        }).join("");
    }

    el.innerHTML = `
      <div class="topbar">
        <div class="container nav">
          <a class="logo" href="${homeHref}" aria-label="Midterm Lab home">
            <span class="mark">${mark}</span>
            <span>${title}<small>${sub}</small></span>
          </a>
          <nav class="navlinks" aria-label="Main navigation">${links}</nav>
          <div class="tools">
            <button class="btn themebtn" id="themeToggle" type="button" aria-label="تبديل الوضع الفاتح والداكن" title="تبديل الوضع الفاتح والداكن">◐</button>
            <button class="btn themebtn" id="searchToggle" type="button" aria-label="بحث سريع" title="بحث سريع">⌕</button>
            <button class="btn langbtn" id="langToggle" type="button" title="Change language">AR + EN</button>
            <button class="btn ghost" id="printBtn" type="button" onclick="window.print()" aria-label="طباعة الصفحة" title="Print this page">⎙</button>
          </div>
        </div>
      </div>`;

    const active = el.querySelector(".navlinks a.active");
    const linksBox = el.querySelector(".navlinks");
    if (active && linksBox) linksBox.scrollLeft = Math.max(0, active.offsetLeft - 48);
  }

  function creditsHTML() {
    return `
      <div class="credit-line">
        <span>من إعداد · Built by <a href="${CREDITS.github}" target="_blank" rel="noopener"><b>${CREDITS.name}</b></a></span>
        <span class="credit-links">
          <a href="${CREDITS.github}" target="_blank" rel="noopener">GitHub</a>
          <a href="${CREDITS.linktree}" target="_blank" rel="noopener">Linktree</a>
          <a href="${CREDITS.site}" target="_blank" rel="noopener">dsmans0021.com</a>
        </span>
      </div>`;
  }

  function buildFooter() {
    const el = document.querySelector("[data-site-footer]");
    if (!el) return;

    const subjectLinks = Object.values(SUBJECTS).map(s =>
      `<a href="${isHome ? "" : "../"}${s.id}/index.html">${s.name} · ${s.ar}</a>`
    ).join("");

    const localLinks = subject ? subject.pages
      .filter(p => ["formulas.html", "reference.html", "final-exam.html"].includes(p.file))
      .map(p => `<a href="${p.file}">${p.en} · ${p.ar}</a>`).join("") : "";

    el.innerHTML = `
      <footer>
        <div class="container foot">
          <div class="foot-brand">
            <b>Midterm Lab · منصة الميدتيرم</b><br>
            <span>First term 2027 · كل المواد في مكان واحد — شرح عربي + English، قوانين، أمثلة، وأسئلة تفاعلية.</span><br>
            <span>آخر تحديث: نوفمبر 2026 · المحتوى مراجعة مستقلة، مش بديل عن المحاضرات.</span>
            ${creditsHTML()}
          </div>
          <div class="footlinks">
            ${isHome ? subjectLinks : `<a href="../index.html">All subjects · كل المواد</a>${localLinks}`}
          </div>
        </div>
      </footer>`;
  }

  function applyLang(mode, btn) {
    document.body.classList.remove("lang-both", "lang-en", "lang-ar");
    document.body.classList.add("lang-" + mode);
    if (btn) btn.textContent = mode === "both" ? "AR + EN" : mode === "en" ? "English" : "العربية";
    document.documentElement.lang = mode === "ar" ? "ar" : "en";
    try { localStorage.setItem(langKey, mode); } catch {}
    document.querySelectorAll(".navlinks a[data-en]").forEach(a => {
      a.textContent = mode === "ar" ? a.dataset.ar : mode === "en" ? a.dataset.en : `${a.dataset.en} · ${a.dataset.ar}`;
    });
  }

  function initLang() {
    const btn = document.getElementById("langToggle");
    let mode = "both";
    try { mode = localStorage.getItem(langKey) || "both"; } catch {}
    if (!["both", "en", "ar"].includes(mode)) mode = "both";
    applyLang(mode, btn);
    if (btn) btn.addEventListener("click", () => {
      const order = ["both", "en", "ar"];
      const now = document.body.classList.contains("lang-en") ? "en" : document.body.classList.contains("lang-ar") ? "ar" : "both";
      applyLang(order[(order.indexOf(now) + 1) % 3], btn);
    });
  }

  function initTheme() {
    const root = document.documentElement;
    const mq = matchMedia("(prefers-color-scheme: light)");
    const stored = (() => { try { return localStorage.getItem("ml-theme"); } catch { return null; } })();
    const apply = (theme, save) => {
      root.dataset.theme = theme;
      if (save) { try { localStorage.setItem("ml-theme", theme); } catch {} }
      const btn = document.getElementById("themeToggle");
      if (btn) {
        btn.textContent = theme === "light" ? "☾" : "☀";
        btn.setAttribute("aria-label", theme === "light" ? "الوضع الداكن" : "الوضع الفاتح");
        btn.title = theme === "light" ? "الوضع الداكن" : "الوضع الفاتح";
      }
    };
    apply(stored === "light" || stored === "dark" ? stored : (mq.matches ? "light" : "dark"), false);
    if (!stored) mq.addEventListener("change", e => apply(e.matches ? "light" : "dark", false));
    const btn = document.getElementById("themeToggle");
    if (btn) btn.addEventListener("click", () => {
      apply(root.dataset.theme === "light" ? "dark" : "light", true);
    });
  }

  function normalizeSearch(text) {
    return (text || "")
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  }

  function initSearch() {
    let index = null;
    let loading = false;
    const modal = document.createElement("div");
    modal.className = "search-modal";
    modal.id = "searchModal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="searchTitle">
        <div class="search-top">
          <b id="searchTitle">بحث سريع · Quick search</b>
          <button class="btn ghost search-close" type="button" aria-label="إغلاق البحث">×</button>
        </div>
        <input class="search-input" id="searchInput" type="search" placeholder="اكتب اسم موضوع، قانون، أو مادة…" autocomplete="off">
        <div class="search-results" id="searchResults" aria-live="polite"><p class="muted">اكتب حاجة تبدأ منها.</p></div>
      </div>`;
    document.body.appendChild(modal);
    const input = modal.querySelector("#searchInput");
    const results = modal.querySelector("#searchResults");
    const toggle = document.getElementById("searchToggle");
    const close = () => {
      if (modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove("search-open");
      if (toggle) { toggle.setAttribute("aria-expanded", "false"); toggle.focus(); }
    };
    const open = async () => {
      modal.hidden = false;
      document.body.classList.add("search-open");
      if (toggle) toggle.setAttribute("aria-expanded", "true");
      input.focus();
      if (index || loading) return;
      loading = true;
      results.innerHTML = '<p class="muted">جاري التحميل…</p>';
      try {
        const res = await fetch(isHome ? "assets/search-index.json" : "../assets/search-index.json");
        index = await res.json();
        results.innerHTML = '<p class="muted">اكتب حاجة تبدأ منها.</p>';
      } catch {
        results.innerHTML = '<p class="muted">البحث مش متاح دلوقتي.</p>';
      } finally { loading = false; }
    };
    const render = q => {
      if (!index) return;
      const terms = normalizeSearch(q).split(" ").filter(Boolean);
      if (!terms.length) { results.innerHTML = '<p class="muted">اكتب حاجة تبدأ منها.</p>'; return; }
      const hits = index
        .map(item => {
          const hay = normalizeSearch(`${item.t} ${item.ta} ${item.s} ${item.sa} ${item.d} ${item.k || ""}`);
          let score = 0;
          terms.forEach(t => {
            if (normalizeSearch(item.t).includes(t) || normalizeSearch(item.ta).includes(t)) score += 4;
            else if (hay.includes(t)) score += 1;
          });
          return { item, score };
        })
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
      if (!hits.length) { results.innerHTML = '<p class="muted">مفيش نتائج. جرّب كلمة تانية.</p>'; return; }
      results.innerHTML = hits.map(({ item }) => `
        <a class="search-hit" href="${isHome ? "" : "../"}${item.u}">
          <span class="search-hit-sub">${item.s} · ${item.sa}</span>
          <b>${item.t} · ${item.ta}</b>
          <small>${item.d}</small>
        </a>`).join("");
    };
    input.addEventListener("input", () => render(input.value));
    modal.addEventListener("click", e => { if (e.target === modal) close(); });
    modal.querySelector(".search-close").addEventListener("click", close);
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", open);
    }
    addEventListener("keydown", e => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault(); open();
      }
      if (e.key === "Escape") close();
    });
  }

  function initPWA() {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
    addEventListener("load", () => {
      navigator.serviceWorker.register(isHome ? "sw.js" : "../sw.js").catch(() => {});
    });
  }

  function setupQuestion(q, index, state) {
    const reveal = q.querySelector(".reveal");
    const answer = q.querySelector(".answer");
    const inputs = [...q.querySelectorAll('input[type="radio"]')];
    const hasCorrect = inputs.some(i => i.dataset.correct === "true");
    if (!reveal || !answer) return;
    const defaultLabel = reveal.textContent;
    reveal.dataset.defaultLabel = defaultLabel;
    let note = null;
    if (hasCorrect) {
      note = document.createElement("div");
      note.className = "verdict";
      note.style.cssText = "font-size:12px;font-weight:800;margin-top:6px;color:var(--muted)";
      answer.appendChild(note);
    }
    const evaluate = () => {
      if (!hasCorrect || !state) return;
      const picked = inputs.find(i => i.checked);
      if (!picked) {
        if (note) note.textContent = "اختر إجابة أولاً · Choose an answer first";
        return;
      }
      const wasCorrect = picked.dataset.correct === "true";
      state.answered.add(index);
      if (wasCorrect) state.correct.add(index); else state.correct.delete(index);
      q.classList.toggle("answered", true);
      q.classList.toggle("is-correct", wasCorrect);
      q.classList.toggle("is-wrong", !wasCorrect);
      state.score.querySelector(".scoreval").textContent = `${state.correct.size} / ${state.total}`;
      if (note) note.textContent = wasCorrect ? "✓ Correct · إجابة صحيحة" : "✗ Not quite — read the explanation · راجع الشرح";
    };
    reveal.addEventListener("click", () => {
      answer.classList.toggle("show");
      if (!answer.classList.contains("show")) {
        reveal.textContent = defaultLabel;
        return;
      }
      reveal.textContent = "إخفاء الإجابة · Hide answer";
      evaluate();
    });
    inputs.forEach(i => i.addEventListener("change", () => {
      q.classList.remove("is-correct", "is-wrong");
      if (note) note.textContent = "";
      if (answer.classList.contains("show")) evaluate();
    }));
  }

  function initQuiz() {
    document.querySelectorAll(".quiz").forEach(quiz => {
      const questions = [...quiz.querySelectorAll(".q")];
      const score = document.createElement("div");
      score.className = "scorebar";
      score.innerHTML = `<span>Quiz score · نتيجة الاختبار:</span><b class="scoreval">0 / ${questions.length}</b><span class="muted">— اضغط "تحقق" بعد اختيار إجابتك</span>`;
      quiz.prepend(score);
      const state = { answered: new Set(), correct: new Set(), score, total: questions.length };
      questions.forEach((q, index) => setupQuestion(q, index, state));
    });

    document.querySelectorAll(".q").forEach(q => {
      if (q.closest(".quiz")) return;
      setupQuestion(q, null, null);
    });
  }

  function drawSubjectProgress() {
    document.querySelectorAll("[data-progress-subject]").forEach(box => {
      const id = box.dataset.progressSubject;
      const s = SUBJECTS[id];
      if (!s) return;
      const topics = topicPages(s);
      const done = getDone(id).filter(x => topics.some(p => p.file === x));
      const pct = topics.length ? Math.round(done.length / topics.length * 100) : 0;
      box.innerHTML = `
        <div class="progress-meta"><span>${done.length} / ${topics.length} topics</span><b>${pct}%</b></div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>`;
    });
  }

  function initProgress() {
    const page = current;
    const done = subject ? getDone(subject.id) : [];
    const topics = subject ? topicPages(subject) : [];

    if (subject && page !== "index.html") {
      const hero = document.querySelector(".page-hero .container");
      const isTopic = topics.some(p => p.file === page);
      if (hero && isTopic) {
        const wrap = document.createElement("div");
        wrap.className = "topic-progress";
        const isDone = done.includes(page);
        wrap.innerHTML = `<button class="btn ${isDone ? "primary" : ""}" id="completeBtn">${isDone ? "✓ تمت المذاكرة — Completed" : "علّم كـ تمت المذاكرة · Mark as studied"}</button><span class="badge">${done.filter(x => topics.some(p => p.file === x)).length} / ${topics.length} topics</span>`;
        hero.appendChild(wrap);
        wrap.querySelector("#completeBtn").addEventListener("click", () => {
          let list = getDone(subject.id);
          if (list.includes(page)) list = list.filter(x => x !== page); else list.push(page);
          setDone(subject.id, list);
          const nowDone = list.includes(page);
          const btn = wrap.querySelector("#completeBtn");
          btn.textContent = nowDone ? "✓ تمت المذاكرة — Completed" : "علّم كـ تمت المذاكرة · Mark as studied";
          btn.classList.toggle("primary", nowDone);
          wrap.querySelector(".badge").textContent = `${list.filter(x => topics.some(p => p.file === x)).length} / ${topics.length} topics`;
          drawRing();
          drawSubjectProgress();
          if (window.updateRoadmap) window.updateRoadmap();
        });
      }
    }

    const side = document.querySelector(".sidebar");
    if (side && subject) {
      const card = document.createElement("div");
      card.className = "sidecard";
      card.innerHTML = `<h4>Progress · التقدم</h4><div class="progress-ring" id="progRing"><span id="progPct">0%</span></div><div class="mini-nav" id="miniProgress"></div>`;
      side.appendChild(card);
    }

    function drawRing() {
      if (!subject) return;
      const list = getDone(subject.id).filter(x => topics.some(p => p.file === x));
      const pct = topics.length ? Math.round(list.length / topics.length * 100) : 0;
      const ring = document.getElementById("progRing");
      const pctEl = document.getElementById("progPct");
      const mini = document.getElementById("miniProgress");
      if (ring) { ring.style.setProperty("--p", pct); pctEl.textContent = pct + "%"; }
      if (mini) mini.innerHTML = topics.map(p => `<a href="${p.file}"><span class="dot ${list.includes(p.file) ? "" : "blue"}"></span>${list.includes(p.file) ? "✓ " : ""}${p.en} · ${p.ar}</a>`).join("");
    }
    drawRing();
    window.drawProgress = drawRing;
  }

  function initContinue() {
    const slot = document.getElementById("continueSlot");
    if (!slot) return;
    const last = readJSON(lastKey, null);
    if (!last || !SUBJECTS[last.subject]) { slot.remove(); return; }
    const s = SUBJECTS[last.subject];
    const p = s.pages.find(x => x.file === last.file);
    if (!p) { slot.remove(); return; }
    slot.innerHTML = `
      <div class="continue-card">
        <div class="continue-mark">${s.icon}</div>
        <div class="continue-copy">
          <span class="kicker">Continue where you left off · كمّل من حيث توقفت</span>
          <b>${s.name} · ${s.ar} — ${p.en} · ${p.ar}</b>
        </div>
        <a class="btn primary" href="${s.id}/${p.file}">كمّل → Continue</a>
      </div>`;
  }

  function initLastVisited() {
    if (!subject || current === "index.html") return;
    const p = subject.pages.find(x => x.file === current);
    if (!p) return;
    writeJSON(lastKey, { subject: subject.id, file: p.file });
  }

  function initScrollProgress() {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    addEventListener("scroll", () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h * 100) : 0) + "%";
    }, { passive: true });
  }

  function initAnchorSidebar() {
    document.querySelectorAll(".sidebar .mini-nav a[href^='#']").forEach(a => {
      a.addEventListener("click", e => {
        const t = document.querySelector(a.getAttribute("href"));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });
  }

  function initRoadmap() {
    if (!document.getElementById("roadmap") || !subject) return;
    const done = getDone(subject.id);
    const items = subject.pages.filter(p => p.topic || ["formulas.html", "reference.html", "final-exam.html"].includes(p.file));
    const mount = document.getElementById("roadmap");
    mount.innerHTML = items.map((p, i) => {
      const isResource = !p.topic;
      const isDone = !isResource && done.includes(p.file);
      return `
      <div class="step-card ${isDone ? "done" : ""} ${isResource ? "resource" : ""}">
        <div class="n">${isResource ? "★" : isDone ? "✓" : String(i + 1).padStart(2, "0")}</div>
        <div><h3>${p.en} · ${p.ar}</h3><p>${p.id === "formulas" || p.id === "reference" ? "راجع كل القوانين قبل الامتحان." : p.id === "exam" ? "اختبر نفسك في امتحان شامل بالإجابات." : "شرح + قوانين + أمثلة + أسئلة تفاعلية."}</p></div>
        <a class="btn ${isDone || isResource ? "primary" : ""}" href="${p.file}">${isResource || isDone ? "راجع" : "ابدأ"} →</a>
      </div>`;
    }).join("");
    const progressTopics = subject.pages.filter(p => p.topic);
    const pct = progressTopics.length ? Math.round(done.filter(x => progressTopics.some(i => i.file === x)).length / progressTopics.length * 100) : 0;
    const bar = document.getElementById("roadmapProgress");
    if (bar) { bar.style.width = pct + "%"; document.getElementById("roadmapPct").textContent = pct + "%"; }
  }
  window.updateRoadmap = initRoadmap;

  function initLooseReveals() {
    document.querySelectorAll(".reveal").forEach(reveal => {
      if (reveal.closest(".q")) return;
      const answer = reveal.parentElement.querySelector(".answer");
      if (!answer) return;
      const defaultLabel = reveal.textContent;
      reveal.dataset.defaultLabel = defaultLabel;
      reveal.addEventListener("click", () => {
        answer.classList.toggle("show");
        reveal.textContent = answer.classList.contains("show")
          ? "إخفاء الإجابة · Hide answer"
          : defaultLabel;
      });
    });
  }

  function initRevealAll() {
    document.querySelectorAll("[data-answers]").forEach(btn => {
      btn.addEventListener("click", () => {
        const show = btn.dataset.answers === "show";
        document.querySelectorAll(".answer").forEach(a => a.classList.toggle("show", show));
        document.querySelectorAll(".reveal").forEach(r => {
          r.textContent = show ? "إخفاء الإجابة · Hide answer" : (r.dataset.defaultLabel || "تحقق · Check answer");
        });
        if (!show) document.querySelectorAll(".q").forEach(q => q.classList.remove("is-correct", "is-wrong"));
      });
    });
  }

  function initBackToTop() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "to-top";
    btn.setAttribute("aria-label", "العودة لأعلى · Back to top");
    btn.textContent = "↑";
    document.body.appendChild(btn);
    const onScroll = () => btn.classList.toggle("show", scrollY > 500);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  }

  function initHomeStats() {
    document.querySelectorAll("[data-total-topics]").forEach(el => {
      el.textContent = Object.values(SUBJECTS).reduce((n, s) => n + topicPages(s).length, 0);
    });
    document.querySelectorAll("[data-total-subjects]").forEach(el => el.textContent = Object.keys(SUBJECTS).length);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (subject) document.body.classList.add("subject-" + subject.id);
    else document.body.classList.add("subject-home");
    buildHeader();
    buildFooter();
    initTheme();
    initSearch();
    initPWA();
    initLang();
    initQuiz();
    initLooseReveals();
    initRevealAll();
    initProgress();
    initContinue();
    initLastVisited();
    initScrollProgress();
    initAnchorSidebar();
    initRoadmap();
    initBackToTop();
    drawSubjectProgress();
    initHomeStats();
  });
})();
