/* ========================================
   DARK MODE + TEXT SIZE — persisted in localStorage + IndexedDB
   ======================================== */

(function () {
    var savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    var savedSize = localStorage.getItem('textSize') || '100';
    document.documentElement.style.fontSize = savedSize + '%';
})();

document.addEventListener("DOMContentLoaded", function () {
    var html = document.documentElement;
    var themeToggle = document.getElementById("themeToggle");
    var themeIcon = document.getElementById("themeIcon");

    // Sync from IndexedDB if available
    if (typeof dbGetSetting === 'function') {
        dbGetSetting('theme').then(function (val) {
            if (val) {
                html.setAttribute('data-theme', val);
                localStorage.setItem('theme', val);
                updateThemeIcon(val);
            }
        }).catch(function () {});

        dbGetSetting('textSize').then(function (val) {
            if (val) {
                html.style.fontSize = val + '%';
                localStorage.setItem('textSize', val);
            }
        }).catch(function () {});
    }

    var currentTheme = html.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var cur = html.getAttribute("data-theme") || 'light';
            var newTheme = cur === "light" ? "dark" : "light";
            html.setAttribute("data-theme", newTheme);
            updateThemeIcon(newTheme);
            localStorage.setItem("theme", newTheme);
            if (typeof dbSaveSetting === 'function') {
                dbSaveSetting('theme', newTheme);
            }
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
        }
    }
});
