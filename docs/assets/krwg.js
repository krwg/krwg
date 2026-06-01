(function () {
  'use strict';

  var I18N = {
    en: {
      'nav.graph': 'Graph', 'nav.home': 'Home', 'nav.bio': 'Bio',
      'nav.pet': 'Pet', 'nav.contact': 'Contact', 'nav.posts': 'Posts',
      'hero.label': 'Personal page',
      'hero.sub': 'Student. Solo developer. Building software that works without asking the cloud for permission.',
      'hero.location': 'Location', 'hero.locationVal': 'Moscow, Russia',
      'hero.age': 'Age', 'hero.status': 'Status', 'hero.statusVal': 'Student · Hobby developer',
      'portrait.caption': 'Portrait · 肖像',
      'stack.label': 'Stack',
      'stack.intro': 'Daily tools — GitHub shields.',
      'comments.title': 'Discussion',
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
      'graph.node.bio': 'Bio', 'graph.node.pet': 'Pet projects', 'graph.node.posts': 'Posts', 'graph.node.contact': 'Contact',
      'graph.node.floke': 'Floke Studio', 'graph.node.tiver': 'Tiver', 'graph.node.jkeep': 'JKeep',
      'contact.title': 'Contact',
      'contact.lead': 'Open to discussions, collaborations, and good conversations about software. If our views align — <em>write</em>.',
      'posts.title': 'Posts',
      'posts.lead': 'Notes from Telegraph — published here.',
      'posts.loading': 'Loading…',
      'posts.empty': 'No posts yet. Add Telegraph URLs to KRWG_TELEGRAPH in posts.js.',
      'posts.readMore': 'Read →',
      'posts.back': '← Back to posts',
      'posts.by': 'By',
      'posts.views': 'views',
      'posts.tag': 'Telegraph',
      'posts.openTelegraph': 'Open in Telegraph →',
      'posts.error': 'Could not load this post. Open it on Telegraph or add to posts-cache.json.'
    },
    ru: {
      'nav.graph': 'Граф', 'nav.home': 'Главная', 'nav.bio': 'Биография',
      'nav.pet': 'Пет-проекты', 'nav.contact': 'Контакт', 'nav.posts': 'Посты',
      'hero.label': 'Личная страница',
      'hero.sub': 'Студент. Разработчик-одиночка. Строю софт, который работает без разрешения облака.',
      'hero.location': 'Локация', 'hero.locationVal': 'Москва, Россия',
      'hero.age': 'Возраст', 'hero.status': 'Статус', 'hero.statusVal': 'Студент · Хобби-разработчик',
      'portrait.caption': 'Портрет · 肖像',
      'stack.label': 'Стек',
      'stack.intro': 'Инструменты в ежедневной ротации — GitHub shields.',
      'comments.title': 'Обсуждение',
      'bio.title': 'Биография',
      'bio.p1': 'Начал с желания создать свою социальную сеть — <strong>Tiver</strong>, 2021 год. Шесть месяцев веб-разработки с другом, первая версия на чистом HTML/CSS/JS. Это был не просто проект, а точка невозврата: я понял, что код — это способ материализовать идеи.',
      'bio.p2': 'Дальше — Python, куча пет-проектов, <strong>JKeep</strong> на Tkinter, кастомные темы для Telegram, погружение в сети и виртуальные машины. Учёба и обязательства отодвинули хобби на полку, но не убили.',
      'bio.p3': 'Апрель 2026 — всё изменилось. <strong>Cultiva</strong>, изучение JS и Electron, затем экосистема <strong>Floke</strong>. Сейчас — Rust, Tauri, RAG, SQL, TypeScript, Ollama, устройство LLM. Каждый день — новый слой.',
      'bio.t1': 'Первый проект <a href="https://github.com/krwg/Tiver" target="_blank" rel="noopener">Tiver</a> — социальная сеть с другом. Шесть месяцев веб-разработки.',
      'bio.t2': 'Telegram-канал krwg, <strong>JKeep</strong> на Python + Tkinter, кастомные темы для Telegram, изучение сетей и VM.',
      'bio.t3': 'Возвращение. <strong>Cultiva</strong>, экосистема <strong>Floke Studio</strong>, Rust, Tauri, локальный AI, RAG.',
      'studio.blockTitle': 'Студия',
      'studio.more': 'Подробнее',
      'studio.intro': 'Независимая студия, основанная в 2026. Не набор пет-проектов, а <em>экосистема</em> на машине пользователя: приложения, интеллект и игры — связаны одной философией и одним автором.',
      'studio.p1d': 'Софт на вашем компьютере. Senza, Cultiva, BLIP, Flint — всё работает без облака и аккаунтов.',
      'studio.p2d': 'Локальный AI и метаданные. Offline-first интеллект, который не требует загрузки в чужие дата-центры.',
      'studio.p3d': 'Игровое крыло студии. Без live service, battle pass и FOMO. Просто игра, которую хочется дойти.',
      'pet.title': 'Пет-проекты',
      'pet.p': 'Здесь пока пусто, но не надолго.',
      'pet.span': 'Пространство зарезервировано для будущих экспериментов.',
      'contact.title': 'Контакт',
      'contact.lead': 'Открыт для обсуждений, коллабораций и просто хороших разговоров о софте. Если наши взгляды совпадают — <em>напиши</em>.',
      'graph.title': 'Граф',
      'graph.legend.hub': 'krwg', 'graph.legend.page': 'Страницы', 'graph.legend.note': 'Заметки',
      'graph.legend.studio': 'Студия',
      'graph.backlinks': 'Связано с', 'graph.tip.open': 'Открыть →',
      'graph.node.krwg': 'krwg', 'graph.node.home': 'Главная', 'graph.node.graph': 'Граф',
      'graph.node.bio': 'Биография', 'graph.node.pet': 'Пет-проекты', 'graph.node.posts': 'Посты', 'graph.node.contact': 'Контакт',
      'graph.node.floke': 'Floke Studio', 'graph.node.tiver': 'Tiver', 'graph.node.jkeep': 'JKeep',
      'posts.title': 'Посты',
      'posts.lead': 'Заметки из Telegraph — публикую сюда.',
      'posts.loading': 'Загрузка…',
      'posts.empty': 'Пока нет постов. Добавьте URL Telegraph в KRWG_TELEGRAPH в posts.js.',
      'posts.readMore': 'Читать →',
      'posts.back': '← К постам',
      'posts.by': 'Автор',
      'posts.views': 'просмотров',
      'posts.tag': 'Telegraph',
      'posts.openTelegraph': 'Открыть в Telegraph →',
      'posts.error': 'Не удалось загрузить пост. Откройте в Telegraph или добавьте в posts-cache.json.'
    }
  };

  var COMMENT_SECTIONS = ['bio', 'graph', 'pet', 'posts', 'contact'];
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
      var val = (I18N[lang] && I18N[lang][key]) || I18N.en[key];
      if (typeof val === 'string') el.innerHTML = val;
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
    if (getRoute() === 'posts' && window.krwgPostsRoute) {
      window.krwgPostsRoute(getSubRoute());
    }
    loadGiscus(getRoute());
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('krwg-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#121110' : '#faf9f7';
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

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      if (location.hash !== href) location.hash = href;
      else onRouteChange();
    });
  });

  window.krwgGraphLabel = function (key) {
    var lang = getLang();
    return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || key;
  };

  window.krwgPostsLabel = window.krwgGraphLabel;

  function parseHash() {
    var raw = (location.hash || '#home').replace(/^#/, '');
    var slash = raw.indexOf('/');
    if (slash >= 0) {
      return { page: raw.slice(0, slash).toLowerCase(), sub: decodeURIComponent(raw.slice(slash + 1)) };
    }
    return { page: (raw || 'home').toLowerCase(), sub: null };
  }

  function getRoute() {
    var page = parseHash().page;
    var pages = ['home', 'bio', 'pet', 'contact', 'posts', 'graph'];
    return pages.indexOf(page) >= 0 ? page : 'home';
  }

  function getSubRoute() {
    return parseHash().sub;
  }

  var PAGE_TITLES = {
    home: 'krwg — アイダ ミール',
    graph: 'Граф — krwg',
    bio: 'Биография — krwg',
    pet: 'Пет-проекты — krwg',
    posts: 'Посты — krwg',
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
    if (route === 'posts' && window.krwgPostsRoute) {
      window.krwgPostsRoute(getSubRoute());
    }
    if (COMMENT_SECTIONS.indexOf(route) >= 0) loadGiscus(route);
  }

  var postsBack = document.getElementById('postsBack');
  if (postsBack) {
    postsBack.addEventListener('click', function () {
      location.hash = '#posts';
    });
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

  onRouteChange();

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
        query: 'query($o:String!,$n:String!){repository(owner:$o,name:$n){discussionCategories(first:10){nodes{id name}}}}',
        variables: { o: 'krwg', n: 'krwg' }
      })
    }).then(function (r) { return r.json(); }).then(function (json) {
      if (json.errors || !json.data || !json.data.repository) return null;
      var nodes = json.data.repository.discussionCategories && json.data.repository.discussionCategories.nodes;
      if (!nodes || !nodes.length) return null;
      var pick = nodes.find(function (n) { return /general/i.test(n.name); }) || nodes[0];
      cfg.categoryId = pick.id;
      localStorage.setItem('krwg-giscus-category-id', pick.id);
      return pick.id;
    }).catch(function () { return null; });
  }

  function giscusHintHtml(term) {
    return '<div class="giscus-hint">' +
      'Комментарии через Giscus. Установите <a href="https://github.com/apps/giscus" target="_blank" rel="noopener">giscus app</a> на <code>krwg/krwg</code>, ' +
      'затем выполните <code>GH_TOKEN=… node scripts/ensure-giscus-discussions.mjs</code> — создаст тред <code>' + term + '</code>. ' +
      '<a href="https://github.com/krwg/krwg/discussions/new?category=general" target="_blank" rel="noopener">Или создайте Discussion вручную</a> с заголовком <code>' + term + '</code>.' +
      '</div>';
  }

  function loadGiscus(term) {
    if (!term || COMMENT_SECTIONS.indexOf(term) < 0) return;
    var wrap = document.querySelector('.page-view.is-active .giscus-mount[data-giscus-term="' + term + '"]');
    if (!wrap) return;
    if (giscusLoadedFor === term && wrap.querySelector('iframe')) return;

    giscusLoadedFor = term;
    wrap.innerHTML = '';

    resolveCategoryId().then(function (catId) {
      var cfg = window.KRWG.giscus;
      if (!cfg.repoId || !catId) {
        wrap.innerHTML = giscusHintHtml('krwg-' + term);
        return;
      }
      var discussionNum = cfg.discussions && cfg.discussions[term];
      var s = document.createElement('script');
      s.src = 'https://giscus.app/client.js';
      s.setAttribute('data-repo', cfg.repo);
      s.setAttribute('data-repo-id', cfg.repoId);
      s.setAttribute('data-category', cfg.category);
      s.setAttribute('data-category-id', catId);
      if (discussionNum) {
        s.setAttribute('data-mapping', 'number');
        s.setAttribute('data-term', String(discussionNum));
      } else {
        s.setAttribute('data-mapping', 'specific');
        s.setAttribute('data-term', 'krwg-' + term);
      }
      s.setAttribute('data-strict', '1');
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

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    });
  }
})();
