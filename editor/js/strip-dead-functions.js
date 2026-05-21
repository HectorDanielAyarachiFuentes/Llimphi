/**
 * strip-dead-functions.js
 *
 * Reads yellow-pencil.js and physically removes all function definitions
 * that have been migrated to editor/js/modules/.
 *
 * Usage:
 *   node strip-dead-functions.js
 */

const fs   = require("fs");
const path = require("path");

const TARGET = path.join(__dirname, "yellow-pencil.js");
const BACKUP = TARGET + ".bak2";

// ── Functions to strip ─────────────────────────────────────────────────────
const REMOVE = new Set([
    // yp-state.js
    "e", "t", "C", "z", "O", "D", "A", "S", "T", "E", "_", "K", "J",
    // yp-ui-utils.js
    "k", "R", "I", "P", "w", "v", "L", "Li", "Bi", "mi", "g", "h",
    // yp-css-storage.js
    "a", "r", "l", "V",
    // yp-css-parser.js
    "d", "p", "c", "u", "m", "f", "gi",
    // yp-selector.js
    "ya", "wa", "ua", "ma", "fa", "hi", "xi", "Ca", "Da", "Hi", "_i", "_a",
    // yp-responsive.js
    "Y", "N", "X", "ei",
    // yp-save.js
    "re",
    // yp-info-panel.js
    "M", "Z", "ia", "aa", "ea", "ta",
    // yp-animation.js
    "H", "F", "j", "Vt", "Ut", "yi",
    // yp-element-select.js
    "Q", "ee", "bi", "vi", "da", "At", "Ba", "Di",
    // yp-events.js
    "He", "We",
]);

// Pattern: function declarations at 1–3 tab levels.
// yellow-pencil.js mixes 1-tab and 2-tab indentation at the IIFE top level.
// We avoid matching deeply-nested callbacks by capping at 3 tabs or 24 spaces.
const FN_DECL = /^(\t{1,3}| {4,24})function ([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/;

// ── Main ──────────────────────────────────────────────────────────────────
const raw   = fs.readFileSync(TARGET, "utf8");
const CRLF  = raw.indexOf("\r\n") !== -1;
const lines = raw.split(CRLF ? "\r\n" : "\n");

fs.writeFileSync(BACKUP, raw, "utf8");
console.log("Backup saved →", path.basename(BACKUP));

const output      = [];
let   inRemovable = false;
let   depth       = 0;
let   removedFns  = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inRemovable) {
        const match = FN_DECL.exec(line);
        if (match && REMOVE.has(match[2])) {
            inRemovable = true;
            depth       = 0;
            removedFns.push(match[2]);

            for (const ch of line) {
                if (ch === "{") depth++;
                else if (ch === "}") depth--;
            }

            if (depth <= 0) {
                inRemovable = false;
                if (i + 1 < lines.length && lines[i + 1].trim() === "") i++;
            }
            continue;
        }
        output.push(line);
    } else {
        for (const ch of line) {
            if (ch === "{") depth++;
            else if (ch === "}") depth--;
        }

        if (depth <= 0) {
            inRemovable = false;
            if (i + 1 < lines.length && lines[i + 1].trim() === "") i++;
        }
    }
}

const result = output.join(CRLF ? "\r\n" : "\n");
fs.writeFileSync(TARGET, result, "utf8");

// ── Report ─────────────────────────────────────────────────────────────────
console.log("\n✅  Done!");
console.log(`   Before : ${lines.length} lines`);
console.log(`   After  : ${output.length} lines`);
console.log(`   Removed: ${lines.length - output.length} lines`);
console.log(`\n   Stripped (${removedFns.length}): ${removedFns.join(", ")}`);

const notFound = [...REMOVE].filter(fn => !removedFns.includes(fn));
if (notFound.length > 0) {
    console.log(`\n   ⚠️  Not found: ${notFound.join(", ")}`);
}
