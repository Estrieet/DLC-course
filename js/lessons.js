/* js/lessons.js - Lessons list page */
document.addEventListener('DOMContentLoaded', () => {
  buildTopBar('Lessons');
  const p = loadProgress();

  // Generate module filter buttons
  const modules = ['All', ...new Set(LESSONS.map(l => l.module))];
  const filterContainer = document.getElementById('moduleFilters');
  if (filterContainer) {
    filterContainer.innerHTML = modules.map(m =>
      `<button class="btn btn-secondary module-filter${m === 'All' ? ' active' : ''}" data-module="${m}">${m}</button>`
    ).join('');
  }

  let activeModule = 'All';
  renderLessons(activeModule, p);

  const filterBtns = document.querySelectorAll('.module-filter');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeModule = btn.dataset.module;
      renderLessons(activeModule, p);
    });
  });
});

function renderLessons(module, p) {
  const grid = document.getElementById('lessonGrid');
  if (!grid) return;
  const filtered = module === 'All' ? LESSONS : LESSONS.filter(l => l.module === module);
  grid.innerHTML = filtered.map((lesson, i) => {
    const isCompleted = p.completedLessons.includes(lesson.id);
    const isUnlocked = p.unlockedLessons.includes(lesson.id);
    const isLocked = !isUnlocked;
    const score = p.quizScores[lesson.id];
    return `<div class="lesson-card fade-in stagger-${Math.min(i+1,8)}${isLocked ? ' locked' : ''}${isCompleted ? ' completed' : ''}"
        role="${isLocked ? 'img' : 'link'}" ${isLocked ? '' : `onclick="window.location='lesson.html?id=${lesson.id}'"`}
        tabindex="${isLocked ? '-1' : '0'}" onkeypress="if(event.key==='Enter'&&!${isLocked})window.location='lesson.html?id=${lesson.id}'"
        aria-label="Lesson ${lesson.id}: ${lesson.title}${isLocked ? ' (locked)' : ''}">
      <div class="flex items-center justify-between">
        <span class="lesson-number">Lesson ${lesson.id} · ${lesson.module}</span>
        ${isCompleted
          ? '<span class="badge badge-green">✓ Complete</span>'
          : isLocked
            ? '<span class="badge badge-orange">🔒 Locked</span>'
            : '<span class="badge badge-blue">Available</span>'}
      </div>
      <div class="lesson-title">${lesson.title}</div>
      <div class="lesson-summary">${lesson.summary[0]}</div>
      ${score !== undefined ? `<div class="flex items-center gap-2 mt-2">
        <div class="progress-track" style="flex:1"><div class="progress-fill" style="width:${score}%;background:${score>=70?'var(--success)':'var(--warning)'}"></div></div>
        <span class="text-sm" style="color:${score>=70?'var(--success)':'var(--warning)'}">${score}%</span>
      </div>` : ''}
    </div>`;
  }).join('');
  if (!filtered.length) grid.innerHTML = '<p class="text-muted">No lessons in this module.</p>';
}
