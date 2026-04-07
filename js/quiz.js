const quizQuestions = [
  { question: 'What is a computer?', answers: ['A tool to help with work', 'A type of food', 'A song', 'A car'], correct: 0 },
  { question: 'What does a mouse do?', answers: ['Moves the pointer', 'Prints paper', 'Stores files', 'Plays music'], correct: 0 },
  { question: 'How do you open a program?', answers: ['Click its icon', 'Close the screen', 'Throw it away', 'Turn it off'], correct: 0 },
  { question: 'What is email?', answers: ['A message you send online', 'A type of paper', 'A keyboard key', 'A printer mode'], correct: 0 },
  { question: 'Why save files?', answers: ['So you can open them later', 'To delete them', 'To make them heavy', 'To print them'], correct: 0 },
  { question: 'What is a password?', answers: ['A secret word', 'A type of mouse', 'A file folder', 'A printer'], correct: 0 },
  { question: 'What is online safety?', answers: ['Being careful online', 'Typing fast', 'Printing documents', 'Playing games'], correct: 0 },
  { question: 'How many answers are there for each question?', answers: ['Four', 'One', 'Two', 'Three'], correct: 0 },
  { question: 'What is a browser?', answers: ['A program to view websites', 'A word processor', 'A camera', 'A printer'], correct: 0 },
  { question: 'What does the save button do?', answers: ['Keeps your work', 'Deletes your work', 'Changes the screen', 'Plays music'], correct: 0 }
];

let quizIndex = 0;
let quizScore = 0;
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const nextQuiz = document.getElementById('nextQuiz');
const restartQuiz = document.getElementById('restartQuiz');
const quizSummary = document.getElementById('quizSummary');

function loadQuiz() {
  const current = quizQuestions[quizIndex];
  if (!current) return;
  quizQuestion.textContent = `Question ${quizIndex + 1}: ${current.question}`;
  quizOptions.innerHTML = current.answers.map((answer, index) => {
    return `<button class="button button-secondary quiz-answer" data-index="${index}">${answer}</button>`;
  }).join('');
  quizSummary.innerHTML = '';
  document.querySelectorAll('.quiz-answer').forEach((button) => {
    button.addEventListener('click', () => selectAnswer(Number(button.dataset.index)));
  });
}

function selectAnswer(answerIndex) {
  const current = quizQuestions[quizIndex];
  const isCorrect = answerIndex === current.correct;
  if (isCorrect) {
    quizScore += 1;
    quizSummary.innerHTML = '<p class="correct">Correct! Good job.</p>';
  } else {
    quizSummary.innerHTML = '<p class="wrong">That is not correct. Try the next question.</p>';
  }
  quizIndex += 1;
  if (quizIndex >= quizQuestions.length) {
    showQuizResults();
  }
}

function showQuizResults() {
  const percent = Math.round((quizScore / quizQuestions.length) * 100);
  quizSummary.innerHTML = `
    <div class="quiz-result-card slide-up">
      <p><strong>Score:</strong> ${quizScore} of ${quizQuestions.length}</p>
      <p><strong>Percent:</strong> ${percent}%</p>
      <p>Well done for completing the quiz.</p>
    </div>
  `;
  saveQuizProgress(quizScore, percent);
}

function saveQuizProgress(score, percent) {
  const quizData = { score, percent, date: new Date().toLocaleDateString() };
  localStorage.setItem('latestQuiz', JSON.stringify(quizData));
  localStorage.setItem('quizzesCompleted', String(quizIndex));
}

function restart() {
  quizIndex = 0;
  quizScore = 0;
  loadQuiz();
}

nextQuiz && nextQuiz.addEventListener('click', () => {
  if (quizIndex < quizQuestions.length) {
    loadQuiz();
  }
});

restartQuiz && restartQuiz.addEventListener('click', restart);

loadQuiz();
