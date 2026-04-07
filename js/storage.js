/* ============================================================
   storage.js - LocalStorage + SessionStorage helpers
   and progress state management
   ============================================================ */

const LS_PROGRESS_KEY = 'dlc_progress';

const DEFAULT_PROGRESS = {
  completedLessons: [],
  unlockedLessons: [1, 2, 3],
  quizScores: {},
  quizAnswers: {},
  achievements: [],
  typingStats: { sessions: [], averageWPM: 0, averageAccuracy: 0, bestWPM: 0 },
  profile: { name: '', joinDate: null }
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(LS_PROGRESS_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS, profile: { ...DEFAULT_PROGRESS.profile, joinDate: new Date().toISOString() } };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress(progress) {
  localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(progress));
  dbSet(LS_PROGRESS_KEY, progress).catch(() => {});
}

function clearProgress() {
  localStorage.removeItem(LS_PROGRESS_KEY);
  dbClear().catch(() => {});
}

function setSession(key, value) {
  try { sessionStorage.setItem('dlc_' + key, JSON.stringify(value)); } catch {}
}

function getSession(key) {
  try {
    const raw = sessionStorage.getItem('dlc_' + key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function clearSession(key) {
  try { sessionStorage.removeItem('dlc_' + key); } catch {}
}

function completeLesson(lessonId) {
  const p = loadProgress();
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId);
  }
  const nextId = lessonId + 1;
  if (!p.unlockedLessons.includes(nextId)) {
    p.unlockedLessons.push(nextId);
  }
  if (p.completedLessons.length === 1 && !p.achievements.includes(1)) {
    p.achievements.push(1);
  }
  if (p.completedLessons.length >= 6 && !p.achievements.includes(3)) {
    p.achievements.push(3);
  }
  if (p.completedLessons.length >= 12 && !p.achievements.includes(4)) {
    p.achievements.push(4);
  }
  saveProgress(p);
  return p;
}

function saveQuizResult(lessonId, score, selectedAnswers) {
  const p = loadProgress();
  p.quizScores[lessonId] = Math.max(p.quizScores[lessonId] || 0, score);
  p.quizAnswers[lessonId] = { selectedAnswers, score, submittedAt: new Date().toISOString() };
  if (score >= 70) {
    if (!p.completedLessons.includes(lessonId)) p.completedLessons.push(lessonId);
    const nextId = lessonId + 1;
    if (!p.unlockedLessons.includes(nextId)) p.unlockedLessons.push(nextId);
  }
  if (score === 100 && !p.achievements.includes(2)) {
    p.achievements.push(2);
  }
  saveProgress(p);
  return p;
}

function saveTypingResult(wpm, accuracy) {
  const p = loadProgress();
  p.typingStats.sessions.push({ wpm, accuracy, date: new Date().toISOString() });
  const sessions = p.typingStats.sessions;
  p.typingStats.averageWPM = Math.round(sessions.reduce((a, s) => a + s.wpm, 0) / sessions.length);
  p.typingStats.averageAccuracy = Math.round(sessions.reduce((a, s) => a + s.accuracy, 0) / sessions.length);
  p.typingStats.bestWPM = Math.max(...sessions.map(s => s.wpm));
  if (p.typingStats.bestWPM >= 30 && !p.achievements.includes(5)) p.achievements.push(5);
  if (p.typingStats.averageAccuracy >= 95 && !p.achievements.includes(6)) p.achievements.push(6);
  saveProgress(p);
  return p;
}
