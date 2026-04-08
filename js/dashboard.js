/* js/dashboard.js - Dashboard page controller */
document.addEventListener('DOMContentLoaded', () => {
  buildTopBar('Dashboard');
  const p = loadProgress();
  const total = getAllLessons().length;
  const completed = p.completedLessons.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const pctEl = document.getElementById('completionPct');
  const fillEl = document.getElementById('completionBar');
  const metaEl = document.getElementById('completionMeta');
  if (pctEl) animateValue(pctEl, 0, pct, 1200, '%');
  if (fillEl) animateProgressBar(fillEl, pct, 200);
  if (metaEl) metaEl.textContent = `${completed} of ${total} lessons completed`;

  const quizCount = Object.keys(p.quizScores).length;
  const typingBest = p.typingStats.bestWPM || 0;
  const statEls = [
    { id: 'statLessons', val: completed, suffix: '' },
    { id: 'statQuizzes', val: quizCount, suffix: '' },
    { id: 'statWPM',     val: typingBest, suffix: '' }
  ];
  statEls.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) animateValue(el, 0, s.val, 1000, s.suffix);
  });

  renderLessonGrid(p);
});

function renderLessonGrid(p) {
  const grid = document.getElementById('lessonGrid');
  if (!grid) return;
  grid.innerHTML = getAllLessons().slice(0, 6).map((lesson, i) => {
    const isCompleted = p.completedLessons.includes(lesson.id);
    const isUnlocked = p.unlockedLessons.includes(lesson.id);
    const isLocked = !isUnlocked;
    const score = p.quizScores[lesson.id];
    return `<div class="lesson-card card-hover fade-in stagger-${Math.min(i+1,8)}${isLocked ? ' locked' : ''}${isCompleted ? ' completed' : ''}"
        role="${isLocked ? 'img' : 'link'}" ${isLocked ? '' : `onclick="window.location='lesson.html?id=${lesson.id}'"`}
        tabindex="${isLocked ? '-1' : '0'}" aria-label="Lesson ${lesson.id}: ${lesson.title}${isLocked ? ' (locked)' : ''}">
      <div class="flex items-center justify-between">
        <span class="lesson-number">Lesson ${lesson.id}</span>
        ${isCompleted ? '<span class="badge badge-green">✓ Done</span>' : isLocked ? '<span class="badge badge-orange">🔒 Locked</span>' : '<span class="badge badge-blue">Open</span>'}
      </div>
      <div class="lesson-title">${lesson.title}</div>
      <div class="lesson-summary">${lesson.summary[0]}</div>
      <div class="lesson-footer">
        <span class="lesson-module">${lesson.module}</span>
        ${score !== undefined ? `<span class="text-sm text-muted">Quiz: ${score}%</span>` : ''}
      </div>
    </div>`;
  }).join('');
}
