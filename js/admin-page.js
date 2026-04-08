document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('manageLessonsBtn').addEventListener('click', function () {
        hideAllSections();
        var section = document.getElementById('manageLessonsSection');
        if (!section) return;
        section.classList.remove('hidden');
        renderManageLessons(section);
        section.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('createLessonBtn').addEventListener('click', function () {
        hideAllSections();
        var section = document.getElementById('createLessonSection');
        if (!section) return;
        section.classList.remove('hidden');
        renderCreateForm(section);
        section.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('viewStatsBtn').addEventListener('click', function () {
        hideAllSections();
        var p = loadProgress();
        var completed = p.completedLessons.length;
        var totalLessons = typeof getAllLessons === 'function' ? getAllLessons().length : LESSONS.length;
        var quizzes = Object.keys(p.quizScores || {}).length;
        var avgScore = quizzes > 0
            ? Math.round(Object.values(p.quizScores).reduce(function (a, b) { return a + b; }, 0) / quizzes)
            : 0;
        var typingSessions = (p.typingStats && p.typingStats.sessions) ? p.typingStats.sessions.length : 0;
        var avgWPM = p.typingStats ? (p.typingStats.averageWPM || 0) : 0;
        var avgAcc = p.typingStats ? (p.typingStats.averageAccuracy || 0) : 0;
        var achievements = (p.achievements || []).length;
        var customCount = 0;
        try { customCount = JSON.parse(localStorage.getItem('dlc_custom_lessons') || '[]').length; } catch(e) {}

        var out = document.getElementById('statsOutput');
        if (out) {
            out.classList.remove('hidden');
            out.innerHTML =
                '<div class="card" style="padding:24px;">' +
                '<h3 style="margin-bottom:16px;">📊 Course Statistics</h3>' +
                '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;">' +
                '<div class="stat-card"><div class="stat-value text-accent">' + completed + '/' + totalLessons + '</div><div class="stat-label">Lessons Completed</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + quizzes + '</div><div class="stat-label">Quizzes Taken</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + avgScore + '%</div><div class="stat-label">Average Quiz Score</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + typingSessions + '</div><div class="stat-label">Typing Sessions</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + avgWPM + '</div><div class="stat-label">Average WPM</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + avgAcc + '%</div><div class="stat-label">Average Accuracy</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + achievements + '</div><div class="stat-label">Achievements Earned</div></div>' +
                '<div class="stat-card"><div class="stat-value text-accent">' + customCount + '</div><div class="stat-label">Custom Lessons</div></div>' +
                '</div></div>';
            out.scrollIntoView({ behavior: 'smooth' });
        }
    });

    document.getElementById('exportAllBtn').addEventListener('click', function () {
        var p = loadProgress();
        var customLessons = [];
        try { customLessons = JSON.parse(localStorage.getItem('dlc_custom_lessons') || '[]'); } catch(e) {}
        var exportData = { progress: p, customLessons: customLessons };
        var blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'dlc-all-data-export.json';
        link.click();
        URL.revokeObjectURL(url);
        showAdminToast('Data exported successfully ✓', 2200, 'success');
    });

    document.getElementById('importDataBtn').addEventListener('click', function () {
        hideAllSections();
        var section = document.getElementById('importSection');
        if (!section) return;
        section.classList.remove('hidden');
        section.innerHTML =
            '<div class="card" style="padding:24px;">' +
            '<h3 style="margin-bottom:16px;">📥 Import Data</h3>' +
            '<p style="color:var(--text-secondary);margin-bottom:16px;">Select a previously exported JSON file to import.</p>' +
            '<input type="file" id="importFileInput" accept=".json" style="margin-bottom:16px;">' +
            '<button id="confirmImportBtn" class="btn btn-primary" style="width:100%;">Import</button>' +
            '</div>';
        section.scrollIntoView({ behavior: 'smooth' });

        document.getElementById('confirmImportBtn').addEventListener('click', function () {
            var fileInput = document.getElementById('importFileInput');
            if (!fileInput || !fileInput.files.length) {
                showAdminToast('Please select a file first.', 2500, 'info');
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                try {
                    var imported = JSON.parse(e.target.result);
                    if (imported && typeof imported === 'object') {
                        if (imported.progress) {
                            saveProgress(imported.progress);
                        } else {
                            saveProgress(imported);
                        }
                        if (imported.customLessons && Array.isArray(imported.customLessons)) {
                            localStorage.setItem('dlc_custom_lessons', JSON.stringify(imported.customLessons));
                        }
                        showAdminToast('Data imported successfully ✓', 2500, 'success');
                        section.classList.add('hidden');
                    } else {
                        showAdminToast('Invalid data format.', 2500, 'info');
                    }
                } catch (err) {
                    showAdminToast('Failed to parse file. Make sure it is valid JSON.', 3000, 'info');
                }
            };
            reader.readAsText(fileInput.files[0]);
        });
    });

    var resetBtn = document.getElementById('resetProgressBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            if (!confirm('WARNING: This will permanently reset ALL student progress. Continue?')) return;
            clearProgress();
            showAdminToast('All student progress has been reset ✓', 2500, 'success');
            setTimeout(function () { window.location.reload(); }, 600);
        });
    }
});

