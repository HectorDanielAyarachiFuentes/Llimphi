(function(o) {
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

function Ke() {
                o(".type-has-change").removeClass("type-has-change")
        }

function Je(e) {
                /^margin-(top|right|bottom|left)/gi.test(e) ? o("#spacing-type-margin").addClass("type-has-change") :
                        /^padding-(top|right|bottom|left)/gi.test(e) ? o("#spacing-type-padding").addClass("type-has-change") :
                        /^(animation-name|animation-duration|animation-delay|animation-timing-function|animation-fill-mode)/gi.test(e) ? o(
                                "#motion-type-animation").addClass("type-has-change") :
                        /^(transition-property|transition-duration|transition-timing-function)/gi.test(e) ? o("#motion-type-transition").addClass(
                                "type-has-change") : /^border-top-(width|color|style)/gi.test(e) ? o("#border-type-top").addClass("type-has-change") :
                        /^border-right-(width|color|style)/gi.test(e) ? o("#border-type-right").addClass("type-has-change") :
                        /^border-bottom-(width|color|style)/gi.test(e) ? o("#border-type-bottom").addClass("type-has-change") :
                        /^border-left-(width|color|style)/gi.test(e) ? o("#border-type-left").addClass("type-has-change") :
                        /^border-(width|color|style)/gi.test(e) ? o("#border-type-all").addClass("type-has-change") :
                        /^(translate-x-transform|translate-y-transform)$/gi.test(e) ? o("#transform-type-move").addClass("type-has-change") :
                        /^(rotatex-transform|rotatey-transform|rotatez-transform)$/gi.test(e) ? o("#transform-type-rotate").addClass(
                        "type-has-change") : /^(skew-x-transform|skew-y-transform)$/gi.test(e) ? o("#transform-type-skew").addClass("type-has-change") :
                        /^(scale-transform|perspective)$/gi.test(e) ? o("#transform-type-extra").addClass("type-has-change") :
                        /^(blur-filter|grayscale-filter|invert-filter|sepia-filter)$/gi.test(e) ? o("#filter-type-color-effects").addClass(
                                "type-has-change") : /^(brightness-filter|contrast-filter|hue-rotate-filter|saturate-filter)$/gi.test(e) ? o(
                                "#filter-type-color-adjustment").addClass("type-has-change") :
                        /^(background-color|background-image|background-size|background-blend-mode|background-attachment|background-position-x|background-position-y|background-repeat|background-clip)$/gi
                        .test(e) ? o("#background-type-background").addClass("type-has-change") :
                        /^(blur-backdrop-filter|grayscale-backdrop-filter|invert-backdrop-filter|sepia-backdrop-filter|brightness-backdrop-filter|contrast-backdrop-filter|hue-rotate-backdrop-filter|saturate-backdrop-filter)$/gi
                        .test(e) && o("#background-type-filter").addClass("type-has-change")
        }

function Qe(e) {
                var t = o("#wyp-customizing-type-frame"),
                        a = E(),
                        i = t.attr("data-page-id"),
                        n = t.attr("data-page-type"),
                        s = t.attr("data-page-href"),
                        r = t.attr("data-page-visitor");
                r = "true" == r || !0 == r ? "&wyp_out=true" : "";
                var l = t.attr("data-src") + "&wyp_page_href=" + s + "&wyp_page_id=" + i + "&wyp_page_type=" + n + "&wyp_mode=" + a + r;
                if (!1 == e && l == t.attr("src")) return !1;
                var d = o("<div />").append(o("#wyp-customizing-type-frame").clone().attr("src", l)).html();
                t.remove(), o("#iframe").after(d)
        }

function et(e) {
                var t = e.toString().match(/(\(|\)|\"|\')/gi);
                return null === t || 1 != Math.abs(t.length % 2)
        }

function tt(s, l, d, f, y, w, v) {
                if (false) {
                        if (150 < (parseInt(e()?.initial_style_counts) || 0) + (parseInt(e()?.local_counts) || 0)) return o(
                                        ".wyp-info-modal .wyp-info-modal-top-inner h2").text("Consider Upgrading to the Professional Plan"), o(
                                        ".wyp-info-modal .wyp-info-modal-top-inner p").text(
                                        "A pro plan required for editing over 150 styles per month. Save time with a professional plan."), o(
                                        ".wyp-info-modal .wyp-buy-link").attr("href",
                                        "https://visualcsseditor.com/?utm_source=chrome-editor&utm_medium=wordpress-based-upgrade&utm_campaign=chrome-upgrade"
                                        ), o(".wyp-info-modal .wyp-buy-link").text("See Pricing"), o(".wyp-info-modal .wyp-info-modal-close")
                                .text("Maybe Later"), o(".wyp-info-modal .wyp-info-unlock-p").attr("style", "visibility:hidden;"), o(
                                        ".wyp-info-modal .wyp-info-last-note").text("Get unlimited usage and premium customer support today."),
                                o(".wyp-info-modal .activate-pro").attr("href", "https://visualcsseditor.com/sign-in"), o(
                                        ".wyp-info-modal,.wyp-popup-background").fadeIn("fast"), !1;
                        t("local_counts", (parseInt(e()?.local_counts) || 0) + 1)
                }
                "justify-content1" == l && (l = "justify-content"), null == w && (w = E()), null === s && (s = _a());
                var b = _();
                y = je(y, l, d), f = ca(l, f), ".s" == f && (f = "s"), -1 != f.indexOf("px") && (f = "px");
                var x = l;
                if (_t(l, !1), getGi().find(".wyp-live-css").remove(), J(d) && 0 !== d) return !1;
                if (!et(d)) return !1;
                if ("animation-name" == l && (d = d.replace(/,\s*$/, "")), l = l.toString().toLowerCase(), x = x.toString().toLowerCase(), f = f
                        .toString().toLowerCase(), 0 < d.length) {
                        /\.00$/.test(d) && (d = d.replace(/\.00$/g, "")), /\.0$/.test(d) && (d = d.replace(/\.0$/g, ""))
                }
                var k = g(l);
                if ("font-family" != k && "background-image" != k && "list-style-image" != k && "animation-name" != k && "animation-play" != l &&
                        "filter" != k && "transform" != k && "backdrop-filter" != k && (d = d.toString().toLowerCase()), "nan" == d || "NaN" == d)
                        return !1;
                if (s = at(s, l), "height" == l || "width" == l) {
                        var z = mi(o("#min-" + l + "-value").val()),
                                O = o("#min-" + l + "-after").val();
                        parseFloat(d) < parseFloat(z) && f == O && (tt(s, "min-" + l, d, f, y, w, v), setTimeout(function() {
                                var e = _a();
                                o.each(["min-" + l], function(t, a) {
                                        pa(a, e)
                                })
                        }, 50))
                }
                if (!0 === S() && -1 != l.indexOf("animation")) return !1;
                if ("disable" != d && "a" != d && !0 == window.ypOption.append_auto_comments && Ci(s, null), "font-family" == l && "disable" == d && tt(
                                null, "--google-webfont", "disable"), C() && ("background-clip" == l && "text" == d && (window.lastTextColor = da(
                                        "color", b), tt(s, "color", "transparent", "", y, w, v)), "background-clip" == l && "text" != d && null !=
                                window.lastTextColor)) {
                        var D = da("color", b);
                        ("transparent" == D || "rgba(0, 0, 0, 0)" == D || "rgba(0,0,0,0)" == D) && tt(s, "color", window.lastTextColor, "", y, w, v)
                }
                if ("background-clip" == l && "text" != d && null == window.lastTextColor && tt(s, "color", "disable", "", y, w, v), "display" == l && (
                                getTn().removeClass("wyp-flex-container wyp-grid-element"), ("flex" == d || "inline-flex" == d) && getTn().addClass(
                                        "wyp-flex-container"), ("grid" == d || "inline-grid" == d) && getTn().addClass("wyp-grid-element"), setTimeout(
                                        function() {
                                                o.throttle(Be(), 32)
                                        }, window.YellowDelay)), "border-width" == l) {
                        var L = _a();
                        o.each(["border-top-width", "border-left-width", "border-right-width", "border-bottom-width"], function(e, t) {
                                pa(t, L)
                        })
                }
                if ("border-color" == l) {
                        var L = _a();
                        o.each(["border-top-color", "border-left-color", "border-right-color", "border-bottom-color"], function(e, t) {
                                pa(t, L)
                        })
                }
                if ("border-style" == l) {
                        var L = _a();
                        o.each(["border-top-style", "border-left-style", "border-right-style", "border-bottom-style"], function(e, t) {
                                pa(t, L)
                        })
                } - 1 != l.indexOf("border-") && -1 != l.indexOf("-style") && "border-style" != l && pa("border-style"), -1 != l.indexOf("border-") && -
                        1 != l.indexOf("-color") && "border-color" != l && pa("border-color"), -1 != l.indexOf("border-") && -1 != l.indexOf(
                        "-width") && "border-width" != l && pa("border-width");
                var B, M, Z;
                if ("animation-name" == l && !1 === T()) {
                        var P = 1;
                        if (("none" == d || "disable" == d) && (P = 0), -1 != d.indexOf(",") && (P = d.split(",").length), ("disable" == d || "none" ==
                                        d) && o(".anim-player-icon").removeClass("icon-controls-pause").addClass("icon-controls-play"), "none" != d &&
                                "disable" != d && o(".anim-player-icon").removeClass("icon-controls-play").addClass("icon-controls-pause"), C()) {
                                var R = b.css("animation-duration"),
                                        I = R.split(","),
                                        Y = 1;
                                if (-1 != R.indexOf(",") && (Y = I.length), Y != P) {
                                        for (R = [], Z = 0; Z < P; Z++) I[Z] && "0s" !== I[Z] ? R.push(I[Z]) : R.push("1s");
                                        R = R.toString().replace(/\s+/g, ""), 1 >= P && o("#animation-duration-group").removeClass("hidden-option"), tt(
                                                null, "animation-duration", R, "", y, w, v)
                                }
                        }
                        if (C()) {
                                var N = b.css("animation-delay"),
                                        H = N.split(","),
                                        W = 1;
                                if (-1 != N.indexOf(",") && (W = H.length), W != P) {
                                        for (N = [], Z = 0; Z < P; Z++) N[Z] ? N.push(H[Z]) : N.push(Z + "s");
                                        N = N.toString().replace(/\s+/g, ""), 1 >= P && o("#animation-delay-group").removeClass("hidden-option"), tt(
                                                null, "animation-delay", N, "", y, w, v)
                                }
                        }
                }
                if (("animation-name" == l || "animation-play" == l || "animation-duration" == l) && !1 === T() && "none" != d && "disable" != d &&
                C()) {
                        B = b.css("animation-duration"), M = b.css("animation-delay");
                        var F = ft(B, M);
                        M = !1 === F ? J(M) ? 0 : parseFloat(Wt(M)) : parseFloat(F), B = J(B) ? 1e3 : parseFloat(Wt(B));
                        var j = M + B;
                        0 === j && (j = 1e3), j += 100, window.ypData["wyp-force-hide-select-ui"] = !0, getJi().addClass("wyp-hid-bor-n"), Yi(), window
                                .animationTimer1 = setTimeout(function() {
                                        window.ypData["wyp-force-hide-select-ui"] = void 0, getJi().removeClass("wyp-hid-bor-n"), Ni(), Ze(), !1 ==
                                                window.ypData["wyp-if-movleav"] && setTimeout(function() {
                                                        We(200)
                                                }, 300), o(".anim-player-icon").removeClass("icon-controls-pause").addClass(
                                                        "icon-controls-play")
                                }, j)
                }
                if (("list-style-image" == l || "background-image" == l) && "disable" != d && "none" != d && (-1 == d.indexOf("gradient(") &&
                                "inherit" != d && "initial" != d && (d = d.replace(/(\"|\'|url\(|\))/gi, "")), "" == d ? d = "disable" : -1 == d
                                .indexOf("gradient(") && "inherit" != d && "initial" != d && (d = "url(\"" + d + "\")")), ("top" == l || "bottom" ==
                                l || "left" == l || "right" == l) && "disable" != d && C()) {
                        var X = da("position", b);
                        "static" == X && (tt(s, "position", "relative", "", y, w, v), pa("position"))
                }
                var V = Pe(y),
                        U = Re(y),
                        q = null,
                        $ = qt(l)[1],
                        G, K;
                if (null == $ || "backdrop" == $) {
                        G = a(w, !1);
                        var Q;
                        if (null == v && (v = c_fn(G, "[selector=" + gi(s) + "][rule=" + l + "][msize=" + y + "]")), "a" != l && (Q = p(G,
                                        "[selector=YPtoAddBreakpoint][msize=" + y + "]"), 0 < Q.length && r(u(G,
                                        "[selector=YPtoAddBreakpoint][msize=" + y + "]"), w, x)), Q = p(G, "[selector=" + gi(s) + "][rule=" + l +
                                        "][msize=" + y + "]"), 0 < Q.length) {
                                if (Vt(Q[0]) == d || Vt(Q[0]) == d + f) return !1;
                                r(u(G, "[selector=" + gi(s) + "][rule=" + l + "][msize=" + y + "]"), w, x)
                        }
                        if (q = c_fn(G, "[selector=" + gi(s) + "][rule=" + h(l) + "][msize=" + y + "]"), null != q && (v = q + 1), Q = p(G, "[selector=" +
                                        gi(s) + "][rule=" + h(l) + "][msize=" + y + "]"), 0 < Q.length) {
                                if (Vt(Q[0]) == d || Vt(Q[0]) == d + f) return !1;
                                r(u(G, "[selector=" + gi(s) + "][rule=" + h(l) + "][msize=" + y + "]"), w)
                        }
                        G = a(w, !1);
                        var ee = p(G, "[rule=" + l + "][msize=" + y + "]"),
                                te, ae;
                        for (Z = 0; Z < ee.length; Z++)
                                if (te = ee[Z], ae = Ut(te), Ge(s, ae)) {
                                        r(u(G, "[selector=" + gi(ae) + "][rule=" + l + "][msize=" + y + "]"), w, x);
                                        break
                                } for (ee = p(G, "[rule=" + h(l) + "][msize=" + y + "]"), Z = 0; Z < ee.length; Z++)
                                if (te = ee[Z], ae = Ut(te), Ge(s, ae)) {
                                        r(u(G, "[selector=" + gi(ae) + "][rule=" + h(l) + "][msize=" + y + "]"), w);
                                        break
                                } if (S() && (Q = getGi().find("#wyp-anim-scenes #" + getTn().attr("data-anim-scene") + " .scenes-" + gi(l) + "-style"), 0 < Q
                                        .length)) {
                                if (Vt(Q.text()) == d || Vt(Q.text()) == d + f) return !1;
                                var ie = parseInt(getTn().attr("data-anim-scene").replace(/scene-/g, "")) + 1;
                                for (Q.remove(), K = ie; 7 > K; K++)(0 == o(".anim-bar .scenes .scene-" + K).length || !0 == o(
                                        ".anim-bar .scenes .scene-" + K).hasClass("scene-no-click-yet")) && getGi().find("#wyp-anim-scenes #scene-" +
                                        K + " .scenes-" + gi(l) + "-style").remove()
                        }
                }
                if ("--google-webfont" == l && "no-include" != d) return !1;
                if ("disable" != d && "" != d && "undefined" != d && null !== d && -1 != window.webkitArray.indexOf(l) && tt(s, "-webkit-" + l, d, f, y,
                                w, q), ("flex-grow" == k || "flex-shrink" == k || "opacity" == k || "blur-filter" == k || "grayscale-filter" == k ||
                                "invert-filter" == k || "brightness-filter" == k || "z-index" == k || "column-count" == k || "contrast-filter" == k ||
                                "hue-rotate-filter" == k || "saturate-filter" == k || "sepia-filter" == k || -1 != k.indexOf("-transform") ||
                                "blur-backdrop-filter" == k || "grayscale-backdrop-filter" == k || "invert-backdrop-filter" == k ||
                                "sepia-backdrop-filter" == k || "brightness-backdrop-filter" == k || "contrast-backdrop-filter" == k ||
                                "hue-rotate-backdrop-filter" == k || "saturate-backdrop-filter" == k) && "text-transform" != k && ("disable" != d && (
                                d = mi(d)), f = ""), "blur-filter" == l || "grayscale-filter" == l || "invert-filter" == l || "brightness-filter" ==
                        l || "contrast-filter" == l || "hue-rotate-filter" == l || "saturate-filter" == l || "sepia-filter" == l) {
                        var ne = vt(l, d);
                        return tt(s, "filter", ne, "", y, w, v), !1
                }
                if ("blur-backdrop-filter" == l || "grayscale-backdrop-filter" == l || "invert-backdrop-filter" == l || "sepia-backdrop-filter" == l ||
                        "brightness-backdrop-filter" == l || "contrast-backdrop-filter" == l || "hue-rotate-backdrop-filter" == l ||
                        "saturate-backdrop-filter" == l) {
                        var se = bt(l, d);
                        return tt(s, "backdrop-filter", se, "", y, w, v), !1
                }
                if (-1 != k.indexOf("-transform") && "text-transform" != k) {
                        var oe = wt(l, d);
                        return tt(s, "transform", oe, "", y, w, v), !1
                }
                if ("border-type" == l || "background-type" == l || "spacing-type" == l || "transform-type" == l || "filter-type" == l ||
                        "motion-type" == l) return !1;
                if ("box-shadow-inset" == l || "box-shadow-color" == l || "box-shadow-vertical" == l || "box-shadow-blur-radius" == l ||
                        "box-shadow-spread" == l || "box-shadow-horizontal" == l) {
                        var re = xt(s, l, d);
                        return tt(s, "box-shadow", re, "", y, w, v), !1
                }
                if ("animation-play" == l) {
                        "yp_onscreen" == d || "yp-onscreen" == d ? o("#--animation-trigger-repeat-group").addClass("hidden-option") : o(
                                "#--animation-trigger-repeat-group").removeClass("hidden-option"), G = a(w, !1);
                        var le = p(G, "[msize=" + y + "]"),
                                de = s.replace(/(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)click|yp(-|_)focus)/g, ""),
                                pe, ce;
                        for (Z = 0; Z < le.length; Z++) pe = /\[selector\=(.*?)\]/g.exec(le[Z])[1], ce = Ut(le[Z]), pe == gi(de + ".yp_onscreen") && (
                                G = u(G, "[selector=" + gi(ce) + "][msize=" + y + "]")), pe == gi(de + ".yp_hover") && (G = u(G, "[selector=" +
                                gi(ce) + "][msize=" + y + "]")), pe == gi(de + ".yp_click") && (G = u(G, "[selector=" + gi(ce) + "][msize=" +
                                y + "]")), pe == gi(de + ".yp_focus") && (G = u(G, "[selector=" + gi(ce) + "][msize=" + y + "]"));
                        return r(G, w), "none" != o("#wyp-animation-name").val() && tt(s, "animation-name", o("#wyp-animation-name").val(), f, y, w, v),
                                !1
                }
                if ("animation-name" == l && $e(s, l, d, f, y, w), "disable" == d || "" == d || "undefined" == d || null === d) return !1;
                var ue = d + f;
                if (ue = ue.replace(/\s+?!important/g, "").replace(/\;$/g, ""), "" != gi(s)) {
                        if (!0 === S() && "position" != l) {
                                getGi().find("#wyp-anim-scenes #" + gi(getQi().attr("data-anim-scene") + x)).remove(), getGi().find("#wyp-anim-scenes #" + getQi().attr(
                                        "data-anim-scene") + "").append("<style data-rule=\"" + x + "\" class=\"style-" + getQi().attr(
                                        "data-anim-scene") + " scenes-" + gi(x) + "-style\">" + s + "{" + x + ":" + ue + "}</style>");
                                var me = 0,
                                        fe, ge;
                                for (K = parseInt(getQi().attr("data-anim-scene").replace("scene-", "")) + 1; 6 >= K; K++) me = "scene-" + K, fe = getGi().find(
                                        "#wyp-anim-scenes #" + me + " .scenes-" + gi(x) + "-style"), (0 == fe.length || fe.hasClass(
                                        "dynamic-generated-scene")) && (ge = s.replace(/body\.wyp-scene-[0-9]]/g, "body.wyp-scene-" + K), getGi()
                                        .find("#wyp-anim-scenes #" + me + " style[data-rule='" + x + "']").remove(), getGi().find(
                                                "#wyp-anim-scenes #" + me + "").append("<style data-rule=\"" + x +
                                                "\" class=\"dynamic-generated-scene style-" + me + " scenes-" + gi(x) + "-style\">" + ge + "{" +
                                                x + ":" + ue + "}</style>"))
                        } else r(m(a(w, !1), V + s + "{" + x + ":" + ue + "}" + U, v), w, x);
                        Ze()
                }
                if (null != window.lastEditID && (A() && "desktop" != y && (o("#" + window.lastEditID + "-group").addClass("reset-enable"), Je(window
                                        .lastEditID)), !1 == A() && "desktop" == y && (o("#" + window.lastEditID + "-group").addClass("reset-enable"),
                                        Je(window.lastEditID)), -1 == window.lastEditID.indexOf("box-shadow") && o("#" + window.lastEditID + "-group")
                                .parents("li").find("h3").addClass("wyp-group-edited"), window.lastEditID = null), S()) return !1;
                if (window.ypData["wyp-animate-manager-mode"]) return !1;
                if ("a" == l) return !1;
                if ("--google-webfont" == l || "--animation-trigger-repeat" == l) return !1;
                if (getJi().hasClass("wyp-wf-on") && C() && ($ = qt(x)[0], ("color" == x || "background-color" == x || "background-image" == x ||
                                "box-shadow" == $ || "border-color" == x || "text-shadow" == x || -1 != $.indexOf("-radius") || "filter" == $ ||
                                "backdrop-filter" == $) && b.addClass("wyp-no-wf")), window.editedByReview) return !1;
                if (-1 == l.indexOf("-webkit-") && -1 == l.indexOf("-moz-") && -1 == l.indexOf("-o-")) {
                        var he = nt(null, x, ue);
                        he.always(function(e) {
                                !1 == e && Ie(s, l, d, f, y, w, v)
                        })
                }
        }

function at(e, t) {
                if (!0 === S() && "position" != t ? (e = o.trim(e.replace(/(body)?\.wyp-scene-[0-9]]/g, "")), e = Hi(e, "wyp-" + getQi().attr(
                                "data-anim-scene"))) : e = o.trim(e.replace(/(body)?\.wyp-scene-[0-9]]/g, "")), !1 === getTn().hasClass(
                                "process-by-code-editor") && !1 === T() && ("animation-name" == t || "animation-duration" == t || "animation-delay" ==
                                t)) {
                        var a = e;
                        e = e.replace(/(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)focus|yp(-|_)click)/g, "");
                        var i = "";
                        0 < o("#wyp-animation-play").length && 0 < o("#wyp-animation-play").val().length ? i = "." + o("#wyp-animation-play").val() : !
                                0 == /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)focus|yp(-|_)click)/g.test(a) ? /(\.|\:)yp(-|_)onscreen/g.test(a) ?
                                i = ".yp_onscreen" : /(\.|\:)yp(-|_)hover/g.test(a) ? i = ".yp_hover" : /(\.|\:)yp(-|_)focus/g.test(a) ? i =
                                ".yp_focus" : /(\.|\:)yp(-|_)click/g.test(a) && (i = ".yp_click") : i = ".yp_onscreen";
                        var n = e.split(":");
                        if (0 < n.length) {
                                for (var s = "", r = 0; r < n.length - 1; r++) s += n[r];
                                "hover" == n[n.length - 1] || "focus" == n[n.length - 1] ? e = s + i + ":" + n[n.length - 1] : e += i
                        } else e += i
                }
                var l = getTn().attr("data-wyp-selector");
                if (!1 == J(l) && !1 == /(yp(-|_)onscreen|yp(-|_)click|yp(-|_)focus|yp(-|_)hover)/g.test(e) && "animation-play" != t &&
                        "animation-fill-mode" != t) {
                        e = e.replace(/(body)?\.yp-selector-(.*?)\s+?/g, "");
                        var d = l.replace(":", "");
                        e = Hi(e, "yp-selector-" + d)
                }
                return e
        }

