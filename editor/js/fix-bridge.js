const fs = require('fs');

let c = fs.readFileSync('yellow-pencil.js', 'utf8');

let startIndex = c.indexOf('// ── Module bridge ─────────────────────────────────────────────────────────');
let endIndex = c.indexOf('ca = _YP.ca;');
if (startIndex !== -1 && endIndex !== -1) {
    let before = c.substring(0, startIndex);
    let after = c.substring(endIndex + 12);
    
    let replacement = `// ── Module bridge ─────────────────────────────────────────────────────────
        // All functions below are implemented in editor/js/modules/.
        // These var assignments run before any function call in this IIFE,
        // overriding the (now dead) function declarations of the same name below.
        window.YP.elements = window.YP.elements || {};
        window.YP.applyCompat();
        var _YP = window.YP._compat;

        // yp-state.js
        var e  = _YP.e,  t  = _YP.t,  C  = _YP.C,  z  = _YP.z,  O  = _YP.O,
            D  = _YP.D,  A  = _YP.A,  S  = _YP.S,  T  = _YP.T,  E  = _YP.E,
            _  = _YP._,  K  = _YP.K,  J  = _YP.J;

        // yp-ui-utils.js
        var k  = _YP.k,  R  = _YP.R,  I  = _YP.I,  P  = _YP.P,  w  = _YP.w,
            Li = _YP.Li, Bi = _YP.Bi, v  = _YP.v,  L  = _YP.L,  mi = _YP.mi,
            g  = _YP.g,  h  = _YP.h;

        // yp-css-storage.js
        var a  = _YP.a,  r  = _YP.r,  l  = _YP.l,  V  = _YP.V;

        // yp-css-parser.js
        var d  = _YP.d,  p  = _YP.p,  c  = _YP.c,  u  = _YP.u,  m  = _YP.m,
            f  = _YP.f,  gi = _YP.gi;

        // yp-selector.js
        var ya = _YP.ya, wa = _YP.wa, ua = _YP.ua, ma = _YP.ma, fa = _YP.fa,
            hi = _YP.hi, xi = _YP.xi, Ca = _YP.Ca, Da = _YP.Da, Hi = _YP.Hi,
            _i = _YP._i, _a = _YP._a;

        // yp-responsive.js
        var Y  = _YP.Y,  N  = _YP.N,  X  = _YP.X,  ei = _YP.ei;

        // yp-save.js
        var ba = _YP.ba, xa = _YP.xa, ka = _YP.ka, za = _YP.za, Oa = _YP.Oa,
            Sa = _YP.Sa, Ta = _YP.Ta, Ea = _YP.Ea, La = _YP.La, Ba = _YP.Ba;

        // yp-info-panel.js
        // (Some variables overlap, but we explicitly re-assign them to maintain safety)
        var _a = _YP._a, Ca = _YP.Ca, Da = _YP.Da;

        // yp-animation.js
        var H  = _YP.H,  F  = _YP.F,  j  = _YP.j,  Vt = _YP.Vt, Ut = _YP.Ut, yi = _YP.yi;

        // yp-element-select.js
        var Q  = _YP.Q,  ee = _YP.ee, bi = _YP.bi, vi = _YP.vi, da = _YP.da,
            At = _YP.At, Di = _YP.Di;

        // yp-events.js
        var He = _YP.He, We = _YP.We;

        // yp-css-property-ui.js
        var Ke = _YP.Ke, Je = _YP.Je, Qe = _YP.Qe, et = _YP.et, tt = _YP.tt,
            at = _YP.at, it = _YP.it, nt = _YP.nt, st = _YP.st, ot = _YP.ot,
            rt = _YP.rt, lt = _YP.lt, dt = _YP.dt, pt = _YP.pt, ct = _YP.ct,
            ut = _YP.ut, mt = _YP.mt, ft = _YP.ft, gt = _YP.gt, ht = _YP.ht,
            yt = _YP.yt, wt = _YP.wt, vt = _YP.vt, bt = _YP.bt, xt = _YP.xt,
            _t = _YP._t, kt = _YP.kt, Ct = _YP.Ct, zt = _YP.zt, Ot = _YP.Ot,
            Dt = _YP.Dt, St = _YP.St, Tt = _YP.Tt, Et = _YP.Et, qt = _YP.qt,
            $t = _YP.$t, Gt = _YP.Gt, Kt = _YP.Kt, Jt = _YP.Jt, Qt = _YP.Qt,
            ea = _YP.ea, ta = _YP.ta, aa = _YP.aa, ia = _YP.ia, na = _YP.na,
            sa = _YP.sa, oa = _YP.oa, ra = _YP.ra, la = _YP.la, pa = _YP.pa,
            ca = _YP.ca;`;

    fs.writeFileSync('yellow-pencil.js', before + replacement + after);
    console.log('Fixed literal newlines');
} else {
    console.log('Could not find start or end index');
}
