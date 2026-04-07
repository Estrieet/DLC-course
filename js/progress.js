function updateProgressView() {
  const lessonCount = Number(localStorage.getItem('lessonsCompleted') || '0');
  const quizCount = Number(localStorage.getItem('quizzesCompleted') || '0');
  const typingCount = Number(localStorage.getItem('typingCompleted') || '0');
  const total = 15 + 10 + 5;
  const completed = lessonCount + quizCount + typingCount;
  const completion = total > 0 ? Math.round((completed / total) * 100) : 0;

  const lessonText = document.getElementById('lessonText');
  const quizText = document.getElementById('quizText');
  const typingText = document.getElementById('typingText');
  const completionText = document.getElementById('completionText');
  const lessonProgress = document.getElementById('lessonProgress');
  const quizProgress = document.getElementById('quizProgress');
  const typingProgress = document.getElementById('typingProgress');

  if (lessonText) lessonText.textContent = `${lessonCount} of 14`;
  if (quizText) quizText.textContent = `${quizCount} of 10`;
  if (typingText) typingText.textContent = `${typingCount} of 5`;
  if (completionText) completionText.textContent = `${completion}%`;
  if (lessonProgress) lessonProgress.style.width = `${Math.min(100, Math.round((lessonCount / 15) * 100))}%`;
  if (quizProgress) quizProgress.style.width = `${Math.min(100, Math.round((quizCount / 10) * 100))}%`;
  if (typingProgress) typingProgress.style.width = `${Math.min(100, Math.round((typingCount / 5) * 100))}%`;
}

function resetProgressData() {
  localStorage.removeItem('lessonsCompleted');
  localStorage.removeItem('quizzesCompleted');
  localStorage.removeItem('typingCompleted');
  localStorage.removeItem('latestQuiz');
  localStorage.removeItem('typingResults');
  updateProgressView();
}

const resetButton = document.getElementById('resetProgress');
if (resetButton) {
  resetButton.addEventListener('click', () => {
    resetProgressData();
    alert('Progress has been reset.');
  });
}

updateProgressView();
