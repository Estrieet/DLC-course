/* ============================================================
   app.js - Main application controller
   Sidebar, navigation, theme, mobile menu
   ============================================================ */

const NAV_ITEMS = [
  { href: 'index.html',     label: 'Home',            icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { href: 'dashboard.html', label: 'Dashboard',       icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
  { href: 'lessons.html',   label: 'Lessons',         icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' },
  { href: 'typing.html',    label: 'Typing Practice', icon: 'M9 19c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1zM21 10c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v1z' },
  { href: 'progress.html',  label: 'My Progress',     icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { href: 'teacher.html',   label: 'Teacher',         icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  { href: 'help.html',      label: 'Help',            icon: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.5 3.5 0 1 1 13 13.355z' }
];

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  const currentPage = getCurrentPage();
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <span class="brand-icon">💻</span>
      <span class="brand-text">Digital Literacy</span>
    </div>
    <nav class="sidebar-nav" role="navigation" aria-label="Main navigation">
      ${NAV_ITEMS.map(item => {
        const isActive = currentPage === item.href;
        return `<a href="${item.href}" class="nav-item${isActive ? ' active' : ''}" aria-current="${isActive ? 'page' : 'false'}">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="${item.icon}"/>
          </svg>
          <span class="nav-label">${item.label}</span>
        </a>`;
      }).join('')}
    </nav>
    <div class="sidebar-footer">
      <button id="themeToggle" class="theme-btn" aria-label="Toggle dark/light mode">
        <span id="themeIcon">🌙</span>
        <span id="themeLabel">Dark Mode</span>
      </button>
    </div>
  `;
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  applySidebarTheme();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  if (typeof dbSaveSetting === 'function') dbSaveSetting('theme', next);
  applySidebarTheme();
}

function applySidebarTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';
  if (label) label.textContent = saved === 'dark' ? 'Light Mode' : 'Dark Mode';
}

function buildTopBar(title) {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;
  const p = (typeof loadProgress === 'function') ? loadProgress() : { profile: { name: '' } };
  const name = (p.profile && p.profile.name) ? p.profile.name : 'Learner';
  topbar.innerHTML = `
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <h1 class="topbar-title">${title}</h1>
    <div class="topbar-right">
      <a href="progress.html" class="topbar-avatar" title="View progress">
        ${name.charAt(0).toUpperCase() || '?'}
      </a>
    </div>
  `;
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) menuToggle.addEventListener('click', toggleMobileNav);
}

function toggleMobileNav() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('menuToggle');
  const overlay = document.getElementById('sidebarOverlay');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('mobile-open');
  if (toggle) toggle.setAttribute('aria-expanded', String(isOpen));
  if (overlay) overlay.classList.toggle('visible', isOpen);
}

function buildOverlay() {
  if (document.getElementById('sidebarOverlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'sidebarOverlay';
  overlay.className = 'sidebar-overlay';
  overlay.addEventListener('click', toggleMobileNav);
  document.body.appendChild(overlay);
}

function toast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = message;
  container.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => t.classList.add('show')); });
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 3200);
}

function animateValue(el, from, to, duration = 900, suffix = '') {
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function animateProgressBar(bar, target, delay = 0) {
  if (!bar) return;
  setTimeout(() => { bar.style.width = target + '%'; }, delay);
}

function getPageParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  buildOverlay();
  applySidebarTheme();

  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.animationDelay = (i * 0.07) + 's';
  });
});
