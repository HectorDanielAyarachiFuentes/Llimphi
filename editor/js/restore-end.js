const fs=require('fs');
let c=fs.readFileSync('modules/yp-css-property-ui.js','utf8');
const i=c.indexOf('function va(e) {');
if(i>-1){
    c=c.substring(0,i)+`function va(e) {
            if (!1 === e || "" == e) return !1;
            var t = e.sort(function(e, t) {
                return getJi().find("." + e).length - getJi().find("." + t).length
            });
            return 1 == getJi().find("." + t[0]).length && "." + t[0]
        }
    }

YP.cssPropertyUI = {
  Ke: Ke,
  Je: Je,
  Qe: Qe,
  et: et,
  tt: tt,
  at: at,
  it: it,
  nt: nt,
  st: st,
  ot: ot,
  rt: rt,
  lt: lt,
  dt: dt,
  pt: pt,
  ct: ct,
  ut: ut,
  mt: mt,
  ft: ft,
  gt: gt,
  ht: ht,
  yt: yt,
  wt: wt,
  vt: vt,
  bt: bt,
  xt: xt,
  _t: _t,
  kt: kt,
  Ct: Ct,
  zt: zt,
  Ot: Ot,
  Dt: Dt,
  St: St,
  Tt: Tt,
  Et: Et,
  qt: qt,
  $t: $t,
  Gt: Gt,
  Kt: Kt,
  Jt: Jt,
  Qt: Qt,
  ea: ea,
  ta: ta,
  aa: aa,
  ia: ia,
  na: na,
  sa: sa,
  oa: oa,
  ra: ra,
  la: la,
  pa: pa,
  ca: ca,
};

Object.assign(YP._compat, YP.cssPropertyUI);

})(jQuery);`;
    fs.writeFileSync('modules/yp-css-property-ui.js', c);
    console.log('Restored');
}
