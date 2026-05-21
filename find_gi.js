const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, 'editor', 'js', 'yellow-pencil.js'),
    ...fs.readdirSync(path.join(__dirname, 'editor', 'js', 'modules')).map(file => path.join(__dirname, 'editor', 'js', 'modules', file))
];

files.forEach(filePath => {
    if (!fs.existsSync(filePath) || !fs.lstatSync(filePath).isFile()) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
        if (line.includes('function ti') || line.includes('function ii')) {
            console.log(`${path.basename(filePath)} Line ${idx + 1}: ${line.trim()}`);
        }
    });
});
