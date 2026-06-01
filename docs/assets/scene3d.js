import * as THREE from 'three';

const SEASONS = ['spring', 'summer', 'autumn', 'winter'];

const PALETTE = {
  spring: { foliage: 0x5a8f6a, blossom: 0xf4a7b9, ground: 0x3d5c40, fog: 0xf5ebe3 },
  summer: { foliage: 0x4a7c59, blossom: 0xffffff, ground: 0x2f4a35, fog: 0xe8f0ea },
  autumn: { foliage: 0xc45c26, blossom: 0xd4843a, ground: 0x4a3020, fog: 0xf0e4d8 },
  winter: { foliage: 0x4a5568, blossom: 0xffffff, ground: 0x8899aa, fog: 0xdde4ec }
};

let renderer;
let scene;
let camera;
let mountFuji;
let bonsaiGroup;
let sakuraPoints;
let snowPoints;
let animationId;
let mouse = { x: 0, y: 0 };
let state = { season: 'spring', theme: 'light', reduced: false };

export function initKrwgScene(container, options = {}) {
  if (!container || renderer) return;
  state.season = options.season || detectSeason();
  state.theme = options.theme || 'light';
  state.reduced = !!options.reducedMotion;

  container.style.width = '100%';
  container.style.height = '100%';

  const w = window.innerWidth;
  const h = window.innerHeight;

  scene = new THREE.Scene();
  applyAtmosphere();

  camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 200);
  camera.position.set(0, 4.2, 14);
  camera.lookAt(0, 2.5, -2);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = state.theme === 'dark' ? 0.85 : 1.05;
  container.appendChild(renderer.domElement);

  const hemi = new THREE.HemisphereLight(0xddeeff, 0x334422, 0.55);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xfff5e6, state.theme === 'dark' ? 0.65 : 1.1);
  sun.position.set(8, 14, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 40;
  sun.shadow.camera.left = -12;
  sun.shadow.camera.right = 12;
  sun.shadow.camera.top = 12;
  sun.shadow.camera.bottom = -12;
  scene.add(sun);

  const rim = new THREE.DirectionalLight(0xffccd5, 0.25);
  rim.position.set(-6, 4, -8);
  scene.add(rim);

  buildGround();
  mountFuji = buildMountFuji();
  scene.add(mountFuji);
  bonsaiGroup = buildBonsai();
  scene.add(bonsaiGroup);
  sakuraPoints = buildSakura(state.season === 'winter' ? 0 : (state.reduced ? 400 : 1200));
  scene.add(sakuraPoints);
  if (state.season === 'winter') {
    snowPoints = buildSnow(state.reduced ? 200 : 600);
    scene.add(snowPoints);
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  let t = 0;
  function animate() {
    animationId = requestAnimationFrame(animate);
    if (!state.reduced) t += 0.004;
    const px = mouse.x * 0.35;
    const py = mouse.y * 0.12;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 4.2 + py, 0.04);
    camera.lookAt(px * 0.3, 2.5, -2);

    if (bonsaiGroup) bonsaiGroup.rotation.z = Math.sin(t * 0.7) * 0.015;
    if (sakuraPoints && sakuraPoints.userData.vel) animatePoints(sakuraPoints, t, 0.012);
    if (snowPoints && snowPoints.userData.vel) animatePoints(snowPoints, t, 0.008);

    renderer.render(scene, camera);
  }
  animate();
}

export function setKrwgSeason(season) {
  if (!SEASONS.includes(season)) return;
  state.season = season;
  applyAtmosphere();
  if (mountFuji) updateMountainSnow();
  if (bonsaiGroup) {
    scene.remove(bonsaiGroup);
    bonsaiGroup = buildBonsai();
    scene.add(bonsaiGroup);
  }
  if (sakuraPoints) {
    scene.remove(sakuraPoints);
    sakuraPoints.dispose?.();
    sakuraPoints = buildSakura(season === 'winter' ? 0 : (state.reduced ? 400 : 1200));
    scene.add(sakuraPoints);
  }
  if (snowPoints) {
    scene.remove(snowPoints);
    snowPoints.geometry?.dispose();
    snowPoints.material?.dispose();
    snowPoints = null;
  }
  if (season === 'winter') {
    snowPoints = buildSnow(state.reduced ? 200 : 600);
    scene.add(snowPoints);
  }
}

export function setKrwgTheme(theme) {
  state.theme = theme;
  if (renderer) renderer.toneMappingExposure = theme === 'dark' ? 0.85 : 1.05;
  applyAtmosphere();
  if (mountFuji) updateMountainSnow();
}

