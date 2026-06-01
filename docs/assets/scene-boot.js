import { initKrwgScene, setKrwgSeason, setKrwgTheme } from './scene3d.js';

function detectSeason() {
  var m = new Date().getMonth();
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 8 && m <= 10) return 'autumn';
  if (m === 11 || m <= 1) return 'winter';
  return 'summer';
}

function getStoredSeasonMode() {
  return localStorage.getItem('krwg-season') || 'auto';
}

function getEffectiveSeason() {
  var mode = getStoredSeasonMode();
  return mode === 'auto' ? detectSeason() : mode;
}

var root = document.getElementById('scene3d');
if (root) {
  var reduced = document.documentElement.getAttribute('data-reduced-motion') === 'true';
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  initKrwgScene(root, {
    season: getEffectiveSeason(),
    theme: theme,
    reducedMotion: reduced
  });
  window.krwgSceneSetSeason = setKrwgSeason;
  window.krwgSceneSetTheme = setKrwgTheme;
  document.dispatchEvent(new CustomEvent('krwg:scene-ready'));
}
