const fs=require('fs');
let c=fs.readFileSync('modules/yp-css-property-ui.js','utf8');
c=c.replace(/}\s*}\s*YP\.cssPropertyUI = {/g, '}\n\nYP.cssPropertyUI = {');
fs.writeFileSync('modules/yp-css-property-ui.js', c);
console.log('Fixed for real');