function hideAllSections() {
    var ids = ['manageLessonsSection', 'createLessonSection', 'statsOutput', 'importSection'];
    ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
}

function getCustomLessons() {
    try { return JSON.parse(localStorage.getItem('dlc_custom_lessons') || '[]'); } catch(e) { return []; }
}

function saveCustomLessons(arr) {
    localStorage.setItem('dlc_custom_lessons', JSON.stringify(arr));
}

function renderManageLessons(section) {
    var customLessons = getCustomLessons();
    var html = '<div class="card" style="padding:24px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">' +
        '<h3>📚 Manage Lessons</h3>' +
        '<button class="btn btn-secondary" onclick="document.getElementById(\'manageLessonsSection\').classList.add(\'hidden\')">Close</button>' +
        '</div>';

    if (customLessons.length === 0) {
        html += '<div style="padding:24px;text-align:center;color:var(--text-secondary);background:var(--bg-secondary);border-radius:8px;margin-bottom:20px;">' +
            '<p style="font-size:1rem;">No custom lessons created yet.</p>' +
            '<p style="font-size:0.9rem;margin-top:8px;">Use <strong>Create New Lesson</strong> to add your first lesson.</p>' +
            '</div>';
    } else {
        html += '<p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.9rem;">You have <strong>' + customLessons.length + '</strong> custom lesson' + (customLessons.length !== 1 ? 's' : '') + '. Click Edit to modify or Delete to remove.</p>';
        html += '<div id="customLessonsList">';
        customLessons.forEach(function(lesson, idx) {
            html += '<div id="lesson-row-' + idx + '" style="padding:16px;border:1px solid var(--border-color);border-radius:8px;margin-bottom:12px;background:var(--bg-primary);">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">' +
                '<div>' +
                '<span style="font-weight:600;color:var(--text-primary);">Lesson ' + lesson.id + ': ' + (lesson.title || 'Untitled') + '</span>' +
                '<span style="margin-left:10px;padding:2px 8px;background:var(--bg-secondary);border-radius:4px;font-size:0.8rem;color:var(--text-secondary);">' + (lesson.module || 'General') + '</span>' +
                '</div>' +
                '<div style="display:flex;gap:8px;">' +
                '<button class="btn btn-secondary" style="padding:6px 14px;font-size:0.85rem;" onclick="editCustomLesson(' + idx + ')">Edit</button>' +
                '<button class="btn btn-danger" style="padding:6px 14px;font-size:0.85rem;" onclick="deleteCustomLesson(' + idx + ')">Delete</button>' +
                '</div>' +
                '</div>' +
                '<div id="edit-form-' + idx + '" class="hidden"></div>' +
                '</div>';
        });
        html += '</div>';
    }

    html += '<div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border-color);">' +
        '<h4 style="margin-bottom:12px;color:var(--text-secondary);font-size:0.9rem;">📋 Built-in Lessons (' + LESSONS.length + ' total — read-only)</h4>' +
        '<div style="max-height:220px;overflow-y:auto;">';
    LESSONS.forEach(function(lesson) {
        html += '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border-color);">' +
            '<span style="color:var(--text-secondary);font-size:0.85rem;min-width:70px;">Lesson ' + lesson.id + '</span>' +
            '<span style="flex:1;font-size:0.9rem;">' + lesson.title + '</span>' +
            '<span style="font-size:0.8rem;color:var(--text-secondary);">' + lesson.module + '</span>' +
            '</div>';
    });
    html += '</div></div></div>';

    section.innerHTML = html;
}

