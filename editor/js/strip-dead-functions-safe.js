const fs = require('fs');

const file = fs.readFileSync('yellow-pencil.js', 'utf8');

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
    "ba", "xa", "ka", "za", "Oa", "Sa", "Ta", "Ea", "La", "Ba",
    // yp-info-panel.js
    "_a", "Ca", "Da",
    // yp-animation.js
    "H", "F", "j", "Vt", "Ut", "yi",
    // yp-element-select.js
    "Q", "ee", "bi", "vi", "da", "At", "Di",
    // yp-events.js
    "He", "We",
    // yp-css-property-ui.js
    "Ke", "Je", "Qe", "et", "tt", "at", "it", "nt", "st", "ot", "rt", "lt", "dt", "pt", "ct", "ut", "mt", "ft", "gt", "ht", "yt", "wt", "vt", "bt", "xt", "_t", "kt", "Ct", "zt", "Ot", "Dt", "St", "Tt", "Et", "qt", "$t", "Gt", "Kt", "Jt", "Qt", "ea", "ta", "aa", "ia", "na", "sa", "oa", "ra", "la", "pa", "ca"
]);

// simple tokenizer to find function boundaries
let inString = false;
let stringChar = '';
let inComment = false;
let inBlockComment = false;
let inRegex = false;

let inTargetFunction = false;
let depth = 0;

let result = "";

let i = 0;
let linesStripped = 0;
let charsStripped = 0;

while(i < file.length) {
    let char = file[i];
    let nextChar = file[i+1];
    
    if (!inTargetFunction) {
        // Look ahead for "function NAME("
        let match = file.substring(i, i+100).match(/^function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
        if (match && REMOVE.has(match[1])) {
            inTargetFunction = true;
            depth = 0;
            inString = false;
            inComment = false;
            inBlockComment = false;
            inRegex = false;
            
            // Advance to the opening brace
            let braceIdx = file.indexOf('{', i);
            let sub = file.substring(i, braceIdx + 1);
            charsStripped += sub.length;
            linesStripped += (sub.match(/\n/g)||[]).length;
            i = braceIdx + 1;
            depth = 1;
            continue;
        }
    }
    
    if (inTargetFunction) {
        charsStripped++;
        if (char === '\n') linesStripped++;
        
        // tokenize inside the function to track depth accurately
        if (inComment) {
            if (char === '\n') inComment = false;
        } else if (inBlockComment) {
            if (char === '*' && nextChar === '/') {
                inBlockComment = false;
                i += 2;
                charsStripped++;
                continue;
            }
        } else if (inString) {
            if (char === '\\') {
                i += 2;
                charsStripped++;
                continue;
            }
            if (char === stringChar) {
                inString = false;
            }
        } else if (inRegex) {
            if (char === '\\') {
                i += 2;
                charsStripped++;
                continue;
            }
            if (char === '/') {
                inRegex = false;
            } else if (char === '[') {
                // simple character class skip
                let clsEnd = file.indexOf(']', i);
                if (clsEnd !== -1) {
                    let sub = file.substring(i, clsEnd);
                    charsStripped += sub.length - 1;
                    i = clsEnd;
                    continue;
                }
            }
        } else {
            if (char === '/' && nextChar === '/') {
                inComment = true;
                i += 2;
                charsStripped++;
                continue;
            } else if (char === '/' && nextChar === '*') {
                inBlockComment = true;
                i += 2;
                charsStripped++;
                continue;
            } else if (char === '"' || char === "'" || char === "`") {
                inString = true;
                stringChar = char;
            } else if (char === '/') {
                // It's really hard to perfectly distinguish regex from division.
                // But typically in this file regexes follow '(', '=', ',', or beginning of line
                let prevStr = file.substring(Math.max(0, i-20), i).trim();
                let lastChar = prevStr[prevStr.length-1];
                if (['=', '(', ',', ':', '?', '!', '&', '|'].includes(lastChar) || prevStr.endsWith('return') || prevStr.endsWith('match') || prevStr.endsWith('replace') || prevStr.endsWith('test') || prevStr.endsWith('split')) {
                    inRegex = true;
                }
            } else if (char === '{') {
                depth++;
            } else if (char === '}') {
                depth--;
                if (depth === 0) {
                    inTargetFunction = false;
                    i++;
                    continue; // Skip the closing brace
                }
            }
        }
        
        i++;
        continue;
    }
    
    // Outside target function
    result += char;
    i++;
}

fs.writeFileSync('yellow-pencil.js', result);
console.log('Stripped', linesStripped, 'lines and', charsStripped, 'chars.');
