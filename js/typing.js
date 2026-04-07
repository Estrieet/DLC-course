/* js/typing.js - Typing game with WASM-powered stats */
let typingState = {
  textId: 0,
  startTime: null,
  endTime: null,
  running: false,
  wpm: 0,
  accuracy: 0,
  errors: 0
};

document.addEventListener('DOMContentLoaded', () => {
  if (typeof buildTopBar === 'function') {
    buildTopBar('Typing Practice');
  }
  loadText(0);

  const input = document.getElementById('typingInput');
  const startBtn = document.getElementById('typingStart');
  const nextBtn = document.getElementById('typingNext');
  const resetBtn = document.getElementById('typingReset');

  startBtn && startBtn.addEventListener('click', startTyping);
  nextBtn && nextBtn.addEventListener('click', loadNextText);
  resetBtn && resetBtn.addEventListener('click', resetTyping);
  input && input.addEventListener('input', handleTyping);
});

function loadText(idx) {
  typingState = { textId: idx, startTime: null, endTime: null, running: false, wpm: 0, accuracy: 0, errors: 0 };
  const text = TYPING_TEXTS[idx];
  if (!text) return;
  renderTypingText(text.text);
  const input = document.getElementById('typingInput');
  if (input) { input.value = ''; input.disabled = true; }
  const statsPanel = document.getElementById('statsPanel');
  if (statsPanel) statsPanel.classList.add('hidden');
  const counter = document.getElementById('textCounter');
  if (counter) counter.textContent = `Text ${idx + 1} of ${TYPING_TEXTS.length}`;
}

function renderTypingText(text) {
  const el = document.getElementById('typingDisplay');
  if (!el) return;
  el.innerHTML = text.split('').map((ch, i) =>
    `<span class="typing-char" id="tc-${i}" data-char="${ch === '"' ? '&quot;' : ch}">${ch === ' ' ? ' ' : ch}</span>`
  ).join('');
}

function startTyping() {
  const input = document.getElementById('typingInput');
  if (!input) return;
  input.disabled = false;
  input.focus();
  typingState.running = false;
  typingState.startTime = null;
  document.getElementById('typingStart').classList.add('hidden');
  document.getElementById('typingReset').classList.remove('hidden');
  const timerEl = document.getElementById('timerDisplay');
  if (timerEl) timerEl.textContent = '0s';
}

function handleTyping(e) {
  if (!typingState.startTime && e.target.value.length > 0) {
    typingState.startTime = Date.now();
    typingState.running = true;
    startTimer();
  }

  const typed = e.target.value;
  const text = TYPING_TEXTS[typingState.textId].text;
  let errors = 0;
  let correctChars = 0;

  for (let i = 0; i < text.length; i++) {
    const span = document.getElementById(`tc-${i}`);
    if (!span) continue;
    span.classList.remove('correct', 'wrong', 'current');
    if (i < typed.length) {
      if (typed[i] === text[i]) {
        span.classList.add('correct');
        correctChars++;
      } else {
        span.classList.add('wrong');
        errors++;
      }
    } else if (i === typed.length) {
      span.classList.add('current');
    }
  }
  typingState.errors = errors;

  if (typed.length >= text.length && typed === text) {
    finishTyping(typed.length, correctChars);
  }
}

let timerInterval = null;
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!typingState.running) return;
    const elapsed = Math.floor((Date.now() - typingState.startTime) / 1000);
    const timerEl = document.getElementById('timerDisplay');
    if (timerEl) timerEl.textContent = elapsed + 's';
  }, 500);
}

function finishTyping(chars, correctChars) {
  typingState.running = false;
  typingState.endTime = Date.now();
  clearInterval(timerInterval);

  const seconds = Math.max(1, Math.round((typingState.endTime - typingState.startTime) / 1000));
  const wpm = calcWPM(chars, seconds);
  const accuracy = calcAccuracy(correctChars, chars);

  typingState.wpm = wpm;
  typingState.accuracy = accuracy;

  const input = document.getElementById('typingInput');
  if (input) input.disabled = true;

  saveTypingResult(wpm, accuracy);
  showTypingResults(wpm, accuracy, typingState.errors, seconds);
}

function showTypingResults(wpm, accuracy, errors, seconds) {
  const panel = document.getElementById('statsPanel');
  if (!panel) return;
  panel.classList.remove('hidden');
  panel.innerHTML = `
    <div class="card bounce-in" style="margin-top:24px">
      <h2 class="section-title mb-4">Your Results</h2>
      <div class="grid-3" style="gap:16px">
        <div class="stat-card fade-in stagger-1">
          <div class="stat-value text-accent" id="animWPM">0</div>
          <div class="stat-label">Words per Minute</div>
        </div>
        <div class="stat-card fade-in stagger-2">
          <div class="stat-value text-success" id="animAcc">0</div>
          <div class="stat-label">Accuracy %</div>
        </div>
        <div class="stat-card fade-in stagger-3">
          <div class="stat-value" style="color:var(--warning-color)" id="animErr">0</div>
          <div class="stat-label">Errors</div>
        </div>
      </div>
      <div class="btn-group mt-6">
        <button class="btn btn-secondary" onclick="resetTyping()">Try Again</button>
        <button class="btn btn-primary" onclick="loadNextText()">Next Text →</button>
        <a href="progress.html" class="btn btn-secondary">View Progress</a>
      </div>
    </div>
  `;
  setTimeout(() => {
    const animate = typeof animateValue === 'function' ? animateValue : animateValueFallback;
    animate(document.getElementById('animWPM'), 0, wpm, 1000);
    animate(document.getElementById('animAcc'), 0, accuracy, 1000, '%');
    animate(document.getElementById('animErr'), 0, errors, 800);
  }, 300);
}

function animateValueFallback(el, from, to, duration = 1000, suffix = '') {
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function resetTyping() {
  clearInterval(timerInterval);
  loadText(typingState.textId);
  const startBtn = document.getElementById('typingStart');
  const resetBtn = document.getElementById('typingReset');
  if (startBtn) startBtn.classList.remove('hidden');
  if (resetBtn) resetBtn.classList.add('hidden');
}

function loadNextText() {
  const next = (typingState.textId + 1) % TYPING_TEXTS.length;
  loadText(next);
  const startBtn = document.getElementById('typingStart');
  const resetBtn = document.getElementById('typingReset');
  if (startBtn) startBtn.classList.remove('hidden');
  if (resetBtn) resetBtn.classList.add('hidden');
}
