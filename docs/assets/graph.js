(function () {
  'use strict';

  var GROUP_COLORS = {
    hub: function () { return css('--accent'); },
    page: function () { return css('--fg-light'); },
    post: function () { return css('--fg-dim'); },
    project: function () { return css('--accent'); },
    note: function () { return css('--sakura'); }
  };

  function css(v) {
    return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#888';
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function t(key) {
    if (window.krwgGraphLabel) return window.krwgGraphLabel(key);
    return key;
  }

  function buildGraph() {
    var nodes = [
      { id: 'krwg', group: 'hub', hash: '#home', r: 7, labelKey: 'graph.node.krwg' },
      { id: 'home', group: 'page', hash: '#home', r: 5, labelKey: 'graph.node.home' },
      { id: 'bio', group: 'page', hash: '#bio', r: 5, labelKey: 'graph.node.bio' },
      { id: 'pet', group: 'page', hash: '#pet', r: 5, labelKey: 'graph.node.pet' },
      { id: 'posts', group: 'post', hash: '#posts', r: 5, labelKey: 'graph.node.posts' },
      { id: 'contact', group: 'page', hash: '#contact', r: 5, labelKey: 'graph.node.contact' },
      { id: 'graph', group: 'page', hash: '#graph', r: 5, labelKey: 'graph.node.graph' },
      { id: 'metrika', group: 'project', hash: 'https://github.com/krwg/metrika', external: true, r: 5.5, labelKey: 'graph.node.metrika' },
      { id: 'cultiva', group: 'project', hash: 'https://github.com/krwg/cultiva', external: true, r: 5.5, labelKey: 'graph.node.cultiva' },
      { id: 'blip', group: 'project', hash: 'https://github.com/krwg/blip', external: true, r: 5.5, labelKey: 'graph.node.blip' },
      { id: 'grbl', group: 'project', hash: 'https://github.com/krwg/grbl-writer', external: true, r: 5, labelKey: 'graph.node.grbl' },
      { id: 'tiver', group: 'note', hash: 'https://github.com/krwg/tiver', external: true, r: 4.5, labelKey: 'graph.node.tiver' },
      { id: 'jkeep', group: 'note', hash: 'https://github.com/krwg', external: true, r: 4, labelKey: 'graph.node.jkeep' }
    ];
    var edges = [
      ['krwg', 'home'], ['krwg', 'bio'], ['krwg', 'pet'], ['krwg', 'posts'], ['krwg', 'contact'], ['krwg', 'graph'],
      ['pet', 'metrika'], ['pet', 'cultiva'], ['pet', 'blip'],
      ['bio', 'tiver'], ['bio', 'jkeep'], ['bio', 'cultiva'], ['bio', 'metrika'], ['bio', 'grbl'],
      ['posts', 'krwg'], ['posts', 'metrika'], ['posts', 'grbl'],
      ['graph', 'home'], ['graph', 'bio'], ['graph', 'pet'], ['graph', 'posts'], ['graph', 'contact']
    ];
    nodes.forEach(function (n) { n.label = t(n.labelKey); });
    return { nodes: nodes, edges: edges };
  }

  function placeRing(list, radius, startAngle) {
    var out = [];
    var n = list.length || 1;
    var start = startAngle == null ? -Math.PI / 2 : startAngle;
    list.forEach(function (node, i) {
      var angle = start + (i / n) * Math.PI * 2;
      out.push(Object.assign({}, node, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        vx: 0,
        vy: 0
      }));
    });
    return out;
  }

  function layoutNodes(meta) {
    var hub = meta.filter(function (n) { return n.group === 'hub'; });
    var pages = meta.filter(function (n) { return n.group === 'page' || n.group === 'post'; });
    var projects = meta.filter(function (n) { return n.group === 'project'; });
    var notes = meta.filter(function (n) { return n.group === 'note'; });
    var placed = [];
    hub.forEach(function (n) {
      placed.push(Object.assign({}, n, { x: 0, y: 0, vx: 0, vy: 0 }));
    });
    placed = placed.concat(placeRing(pages, 118, -Math.PI / 2));
    placed = placed.concat(placeRing(projects, 198, -Math.PI / 2 + 0.2));
    placed = placed.concat(placeRing(notes, 255, Math.PI / 6));
    return placed;
  }

  var sim = null;

  function createSim(wrap, canvas, tip) {
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, dpr = window.devicePixelRatio || 1;
    var state = {
      active: false, raf: null, nodes: [], edges: [], backlinks: {},
      cam: { x: 0, y: 0, scale: 1 },
      dragNode: null, panning: false, panStart: null, camStart: null,
      hoverId: null, moved: false, downPos: null
    };

    function resize() {
      var rect = wrap.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function toWorld(sx, sy) {
      return { x: (sx - state.cam.x) / state.cam.scale, y: (sy - state.cam.y) / state.cam.scale };
    }

    function nodeAt(sx, sy) {
      var p = toWorld(sx, sy);
      for (var i = state.nodes.length - 1; i >= 0; i--) {
        var n = state.nodes[i];
        var hit = Math.max(14, n.r + 12);
        if ((p.x - n.x) * (p.x - n.x) + (p.y - n.y) * (p.y - n.y) <= hit * hit) return n;
      }
      return null;
    }

    function fitView() {
      var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      state.nodes.forEach(function (n) {
        minX = Math.min(minX, n.x - 36); maxX = Math.max(maxX, n.x + 36);
        minY = Math.min(minY, n.y - 36); maxY = Math.max(maxY, n.y + 36);
      });
      var pad = 56, bw = maxX - minX + pad * 2, bh = maxY - minY + pad * 2;
      state.cam.scale = Math.min(W / bw, H / bh, 1.85) || 1;
      state.cam.x = W / 2 - ((minX + maxX) / 2) * state.cam.scale;
      state.cam.y = H / 2 - ((minY + maxY) / 2) * state.cam.scale;
    }

    function reload() {
      var built = buildGraph();
      state.nodes = layoutNodes(built.nodes);
      state.edges = built.edges;
      state.backlinks = {};
      state.edges.forEach(function (pair) {
        var to = pair[1], from = pair[0];
        if (!state.backlinks[to]) state.backlinks[to] = [];
        if (state.backlinks[to].indexOf(from) < 0) state.backlinks[to].push(from);
      });
      state.dragNode = null; state.panning = false;
      fitView();
    }

    function refreshLabels() {
      state.nodes.forEach(function (n) {
        if (n.labelKey) n.label = t(n.labelKey);
      });
    }

    function drawGrid() {
      var step = 22 * state.cam.scale;
      if (step < 12) return;
      var ox = state.cam.x % step;
      var oy = state.cam.y % step;
      ctx.strokeStyle = css('--border-light');
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.35;
      for (var x = ox; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (var y = oy; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      var rep = 520, spring = 0.014, damp = 0.9, center = 0.0025;
      for (var i = 0; i < state.nodes.length; i++) {
        for (var j = i + 1; j < state.nodes.length; j++) {
          var a = state.nodes[i], b = state.nodes[j];
          var dx = b.x - a.x, dy = b.y - a.y, dist = Math.hypot(dx, dy) || 0.01;
          var minDist = (a.r + b.r) * 6;
          var f = rep / (dist * dist);
          if (dist < minDist) f += (minDist - dist) * 0.08;
          a.vx -= (dx / dist) * f; a.vy -= (dy / dist) * f;
          b.vx += (dx / dist) * f; b.vy += (dy / dist) * f;
        }
      }
      state.edges.forEach(function (pair) {
        var a = state.nodes.find(function (n) { return n.id === pair[0]; });
        var b = state.nodes.find(function (n) { return n.id === pair[1]; });
        if (!a || !b) return;
        var dx = b.x - a.x, dy = b.y - a.y;
        a.vx += dx * spring; a.vy += dy * spring;
        b.vx -= dx * spring; b.vy -= dy * spring;
      });
      state.nodes.forEach(function (n) {
        if (n === state.dragNode) return;
        if (n.group === 'hub') {
          n.vx += -n.x * 0.04; n.vy += -n.y * 0.04;
        } else {
          n.vx += -n.x * center; n.vy += -n.y * center;
        }
        n.vx *= damp; n.vy *= damp;
        n.x += n.vx; n.y += n.vy;
      });
    }

    function drawLabel(n, active, linked) {
      var show = active || linked || n.group === 'hub' || n.group === 'project' || n.group === 'note';
      if (!show) return;
      var fontPx = Math.max(10, 11 / state.cam.scale);
      ctx.globalAlpha = active ? 1 : linked || n.group === 'hub' ? 0.92 : 0.72;
      ctx.fillStyle = css('--fg');
      ctx.font = fontPx + 'px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(n.label, n.x, n.y + n.r + 8);
      ctx.globalAlpha = 1;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawGrid();
      ctx.save();
      ctx.translate(state.cam.x, state.cam.y);
      ctx.scale(state.cam.scale, state.cam.scale);

      ctx.strokeStyle = css('--fg-light');
      ctx.lineWidth = 0.7 / state.cam.scale;
      ctx.globalAlpha = 0.28;
      state.edges.forEach(function (pair) {
        var a = state.nodes.find(function (n) { return n.id === pair[0]; });
        var b = state.nodes.find(function (n) { return n.id === pair[1]; });
        if (!a || !b) return;
        var hot = state.hoverId && (pair[0] === state.hoverId || pair[1] === state.hoverId);
        ctx.globalAlpha = hot ? 0.55 : 0.22;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });

      state.nodes.forEach(function (n) {
        var active = n.id === state.hoverId || n === state.dragNode;
        var linked = state.hoverId && state.edges.some(function (e) {
          return (e[0] === state.hoverId && e[1] === n.id) || (e[1] === state.hoverId && e[0] === n.id);
        });
        ctx.globalAlpha = active ? 1 : linked ? 0.85 : 0.55;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (active ? 1.35 : 1), 0, Math.PI * 2);
        ctx.fillStyle = (GROUP_COLORS[n.group] || GROUP_COLORS.page)();
        ctx.fill();
        if (n.group === 'project' || n.group === 'hub') {
          ctx.strokeStyle = css('--accent');
          ctx.lineWidth = (active ? 1.4 : 0.9) / state.cam.scale;
          ctx.globalAlpha = active ? 1 : 0.45;
          ctx.stroke();
        } else if (active) {
          ctx.strokeStyle = css('--accent');
          ctx.lineWidth = 1.2 / state.cam.scale;
          ctx.stroke();
        }
        drawLabel(n, active, linked);
        ctx.globalAlpha = 1;
      });
      ctx.restore();
    }

    function loop() {
      if (!state.active) return;
      var page = document.querySelector('.page-view[data-page="graph"]');
      if (!page || !page.classList.contains('is-active')) return;
      tick(); draw();
      state.raf = requestAnimationFrame(loop);
    }

    function localXY(e) {
      var r = canvas.getBoundingClientRect();
      return { sx: e.clientX - r.left, sy: e.clientY - r.top };
    }

    function openNode(n) {
      if (!n || !n.hash) return;
      if (n.external) { window.open(n.hash, '_blank', 'noopener'); return; }
      location.hash = n.hash;
    }

    function onDown(e) {
      if (!state.active) return;
      canvas.setPointerCapture(e.pointerId);
      var pt = localXY(e);
      state.downPos = pt; state.moved = false;
      var n = nodeAt(pt.sx, pt.sy);
      if (n) state.dragNode = n;
      else {
        state.panning = true;
        state.panStart = { x: e.clientX, y: e.clientY };
        state.camStart = { x: state.cam.x, y: state.cam.y };
      }
      canvas.classList.add('is-dragging');
    }

    function onMove(e) {
      if (!state.active || !canvas.hasPointerCapture(e.pointerId)) return;
      var pt = localXY(e);
      if (state.downPos && Math.hypot(pt.sx - state.downPos.sx, pt.sy - state.downPos.sy) > 4) state.moved = true;
      if (state.dragNode) {
        var p = toWorld(pt.sx, pt.sy);
        state.dragNode.x = p.x; state.dragNode.y = p.y;
        state.dragNode.vx = 0; state.dragNode.vy = 0;
      } else if (state.panning && state.panStart) {
        state.cam.x = state.camStart.x + (e.clientX - state.panStart.x);
        state.cam.y = state.camStart.y + (e.clientY - state.panStart.y);
      } else {
        var n = nodeAt(pt.sx, pt.sy);
        state.hoverId = n ? n.id : null;
        if (n && tip) {
          var refs = state.backlinks[n.id] || [];
          var labels = refs.map(function (id) {
            var node = state.nodes.find(function (x) { return x.id === id; });
            return node && node.label;
          }).filter(Boolean).slice(0, 6);
          var kind = n.group === 'project' ? t('graph.legend.project')
            : n.group === 'note' ? t('graph.legend.note')
            : n.group === 'hub' ? t('graph.legend.hub')
            : t('graph.legend.page');
          var bl = labels.length
            ? '<span class="graph-tip-back">' + esc(t('graph.backlinks')) + ' · ' + labels.map(esc).join(' · ') + '</span>'
            : '';
          tip.innerHTML = '<strong>' + esc(n.label) + '</strong>' +
            '<span class="graph-tip-kind">' + esc(kind) + '</span>' + bl;
          tip.style.left = (pt.sx + 12) + 'px';
          tip.style.top = (pt.sy + 12) + 'px';
          tip.classList.add('visible');
        } else if (tip) tip.classList.remove('visible');
      }
    }

    function onUp(e) {
      if (!canvas.hasPointerCapture(e.pointerId)) return;
      canvas.releasePointerCapture(e.pointerId);
      var pt = localXY(e);
      if (!state.moved) { var n = nodeAt(pt.sx, pt.sy); if (n) openNode(n); }
      state.dragNode = null; state.panning = false; state.panStart = null;
      canvas.classList.remove('is-dragging');
    }

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    canvas.addEventListener('wheel', function (e) {
      if (!state.active) return;
      e.preventDefault();
      var pt = localXY(e);
      var before = toWorld(pt.sx, pt.sy);
      state.cam.scale = Math.min(3, Math.max(0.35, state.cam.scale * (e.deltaY > 0 ? 0.93 : 1.07)));
      state.cam.x = pt.sx - before.x * state.cam.scale;
      state.cam.y = pt.sy - before.y * state.cam.scale;
    }, { passive: false });
    canvas.addEventListener('pointerleave', function () { state.hoverId = null; if (tip) tip.classList.remove('visible'); });
    window.addEventListener('resize', function () { if (state.active) { resize(); draw(); } }, { passive: true });

    return {
      start: function () { state.active = true; resize(); reload(); loop(); },
      stop: function () { state.active = false; if (state.raf) cancelAnimationFrame(state.raf); },
      refreshLabels: refreshLabels
    };
  }

  window.krwgInitGraph = function () {
    var wrap = document.getElementById('graphCanvasWrap');
    var canvas = document.getElementById('graphCanvas');
    var tip = document.getElementById('graphTooltip');
    if (!wrap || !canvas) return;
    if (!sim) sim = createSim(wrap, canvas, tip);
    else {
      sim.refreshLabels();
      sim.stop();
    }
    sim.start();
  };

  window.krwgStopGraph = function () {
    if (sim) sim.stop();
  };
})();
