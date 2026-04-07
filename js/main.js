/* ========================================
   MAIN.JS - GENERAL FUNCTIONALITY
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {
    initializeMobileMenu();
    initializeDropdowns();
    initializeNavigation();
    initializeRipple();
});

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
