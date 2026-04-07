// Handle settings page functionality
document.addEventListener('DOMContentLoaded', function() {
    const progress = loadProgress();
    
    // Load existing profile data
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    
    if (userNameInput && progress.profile.name) {
        userNameInput.value = progress.profile.name;
    }
    
    if (userEmailInput && progress.profile.email) {
        userEmailInput.value = progress.profile.email;
    }
    
    // Handle profile form submission
    const profileForm = document.querySelector('form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = userNameInput.value.trim();
            const email = userEmailInput.value.trim();
            
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            const newProgress = loadProgress();
            newProgress.profile.name = name;
            newProgress.profile.email = email;
            saveProgress(newProgress);
            
            showToast('Profile saved successfully! ✓', 2000, 'success');
        });
    }
    
    // Handle theme radio buttons
    const themeRadios = document.querySelectorAll('.theme-radio');
    themeRadios.forEach(radio => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        if (radio.value === currentTheme) {
            radio.checked = true;
        }
        
        radio.addEventListener('change', function(e) {
            if (e.target.checked) {
                const newTheme = e.target.value;
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                showToast(`Switched to ${newTheme} mode ✓`, 2000, 'success');
            }
        });
    });
});

function showToast(message, duration = 3000, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--accent-color)'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideUp 0.3s ease-out;
        font-weight: 500;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}