function it(e) {
                var t = "",
                        a, i, n, s;
                if (a = e.get(0), i = window.getComputedStyle(a, null), 0 < i.length)
                        for (s in i) i.hasOwnProperty(s) && (n = i.getPropertyValue(s), n && (t += s + ":" + n + ";"));
                return t.replace(/\"/g, "")
        }

function nt(e, t, a) {
                !1 === /(^)transition(\-|$)/gi.test(t) && getJi().addClass("wyp-imp-chk"), "border-width" == t ? t = "border-top-width" : "border-style" ==
                        t ? t = "border-top-style" : "border-color" == t && (t = "border-top-color");
                var i = _(),
                        n;
                null == e ? (e = ".wyp-selected-others", n = i) : n = getGi().find(e);
                var s = i.attr("style"),
                        r = o("<div id='wyp-fake-test-dom' style='" + it(n) + "" + t + ":" + a.replace(/\"/g, "") +
                                " !important;visibility:hidden !important;position:absolute !important;'></div>");
                n.after(r);
                var l = jQuery.Deferred();
                return setTimeout(function() {
                        !1 === CSS.supports(t, a) && !1 === CSS.supports("-webkit-" + t, a) && (p = !0, getGi().find("#wyp-fake-test-dom")
                                .remove(), getJi().removeClass("wyp-imp-chk"), n.removeClass("wyp-no-wf"), !1 != s && null != s ? n
                                .attr("style", s) : n.removeAttr("style"), l.resolve(p), Li("Something Went Wrong",
                                        "The style is applied, but your browser doesn't support it or the style is not valid.",
                                        "browserSupport"));
                        var i = n.css(t),
                                d = r.css(t),
                                p = !1;
                        if (J(i) && (p = !1, getGi().find("#wyp-fake-test-dom").remove(), getJi().removeClass("wyp-imp-chk"), n.removeClass(
                                                "wyp-no-wf"), !1 != s && null != s ? n.attr("style", s) : n.removeAttr("style"), l
                                        .resolve(p)), i == d && (p = !0), !1 === p && o.trim(a).toLowerCase() == o.trim(i)
                        .toLowerCase() && (p = !0), !p) {
                                var c = a.replace(/(\'|\")/g, ""),
                                        u = i.replace(/(\'|\")/g, "");
                                c = c.replace(/\,\s+/g, ","), u = u.replace(/\,\s+/g, ","), c = c.replace(/(\d+)(\.\d+)/g, function(e) {
                                        return parseFloat(e).toFixed(2)
                                }), u = u.replace(/(\d+)(\.\d+)/g, function(e) {
                                        return parseFloat(e).toFixed(2)
                                }), u == c && (p = !0)
                        }
                        /\d\%/g.test(a) && /(background-image|background-position-(x|y))/g.test(t) && (p = !0), p && getGi().find(e).each(
                                function(e) {
                                        var a = o(this);
                                        /animation-/g.test(t) && a.addClass("yp_onscreen yp_hover yp_click yp_focus");
                                        var n = a.css(t);
                                        return J(n) || 20 < e ? (/animation-/g.test(t) && a.removeClass(
                                                "yp_onscreen yp_hover yp_click yp_focus"), !0) : i == n ? void 0 : (
                                                p = !1, !1)
                                }), getGi().find("#wyp-fake-test-dom").remove(), getJi().removeClass("wyp-imp-chk"), n.removeClass(
                                "wyp-no-wf"), !1 != s && null != s ? n.attr("style", s) : n.removeAttr("style"), l.resolve(p)
                }, window.YellowDelay), l.promise()
        }

function st(e) {
                clearTimeout(window.relaxView), sn.extra.find(".wyp-el-viewer-relax-opacity").remove(), e.each(function(e) {
                        var a = o(this),
                                i = a.get(0);
                        if (!J(i)) {
                                0 === sn.extra.find(".wyp-el-viewer-" + e).length && sn.extra.append(
                                        "<div class='wyp-el-viewer wyp-el-viewer-" + e + "'></div>");
                                var n = Ra(i),
                                        s = parseFloat(getJi().scrollLeft() + getKi().scrollLeft()),
                                        r = parseFloat(getJi().scrollTop() + getKi().scrollTop()),
                                        d = a.css(["margin-top", "margin-right", "margin-bottom", "margin-left"]),
                                        p = parseFloat(d["margin-top"]),
                                        c = parseFloat(d["margin-right"]),
                                        u = parseFloat(d["margin-bottom"]),
                                        m = parseFloat(d["margin-left"]),
                                        f = n.top + r,
                                        t = n.left + s,
                                        l = getGi().find(".wyp-el-viewer-" + e);
                                l.css({
                                        width: n.width,
                                        height: n.height,
                                        "border-left-width": m,
                                        "border-right-width": c,
                                        "border-top-width": p,
                                        "border-bottom-width": u,
                                        transform: "translate3d(" + t + "px, " + f + "px, 0px)"
                                }), setTimeout(function() {
                                        l && 0 < l.length && l.remove()
                                }, 1e4)
                        }
                })
        }

function ot(e, t) {
                var a = t.data("px").split(",");
                return ("%" == e || "vw" == e || "vh" == e) && (a = t.data("pc").split(",")), ("em" == e || "rem" == e || "ex" == e || "cm" == e ||
                        "in" == e || "pc" == e) && (a = t.data("em").split(",")), "s" == e && (a = t.data("em").split(",")), "ms" == e && (a = t
                        .data("em").split(","), a[0] = parseInt(1e3 * a[0]), a[1] = parseInt(1e3 * a[1])), a
        }

function rt(e, t) {
                var a = o("#" + e + "-group"),
                        n = o("#" + e + "-group .css-un").val(),
                        s = ["px", "%", "em", "vw", "vh"];
                a.hasAttr("data-support-formats") && (s = a.attr("data-support-formats").split(","));
                var r = be(a);
                "" != r && "no-defined" != r && s.push(r);
                for (var l = [], d = 0, p; d < s.length; d++) p = {}, p.value = s[d], p.label = s[d], l.push(p);
                o("#" + e + "-group .css-un").autocomplete({
                        source: function(e, t) {
                                t(o.ui.autocomplete.filter(l, ""))
                        },
                        open: function() {
                                var t = o(this);
                                null == window.openValS && (window.openValS = t.val());
                                var i = o(".ed-pnl-list").height() - (t.offset().top - o(".ed-pnl-list").offset().top);
                                o("#autocomplete-custom-style-prefix-" + e).remove(), o(".up-style-autocomplete-prefix")
                                        .removeClass("up-style-autocomplete-prefix"), o(".up-style-autocomplete-input-prefix")
                                        .removeClass("up-style-autocomplete-input-prefix");
                                var n = t.outerHeight(),
                                        s = parseFloat(a.find(".ui-autocomplete.ui-menu").outerHeight() + n + 2);
                                i -= s, 20 > i && (getTn().append("<style id=\"autocomplete-custom-style-prefix-" + e + "\">#" + e +
                                                "-group .ui-autocomplete.ui-menu{top:-" + s + "px;}</style>"), a.find(
                                                ".ui-autocomplete.ui-menu").addClass("up-style-autocomplete-prefix"), t
                                        .addClass("up-style-autocomplete-input-prefix"))
                        },
                        close: function() {
                                var t = o("#" + e + "-group .css-va");
                                if (r == o(this).val()) {
                                        o(this).val("-");
                                        var a = t.val();
                                        t.val(r).attr("data-last-val", a)
                                } else t.val() == r && window.openValS != o(this).val() ? t.hasAttr("data-last-val") ? t.val(t
                                        .attr("data-last-val")) : t.val(0) : t.removeAttr("data-last-val");
                                window.openValS != o(this).val() && (window.allow_input_CSS_process = !0, o("#" + e +
                                        "-group .css-un").trigger("keyup"), window.allow_input_CSS_process = !1), o(
                                        this).trigger("autogrow"), o(this).blur(), window.openValS = void 0
                        },
                        delay: 0,
                        minLength: 0,
                        autoFocus: !0,
                        appendTo: o("#" + e + "-group .un-s")
                }).focus(function() {
                        o(this).autocomplete("search", "")
                });
                var c = ot(n, a);
                o("#wyp-" + e).slider({
                        min: parseInt(c[0]),
                        max: parseInt(c[1]),
                        step: t,
                        start: function() {
                                getTn().css("cursor", "pointer")
                        },
                        stop: function() {
                                getTn().css("cursor", "")
                        },
                        change: function(t, i) {
                                return a.find(".sl-cu").attr("style", o(i.handle).attr("style").replace(/left(\s?):/g,
                                        "width:")), o(".fake-layer").remove(), !!t.originalEvent && void("-" == o("#" +
                                        e + "-after").val() && (o("#" + e + "-after").val("px"), o("#" + e +
                                        "-after").trigger("autogrow")), lt(o(this), e, !0, !0))
                        },
                        slide: function(t, i) {
                                "-" == o("#" + e + "-after").val() && (o("#" + e + "-after").val("px"), o("#" + e + "-after")
                                        .trigger("autogrow"));
                                var n = i.value,
                                        s = o("#" + e + "-after").val();
                                n = +parseFloat(n).toFixed(2), o("#" + e + "-value").val(n), s = o("#" + e + "-after").val(),
                                        _t(e, !1), ht(e, n + s, !1), 0 === o(".fake-layer").length && getTn().append(
                                                "<div class='fake-layer'></div>"), a.find(".sl-cu").attr("style", o(i.handle)
                                                .attr("style").replace(/left(\s?):/g, "width:"))
                        }
                })
        }

function lt(e, t, a, i) {
                var n = e.parent().parent(),
                        s = n.attr("data-css"),
                        l = be(n),
                        d;
                !0 === a && (d = e.slider("value")), o("#" + s + "-value").is(":focus") && (d = o("#" + s + "-value").val());
                var p = o("#" + s + "-after").val();
                if ("-" != p) d = parseFloat(d);
                else if (/(\d+)([a-z%]]{1,3})$/i.test(d)) {
                        var c = d.match(/(\d+)([a-z%]]{1,3})$/i);
                        /^(em|rem|vh|vw|%|px|ms|s|pt|pc|in|mm|cm|ex|ch|vmin|vmax)$/.test(c[2]) && (d = parseFloat(c[1]), p = c[2])
                } else p = "", d = l, d = parseFloat(d);
                var r = o("#" + s + "-value").val();
                if (r == l) d = l, p = "";
                else if (isNaN(d))
                        if ("inherit" == r || "initial" == r || "auto" == r || "none" == r || "normal" == r) d = r, p = "";
                        else return !1;
                window.lastEditID = s, tt(null, t, d, p), i && Mi()
        }

function dt(e) {
                return ("" + e).replace(/\\/g, "\\\\").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\u00A0/g, "\\u00A0").replace(/&/g, "\\x26")
                        .replace(/'/g, "\\x27").replace(/"/g, "\\x22").replace(/</g, "\\x3C").replace(/>/g, "\\x3E")
        }

function pt(e, t, a) {
                if ("auto auto" == a && (a = "auto"), "" != a && "undefined" != typeof a) {
                        var i, n;
                        try {
                                i = o("input[name=" + t + "][value='" + dt(a) + "']"), n = i.parent(), i.length
                        } catch (t) {
                                return !1
                        }
                        a.match(/\bauto\b/g) && (a = "auto"), a.match(/\bnone\b/g) && (a = "none"), "background-size" == t && ("cover" != dt(a) &&
                                "contain" != dt(a) ? ut() : o(".background-size-custom-group").hide()), 0 < i.length ? (e.find(".active")
                                .removeClass("active"), i.prop("checked", !0), n.addClass("active")) : (e.find(".active").removeClass("active"),
                                o("input[name=" + t + "]").each(function() {
                                        o(this).prop("checked", !1)
                                }))
                }
        }

function ct(e) {
                e.find(".background-size-x-group,.background-size-y-group").each(function() {
                        var e = o(this);
                        e.find(".wyp-bgs-prefix").autocomplete({
                                source: function(e, t) {
                                        t(o.ui.autocomplete.filter(["%", "px", "em", "vh", "vw", "auto"], ""))
                                },
                                open: function() {
                                        null == window.openValK && (window.openValK = o(this).val())
                                },
                                close: function() {
                                        var t = e.find(".wyp-bgs-css-val"),
                                                a = "auto";
                                        if (a == o(this).val()) {
                                                o(this).val("-");
                                                var i = t.val();
                                                t.val(a).attr("data-last-val", i)
                                        } else t.val() == a && window.openValK != o(this).val() ? t.hasAttr(
                                                        "data-last-val") ? t.val(t.attr("data-last-val")) : t
                                                .val(0) : t.removeAttr("data-last-val");
                                        window.openValK != o(this).val() && (window.allow_input_CSS_process = !
                                                0, e.find(".wyp-bgs-prefix").trigger("keyup"), window
                                                .allow_input_CSS_process = !1), o(this).trigger(
                                                "autogrow"), o(this).blur(), window.openValK = void 0
                                },
                                delay: 0,
                                minLength: 0,
                                autoFocus: !0,
                                appendTo: e.find(".un-s")
                        }).focus(function() {
                                e.find(".wyp-bgs-prefix").autocomplete("search", "")
                        })
                })
        }

function ut() {
                o(".background-size-custom-group").hide(), setTimeout(function() {
                        var e = _(),
                                t = e.css("background-size"),
                                a = e.css("background-image");
                        if ("none" != a && "" != a && 0 < o(".ra.active #background-size-auto").length) {
                                if (o(".background-size-custom-group").css("display", "flex"), J(t)) return;
                                var i = t.split(" ");
                                if (1 < i.length) {
                                        var n = i[0].replace(/[^0-9]]/g, ""),
                                                s = i[1].replace(/[^0-9]]/g, ""),
                                                r = i[0].replace(/[0-9]]/g, ""),
                                                l = i[1].replace(/[0-9]]/g, "");
                                        "auto" == r && (r = "-", n = "auto"), "auto" == l && (l = "-", s = "auto"), o(
                                                "#background-size-x-value").val(n), o("#background-size-y-value").val(s), o(
                                                "#background-size-x-custom").val(r), o("#background-size-y-custom").val(l)
                                } else "auto" == t || "cover" == t || "contain" == t ? (o(
                                        "#background-size-x-value,#background-size-y-value").val("auto"), o(
                                        "#background-size-x-custom,#background-size-y-custom").val("-")) : (o(
                                        "#background-size-x-value,#background-size-y-value").val(t.replace(/[^0-9]]/g,
                                        "")), o("#background-size-x-custom,#background-size-y-custom").val(t.replace(
                                        /[0-9]/g, "")))
                        }
                }, 2 * window.Yellow2Delay)
        }

