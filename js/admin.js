const adminStatus = document.getElementById('adminStatus');
const viewUsers = document.getElementById('viewUsers');
const viewProgress = document.getElementById('viewProgress');
const viewQuizzes = document.getElementById('viewQuizzes');
const viewTyping = document.getElementById('viewTyping');
const clearData = document.getElementById('clearData');
const exportData = document.getElementById('exportData');
const toggleLessons = document.getElementById('toggleLessons');

function getSavedData() {
  return {
    lessonsCompleted: Number(localStorage.getItem('lessonsCompleted') || '0'),
    quizzesCompleted: Number(localStorage.getItem('quizzesCompleted') || '0'),
    typingCompleted: Number(localStorage.getItem('typingCompleted') || '0'),
    latestQuiz: JSON.parse(localStorage.getItem('latestQuiz') || 'null'),
    typingResults: JSON.parse(localStorage.getItem('typingResults') || '[]'),
    lessonsEnabled: localStorage.getItem('lessonsEnabled') !== 'false'
  };
}

function refreshAdminStatus() {
  const data = getSavedData();
  if (!adminStatus) return;
  adminStatus.innerHTML = `
    <p><strong>Lessons enabled:</strong> ${data.lessonsEnabled ? 'Yes' : 'No'}</p>
    <p><strong>Lessons complete:</strong> ${data.lessonsCompleted} of 15</p>
    <p><strong>Quizzes complete:</strong> ${data.quizzesCompleted} of 10</p>
    <p><strong>Typing tests done:</strong> ${data.typingCompleted} of 5</p>
    <p><strong>Last quiz score:</strong> ${data.latestQuiz ? `${data.latestQuiz.score} / 10` : 'None'}</p>
    <p><strong>Typing sessions saved:</strong> ${data.typingResults.length}</p>
  `;
}

if (viewUsers) {
  viewUsers.addEventListener('click', () => {
    alert('User management is simple: data is stored here in the browser for this page.');
  });
}

if (viewProgress) {
  viewProgress.addEventListener('click', () => {
    window.location.href = 'progress.html';
  });
}

if (viewQuizzes) {
  viewQuizzes.addEventListener('click', () => {
    alert('Quizzes page shows the latest quiz results and progress.');
  });
}

if (viewTyping) {
  viewTyping.addEventListener('click', () => {
    alert('Typing page shows speed and accuracy results after the test.');
  });
}

if (clearData) {
  clearData.addEventListener('click', () => {
    if (confirm('Clear all stored progress and results?')) {
      localStorage.clear();
      refreshAdminStatus();
      alert('All progress has been cleared.');
    }
  });
}

if (exportData) {
  exportData.addEventListener('click', () => {
    const data = getSavedData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'digital-literacy-data.json';
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

if (toggleLessons) {
  toggleLessons.addEventListener('click', () => {
    const enabled = localStorage.getItem('lessonsEnabled') !== 'false';
    localStorage.setItem('lessonsEnabled', String(!enabled));
    refreshAdminStatus();
  });
}

refreshAdminStatus();
