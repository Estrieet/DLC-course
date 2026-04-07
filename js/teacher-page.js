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
            <td style="padding: 12px;">
                <button class="btn btn-sm" onclick="viewStudentDetails()" style="padding: 6px 12px; font-size: 0.85rem;">View</button>
            </td>
        </tr>
    `;
}

function viewStudentDetails() {
    alert('Student details:\n\nTo view more detailed student information, check the Progress page.');
}
