/* ========================================
   DARK MODE TOGGLE - FIXED VERSION
   ======================================== */

document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const html = document.documentElement;

    // Get saved theme or default to "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    html.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle - FIXED: Single click works properly
    if (themeToggle) {
        themeToggle.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentTheme = html.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            
            // Update DOM
            html.setAttribute("data-theme", newTheme);
            
            // Update icon immediately
            updateThemeIcon(newTheme);
            
            // Save to localStorage
            localStorage.setItem("theme", newTheme);
            
            console.log("Theme changed to:", newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
        }
    }
});
