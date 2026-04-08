/* ============================================================
   messages.js - Message / Notice Board System
   Uses localStorage for persistence
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
    return msg;
}

function removeMessage(msgId, requesterRole) {
    const messages = loadMessages();
    const idx = messages.findIndex(m => m.id === msgId);
    if (idx === -1) return false;
    const msg = messages[idx];
    const studentName = getStudentName();
    const teacherName = localStorage.getItem('dlc_teacher_name') || '';
    if (requesterRole === 'teacher') {
        messages.splice(idx, 1);
        saveMessages(messages);
        return true;
    }
    if (msg.sender === studentName && msg.senderRole === 'student') {
        messages.splice(idx, 1);
        saveMessages(messages);
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
    const day = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return day + ' at ' + time;
}

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

function renderMessagesPage() {
    const container = document.getElementById('messagesContainer');
    if (!container) return;
    const messages = loadMessages();
    const role = getCurrentRole();
    const studentName = getStudentName();

    if (messages.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:var(--spacing-xl);font-size:1rem;">No messages yet. Write the first message!</p>';
        return;
    }

    container.innerHTML = messages.map(function(msg) {
        const roleLabel = msg.senderRole === 'teacher' ? '👩‍🏫 Teacher' : '👤 Student';
        const roleBadge = msg.senderRole === 'teacher' ? 'badge-blue' : 'badge-green';
        var canDelete = false;
        if (role === 'teacher') canDelete = true;
        else if (msg.sender === studentName && msg.senderRole === 'student') canDelete = true;

        return '<div class="notice-msg" data-id="' + msg.id + '">' +
            '<div class="notice-msg-header">' +
                '<div class="notice-msg-sender">' +
                    '<span class="badge ' + roleBadge + '" style="font-size:0.75rem;">' + roleLabel + '</span>' +
                    '<strong style="font-size:0.95rem;">' + escapeHtml(msg.sender) + '</strong>' +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:8px;">' +
                    '<span class="notice-msg-date">' + formatMessageDate(msg.timestamp) + '</span>' +
                    (canDelete ? '<button class="btn-delete-msg" onclick="handleDeleteMessage(\'' + msg.id + '\')" title="Remove message">✕</button>' : '') +
                '</div>' +
            '</div>' +
            '<p class="notice-msg-text">' + escapeHtml(msg.text) + '</p>' +
        '</div>';
    }).join('');
}

function handleDeleteMessage(msgId) {
    var role = getCurrentRole();
    if (removeMessage(msgId, role)) {
        renderMessagesPage();
    }
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
