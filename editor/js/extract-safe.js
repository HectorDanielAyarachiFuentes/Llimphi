const fs = require('fs');

const file = fs.readFileSync('yellow-pencil.js', 'utf8');

const EXTRACT = new Set([
    'Ke', 'Je', 'Qe', 'et', 'tt', 'at', 'it', 'nt', 'st', 'ot', 'rt', 'lt', 'dt', 'pt', 'ct', 'ut', 'mt', 'ft', 'gt', 'ht', 'yt', 'wt', 'vt', 'bt', 'xt', '_t', 'kt', 'Ct', 'zt', 'Ot', 'Dt', 'St', 'Tt', 'Et', 'qt', '$t', 'Gt', 'Kt', 'Jt', 'Qt', 'ea', 'ta', 'aa', 'ia', 'na', 'sa', 'oa', 'ra', 'la', 'da', 'pa', 'ca'
]);

let inString = false;
let stringChar = '';
let inComment = false;
let inBlockComment = false;
let inRegex = false;

let inTargetFunction = false;
let depth = 0;
let currentFnName = '';
let currentFnBody = '';
let extracted = {};

let i = 0;

while(i < file.length) {
    let char = file[i];
    let nextChar = file[i+1];
    
    if (!inTargetFunction) {
        let match = file.substring(i, i+100).match(/^function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/);
        if (match && EXTRACT.has(match[1])) {
            inTargetFunction = true;
            depth = 0;
            currentFnName = match[1];
            currentFnBody = '';
            inString = false;
            inComment = false;
            inBlockComment = false;
            inRegex = false;
            
            let braceIdx = file.indexOf('{', i);
            currentFnBody += file.substring(i, braceIdx + 1);
            i = braceIdx + 1;
            depth = 1;
            continue;
        }
    }
    
    if (inTargetFunction) {
        currentFnBody += char;
        
        if (inComment) {
            if (char === '\n') inComment = false;
        } else if (inBlockComment) {
            if (char === '*' && nextChar === '/') {
                inBlockComment = false;
                currentFnBody += nextChar;
                i += 2;
                continue;
            }
        } else if (inString) {
            if (char === '\\') {
                currentFnBody += nextChar;
                i += 2;
                continue;
            }
            if (char === stringChar) {
                inString = false;
            }
        } else if (inRegex) {
            if (char === '\\') {
                currentFnBody += nextChar;
                i += 2;
                continue;
            }
            if (char === '/') {
                inRegex = false;
            } else if (char === '[') {
                let clsEnd = file.indexOf(']', i);
                if (clsEnd !== -1) {
                    currentFnBody += file.substring(i+1, clsEnd + 1);
                    i = clsEnd;
                    continue;
                }
            }
        } else {
            if (char === '/' && nextChar === '/') {
                inComment = true;
                currentFnBody += nextChar;
                i += 2;
                continue;
            } else if (char === '/' && nextChar === '*') {
                inBlockComment = true;
                currentFnBody += nextChar;
                i += 2;
                continue;
            } else if (char === '"' || char === "'" || char === "`") {
                inString = true;
                stringChar = char;
            } else if (char === '/') {
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
                    extracted[currentFnName] = currentFnBody;
                    i++;
                    continue;
                }
            }
        }
        
        i++;
        continue;
    }
    
    i++;
}

let out = '';
EXTRACT.forEach(f => {
    if (extracted[f]) out += extracted[f] + '\n\n';
});
fs.writeFileSync('yp-css-property-ui-raw.js', out);
console.log('Extracted safe:', Object.keys(extracted).length, 'functions. Size:', out.length);
