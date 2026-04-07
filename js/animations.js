/* ========================================
   ANIMATIONS.JS - ANIMATION TRIGGERS
   ======================================== */

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function() {
    // Observe all feature cards
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Animate hero section
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
        heroSection.classList.add("fade-in");
    }
});

// Button ripple effect
document.addEventListener("click", function(e) {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
});

// Toast notification
function showToast(message, duration = 3000, type = "info") {
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast-${type}`);
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add("show"), 10);

    // Remove after duration
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Progress animation
function animateProgress(element, targetPercent, duration = 1000) {
    const startPercent = parseInt(element.style.width) || 0;
    const startTime = Date.now();

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentPercent = startPercent + (targetPercent - startPercent) * progress;

        element.style.width = currentPercent + "%";

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    animate();
}

// Counter animation
function animateCounter(element, targetValue, duration = 1000) {
    const startValue = parseInt(element.textContent) || 0;
    const startTime = Date.now();

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    animate();
}

// Fade in elements when page loads
window.addEventListener("load", function() {
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("fade-in-up");
        }, index * 100);
    });
});
