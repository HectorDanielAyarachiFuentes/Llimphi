const fs = require('fs');
let c = fs.readFileSync('yellow-pencil.js', 'utf8');

c = c.replace(/tn = o\(document\.body\),\\n                _setYpElements = \(function\(\) \{\\n                    if \(window\.YP && window\.YP\.elements\) \{\\n                        window\.YP\.elements\.Gi = Gi;\\n                        window\.YP\.elements\.Ki = Ki;\\n                        window\.YP\.elements\.Ji = Ji;\\n                        window\.YP\.elements\.Qi = Qi;\\n                        window\.YP\.elements\.tn = tn;\\n                    \}\\n                \}\)\(\),/g, 
`tn = o(document.body),
                _setYpElements = (function() {
                    if (window.YP && window.YP.elements) {
                        window.YP.elements.Gi = Gi;
                        window.YP.elements.Ki = Ki;
                        window.YP.elements.Ji = Ji;
                        window.YP.elements.Qi = Qi;
                        window.YP.elements.tn = tn;
                    }
                })(),`);

fs.writeFileSync('yellow-pencil.js', c);
console.log('Fixed literal newlines for tn injection');
