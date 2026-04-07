;; wasm/typing.wat - WebAssembly Text Format source for typing stats
;; Compiled to binary (75 bytes) embedded in js/wasm.js as a Uint8Array
;;
;; C equivalent:
;;   int calcWPM(int chars, int seconds) { return (chars * 12) / seconds; }
;;   int calcAccuracy(int correct, int total) { return (correct * 100) / total; }
;;
;; Rust equivalent:
;;   pub fn calc_wpm(chars: i32, seconds: i32) -> i32 { (chars * 12) / seconds }
;;   pub fn calc_accuracy(correct: i32, total: i32) -> i32 { (correct * 100) / total }

(module
  ;; Type section: both functions have signature (i32, i32) -> i32
  (type $t0 (func (param i32 i32) (result i32)))

  ;; calcWPM: words ~= chars/5, WPM = (chars/5)/minutes = chars*12/seconds
  (func $calcWPM (type $t0)
    local.get 0   ;; chars
    i32.const 12
    i32.mul
    local.get 1   ;; seconds
    i32.div_s
  )

  ;; calcAccuracy: (correct * 100) / total  -> percentage 0-100
  (func $calcAccuracy (type $t0)
    local.get 0   ;; correct
    i32.const 100
    i32.mul
    local.get 1   ;; total
    i32.div_s
  )

  ;; Export both functions
  (export "calcWPM" (func $calcWPM))
  (export "calcAccuracy" (func $calcAccuracy))
)
