/* ============================================================
   messages.js - Message / Notice Board System
   ============================================================ */

const LS_MESSAGES_KEY = 'dlc_messages';

function loadMessages() {
    try {
        const raw = localStorage.getItem(LS_MESSAGES_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function saveMessages(messages) {
    localStorage.setItem(LS_MESSAGES_KEY, JSON.stringify(messages));
}

function addMessage(text, senderRole) {
    if (!text || !text.trim()) return null;
    const messages = loadMessages();
    const senderName = senderRole === 'teacher'
        ? (localStorage.getItem('dlc_teacher_name') || 'Teacher')
        : (getStudentName() || 'Student');
    const msg = {
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        sender: senderName,
        senderRole: senderRole,
        text: text.trim(),
        timestamp: new Date().toISOString()
    };
    messages.unshift(msg);
    saveMessages(messages);
    if (typeof dbSaveMessage === 'function') dbSaveMessage(msg).catch(() => {});
    return msg;
}

/* Returns true if deleted, false if not authorised */
function removeMessage(msgId, requesterRole) {
    const messages = loadMessages();
    const idx = messages.findIndex(m => m.id === msgId);
    if (idx === -1) return false;
    const msg = messages[idx];

    /* Teachers can delete any message */
    if (requesterRole === 'teacher') {
        messages.splice(idx, 1);
        saveMessages(messages);
        if (typeof dbDeleteMessage === 'function') dbDeleteMessage(msgId).catch(() => {});
        return true;
    }

    /* Students can delete their own messages (matched by sender name) */
    const studentName = getStudentName();
    if (msg.senderRole === 'student' && msg.sender === studentName) {
        messages.splice(idx, 1);
        saveMessages(messages);
        if (typeof dbDeleteMessage === 'function') dbDeleteMessage(msgId).catch(() => {});
        return true;
    }

    /* Students can also delete teacher messages if they ARE the teacher
       (i.e. the poster name matches the saved teacher name) */
    const teacherName = localStorage.getItem('dlc_teacher_name') || '';
    if (msg.senderRole === 'teacher' && teacherName && msg.sender === teacherName) {
        messages.splice(idx, 1);
        saveMessages(messages);
        if (typeof dbDeleteMessage === 'function') dbDeleteMessage(msgId).catch(() => {});
        return true;
    }

    return false;
}

function getStudentName() {
    try {
        const raw = localStorage.getItem('dlc_progress');
        if (!raw) return '';
        const p = JSON.parse(raw);
        return (p.profile && p.profile.name) ? p.profile.name : '';
    } catch { return ''; }
}

function getCurrentRole() {
    return localStorage.getItem('dlc_current_role') || 'student';
}

function setCurrentRole(role) {
    localStorage.setItem('dlc_current_role', role);
}

function formatMessageDate(isoString) {
    const d = new Date(isoString);
    const day  = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return day + ' at ' + time;
}

/* Small toast used only on the messages page */
function showMsgToast(text, type) {
    var t = document.createElement('div');
    t.style.cssText =
        'position:fixed;bottom:24px;right:24px;' +
        'background:' + (type === 'success' ? 'var(--success-color)' : type === 'danger' ? 'var(--danger-color)' : 'var(--accent-color)') + ';' +
        'color:white;padding:12px 22px;border-radius:10px;' +
        'box-shadow:var(--shadow-lg);z-index:9999;font-weight:500;font-size:0.93rem;' +
        'max-width:320px;line-height:1.4;';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function() { if (t.parentNode) t.remove(); }, 3200);
}

/* ---- Notice board (home page preview, no delete buttons) ---- */
function renderNoticeBoard(containerId, maxMessages) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const messages = loadMessages();
    const toShow = maxMessages ? messages.slice(0, maxMessages) : messages;

    if (toShow.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:var(--spacing-lg);font-size:0.95rem;">No messages yet. Be the first to post!</p>';
        return;
    }

    container.innerHTML = toShow.map(function(msg) {
        const roleLabel = msg.senderRole === 'teacher' ? '👩‍🏫 Teacher' : '👤 Student';
        const roleBadge = msg.senderRole === 'teacher' ? 'badge-blue' : 'badge-green';
        return '<div class="notice-msg" data-id="' + msg.id + '">' +
            '<div class="notice-msg-header">' +
                '<div class="notice-msg-sender">' +
                    '<span class="badge ' + roleBadge + '" style="font-size:0.75rem;">' + roleLabel + '</span>' +
                    '<strong style="font-size:0.95rem;">' + escapeHtml(msg.sender) + '</strong>' +
                '</div>' +
                '<span class="notice-msg-date">' + formatMessageDate(msg.timestamp) + '</span>' +
            '</div>' +
            '<p class="notice-msg-text">' + escapeHtml(msg.text) + '</p>' +
        '</div>';
    }).join('');
}

/* ---- Full messages page (delete button on every message) ---- */
function renderMessagesPage() {
    const container = document.getElementById('messagesContainer');
    if (!container) return;
    const messages = loadMessages();

    if (messages.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:var(--spacing-xl);font-size:1rem;">No messages yet. Write the first message!</p>';
        return;
    }

    container.innerHTML = messages.map(function(msg) {
        const roleLabel = msg.senderRole === 'teacher' ? '👩‍🏫 Teacher' : '👤 Student';
        const roleBadge = msg.senderRole === 'teacher' ? 'badge-blue' : 'badge-green';

        return '<div class="notice-msg" data-id="' + msg.id + '">' +
            '<div class="notice-msg-header">' +
                '<div class="notice-msg-sender">' +
                    '<span class="badge ' + roleBadge + '" style="font-size:0.75rem;">' + roleLabel + '</span>' +
                    '<strong style="font-size:0.95rem;">' + escapeHtml(msg.sender) + '</strong>' +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:8px;">' +
                    '<span class="notice-msg-date">' + formatMessageDate(msg.timestamp) + '</span>' +
                    '<button class="btn-delete-msg" onclick="handleDeleteMessage(\'' + msg.id + '\')" title="Delete message" aria-label="Delete message">✕</button>' +
                '</div>' +
            '</div>' +
            '<p class="notice-msg-text">' + escapeHtml(msg.text) + '</p>' +
        '</div>';
    }).join('');
}

function handleDeleteMessage(msgId) {
    const role = getCurrentRole();

    if (!confirm('Delete this message?')) return;

    if (removeMessage(msgId, role)) {
        renderMessagesPage();
        showMsgToast('Message deleted.', 'success');
    } else {
        /* Tell the user why it failed */
        const studentName = getStudentName();
        if (role === 'student' && !studentName) {
            showMsgToast('Set your name in Settings first, then you can delete your own messages.', 'danger');
        } else {
            showMsgToast('You can only delete your own messages. Switch to "Teacher" role to delete any message.', 'danger');
        }
    }
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
