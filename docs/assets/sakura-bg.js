(function () {
  'use strict';

  var canvas = document.getElementById('seasonCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0, dpr = 1;
  var particles = [];
  var restingCount = new Map();
  var obstacleCache = [];
  var obstacleTick = 0;
  var reduced = document.documentElement.getAttribute('data-reduced-motion') === 'true';

  var CFG = { rate: 0.55, max: 90, gravity: 0.11, wind: 0.35, windVar: 0.2 };

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
        top: r.top
      });
    });
  }

  function restingOnSurface(key) {
    return restingCount.get(key) || 0;
  }

  function spawnParticle() {
    if (particles.length >= CFG.max) return;
    particles.push({
      x: Math.random() * W,
      y: -12 - Math.random() * 40,
      vx: (Math.random() - 0.5) * CFG.wind,
      vy: Math.random() * 0.8 + 0.4,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.04,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      resting: false,
      surface: null,
      life: 0
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = css('--sakura');
    ctx.globalAlpha = 0.55 + (p.life % 5) * 0.06;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.w * 0.5, p.h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    if (!reduced && Math.random() < CFG.rate) spawnParticle();
    if (++obstacleTick % 8 === 0) refreshObstacles();

    var wind = Math.sin(Date.now() / 2400) * CFG.windVar;

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

      p.vy += CFG.gravity;
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
          if (restingOnSurface(obs.id) < 14) {
            p.x = nx;
            p.y = obs.top - 1;
            p.resting = true;
            p.surface = obs.id;
            p.life = 0;
            restingCount.set(obs.id, restingOnSurface(obs.id) + 1);
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
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('hashchange', function () {
    restingCount.clear();
    particles = particles.filter(function (p) { return !p.resting; });
  }, { passive: true });

  if (!reduced) loop();
  else canvas.style.display = 'none';

  document.dispatchEvent(new CustomEvent('krwg:sakura-ready'));
})();
