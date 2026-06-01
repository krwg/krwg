(function () {
  'use strict';

  /** Add Telegraph URLs or paths here — newest first. */
  window.KRWG_TELEGRAPH = window.KRWG_TELEGRAPH || [];

  var TELEGRAPH_API = 'https://api.telegra.ph';
  var CACHE_URL = 'assets/data/posts-cache.json';
  var pageCache = new Map();
  var cachePromise = null;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function t(key) {
    if (window.krwgPostsLabel) return window.krwgPostsLabel(key);
    return key;
  }

  function pathFromInput(input) {
    var s = String(input || '').trim();
    if (!s) return '';
    try {
      if (/telegra\.ph/i.test(s)) {
        var u = new URL(s);
        return decodeURIComponent(u.pathname.replace(/^\/+/, ''));
      }
    } catch (e) { /* not a URL */ }
    return decodeURIComponent(s.replace(/^\/+/, ''));
  }

  function publicUrl(path) {
    return 'https://telegra.ph/' + path;
  }

  function assetUrl(src) {
    if (!src) return '';
    if (/^https?:\/\//i.test(src)) return src;
    if (src.indexOf('//') === 0) return 'https:' + src;
    return 'https://telegra.ph' + (src.charAt(0) === '/' ? src : '/' + src);
  }

  function loadCacheFile() {
    if (cachePromise) return cachePromise;
    cachePromise = fetch(CACHE_URL).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; });
    return cachePromise;
  }

  function fetchPage(path) {
    if (pageCache.has(path)) return Promise.resolve(pageCache.get(path));
    var apiUrl = TELEGRAPH_API + '/getPage/' + encodeURIComponent(path) + '?return_content=true';
    return fetch(apiUrl).then(function (res) {
      if (!res.ok) throw new Error('telegraph_http');
      return res.json();
    }).then(function (data) {
      if (!data.ok || !data.result) throw new Error('telegraph_bad');
      pageCache.set(path, data.result);
      return data.result;
    }).catch(function () {
      return loadCacheFile().then(function (cache) {
        if (cache[path]) {
          pageCache.set(path, cache[path]);
          return cache[path];
        }
        throw new Error('telegraph_unavailable');
      });
    });
  }

  function renderNode(node) {
    if (node == null) return '';
    if (typeof node === 'string') return esc(node);
    var tag = String(node.tag || '').toLowerCase();
    var children = (node.children || []).map(renderNode).join('');
    var attrs = node.attrs || {};
    var attrStr = Object.keys(attrs).map(function (k) {
      return ' ' + k + '="' + esc(String(attrs[k])) + '"';
    }).join('');

    if (tag === 'br') return '<br>';
    if (tag === 'hr') return '<hr>';
    if (tag === 'img') {
      return '<figure class="tg-fig"><img src="' + esc(assetUrl(attrs.src)) + '" alt="" loading="lazy"></figure>';
    }
    if (tag === 'iframe') {
      return '<figure class="tg-fig tg-embed"><iframe src="' + esc(assetUrl(attrs.src)) + '" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation" allowfullscreen></iframe></figure>';
    }
    if (tag === 'video') {
      return '<figure class="tg-fig"><video controls playsinline src="' + esc(assetUrl(attrs.src)) + '"></video></figure>';
    }
    if (tag === 'a') {
      return '<a href="' + esc(attrs.href || '#') + '" target="_blank" rel="noopener noreferrer">' + children + '</a>';
    }
    var allowed = ['p', 'h3', 'h4', 'blockquote', 'pre', 'code', 'b', 'strong', 'i', 'em', 'u', 's', 'ul', 'ol', 'li', 'figure', 'figcaption', 'aside'];
    if (allowed.indexOf(tag) < 0) return children;
    return '<' + tag + attrStr + '>' + children + '</' + tag + '>';
  }

  function renderContent(nodes) {
    if (!nodes || !nodes.length) return '<p>' + esc(t('posts.error')) + '</p>';
    return nodes.map(renderNode).join('');
  }

  function paths() {
    return (window.KRWG_TELEGRAPH || []).map(pathFromInput).filter(Boolean);
  }

  function cardHtml(page) {
    var path = page.path;
    var title = page.title || path;
    var desc = page.description || '';
    var views = page.views ? page.views + ' ' + t('posts.views') : '';
    return '<button type="button" class="post-card reveal" data-post-path="' + esc(path) + '">' +
      '<span class="post-card-tag">' + esc(t('posts.tag')) + '</span>' +
      (views ? '<span class="post-card-views">' + esc(views) + '</span>' : '') +
      '<h3 class="post-card-title">' + esc(title) + '</h3>' +
      (desc ? '<p class="post-card-desc">' + esc(desc) + '</p>' : '') +
      '<span class="post-card-more">' + esc(t('posts.readMore')) + '</span>' +
      '</button>';
  }

  function showList() {
    var list = document.getElementById('postsListView');
    var article = document.getElementById('postsArticleView');
    var grid = document.getElementById('postsGrid');
    if (!list || !article || !grid) return;

    list.hidden = false;
    article.hidden = true;

    var ps = paths();
    if (!ps.length) {
      grid.innerHTML = '<div class="posts-empty reveal visible">' + esc(t('posts.empty')) + '</div>';
      return;
    }

    grid.innerHTML = '<div class="posts-loading">' + esc(t('posts.loading')) + '</div>';

    Promise.all(ps.map(function (path) {
      return fetchPage(path).catch(function () {
        return {
          path: path,
          title: path.replace(/-/g, ' '),
          description: '',
          content: [{ tag: 'p', children: [t('posts.error')] }]
        };
      });
    })).then(function (pages) {
      grid.innerHTML = pages.map(cardHtml).join('');
      grid.querySelectorAll('[data-post-path]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          location.hash = '#posts/' + encodeURIComponent(btn.getAttribute('data-post-path'));
        });
      });
      grid.querySelectorAll('.reveal').forEach(function (el) {
        requestAnimationFrame(function () { el.classList.add('visible'); });
      });
    });
  }

  function showArticle(path) {
    var list = document.getElementById('postsListView');
    var article = document.getElementById('postsArticleView');
    var body = document.getElementById('postsArticleBody');
    if (!list || !article || !body) return;

    list.hidden = true;
    article.hidden = false;
    body.innerHTML = '<div class="posts-loading">' + esc(t('posts.loading')) + '</div>';

    fetchPage(path).then(function (page) {
      document.getElementById('postsArticleTitle').textContent = page.title || path;
      var meta = [];
      if (page.author_name) meta.push(t('posts.by') + ' ' + page.author_name);
      if (page.views) meta.push(page.views + ' ' + t('posts.views'));
      document.getElementById('postsArticleMeta').textContent = meta.join(' · ');
      body.innerHTML = renderContent(page.content);
      var ext = document.getElementById('postsOpenTelegraph');
      ext.href = page.url || publicUrl(path);
      ext.textContent = t('posts.openTelegraph');
    }).catch(function () {
      document.getElementById('postsArticleTitle').textContent = path.replace(/-/g, ' ');
      body.innerHTML = '<p>' + esc(t('posts.error')) + '</p>';
    });
  }

  window.krwgPostsRoute = function (subPath) {
    if (subPath) showArticle(subPath);
    else showList();
  };
})();