export function detectSeason() {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 8 && m <= 10) return 'autumn';
  if (m === 11 || m <= 1) return 'winter';
  return 'summer';
}

function applyAtmosphere() {
  if (!scene) return;
  const p = PALETTE[state.season];
  const dark = state.theme === 'dark';
  scene.background = new THREE.Color(dark ? 0x0a0908 : p.fog);
  scene.fog = new THREE.FogExp2(dark ? 0x12110f : p.fog, dark ? 0.045 : 0.028);
}

function buildGround() {
  const geo = new THREE.PlaneGeometry(80, 80, 64, 64);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const n = Math.sin(x * 0.15) * Math.cos(y * 0.12) * 0.25 + Math.random() * 0.05;
    pos.setZ(i, n);
  }
  geo.computeVertexNormals();
  const p = PALETTE[state.season];
  const mat = new THREE.MeshStandardMaterial({
    color: state.season === 'winter' ? 0xdde4ee : p.ground,
    roughness: 0.92,
    metalness: 0.02,
    flatShading: false
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.05;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function buildMountFuji() {
  const group = new THREE.Group();
  group.position.set(-2, 0, -8);

  const profile = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const r = THREE.MathUtils.lerp(5.6, 0.35, Math.pow(t, 0.82));
    const y = t * 9.2;
    profile.push(new THREE.Vector2(r, y));
  }
  const bodyGeo = new THREE.LatheGeometry(profile, 96);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: state.theme === 'dark' ? 0x3d4450 : 0x5c6370,
    roughness: 0.78,
    metalness: 0.1,
    flatShading: false
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  body.receiveShadow = true;
  body.name = 'fujiBody';
  group.add(body);

  const snowGeo = new THREE.LatheGeometry(
    [
      new THREE.Vector2(0.35, 7.2),
      new THREE.Vector2(0.9, 8.1),
      new THREE.Vector2(1.35, 8.85),
      new THREE.Vector2(0.2, 9.15)
    ],
    64
  );
  const snowMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.28,
    metalness: 0.04,
    emissive: 0x334455,
    emissiveIntensity: state.theme === 'dark' ? 0.18 : 0.06
  });
  const snow = new THREE.Mesh(snowGeo, snowMat);
  snow.castShadow = true;
  snow.name = 'fujiSnow';
  group.add(snow);

  const baseGeo = new THREE.CylinderGeometry(6.2, 7.4, 1.4, 64);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x3f4854, roughness: 0.95 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.55;
  base.receiveShadow = true;
  group.add(base);

  updateMountainSnowOnGroup(group);
  return group;
}

function updateMountainSnow() {
  if (mountFuji) updateMountainSnowOnGroup(mountFuji);
}

function updateMountainSnowOnGroup(group) {
  const snow = group.getObjectByName('fujiSnow');
  const body = group.getObjectByName('fujiBody');
  if (!snow || !body) return;
  const w = state.season === 'winter';
  snow.visible = true;
  snow.scale.set(w ? 1.12 : 1, w ? 1.08 : 1, w ? 1.12 : 1);
  snow.material.emissiveIntensity = state.theme === 'dark' ? (w ? 0.22 : 0.15) : (w ? 0.08 : 0.05);
  body.material.color.setHex(state.theme === 'dark' ? 0x3d4450 : 0x5c6370);
}