function mt(e) {
                if (J(e)) return !1;
                var t = e.toLowerCase();
                return /\barial\b|\barial black\b|\barial narrow\b|\barial rounded mt bold\b|\bavant garde\b|\bcalibri\b|\bcandara\b|\bcentury gothic\b|\bfranklin gothic medium\b|\bgeneva\b|\bfutura\b|\bgill sans\b|\bhelvetica neue\b|\bimpact\b|\blucida grande\b|\boptima\b|\bsegoe ui\b|\btahoma\b|\btrebuchet ms\b|\bverdana\b|\bbig caslon\b|\bbodoni mt\b|\bbook antiqua\b|\bcalisto mt\b|\bcambria\b|\bdidot\b|\bgaramond\b|\bgeorgia\b|\bgoudy old style\b|\bhoefler text\b|\blucida bright\b|\bpalatino\b|\bperpetua\b|\brockwell\b|\brockwell extra bold\b|\bbaskerville\b|\btimes new roman\b|\bconsolas\b|\bcourier new\b|\blucida console\b|\bhelveticaneue\b/
                        .test(t)
        }

function ft(e, t) {
                if (J(e) || J(t)) return !1;
                var a = 0,
                        n = e.toString().split(","),
                        s = t.toString().split(",");
                if (n.length != s.length) return !1;
                if (1 >= n.length) return !1;
                for (var o = 0, r = 0; r < n.length; r++) K(s[r + 1]) && (o += parseFloat(Wt(n[r])), a = parseFloat(Wt(s[r + 1])) - o + a, o += a);
                return a
        }

function gt() {
                var e = "",
                        t, a, i, n;
                o("#font-family-group .ui-autocomplete.ui-menu li:not(.ui-autocomplete-category):in-viewport").each(function() {
                        if (t = o(this), i = t.text(), n = t.attr("style"), null != n && null != n) return !0;
                        a = Wn(o.trim(i.replace(/ /g, "+")));
                        var s = !1;
                        mt(i) && (s = !0), !1 == s && 0 === o("#wyp-font-test-" + a).length && (e +=
                                "<link rel='stylesheet' id='wyp-font-test-" + a +
                                "'  href='https://fonts.googleapis.com/css2?family=" + o.trim(i.replace(/ /g, "+")) +
                                ":ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' type='text/css' media='all' />"
                                ), t.css("fontFamily", "'" + i + "'")
                }), "" != e && getQi().append(e)
        }

function ht(e, t, a) {
                var i = _a();
                if (-1 == i.indexOf(",") && (window.cachedSelector != i && (window.cachedSelector = _a(), window.minCrpdSlctr = 12, window
                                .cachedSelectorStrong = Ma(getGi().find(".wyp-con-slcd .wyp-selected"), window.lastParentQueryStatus), window
                                .minCrpdSlctr = !1), i = window.cachedSelectorStrong), "height" == e || "width" == e) {
                        var n = mi(o("#min-" + e + "-value").val()),
                                s = o("#" + e + "-after").val(),
                                r = o("#min-" + e + "-after").val();
                        parseFloat(t) < parseFloat(n) && s == r && (_t("min-" + e, !1), ht("min-" + e, t, !1))
                }
                var l = !1 !== a && void 0 !== a ? a : "#" + e + "-live-css";
                var d = getGi().find(l);
                if (0 === d.length) {
                        var p = l.replace("#", "").replace(".", ""),
                                c = g(e);
                        ("flex-grow" == c || "flex-shrink" == c || "opacity" == c || "blur-filter" == c || "grayscale-filter" == c || "invert-filter" ==
                                c || "brightness-filter" == c || "z-index" == c || "column-count" == c || "contrast-filter" == c ||
                                "hue-rotate-filter" == c || "saturate-filter" == c || "sepia-filter" == c || -1 != c.indexOf("-transform") ||
                                "blur-backdrop-filter" == c || "grayscale-backdrop-filter" == c || "invert-backdrop-filter" == c ||
                                "sepia-backdrop-filter" == c || "brightness-backdrop-filter" == c || "contrast-backdrop-filter" == c ||
                                "hue-rotate-backdrop-filter" == c || "saturate-backdrop-filter" == c) && "text-transform" != c && (t = mi(t)), (
                                        "blur-filter" == e || "grayscale-filter" == e || "invert-filter" == e || "brightness-filter" == e ||
                                        "contrast-filter" == e || "hue-rotate-filter" == e || "saturate-filter" == e || "sepia-filter" == e) && (e =
                                        "filter", p = "filter", t = vt(null, null)), ("blur-backdrop-filter" == e || "grayscale-backdrop-filter" == e ||
                                        "invert-backdrop-filter" == e || "sepia-backdrop-filter" == e || "brightness-backdrop-filter" == e ||
                                        "contrast-backdrop-filter" == e || "hue-rotate-backdrop-filter" == e || "saturate-backdrop-filter" == e) && (e =
                                        "backdrop-filter", p = "backdrop-filter", t = bt(null, null)), -1 != c.indexOf("-transform") &&
                                "text-transform" != c && (e = "transform", p = "transform", t = wt(null, null)), ("box-shadow-inset" == e ||
                                        "box-shadow-color" == e || "box-shadow-vertical" == e || "box-shadow-blur-radius" == e || "box-shadow-spread" ==
                                        e || "box-shadow-horizontal" == e) && (e = "box-shadow", p = "box-shadow", t = xt(i, null, null));
                        var u = "",
                                m = da("position");
                        "static" == m && ("top" == e || "left" == e || "right" == e || "bottom" == e) && (u = "position:relative !important;"),
                                "animation-name" == e && (u =
                                        "-webkit-animation-duration:1000ms !important;animation-duration:1000ms !important;-webkit-animation-delay:100ms !important;animation-delay:100ms !important;-webkit-animation-fill-mode:none !important;animation-fill-mode:none !important;",
                                        "bounce" == t ? u +=
                                        "-webkit-transform-origin:center bottom !important;transform-origin:center bottom !important;" : "swing" == t ?
                                        u += "-webkit-transform-origin:top center !important;transform-origin:top center !important;" : "jello" == t ?
                                        u += "-webkit-transform-origin:center !important;transform-origin:center !important;" : "lightSpeedIn" == t ||
                                        "heartBeat" == t || "headShake" == t ? u +=
                                        "-webkit-animation-timing-function: ease-out !important;animation-timing-function: ease-out !important;" :
                                        "lightSpeedOut" == t && (u +=
                                                "-webkit-animation-timing-function: ease-in !important;animation-timing-function: ease-in !important;"),
                                        ("flip" == t || "flipInX" == t || "flipInY" == t || "flipOutX" == t || "flipOutY" == t) && (u +=
                                                "-webkit-backface-visibility:visible !important;backface-visibility:visible !important;")), -1 == window
                                .webkitArray.indexOf(e) ? getJi().append("<style class='" + p + " wyp-live-css' id='" + p +
                                        "'>.wyp-selected,.wyp-selected-others," + i + "{" + e + ":" + t + " !important;" + u + "}</style>") : getJi().append(
                                        "<style class='" + p + " wyp-live-css' id='" + p + "'>.wyp-selected,.wyp-selected-others," + i + "{" + e + ":" +
                                        t + " !important;-webkit-" + e + ":" + t + " !important;" + u + "}</style>")
                }
                yt(e)
        }

function yt(e) {
                "block" == o(".advanced-info-box").css("display") && o(".element-btn").hasClass("active") && "block" == o(
                        ".info-element-accessibility-section").css("display") && (("color" == e || "background-color" == e || "all" == e) && o(
                                ".contrast-accessibility").html(
                                "<span class=\"typo-list-left\">Text Contrast</span><span class=\"typo-list-right\"><span>" + ia() +
                                "</span></span>"), ("line-height" == e || "font-size" == e || "all" == e) && o(".line-spacing-accessibility")
                        .html("<span class=\"typo-list-left\">Line Spacing</span><span class=\"typo-list-right\"><span>" + aa() +
                                "</span></span>"), ("font-size" == e || "all" == e) && o(".font-size-accessibility").html(
                                "<span class=\"typo-list-left\">Legibility</span><span class=\"typo-list-right\"><span>" + ea() +
                                "</span></span>"))
        }

function wt(e, t) {
                var a = "scale(" + o.trim(o("#scale-transform-value").val()) + ")",
                        i = "rotateX(" + o.trim(o("#rotatex-transform-value").val()) + "deg)",
                        n = "rotateY(" + o.trim(o("#rotatey-transform-value").val()) + "deg)",
                        s = "rotateZ(" + o.trim(o("#rotatez-transform-value").val()) + "deg)",
                        r = "translatex(" + o.trim(o("#translate-x-transform-value").val()) + "px)",
                        l = "translatey(" + o.trim(o("#translate-y-transform-value").val()) + "px)",
                        d = "skewx(" + o.trim(o("#skew-x-transform-value").val()) + "deg)",
                        p = "skewy(" + o.trim(o("#skew-y-transform-value").val()) + "deg)";
                "disable" == t && ("scale-transform" == e && (a = ""), "rotatex-transform" == e && (i = ""), "rotatey-transform" == e && (n = ""),
                        "rotatez-transform" == e && (s = ""), "translate-x-transform" == e && (r = ""), "translate-y-transform" == e && (l =
                        ""), "skew-x-transform" == e && (d = ""), "skew-y-transform" == e && (p = ""));
                var c = o.trim(_i(a + " " + i + " " + n + " " + s + " " + r + " " + l + " " + d + " " + p));
                return !1 === S() && (c = c.replace(
                        /(scale\(1\)|rotate\(0deg\)|rotatex\(0deg\)|rotatey\(0deg\)|rotatez\(0deg\)|translatex\(0px\)|translatey\(0px\)|skewx\(0deg\)|skewy\(0deg\))/gi,
                        "")), c = c.replace(/\s+/g, " "), ("" === c || " " == c) && (c = "disable"), c
        }

function vt(e, t) {
                var a = "blur(" + o.trim(o("#blur-filter-value").val()) + "px)",
                        i = "grayscale(" + o.trim(o("#grayscale-filter-value").val()) + ")",
                        n = "invert(" + o.trim(o("#invert-filter-value").val()) + ")",
                        s = "brightness(" + o.trim(o("#brightness-filter-value").val()) + ")",
                        r = "contrast(" + o.trim(o("#contrast-filter-value").val()) + ")",
                        l = "hue-rotate(" + o.trim(o("#hue-rotate-filter-value").val()) + "deg)",
                        d = "saturate(" + o.trim(o("#saturate-filter-value").val()) + ")",
                        p = "sepia(" + o.trim(o("#sepia-filter-value").val()) + ")";
                "disable" == t && ("blur-filter" == e && (a = ""), "grayscale-filter" == e && (i = ""), "invert-filter" == e && (n = ""),
                        "brightness-filter" == e && (s = ""), "contrast-filter" == e && (r = ""), "hue-rotate-filter" == e && (l = ""),
                        "saturate-filter" == e && (d = ""), "sepia-filter" == e && (p = ""));
                var c = o.trim(_i(a + " " + s + " " + r + " " + i + "  " + n + " " + l + " " + d + " " + p));
                return !1 === S() && (c = c.replace(
                        /(blur\(0px\)|brightness\(1\)|contrast\(1\)|grayscale\(0\)|invert\(0\)|hue-rotate\(0deg\)|saturate\(1\)|sepia\(0\))/gi,
                        "")), c = c.replace(/\s+/g, " "), ("" === c || " " == c) && (c = "disable"), c
        }

