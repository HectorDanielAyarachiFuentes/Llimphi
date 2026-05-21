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

const inject = `
function getGi() { return window.YP && window.YP.elements ? window.YP.elements.Gi : null; }
function getKi() { return window.YP && window.YP.elements ? window.YP.elements.Ki : null; }
function getJi() { return window.YP && window.YP.elements ? window.YP.elements.Ji : null; }
function getQi() { return window.YP && window.YP.elements ? window.YP.elements.Qi : null; }
function getTn() { return window.YP && window.YP.elements ? window.YP.elements.tn : null; }
function getOn() { return window.YP && window.YP.elements ? window.YP.elements.On : null; }
function setOn(v) { if (window.YP && window.YP.elements) window.YP.elements.On = v; }
`;

files.forEach(f => {
    let c = fs.readFileSync('modules/' + f, 'utf8');
    
    // Only patch if not already patched
    if (!c.includes('function getGi()')) {
        c = c.replace('"use strict";', '"use strict";\n\n' + inject);
        c = c.replace(/\bGi\b/g, 'getGi()')
             .replace(/\bKi\b/g, 'getKi()')
             .replace(/\bJi\b/g, 'getJi()')
             .replace(/\bQi\b/g, 'getQi()')
             .replace(/\btn\b/g, 'getTn()')
             .replace(/On\s*=\s*([^,;)]+)/g, 'setOn($1)')
             .replace(/\bOn\b/g, 'getOn()')
             .replace(/getget/g, 'get'); // Fix any accidental double replacements if re-run
        
        fs.writeFileSync('modules/' + f, c);
        console.log('Patched', f);
    } else {
        console.log('Already patched', f);
    }
});
