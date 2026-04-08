// Teacher dashboard — progress display + embedded grading panel
document.addEventListener('DOMContentLoaded', function() {
    var progress      = loadProgress();
    var studentName   = (progress.profile && progress.profile.name) ? progress.profile.name : 'Student';
    var totalLessons  = (typeof getAllLessons === 'function') ? getAllLessons().length : 12;
    var completedCount = progress.completedLessons.length;
    var courseProgress = Math.round((completedCount / totalLessons) * 100);

    var quizScores   = Object.values(progress.quizScores || {});
    var avgQuizScore = quizScores.length
        ? Math.round(quizScores.reduce(function(a, b) { return a + b; }, 0) / quizScores.length)
        : 0;

    var studentCountCard = document.getElementById('studentCountCard');
    var avgProgressCard  = document.getElementById('avgProgressCard');
    var avgQuizScoreCard = document.getElementById('avgQuizScoreCard');
    if (studentCountCard) studentCountCard.textContent = progress.profile.name ? '1' : '0';
    if (avgProgressCard)  avgProgressCard.textContent  = courseProgress + '%';
    if (avgQuizScoreCard) avgQuizScoreCard.textContent  = avgQuizScore + '%';

    updateStudentTable(progress, studentName, courseProgress, completedCount, avgQuizScore, totalLessons);

    /* Teacher name */
    var savedTeacherName = localStorage.getItem('dlc_teacher_name') || '';
    var teacherNameInput = document.getElementById('teacherNameInput');
    var saveTeacherBtn   = document.getElementById('saveTeacherNameBtn');
    var teacherNameMsg   = document.getElementById('teacherNameMsg');
    var teacherWelcome   = document.getElementById('teacherWelcome');

    if (teacherNameInput && savedTeacherName) teacherNameInput.value = savedTeacherName;
    if (teacherWelcome && savedTeacherName) {
        teacherWelcome.textContent = 'Welcome, ' + savedTeacherName + ' — Monitor student progress and manage your course';
    }

    if (saveTeacherBtn) {
        saveTeacherBtn.addEventListener('click', function() {
            var name = teacherNameInput ? teacherNameInput.value.trim() : '';
            if (!name) {
                if (teacherNameMsg) teacherNameMsg.textContent = 'Please enter your name.';
                return;
            }
            localStorage.setItem('dlc_teacher_name', name);
            if (teacherNameMsg) teacherNameMsg.textContent = '✓ Name saved: ' + name;
            if (teacherWelcome) teacherWelcome.textContent = 'Welcome, ' + name + ' — Monitor student progress and manage your course';
        });
    }

    /* Buttons */
    var reportsBtn  = document.getElementById('viewReportsBtn');
    var downloadBtn = document.getElementById('downloadDataBtn');

    if (reportsBtn) {
        reportsBtn.addEventListener('click', function() {
            var panel = document.getElementById('gradingPanel');
            if (!panel) return;
            var isHidden = panel.style.display === 'none' || panel.style.display === '';
            if (isHidden) {
                panel.style.display = 'block';
                renderGradingPanel();
                panel.scrollIntoView({ behavior: 'smooth' });
            } else {
                panel.style.display = 'none';
            }
        });
    }
    if (downloadBtn) downloadBtn.addEventListener('click', downloadProgressData);
});

