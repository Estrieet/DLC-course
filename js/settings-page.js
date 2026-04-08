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
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(function(radio) {
        if (radio.value === currentTheme) {
            radio.checked = true;
        }
        radio.addEventListener('change', function(e) {
            if (e.target.checked) {
                const newTheme = e.target.value;
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                if (typeof dbSaveSetting === 'function') dbSaveSetting('theme', newTheme);
                showToast('Switched to ' + newTheme + ' mode ✓', 2000, 'success');
            }
        });
    });

    // Handle text size selector
    const textSizeSelect = document.getElementById('textSizeSelect');
    if (textSizeSelect) {
        // Load saved text size
        const savedSize = localStorage.getItem('textSize') || '100';
        textSizeSelect.value = savedSize;

        textSizeSelect.addEventListener('change', function() {
            const size = textSizeSelect.value;
            document.documentElement.style.fontSize = size + '%';
            localStorage.setItem('textSize', size);
            if (typeof dbSaveSetting === 'function') dbSaveSetting('textSize', size);
            showToast('Text size updated ✓', 2000, 'success');
        });
    }

    const exportBtn = document.getElementById('exportDataBtn');
    const viewBtn = document.getElementById('viewDataBtn');
    const clearBtn = document.getElementById('clearDataBtn');

    if (exportBtn) exportBtn.addEventListener('click', exportProgressData);
    if (viewBtn) viewBtn.addEventListener('click', viewDataStorage);
    if (clearBtn) clearBtn.addEventListener('click', clearAllData);
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

function exportProgressData() {
    const progress = loadProgress();
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dlc-progress-export.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully.', 2200, 'success');
}

function viewDataStorage() {
    const progress = loadProgress();
    const completed = progress.completedLessons.length;
    const quizzes = Object.keys(progress.quizScores || {}).length;
    const typingSessions = (progress.typingStats?.sessions || []).length;
    const latestQuizDate = Object.values(progress.quizAnswers || {})
        .map(item => item.submittedAt)
        .filter(Boolean)
        .sort()
        .pop();

    const info = [
        `Completed lessons: ${completed}`,
        `Quiz attempts: ${quizzes}`,
        `Typing sessions: ${typingSessions}`,
        `Last quiz completion: ${latestQuizDate ? new Date(latestQuizDate).toLocaleString() : 'N/A'}`
    ].join('\n');

    alert(info);
}

function clearAllData() {
    const confirmed = confirm('This will erase all saved progress. Continue?');
    if (!confirmed) return;
    clearProgress();
    showToast('All data cleared.', 2200, 'success');
    setTimeout(() => window.location.reload(), 500);
}
