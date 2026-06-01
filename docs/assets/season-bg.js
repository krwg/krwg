(function () {
  'use strict';

  var canvas = document.getElementById('seasonCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0, dpr = 1;
  var particles = [];
  var restingCount = new Map();
  var raf = null;
  var season = document.documentElement.getAttribute('data-season') || 'spring';
  var reduced = document.documentElement.getAttribute('data-reduced-motion') === 'true';
  var obstacleCache = [];
  var obstacleTick = 0;

  var SEASON_CFG = {
    spring: { rate: 0.55, max: 90, gravity: 0.11, wind: 0.35, windVar: 0.2, kind: 'sakura' },
    summer: { rate: 0.22, max: 45, gravity: 0.07, wind: 0.12, windVar: 0.08, kind: 'pollen' },
    autumn: { rate: 0.42, max: 75, gravity: 0.13, wind: 0.55, windVar: 0.35, kind: 'maple' },
    winter: { rate: 0.48, max: 80, gravity: 0.05, wind: 0.18, windVar: 0.1, kind: 'snow' }
  };

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function refreshObstacles() {
    obstacleCache = [];
    var sel = '.page-view.is-active .page-section, .page-view.is-active .hero, .page-view.is-active .comments-section, nav, footer';
    document.querySelectorAll(sel).forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.width < 40 || r.height < 20) return;
      if (r.bottom < 0 || r.top > H) return;
      obstacleCache.push({
        id: el.className + Math.round(r.top),
        left: r.left + 4,
        right: r.right - 4,
        top: r.top,
        bottom: r.bottom
      });
    });
  }

  function surfaceKey(obs) { return obs.id; }

  function restingOnSurface(key) {
    return restingCount.get(key) || 0;
  }

  function addResting(key) {
    restingCount.set(key, restingOnSurface(key) + 1);
  }

  function spawnParticle() {
    var cfg = SEASON_CFG[season] || SEASON_CFG.spring;
    if (particles.length >= cfg.max) return;
    particles.push({
      x: Math.random() * W,
      y: -12 - Math.random() * 40,
      vx: (Math.random() - 0.5) * cfg.wind,
      vy: Math.random() * 0.8 + 0.4,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.04,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      kind: cfg.kind,
      resting: false,
      surface: null,
      life: 0
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    if (p.kind === 'snow') {
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'rgba(240,237,232,0.75)' : 'rgba(255,255,255,0.9)';
      ctx.beginPath();
      ctx.arc(0, 0, p.w * 0.35, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === 'maple') {
      ctx.fillStyle = ['#c45c26', '#a83232', '#d4a017', '#8b4513'][Math.floor(p.life % 4)];
      ctx.beginPath();
      ctx.moveTo(0, -p.h);
      ctx.lineTo(p.w * 0.6, 0);
      ctx.lineTo(0, p.h);
      ctx.lineTo(-p.w * 0.6, 0);
      ctx.closePath();
      ctx.fill();
    } else if (p.kind === 'pollen') {
      ctx.fillStyle = css('--accent');
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(0, 0, 1.2 + (p.life % 3) * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = css('--sakura');
      ctx.globalAlpha = 0.55 + Math.random() * 0.25;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.w * 0.5, p.h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  function tick() {
    var cfg = SEASON_CFG[season] || SEASON_CFG.spring;
    if (!reduced && Math.random() < cfg.rate) spawnParticle();

    if (++obstacleTick % 8 === 0) refreshObstacles();

    var wind = Math.sin(Date.now() / 2400) * cfg.windVar;

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.life++;

      if (p.resting) {
        if (p.life > 900) {
          if (p.surface) restingCount.set(p.surface, Math.max(0, restingOnSurface(p.surface) - 1));
          particles.splice(i, 1);
        }
        continue;
      }

      p.vy += cfg.gravity;
      p.vx += wind * 0.02 + (Math.random() - 0.5) * 0.02;
      p.vx *= 0.99;
      p.rot += p.rotV;

      var nx = p.x + p.vx;
      var ny = p.y + p.vy;

      if (ny > H + 20) {
        particles.splice(i, 1);
        continue;
      }

      var landed = false;
      for (var o = 0; o < obstacleCache.length; o++) {
        var obs = obstacleCache[o];
        if (nx < obs.left || nx > obs.right) continue;
        if (p.y < obs.top && ny >= obs.top - 2 && p.vy > 0) {
          var key = surfaceKey(obs);
          if (restingOnSurface(key) < 14) {
            p.x = nx;
            p.y = obs.top - 1;
            p.vx *= 0.3;
            p.vy = 0;
            p.resting = true;
            p.surface = key;
            p.life = 0;
            addResting(key);
            landed = true;
          }
          break;
        }
      }

      if (!landed) {
        p.x = nx;
        p.y = ny;
      }
    }

    ctx.clearRect(0, 0, W, H);
    particles.forEach(drawPetal);
  }

  function loop() {
    tick();
    raf = requestAnimationFrame(loop);
  }

  function setSeason(s) {
    season = s || 'spring';
    document.documentElement.setAttribute('data-season', season);
    particles = [];
    restingCount.clear();
  }

  window.krwgSeasonBgSetSeason = setSeason;
  window.krwgSeasonBgSetTheme = function () { /* canvas reads CSS vars each frame */ };

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('hashchange', function () {
    restingCount.clear();
    particles = particles.filter(function (p) { return !p.resting; });
  }, { passive: true });

  if (!reduced) loop();
  else canvas.style.display = 'none';

  document.dispatchEvent(new CustomEvent('krwg:season-bg-ready'));
})();
