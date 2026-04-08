/* ========================================
   MAIN.JS - GENERAL FUNCTIONALITY
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
    initializeMobileMenu();
    initializeDropdowns();
    initializeNavigation();
    initializeRipple();
    initializeTooltips();
    applyNavTooltips();
});

/* ========================================
   TOOLTIP POSITIONING
   ======================================== */

function initializeTooltips() {
    // For .info-icon tooltips (hover on desktop)
    document.addEventListener("mouseover", function (e) {
        var icon = e.target.closest(".info-icon");
        if (!icon) return;
        var tooltip = icon.querySelector(".tooltip");
        if (!tooltip) return;
        positionTooltip(icon, tooltip);
    });

    // For nav-link tooltips (data-tooltip attr)
    document.addEventListener("mouseover", function (e) {
        var link = e.target.closest("[data-tooltip]");
        if (!link) return;
        showNavTooltip(link);
    });
    document.addEventListener("mouseout", function (e) {
        var link = e.target.closest("[data-tooltip]");
        if (!link) return;
        hideNavTooltip();
    });

    // Mobile tap support for info-icon tooltips
    document.addEventListener("click", function (e) {
        var icon = e.target.closest(".info-icon");
        if (!icon) return;
        e.preventDefault();
        e.stopPropagation();
        // Close others
        document.querySelectorAll(".info-icon .tooltip.tooltip-visible").forEach(function(t) {
            if (t.parentElement !== icon) t.classList.remove("tooltip-visible");
        });
        var tooltip = icon.querySelector(".tooltip");
        if (!tooltip) return;
        positionTooltip(icon, tooltip);
        tooltip.classList.toggle("tooltip-visible");
    });

    // Mobile tap for nav tooltips
    var touchTimer = null;
    document.addEventListener("touchstart", function (e) {
        var link = e.target.closest("[data-tooltip]");
        if (!link) return;
        touchTimer = setTimeout(function() {
            showNavTooltip(link);
        }, 400);
    });
    document.addEventListener("touchend", function () {
        clearTimeout(touchTimer);
        setTimeout(hideNavTooltip, 2000);
    });

    // Close tooltips on outside click
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".info-icon") && !e.target.closest("[data-tooltip]")) {
            document.querySelectorAll(".tooltip.tooltip-visible").forEach(function(t) {
                t.classList.remove("tooltip-visible");
            });
            hideNavTooltip();
        }
    });
}

function positionTooltip(anchor, tooltip) {
    var rect = anchor.getBoundingClientRect();
    var tooltipWidth = 280;
    var gap = 10;
    var left = rect.left + rect.width / 2 - tooltipWidth / 2;

    if (left < 8) left = 8;
    if (left + tooltipWidth > window.innerWidth - 8) left = window.innerWidth - tooltipWidth - 8;

    tooltip.style.left = left + "px";
    tooltip.style.top = "0px";
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";

    var tooltipHeight = tooltip.offsetHeight || 60;
    var top = rect.top - tooltipHeight - gap;

    if (top < 8) {
        top = rect.bottom + gap;
        tooltip.classList.add("tooltip-below");
    } else {
        tooltip.classList.remove("tooltip-below");
    }

    tooltip.style.top = top + "px";
    tooltip.style.left = left + "px";
    tooltip.style.visibility = "";
    tooltip.style.opacity = "";
}

var navTooltipEl = null;
function showNavTooltip(link) {
    hideNavTooltip();
    var text = link.getAttribute("data-tooltip");
    if (!text) return;
    navTooltipEl = document.createElement("div");
    navTooltipEl.className = "nav-tooltip";
    navTooltipEl.textContent = text;
    document.body.appendChild(navTooltipEl);

    var rect = link.getBoundingClientRect();
    var ttWidth = navTooltipEl.offsetWidth || 180;
    var ttHeight = navTooltipEl.offsetHeight || 32;
    var left = rect.left + rect.width / 2 - ttWidth / 2;
    var top = rect.bottom + 8;

    if (left < 8) left = 8;
    if (left + ttWidth > window.innerWidth - 8) left = window.innerWidth - ttWidth - 8;
    if (top + ttHeight > window.innerHeight - 8) top = rect.top - ttHeight - 8;

    navTooltipEl.style.left = left + "px";
    navTooltipEl.style.top = top + "px";
}

function hideNavTooltip() {
    if (navTooltipEl) {
        navTooltipEl.remove();
        navTooltipEl = null;
    }
}

/* ========================================
   AUTO-APPLY NAV TOOLTIPS
   ======================================== */

