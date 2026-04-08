/* js/quiz.js - Quiz page controller */
let quizLesson = null;
let selectedAnswers = [];
let typingAnswer = '';
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
  typingAnswer = '';
  renderQuiz();

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
});

function renderQuiz() {
  const root = document.getElementById('quizRoot');
  if (!root || !quizLesson) return;
  const totalQ = quizLesson.quiz.questions.length + (quizLesson.quiz.typingQuestion ? 1 : 0);
  let html = quizLesson.quiz.questions.map((q, qi) => `
    <div class="card mb-4 fade-in stagger-${Math.min(qi+1,8)}" id="q-block-${qi}">
      <div class="flex items-center justify-between mb-4">
        <span class="label">Question ${qi + 1} of ${totalQ}</span>
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

  // Add typing question if available
  if (quizLesson.quiz.typingQuestion) {
    const tq = quizLesson.quiz.typingQuestion;
    const tqi = quizLesson.quiz.questions.length;
    html += `
    <div class="card mb-4 fade-in stagger-${Math.min(tqi+1,8)}" id="q-block-typing">
      <div class="flex items-center justify-between mb-4">
        <span class="label">Question ${tqi + 1} of ${totalQ} — Written Answer</span>
      </div>
      <p style="font-size:1.1rem;font-weight:600;margin-bottom:18px">✍️ ${tq.question}</p>
      <textarea id="typingAnswerInput" rows="4" placeholder="Type your answer here..."
        style="width:100%;padding:12px 14px;border:1px solid var(--border-color);border-radius:var(--radius-md);font-size:1rem;background:var(--bg-primary);color:var(--text-primary);resize:vertical;font-family:inherit;"
        oninput="handleTypingInput(this.value)"></textarea>
      <p style="font-size:0.82rem;color:var(--text-secondary);margin-top:6px;">Write at least a few sentences in your own words.</p>
    </div>`;
  }

  root.innerHTML = html;
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
  checkAllAnswered();
}

function handleTypingInput(value) {
  typingAnswer = value;
  checkAllAnswered();
}

function checkAllAnswered() {
  const mcAnswered = selectedAnswers.filter(a => a !== -1).length;
  const needTyping = quizLesson.quiz.typingQuestion ? 1 : 0;
  const typingOk = needTyping === 0 || typingAnswer.trim().length >= 5;
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.disabled = mcAnswered < quizLesson.quiz.questions.length || !typingOk;
}

function handleSubmit() {
  if (submitted) return;
  const allAnswered = selectedAnswers.every(a => a !== -1);
  const needTyping = quizLesson.quiz.typingQuestion ? 1 : 0;
  const typingOk = needTyping === 0 || typingAnswer.trim().length >= 5;
  if (!allAnswered || !typingOk) { toast('Please answer all questions first.', 'error'); return; }

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

  // Score typing question (keyword check + length)
  let typingScore = 0;
  if (quizLesson.quiz.typingQuestion && typingAnswer.trim()) {
    const tq = quizLesson.quiz.typingQuestion;
    const answer = typingAnswer.trim().toLowerCase();
    const hasKeyword = tq.keyword ? answer.includes(tq.keyword.toLowerCase()) : false;
    const wordCount = answer.split(/\s+/).length;
    if (wordCount >= 10) typingScore += 50;
    else if (wordCount >= 5) typingScore += 30;
    else typingScore += 10;
    if (hasKeyword) typingScore += 50;
    typingScore = Math.min(100, typingScore);

    // Visual feedback for typing block
    const typingBlock = document.getElementById('q-block-typing');
    if (typingBlock) {
      typingBlock.innerHTML += `<div style="margin-top:12px;padding:10px 14px;background:var(--success-light);border-radius:var(--radius-sm);border-left:3px solid var(--success-color);">
        <p style="font-size:0.9rem;font-weight:600;color:var(--success-color);">✓ Answer recorded — Score: ${typingScore}%</p>
      </div>`;
    }
    const typingInput = document.getElementById('typingAnswerInput');
    if (typingInput) typingInput.disabled = true;
  }

  // Calculate combined score (MC questions + typing question weighted equally)
  const mcTotal = quizLesson.quiz.questions.length;
  const totalItems = mcTotal + (quizLesson.quiz.typingQuestion ? 1 : 0);
  const mcScore = Math.round((correct / mcTotal) * 100);
  const combinedScore = quizLesson.quiz.typingQuestion
    ? Math.round(((correct / mcTotal) * 100 * mcTotal + typingScore) / totalItems)
    : mcScore;

  const newP = saveQuizResult(quizLesson.id, combinedScore, selectedAnswers);

  // Save typing answer separately
  if (quizLesson.quiz.typingQuestion && typingAnswer.trim()) {
    const tq = quizLesson.quiz.typingQuestion;
    const p = loadProgress();
    if (!p.quizAnswers[quizLesson.id]) p.quizAnswers[quizLesson.id] = {};
    if (!p.quizAnswers[quizLesson.id].typingAnswers) p.quizAnswers[quizLesson.id].typingAnswers = {};
    p.quizAnswers[quizLesson.id].typingAnswers[tq.id] = {
      question: tq.question,
      answer: typingAnswer.trim(),
      score: typingScore,
      submittedAt: new Date().toISOString()
    };
    saveProgress(p);
  }

  showResult(combinedScore, correct, newP);
}

function showResult(score, correct, p) {
  const total = quizLesson.quiz.questions.length;
  const passed = score >= 70;
  const allLessons = getAllLessons();
  const nextLesson = allLessons.find(l => l.id === quizLesson.id + 1);

  // Check for teacher comment
  const comments = JSON.parse(localStorage.getItem('dlc_teacher_comments') || '{}');
  const commentKey = 'quiz_' + quizLesson.id;
  const teacherComment = comments[commentKey] || '';
  const commentHtml = teacherComment
    ? `<div style="margin-top:16px;padding:12px 16px;background:var(--accent-light);border-radius:var(--radius-sm);border-left:3px solid var(--accent-color);text-align:left;">
        <p style="font-size:0.85rem;font-weight:600;color:var(--accent-color);margin-bottom:4px;">💬 Teacher Comment:</p>
        <p style="font-size:0.95rem;color:var(--text-primary);">${teacherComment}</p>
      </div>` : '';

  // Show student name
  const studentName = p.profile && p.profile.name ? p.profile.name : '';
  const nameHtml = studentName
    ? `<p style="font-size:1.1rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">${studentName}</p>` : '';

  const result = document.getElementById('quizResult');
  if (!result) return;
  result.innerHTML = `
    <div class="card bounce-in" style="text-align:center;padding:36px;margin-top:24px;border-color:${passed?'rgba(48,209,88,0.3)':'rgba(255,69,58,0.3)'}">
      ${nameHtml}
      <div style="font-size:5rem;font-weight:800;background:linear-gradient(135deg,${passed?'#30d158,#0a84ff':'#ff453a,#ff9f0a'});-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-0.04em">${score}%</div>
      <p style="font-size:1.1rem;color:var(--text-2);margin-top:8px">${correct} of ${total} multiple-choice correct</p>
      <p style="margin-top:12px;font-weight:600;color:${passed?'var(--success)':'var(--danger)'}">${passed?'Excellent! Next lesson unlocked 🎉':'Score 70% or above to unlock the next lesson.'}</p>
      ${commentHtml}
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
  typingAnswer = '';
  const result = document.getElementById('quizResult');
  if (result) { result.classList.add('hidden'); result.innerHTML = ''; }
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) { submitBtn.classList.remove('hidden'); submitBtn.disabled = true; }
  renderQuiz();
}
