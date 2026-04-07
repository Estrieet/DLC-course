const typingInput = document.getElementById('typingInput');
const startTyping = document.getElementById('startTyping');
const checkTyping = document.getElementById('checkTyping');
const typingResults = document.getElementById('typingResults');
const promptText = 'The quick brown fox jumps over the lazy dog.';
let typingStart = null;

if (startTyping) {
  startTyping.addEventListener('click', () => {
    typingInput.value = '';
    typingInput.focus();
    typingStart = Date.now();
    typingResults.textContent = 'Start typing when you are ready.';
  });
}

if (checkTyping) {
  checkTyping.addEventListener('click', () => {
    if (!typingStart) {
      typingResults.textContent = 'Press Start first to begin the timer.';
      return;
    }
    const typed = typingInput.value.trim();
    const elapsed = Math.max(1, (Date.now() - typingStart) / 1000);
    const speed = Math.round((typed.length / 5) / (elapsed / 60));
    const errors = countErrors(promptText, typed);
    const accuracy = Math.max(0, Math.round(((typed.length - errors) / Math.max(typed.length, 1)) * 100));

    typingResults.innerHTML = `
      <div class="typing-result-card slide-up">
        <p><strong>Speed:</strong> ${speed} words per minute</p>
        <p><strong>Accuracy:</strong> ${accuracy}%</p>
        <p><strong>Mistakes:</strong> ${errors}</p>
        <p><strong>Time:</strong> ${elapsed.toFixed(1)} seconds</p>
      </div>
    `;
    saveTypingResult({ speed, accuracy, errors, time: elapsed, date: new Date().toLocaleDateString() });
  });
}

function countErrors(expected, typed) {
  const expectedWords = expected.split(' ');
  const typedWords = typed.split(' ');
  let mistakes = 0;
  for (let i = 0; i < expectedWords.length; i += 1) {
    if (typedWords[i] !== expectedWords[i]) mistakes += 1;
  }
  mistakes += Math.max(0, typedWords.length - expectedWords.length);
  return mistakes;
}

function saveTypingResult(result) {
  const current = JSON.parse(localStorage.getItem('typingResults') || '[]');
  current.push(result);
  localStorage.setItem('typingResults', JSON.stringify(current));
  updateTypingProgress();
}

function updateTypingProgress() {
  const history = JSON.parse(localStorage.getItem('typingResults') || '[]');
  const progress = Math.min(100, Math.round((history.length / 5) * 100));
  localStorage.setItem('typingCompleted', String(history.length));
  if (document.getElementById('typingProgress')) {
    document.getElementById('typingProgress').style.width = `${progress}%`;
    document.getElementById('typingText').textContent = `${history.length} of 5`;
  }
}

updateTypingProgress();
