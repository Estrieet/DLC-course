// Load and display teacher dashboard data
document.addEventListener('DOMContentLoaded', function() {
    const progress = loadProgress();
    const studentName = progress.profile.name || 'Student';
    const completedCount = progress.completedLessons.length;
    const totalLessons = (typeof getAllLessons === 'function') ? getAllLessons().length : 12;
    const courseProgress = Math.round((completedCount / totalLessons) * 100);

    // Calculate average quiz score
    const quizScores = Object.values(progress.quizScores);
    const avgQuizScore = quizScores.length > 0
        ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
        : 0;

    // Update stat cards
    const studentCountCard = document.getElementById('studentCountCard');
    const avgProgressCard = document.getElementById('avgProgressCard');
    const avgQuizScoreCard = document.getElementById('avgQuizScoreCard');
    if (studentCountCard) studentCountCard.textContent = progress.profile.name ? '1' : '0';
    if (avgProgressCard)  avgProgressCard.textContent  = courseProgress + '%';
    if (avgQuizScoreCard) avgQuizScoreCard.textContent = avgQuizScore + '%';

    // Update student performance table
    updateStudentTable(progress, studentName, courseProgress, completedCount, avgQuizScore, totalLessons);

    // Teacher name handling
    const savedTeacherName = localStorage.getItem('dlc_teacher_name') || '';
    const teacherNameInput = document.getElementById('teacherNameInput');
    const saveTeacherBtn   = document.getElementById('saveTeacherNameBtn');
    const teacherNameMsg   = document.getElementById('teacherNameMsg');
    const teacherWelcome   = document.getElementById('teacherWelcome');

    if (teacherNameInput && savedTeacherName) teacherNameInput.value = savedTeacherName;
    if (teacherWelcome && savedTeacherName) {
        teacherWelcome.textContent = 'Welcome, ' + savedTeacherName + ' — Monitor student progress and manage your course';
    }

    if (saveTeacherBtn) {
        saveTeacherBtn.addEventListener('click', function() {
            var name = teacherNameInput ? teacherNameInput.value.trim() : '';
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
    const reportsBtn  = document.getElementById('viewReportsBtn');
    const downloadBtn = document.getElementById('downloadDataBtn');
    if (reportsBtn)  reportsBtn.addEventListener('click', viewStudentDetails);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadProgressData);
});

function updateStudentTable(progress, studentName, courseProgress, completedCount, avgQuizScore, totalLessons) {
    const tbody = document.getElementById('studentTableBody') || document.querySelector('tbody');
    if (!tbody) return;

    if (!progress.profile.name) {
        tbody.innerHTML =
            '<tr style="border-bottom:1px solid var(--border-color);">' +
                '<td colspan="5" style="padding:24px;text-align:center;color:var(--text-secondary);">' +
                    'No student profile yet. Go to Settings to create your profile!' +
                '</td>' +
            '</tr>';
        return;
    }

    const completionDates = Object.values(progress.quizAnswers || {})
        .map(item => item.submittedAt)
        .filter(Boolean)
        .map(v => new Date(v))
        .filter(d => !Number.isNaN(d.getTime()));

    const lastActivity = completionDates.length
        ? completionDates.sort((a, b) => b - a)[0].toLocaleString()
        : 'No completions yet';

    const typingSessions = (progress.typingStats && progress.typingStats.sessions)
        ? progress.typingStats.sessions.length : 0;
    const bestWPM = (progress.typingStats && progress.typingStats.bestWPM) || 0;

    tbody.innerHTML =
        '<tr style="border-bottom:1px solid var(--border-color);">' +
            '<td style="padding:12px;font-weight:600;">' + escTeacher(studentName) + '</td>' +
            '<td style="padding:12px;">' +
                '<div style="display:flex;align-items:center;gap:8px;">' +
                    '<div style="flex:1;background:var(--bg-tertiary);border-radius:4px;height:8px;overflow:hidden;">' +
                        '<div style="background:var(--accent-color);width:' + courseProgress + '%;height:100%;border-radius:4px;"></div>' +
                    '</div>' +
                    '<span style="font-weight:600;color:var(--text-primary);min-width:36px;">' + courseProgress + '%</span>' +
                '</div>' +
            '</td>' +
            '<td style="padding:12px;">' + completedCount + ' / ' + totalLessons + '</td>' +
            '<td style="padding:12px;font-weight:600;">' + avgQuizScore + '%</td>' +
            '<td style="padding:12px;color:var(--text-secondary);font-size:0.9rem;">' + lastActivity + '</td>' +
        '</tr>' +
        '<tr>' +
            '<td colspan="5" style="padding:10px 12px;background:var(--bg-secondary);font-size:0.85rem;color:var(--text-secondary);">' +
                'Typing: ' + typingSessions + ' session' + (typingSessions !== 1 ? 's' : '') +
                (bestWPM > 0 ? ' — Best WPM: ' + bestWPM : '') +
            '</td>' +
        '</tr>';
}

function escTeacher(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function viewStudentDetails() {
    window.location.href = 'answers.html';
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
