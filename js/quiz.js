/* js/quiz.js - Quiz page controller */
let quizLesson = null;
let selectedAnswers = [];
let submitted = false;

document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(getPageParam('id') || '1', 10);
  quizLesson = getLessonById(id);
  const p = loadProgress();

  if (!quizLesson) {
    document.getElementById('quizRoot').innerHTML = '<p class="text-muted">Lesson not found.</p>';
    buildTopBar('Quiz');
    return;
  }

  buildTopBar('Quiz: ' + quizLesson.title);
  document.title = 'Quiz: ' + quizLesson.title + ' | Digital Literacy';

  selectedAnswers = new Array(quizLesson.quiz.questions.length).fill(-1);
  renderQuiz();

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
});

function renderQuiz() {
  const root = document.getElementById('quizRoot');
  if (!root || !quizLesson) return;
  root.innerHTML = quizLesson.quiz.questions.map((q, qi) => `
    <div class="card mb-4 fade-in stagger-${Math.min(qi+1,8)}" id="q-block-${qi}">
      <div class="flex items-center justify-between mb-4">
        <span class="label">Question ${qi + 1} of ${quizLesson.quiz.questions.length}</span>
      </div>
      <p style="font-size:1.1rem;font-weight:600;margin-bottom:18px">${q.question}</p>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${q.options.map((opt, oi) => `
          <button class="quiz-option" id="opt-${qi}-${oi}" data-q="${qi}" data-o="${oi}" onclick="selectOption(${qi},${oi})" aria-pressed="false">
            <span class="option-dot">${String.fromCharCode(65+oi)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function selectOption(qi, oi) {
  if (submitted) return;
  selectedAnswers[qi] = oi;
  quizLesson.quiz.questions[qi].options.forEach((_, idx) => {
    const btn = document.getElementById(`opt-${qi}-${idx}`);
    if (!btn) return;
    btn.classList.toggle('selected', idx === oi);
    btn.setAttribute('aria-pressed', String(idx === oi));
  });
  const answered = selectedAnswers.filter(a => a !== -1).length;
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.disabled = answered < quizLesson.quiz.questions.length;
}

function handleSubmit() {
  if (submitted) return;
  const allAnswered = selectedAnswers.every(a => a !== -1);
  if (!allAnswered) { toast('Please answer all questions first.', 'error'); return; }

  submitted = true;
  let correct = 0;
  quizLesson.quiz.questions.forEach((q, qi) => {
    const chosen = selectedAnswers[qi];
    const isCorrect = chosen === q.answer;
    if (isCorrect) correct++;
    q.options.forEach((_, oi) => {
      const btn = document.getElementById(`opt-${qi}-${oi}`);
      if (!btn) return;
      if (oi === q.answer) {
        btn.classList.add('correct');
        btn.querySelector('.option-dot').textContent = '✓';
      } else if (oi === chosen && !isCorrect) {
        btn.classList.add('wrong');
        btn.querySelector('.option-dot').textContent = '✗';
        const card = btn.closest('.card');
        if (card) card.classList.add('wrong-shake');
      }
      btn.style.pointerEvents = 'none';
    });
    if (isCorrect) {
      const block = document.getElementById(`q-block-${qi}`);
      if (block) block.classList.add('correct-flash');
    }
  });

  const score = Math.round((correct / quizLesson.quiz.questions.length) * 100);
  const newP = saveQuizResult(quizLesson.id, score, selectedAnswers);
  showResult(score, correct, newP);
}

function showResult(score, correct, p) {
  const total = quizLesson.quiz.questions.length;
  const passed = score >= 70;
  const allLessons = getAllLessons();
  const nextLesson = allLessons.find(l => l.id === quizLesson.id + 1);
  const result = document.getElementById('quizResult');
  if (!result) return;
  result.innerHTML = `
    <div class="card bounce-in" style="text-align:center;padding:36px;margin-top:24px;border-color:${passed?'rgba(48,209,88,0.3)':'rgba(255,69,58,0.3)'}">
      <div style="font-size:5rem;font-weight:800;background:linear-gradient(135deg,${passed?'#30d158,#0a84ff':'#ff453a,#ff9f0a'});-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-0.04em">${score}%</div>
      <p style="font-size:1.1rem;color:var(--text-2);margin-top:8px">${correct} of ${total} correct</p>
      <p style="margin-top:12px;font-weight:600;color:${passed?'var(--success)':'var(--danger)'}">${passed?'Excellent! Next lesson unlocked 🎉':'Score 70% or above to unlock the next lesson.'}</p>
    </div>
    <div class="btn-group mt-4 fade-in">
      <button class="btn btn-secondary" id="retryBtn">Try Again</button>
      <a href="lessons.html" class="btn btn-secondary">All Lessons</a>
      ${passed && nextLesson ? `<a href="lesson.html?id=${nextLesson.id}" class="btn btn-primary">Next Lesson →</a>` : ''}
    </div>
  `;
  result.classList.remove('hidden');
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.classList.add('hidden');
  const retryBtn = document.getElementById('retryBtn');
  if (retryBtn) retryBtn.addEventListener('click', handleRetry);
}

function handleRetry() {
  submitted = false;
  selectedAnswers = new Array(quizLesson.quiz.questions.length).fill(-1);
  const result = document.getElementById('quizResult');
  if (result) { result.classList.add('hidden'); result.innerHTML = ''; }
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) { submitBtn.classList.remove('hidden'); submitBtn.disabled = true; }
  renderQuiz();
}
