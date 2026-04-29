(function() {
  const saved = localStorage.getItem('bd_theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  if (isLight) {
    html.removeAttribute('data-theme');
    localStorage.setItem('bd_theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('bd_theme', 'light');
  }
  updateThemeIcon();
  updateHeaderBg();
}

function updateThemeIcon() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  btn.innerHTML = isLight
    ? '<span class="material-symbols-outlined">dark_mode</span>'
    : '<span class="material-symbols-outlined">light_mode</span>';
}

function updateHeaderBg() {
  const header = document.getElementById('main-header');
  if (!header) return;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const scrolled = window.scrollY > 80;
  if (isLight) {
    header.style.background = scrolled ? 'rgba(245,240,232,0.96)' : 'rgba(245,240,232,0.82)';
    header.style.borderBottomColor = scrolled ? 'rgba(184,134,11,0.18)' : 'rgba(184,134,11,0.08)';
  } else {
    header.style.background = scrolled ? 'rgba(10,11,13,0.92)' : 'rgba(10,11,13,0.6)';
    header.style.borderBottomColor = scrolled ? 'rgba(212,168,83,0.12)' : 'rgba(212,168,83,0.06)';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateThemeIcon();
  updateHeaderBg();
});
