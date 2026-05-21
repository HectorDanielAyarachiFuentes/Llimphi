const fs = require('fs');
const c = fs.readFileSync('yp-css-property-ui-raw.js', 'utf8');

let out = `(function(o) {
"use strict";

var YP = window.YP = window.YP || {};

function getGi() { return YP.elements ? YP.elements.Gi : null; }
function getKi() { return YP.elements ? YP.elements.Ki : null; }
function getJi() { return YP.elements ? YP.elements.Ji : null; }
function getQi() { return YP.elements ? YP.elements.Qi : null; }
function getTn() { return YP.elements ? YP.elements.tn : null; }
function getOn() { return YP.elements ? YP.elements.On : null; }
function setOn(v) { if (YP.elements) YP.elements.On = v; }

var _YP = YP._compat;
var K = _YP.K, J = _YP.J, C = _YP.C, z = _YP.z, O = _YP.O, D = _YP.D, A = _YP.A, S = _YP.S, T = _YP.T, E = _YP.E, _ = _YP._;
var e = _YP.e, t = _YP.t, k = _YP.k, R = _YP.R, I = _YP.I, P = _YP.P, w = _YP.w, Li = _YP.Li, Bi = _YP.Bi, v = _YP.v, L = _YP.L, mi = _YP.mi, g = _YP.g, h = _YP.h;
var a = _YP.a, r = _YP.r, l = _YP.l, V = _YP.V, d = _YP.d, p = _YP.p, c_fn = _YP.c, u = _YP.u, m = _YP.m, f = _YP.f, gi = _YP.gi;
var ya = _YP.ya, wa = _YP.wa, ua = _YP.ua, ma = _YP.ma, fa = _YP.fa, hi = _YP.hi, xi = _YP.xi, Ca = _YP.Ca, Da = _YP.Da, Hi = _YP.Hi, _i = _YP._i, _a = _YP._a;
var Y = _YP.Y, N = _YP.N, X = _YP.X, ei = _YP.ei;
var ba = _YP.ba, xa = _YP.xa, ka = _YP.ka, za = _YP.za, Oa = _YP.Oa, Sa = _YP.Sa, Ta = _YP.Ta, Ea = _YP.Ea, La = _YP.La, Ba = _YP.Ba;
var H = _YP.H, F = _YP.F, j = _YP.j, Vt = _YP.Vt, Ut = _YP.Ut, yi = _YP.yi;
var Q = _YP.Q, ee = _YP.ee, bi = _YP.bi, vi = _YP.vi, da = _YP.da, At = _YP.At, Di = _YP.Di;
var He = _YP.He, We = _YP.We, Pe = _YP.Pe, Re = _YP.Re, Fe = _YP.Fe, je = _YP.je;

`;

// Replace globals safely
let processedC = c.replace(/\bGi\b/g, 'getGi()')
                  .replace(/\bKi\b/g, 'getKi()')
                  .replace(/\bJi\b/g, 'getJi()')
                  .replace(/\bQi\b/g, 'getQi()')
                  .replace(/\btn\b/g, 'getTn()')
                  .replace(/On\s*=\s*([^,;)]+)/g, 'setOn($1)')
                  .replace(/\bOn\b/g, 'getOn()')
                  .replace(/\bc\(/g, 'c_fn(');

out += processedC;

out += `

YP.cssPropertyUI = {
`;

const EXTRACT = ['Ke', 'Je', 'Qe', 'et', 'tt', 'at', 'it', 'nt', 'st', 'ot', 'rt', 'lt', 'dt', 'pt', 'ct', 'ut', 'mt', 'ft', 'gt', 'ht', 'yt', 'wt', 'vt', 'bt', 'xt', '_t', 'kt', 'Ct', 'zt', 'Ot', 'Dt', 'St', 'Tt', 'Et', 'qt', '$t', 'Gt', 'Kt', 'Jt', 'Qt', 'ea', 'ta', 'aa', 'ia', 'na', 'sa', 'oa', 'ra', 'la', 'pa', 'ca'];
EXTRACT.forEach(fn => {
    out += '  '+fn+': '+fn+',\n';
});
out += `};

// Export to compat
Object.assign(YP._compat, YP.cssPropertyUI);

})(jQuery);`;

fs.writeFileSync('modules/yp-css-property-ui.js', out);