function editCustomLesson(idx) {
    var customLessons = getCustomLessons();
    var lesson = customLessons[idx];
    if (!lesson) return;

    var formContainer = document.getElementById('edit-form-' + idx);
    if (!formContainer) return;

    if (!formContainer.classList.contains('hidden')) {
        formContainer.classList.add('hidden');
        formContainer.innerHTML = '';
        return;
    }

    var summaryText = (lesson.summary || []).join('\n');
    var q = (lesson.quiz && lesson.quiz.questions && lesson.quiz.questions[0]) || {};

    formContainer.innerHTML =
        '<form onsubmit="saveEditedLesson(event,' + idx + ')" style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border-color);">' +
        '<label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-secondary);font-size:0.9rem;">Lesson Title *</label>' +
        '<input type="text" id="edit-title-' + idx + '" value="' + escAttr(lesson.title || '') + '" style="width:100%;margin-bottom:14px;" required>' +

        '<label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-secondary);font-size:0.9rem;">Module</label>' +
        '<select id="edit-module-' + idx + '" style="width:100%;margin-bottom:14px;">' +
        ['Getting Started','Computer Basics','Internet Basics','Communication','Other'].map(function(m) {
            return '<option value="' + m + '"' + ((lesson.module === m) ? ' selected' : '') + '>' + m + '</option>';
        }).join('') +
        '</select>' +

        '<label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-secondary);font-size:0.9rem;">Lesson Content *</label>' +
        '<textarea id="edit-content-' + idx + '" rows="5" style="width:100%;margin-bottom:14px;padding:10px;border:2px solid var(--border-color);border-radius:8px;font-size:0.95rem;resize:vertical;" required>' + escText(lesson.content || '') + '</textarea>' +

        '<label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-secondary);font-size:0.9rem;">Summary Points (one per line)</label>' +
        '<textarea id="edit-summary-' + idx + '" rows="3" style="width:100%;margin-bottom:14px;padding:10px;border:2px solid var(--border-color);border-radius:8px;font-size:0.95rem;resize:vertical;">' + escText(summaryText) + '</textarea>' +

        '<label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-secondary);font-size:0.9rem;">Homework Question</label>' +
        '<input type="text" id="edit-homework-' + idx + '" value="' + escAttr((lesson.homework && lesson.homework.question) || '') + '" style="width:100%;margin-bottom:14px;">' +

        '<label style="display:block;margin-bottom:6px;font-weight:600;color:var(--text-secondary);font-size:0.9rem;">Quiz Question</label>' +
        '<input type="text" id="edit-quizQ-' + idx + '" value="' + escAttr(q.question || '') + '" placeholder="What is...?" style="width:100%;margin-bottom:10px;">' +
        '<input type="text" id="edit-quizOpt1-' + idx + '" value="' + escAttr((q.options && q.options[0]) || '') + '" placeholder="Option 1 (correct answer)" style="width:100%;margin-bottom:8px;">' +
        '<input type="text" id="edit-quizOpt2-' + idx + '" value="' + escAttr((q.options && q.options[1]) || '') + '" placeholder="Option 2" style="width:100%;margin-bottom:8px;">' +
        '<input type="text" id="edit-quizOpt3-' + idx + '" value="' + escAttr((q.options && q.options[2]) || '') + '" placeholder="Option 3" style="width:100%;margin-bottom:16px;">' +

        '<div style="display:flex;gap:10px;">' +
        '<button type="submit" class="btn btn-primary" style="flex:1;">Save Changes</button>' +
        '<button type="button" class="btn btn-secondary" style="flex:1;" onclick="cancelEditLesson(' + idx + ')">Cancel</button>' +
        '</div>' +
        '</form>';

    formContainer.classList.remove('hidden');
}