function bt(e, t) {
                var a = "blur(" + o.trim(o("#blur-backdrop-filter-value").val()) + "px)",
                        i = "grayscale(" + o.trim(o("#grayscale-backdrop-filter-value").val()) + ")",
                        n = "invert(" + o.trim(o("#invert-backdrop-filter-value").val()) + ")",
                        s = "brightness(" + o.trim(o("#brightness-backdrop-filter-value").val()) + ")",
                        r = "contrast(" + o.trim(o("#contrast-backdrop-filter-value").val()) + ")",
                        l = "hue-rotate(" + o.trim(o("#hue-rotate-backdrop-filter-value").val()) + "deg)",
                        d = "saturate(" + o.trim(o("#saturate-backdrop-filter-value").val()) + ")",
                        p = "sepia(" + o.trim(o("#sepia-backdrop-filter-value").val()) + ")";
                "disable" == t && ("blur-backdrop-filter" == e && (a = ""), "grayscale-backdrop-filter" == e && (i = ""), "invert-backdrop-filter" ==
                        e && (n = ""), "brightness-backdrop-filter" == e && (s = ""), "contrast-backdrop-filter" == e && (r = ""),
                        "hue-rotate-backdrop-filter" == e && (l = ""), "saturate-backdrop-filter" == e && (d = ""), "sepia-backdrop-filter" ==
                        e && (p = ""));
                var c = o.trim(_i(a + " " + s + " " + r + " " + i + "  " + n + " " + l + " " + d + " " + p));
                return !1 === S() && (c = c.replace(
                        /(blur\(0px\)|brightness\(1\)|contrast\(1\)|grayscale\(0\)|invert\(0\)|hue-rotate\(0deg\)|saturate\(1\)|sepia\(0\))/gi,
                        "")), c = c.replace(/\s+/g, " "), ("" === c || " " == c) && (c = "disable"), c
        }

function xt(e, t, a) {
                var i = "";
                o("#box-shadow-inset-inset").parent().hasClass("active") && (i = "inset");
                var n = o.trim(o("#wyp-box-shadow-color").val()),
                        s = mi(o("#box-shadow-vertical-value").val()),
                        r = mi(o("#box-shadow-blur-radius-value").val()),
                        l = mi(o("#box-shadow-spread-value").val()),
                        d = mi(o("#box-shadow-horizontal-value").val());
                "disable" == a && ("box-shadow-color" == t && (n = Pi(getGi().find(e).css("color"))), "box-shadow-vertical" == t && (s = "0"),
                        "box-shadow-blur-radius" == t && (r = "0"), "box-shadow-spread" == t && (l = "0"), "box-shadow-horizontal" == t && (d =
                                "0")), "" == s && (s = "0"), "" == r && (r = "0"), "" == l && (l = "0"), "" == d && (d = "0");
                var p = o.trim(_i(d + "px " + s + "px " + r + "px " + l + "px " + n + " " + i));
                return 0 == d && 0 == s && 0 == r && 0 == l && (p = "none"), ("transparent" == n || "rgba(226,146,146,0)" == n.replace(/\s/g, "")) && (
                        p = "none"), p
        }

function _t(e, t) {
                "animation-name" == e && (getJi().removeClass("wyp-h-trfm"), Ni());
                var a = !1 !== t && void 0 !== t ? t : "#" + e + "-live-css";
                var i = getGi().find(a);
                0 < i.length && i.remove()
        }

function kt() {
                window.ypData["data-clickable-select"] = void 0, getQi().removeClass("wyp-con-slcd"), window.ypData.is_content_selected = !1, getTn().removeClass(
                                "wyp-non-logged-in-mode wyp-logged-in-mode wyp-flex-container wyp-flex-element wyp-grid-element wyp-element-list"), getTn()
                        .removeAttr("data-wyp-selector"), getJi().removeClass(
                                "wyp-h-trfm wyp-selected-bottom wyp-full-width-selected wyp-ele-n-vis wyp-element-float yp-selector-hover yp-selector-focus yp-selector-link yp-selector-visited yp-selector-active yp-selector-checked yp-selector-disabled yp-selector-enabled yp-selector-invalid yp-selector-valid wyp-el-reing wyp-vis-edng wyp-vis-edng-x wyp-vis-edng-y"
                                ), window.ypData.is_visual_editing = !1, window.ypData.is_resizing = !1, getGi().find(".wyp-selected-others,.wyp-selected")
                        .removeClass("wyp-selected-others wyp-selected"), window.ypData.get_selected_element = void 0, sn.general.empty(), sn.other
                        .empty(), sn.active.empty(), on.removeAttr("style"), window.lastTextColor = null, getGi().find(".wyp-live-css").remove(), "block" ==
                        o(".advanced-info-box").css("display") && o(".element-btn").hasClass("active") && (o(".info-element-selected-section").hide(),
                                o(".info-no-element-selected").show())
        }

function Ct() {
                var t = o(".wyp-gradient-pointer-area"),
                        a = t.width(),
                        i = t.offset(),
                        n = i.left,
                        s = i.top;
                if (o(".wyp-gradient-pointer").hasClass("ui-draggable")) try {
                        o(".wyp-gradient-pointer.ui-draggable").draggable("destroy")
                } catch (t) {}
                o(".wyp-gradient-pointer").draggable({
                        containment: [n, s, n + a, s],
                        start: function() {
                                o(".wyp-gradient-pointer").removeClass("active"), o(this).addClass("active"), window
                                        .blockIris = !0, o(".wyp-gradient-section .iris-picker").hide(), window
                                        .gradientPointerTop = o(this).offset().top + o(this).height() / 2, window
                                        .gradientPointerLen = o(".wyp-gradient-pointer:not(.disable)").length
                        },
                        drag: function(i, e) {
                                t.addClass("gradient-pointer-no-cursor"), o(this).attr("data-position", parseInt(100 * (e
                                        .position.left / a))), 2 < window.gradientPointerLen && (i.pageY < window
                                        .gradientPointerTop - 25 || i.pageY > window.gradientPointerTop + 25 ? o(this)
                                        .addClass("disable") : o(this).removeClass("disable")), Dt("live")
                        },
                        stop: function(i, e) {
                                t.removeClass("gradient-pointer-no-cursor"), o(this).attr("data-position", parseInt(100 * (e
                                        .position.left / a))), Dt("insert"), window.blockIris = !1
                        },
                        axis: "x"
                })
        }