function buildBonsai() {
  const group = new THREE.Group();
  group.position.set(5.2, 0, 1.2);
  group.scale.setScalar(1.15);

  const potGeo = new THREE.CylinderGeometry(0.55, 0.42, 0.38, 32);
  const potMat = new THREE.MeshStandardMaterial({ color: 0x4a3528, roughness: 0.55, metalness: 0.1 });
  const pot = new THREE.Mesh(potGeo, potMat);
  pot.position.y = 0.19;
  pot.castShadow = true;
  pot.receiveShadow = true;
  group.add(pot);

  const trayGeo = new THREE.BoxGeometry(1.35, 0.08, 1.05);
  const tray = new THREE.Mesh(trayGeo, potMat);
  tray.position.y = 0.02;
  tray.receiveShadow = true;
  group.add(tray);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.4, 0),
    new THREE.Vector3(-0.08, 0.9, 0.05),
    new THREE.Vector3(-0.22, 1.35, -0.08),
    new THREE.Vector3(-0.35, 1.75, 0.02),
    new THREE.Vector3(-0.15, 2.05, 0.12),
    new THREE.Vector3(0.12, 2.35, -0.05),
    new THREE.Vector3(0.28, 2.55, 0.08)
  ]);
  const trunkGeo = new THREE.TubeGeometry(curve, 64, 0.07, 12, false);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.9, metalness: 0.02 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.castShadow = true;
  group.add(trunk);

  const branchPoints = [
    [-0.32, 1.72, 0], [-0.12, 2.12, 0.1], [0.22, 2.48, 0], [0.05, 1.95, -0.12], [-0.2, 2.35, 0.08]
  ];
  const p = PALETTE[state.season];
  branchPoints.forEach(([x, y, z], i) => {
    const folGeo = new THREE.IcosahedronGeometry(0.35 + (i % 3) * 0.08, 2);
    const isBlossom = state.season === 'spring' && i % 2 === 0;
    const col = state.season === 'autumn' ? (i % 2 ? 0xb84318 : 0xd4843a)
      : state.season === 'winter' ? 0x64748b
      : isBlossom ? p.blossom : p.foliage;
    const folMat = new THREE.MeshStandardMaterial({
      color: col,
      roughness: 0.72,
      metalness: 0.04,
      emissive: isBlossom ? 0x442233 : 0x000000,
      emissiveIntensity: isBlossom ? 0.12 : 0
    });
    const fol = new THREE.Mesh(folGeo, folMat);
    fol.position.set(x, y, z);
    fol.castShadow = true;
    group.add(fol);

    if (state.season === 'spring') {
      for (let b = 0; b < 6; b++) {
        const petalGeo = new THREE.SphereGeometry(0.045, 8, 8);
        const petal = new THREE.Mesh(petalGeo, new THREE.MeshStandardMaterial({
          color: p.blossom,
          roughness: 0.4,
          emissive: 0x552233,
          emissiveIntensity: 0.08
        }));
        const ang = (b / 6) * Math.PI * 2;
        petal.position.set(x + Math.cos(ang) * 0.28, y + Math.sin(ang) * 0.18, z + Math.sin(ang * 0.5) * 0.15);
        group.add(petal);
      }
    }

    if (state.season === 'winter') {
      const capGeo = new THREE.SphereGeometry(0.22, 12, 12);
      const cap = new THREE.Mesh(capGeo, new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 }));
      cap.position.set(x, y + 0.18, z);
      cap.scale.y = 0.45;
      group.add(cap);
    }
  });

  return group;
}

function buildSakura(count) {
  if (!count) return new THREE.Group();
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const p = PALETTE[state.season];
  const c = new THREE.Color(state.season === 'autumn' ? 0xd4843a : p.blossom);

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 24;
    pos[i * 3 + 1] = Math.random() * 14 + 1;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
    vel[i * 3] = (Math.random() - 0.5) * 0.008;
    vel[i * 3 + 1] = -0.006 - Math.random() * 0.012;
    vel[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

  const mat = new THREE.PointsMaterial({
    size: state.season === 'autumn' ? 0.09 : 0.07,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    sizeAttenuation: true
  });
  const points = new THREE.Points(geo, mat);
  points.userData.vel = vel;
  points.userData.pos = pos;
  return points;
}

function buildSnow(count) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 1] = Math.random() * 14 + 1;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    vel[i * 3] = (Math.random() - 0.5) * 0.004;
    vel[i * 3 + 1] = -0.004 - Math.random() * 0.008;
    vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ size: 0.06, color: 0xf8fafc, transparent: true, opacity: 0.9, depthWrite: false });
  const points = new THREE.Points(geo, mat);
  points.userData.vel = vel;
  points.userData.pos = pos;
  return points;
}

function animatePoints(points, t, wind) {
  const pos = points.userData.pos;
  const vel = points.userData.vel;
  if (!pos || !vel) return;
  for (let i = 0; i < pos.length / 3; i++) {
    pos[i * 3] += vel[i * 3] + Math.sin(t + i) * wind * 0.3;
    pos[i * 3 + 1] += vel[i * 3 + 1];
    pos[i * 3 + 2] += vel[i * 3 + 2];
    if (pos[i * 3 + 1] < -0.2) {
      pos[i * 3 + 1] = 12 + Math.random() * 4;
      pos[i * 3] = (Math.random() - 0.5) * 24;
    }
  }
  points.geometry.attributes.position.needsUpdate = true;
}

function onResize() {
  const container = renderer?.domElement?.parentElement;
  if (!camera || !renderer) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function onMouseMove(e) {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
}
