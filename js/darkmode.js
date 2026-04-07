/* ========================================
   DARK MODE + TEXT SIZE — persisted in IndexedDB
   ======================================== */

(function () {
    // Apply saved theme instantly from localStorage (fast, avoids flash)
    var savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    var savedSize = localStorage.getItem('textSize') || '100';
    document.documentElement.style.fontSize = savedSize + '%';
})();

document.addEventListener("DOMContentLoaded", function () {
    var html = document.documentElement;
    var themeToggle = document.getElementById("themeToggle");
    var themeIcon = document.getElementById("themeIcon");

    // Sync from IndexedDB (authoritative source) and correct if needed
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

    // Apply current theme icon
    var currentTheme = html.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);

    // Theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            var cur = html.getAttribute("data-theme");
            var newTheme = cur === "light" ? "dark" : "light";

            html.setAttribute("data-theme", newTheme);
            updateThemeIcon(newTheme);

            // Save to both localStorage and IndexedDB
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
