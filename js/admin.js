/* js/admin.js – Admin page */
document.addEventListener('DOMContentLoaded', () => {
  buildTopBar('Admin');
  const p = loadProgress();
  const root = document.getElementById('adminRoot');
  if (!root) return;
  root.innerHTML = `
    <div class="card fade-in">
      <h2 class="section-title mb-4">Database & Storage</h2>
      <div class="btn-group">
        <button class="btn btn-secondary" onclick="exportData()">Export Progress JSON</button>
        <button class="btn btn-danger" onclick="nukeData()">Clear All Data</button>
      </div>
      <div id="exportOut" class="mt-4" style="display:none">
        <textarea id="exportTA" class="typing-input" style="height:200px;font-family:monospace;font-size:0.8rem" readonly></textarea>
      </div>
    </div>
  `;
});

function exportData() {
  const p = loadProgress();
  const ta = document.getElementById('exportTA');
  const out = document.getElementById('exportOut');
  if (ta && out) {
    ta.value = JSON.stringify(p, null, 2);
    out.style.display = 'block';
  }
}

function nukeData() {
  if (confirm('Delete ALL stored data? This is permanent.')) {
    clearProgress();
    dbClear();
    sessionStorage.clear();
    toast('All data cleared', 'info');
  }
}
