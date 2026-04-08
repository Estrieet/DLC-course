/* ============================================================
   db.js - IndexedDB persistent storage layer
   Stores: progress, settings, messages, results, typingResults, comments
   ============================================================ */

const DB_NAME = 'DLCourse';
const DB_VERSION = 3;
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) { resolve(db); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const database = e.target.result;
      const names = database.objectStoreNames;
      if (!names.contains('progress'))      database.createObjectStore('progress',      { keyPath: 'key' });
      if (!names.contains('settings'))      database.createObjectStore('settings',      { keyPath: 'key' });
      if (!names.contains('messages'))      database.createObjectStore('messages',      { keyPath: 'id' });
      if (!names.contains('results'))       database.createObjectStore('results',       { keyPath: 'id' });
      if (!names.contains('typingResults')) database.createObjectStore('typingResults', { keyPath: 'id' });
      if (!names.contains('comments'))      database.createObjectStore('comments',      { keyPath: 'id' });
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}

/* --- Generic store helpers --- */
function dbPut(storeName, record) {
  return openDB().then(database => new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  })).catch(e => console.warn('dbPut failed', storeName, e));
}

function dbGetAll(storeName) {
  return openDB().then(database => new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  })).catch(() => []);
}

function dbDeleteRecord(storeName, id) {
  return openDB().then(database => new Promise((resolve, reject) => {
    const tx = database.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  })).catch(e => console.warn('dbDeleteRecord failed', storeName, e));
}

/* --- Progress store (key-value) --- */
async function dbSet(key, value) {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction('progress', 'readwrite');
      tx.objectStore('progress').put({ key, value });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    localStorage.setItem('idb_' + key, JSON.stringify(value));
  }
}

async function dbGet(key) {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction('progress', 'readonly');
      const req = tx.objectStore('progress').get(key);
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    const item = localStorage.getItem('idb_' + key);
    return item ? JSON.parse(item) : null;
  }
}

async function dbClear() {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction('progress', 'readwrite');
      tx.objectStore('progress').clear();
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    Object.keys(localStorage).filter(k => k.startsWith('idb_')).forEach(k => localStorage.removeItem(k));
  }
}

/* --- Settings store --- */
async function dbSaveSetting(key, value) {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction('settings', 'readwrite');
      tx.objectStore('settings').put({ key, value });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    localStorage.setItem('dlc_setting_' + key, JSON.stringify(value));
  }
}

async function dbGetSetting(key) {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction('settings', 'readonly');
      const req = tx.objectStore('settings').get(key);
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    var item = localStorage.getItem('dlc_setting_' + key);
    return item ? JSON.parse(item) : null;
  }
}

/* --- Messages table --- */
function dbSaveMessage(msg) {
  return dbPut('messages', msg);
}
function dbGetMessages() {
  return dbGetAll('messages').then(rows =>
    rows.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  );
}
function dbDeleteMessage(id) {
  return dbDeleteRecord('messages', id);
}

/* --- Quiz results table --- */
function dbSaveResult(record) {
  /* record: { id, studentName, lessonId, lessonTitle, score, selectedAnswers, submittedAt } */
  return dbPut('results', record);
}
function dbGetResults() {
  return dbGetAll('results').then(rows =>
    rows.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
  );
}

/* --- Typing results table --- */
function dbSaveTypingEntry(record) {
  /* record: { id, studentName, wpm, accuracy, date, teacherScore } */
  return dbPut('typingResults', record);
}
function dbGetTypingEntries() {
  return dbGetAll('typingResults').then(rows =>
    rows.sort((a, b) => new Date(b.date) - new Date(a.date))
  );
}

/* --- Comments table --- */
function dbSaveComment(comment) {
  /* comment: { id, targetKey, text, teacherName, createdAt } */
  return dbPut('comments', comment);
}
function dbGetComments() {
  return dbGetAll('comments');
}
function dbDeleteComment(id) {
  return dbDeleteRecord('comments', id);
}
