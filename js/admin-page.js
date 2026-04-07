// Admin page button handlers
document.addEventListener('DOMContentLoaded', function () {
    const progress = loadProgress();

    // --- Course Management ---
    document.getElementById('manageLessonsBtn').addEventListener('click', function () {
        window.location.href = 'lessons.html';
    });

    document.getElementById('createLessonBtn').addEventListener('click', function () {
        showAdminToast('Lesson creation is not available yet. Lessons are managed in data.js.', 3000, 'info');
    });

    document.getElementById('viewStatsBtn').addEventListener('click', function () {
        const p = loadProgress();
        const completed = p.completedLessons.length;
        const totalLessons = typeof LESSONS !== 'undefined' ? LESSONS.length : 12;
        const quizzes = Object.keys(p.quizScores || {}).length;
        const avgScore = quizzes > 0
            ? Math.round(Object.values(p.quizScores).reduce(function (a, b) { return a + b; }, 0) / quizzes)
            : 0;
        const typingSessions = (p.typingStats && p.typingStats.sessions) ? p.typingStats.sessions.length : 0;
        const avgWPM = p.typingStats ? (p.typingStats.averageWPM || 0) : 0;
        const avgAcc = p.typingStats ? (p.typingStats.averageAccuracy || 0) : 0;
        const achievements = (p.achievements || []).length;

        var out = document.getElementById('statsOutput');
        if (out) {
            out.classList.remove('hidden');
            out.innerHTML =
                '<div class="card" style="padding:24px;">' +
                '<h3 style="margin-bottom:16px;">📊 Course Statistics</h3>' +
                '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;">' +
                '<div class="stat-card"><div class="stat-value text-accent">' + completed + '/' + totalLessons + '</div><div class="stat-label">Lessons Completed</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + quizzes + '</div><div class="stat-label">Quizzes Taken</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + avgScore + '%</div><div class="stat-label">Average Quiz Score</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + typingSessions + '</div><div class="stat-label">Typing Sessions</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + avgWPM + '</div><div class="stat-label">Average WPM</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + avgAcc + '%</div><div class="stat-label">Average Accuracy</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + achievements + '</div><div class="stat-label">Achievements Earned</div></div>' +
                '</div></div>';
            out.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // --- Data Management ---
    document.getElementById('exportAllBtn').addEventListener('click', function () {
        var p = loadProgress();
        var blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'dlc-all-data-export.json';
        link.click();
        URL.revokeObjectURL(url);
        showAdminToast('Data exported successfully ✓', 2200, 'success');
    });

    document.getElementById('importDataBtn').addEventListener('click', function () {
        var section = document.getElementById('importSection');
        if (section) {
            section.classList.remove('hidden');
            section.innerHTML =
                '<div class="card" style="padding:24px;">' +
                '<h3 style="margin-bottom:16px;">📥 Import Data</h3>' +
                '<p style="color:var(--text-secondary);margin-bottom:16px;">Select a previously exported JSON file to import.</p>' +
                '<input type="file" id="importFileInput" accept=".json" style="margin-bottom:16px;">' +
                '<button id="confirmImportBtn" class="btn btn-primary" style="width:100%;">Import</button>' +
                '</div>';
            section.scrollIntoView({ behavior: 'smooth' });

            document.getElementById('confirmImportBtn').addEventListener('click', function () {
                var fileInput = document.getElementById('importFileInput');
                if (!fileInput || !fileInput.files.length) {
                    showAdminToast('Please select a file first.', 2500, 'info');
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (e) {
                    try {
                        var imported = JSON.parse(e.target.result);
                        if (imported && typeof imported === 'object') {
                            saveProgress(imported);
                            showAdminToast('Data imported successfully ✓', 2500, 'success');
                            section.classList.add('hidden');
                        } else {
                            showAdminToast('Invalid data format.', 2500, 'info');
                        }
                    } catch (err) {
                        showAdminToast('Failed to parse file. Make sure it is valid JSON.', 3000, 'info');
                    }
                };
                reader.readAsText(fileInput.files[0]);
            });
        }
    });

    document.getElementById('clearAllBtn').addEventListener('click', function () {
        if (!confirm('Are you sure you want to clear ALL data? This cannot be undone.')) return;
        clearProgress();
        showAdminToast('All data cleared ✓', 2200, 'success');
        setTimeout(function () { window.location.reload(); }, 600);
    });

    // --- Danger Zone ---
    document.getElementById('resetProgressBtn').addEventListener('click', function () {
        if (!confirm('WARNING: This will permanently reset ALL student progress. Continue?')) return;
        clearProgress();
        showAdminToast('All student progress has been reset ✓', 2500, 'success');
        setTimeout(function () { window.location.reload(); }, 600);
    });
});

function showAdminToast(message, duration, type) {
    duration = duration || 3000;
    type = type || 'info';
    var toast = document.createElement('div');
    toast.style.cssText =
        'position:fixed;bottom:24px;right:24px;' +
        'background:' + (type === 'success' ? 'var(--success-color)' : 'var(--accent-color)') + ';' +
        'color:white;padding:12px 24px;border-radius:8px;' +
        'box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:1000;font-weight:500;';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, duration);
}
