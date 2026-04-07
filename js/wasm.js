/* ============================================================
   wasm.js - WebAssembly typing stats module
   Binary compiled from:
     wasm/typing.wat (WAT source - Rust/C equivalent)
   Functions: calcWPM(chars, seconds) -> wpm
              calcAccuracy(correct, total) -> percent
   ============================================================ */

// Pre-compiled WASM binary bytes (hand-assembled from WAT source)
// Module exports: calcWPM(i32 chars, i32 seconds) i32
//                 calcAccuracy(i32 correct, i32 total) i32
const WASM_BYTES = new Uint8Array([
  // Magic + Version
  0, 97, 115, 109, 1, 0, 0, 0,
  // Type section: one function type (i32, i32) -> i32
  1, 5, 1, 96, 2, 127, 127, 1, 127,
  // Function section: 2 functions using type 0
  3, 3, 2, 0, 0,
  // Export section: "calcWPM" -> func 0, "calcAccuracy" -> func 1
  7, 26, 2,
    7, 99, 97, 108, 99, 87, 80, 77, 0, 0,
    12, 99, 97, 108, 99, 65, 99, 99, 117, 114, 97, 99, 121, 0, 1,
  // Code section: 2 function bodies
  10, 23, 2,
    // calcWPM: (chars * 12) / seconds  [chars/5 words / (seconds/60) = chars*12/seconds]
    10, 0, 32, 0, 65, 12, 106, 32, 1, 109, 11,
    // calcAccuracy: (correct * 100) / total
    10, 0, 32, 0, 65, 100, 106, 32, 1, 109, 11
]);

let wasmCalcWPM = null;
let wasmCalcAccuracy = null;

async function initWasm() {
  try {
    const { instance } = await WebAssembly.instantiate(WASM_BYTES.buffer);
    wasmCalcWPM = instance.exports.calcWPM;
    wasmCalcAccuracy = instance.exports.calcAccuracy;
    console.info('[WASM] Typing stats module loaded successfully.');
  } catch (e) {
    console.warn('[WASM] Failed to load, using JS fallback.', e);
    wasmCalcWPM = null;
    wasmCalcAccuracy = null;
  }
}

function calcWPM(chars, seconds) {
  if (seconds <= 0) return 0;
  if (wasmCalcWPM) return wasmCalcWPM(chars, Math.max(1, seconds));
  return Math.round((chars / 5) / (seconds / 60));
}

function calcAccuracy(correctChars, totalChars) {
  if (totalChars <= 0) return 0;
  if (wasmCalcAccuracy) return Math.min(100, wasmCalcAccuracy(correctChars, totalChars));
  return Math.min(100, Math.round((correctChars / totalChars) * 100));
}

// Initialise on script load
initWasm();