function escAttr(str) {
    return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function escText(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function cancelEditLesson(idx) {
    var formContainer = document.getElementById('edit-form-' + idx);
    if (formContainer) { formContainer.classList.add('hidden'); formContainer.innerHTML = ''; }
}

function saveEditedLesson(e, idx) {
    e.preventDefault();
    var customLessons = getCustomLessons();
    var lesson = customLessons[idx];
    if (!lesson) return;

    var title = document.getElementById('edit-title-' + idx).value.trim();
    var module = document.getElementById('edit-module-' + idx).value;
    var content = document.getElementById('edit-content-' + idx).value.trim();
    var summaryRaw = document.getElementById('edit-summary-' + idx).value.trim();
    var homework = document.getElementById('edit-homework-' + idx).value.trim();
    var quizQ = document.getElementById('edit-quizQ-' + idx).value.trim();
    var quizOpt1 = document.getElementById('edit-quizOpt1-' + idx).value.trim();
    var quizOpt2 = document.getElementById('edit-quizOpt2-' + idx).value.trim();
    var quizOpt3 = document.getElementById('edit-quizOpt3-' + idx).value.trim();

    if (!title || !content) {
        showAdminToast('Title and content are required.', 2500, 'info');
        return;
    }

    lesson.title = title;
    lesson.module = module;
    lesson.content = content;
    lesson.summary = summaryRaw ? summaryRaw.split('\n').filter(function(l) { return l.trim(); }) : [content.substring(0, 100) + '...'];
    lesson.homework = { id: lesson.id, question: homework || 'Review this lesson.', completed: false };

    if (quizQ && quizOpt1) {
        lesson.quiz = {
            id: lesson.id,
            questions: [{
                id: 1,
                question: quizQ,
                options: [quizOpt1, quizOpt2 || 'Option 2', quizOpt3 || 'Option 3'],
                answer: 0
            }]
        };
    }

    customLessons[idx] = lesson;
    saveCustomLessons(customLessons);

    showAdminToast('Lesson "' + title + '" updated ✓', 2500, 'success');

    var section = document.getElementById('manageLessonsSection');
    if (section) renderManageLessons(section);
}

function deleteCustomLesson(idx) {
    var customLessons = getCustomLessons();
    var lesson = customLessons[idx];
    if (!lesson) return;
    if (!confirm('Delete lesson "' + (lesson.title || 'Untitled') + '"? This cannot be undone.')) return;
    customLessons.splice(idx, 1);
    saveCustomLessons(customLessons);
    showAdminToast('Lesson deleted ✓', 2000, 'success');
    var section = document.getElementById('manageLessonsSection');
    if (section) renderManageLessons(section);
}

function renderCreateForm(section) {
    section.innerHTML =
        '<div class="card" style="padding:24px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">' +
        '<h3>📝 Create New Lesson</h3>' +
        '<button class="btn btn-secondary" onclick="document.getElementById(\'createLessonSection\').classList.add(\'hidden\')">Close</button>' +
        '</div>' +
        '<form id="newLessonForm">' +
        '<label style="display:block;margin-bottom:6px;color:var(--text-secondary);font-weight:600;">Lesson Title *</label>' +
        '<input type="text" id="newLessonTitle" placeholder="e.g. Internet Safety Tips" style="width:100%;margin-bottom:16px;" required>' +

        '<label style="display:block;margin-bottom:6px;color:var(--text-secondary);font-weight:600;">Module</label>' +
        '<select id="newLessonModule" style="width:100%;margin-bottom:16px;">' +
        '<option>Getting Started</option><option>Computer Basics</option><option>Internet Basics</option><option>Communication</option><option>Other</option>' +
        '</select>' +

        '<label style="display:block;margin-bottom:6px;color:var(--text-secondary);font-weight:600;">Lesson Content *</label>' +
        '<textarea id="newLessonContent" rows="6" placeholder="Write the full lesson text here..." style="width:100%;margin-bottom:16px;padding:12px;border:2px solid var(--border-color);border-radius:8px;font-size:1rem;resize:vertical;" required></textarea>' +

        '<label style="display:block;margin-bottom:6px;color:var(--text-secondary);font-weight:600;">Summary Points (one per line)</label>' +
        '<textarea id="newLessonSummary" rows="3" placeholder="First key point&#10;Second key point&#10;Third key point" style="width:100%;margin-bottom:16px;padding:12px;border:2px solid var(--border-color);border-radius:8px;font-size:1rem;resize:vertical;"></textarea>' +

        '<label style="display:block;margin-bottom:6px;color:var(--text-secondary);font-weight:600;">Homework Question</label>' +
        '<input type="text" id="newLessonHomework" placeholder="e.g. Practice this skill at home..." style="width:100%;margin-bottom:16px;">' +

        '<label style="display:block;margin-bottom:6px;color:var(--text-secondary);font-weight:600;">Quiz Question</label>' +
        '<input type="text" id="quizQ" placeholder="What is...?" style="width:100%;margin-bottom:10px;">' +
        '<input type="text" id="quizOpt1" placeholder="Option 1 (correct answer)" style="width:100%;margin-bottom:8px;">' +
        '<input type="text" id="quizOpt2" placeholder="Option 2" style="width:100%;margin-bottom:8px;">' +
        '<input type="text" id="quizOpt3" placeholder="Option 3" style="width:100%;margin-bottom:16px;">' +

        '<div style="display:flex;gap:12px;">' +
        '<button type="submit" class="btn btn-primary" style="flex:1;">Save Lesson</button>' +
        '<button type="button" class="btn btn-secondary" style="flex:1;" onclick="document.getElementById(\'createLessonSection\').classList.add(\'hidden\')">Cancel</button>' +
        '</div>' +
        '</form></div>';

    document.getElementById('newLessonForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var title = document.getElementById('newLessonTitle').value.trim();
        var module = document.getElementById('newLessonModule').value;
        var content = document.getElementById('newLessonContent').value.trim();
        var summaryRaw = document.getElementById('newLessonSummary').value.trim();
        var homework = document.getElementById('newLessonHomework').value.trim();
        var quizQ = document.getElementById('quizQ').value.trim();
        var quizOpt1 = document.getElementById('quizOpt1').value.trim();
        var quizOpt2 = document.getElementById('quizOpt2').value.trim();
        var quizOpt3 = document.getElementById('quizOpt3').value.trim();

        if (!title || !content) {
            showAdminToast('Please fill in the title and content.', 2500, 'info');
            return;
        }

        var customLessons = getCustomLessons();
        var allIds = LESSONS.map(function(l) { return l.id; }).concat(customLessons.map(function(l) { return l.id; }));
        var newId = allIds.length > 0 ? Math.max.apply(null, allIds) + 1 : 13;
        var summary = summaryRaw ? summaryRaw.split('\n').filter(function (l) { return l.trim(); }) : [content.substring(0, 100) + '...'];

        var lesson = {
            id: newId,
            title: title,
            module: module,
            level: 1,
            content: content,
            summary: summary,
            homework: { id: newId, question: homework || 'Review this lesson.', completed: false },
            quiz: { id: newId, questions: [] }
        };

        if (quizQ && quizOpt1) {
            lesson.quiz.questions.push({
                id: 1,
                question: quizQ,
                options: [quizOpt1, quizOpt2 || 'Option 2', quizOpt3 || 'Option 3'],
                answer: 0
            });
        }

        customLessons.push(lesson);
        saveCustomLessons(customLessons);

        var p = loadProgress();
        if (!p.unlockedLessons.includes(newId)) {
            p.unlockedLessons.push(newId);
            saveProgress(p);
        }

        showAdminToast('Lesson "' + title + '" created successfully ✓', 3000, 'success');
        section.classList.add('hidden');
    });
}

function showAdminToast(message, duration, type) {
    duration = duration || 3000;
    type = type || 'info';
    var t = document.createElement('div');
    t.style.cssText =
        'position:fixed;bottom:24px;right:24px;' +
        'background:' + (type === 'success' ? 'var(--success-color,#30d158)' : type === 'info' ? 'var(--accent-color,#0a84ff)' : 'var(--danger-color,#ff453a)') + ';' +
        'color:white;padding:12px 24px;border-radius:8px;' +
        'box-shadow:0 4px 12px rgba(0,0,0,0.2);z-index:9999;font-weight:500;font-size:0.95rem;';
    t.textContent = message;
    document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.remove(); }, duration);
}
