// Load and display teacher dashboard data
document.addEventListener('DOMContentLoaded', function() {
    const progress = loadProgress();
    const studentName = progress.profile.name || 'Student';
    const completedCount = progress.completedLessons.length;
    const totalLessons = 12;
    const courseProgress = Math.round((completedCount / totalLessons) * 100);
    
    // Calculate average quiz score
    const quizScores = Object.values(progress.quizScores);
    const avgQuizScore = quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;
    
    // Update stat cards
    document.getElementById('studentCountCard').textContent = progress.profile.name ? '1' : '0';
    document.getElementById('avgProgressCard').textContent = courseProgress + '%';
    document.getElementById('avgQuizScoreCard').textContent = avgQuizScore;
    
    // Update student performance table
    updateStudentTable(progress, studentName, courseProgress, completedCount, avgQuizScore);

    // Teacher name handling
    const savedTeacherName = localStorage.getItem('dlc_teacher_name') || '';
    const teacherNameInput = document.getElementById('teacherNameInput');
    const saveTeacherBtn = document.getElementById('saveTeacherNameBtn');
    const teacherNameMsg = document.getElementById('teacherNameMsg');
    const teacherWelcome = document.getElementById('teacherWelcome');

    if (teacherNameInput && savedTeacherName) {
        teacherNameInput.value = savedTeacherName;
    }
    if (teacherWelcome && savedTeacherName) {
        teacherWelcome.textContent = 'Welcome, ' + savedTeacherName + ' — Monitor student progress and manage your course';
    }

    if (saveTeacherBtn) {
        saveTeacherBtn.addEventListener('click', function() {
            var name = teacherNameInput.value.trim();
            if (!name) {
                if (teacherNameMsg) teacherNameMsg.textContent = 'Please enter your name.';
                return;
            }
            localStorage.setItem('dlc_teacher_name', name);
            if (teacherNameMsg) teacherNameMsg.textContent = '✓ Name saved: ' + name;
            if (teacherWelcome) teacherWelcome.textContent = 'Welcome, ' + name + ' — Monitor student progress and manage your course';
        });
    }

    // Wire teacher tool buttons
    const reportsBtn = document.getElementById('viewReportsBtn');
    const downloadBtn = document.getElementById('downloadDataBtn');
    if (reportsBtn) reportsBtn.addEventListener('click', viewStudentDetails);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadProgressData);
});

function updateStudentTable(progress, studentName, courseProgress, completedCount, avgQuizScore) {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;
    
    if (!progress.profile.name) {
        tbody.innerHTML = `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td colspan="5" style="padding: 24px; text-align: center; color: var(--text-secondary);">
                    No student profile created yet. Go to Settings to create your profile!
                </td>
            </tr>
        `;
        return;
    }
    
    const completionDates = Object.values(progress.quizAnswers || {})
        .map(item => item.submittedAt)
        .filter(Boolean)
        .map(value => new Date(value))
        .filter(date => !Number.isNaN(date.getTime()));

    const lastCompletedText = completionDates.length
        ? completionDates.sort((a, b) => b - a)[0].toLocaleString()
        : 'No completions yet';

    tbody.innerHTML = `
        <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 12px;">${studentName}</td>
            <td style="padding: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="flex: 1; background: var(--bg-secondary); border-radius: 4px; height: 8px; overflow: hidden;">
                        <div style="background: var(--accent-color); width: ${courseProgress}%; height: 100%;"></div>
                    </div>
                    <span style="font-weight: 600; color: var(--text-primary);">${courseProgress}%</span>
                </div>
            </td>
            <td style="padding: 12px; color: var(--text-primary);">${completedCount} / 12</td>
            <td style="padding: 12px; color: var(--text-primary); font-weight: 600;">${avgQuizScore}%</td>
            <td style="padding: 12px; color: var(--text-secondary); font-size: 0.9rem;">${lastCompletedText}</td>
        </tr>
    `;
}

function viewStudentDetails() {
    alert('Student details:\n\nUse the Progress page to view completion timeline, scores, and recent activities.');
}

function downloadProgressData() {
    const progress = loadProgress();
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dlc-progress-export.json';
    link.click();
    URL.revokeObjectURL(url);
}
