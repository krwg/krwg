(function () {
  'use strict';

  var I18N = {
    en: {
      'nav.graph': 'Graph', 'nav.home': 'Home', 'nav.bio': 'Bio',
      'nav.pet': 'Pet', 'nav.contact': 'Contact',
      'hero.label': 'Personal page',
      'hero.sub': 'Student. Solo developer. Building software that works without asking the cloud for permission.',
      'hero.location': 'Location', 'hero.locationVal': 'Moscow, Russia',
      'hero.age': 'Age', 'hero.status': 'Status', 'hero.statusVal': 'Student · Hobby developer',
      'portrait.caption': 'Portrait · 肖像',
      'stack.label': 'Stack',
      'stack.intro': 'Daily tools — GitHub shields.',
      'comments.title': 'Discussion',
      'footer.season': 'Season', 'footer.auto': 'Auto',
      'footer.spring': 'Spring', 'footer.summer': 'Summer',
      'footer.autumn': 'Autumn', 'footer.winter': 'Winter',
      'bio.title': 'Bio',
      'bio.p1': 'Started with a desire to build a social network — <strong>Tiver</strong>, 2021. Six months of web dev with a friend, first version in plain HTML/CSS/JS. Not just a project — the point of no return: code as a way to materialize ideas.',
      'bio.p2': 'Then Python, pet projects, <strong>JKeep</strong> on Tkinter, custom Telegram themes, networks and VMs. Studies pushed hobbies to the shelf — but didn\'t kill them.',
      'bio.p3': 'April 2026 changed everything. <strong>Cultiva</strong>, JS and Electron, then the <strong>Floke</strong> ecosystem. Now Rust, Tauri, RAG, SQL, TypeScript, Ollama, LLM internals. Every day — a new layer.',
      'bio.t1': 'First project <a href="https://github.com/krwg/Tiver" target="_blank" rel="noopener">Tiver</a> — social network with a friend. Six months of web dev.',
      'bio.t2': 'Telegram channel krwg, <strong>JKeep</strong> on Python + Tkinter, custom Telegram themes, networks and VMs.',
      'bio.t3': 'Return. <strong>Cultiva</strong>, <strong>Floke Studio</strong> ecosystem, Rust, Tauri, local AI, RAG.',
      'studio.blockTitle': 'Studio',
      'studio.more': 'Learn more',
      'studio.intro': 'Independent studio, founded 2026. Not scattered pet projects — an <em>ecosystem</em> on the user\'s machine: apps, intelligence, and games — one philosophy, one author.',
      'studio.p2d': 'Local AI and metadata. Offline-first intelligence — no upload to foreign data centers.',
      'studio.p3d': 'The game wing. No live service, battle pass, or FOMO. Just a game worth finishing.',
      'studio.p1d': 'Software on your computer. Senza, Cultiva, BLIP, Flint — no cloud or accounts required.',
      'pet.title': 'Pet projects', 'pet.p': 'Empty for now — not for long.',
      'pet.span': 'Space reserved for future experiments.',
      'graph.title': 'Graph',
      'graph.lead': 'Site map — nodes, links, backlinks. Drag · scroll to zoom · click to open.',
      'graph.toolbar': 'Note graph', 'graph.fit': 'Fit view', 'graph.reset': 'Reset layout',
      'graph.hint': 'drag · scroll · click',
      'graph.legend.hub': 'krwg', 'graph.legend.page': 'Pages', 'graph.legend.note': 'Notes',
      'graph.legend.studio': 'Studio',
      'graph.backlinks': 'Linked from', 'graph.tip.open': 'Open →',
      'graph.node.krwg': 'krwg', 'graph.node.home': 'Home', 'graph.node.graph': 'Graph',
      'graph.node.bio': 'Bio', 'graph.node.pet': 'Pet projects', 'graph.node.contact': 'Contact',
      'graph.node.floke': 'Floke Studio', 'graph.node.tiver': 'Tiver', 'graph.node.jkeep': 'JKeep',
      'contact.title': 'Contact',
      'contact.lead': 'Open to discussions, collaborations, and good conversations about software. If our views align — <em>write</em>.'
    },
    ru: {
      'nav.graph': 'Граф', 'nav.home': 'Главная', 'nav.bio': 'Биография',
      'nav.pet': 'Пет-проекты', 'nav.contact': 'Контакт',
      'hero.label': 'Личная страница',
      'hero.sub': 'Студент. Разработчик-одиночка. Строю софт, который работает без разрешения облака.',
      'hero.location': 'Локация', 'hero.locationVal': 'Москва, Россия',
      'hero.age': 'Возраст', 'hero.status': 'Статус', 'hero.statusVal': 'Студент · Хобби-разработчик',
      'portrait.caption': 'Портрет · 肖像',
      'stack.label': 'Стек',
      'stack.intro': 'Инструменты в ежедневной ротации — GitHub shields.',
      'comments.title': 'Обсуждение',
      'footer.season': 'Сезон', 'footer.auto': 'Авто',
      'footer.spring': 'Весна', 'footer.summer': 'Лето',
      'footer.autumn': 'Осень', 'footer.winter': 'Зима',
      'bio.title': 'Биография',
      'studio.blockTitle': 'Студия',
      'studio.more': 'Подробнее',
      'graph.title': 'Граф',
      'graph.lead': 'Карта страницы — узлы, связи, backlinks. Тяните · колёсико — масштаб · клик — открыть.',
      'graph.toolbar': 'Граф заметок', 'graph.fit': 'Вписать', 'graph.reset': 'Сбросить',
      'graph.hint': 'тянуть · scroll · клик',
      'graph.legend.hub': 'krwg', 'graph.legend.page': 'Страницы', 'graph.legend.note': 'Заметки',
      'graph.legend.studio': 'Студия',
      'graph.backlinks': 'Связано с', 'graph.tip.open': 'Открыть →',
      'graph.node.krwg': 'krwg', 'graph.node.home': 'Главная', 'graph.node.graph': 'Граф',
      'graph.node.bio': 'Биография', 'graph.node.pet': 'Пет-проекты', 'graph.node.contact': 'Контакт',
      'graph.node.floke': 'Floke Studio', 'graph.node.tiver': 'Tiver', 'graph.node.jkeep': 'JKeep'
    }
  };

  var COMMENT_SECTIONS = ['bio', 'graph', 'pet', 'contact'];
  var html = document.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) html.setAttribute('data-reduced-motion', 'true');

  function getLang() { return html.getAttribute('data-lang') === 'en' ? 'en' : 'ru'; }
  function getTheme() { return html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  function applyI18n() {
    var lang = getLang();
    html.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = (I18N[lang] && I18N[lang][key]) || (lang === 'en' && I18N.en[key]);
      if (val != null) el.innerHTML = val;
    });
    var langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = lang === 'ru' ? 'RU' : 'EN';
  }

  function setLang(lang) {
    html.setAttribute('data-lang', lang);
    localStorage.setItem('krwg-lang', lang);
    applyI18n();
    if (window.krwgInitGraph && getRoute() === 'graph') {
      if (window.krwgStopGraph) window.krwgStopGraph();
      window.krwgInitGraph();
    }
    loadGiscus(getRoute());
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('krwg-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#121110' : '#faf9f7';
    if (window.krwgSceneSetTheme) window.krwgSceneSetTheme(theme);
    loadGiscus(getRoute());
  }

  function initPrefs() {
    var t = localStorage.getItem('krwg-theme');
    if (t === 'dark' || t === 'light') html.setAttribute('data-theme', t);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) html.setAttribute('data-theme', 'dark');
    else html.setAttribute('data-theme', 'light');

    var l = localStorage.getItem('krwg-lang');
    if (l === 'en' || l === 'ru') html.setAttribute('data-lang', l);
    else html.setAttribute('data-lang', (navigator.language || 'en').toLowerCase().startsWith('ru') ? 'ru' : 'en');
    applyI18n();
  }

  initPrefs();

  document.getElementById('langToggle').addEventListener('click', function () {
    setLang(getLang() === 'ru' ? 'en' : 'ru');
  });
  document.getElementById('themeToggle').addEventListener('click', function () {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('krwg-theme')) setTheme(e.matches ? 'dark' : 'light');
  });

  var drawer = document.getElementById('mobileDrawer');
  document.getElementById('menuToggle').addEventListener('click', function () {
    drawer.classList.toggle('is-open');
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { drawer.classList.remove('is-open'); });
  });

  window.krwgGraphLabel = function (key) {
    var lang = getLang();
    return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
  };

  function getRoute() {
    var h = (location.hash || '#home').slice(1).toLowerCase();
    var pages = ['home', 'graph', 'bio', 'pet', 'contact'];
    return pages.indexOf(h) >= 0 ? h : 'home';
  }

  var PAGE_TITLES = {
    home: 'krwg — アイダ ミール',
    graph: 'Граф — krwg',
    bio: 'Биография — krwg',
    pet: 'Пет-проекты — krwg',
    contact: 'Контакт — krwg'
  };

  function showPage(route) {
    document.querySelectorAll('.page-view').forEach(function (p) {
      var active = p.getAttribute('data-page') === route;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
      if (active) {
        p.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
          requestAnimationFrame(function () { el.classList.add('visible'); });
        });
      }
    });
    document.title = PAGE_TITLES[route] || PAGE_TITLES.home;
    window.scrollTo(0, 0);
  }

  function setActiveNav(route) {
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-nav') === route);
    });
  }

  function onRouteChange() {
    var route = getRoute();
    showPage(route);
    setActiveNav(route);
    if (route === 'graph') {
      if (window.krwgInitGraph) window.krwgInitGraph();
    } else if (window.krwgStopGraph) {
      window.krwgStopGraph();
    }
    if (COMMENT_SECTIONS.indexOf(route) >= 0) loadGiscus(route);
  }

  window.addEventListener('hashchange', onRouteChange);

  var birth = new Date('2004-08-03T00:00:00').getTime();
  var timerEl = document.getElementById('age-timer');
  if (timerEl) {
    (function tick() {
      var diff = Date.now() - birth;
      var years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
      var remainder = diff % (365.25 * 24 * 60 * 60 * 1000);
      var days = Math.floor(remainder / (24 * 60 * 60 * 1000));
      var ms = remainder % (24 * 60 * 60 * 1000);
      timerEl.textContent = years + '.' + String(days).padStart(3, '0') + '.' + String(ms).padStart(8, '0');
      requestAnimationFrame(tick);
    })();
  }

  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { obs.observe(el); });
  }

  function detectSeason() {
    var m = new Date().getMonth();
    if (m >= 2 && m <= 4) return 'spring';
    if (m >= 8 && m <= 10) return 'autumn';
    if (m === 11 || m <= 1) return 'winter';
    return 'summer';
  }

  function getEffectiveSeason(mode) {
    return mode === 'auto' ? detectSeason() : mode;
  }

  function updateSeasonOG(season) {
    html.setAttribute('data-season', season);
    var base = new URL('assets/og-' + season + '.svg', location.href).href;
    var og = document.getElementById('og-image');
    var tw = document.getElementById('tw-image');
    if (og) og.content = base;
    if (tw) tw.content = base;
  }

  function applySeasonToScene(mode) {
    var effective = getEffectiveSeason(mode);
    document.querySelectorAll('.season-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-season') === mode);
    });
    updateSeasonOG(effective);
    if (window.krwgSceneSetSeason) window.krwgSceneSetSeason(effective);
  }

  function setSeason(mode) {
    localStorage.setItem('krwg-season', mode);
    applySeasonToScene(mode);
  }

  document.querySelectorAll('.season-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setSeason(btn.getAttribute('data-season'));
    });
  });

  document.addEventListener('krwg:scene-ready', function () {
    applySeasonToScene(localStorage.getItem('krwg-season') || 'auto');
  });
  if (window.krwgSceneSetSeason) {
    applySeasonToScene(localStorage.getItem('krwg-season') || 'auto');
  } else {
    applySeasonToScene(localStorage.getItem('krwg-season') || 'auto');
  }

  var giscusLoadedFor = '';

  function resolveCategoryId() {
    var cfg = window.KRWG && window.KRWG.giscus;
    if (!cfg) return Promise.resolve(null);
    if (cfg.categoryId) return Promise.resolve(cfg.categoryId);
    var cached = localStorage.getItem('krwg-giscus-category-id');
    if (cached) { cfg.categoryId = cached; return Promise.resolve(cached); }
    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'query($o:String!,$n:String!){repository(owner:$o,name:$n){discussionCategories(first:5){nodes{id name}}}}',
        variables: { o: 'krwg', n: 'krwg' }
      })
    }).then(function (r) { return r.json(); }).then(function (json) {
      var nodes = json && json.data && json.data.repository && json.data.repository.discussionCategories && json.data.repository.discussionCategories.nodes;
      if (!nodes || !nodes.length) return null;
      var pick = nodes.find(function (n) { return /general/i.test(n.name); }) || nodes[0];
      cfg.categoryId = pick.id;
      localStorage.setItem('krwg-giscus-category-id', pick.id);
      return pick.id;
    }).catch(function () { return null; });
  }

  function loadGiscus(term) {
    if (!term || COMMENT_SECTIONS.indexOf(term) < 0) return;
    var wrap = document.querySelector('.giscus-mount[data-giscus-term="' + term + '"]');
    if (!wrap) return;
    if (giscusLoadedFor === term && wrap.querySelector('iframe')) return;

    giscusLoadedFor = term;
    wrap.innerHTML = '';

    resolveCategoryId().then(function (catId) {
      var cfg = window.KRWG.giscus;
      if (!cfg.repoId || !catId) {
        wrap.innerHTML = '<div class="giscus-hint">Giscus: enable Discussions on <code>krwg/krwg</code> and install the Giscus app. Category ID resolves automatically on first load.</div>';
        return;
      }
      var s = document.createElement('script');
      s.src = 'https://giscus.app/client.js';
      s.setAttribute('data-repo', cfg.repo);
      s.setAttribute('data-repo-id', cfg.repoId);
      s.setAttribute('data-category', cfg.category);
      s.setAttribute('data-category-id', catId);
      s.setAttribute('data-mapping', 'specific');
      s.setAttribute('data-term', 'krwg-' + term);
      s.setAttribute('data-strict', '0');
      s.setAttribute('data-reactions-enabled', '1');
      s.setAttribute('data-emit-metadata', '0');
      s.setAttribute('data-input-position', 'bottom');
      s.setAttribute('data-theme', getTheme() === 'dark' ? 'dark' : 'light');
      s.setAttribute('data-lang', getLang());
      s.crossOrigin = 'anonymous';
      s.async = true;
      wrap.appendChild(s);
    });
  }

  onRouteChange();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }
})();
