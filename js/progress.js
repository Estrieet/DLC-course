/* js/progress.js – Progress statistics page */
document.addEventListener('DOMContentLoaded', () => {
  buildTopBar('My Progress');
  renderProgress();
});

function renderProgress() {
  const p = loadProgress();
  const root = document.getElementById('progressRoot');
  if (!root) return;

  const total = getAllLessons().length;
  const done = p.completedLessons.length;
  const pct = Math.round((done / total) * 100);

  const avgWPM = p.typingStats.averageWPM || 0;
  const bestWPM = p.typingStats.bestWPM || 0;
  const avgAcc   = p.typingStats.averageAccuracy || 0;
  const sessions  = (p.typingStats.sessions || []).length;

  const quizIds = Object.keys(p.quizScores);
  const avgQuiz = quizIds.length
    ? Math.round(quizIds.reduce((s, id) => s + p.quizScores[id], 0) / quizIds.length)
    : 0;

  root.innerHTML = `
    <!-- Overall progress bar -->
    <div class="card mb-6 fade-in">
      <div class="card-header mb-4">
        <h2 class="section-title">Overall Progress</h2>
        <span class="badge badge-accent">${pct}% Complete</span>
      </div>
      <div class="progress-bar mb-2">
        <div class="progress-fill" id="mainBar" style="width:0%"></div>
      </div>
      <p class="text-muted">${done} of ${total} lessons completed</p>
    </div>

    <!-- Stats row -->
    <div class="grid-4 mb-6">
      <div class="stat-card fade-in stagger-1">
        <div class="stat-value text-accent" id="sLessons">0</div>
        <div class="stat-label">Lessons Done</div>
      </div>
      <div class="stat-card fade-in stagger-2">
        <div class="stat-value text-success" id="sWPM">0</div>
        <div class="stat-label">Best WPM</div>
      </div>
      <div class="stat-card fade-in stagger-3">
        <div class="stat-value" style="color:var(--violet)" id="sAcc">0</div>
        <div class="stat-label">Avg Accuracy %</div>
      </div>
      <div class="stat-card fade-in stagger-4">
        <div class="stat-value" style="color:var(--warning)" id="sQuiz">0</div>
        <div class="stat-label">Avg Quiz Score</div>
      </div>
    </div>

    <!-- Lesson progress rows -->
    <div class="card mb-6 fade-in stagger-2">
      <h2 class="section-title mb-4">Lesson Progress</h2>
      <div id="lessonRows"></div>
    </div>

    <!-- Quiz scores -->
    <div class="card mb-6 fade-in stagger-3">
      <h2 class="section-title mb-4">Quiz Scores</h2>
      ${quizIds.length ? `<div id="quizRows"></div>` : '<p class="text-muted">No quizzes taken yet. Complete a lesson to unlock its quiz.</p>'}
    </div>

    <!-- Typing history -->
    <div class="card mb-6 fade-in stagger-4">
      <h2 class="section-title mb-4">Typing Stats</h2>
      <div class="grid-3" style="gap:12px">
        <div class="stat-card"><div class="stat-value text-accent">${avgWPM}</div><div class="stat-label">Avg WPM</div></div>
        <div class="stat-card"><div class="stat-value text-success">${avgAcc}%</div><div class="stat-label">Avg Accuracy</div></div>
        <div class="stat-card"><div class="stat-value">${sessions}</div><div class="stat-label">Sessions</div></div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="card fade-in stagger-5">
      <h2 class="section-title mb-4">Achievements</h2>
      <div class="grid-3" id="achGrid"></div>
    </div>
  `;

  animateProgressBar(document.getElementById('mainBar'), pct, 200);
  animateValue(document.getElementById('sLessons'), 0, done, 800);
  animateValue(document.getElementById('sWPM'), 0, bestWPM, 800);
  animateValue(document.getElementById('sAcc'), 0, avgAcc, 800, '%');
  animateValue(document.getElementById('sQuiz'), 0, avgQuiz, 800);

  renderLessonRows(p);
  if (quizIds.length) renderQuizRows(p, quizIds);
  renderAchievements(p);
}

function renderLessonRows(p) {
  const el = document.getElementById('lessonRows');
  if (!el) return;
  el.innerHTML = getAllLessons().map(l => {
    const done = p.completedLessons.includes(l.id);
    const unlocked = p.unlockedLessons.includes(l.id);
    const icon = done ? '✅' : unlocked ? '🔓' : '🔒';
    const state = done ? 'completed' : unlocked ? '' : 'locked';
    return `
      <div class="progress-row ${state}" style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:1.2rem">${icon}</span>
        <span class="flex-1">${l.title}</span>
        <span class="badge ${done ? 'badge-success' : unlocked ? 'badge-accent' : ''}">${done ? 'Done' : unlocked ? 'Unlocked' : 'Locked'}</span>
      </div>`;
  }).join('');
}

function renderQuizRows(p, ids) {
  const el = document.getElementById('quizRows');
  if (!el) return;
  el.innerHTML = ids.map(id => {
    const lesson = LESSONS.find(l => l.id === +id);
    const score = p.quizScores[id];
    const pass = score >= 70;
    return `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
        <span>${pass ? '✅' : '❌'}</span>
        <span class="flex-1">${lesson ? lesson.title : 'Lesson ' + id}</span>
        <span class="badge ${pass ? 'badge-success' : 'badge-danger'}">${score}%</span>
      </div>`;
  }).join('');
}

function renderAchievements(p) {
  const grid = document.getElementById('achGrid');
  if (!grid) return;
  grid.innerHTML = ACHIEVEMENTS.map(a => {
    const earned = p.achievements.includes(a.id);
    return `
      <div class="card ${earned ? '' : 'opacity-50'}" style="text-align:center;padding:20px;${earned ? 'border-color:var(--accent)' : ''}">
        <div style="font-size:2.5rem;margin-bottom:8px">${a.icon}</div>
        <div class="font-semibold mb-1">${a.title}</div>
        <div class="text-muted text-sm">${a.description}</div>
        ${earned ? '<div class="badge badge-accent mt-2">Earned!</div>' : ''}
      </div>`;
  }).join('');
}
