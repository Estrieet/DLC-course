/* ============================================================
   db.js - IndexedDB persistent storage layer
   ============================================================ */

const DB_NAME = 'DLCourse';
const DB_VERSION = 2;
const STORE_NAME = 'progress';
const SETTINGS_STORE = 'settings';
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) { resolve(db); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const database = e.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
      if (!database.objectStoreNames.contains(SETTINGS_STORE)) {
        database.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}

async function dbSet(key, value) {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put({ key, value });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('IndexedDB write failed, using localStorage fallback', e);
    localStorage.setItem('idb_' + key, JSON.stringify(value));
  }
}

async function dbGet(key) {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(key);
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
      const tx = database.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    Object.keys(localStorage).filter(k => k.startsWith('idb_')).forEach(k => localStorage.removeItem(k));
  }
}

/* --- Settings store (theme, textSize) --- */
async function dbSaveSetting(key, value) {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(SETTINGS_STORE, 'readwrite');
      tx.objectStore(SETTINGS_STORE).put({ key: key, value: value });
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
      const tx = database.transaction(SETTINGS_STORE, 'readonly');
      const req = tx.objectStore(SETTINGS_STORE).get(key);
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    var item = localStorage.getItem('dlc_setting_' + key);
    return item ? JSON.parse(item) : null;
  }
}
