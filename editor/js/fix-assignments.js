const fs = require('fs');

const files = [
    'yp-css-storage.js', 
    'yp-element-select.js', 
    'yp-info-panel.js', 
    'yp-save.js', 
    'yp-selector.js'
];

files.forEach(f => {
    let c = fs.readFileSync('modules/' + f, 'utf8');
    c = c.replace(/var\s+get([A-Za-z]+)\(\)\s*=/g, 'var $1 =');
    c = c.replace(/get([A-Za-z]+)\(\)\s*=\s*/g, '$1 = ');
    
    // Also yp-css-property-ui.js had a weird error: "Invalid or unexpected token"
    // Let's fix that one too manually
    
    fs.writeFileSync('modules/' + f, c);
    console.log('Fixed parens and assignments in', f);
});

// Fix yp-css-property-ui.js
try {
    let prop = fs.readFileSync('modules/yp-css-property-ui.js', 'utf8');
    // Maybe the unexpected token is also a getGi() = ?
    prop = prop.replace(/var\s+get([A-Za-z]+)\(\)\s*=/g, 'var $1 =');
    prop = prop.replace(/get([A-Za-z]+)\(\)\s*=\s*/g, '$1 = ');
    prop = prop.replace(/function\s+get([A-Za-z]+)\(\)\(\)/g, 'function get$1()');
    fs.writeFileSync('modules/yp-css-property-ui.js', prop);
    console.log('Fixed yp-css-property-ui.js');
} catch(e) {}
