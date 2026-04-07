// Load and display student progress data
document.addEventListener('DOMContentLoaded', function() {
    const progress = loadProgress();
    
    // Calculate statistics
    const completedCount = progress.completedLessons.length;
    const totalLessons = 12;
    const courseProgress = Math.round((completedCount / totalLessons) * 100);
    const quizCount = Object.keys(progress.quizScores).length;
    const quizzesPassedCount = Object.values(progress.quizScores).filter(score => score >= 70).length;
    
    // Update progress cards
    document.getElementById('courseProgressPercent').textContent = courseProgress + '%';
    document.getElementById('lessonsCompletedCount').textContent = completedCount;
    document.getElementById('quizzesPassedCount').textContent = quizzesPassedCount;
    
    // Update progress bar
    document.getElementById('progressBarFill').style.width = courseProgress + '%';
    document.getElementById('progressText').textContent = completedCount + ' of ' + totalLessons + ' lessons completed';
    
    // Update achievements
    updateAchievements(progress);
});

function updateAchievements(progress) {
    const achievements = [
        {
            id: 1,
            emoji: '🎉',
            title: 'First Lesson',
            condition: progress.completedLessons.length >= 1
        },
        {
            id: 2,
            emoji: '⭐',
            title: 'Perfect Quiz',
            condition: Object.values(progress.quizScores).some(score => score === 100)
        },
        {
            id: 3,
            emoji: '⚡',
            title: 'Speed Demon',
            condition: progress.typingStats.bestWPM >= 30
        },
        {
            id: 4,
            emoji: '🎓',
            title: 'Graduate',
            condition: progress.completedLessons.length === 12
        }
    ];
    
    const achievementsContainer = document.getElementById('achievementsGrid');
    if (!achievementsContainer) return;
    
    achievementsContainer.innerHTML = achievements.map(ach => `
        <div style="padding: 16px; background: var(--bg-secondary); border-radius: 8px; text-align: center; opacity: ${ach.condition ? '1' : '0.5'}; transition: all 0.3s ease;">
            <div style="font-size: 2rem;">${ach.emoji}</div>
            <div style="font-size: 0.9rem; margin-top: 8px; color: var(--text-primary); font-weight: 600;">${ach.title}</div>
            <div style="font-size: 0.75rem; margin-top: 4px; color: var(--text-secondary);">${ach.condition ? '✓ Unlocked' : 'Locked'}</div>
        </div>
    `).join('');
}
