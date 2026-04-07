const themeButtons = document.querySelectorAll('.theme-toggle');
const themeCheckbox = document.getElementById('themeCheckbox');

function setTheme(dark) {
  if (dark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    themeButtons.forEach(button => button.textContent = 'Light mode');
    if (themeCheckbox) themeCheckbox.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    themeButtons.forEach(button => button.textContent = 'Dark mode');
    if (themeCheckbox) themeCheckbox.checked = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('darkMode');
  const isDark = stored === 'true';
  setTheme(isDark);
  themeButtons.forEach(button => button.addEventListener('click', () => setTheme(!document.body.classList.contains('dark-mode'))));
  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', () => setTheme(themeCheckbox.checked));
  }
});
