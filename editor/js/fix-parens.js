const fs = require('fs');

const files = [
    'yp-animation.js', 
    'yp-css-storage.js', 
    'yp-element-select.js', 
    'yp-events.js', 
    'yp-info-panel.js', 
    'yp-save.js', 
    'yp-selector.js', 
    'yp-ui-utils.js'
];

files.forEach(f => {
    let c = fs.readFileSync('modules/' + f, 'utf8');
    c = c.replace(/function\s+get([A-Za-z]+)\(\)\(\)/g, 'function get$1()');
    fs.writeFileSync('modules/' + f, c);
    console.log('Fixed parens in', f);
});