/* ---- Helpers ---- */
function escT(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function loadTeacherScoresT() {
    try { return JSON.parse(localStorage.getItem('dlc_teacher_scores') || '{}'); } catch(e) { return {}; }
}

function saveTeacherScoresT(obj) {
    localStorage.setItem('dlc_teacher_scores', JSON.stringify(obj));
}

function loadTeacherCommentsT() {
    try { return JSON.parse(localStorage.getItem('dlc_teacher_comments') || '{}'); } catch(e) { return {}; }
}

function saveTeacherCommentsT(obj) {
    localStorage.setItem('dlc_teacher_comments', JSON.stringify(obj));
}

function teacherToast(msg, type) {
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:' +
        (type === 'success' ? 'var(--success-color)' : type === 'danger' ? 'var(--danger-color)' : 'var(--accent-color)') +
        ';color:white;padding:12px 24px;border-radius:8px;box-shadow:var(--shadow-lg);z-index:9999;font-weight:500;font-size:0.95rem;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { if (t.parentNode) t.remove(); }, 2500);
}

/* ---- Student table ---- */
function updateStudentTable(progress, studentName, courseProgress, completedCount, avgQuizScore, totalLessons) {
    var tbody = document.getElementById('studentTableBody') || document.querySelector('tbody');
    if (!tbody) return;

    if (!progress.profile.name) {
        tbody.innerHTML = '<tr><td colspan="5" style="padding:24px;text-align:center;color:var(--text-secondary);">No student profile yet. Go to Settings to set your name.</td></tr>';
        return;
    }

    var dates = Object.values(progress.quizAnswers || {})
        .map(function(item) { return item.submittedAt; })
        .filter(Boolean)
        .map(function(v) { return new Date(v); })
        .filter(function(d) { return !isNaN(d.getTime()); });

    var lastActivity = dates.length
        ? dates.sort(function(a, b) { return b - a; })[0].toLocaleString()
        : 'No completions yet';

    var typingSessions = (progress.typingStats && progress.typingStats.sessions)
        ? progress.typingStats.sessions.length : 0;
    var bestWPM = (progress.typingStats && progress.typingStats.bestWPM) || 0;

    tbody.innerHTML =
        '<tr style="border-bottom:1px solid var(--border-color);">' +
            '<td style="padding:12px;font-weight:600;">' + escT(studentName) + '</td>' +
            '<td style="padding:12px;">' +
                '<div style="display:flex;align-items:center;gap:8px;">' +
                    '<div style="flex:1;background:var(--bg-tertiary);border-radius:4px;height:8px;overflow:hidden;">' +
                        '<div style="background:var(--accent-color);width:' + courseProgress + '%;height:100%;border-radius:4px;"></div>' +
                    '</div>' +
                    '<span style="font-weight:600;min-width:36px;">' + courseProgress + '%</span>' +
                '</div>' +
            '</td>' +
            '<td style="padding:12px;">' + completedCount + ' / ' + totalLessons + '</td>' +
            '<td style="padding:12px;font-weight:600;">' + avgQuizScore + '%</td>' +
            '<td style="padding:12px;color:var(--text-secondary);font-size:0.9rem;">' + lastActivity + '</td>' +
        '</tr>' +
        '<tr><td colspan="5" style="padding:8px 12px;background:var(--bg-secondary);font-size:0.84rem;color:var(--text-secondary);">' +
            'Typing: ' + typingSessions + ' session' + (typingSessions !== 1 ? 's' : '') +
            (bestWPM > 0 ? ' — Best WPM: <strong>' + bestWPM + '</strong>' : '') +
        '</td></tr>';
}

/* ---- Grading Panel ---- */
function renderGradingPanel() {
    var container = document.getElementById('gradingContent');
    if (!container) return;

    var progress        = loadProgress();
    var teacherScores   = loadTeacherScoresT();
    var teacherComments = loadTeacherCommentsT();
    var allLessons      = (typeof getAllLessons === 'function') ? getAllLessons() : (typeof LESSONS !== 'undefined' ? LESSONS : []);
    var studentName     = (progress.profile && progress.profile.name) ? progress.profile.name : 'Student';

    var html = '<p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:var(--spacing-lg);">Student: <strong style="color:var(--text-primary);">' + escT(studentName) + '</strong></p>';

    /* ---- Quiz Results ---- */
    html += '<h4 style="font-size:1rem;margin-bottom:var(--spacing-md);">📝 Quiz Results</h4>';
    var hasQuiz = false;

    allLessons.forEach(function(lesson) {
        var qa        = (progress.quizAnswers  && progress.quizAnswers[lesson.id])  || null;
        var autoScore = (progress.quizScores   && progress.quizScores[lesson.id]   !== undefined) ? progress.quizScores[lesson.id] : null;
        if (autoScore === null) return;
        hasQuiz = true;

        var key         = 'quiz_' + lesson.id;
        var teachScore  = (teacherScores[key]   !== undefined) ? teacherScores[key]   : '';
        var comment     = teacherComments[key] || '';
        var submitted   = (qa && qa.submittedAt) ? new Date(qa.submittedAt).toLocaleString() : 'Unknown';
        var passed      = (teachScore !== '' ? parseInt(teachScore, 10) : autoScore) >= 70;

        /* Question/answer detail */
        var qaDetail = '';
        if (qa && lesson.quiz && lesson.quiz.questions && lesson.quiz.questions.length) {
            lesson.quiz.questions.forEach(function(q, qi) {
                var selected  = (qa.selectedAnswers !== undefined) ? qa.selectedAnswers[qi] : -1;
                var isCorrect = selected === q.answer;
                var selText   = (selected >= 0 && q.options && q.options[selected]) ? q.options[selected] : 'No answer';
                var corrText  = (q.options && q.options[q.answer]) ? q.options[q.answer] : '';
                qaDetail += '<div class="grade-answer-row">' +
                    '<span style="font-weight:600;font-size:0.85rem;">Q' + (qi+1) + ':</span> ' + escT(q.question) + '<br>' +
                    '<span class="' + (isCorrect ? 'grade-correct' : 'grade-wrong') + '">' +
                        (isCorrect ? '✓ ' : '✗ ') + escT(selText) +
                    '</span>' +
                    (!isCorrect && corrText ? ' <em style="font-size:0.8rem;color:var(--text-secondary);">(Correct: ' + escT(corrText) + ')</em>' : '') +
                '</div>';
            });
        }

        html += '<div class="grade-card">' +
            '<div class="grade-card-header">' +
                '<span style="font-weight:600;">Quiz ' + lesson.id + ': ' + escT(lesson.title) + '</span>' +
                '<div style="display:flex;gap:6px;align-items:center;">' +
                    '<span class="badge ' + (passed ? 'badge-success' : 'badge-danger') + '">Auto: ' + autoScore + '%</span>' +
                    (teachScore !== '' ? '<span class="score-teacher-badge">Teacher: ' + teachScore + '%</span>' : '') +
                '</div>' +
            '</div>' +
            '<p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px;">Submitted: ' + submitted + '</p>' +
            (qaDetail ? '<div style="margin-bottom:12px;">' + qaDetail + '</div>' : '') +
            '<div style="display:flex;gap:var(--spacing-sm);flex-wrap:wrap;align-items:flex-end;margin-bottom:8px;">' +
                '<div>' +
                    '<label style="font-size:0.8rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Grade (0–100)</label>' +
                    '<input type="number" id="tscore-' + lesson.id + '" min="0" max="100" value="' + teachScore + '" placeholder="e.g. 85" ' +
                        'style="width:100px;padding:6px 10px;margin:0;border:1.5px solid var(--border-color);border-radius:var(--radius-sm);font-size:0.9rem;">' +
                '</div>' +
                '<div style="flex:1;min-width:160px;">' +
                    '<label style="font-size:0.8rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Comment</label>' +
                    '<input type="text" id="tcomment-' + lesson.id + '" value="' + escT(comment).replace(/"/g,'&quot;') + '" placeholder="Add feedback…" ' +
                        'style="width:100%;padding:6px 10px;margin:0;border:1.5px solid var(--border-color);border-radius:var(--radius-sm);font-size:0.9rem;">' +
                '</div>' +
                '<button class="btn btn-primary btn-sm" onclick="saveQuizGrade(' + lesson.id + ')">Save</button>' +
            '</div>' +
        '</div>';
    });

    if (!hasQuiz) {
        html += '<p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--spacing-lg);">No quiz results yet.</p>';
    }

    /* ---- Typing Results ---- */
    var sessions = (progress.typingStats && progress.typingStats.sessions) || [];
    html += '<h4 style="font-size:1rem;margin:var(--spacing-lg) 0 var(--spacing-md);">⌨️ Typing Sessions</h4>';

    if (sessions.length === 0) {
        html += '<p style="color:var(--text-secondary);font-size:0.9rem;">No typing sessions yet.</p>';
    } else {
        sessions.slice().reverse().forEach(function(s, i) {
            var realIdx    = sessions.length - 1 - i;
            var key        = 'typing_' + realIdx;
            var teachScore = (teacherScores[key]   !== undefined) ? teacherScores[key]   : '';
            var comment    = teacherComments[key] || '';
            var date       = s.date ? new Date(s.date).toLocaleString() : 'Unknown';

            html += '<div class="grade-card">' +
                '<div class="grade-card-header">' +
                    '<span style="font-weight:600;">Session ' + (sessions.length - i) + '</span>' +
                    '<span style="font-size:0.82rem;color:var(--text-secondary);">' + date + '</span>' +
                '</div>' +
                '<div style="display:flex;gap:var(--spacing-lg);flex-wrap:wrap;margin-bottom:10px;font-size:0.9rem;">' +
                    '<span><strong style="color:var(--accent-color);">' + s.wpm + '</strong> WPM</span>' +
                    '<span><strong style="color:var(--success-color);">' + s.accuracy + '%</strong> Accuracy</span>' +
                    (teachScore !== '' ? '<span class="score-teacher-badge">Teacher: ' + teachScore + '%</span>' : '') +
                '</div>' +
                '<div style="display:flex;gap:var(--spacing-sm);flex-wrap:wrap;align-items:flex-end;">' +
                    '<div>' +
                        '<label style="font-size:0.8rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Grade (0–100)</label>' +
                        '<input type="number" id="tscore-t' + realIdx + '" min="0" max="100" value="' + teachScore + '" placeholder="e.g. 80" ' +
                            'style="width:100px;padding:6px 10px;margin:0;border:1.5px solid var(--border-color);border-radius:var(--radius-sm);font-size:0.9rem;">' +
                    '</div>' +
                    '<div style="flex:1;min-width:160px;">' +
                        '<label style="font-size:0.8rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Comment</label>' +
                        '<input type="text" id="tcomment-t' + realIdx + '" value="' + escT(comment).replace(/"/g,'&quot;') + '" placeholder="Add feedback…" ' +
                            'style="width:100%;padding:6px 10px;margin:0;border:1.5px solid var(--border-color);border-radius:var(--radius-sm);font-size:0.9rem;">' +
                    '</div>' +
                    '<button class="btn btn-primary btn-sm" onclick="saveTypingGrade(' + realIdx + ')">Save</button>' +
                '</div>' +
            '</div>';
        });
    }

    container.innerHTML = html;
}

function saveQuizGrade(lessonId) {
    var scoreInput   = document.getElementById('tscore-' + lessonId);
    var commentInput = document.getElementById('tcomment-' + lessonId);
    if (!scoreInput) return;

    var scoreVal   = scoreInput.value.trim();
    var commentVal = commentInput ? commentInput.value.trim() : '';
    var key        = 'quiz_' + lessonId;

    var scores   = loadTeacherScoresT();
    var comments = loadTeacherCommentsT();

    if (scoreVal !== '') {
        var n = parseInt(scoreVal, 10);
        if (isNaN(n) || n < 0 || n > 100) { teacherToast('Score must be 0–100.', 'danger'); return; }
        scores[key] = n;
    } else {
        delete scores[key];
    }

    if (commentVal) {
        comments[key] = commentVal;
        if (typeof dbSaveComment === 'function') {
            dbSaveComment({ id: key, targetKey: key, text: commentVal, teacherName: localStorage.getItem('dlc_teacher_name') || 'Teacher', createdAt: new Date().toISOString() }).catch(function(){});
        }
    } else {
        delete comments[key];
    }

    saveTeacherScoresT(scores);
    saveTeacherCommentsT(comments);
    teacherToast('Quiz ' + lessonId + ' grade saved ✓', 'success');
}

function saveTypingGrade(sessionIdx) {
    var scoreInput   = document.getElementById('tscore-t' + sessionIdx);
    var commentInput = document.getElementById('tcomment-t' + sessionIdx);
    if (!scoreInput) return;

    var scoreVal   = scoreInput.value.trim();
    var commentVal = commentInput ? commentInput.value.trim() : '';
    var key        = 'typing_' + sessionIdx;

    var scores   = loadTeacherScoresT();
    var comments = loadTeacherCommentsT();

    if (scoreVal !== '') {
        var n = parseInt(scoreVal, 10);
        if (isNaN(n) || n < 0 || n > 100) { teacherToast('Score must be 0–100.', 'danger'); return; }
        scores[key] = n;

        /* Also update the session in progress so it persists */
        var p = loadProgress();
        if (p.typingStats && p.typingStats.sessions && p.typingStats.sessions[sessionIdx]) {
            p.typingStats.sessions[sessionIdx].teacherScore = n;
            saveProgress(p);
        }
    } else {
        delete scores[key];
    }

    if (commentVal) {
        comments[key] = commentVal;
    } else {
        delete comments[key];
    }

    saveTeacherScoresT(scores);
    saveTeacherCommentsT(comments);
    teacherToast('Typing session ' + (sessionIdx + 1) + ' grade saved ✓', 'success');
}

function viewStudentDetails() {
    window.location.href = 'answers.html';
}

function downloadProgressData() {
    var progress = loadProgress();
    var blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    var url  = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'dlc-progress-export.json';
    link.click();
    URL.revokeObjectURL(url);
}
