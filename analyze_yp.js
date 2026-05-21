const fs = require('fs');
const path = require('path');
const vm = require('vm');

const yellowPencilPath = path.join(__dirname, 'editor', 'js', 'yellow-pencil.js');
const ypContent = fs.readFileSync(yellowPencilPath, 'utf8');

// Syntax check using Node.js vm
try {
    new vm.Script(ypContent);
    console.log("Syntax is perfectly valid!");
} catch (err) {
    console.error("Syntax error detected:", err);
    process.exit(1);
}

// Get all functions defined in yellow-pencil.js
const functionRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
const ypFunctions = new Map(); // name -> line number
const lines = ypContent.split('\n');
for (let i = 0; i < lines.length; i++) {
    let match;
    while ((match = functionRegex.exec(lines[i])) !== null) {
        ypFunctions.set(match[1], i + 1);
    }
}

console.log(`Found ${ypFunctions.size} functions in yellow-pencil.js.`);

// Scan modules for compat properties and function names
const modulesDir = path.join(__dirname, 'editor', 'js', 'modules');
const files = fs.readdirSync(modulesDir);

const compatAliases = new Map(); // alias -> file
const moduleDefinedFunctions = new Map(); // funcName -> file

files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const filePath = path.join(modulesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find references like YP._compat.xxx = ...
    const compatAssignRegex = /YP\._compat\.([a-zA-Z0-9_$]+)\s*=/g;
    let match;
    while ((match = compatAssignRegex.exec(content)) !== null) {
        compatAliases.set(match[1], file);
    }
    
    // Find Object.assign(YP._compat, { ... }) blocks
    const assignBlocks = content.match(/Object\.assign\(\s*YP\._compat\s*,\s*\{([^}]+)\}\)/g);
    if (assignBlocks) {
        assignBlocks.forEach(block => {
            const aliasRegex = /\b([a-zA-Z0-9_$]+)\s*:/g;
            let aliasMatch;
            while ((aliasMatch = aliasRegex.exec(block)) !== null) {
                compatAliases.set(aliasMatch[1], file);
            }
        });
    }

    // Also look for general function definitions in modular files
    const funcRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
    while ((match = funcRegex.exec(content)) !== null) {
        moduleDefinedFunctions.set(match[1], file);
    }
});

const duplicates = [];
for (const [name, line] of ypFunctions.entries()) {
    if (compatAliases.has(name)) {
        duplicates.push({ name, line, type: 'compat', file: compatAliases.get(name) });
    } else if (moduleDefinedFunctions.has(name)) {
        duplicates.push({ name, line, type: 'module_func', file: moduleDefinedFunctions.get(name) });
    }
}

console.log("\nDuplicates / Modularized code still in yellow-pencil.js:");
duplicates.sort((a, b) => a.line - b.line).forEach(dup => {
    console.log(`Line ${dup.line}: function ${dup.name} (type: ${dup.type}) -> in module: ${dup.file}`);
});
