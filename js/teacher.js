/* js/teacher.js – Teacher dashboard controls */
document.addEventListener('DOMContentLoaded', () => {
  buildTopBar('Teacher Dashboard');
  renderTeacher();
});

function renderTeacher() {
  const p = loadProgress();
  const root = document.getElementById('teacherRoot');
  if (!root) return;
  const done = p.completedLessons.length;
  const quizIds = Object.keys(p.quizScores);
  const avgQ = quizIds.length ? Math.round(quizIds.reduce((s,id)=>s+p.quizScores[id],0)/quizIds.length) : 0;

  root.innerHTML = `
    <div class="card mb-6 fade-in">
      <h2 class="section-title mb-4">Student Overview</h2>
      <div class="grid-3" style="gap:16px">
        <div class="stat-card"><div class="stat-value text-accent">${done}</div><div class="stat-label">Lessons Completed</div></div>
        <div class="stat-card"><div class="stat-value text-success">${quizIds.length}</div><div class="stat-label">Quizzes Taken</div></div>
        <div class="stat-card"><div class="stat-value" style="color:var(--violet)">${avgQ}%</div><div class="stat-label">Avg Quiz Score</div></div>
      </div>
    </div>

    <div class="card mb-6 fade-in stagger-2">
      <h2 class="section-title mb-4">Lesson Status</h2>
      <div id="tLessonList"></div>
    </div>

    <div class="card fade-in stagger-3">
      <h2 class="section-title mb-4">Teacher Tools</h2>
      <div class="btn-group mt-2">
        <button class="btn btn-secondary" onclick="unlockAll()">Unlock All Lessons</button>
        <button class="btn btn-danger" onclick="confirmReset()">Reset Student Progress</button>
      </div>
    </div>
  `;

  const list = document.getElementById('tLessonList');
  if (list) {
    list.innerHTML = LESSONS.map(l => {
      const done = p.completedLessons.includes(l.id);
      const score = p.quizScores[l.id] || null;
      return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
        <span>${done ? '✅' : p.unlockedLessons.includes(l.id) ? '🔓' : '🔒'}</span>
        <span class="flex-1">${l.title}</span>
        ${score !== null ? `<span class="badge ${score>=70?'badge-success':'badge-danger'}">Quiz: ${score}%</span>` : '<span class="text-muted text-sm">No quiz</span>'}
        <button class="btn btn-secondary" style="padding:4px 10px;font-size:0.8rem" onclick="teacherUnlock(${l.id})">Unlock</button>
      </div>`;
    }).join('');
  }
}

function teacherUnlock(id) {
  const p = loadProgress();
  if (!p.unlockedLessons.includes(id)) {
    p.unlockedLessons.push(id);
    saveProgress(p);
    toast('Lesson ' + id + ' unlocked', 'success');
    renderTeacher();
  }
}

function unlockAll() {
  const p = loadProgress();
  LESSONS.forEach(l => { if (!p.unlockedLessons.includes(l.id)) p.unlockedLessons.push(l.id); });
  saveProgress(p);
  toast('All lessons unlocked!', 'success');
  renderTeacher();
}

function confirmReset() {
  if (confirm('Are you sure you want to reset all student progress? This cannot be undone.')) {
    clearProgress();
    toast('Progress reset', 'info');
    setTimeout(() => renderTeacher(), 500);
  }
}
