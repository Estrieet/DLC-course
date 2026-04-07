/* ========================================
   MAIN.JS - GENERAL FUNCTIONALITY
   ======================================== */

document.addEventListener("DOMContentLoaded", function() {
    initializeMobileMenu();
    initializeDropdowns();
    initializeNavigation();
});

/* ========================================
   MOBILE MENU TOGGLE
   ======================================== */

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!mobileMenuToggle || !navMenu) return;

    mobileMenuToggle.addEventListener("click", function() {
        mobileMenuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll(".nav-link:not(.dropdown-btn)");
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            mobileMenuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

/* ========================================
   DROPDOWN MENUS
   ======================================== */

function initializeDropdowns() {
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");

    dropdownBtns.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            const parent = btn.closest(".nav-dropdown");
            if (!parent) return;

            // Close other dropdowns
            document.querySelectorAll(".nav-dropdown").forEach(d => {
                if (d !== parent) d.classList.remove("active");
            });

            // Toggle current dropdown
            parent.classList.toggle("active");
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function(e) {
        if (!e.target.closest(".nav-dropdown")) {
            document.querySelectorAll(".nav-dropdown").forEach(d => {
                d.classList.remove("active");
            });
        }
    });
}

/* ========================================
   NAVIGATION ACTIVE LINK
   ======================================== */

function initializeNavigation() {
    const currentLocation = location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        if (!link.classList.contains("dropdown-btn")) {
            link.classList.remove("active");
            if (link.getAttribute("href") === currentLocation) {
                link.classList.add("active");
            }
        }
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

document.addEventListener("click", function(e) {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
});

/* ========================================
   LOCAL STORAGE UTILITIES
   ======================================== */

const StorageManager = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error("Failed to save to localStorage:", e);
            return false;
        }
    },

    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error("Failed to read from localStorage:", e);
            return defaultValue;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error("Failed to remove from localStorage:", e);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error("Failed to clear localStorage:", e);
            return false;
        }
    }
};

/* ========================================
   ACCESSIBILITY
   ======================================== */

// Keyboard navigation for buttons
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
        if (e.target.tagName === "BUTTON" || e.target.classList.contains("btn")) {
            e.target.click();
        }
    }
});

/* ========================================
   LOADING INDICATOR
   ======================================== */

function showLoadingIndicator() {
    const loader = document.createElement("div");
    loader.id = "loadingIndicator";
    loader.classList.add("loading-spinner");
    loader.innerHTML = `<div class="spin"></div>`;
    document.body.appendChild(loader);
}

function hideLoadingIndicator() {
    const loader = document.getElementById("loadingIndicator");
    if (loader) loader.remove();
}

/* ========================================
   WINDOW RESIZE HANDLER
   ======================================== */

let resizeTimer;
window.addEventListener("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reset mobile menu on resize
        const mobileMenuToggle = document.getElementById("mobileMenuToggle");
        const navMenu = document.getElementById("navMenu");
        
        if (mobileMenuToggle && navMenu && window.innerWidth > 768) {
            mobileMenuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }, 250);
});
