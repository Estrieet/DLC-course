/* ============================================================
   wasm.js - Typing stats calculation module
   Functions: calcWPM(chars, seconds) -> wpm
              calcAccuracy(correct, total) -> percent
   ============================================================ */

function calcWPM(chars, seconds) {
  if (seconds <= 0) return 0;
  return Math.round((chars / 5) / (seconds / 60));
}

function calcAccuracy(correctChars, totalChars) {
  if (totalChars <= 0) return 0;
  return Math.min(100, Math.round((correctChars / totalChars) * 100));
}