function applyNavTooltips() {
    var tooltipMap = {
        "index.html": "Back to the home page",
        "lessons.html": "Browse all 12 lessons — learn at your own pace with clear step-by-step guides",
        "typing.html": "Practice your typing speed",
        "quizzes.html": "Test what you learned",
        "progress.html": "See your course progress",
        "messages.html": "View and post messages",
        "teacher.html": "Teacher dashboard",
        "answers.html": "View student answers",
        "admin.html": "Admin tools and settings",
        "help.html": "Get help and guidance",
        "settings.html": "Change your preferences",
        "privacy.html": "Privacy information"
    };
    document.querySelectorAll(".nav-link:not(.dropdown-btn), .dropdown-item").forEach(function(link) {
        var href = link.getAttribute("href");
        if (href && tooltipMap[href] && !link.hasAttribute("data-tooltip")) {
            link.setAttribute("data-tooltip", tooltipMap[href]);
        }
    });
}

/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

function initializeMobileMenu() {
    var mobileMenuToggle = document.getElementById("mobileMenuToggle");
    var navMenu = document.getElementById("navMenu");
    if (!mobileMenuToggle || !navMenu) return;

    mobileMenuToggle.addEventListener("click", function () {
        mobileMenuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu on nav link click
    navMenu.querySelectorAll(".nav-link:not(.dropdown-btn)").forEach(function (link) {
        link.addEventListener("click", function () {
            mobileMenuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
        if (!e.target.closest("#navMenu") && !e.target.closest("#mobileMenuToggle")) {
            mobileMenuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

/* ========================================
   DROPDOWN MENUS
   ======================================== */

function initializeDropdowns() {
    var dropdownBtns = document.querySelectorAll(".dropdown-btn");

    dropdownBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var parent = btn.closest(".nav-dropdown");
            if (!parent) return;

            // Close other dropdowns
            document.querySelectorAll(".nav-dropdown").forEach(function (d) {
                if (d !== parent) d.classList.remove("active");
            });

            parent.classList.toggle("active");
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".nav-dropdown")) {
            document.querySelectorAll(".nav-dropdown").forEach(function (d) {
                d.classList.remove("active");
            });
        }
    });

    // Keyboard: close dropdown on Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            document.querySelectorAll(".nav-dropdown").forEach(function (d) {
                d.classList.remove("active");
            });
            var navMenu = document.getElementById("navMenu");
            var toggle = document.getElementById("mobileMenuToggle");
            if (navMenu) navMenu.classList.remove("active");
            if (toggle) toggle.classList.remove("active");
        }
    });
}

/* ========================================
   ACTIVE NAVIGATION LINK
   ======================================== */

function initializeNavigation() {
    var currentPage = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .dropdown-item").forEach(function (link) {
        if (link.classList.contains("dropdown-btn")) return;
        var href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

document.addEventListener("click", function (e) {
    var link = e.target.closest("a[href^='#']");
    if (!link) return;
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
});

/* ========================================
   RIPPLE EFFECT ON BUTTONS
   ======================================== */

function initializeRipple() {
    document.addEventListener("click", function (e) {
        var btn = e.target.closest(".btn");
        if (!btn) return;
        var circle = document.createElement("span");
        var diameter = Math.max(btn.clientWidth, btn.clientHeight);
        var radius = diameter / 2;
        var rect = btn.getBoundingClientRect();
        circle.style.cssText = "position:absolute;border-radius:50%;transform:scale(0);animation:ripple 0.5s linear;background:rgba(255,255,255,0.3);width:" + diameter + "px;height:" + diameter + "px;top:" + (e.clientY - rect.top - radius) + "px;left:" + (e.clientX - rect.left - radius) + "px;pointer-events:none";
        btn.style.position = "relative";
        btn.style.overflow = "hidden";
        btn.appendChild(circle);
        setTimeout(function () { circle.remove(); }, 600);
    });
}

/* ========================================
   STORAGE UTILITIES
   ======================================== */

var StorageManager = {
    set: function (key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); return true; }
        catch (e) { return false; }
    },
    get: function (key, defaultValue) {
        if (defaultValue === undefined) defaultValue = null;
        try {
            var item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) { return defaultValue; }
    },
    remove: function (key) {
        try { localStorage.removeItem(key); return true; }
        catch (e) { return false; }
    },
    clear: function () {
        try { localStorage.clear(); return true; }
        catch (e) { return false; }
    }
};

/* ========================================
   KEYBOARD ACCESSIBILITY
   ======================================== */

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.tagName === "BUTTON") {
        e.target.click();
    }
});

/* ========================================
   WINDOW RESIZE
   ======================================== */

var resizeTimer;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (window.innerWidth > 768) {
            var toggle = document.getElementById("mobileMenuToggle");
            var menu = document.getElementById("navMenu");
            if (toggle) toggle.classList.remove("active");
            if (menu) menu.classList.remove("active");
        }
    }, 200);
});