function zt(e) {
                var t = !1;
                !0 == /(-webkit-|-moz-)/g.test(e) && (t = !0), e = e.replace(
                        /(-webkit-gradient\(linear\,(\s+)?|-webkit-linear-gradient\(|-o-linear-gradient\(|-moz-linear-gradient\()/g,
                        "linear-gradient(");
                var a = /linear-gradient\(([^,]]+)/.exec(e)[1];
                if (!1 == /(deg|left|top|right|bottom)/g.test(a)) e = e.replace(/linear-gradient\(/g, "linear-gradient(to right, ");
                else if (-1 == a.indexOf("to "))
                        if (-1 != a.indexOf("deg") && !0 == t) {
                                var i = mi(a);
                                90 > i ? i = 90 - i : 90 < i && (i = 360 - (i - 90)), e = e.replace(/linear-gradient\(([^,]]+)/, "linear-gradient(" + i +
                                        "deg")
                        } else a = a.trim(), -1 == a.indexOf(" ") && ("left" == a ? e = e.replace(/linear-gradient\(([^,]]+)/,
                                "linear-gradient(to right") : "right" == a ? e = e.replace(/linear-gradient\(([^,]]+)/,
                                "linear-gradient(to left") : "top" == a ? e = e.replace(/linear-gradient\(([^,]]+)/,
                                "linear-gradient(to bottom") : "bottom" == a && (e = e.replace(/linear-gradient\(([^,]]+)/,
                                "linear-gradient(to top")));
                if (-1 == e.indexOf("%")) {
                        e = e.replace(/rgb(a?)\((.*?)\)/g, function(e) {
                                return e.replace(/\,/g, "|-|-|")
                        });
                        var n = e.match(/\,/g).length,
                                s = -2;
                        e = e.replace(/\,/g, function() {
                                return s++, -1 == s ? "," : " " + parseInt(100 * s / n) + "%,"
                        }), e = e.replace(/\|\-\|\-\|/g, ","), e = e.replace(/\)$/, " 100%)")
                }
                return e
        }

function Ot(e) {
                var t, a, n, s, r, l, d, p, c, u, m;
                if (e = e.replace(/\s+?!important/g, "").replace(/\;$/g, "").trim(), c = "linear-gradient(to right,", -1 == e.indexOf(
                                "linear-gradient(")) return !1;
                e = zt(e);
                try {
                        t = window.GradientParser(e)[0]
                } catch (t) {
                        return !1
                }
                m = t.orientation.type, u = t.orientation.value, "directional" == m && ("top" == u ? u = "0" : "right" == u ? u = "90" : "bottom" == u ?
                                u = "180" : "left" == u ? u = "270" : "top" == u && (u = "360")), o(".wyp-gradient-orientation").attr("data-degree", u),
                        o(".wyp-gradient-pointer-area").empty();
                for (var f = 0; f < t.colorStops.length; f++) {
                        if (K(t.colorStops[f])) {
                                if (s = t.colorStops[f].length.type, "%" != s) return !0;
                                r = t.colorStops[f].length.value, l = "%", d = " "
                        } else r = 100 * f / (t.colorStops.length - 1), l = "%", d = " ";
                        r = parseInt(r), a = t.colorStops[f].type, n = t.colorStops[f].value, ("rgb" == a || "rgba" == a) && (n = a + "(" + n + ")"),
                                "hex" == a && (n = "#" + n), 0 == f && o("#iris-gradient-color").val(n), c += " " + n + d + r + l, t.colorStops.length -
                                1 != f && (c += ","), p = "<div class=\"wyp-gradient-pointer\" data-color=\"" + n + "\" data-position=\"" + r +
                                "\" style=\"left:" + r + "" + l + ";\"><i class=\"wyp-gradient-pointer-color\" style=\"background-color:" + n +
                                ";\"></i></div>", o(".wyp-gradient-pointer-area").append(p)
                }
                c += ")", o("#gradient-bar-view-style").remove(), getTn().append(
                        "<style id=\"gradient-bar-view-style\">.wyp-gradient-bar{background-image:" + c +
                        ";}.wyp-gradient-orientation{background-image:" + e + ";}</style>"), setTimeout(function() {
                        Ct()
                }, 26)
        }

function Dt(e) {
                var t = o(".wyp-gradient-orientation").attr("data-degree") + "deg";
                "0deg" == t ? t = "to top" : "90deg" == t ? t = "to right" : "180deg" == t ? t = "to bottom" : "270deg" == t ? t = "to left" :
                        "360deg" == t && (t = "to top");
                var a = "linear-gradient(to right,",
                        n = "linear-gradient(" + t + ",";
                o(".wyp-gradient-pointer-area .wyp-gradient-pointer:not(.disable)").sort(function(e, t) {
                        return +e.dataset.position - +t.dataset.position
                }).appendTo(".wyp-gradient-pointer-area"), o(".wyp-gradient-pointer-area .wyp-gradient-pointer:not(.disable)").each(function(
                e) {
                        var t = o(this),
                                i = t.attr("data-color"),
                                s = t.attr("data-position");
                        n += " " + i + " " + parseInt(s) + "%", a += " " + i + " " + parseInt(s) + "%", o(
                                ".wyp-gradient-pointer:not(.disable)").length - 1 != e && (n += ",", a += ",")
                }), n += ")", a += ")", o("#gradient-bar-view-style").remove(), getTn().append(
                        "<style id=\"gradient-bar-view-style\">.wyp-gradient-bar{background-image:" + a +
                        ";}.wyp-gradient-orientation{background-image:" + n + ";}</style>"), "live" == e ? (_t("background-image", !1), ht(
                        "background-image", n, !1), o("#wyp-background-image").val(n)) : "insert" == e && (_t("background-image", !1), o(
                        "#wyp-background-image").val(n).trigger("keyup"))
        }

function St() {
                return getGi().find("#wyp-styles-area")
        }

function Tt(e) {
                return getGi().find("[data-source-mode='" + e + "']").text()
        }

function Et(e, t, n, s) {
                var r;
                if (0 < getGi().find("#wyp-live-css-data").length && t == E()) r = getGi().find("#wyp-live-css-data").text();
                else if (0 < getGi().find("#wyp-live-css-data").length && null == t) r = getGi().find("#wyp-live-css-data").text();
                else {
                        var l;
                        l = null == t ? a(null, !1) : a(t, !1), r = Lt("desktop", t, l);
                        var d = p(l, "[style]");
                        if (0 < d.length) {
                                for (var c = [], u = 0, m; u < d.length; u++)(m = /\[msize\=(.*?)\]/g.exec(d[u])[1], !(s && -1 != d[u].indexOf(
                                        "YPtoAddBreakpoint"))) && -1 === o.inArray(m, c) && "desktop" != m && c.push(m);
                                o.each(c, function(e, a) {
                                        var i = Lt(a, t, l);
                                        i = "\t" + i.replace(/\r/g, "\r\t").replace(/\t$/g, "").replace(/\t$/g, ""), "tablet" == a && (
                                                a = "(min-width: 768px) and (max-width: 991px)"), "mobile" == a && (a =
                                                "(max-width:767px)"), K(a) && (r = r + "\r\r@media " + a + "{\r\r" + i + "}")
                                })
                        }
                }
                r = r.replace(/\{\r\r/g, "{"), n && (r = r.replace(/\.yp_onscreen/g, ":yp-onscreen").replace(/\.yp_focus/g, ":yp-focus").replace(
                        /\.yp_hover/g, ":yp-hover").replace(/\.yp_click/g, ":yp-click")), r = r.replace(
                        /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?){/g,
                        function(e) {
                                var t = e.match(/\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g)[0]
                                        .replace(/(body)?\.yp-selector-/g, ""),
                                        a = e.replace(
                                                /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                                                "");
                                return " " != a[0] && (a = "body" + a), a = a.trim().replace(/\{/g, "") + ":" + t + "{", a
                        });
                var f = new RegExp("(\t+)?-webkit-(" + window.webkitArray.join("|") + "):(.*?);(\n|\r)?", "g");
                r = r.replace(f, ""), r = r.replace(/\)\{/g, "){\r").replace(/\)\{/g, "){\r");
                for (var g = ["nth-child", "not", "lang", "nth-last-child", "nth-last-of-type", "nth-of-type"], h = 0, y; h < g.length; h++) y =
                        new RegExp(g[h] + "\\((.*?)\\){\r\r", "g"), r = r.replace(y, g[h] + "($1){");
                if (!0 === e && (r = r.replace(/\r\ta:a !important;/g, ""), r = r.replace(/a:a !important;/g, ""), r = r.replace(/a:a;/g, "")), r = r
                        .replace(/^\r/g, "").replace(/^\r/g, ""), r = r.replace(/\}\r\r\r\r@media/g, "}\r\r@media"), r = r.replace(
                                /\/\*(.*?)\*\/\n@media/g, "@media"), r = r.replace(/\n\n\n/g, "\n\n"), !0 == n) {
                        var w, b;
                        r = r.replace(/(^)(.*?){/gm, function(e) {
                                return -1 == e.indexOf("@media") ? e : (w = o.trim(e.match(/@media(.*?){/g).toString().replace(
                                        /(\{|@media(\s+)?)/g, "")), b = Ya(w), !1 === b ? e : (w = Ha(b), w = w.replace(
                                        /desktop/i, qi.all_devices), "/* " + w + " */\n" + e))
                        })
                }
                return r
        }

        function Lt(e, t, a) {
                if (1 >= a.length) return "";
                var n, s, o;
                n = "";
                for (var r = [], l = p(a, "[msize=" + e + "]"), d = 0, c; d < l.length; d++)
                        if ((s = Ut(l[d]), o = -1 != l[d].indexOf("[rule=a]") && !0 == window.ypOption.append_auto_comments ? Ai(s, !1) : ki(s), -1 == r
                                        .indexOf(s)) && "" != s && !1 != s && null != s)
                                if (r.push(s), !1 != o && (n += "/* " + o + " */\n"), "desktop" != e && "all" != e && !1 != o && (n += "\t"),
                                        "YPtoAddBreakpoint" != s) {
                                        n += s + "{\r", c = p(a, "[selector=" + gi(s) + "][msize=" + e + "]");
                                        for (var u = 0; u < c.length; u++) n += "\t" + Xt(c[u]) + ";\r";
                                        n += "}\r\r"
                                } else n += "/* New created breakpoint. */\r\r";
                return n
        }

        function Bt(e, t, a, i) {
                var n = Pe(i),
                        s = Re(i);
                a = a.replace(/\s+\![a-zA-Z]]{0,9}(\s+)?$/g, ""), -1 == window.webkitArray.indexOf(t) ? getJi().append(
                        "<style class='wyp-fastest-live-css'>" + n + e + "{" + t + ":unset !important;" + t + ":" + a + " !important;}" + s +
                        "</style>") : getJi().append("<style class='wyp-fastest-live-css'>" + n + e + "{" + t + ":unset !important;" + t + ":" + a +
                        " !important;-webkit-" + t + ":" + a + " !important;}" + s + "</style>")
        }

        function Mt() {
                getGi().find(".wyp-fastest-live-css").remove()
        }

        function Zt(e) {
                if (o("#visual-rule-filter").trigger("keyup"), window.selectedByView || "matched" == o("#visual-rule-filter").val() || !1 == window
                        .ypData["vsl-css-vi-active"]) return !1;
                if ("block" == o("#vsl-css-vi").css("display") && !0 == C()) {
                        var t = _a();
                        t = xi(t, !0, !0, !0, !0);
                        var a = o(".selector-group[data-clean-selector='" + t + "']");
                        if (0 < a.length) {
                                o(".selector-group.active").removeClass("active"), o(".selector-group.focus").removeClass("focus"), a.addClass(
                                        "active focus");
                                var i = a.last().offset().top + o("#vsl-css-co").scrollTop() - 50;
                                0 > i && (i = 0), !0 === e ? o("#vsl-css-co").scrollTop(i) : o("#vsl-css-co").stop().animate({
                                        scrollTop: i
                                }, 500, "swing")
                        }
                }
        }

        function Pt() {
                if (o(".view-children-group").removeClass("view-children-group"), "single.css" != o("#visual-rule-filter").val() && "template.css" != o(
                                "#visual-rule-filter").val() && "global.css" != o("#visual-rule-filter").val()) {
                        var e = [];
                        o(".selector-group.selector-group-visible").each(function() {
                                var t = o(this),
                                        a = t.attr("data-view-selector");
                                return -1 != e.indexOf(a) || void(e.push(a), o(
                                        ".selector-group.selector-group-visible[data-view-selector='" + a + "']").not(
                                        this).each(function() {
                                        t.after(o(this).addClass("view-children-group"))
                                }))
                        })
                }
                o(".selector-group").removeClass("first-child last-child"), o(".selector-group:visible").first().addClass("first-child"), o(
                        ".selector-group:visible").last().addClass("last-child")
        }

        function Rt() {
                Yt(), o("#vsl-css-co").scrollTop(0), getTn().addClass("vsl-css-vi-active wyp-cln-lo-panel-only"), window.ypData["vsl-css-vi-active"] = !0, o(
                                ".selector-group").removeClass("first-child last-child"), o(".selector-group:visible").first().addClass("first-child"),
                        o(".selector-group:visible").last().addClass("last-child"), C() && Zt(!0), window.ypData["wyp-fix-pan"] && 276 == I(
                                "visualManagerWidth") && (o("#visual-manager-personalized-view").remove(), getTn().append(
                                "<style id='visual-manager-personalized-view'>#vsl-css-vi{width:" + parseInt(o(".ed-pnl").width()) +
                                "px !important;}</style>")), N(), Ze()
        }

        function It() {
                return !!window.ypData["vsl-css-vi-active"] && void(o("#visual-rule-filter").val(""), getTn().removeClass(
                        "vsl-css-vi-active wyp-cln-lo-panel-only"), window.ypData["vsl-css-vi-active"] = void 0, N(), Ze(), we())
        }

        function Yt() {
                for (var e = ["global", "template", "single"], t =
                                "<p class=\"view-information\" style=\"display:none;\"></p><div id=\"view-no-item\" style=\"display:none;\"><span></span><p></p></div>",
                                n = 0, r, l, d, c, u, m, f, g, h, y, w, v, b, _, k, z, O, D, A, S, T; n < e.length; n++)
                        if ((d = a(e[n], !1), !(1 >= d.length)) && (w = p(d, "[style]"), 0 != w.length)) {
                                v = ["desktop"];
                                for (var L = 0; L < w.length; L++) g = /\[msize\=(.*?)\]/g.exec(w[L])[1], -1 === o.inArray(g, v) && "desktop" != g && v
                                        .push(g);
                                var B = null;
                                C() && (B = _a()), o.each(v, function(a, i) {
                                        "tablet" == i && (i = "(min-width: 768px) and (max-width: 991px)"), "mobile" == i && (i =
                                                        "(max-width:767px)"), T = "", -1 != i.indexOf("and") && (T =
                                                        " disabled-media-line"), b = i.replace(/desktop/i, qi.all_devices), _ = e[n],
                                                S = Ya(i), !1 === S ? "all" != i && "desktop" != i ? A =
                                                " title='Unknown Media Query'" : A = "" : (A = Ha(S), A = " title='" + A + "'"), h = [],
                                                y = p(d, "[msize=" + i + "]");
                                        for (var s = 0; s < y.length; s++)
                                                if ((u = Ut(y[s]), y[s] = y[s].replace(
                                                                /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?){/g,
                                                                function(e) {
                                                                        var t = e.match(
                                                                                        /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g)[
                                                                                        0].replace(/(body)?\.yp-selector-/g,
                                                                                ""),
                                                                                a = e.replace(
                                                                                        /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                                                                                        "");
                                                                        return " " != a[0] && (a = "body" + a), a = a.trim()
                                                                                .replace(/\{/g, "") + ":" + t + "{", a
                                                                }), r = Ut(y[s]), "YPtoAddBreakpoint" != r) && -1 == h.indexOf(r) &&
                                                        null != r && !1 != r && "" != r) {
                                                        h.push(r), D = "", B == r && (D = " active-view-group focus"), l = xi(u, !0, !0,
                                                                        !0, !0), m = Ai(r, !1), f = "", !1 == Ca(l, !0, !1, !1) && (f =
                                                                        " unavailable-view-group"), t +=
                                                                "<div class='selector-group selector-group-visible" + D + "" + f +
                                                                "' data-view-selector='" + u + "' data-clean-selector='" + l +
                                                                "' data-view-size='" + i + "' data-view-type='" + e[n] + "'>", t +=
                                                                "<div class='selector-heading'><span></span><input type='text' value='" +
                                                                m +
                                                                "' class='selector-comment-input' maxlength='70' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' /></div>",
                                                                t +=
                                                                "<div class='selector-content'><div class='view-before-selector'><div class='view-media-line" +
                                                                T + "'" + A + ">" + b + "</div><span class='source-view'>" + _ +
                                                                ".css</span><div class='wyp-clear'></div></div>", t +=
                                                                "<div class='css-selector-open'><span class='selector-view'><span>" + r
                                                                .replace(/\.yp_onscreen/g, ":yp-onscreen").replace(/\.yp_focus/g,
                                                                        ":yp-focus").replace(/\.yp_hover/g, ":yp-hover").replace(
                                                                        /\.yp_click/g, ":yp-click") + "</span><i>{</i></span></div>",
                                                                t += "<div class='css-rule-group'>", c = p(d, "[selector=" + gi(u) +
                                                                        "][msize=" + i + "]");
                                                        for (var o = 0; o < c.length; o++)(k = /^(.*?):(.*?)$/i.exec(Xt(c[o])), null !=
                                                                k) && (z = k[1], -1 == z.indexOf("-webkit-")) && (O = k[2], t +=
                                                                "<div class=\"css-rule-view\" data-view-rule=\"" + z +
                                                                "\"><label class=\"css-rule-label\"><input type=\"checkbox\" checked=\"checked\"><span class=\"rule-checkbox\"></span><span class=\"view-rule\">" +
                                                                z + ":</span></label><span class=\"view-rule-value\">" + O +
                                                                "</span><input class=\"value-input\" type=\"text\" /><span class=\"rule-end\">;</span></div>"
                                                                );
                                                        t += "</div>", t += "<div class='css-selector-close'>}</div>", t +=
                                                                "</div></div>"
                                                }
                                })
                        } return o("#vsl-css-co").html(t), 0 == o(".selector-group").length && "" == o("#visual-rule-filter").val() ? (o(
                        "#view-no-item p").text(qi.manager_msg15), o("#view-no-item").show(), !1) : void(Pt(), o("#vsl-css-vi").attr(
                        "data-current-type", E()), o(".view-media-line").tooltip("destroy"), o(
                        ".selector-group:not([data-view-size='desktop']) .view-media-line").tooltip({
                        placement: "bottom",
                        template: "<div class=\"tooltip small-tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
                        container: "#vsl-css-co",
                        delay: {
                                show: 50,
                                hide: 0
                        }
                }))
        }

        function Nt(e) {
                (null == e || null == e) && (e = E());
                for (var t = {
                                selectors: [],
                                rules: []
                        }, a = window.ypData["wyp-need-to-process"], n = 0, s; n < an.styleSheets.length; n++) {
                        var r;
                        try {
                                r = o(an.styleSheets[n].ownerNode)
                        } catch (t) {
                                continue
                        }
                        if (!1 == a) {
                                if (r.hasClass("wyp-inline-data") && r.attr("data-source-mode") == e) {
                                        s = an.styleSheets[n];
                                        break
                                }
                        } else if (r.hasAttr("id") && "wyp-live-css-data" == r.attr("id") && e == E()) {
                                s = an.styleSheets[n];
                                break
                        }
                }
                if (J(s)) return t;
                var l, d, p, c, u;
                for (n = 0; n < s.cssRules.length; n++)
                        if (l = s.cssRules[n], d = l.selectorText, J(d) || (t.selectors.push(d), t.rules.push(l.style.length)), u = l.conditionText, !J(
                                        u))
                                for (var m = 0; m < l.cssRules.length; m++)(p = l.cssRules[m], c = p.selectorText, !J(c)) && (t.selectors.push(c), t
                                        .rules.push(p.style.length));
                return t
        }

        function Ht(e, t) {
                if (!C()) return !1;
                var n = Nt(t).selectors;
                if (!1 != n && null != n && 0 < n.length) {
                        for (var s = a(t, !1), o = 0, l, d; o < n.length; o++)
                                if (l = xi(n[o], !0, !0, !0, !0), d = Ca(l, !0, !1, !1), !1 != d) {
                                        if (!0 === e) {
                                                if (0 == getGi().find(l).parents(".wyp-selected").length) continue;
                                        } else if (!1 == getGi().find(l).hasClass("wyp-selected")) continue;
                                        s = u(s, "[selector=" + gi(Xe(n[o])) + "]")
                                } r(s, t), Mi(), we()
                }
        }

        function Wt(e) {
                e = e.toString(), e = e.replace(/ms/g, "");
                var t = 0,
                        a;
                if (-1 != e.indexOf(",")) {
                        for (var n = e.split(","), s = 0, o; s < n.length; s++) o = n[s], -1 == o.indexOf(".") ? o = o.replace(/s/g, "000") : (a =
                                parseFloat(o).toString().split(".")[1].length, o = o.replace(".", "").toString(), 2 == a ? o = o.replace(/s/g,
                                        "0") : 1 == a && (o = o.replace(/s/g, "00"))), t = parseFloat(t) + parseFloat(o);
                        return t
                }
                return -1 == e.indexOf(".") ? e = e.replace(/s/g, "000") : (a = parseFloat(e).toString().split(".")[1].length, e = e.replace(".", "")
                        .toString(), 2 == a ? e = e.replace(/s/g, "0") : 1 == a && (e = e.replace(/s/g, "00"))), e
        }

        function Ft(e, t, i, n) {
                var s = jQuery.Deferred();
                null == e && (e = _a()), e = xi(e, !0, !0, !0);
                var r = "";
                getTn().hasAttr("data-wyp-selector") && (r = getTn().attr("data-wyp-selector"), e += r), e = Xe(e);
                var l = i[0],
                        d = i[1],
                        c;
                if (t = qt(t)[0], S()) {
                        var u = o(".scene-active").attr("data-scene"),
                                m = getGi().find("#wyp-anim-scenes #" + u + " style[data-rule=\"" + t + "\"]");
                        return (0 < m.length && (c = Vt(m.text())), l) ? 0 != m.length : c ? (!1 == d ? s.resolve(c) : s.resolve("all"), s.promise()) :
                                !l && (s.resolve(!1), s.promise())
                }
                var f = new RegExp("({|s+|;)" + t + "(s+)?:"),
                        g = [],
                        h = [],
                        y, w, v, x, k, C, z, O, D, T, E;
                if (0 < getGi().find("#wyp-live-css-data").length) w = getGi().find("#wyp-live-css-data").text(), v = za(w, !1), w = za(w, !0), x = w.split("}"),
                        y = "all", o.each(x, function(e, a) {
                                if (a += "}", !1 == f.test(a)) return !0;
                                var i = a.match(/\{(.*?)\}$/m)[0].toString().replace(/(^\{|\}$)/g, "").trim();
                                if (D = hi(i.split(";")), o.each(D, function(e, a) {
                                                return "" == a || void(a.split(":")[0].toString().trim() == t && (z = a.replace(
                                                        /^(.*?):(.*?)$/g, "$2").trim()))
                                        }), k = Ut(a), !1 == Ca(k, !0, !1, !1)) return !0;
                                if (C = getGi().find(k), !1 == C.hasClass("wyp-selected")) return !0;
                                if ("" != r && -1 == k.indexOf(".yp-selector-"))
                                        if (-1 != k.indexOf("yp_hover") && -1 != r.indexOf("hover"));
                                        else if (-1 != k.indexOf("yp_focus") && -1 != r.indexOf("focus"));
                                else return !0;
                                g.push(y), h.push(k + "{" + t + ":" + z + "}")
                        }), O = v.match(/@media(.*?){(.*?)}}/g), null != O && o.each(O, function(e, a) {
                                if (y = o.trim(a.match(/@media(.*?){/g).toString().replace(/(\{|@media(\s+)?)/g, "")), "desktop" == y && (y =
                                                "all"), !nn.matchMedia(y).matches) return !0;
                                if (A())
                                        if (0 < o(".breakpoint-bar .focus").length) {
                                                var i = Ya(y),
                                                        n = Ya(o(".breakpoint-bar .focus").attr("data-breakpoint-data"));
                                                if (!1 !== i && !1 !== n && i != n) return !0
                                        } else if (0 == o(".breakpoint-bar .focus").length) return !0;
                                a = a.match(/\{(.*?)\}$/g)[0].toString().replace(/(^\{|\}\}$)/g, "").trim() + "}", x = a.split("}"), o.each(x,
                                        function(e, a) {
                                                if (a += "}", !1 == f.test(a)) return !0;
                                                var i = a.match(/\{(.*?)\}$/m)[0].toString().replace(/(^\{|\}$)/g, "").trim();
                                                if (D = hi(i.split(";")), o.each(D, function(e, a) {
                                                                return "" == a || void(a.split(":")[0].toString().trim() == t &&
                                                                        (z = a.replace(/^(.*?):(.*?)$/g, "$2").trim()))
                                                        }), k = Ut(a), !1 == Ca(k, !0, !1, !1)) return !0;
                                                if (C = getGi().find(k), !1 == C.hasClass("wyp-selected")) return !0;
                                                if ("" != r && -1 == k.indexOf(".yp-selector-"))
                                                        if (-1 != k.indexOf("yp_hover") && -1 != r.indexOf("hover"));
                                                        else if (-1 != k.indexOf("yp_focus") && -1 != r.indexOf("focus"));
                                                else return !0;
                                                g.push(y), h.push(k + "{" + t + ":" + z + "}")
                                        })
                        });
                else {
                        void 0 === n && (n = a(null, !1));
                        var L = p(n, "[rule=" + t + "]");
                        if (0 < L.length)
                                for (E = 0; E < L.length; E++)
                                        if (w = L[E], y = /\[msize\=(.*?)\]/g.exec(w)[1], "desktop" == y && (y = "all"), !!nn.matchMedia(y).matches) {
                                                if (A())
                                                        if (0 < o(".breakpoint-bar .focus").length) {
                                                                var B = Ya(y),
                                                                        M = Ya(o(".breakpoint-bar .focus").attr("data-breakpoint-data"));
                                                                if (!1 !== B && !1 !== M && B != M) continue
                                                        } else if (0 == o(".breakpoint-bar .focus").length) continue;
                                                if ((w = jt(w), k = Ut(w), !1 != Ca(k, !0, !1, !1)) && (C = getGi().find(k), !1 != C.hasClass(
                                                                "wyp-selected"))) {
                                                        if ("" != r && -1 == k.indexOf(".yp-selector-"))
                                                                if (-1 != k.indexOf("yp_hover") && -1 != r.indexOf("hover"));
                                                                else if (-1 != k.indexOf("yp_focus") && -1 != r.indexOf("focus"));
                                                        else continue;
                                                        k == Ut(h[E]) && h.pop(), g.push(y), h.push(w)
                                                }
                                        }
                }
                if (0 == h.length) return !l && (s.resolve(!1), s.promise());
                if (l) {
                        var Z = !1,
                                P, R;
                        for (E = 0; E < g.length; E++)
                                if (!(nn.matchMedia(g[E]).matches && "all" != g[E])) "all" == g[E] && !1 == A() && (Z = !0);
                                else if (P = Ya(Fe()), R = Ya(g[E]), !1 !== P && !1 !== R && P == R) {
                                Z = !0;
                                break
                        }
                        return Z
                }
                if (0 < h.length) {
                        var I = "<style id=\"wyp-calcature-style\">" + _a() + "{outline:unset;}",
                                Y;
                        o.each(h, function(e, a) {
                                "all" != g[e] && (I += "@media " + g[e] + "{"), Y = /\!important/g.test(a) ? " !important" : "",
                                        /\:(.*?);/g.test(a) ? I += a.replace(/\:(.*?);/g, ":" + (e + 1) + "px solid transparent" + Y +
                                                ";") : /\:(.*?)}/g.test(a) && (I += a.replace(/\:(.*?)}/g, ":" + (e + 1) +
                                                "px solid transparent" + Y + ";}").replace("}}", "}")), I = I.replace("{" + t + ":",
                                                "{outline:"), "all" != g[e] && (I += "}")
                        }), I += "</style>", getJi().append(I)
                }
                return setTimeout(function() {
                        if (T = 0 < h.length && void 0 !== _() ? parseInt(_().css("outline-width")) - 1 : -1, !1 != d) 0 > T ? s
                                .resolve(!1) : s.resolve(g[T]);
                        else if (0 > T) s.resolve(_().css(t));
                        else {
                                var e = Vt(h[T]);
                                null == e || null == e || !1 == e ? s.resolve(_().css(t)) : -1 == e.indexOf("var(--") ? s.resolve(e) : s
                                        .resolve(_().css(t))
                        }
                        0 < h.length && getJi().find("#wyp-calcature-style").remove()
                }, window.YellowDelay), s.promise()
        }

        function jt(e) {
                if (null === e || void 0 === e || "" === e) return !1;
                var t = e.replace(/(\/\*|^)(.*?)\*\//g, "");
                return -1 != t.indexOf("@media") && (t = t.trim().match(/\{(.*?)\}$/g).toString().replace(/(^\{|\}$)/g, "")), t.trim()
        }

        function Xt(e) {
                if (null === e || void 0 === e || "" === e) return !1;
                var t;
                if (e = e.replace(/(\/\*|^)(.*?)\*\//g, ""), -1 != e.indexOf("@media")) {
                        if (null == e.split("{")[2]) return "";
                        t = e.split("{")[2].split("}")[0]
                } else {
                        if (null == e.split("{")[1]) return "";
                        t = e.split("{")[1].split("}")[0]
                }
                return t = t.trim().replace(/(\s+)?\;$/g, ""), t.trim()
        }

        

        

        function qt(e) {
                var t = null;
                return e = e.replace(/\-webkit\-/g, ""), -1 != e.indexOf("-transform") && "text-transform" != e ? (t = e.replace(/-transform/g, ""), e =
                                "transform", t = t.replace(/\-/g, "")) : -1 == e.indexOf("-backdrop-filter") ? -1 != e.indexOf("-filter") && -1 === e
                        .indexOf("backdrop-filter") ? (t = e.replace(/-filter/g, ""), e = "filter") : -1 == e.indexOf("box-shadow-") ?
                        "justify-content1" == e && (e = "justify-content") : (t = e.replace(/box-shadow-/g, ""), e = "box-shadow") : (t = e.replace(
                                /-backdrop-filter/g, ""), e = "backdrop-filter"), [e, t]
        }

        function $t(e, t, i) {
                var n = [e, t, i].map(function(e) {
                        return e /= 255, .03928 >= e ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4)
                });
                return .2126 * n[0] + .7152 * n[1] + .0722 * n[2]
        }

        function Gt(e, t) {
                var a = ($t(e[0], e[1], e[2]) + .05) / ($t(t[0], t[1], t[2]) + .05);
                return 1 > a && (a = ($t(t[0], t[1], t[2]) + .05) / ($t(e[0], e[1], e[2]) + .05)), a.toFixed(2)
        }

        function Kt(e, t) {
                return -1 != e.indexOf("#") && (e = Ri(e)), -1 != t.indexOf("#") && (t = Ri(t)), e = e.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(","),
                        t = t.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(","), Gt([e[0], e[1], e[2]], [t[0], t[1], t[2]])
        }

        function Jt(e, t) {
                var a, i, n;
                return e.parents().each(function() {
                        return (n = o(this), i = n.css("background-image"), a = n.css("background-color"), "none" == i) && (
                                "rgba(0, 0, 0, 0)" == a || "rgba(0,0,0,0)" == a || "transparent" == a || (t = n.css(
                                        "background-color"), !1))
                }), t
        }

        function Qt(e, t) {
                var a = t.a,
                        i = "rgb(";
                return i += parseInt((1 - a) * e.r + a * t.r) + ", ", i += parseInt((1 - a) * e.g + a * t.g) + ", ", i += parseInt((1 - a) * e.b + a * t
                        .b), i += ")", i
        }

        function ea() {
                var e = _(),
                        t = parseFloat(e.css("font-size"));
                isNaN(t) && (t = 0);
                var a = "<span class='accessibility-pass-badge'>" + t + "px<i class='yicon icon-yes'></i></span>";
                return 12 >= t && (a = "<span class='accessibility-fail-badge'>" + t + "px<i class='yicon icon-no-alt'></i></span>"), a
        }

        function ta(e) {
                var t = parseFloat(e.css("line-height"));
                return "normal" == t && (t = Math.round(1.33333333333 * parseFloat(e.css("font-size")))), parseFloat(t)
        }

        function aa() {
                var e = _(),
                        t = parseFloat(e.css("font-size"));
                isNaN(t) && (t = 0);
                var a = ta(e) / t,
                        i = parseFloat(100 / parseFloat(t) / 20),
                        n = Math.ceil(10 * parseFloat(i / 1.2 + 1)) / 10,
                        s = Math.ceil(10 * parseFloat(i / 1.2 + 1.6)) / 10;
                a = a.toFixed(2);
                var o = "<span class='accessibility-pass-badge'>" + a + "<i class='yicon icon-yes'></i></span>";
                return a < n && (o = "<span class='accessibility-fail-badge'>" + a + "<i class='yicon icon-no-alt'></i></span>"), a > s && (o =
                        "<span class='accessibility-fail-badge'>" + a + "<i class='yicon icon-no-alt'></i></span>"), o
        }

        function ia() {
                var e = _(),
                        t = e.css("color"),
                        a = e.css("background-color");
                if ("none" != e.css("background-image")) return "<span class='accessibility-unknown-badge'>Unknown</span>";
                if (("rgba(0, 0, 0, 0)" == a || "rgba(0,0,0,0)" == a || "transparent" == a) && (a = "transparent", "fixed" != e.css("position") &&
                                "absolute" != e.css("position") && (a = Jt(e, a)), "transparent" == a))
                return "<span class='accessibility-unknown-badge'>Unknown</span>";
                if (-1 != a.indexOf("rgba") && 0 < e.parent().length && "none" == e.css("background-image")) {
                        var i, n, s, o;
                        if (i = a.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(","), n = e.parent().css("background-color"), ("rgba(0, 0, 0, 0)" == n ||
                                        "rgba(0,0,0,0)" == n || "transparent" == n) && (n = "transparent", n = Jt(e, n)), "transparent" != n && -1 == n
                                .indexOf("rgba")) {
                                var r = n.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",");
                                s = {
                                        r: i[0],
                                        g: i[1],
                                        b: i[2],
                                        a: i[3]
                                }, o = {
                                        r: r[0],
                                        g: r[1],
                                        b: r[2]
                                }, a = Qt(o, s)
                        }
                }
                if (-1 != t.indexOf("rgba") && -1 == a.indexOf("rgba")) {
                        var l, d, p, c;
                        l = t.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(","), d = a.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(","), p = {
                                r: l[0],
                                g: l[1],
                                b: l[2],
                                a: l[3]
                        }, c = {
                                r: d[0],
                                g: d[1],
                                b: d[2]
                        }, t = Qt(c, p)
                }
                var u = Kt(t, a),
                        m = parseInt(e.css("font-size"));
                isNaN(m) && (m = 0);
                var f = "<span class='accessibility-pass-badge'>" + u + "<i class='yicon icon-yes'></i></span>";
                return 4.5 > u && 18.66 > m && (f = "<span class='accessibility-fail-badge'>" + u + "<i class='yicon icon-no-alt'></i></span>"), 3 >
                        u && 18.66 < m && (f = "<span class='accessibility-fail-badge'>" + u + "<i class='yicon icon-no-alt'></i></span>"), f
        }

        function na(e) {
                return "text-decoration-line" == e && (e = "text-decoration"), "overflow-wrap" == e && (e = "word-wrap"), e
        }

        function sa() {
                if (C()) {
                        o(".wyp-group-edited").removeClass("wyp-group-edited"), o(".reset-enable").removeClass("reset-enable"), Ke(), o(
                                        ".property-responsive").removeClass("property-responsive"), getTn().removeClass("node-has-other-screen-edits"), getTn()
                                .removeAttr("node-edits-screen");
                        var e = getTn().hasClass("property-responsive-open"),
                                t = null,
                                n, s, r, l;
                        if (e && (t = o(".mo-i.active").parents(".op-g").attr("data-css")), !1 == S()) {
                                var d, p, c;
                                p = _a(!0), p = Xe(p), c = E();
                                for (var u = window.ypData["wyp-need-to-process"], m = 0; m < an.styleSheets.length; m++) {
                                        var f;
                                        try {
                                                f = o(an.styleSheets[m].ownerNode)
                                        } catch (t) {
                                                continue
                                        }
                                        if (!1 == u) {
                                                if (f.hasClass("wyp-inline-data") && f.attr("data-source-mode") == c) {
                                                        d = an.styleSheets[m];
                                                        break
                                                }
                                        } else if (f.hasAttr("id") && "wyp-live-css-data" == f.attr("id")) {
                                                d = an.styleSheets[m];
                                                break
                                        }
                                }
                                var g, h, y, w, v, _;
                                if (void 0 !== d)
                                        for (m = 0; m < d.cssRules.length; m++) {
                                                if (h = d.cssRules[m], w = h.selectorText, !J(w)) {
                                                        var k = p;
                                                        if (-1 != w.indexOf("yp_hover") && -1 != p.indexOf("yp-selector-hover") && (p = p.replace(
                                                                        /\.yp-selector-hover/g, "")), -1 != w.indexOf("yp_focus") && -1 != p.indexOf(
                                                                        "yp-selector-focus") && (p = p.replace(/\.yp-selector-focus/g, "")), w = w
                                                                .replace(/(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)focus|yp(-|_)click)/g, ""), !1 ==
                                                                Ca(w, !0, !1, !1)) continue;
                                                        if (_ = getGi().find(w), !1 == _.hasClass("wyp-selected")) continue;
                                                        if (!1 == Ge(p, w)) continue;
                                                        p = k
                                                }
                                                if (g = h.conditionText, !J(g)) {
                                                        for (var z = 0; z < h.cssRules.length; z++)
                                                                if ((y = h.cssRules[z], v = y.selectorText, !J(v)) && (v = v.replace(
                                                                                /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)focus|yp(-|_)click)/g,
                                                                                ""), !1 != Ca(v, !0, !1, !1)) && (_ = getGi().find(v), !1 != _.hasClass(
                                                                                "wyp-selected")) && !1 != Ge(p, v))
                                                                        for (r = o.map(y.style, function(e) {
                                                                                        return [e]
                                                                                }), n = 0; n < r.length; n++)
                                                                                if (r[n] = na(r[n]), l = y.style[r[n]], "--animation-trigger-repeat" ==
                                                                                        r[n] && (l = y.style.getPropertyValue(
                                                                                                "--animation-trigger-repeat")), !ra(r, n, l, y.style)) {
                                                                                        r[n] = r[n].replace(/\-passed/g, ""), s = o("#" + r[n] +
                                                                                                "-group");
                                                                                        var O, D;
                                                                                        if (A()) {
                                                                                                D = Ya(g);
                                                                                                var T = "",
                                                                                                        L = o(".breakpoint-bar .focus");
                                                                                                T = 0 < L.length ? "max-width" == o(".media-control")
                                                                                                        .attr("data-code") ? T + "<" + L.attr(
                                                                                                                "data-breakpoint") : T + ">" + L.attr(
                                                                                                                "data-breakpoint") : "max-width" == o(
                                                                                                                ".media-control").attr("data-code") ?
                                                                                                        T + "<" + parseInt(o("#iframe").width()) : T +
                                                                                                        ">" + parseInt(o("#iframe").width()), !1 !==
                                                                                                        D && !1 !== T && (D = D, T = T.toString(), D ==
                                                                                                                T ? (s.addClass("reset-enable"), Je(r[
                                                                                                                                n]), s.parents("li")
                                                                                                                        .find("h3").addClass(
                                                                                                                                "wyp-group-edited")) : -
                                                                                                                1 == r[n].indexOf("box-shadow") && (s
                                                                                                                        .addClass(
                                                                                                                        "property-responsive"), getTn()
                                                                                                                        .addClass(
                                                                                                                                "node-has-other-screen-edits"
                                                                                                                                ), O = getTn().attr(
                                                                                                                                "node-edits-screen"),
                                                                                                                        void 0 !== O && -1 === O
                                                                                                                        .indexOf(D) ? O += "," + D : O =
                                                                                                                        D, getTn().attr("node-edits-screen",
                                                                                                                                O)))
                                                                                        } else s.addClass("property-responsive"), getTn().addClass(
                                                                                                        "node-has-other-screen-edits"), O = getTn().attr(
                                                                                                        "node-edits-screen"), void 0 !== O && -1 === O
                                                                                                .indexOf(D) ? O += "," + D : O = D, getTn().attr(
                                                                                                        "node-edits-screen", O);
                                                                                        var B = Ya(g);
                                                                                        !1 !== B && t == r[n] && o(
                                                                                                "#property-responsive-menu .pr-res-ite[data-responsive-size='" +
                                                                                                B + "']").attr("data-info", "Edited")
                                                                                }
                                                } else
                                                        for (r = o.map(h.style, function(e) {
                                                                        return [e]
                                                                }), n = 0; n < r.length; n++)(r[n] = na(r[n]), l = h.style[r[n]],
                                                                "--animation-trigger-repeat" == r[n] && (l = h.style.getPropertyValue(
                                                                        "--animation-trigger-repeat")), !ra(r, n, l, h.style)) && (r[n] = r[n]
                                                                .replace(/\-passed/g, ""), s = o("#" + r[n] + "-group"), t == r[n] && o(
                                                                        "#property-responsive-menu .pr-res-ite[data-responsive-size='all']")
                                                                .attr("data-info", "Edited"), A() && -1 == r[n].indexOf("-box-shadow") && (s
                                                                        .addClass("property-responsive"), getTn().addClass(
                                                                                "node-has-other-screen-edits")), A() || (s.addClass(
                                                                        "reset-enable"), Je(r[n])), !1 == A() && -1 == r[n].indexOf(
                                                                        "-box-shadow") && s.parents("li").find("h3").addClass(
                                                                        "wyp-group-edited"))
                                        }
                        } else {
                                var M, Z, P;
                                P = o(".scene-active").attr("data-scene"), M = getGi().find("#wyp-anim-scenes #" + P + " style"), r = [];
                                var R = [];
                                for (M.each(function() {
                                                return Z = o(this), l = Z.text(), !!J(l) || void(r.push(qt(Z.attr("data-rule"))[0]), R.push(Vt(
                                                        l)))
                                        }), n = 0; n < r.length; n++) - 1 == r[n].indexOf("-passed") && (l = R[n], ra(r, n, l, R)) || (r[n] = r[n]
                                        .replace(/\-passed/g, ""), s = o("#" + r[n] + "-group"), s.addClass("reset-enable"), Je(r[n]), -1 == r[
                                                n].indexOf("-box-shadow") && s.parents("li").find("h3").addClass("wyp-group-edited"))
                        }
                }
        }

        function oa(e, t, a, i) {
                if (-1 == t.indexOf("border-" + i + "-passed") && (e == "border-top-" + i || e == "border-right-" + i || e == "border-bottom-" + i ||
                                e == "border-left-" + i) && a["border-top-" + i] == a["border-left-" + i] && a["border-right-" + i] == a[
                                "border-bottom-" + i] && a["border-top-" + i] == a["border-bottom-" + i] && t.push("border-" + i + "-passed"), -1 != t
                        .indexOf("border-" + i + "-passed")) {
                        if (e == "border-top-" + i) return !0;
                        if (e == "border-left-" + i) return !0;
                        if (e == "border-right-" + i) return !0;
                        if (e == "border-bottom-" + i) return !0
                } else e == "border-top-" + i && t.push("border-top-" + i + "-passed"), e == "border-left-" + i && t.push("border-left-" + i +
                        "-passed"), e == "border-right-" + i && t.push("border-right-" + i + "-passed"), e == "border-bottom-" + i && t.push(
                        "border-bottom-" + i + "-passed")
        }

        function ra(e, t, a, i) {
                var n = e[t];
                if (-1 == n.indexOf("-passed")) {
                        if (J(a)) return !0;
                        a = a.replace(/(^|\s)(scale\(1\)|rotate\(0deg\)|rotatex\(0deg\)|rotatey\(0deg\)|rotatez\(0deg\)|translatex\(0px\)|translatey\(0px\)|skewx\(0deg\)|skewy\(0deg\)|blur\(0px\)|brightness\(1\)|contrast\(1\)|grayscale\(0\)|invert\(0\)|hue-rotate\(0deg\)|saturate\(1\)|sepia\(0\))/gi,
                                "");
                        for (var s = ["style", "width", "color"], r = 0; r < s.length; r++)
                                if (oa(n, e, i, s[r])) return !0;
                        if ("background-repeat-x" == n || "background-repeat-y" == n) return e.push("background-repeat"), !0;
                        if ("overflow-x" == n || "overflow-y" == n) return e.push("overflow-passed"), !0;
                        if ("flex-grow" == n || "flex-basis" == n || "flex-shrink" == n) return e.push("flex-passed"), !0;
                        if ("transform" == n && "none" != a) return /scale\(/gi.test(a) && e.push("scale-" + n + "-passed"), /rotate\(/gi.test(a) && e
                                .push("rotate-" + n + "-passed"), /rotatex\(/gi.test(a) && e.push("rotatex-" + n + "-passed"), /rotatey\(/gi
                                .test(a) && e.push("rotatey-" + n + "-passed"), /rotatez\(/gi.test(a) && e.push("rotatez-" + n + "-passed"),
                                /translatex\(/gi.test(a) && e.push("translate-x-" + n + "-passed"), /translatey\(/gi.test(a) && e.push(
                                        "translate-y-" + n + "-passed"), /skewx\(/gi.test(a) && e.push("skew-x-" + n + "-passed"), /skewy\(/gi
                                .test(a) && e.push("skew-y-" + n + "-passed"), !0;
                        if ("filter" == n && "none" != a) return /blur\(/gi.test(a) && e.push("blur-" + n + "-passed"), /brightness\(/gi.test(a) && e
                                .push("brightness-" + n + "-passed"), /contrast\(/gi.test(a) && e.push("contrast-" + n + "-passed"),
                                /grayscale\(/gi.test(a) && e.push("grayscale-" + n + "-passed"), /invert\(/gi.test(a) && e.push("invert-" + n +
                                        "-passed"), /hue-rotate\(/gi.test(a) && e.push("hue-rotate-" + n + "-passed"), /saturate\(/gi.test(a) &&
                                e.push("saturate-" + n + "-passed"), /sepia\(/gi.test(a) && e.push("sepia-" + n + "-passed"), !0;
                        if ("backdrop-filter" == n && "none" != a) return /blur\(/gi.test(a) && e.push("blur-" + n + "-passed"), /brightness\(/gi.test(
                                        a) && e.push("brightness-" + n + "-passed"), /contrast\(/gi.test(a) && e.push("contrast-" + n +
                                        "-passed"), /grayscale\(/gi.test(a) && e.push("grayscale-" + n + "-passed"), /invert\(/gi.test(a) && e
                                .push("invert-" + n + "-passed"), /hue-rotate\(/gi.test(a) && e.push("hue-rotate-" + n + "-passed"),
                                /saturate\(/gi.test(a) && e.push("saturate-" + n + "-passed"), /sepia\(/gi.test(a) && e.push("sepia-" + n +
                                        "-passed"), !0;
                        if ("box-shadow" == n) {
                                var l, d;
                                if (l = o("#wyp-box-shadow-color").val(), null != l && "" != l && -1 != l.indexOf("#") && (l = Ri(l)), d = Ri(Pi(da(
                                                "color"))), null != l && (l = l.replace(/\s+/g, "")), null != d && (d = d.replace(/\s+/g, "")), l !=
                                        d && (a = a.replace(/(rgba\(0\,0\,0\,0\)|rgba\(0\, 0\, 0\, 0\))/g, ""), (-1 != a.indexOf("#") || -1 != a
                                                .indexOf("rgb")) && e.push(n + "-color-passed")), -1 == a.indexOf("inset") ? "none" == a && o(
                                                "#box-shadow-inset-inset").parent().hasClass("active") && e.push(n + "-inset-passed") : e.push(n +
                                                "-inset-passed"), "none" != a) {
                                        var p = o.trim(a.replace(/rgb(.*?)\((.*?)\) /g, "").replace(/ rgb(.*?)\((.*?)\)/g, "").replace(/inset /g, "")
                                                .replace(/ inset/g, ""));
                                        0 != mi(p.split(" ")[0]) && e.push(n + "-horizontal-passed"), 0 != mi(p.split(" ")[1]) && e.push(n +
                                                "-vertical-passed"), 0 != mi(p.split(" ")[2]) && e.push(n + "-blur-radius-passed"), 0 != mi(p
                                                .split(" ")[3]) && e.push(n + "-spread-passed")
                                }
                                return !0
                        }
                }
        }

        function la(e) {
                var t = [],
                        a, i;
                e.find(".this-grid-input").each(function() {
                        a = o(this).val().trim(), i = o(this).next().find(".grid-format").val().trim(), "auto" == i || "" == a ? t.push(
                                "auto") : t.push(a + i)
                }), t = t.join(" "), e.parent().find(".gr-bu-in").val(t).trigger("keyup"), o.throttle(Be(), 32)
        }

        

        function pa(e, t, i) {
                void 0 === t && (t = _a());
                var n;
                n = i && i.element ? i.element : _(), ("animation-name" == e || "animation-duration" == e || "animation-delay" == e) && n.addClass(
                        "yp_onscreen yp_hover yp_click yp_focus");
                var s = qt(e),
                        r = s[0],
                        l = s[1],
                        d;
                d = i && i.size ? i.size : Fe();
                var c = "",
                        u;
                u = i && i.styles ? i.styles : a(null, !0), 0 < p(u, "[selector=" + gi(t + ".yp_onscreen") + "][msize=" + d + "]").length && (c =
                                "yp_onscreen"), 0 < p(u, "[selector=" + gi(t + ".yp_click") + "][msize=" + d + "]").length && (c = "yp_click"), 0 < p(u,
                                "[selector=" + gi(t + ".yp_hover") + "][msize=" + d + "]").length && (c = "yp_hover"), 0 < p(u, "[selector=" + gi(t +
                                ".yp_focus") + "][msize=" + d + "]").length && (c = "yp_focus"), getJi().hasClass("yp-selector-hover") && "" == c && (c =
                                "yp_hover"), getJi().hasClass("yp-selector-focus") && "" == c && (c = "yp_focus"), (J(c) || "" == c) && (c = "yp_onscreen"),
                        "cursor" == e && getJi().addClass("wyp-imp-chk");
                var m = "",
                        f = Ft(t, e, [!1, !1], u);
                f.always(function(s) {
                        !1 !== s && (m = s);
                        var d = qt(e)[0];
                        ("color" == e || "background-color" == e || "background-image" == e || "box-shadow" == d || "border-color" ==
                                e || "text-shadow" == e || -1 != d.indexOf("-radius") || "filter" == d || "backdrop-filter" == d) && n
                                .addClass("wyp-no-wf");
                        var f, g;
                        "animation-play" != e && "border-width" != e && "border-color" != e && "border-style" != e && (f = da(r, n), g =
                                        mi(f)), Ft(t, e, [!0, !1], u) && ("inherit" == m || "auto" == m || "unset" == m || "auto" ==
                                        m || "initial" == m ? (f = da(r, n), g = mi(f)) : (f = m, g = mi(f))), J(f) && (f = "", g = mi(
                                        "")), setTimeout(function() {
                                        "cursor" == e && getJi().removeClass("wyp-imp-chk")
                                }, window.YellowDelay), ("top" == e || "left" == e) && "auto" == f && (f = "0px", g = 0),
                                "border-type" == e && !1 == o("#border-type-group").find(".ra.active").length && (f = "all"),
                                "background-type" == e && !1 == o("#background-type-group").find(".ra.active").length && (f =
                                        "background");
                        var h;
                        if ("display" == e) {
                                if (getTn().removeClass("wyp-flex-container wyp-grid-element wyp-flex-element"), h = da("display", n), (
                                                "flex" == h || "inline-flex" == h) && getTn().addClass("wyp-flex-container"), ("grid" == h ||
                                                "inline-grid" == h) && getTn().addClass("wyp-grid-element"), 0 < n.parent().length) {
                                        var y = n.parent().css("display");
                                        ("flex" == y || "inline-flex" == y) && getTn().addClass("wyp-flex-element")
                                }
                                setTimeout(function() {
                                        o.throttle(Be(), 32)
                                }, window.YellowDelay)
                        }
                        "column-count" == e && 0 == g && (g = 1), "spacing-type" == e && !1 == o("#spacing-type-group").find(
                                        ".ra.active").length && (f = "padding"), "transform-type" == e && !1 == o(
                                        "#transform-type-group").find(".ra.active").length && (f = "move"), "filter-type" == e && !1 ==
                                o("#filter-type-group").find(".ra.active").length && (f = "color-effects"), "motion-type" == e && !1 ==
                                o("#motion-type-group").find(".ra.active").length && (f = "animation");
                        var w = fi(f).replace(/(\.|\,)/g, "");
                        ("rgba(0, 0, 0, 0)" == f || "rgba(0,0,0,0)" == f) && (f = "transparent");
                        var v;
                        if ("border-style" == e && null == f && (f = "solid", v = da("borderTopStyle", n), v == da("borderLeftStyle",
                                        n) && v == da("borderRightStyle", n) && v == da("borderBottomStyle", n) && (f = v)),
                                "border-width" == e && null == f && (f = "0px", g = 0, v = da("borderTopWidth", n), v == da(
                                        "borderLeftWidth", n) && v == da("borderRightWidth", n) && v == da("borderBottomWidth",
                                        n) && (f = v, g = mi(v))), "border-color" == e && null == f && (f = da("color", n), v = da(
                                                "borderTopColor", n), v == da("borderLeftColor", n) && v == da("borderRightColor", n) &&
                                        v == da("borderBottomColor", n) && (f = v)), "margin-left" == e || "margin-right" == e) {
                                var x = getGi().width(),
                                        _ = parseFloat(da("marginLeft", n)),
                                        k = parseFloat(da("width", n));
                                x == 2 * _ + k && 0 < _ ? (f = "auto", g = 0) : 0 < n.parent().length && parseFloat(n.parent()
                                .width()) == 2 * _ + k && 0 < _ && (f = "auto", g = 0)
                        }
                        if ("text-align" == e && "start" == f && (f = "left"), "animation-play" == e && (f = c, "yp_onscreen" == c ||
                                        "yp-onscreen" == c ? o("#--animation-trigger-repeat-group").addClass("hidden-option") : o(
                                                "#--animation-trigger-repeat-group").removeClass("hidden-option")),
                                "--animation-trigger-repeat" == e && "" == f && (f = "1", g = 1), "animation-name" == e && "none" !=
                                f && "animationGeneratorTestAnimate" != f) {
                                window.ypData["wyp-force-hide-select-ui"] = !0, getJi().addClass("wyp-hid-bor-n"), o(".anim-player-icon")
                                        .removeClass("icon-controls-play").addClass("icon-controls-pause");
                                var C = n.css("animationDuration"),
                                        z = n.css("animationDelay"),
                                        O = ft(C, z);
                                z = !1 === O ? J(z) ? 0 : Wt(z) : O, C = J(C) ? 1e3 : Wt(C), C = parseFloat(C) + parseFloat(z), 0 ===
                                        C && (C = 1e3), C += 100, Yi(), window.animationTimer2 = setTimeout(function() {
                                                window.ypData["wyp-force-hide-select-ui"] = void 0, getJi().removeClass(
                                                                "wyp-hid-bor-n"), Ni(), Ze(), o(".anim-player-icon")
                                                        .removeClass("icon-controls-pause").addClass("icon-controls-play"), !
                                                        1 == window.ypData["wyp-if-movleav"] && setTimeout(function() {
                                                                We(200)
                                                        }, 300)
                                        }, C)
                        }
                        if ("text-shadow" == e && o("#wyp-text-shadow").css(e, f), "filter" == r && ((null === f || "none" == f ||
                                                void 0 === f) && (f = da("-webkit-filter", n)), "none" != f && null !== f && void 0 !==
                                        f ? (f = f.match(new RegExp(l + "\\((.*?)\\)", "g")), K(f) ? (f = f.toString().replace("deg",
                                                "").replace("hue-rotate(", "").replace(")", ""), f = mi(f), g = f) : (f =
                                                "disable", g = 0)) : (f = "disable", g = 0)), "backdrop-filter" == r && ((null === f ||
                                                "none" == f || void 0 === f) && (f = da("-webkit-backdrop-filter", n)), "none" != f &&
                                        null !== f && void 0 !== f ? (f = f.match(new RegExp(l + "\\((.*?)\\)", "g")), K(f) ? (f = f
                                                .toString().replace("deg", "").replace("hue-rotate(", "").replace(")", ""), f =
                                                mi(f), g = f) : (f = "disable", g = 0)) : (f = "disable", g = 0)), "font-weight" == e &&
                                ("bolder" == f && (f = "700"), "bold" == f && (f = "600"), "normal" == f && (f = "400"), "lighter" ==
                                        f && (f = "300")), "transform" == r) {
                                f = m;
                                var D = null;
                                if (S()) {
                                        for (var A = parseInt(getTn().attr("data-anim-scene").replace("scene-", "")), T = 0, E; 6 > T; T++)
                                                if (E = getGi().find(".scene-" + (A - T) + " .scenes-transform-style"), 0 < E.length) {
                                                        D = E.last().text();
                                                        break
                                                } null != D && (f = Vt(D))
                                }
                                "none" != f && !1 !== f && void 0 !== f ? (f = f.match(new RegExp(l + "\\((.*?)\\)", "gi")), K(f) ? (f =
                                        f.toString(), f = mi(f), g = f) : (f = "disable", g = 0)) : (f = "disable", g = 0)
                        }
                        if ("animation-duration" == e && !0 === S() && ("0s" == f || "0ms" == f)) return !1;
                        ("min-width" == e || "min-height" == e) && 0 == parseFloat(f) && (f = "auto");
                        var L;
                        if ("bottom" == e && (L = parseInt(parseFloat(da("top", n)) + parseFloat(da("bottom", n))), (0 === L || L ==
                                        parseInt(o("#iframe").height() - n.height())) && (f = "auto")), "right" == e && (L = parseInt(
                                        parseFloat(da("left", n)) + parseFloat(da("right", n))), (0 === L || L == parseInt(o(
                                        "#iframe").width() - n.width())) && (f = "auto")), "box-shadow" == r && "none" != f && null !==
                                f && void 0 !== f) {
                                "box-shadow-color" == e && (!1 == /(rgb|\#)/g.test(f) && (f = "transparent"), -1 == f.indexOf("#") ? -
                                        1 != f.indexOf("rgb") && (f = f.match(/rgb(.*?)\((.*?)\)/g).toString()) : -1 == f.split(
                                                "#")[1].indexOf("inset") ? f = o.trim(f.split("#")[1]) : f = o.trim(f.split(
                                                "#")[1].split(" ")[0]), (-1 != f.indexOf("rgba(0,0,0,0)") || -1 != f.indexOf(
                                                "rgba(0, 0, 0, 0)")) && (f = "transparent"), (-1 != f.indexOf(",rgba") || -1 !=
                                                f.indexOf(",rgb")) && (f = f.split(",")[0]), /\,/g.test(f.replace(
                                                /rgba?\((.*?)\)/g, "")) && (f = f.split(",")[0]));
                                var B = f.replace(/rgb(.*?)\((.*?)\) /g, "").replace(/ rgb(.*?)\((.*?)\)/g, "").replace(/inset /g, "")
                                        .replace(/ inset/g, "");
                                "box-shadow-horizontal" == e && (f = B.split(" ")[0], g = mi(f)), "box-shadow-vertical" == e && (f = B
                                        .split(" ")[1], g = mi(f)), "box-shadow-blur-radius" == e && (f = B.split(" ")[2], g =
                                        mi(f)), "box-shadow-spread" == e && (f = B.split(" ")[3], g = mi(f))
                        }
                        var M;
                        "line-height" == e && "px" == w && (M = parseFloat(da("font-size", n)), isNaN(M) && (M = 0), g /= M, f = g +
                                        "em", w = "em"), "line-height" == e && "normal" == w && (M = parseFloat(da("font-size", n)),
                                        isNaN(M) && (M = 0), M = Math.round(1.33333333333 * M), g = M, f = M + "px", w = "px"),
                                "box-shadow-inset" == e && (J(f) ? f = "no" : -1 == f.indexOf("inset") ? f = "no" : f = "inset");
                        var Z = o("#wyp-" + e),
                                R = Z.parent().parent();
                        void 0 === da(e, n) && 0 < getGi().find("." + r + "-" + e + "-style").length && (f = m, g = mi(f));
                        var I, Y, N;
                        if (Z.hasClass("gr-bu-in")) {
                                Z.val(f);
                                var H = f.split(" "),
                                        W = [];
                                for (N = 0; N < H.length; N++) Math.ceil(10 * parseFloat(H[N])) / 10 == Math.ceil(10 * parseFloat(H[
                                        0])) / 10 && -1 != H[N].indexOf("px") && -1 != H[0].indexOf("px") && W.push("1fr");
                                var F = !0;
                                if (W.length == H.length) {
                                        H = W;
                                        var j = da("grid-auto-rows"),
                                                X = da("grid-auto-columns");
                                        if ("none" != j && "auto" != j && "grid-template-rows" == e) {
                                                for (N = 0; N < H.length; N++) H[N] = j;
                                                F = !1
                                        }
                                        if ("none" != X && "auto" != X && "grid-template-columns" == e) {
                                                for (N = 0; N < H.length; N++) H[N] = X;
                                                F = !1
                                        }
                                } else "none" == H[0] && (H = ["auto"]);
                                var V = R.find(".gr-bu-ar");
                                V.empty(), h = da("display", n);
                                var U = 0;
                                U = "grid" == h ? parseInt(n.width()) : parseInt(n.parent().width());
                                var q = H.length,
                                        $, G;
                                for (N = 0; N < q; N++) {
                                        $ = "", -1 != H[N].indexOf("px") && "0px" != H[N] && "0" != H[N] ? !0 == F ? ($ = 100 / U *
                                                parseFloat(H[N]), $ = Math.floor(100 * $) / 100, G =
                                                "<option value='fr' selected>fr</option><option value='%'>%</option><option value='px'>px</option><option value='auto'>auto</option>"
                                                ) : ($ = parseFloat(H[N]), G =
                                                "<option value='fr'>fr</option><option value='%'>%</option><option value='px' selected>px</option><option value='auto'>auto</option>"
                                                ) : -1 != H[N].indexOf("auto") || "0px" == H[N] || "0" == H[N] ? ($ = "", G =
                                                "<option value='fr'>fr</option><option value='%'>%</option><option value='px'>px</option><option value='auto' selected>auto</option>"
                                                ) : -1 == H[N].indexOf("fr") ? -1 != H[N].indexOf("%") && ($ = parseFloat(H[N]),
                                                G =
                                                "<option value='fr'>fr</option><option value='%' selected>%</option><option value='px'>px</option><option value='auto'>auto</option>"
                                                ) : ($ = parseFloat(H[N]), G =
                                                "<option value='fr' selected>fr</option><option value='%'>%</option><option value='px'>px</option><option value='auto'>auto</option>"
                                                );
                                        var Q = "this-grid";
                                        2 > q && (Q = "this-grid last-grid"), V.append("<div class='" + Q +
                                                        "'><input class='this-grid-input' placeholder='auto' type='number' min='1' value='" +
                                                        $ +
                                                        "' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' /><div class='grid-format-div'><select class='grid-format'>" +
                                                        G + "</select></div><span class='yicon icon-no-alt delete-grid'></span></div>"),
                                                "auto" == V.find(".this-grid").last().find(".grid-format").val() && V.find(".this-grid")
                                                .last().find(".this-grid-input").prop("disabled", !0)
                                }
                                if (V.append("<span class='grid-builder-add-new yicon icon-plus'></span>"), 0 < V.find(".this-grid")
                                        .length && 0 < V.find(".grid-format option[value=\"fr\"][selected]").length) {
                                        var ee = null,
                                                te = !0;
                                        V.find(".grid-format option[value=\"fr\"][selected]").each(function() {
                                                var e = o(this).parents(".this-grid").find(".this-grid-input").val();
                                                return null != ee && ee != e ? (te = !1, !1) : void(ee = e)
                                        }), !0 == te && V.find(".grid-format option[value=\"fr\"][selected]").each(function() {
                                                o(this).parents(".this-grid").find(".this-grid-input").val("1")
                                        })
                                }
                        } else if (Z.hasClass("sl-d")) {
                                if ("animation-duration" == e && -1 != f.indexOf(",") ? (f = "1s", w = "s", g = "1", o(
                                                "#animation-duration-group").addClass("hidden-option")) : "animation-duration" == e &&
                                        o("#animation-duration-group").removeClass("hidden-option"), "animation-delay" == e && -1 != f
                                        .indexOf(",") ? (f = "0s", w = "s", g = "0", o("#animation-delay-group").addClass(
                                                "hidden-option")) : "animation-delay" == e && o("#animation-delay-group").removeClass(
                                                "hidden-option"), ("inline" != da("display", n) || -1 != da("display", n).indexOf(
                                                "table")) && "height" == e && 0 < n.children().length && 12 > n.children().length) {
                                        var ae = da("height", n),
                                                ie;
                                        n.children().each(function() {
                                                if (ie = o(this).css("height"), ae == ie) return f = "auto", !1
                                        })
                                }
                                w = o.trim(w), ("" === w || "px .px" == w || "px px" == w) && (w = "px"), -1 != w.indexOf("px") && (w =
                                                "px"), "" == g && "scale-transform" == e && (g = 1), "" == g && "brightness-filter" ==
                                        e && (g = 1), "" == g && "contrast-filter" == e && (g = 1), "" == g && "saturate-filter" == e &&
                                        (g = 1), "" == g && "brightness-backdrop-filter" == e && (g = 1), "" == g &&
                                        "contrast-backdrop-filter" == e && (g = 1), "" == g && "saturate-backdrop-filter" == e && (g =
                                                1), "" == g && "opacity" == e && (g = 1), "" == g && (g = 0);
                                var se = R.data("px").split(","),
                                        oe = parseInt(se[0]),
                                        re = parseInt(se[1]);
                                if (g < oe && (oe = g), g > re && (re = g), ("width" == e || "max-width" == e || "min-width" == e ||
                                                "height" == e || "min-height" == e || "max-height" == e) && (re = parseInt(re) + 1.5 *
                                                parseInt(re), oe = parseInt(oe) + 1.5 * parseInt(oe)), "inline" != da("display", n)) {
                                        if ("width" == e && 0 < n.parent().length && "px" == w && "inline" != n.parent().css(
                                                "display") && "inline-flex" != n.parent().css("display") && -1 == n.parent().css(
                                                        "display").indexOf("table")) {
                                                var le = n.parent().width();
                                                le == parseInt(g) && (g = "100", w = "%"), parseInt(le / 2) == parseInt(g) && (g = "50",
                                                                w = "%"), parseInt(le / 4) == parseInt(g) && (g = "25", w = "%"),
                                                        parseInt(le / 5) == parseInt(g) && (g = "20", w = "%")
                                        }
                                        "height" == e && parseInt(o(window).height()) == parseInt(g) && "px" == w && (g = "100", w =
                                                "vh")
                                }
                                "%" == w || "vh" == w || "vw" == w ? (se = o("#" + e + "-group").attr("data-pc").split(","), oe = se[0],
                                                re = se[1]) : "em" == w && (se = o("#" + e + "-group").attr("data-em").split(","), oe =
                                                se[0], re = se[1]), g = Math.floor(100 * g) / 100, w = w.replace(/\./g, ""), "px" ==
                                        w && ("width" == e || "height" == e || "min-width" == e || "min-height" == e || "max-width" ==
                                                e || "max-height" == e || "font-size" == e || -1 != e.indexOf("margin-") || -1 != e
                                                .indexOf("padding-") || /border(.*?)?width/g.test(e) || -1 != e.indexOf("-radius") || -
                                                1 != e.indexOf("z-index") || "column-count" == e || "top" == e || "right" == e ||
                                                "bottom" == e || "left" == e) && (g = parseInt(g)), Z.slider({
                                                min: parseInt(oe),
                                                max: parseInt(re),
                                                value: parseFloat(g)
                                        }), Z.slider("value", g);
                                var de = be(R);
                                if (m == de || f == de) {
                                        Z.slider("value", de);
                                        var pe = parseFloat(de);
                                        !1 === isNaN(pe) ? Z.slider("value", pe) : Z.slider("value", 0), o("#" + e + "-value").val(de)
                                                .attr("data-last-val", g), o("#" + e + "-after").val("-")
                                } else Z.slider("value", g), o("#" + e + "-value").val(g), o("#" + e + "-after").val(w);
                                o("#" + e + "-after").hasClass("autogrow") ? o("#" + e + "-after").trigger("autogrow") : o("#" + e +
                                        "-after").autoGrowInput({
                                        minWidth: 15,
                                        maxWidth: 32
                                }).addClass("autogrow")
                        } else if (Z.hasClass("in-ac")) {
                                var ce, ue;
                                "font-family" == e && "undefined" != typeof f && (ce = P(f), ue = f, f = o.trim(f.replace(/"/g, "")
                                        .replace(/'/g, ""))), K(f) && ("font-family" == e && (mt(ue) || !1 == Ft(t,
                                                        "font-family", [!0, !1], u) ? o("#include-webfont-label").css("display",
                                                        "none") : o("#include-webfont-label").css("display", "inline-block"),
                                                Ft(t, "--google-webfont", [!0, !1], u) ? o("#include-webfont-label input").prop(
                                                        "checked", !1) : o("#include-webfont-label input").prop("checked", !0)),
                                        0 === o("#wyp-font-load-" + Wn(ce)).length && "font-family" == e && !1 === mt(ue) && getQi()
                                        .append("<link rel='stylesheet' id='wyp-font-load-" + Wn(ce.replace(/ /g, "+")) +
                                                "'  href='https://fonts.googleapis.com/css2?family=" + ce.replace(/ /g, "+") +
                                                ":ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' type='text/css' media='all' />"
                                                ), Z.val(f), "font-family" == e && o("#wyp-font-family,#wyp-font-weight").each(
                                                function() {
                                                        o(this).css("fontFamily", ue)
                                                })), null === Z.val() && void 0 !== f && Z.val(f)
                        } else if (Z.hasClass("ra-c")) {
                                if ("disable" == f) R.find(".di-btn").trigger("click");
                                else {
                                        if ("background-size" == e && "cover" != f && "contain" != f && (f = "auto"), "flex" == e) {
                                                var me = n.css(["flex-grow", "flex-shrink", "flex-basis"]);
                                                f = me["flex-grow"] + " " + me["flex-shrink"] + " " + me["flex-basis"]
                                        }
                                        pt(Z, e, f)
                                }
                        } else if (Z.hasClass("co-p")) {
                                "box-shadow-color" == e && (void 0 === f || !1 === f || "none" == f || "" == f) && (f = da("color", n));
                                var fe = "rgba(0,0,0,0)";
                                if (K(f) && (-1 == f.indexOf("#") && -1 != f.indexOf("rgb") ? fe = Pi(f) : "transparent" != f &&
                                                "none" != f && "inherit" != f && (fe = f)), Z.val(fe), "transparent" == f || "none" ==
                                        f || "inherit" == f) Z.iris("color", "rgba(0,0,0,0)");
                                else {
                                        Z.iris("color", f);
                                        var ge = 1; - 1 != f.indexOf("rgba") && (ge = f.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",")[
                                                3]), -1 != f.indexOf("rgba") && 0 != ge ? o(".information.hex").removeClass(
                                                "hex").addClass("rgb") : o(".information.rgb").removeClass("rgb").addClass(
                                                "hex")
                                }
                                Z.parent().find(".co-sw-co").css("backgroundColor", fe), ("transparent" == f || "" == f || "none" ==
                                        m) && Z.parent().find(".co-sw-co").css("backgroundColor", "transparent"), "box-shadow-color" ==
                                        e && o("#box-shadow-color-group .co-sw-co").css("backgroundColor", f)
                        } else(Z.hasClass("wyp-input") || Z.hasClass("wyp-textarea")) && ("disable" != f && "background-image" == e &&
                                f != window.location.href && -1 == f.indexOf("gradient(") && -1 == f.indexOf(
                                        "yellow_pencil_frame") ? (I = o(document).find("#iframe").attr("src"), Y = f.replace(
                                                /"/g, "").replace(/'/g, "").replace(/url\(/g, "").replace(/\)/g, ""), I == Y &&
                                        (f = ""), !0 == /url\((\"|\')?(.*?)(\"|\')?\)/i.test(f) && (f = f.match(
                                                /url\((\"|\')?(.*?)(\"|\')?\)/i)[0]), Z.val(f.replace(/"/g, "").replace(/'/g,
                                                "").replace(/url\(/g, "").replace(/\)/g, "")), o(".wyp-bg-ast").removeClass(
                                                "active"), -1 == f.indexOf("yellow-pencil") ? ne(f) : (o(
                                                ".wyp-bg-ast[data-url='" + f.replace(/"/g, "").replace(/'/g, "")
                                                .replace(/url\(/g, "").replace(/\)/g, "") + "']").addClass("active"), o(
                                                ".wyp-background-image-show").hide())) : o(".wyp-background-image-show").hide(),
                                "disable" != f && "list-style-image" == e && f != window.location.href && (I = o(document).find(
                                        "#iframe").attr("src"), Y = f.replace(/"/g, "").replace(/'/g, "").replace(
                                        /url\(/g, "").replace(/\)/g, ""), I == Y && (f = ""), Z.val(f.replace(/"/g, "")
                                        .replace(/'/g, "").replace(/url\(/g, "").replace(/\)/g, ""))), "background-image" ==
                                e && -1 != f.indexOf("gradient(") && (f = zt(f), Z.val(f), o(".wyp-gradient-demo").removeClass(
                                        "active"), 0 < o(".wyp-gradient-demo[data-gradient='" + f + "']").length && o(
                                        ".wyp-gradient-demo[data-gradient='" + f + "']").addClass("active"), Ot(f)), "" == m &&
                                "none" == f && Z.val(""), "" == Z.val() || "none" == Z.val() ? Z.parent().addClass(
                                        "empty-input") : Z.parent().removeClass("empty-input"));
                        ("inherit" == m || "auto" == m || "unset" == m || "auto" == m || "initial" == m) && Z.hasClass("sl-d") && R
                                .find(".wyp-after").hide();
                        var d = qt(e)[0];
                        ("color" == e || "background-color" == e || "background-image" == e || "box-shadow" == d || "border-color" ==
                                e || "text-shadow" == e || -1 != d.indexOf("-radius") || "filter" == d || "backdrop-filter" == d) && n
                                .removeClass("wyp-no-wf")
                })
        }

        function ca(e, t) {
                t = o.trim(t);
                var a = "px";
                return ("animation-delay" == e || "animation-duration" == e || "transition-duration" == e) && (a = "s"), -1 == window.validUnits
                        .indexOf(t) ? a : t
        }

        

        

        

        function ga(e, t) {
                if ("cursor" === window.ypData.inspector) {
                        if (/\(\!singleInspector\)/g.test(e)) return !1;
                        e = e.replace(/\(\!singleInspector\)/g, "")
                } else {
                        if (/\(singleInspector\)/g.test(e)) return !1;
                        e = e.replace(/\(singleInspector\)/g, "")
                }
                e = e.replace(/\(\!?singleInspector\)/g, "");
                var a = new RegExp("(\\s|^)" + e + "(\\s|$)", "gi");
                return !!a.test(t)
        }

        function ha(e) {
                if (!1 === e || null === e || void 0 === e) return e;
                e = e.replace(/(@|\\|\.|\/|!|\*|#|\+|\$|%|&|\(|\)|:|;|<|=|>|\?|\[|\]|\^|~|\|)/g, "\\$1");
                for (var t = ma(e), a = [], n = 0, s; n < t.length; n++) s = o.trim(t[n]), !1 == /("|'|{|}|,)/g.test(s) && a.push(s);
                return a.join(" ")
        }

        

        

        function va(e) {
            if (!1 === e || "" == e) return !1;
            var t = e.sort(function(e, t) {
                return getJi().find("." + e).length - getJi().find("." + t).length
            });
            return 1 == getJi().find("." + t[0]).length && "." + t[0]
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

})(jQuery);