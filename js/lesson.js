/* js/lesson.js - Individual lesson viewer */
document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(getPageParam('id') || '1', 10);
  const lesson = getLessonById(id);
  const p = loadProgress();

  if (!lesson) {
    document.getElementById('lessonContent').innerHTML = '<p class="text-muted">Lesson not found. <a href="lessons.html" class="text-accent">Return to lessons</a></p>';
    buildTopBar('Lesson Not Found');
    return;
  }

  const isUnlocked = p.unlockedLessons.includes(lesson.id);
  if (!isUnlocked) {
    window.location.href = 'lessons.html';
    return;
  }

  buildTopBar(lesson.title);
  document.title = lesson.title + ' | Digital Literacy';

  const allLessons = getAllLessons();
  const prevLesson = allLessons.find(l => l.id === id - 1);
  const nextLesson = allLessons.find(l => l.id === id + 1);
  const isCompleted = p.completedLessons.includes(lesson.id);

  document.getElementById('lessonContent').innerHTML = `
    <div class="flex items-center gap-3 mb-4 fade-in">
      <span class="badge badge-blue">${lesson.module}</span>
      <span class="badge ${isCompleted ? 'badge-green' : 'badge-orange'}">${isCompleted ? '✓ Completed' : 'In Progress'}</span>
    </div>

    <h1 class="page-title fade-in stagger-1">Lesson ${lesson.id}: ${lesson.title}</h1>

    <div class="card mb-6 fade-in stagger-2" style="line-height:1.9;font-size:1.05rem;color:var(--text-2)">
      ${lesson.content}
    </div>

    <div class="card mb-6 fade-in stagger-3">
      <h2 class="section-title">📌 Key Points</h2>
      <ul style="display:flex;flex-direction:column;gap:12px">
        ${lesson.summary.map(s => `<li class="flex gap-3" style="align-items:flex-start">
          <span style="color:var(--accent);margin-top:2px;flex-shrink:0">✓</span>
          <span style="color:var(--text-2)">${s}</span>
        </li>`).join('')}
      </ul>
    </div>

    <div class="card mb-6 fade-in stagger-4" style="border-color:rgba(191,90,242,0.3);background:var(--violet-bg)">
      <h2 class="section-title">📝 Homework</h2>
      <p style="color:var(--text-2);line-height:1.8">${lesson.homework.question}</p>
    </div>

    <div class="btn-group fade-in stagger-5">
      ${prevLesson ? `<a href="lesson.html?id=${prevLesson.id}" class="btn btn-secondary">← Previous</a>` : ''}
      <a href="quiz.html?id=${lesson.id}" class="btn btn-primary btn-lg">Take Quiz →</a>
      ${nextLesson && p.unlockedLessons.includes(nextLesson.id) ? `<a href="lesson.html?id=${nextLesson.id}" class="btn btn-secondary">Next Lesson →</a>` : ''}
      <a href="lessons.html" class="btn btn-secondary">All Lessons</a>
    </div>
  `;

  setSession('currentLesson', lesson.id);
});
