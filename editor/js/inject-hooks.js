const fs=require('fs');
let c=fs.readFileSync('yellow-pencil.js','utf8');
const hookCode = `
window.YP_refreshPropertyPanel = typeof Be !== 'undefined' ? Be : window.YP_refreshPropertyPanel;
window.YP_refreshCSSEditor = typeof _e !== 'undefined' ? _e : window.YP_refreshCSSEditor;
window.YP_scrollPanelToSelector = typeof Ae !== 'undefined' ? Ae : window.YP_scrollPanelToSelector;
window.YP_updateBreadcrumb = typeof Ze !== 'undefined' ? Ze : window.YP_updateBreadcrumb;
`;
const target = '})(jQuery);';
const i = c.lastIndexOf(target);
if(i > -1) {
    c = c.substring(0, i) + hookCode + target;
    fs.writeFileSync('yellow-pencil.js', c);
    console.log('Successfully injected hooks');
} else {
    console.log('target not found');
}
