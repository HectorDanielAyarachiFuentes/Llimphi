(function(o) {
        "use strict";
        window.bMode = true;

        // ── Module bridge ─────────────────────────────────────────────────────────
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
            _i = _YP._i, _a = _YP._a, Ma = _YP.Ma;

        // yp-responsive.js
        var Y  = _YP.Y,  N  = _YP.N,  X  = _YP.X,  ei = _YP.ei;

        // yp-save.js
        var re = _YP.re, ba = _YP.ba, xa = _YP.xa, ka = _YP.ka, za = _YP.za, Oa = _YP.Oa,
            Sa = _YP.Sa, Ta = _YP.Ta, Ea = _YP.Ea, La = _YP.La, Ba = _YP.Ba;

        // yp-info-panel.js
        // (Some variables overlap, but we explicitly re-assign them to maintain safety)
        var M = _YP.M, Z = _YP.Z, _a = _YP._a, Ca = _YP.Ca, Da = _YP.Da;

        // yp-animation.js
        var H  = _YP.H,  F  = _YP.F,  j  = _YP.j,  Vt = _YP.Vt, Ut = _YP.Ut, yi = _YP.yi;

        // yp-element-select.js
        var Q  = _YP.Q,  ee = _YP.ee, bi = _YP.bi, vi = _YP.vi, da = _YP.da,
            At = _YP.At, Di = _YP.Di;

        // yp-events.js
        var He = _YP.He, We = _YP.We;

        // yp-panel-ui.js
        var ne = _YP.ne, be = _YP.be, Be = _YP.Be, je = _YP.je, Xe = _YP.Xe,
            fi = _YP.fi, Mi = _YP.Mi, Pi = _YP.Pi, Ri = _YP.Ri, Yi = _YP.Yi,
            Ni = _YP.Ni;

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
            ca = _YP.ca, Yt = _YP.Yt, Zt = _YP.Zt;

        // ─────────────────────────────────────────────────────────────────────────

        function isElementInViewport(el) {
                var rect = el.getBoundingClientRect();
                if (rect.width === 0 && rect.height === 0) {
                        return false;
                }
                var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
                var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
                var inWindow = (
                        rect.bottom >= 0 &&
                        rect.top <= windowHeight &&
                        rect.right >= 0 &&
                        rect.left <= windowWidth
                );
                if (!inWindow) {
                        return false;
                }
                var parent = el.parentNode;
                while (parent && parent.nodeType === 1 && parent !== document.body) {
                        var style = window.getComputedStyle(parent);
                        var overflowY = style.getPropertyValue('overflow-y') || style.getPropertyValue('overflow');
                        var overflowX = style.getPropertyValue('overflow-x') || style.getPropertyValue('overflow');
                        var hasScroll = overflowY === 'auto' || overflowY === 'scroll' || overflowX === 'auto' || overflowX === 'scroll';
                        if (hasScroll) {
                                var parentRect = parent.getBoundingClientRect();
                                var inParent = (
                                        rect.bottom >= parentRect.top &&
                                        rect.top <= parentRect.bottom &&
                                        rect.right >= parentRect.left &&
                                        rect.left <= parentRect.right
                                );
                                if (!inParent) {
                                        return false;
                                }
                        }
                        parent = parent.parentNode;
                }
                return true;
        }

        if (o.expr) {
                var inViewportPseudo = o.expr.createPseudo ? o.expr.createPseudo(function() {
                        return function(elem) {
                                return isElementInViewport(elem);
                        };
                }) : function(elem) {
                        return isElementInViewport(elem);
                };
                if (o.expr.pseudos) {
                        o.expr.pseudos['in-viewport'] = inViewportPseudo;
                }
                if (o.expr[':']) {
                        o.expr[':']['in-viewport'] = inViewportPseudo;
                }
        }

        

        

        

        

        

        

        

        

        

        

        

        

        

        function y(e) {
                x++;
                var t = 1;
                if (null == e && (e = E(), t = 0), "single" == e ? n.setSession(b.singleData) : "template" == e ? n.setSession(b.templateData) : n
                        .setSession(b.globalData), n.getSession().setUseWrapMode(!0), n.getSession().setUseWorker(!1), n.setOption("tabSize", 2), 0 ==
                        t && (o(".editor-tabs").removeClass("active"), o(".editor-tabs[data-type-value='" + e + "']").addClass("active")), A() &&
                        setTimeout(function() {
                                X()
                        }, window.Yellow2Delay), window.history.pushState && 0 < window.location.href.split("wyp_mode=").length && o.urlParam(
                                "wyp_mode") != e && 2 < x) {
                        var a = window.location.href.split("wyp_mode=")[1];
                        K(a) && (a = -1 == a.indexOf("&") ? "" : "&" + a.split(/&(.+)/)[1], window.history.pushState(null, null, window.location.href
                                .split("wyp_mode=")[0] + "wyp_mode=" + e + a))
                }
                o("#customizing-mode").attr("data-this-type", e), window.ypData["vsl-css-vi-active"] && o("#vsl-css-vi").attr("data-current-type", E())
        }

        

        

        

        

        

        

        

        

        

        

        

        

        

        function B(e, t) {
                var a = [],
                        i = e.attr("class");
                if (K(i) && (i = Ii(i), i = _i(i), 1 <= i.length)) {
                        var n = ma(i);
                        if (0 < n.length)
                                for (var s = 0, o; s < n.length; s++) o = _i(n[s]), -1 == a.indexOf(o) && -1 == t.indexOf(o) && 1 <= o.length && a.push(
                                        o);
                        else - 1 == a.match(i) && -1 == t.indexOf(i) && a.push(i)
                }
                return a
        }



        

        

        

        

        

        

        function W(e) {
                if (tn.hasClass("wyp-bg-layer-active")) return !1;
                e.container = e.container ? o(e.container) : tn, e.background || (e.background = "transparent");
                var t = o("<div id='fake-layer' style='position:fixed;left:0;top:0;width:100%;height:100%;z-index:" + e.index + ";background-color:" + e
                        .background + "'></div>");
                void 0 !== e.custom_class && t.addClass(e.custom_class), e.container.append(t), tn.addClass("wyp-bg-layer-active"), t.on(
                        "click mousewheel DOMMouseScroll", o.throttle(function() {
                                t.remove(), tn.removeClass("wyp-bg-layer-active"), e.callback()
                        }, 64))
        }

        

        

        

        

        function U() {
                if (!1 === n.session.getUndoManager().hasUndo()) return Li("", "There's nothing else to undo", "undoRedoNote"), !1;
                if (Bi("undoRedoNote"), O() || D() || z() || window.ypData["wyp-processing-now"]) return !1;
                if (S()) return k({
                        title: qi.sorry,
                        text: qi.cantUndo
                }), !1;
                if (T()) return k({
                        title: qi.sorry,
                        text: qi.cantUndoAnimManager
                }), !1;
                n.commands.exec("undo", n);
                var e = n.getValue();
                V(e), $(), A() && he(!0), we(), window.ypData["vsl-css-vi-active"] && (Yt(), Zt()), 0 < o(".mo-i.active").length && Qa(), n.getSession()
                        .removeMarker(window.typeHereMarker), setTimeout(function() {
                                o.throttle(Be(), 32)
                        }, 10), Ze()
        }

        function q() {
                if (!1 === n.session.getUndoManager().hasRedo()) return Li("", "There's nothing else to redo", "undoRedoNote"), !1;
                if (Bi("undoRedoNote"), O() || D() || z() || window.ypData["wyp-processing-now"]) return !1;
                if (S()) return k({
                        title: qi.sorry,
                        text: qi.cantUndo
                }), !1;
                if (T()) return k({
                        title: qi.sorry,
                        text: qi.cantUndoAnimManager
                }), !1;
                n.commands.exec("redo", n);
                var e = n.getValue();
                V(e), $(), A() && he(!0), we(), window.ypData["vsl-css-vi-active"] && (Yt(), Zt()), 0 < o(".mo-i.active").length && Qa(), setTimeout(
                        function() {
                                o.throttle(Be(), 32)
                        }, 10), Ze()
        }

        function $() {
                !1 === n.session.getUndoManager().hasUndo() ? o(".undo-btn").addClass("disabled") : o(".undo-btn").removeClass("disabled"), !1 === n
                        .session.getUndoManager().hasRedo() ? o(".redo-btn").addClass("disabled") : o(".redo-btn").removeClass("disabled")
        }

        function G(e) {
                return o(e).attr("id").replace("-group", "")
        }

        

        

        

        

        function te(e) {
                var a = o(".scenes .scene").length,
                        n = "",
                        s;
                for (s = 1; s < a; s++) n = n + o(".scenes .scene-" + s + " input").val() + "% {", Gi.find("#wyp-anim-scenes").find(".style-scene-" + s)
                        .each(function() {
                                n = n + o(this).text().match(/\{(.*?)\}/g).toString().replace("{", "").replace("}", "") + ";"
                        }), n += "}";
                var r = n.replace(/\}/g, "}YKSYXA"),
                        l = r.split("YKSYXA").reverse(),
                        d = [],
                        p = "{",
                        c = _(),
                        u, m, f, g, h, y;
                for (s = 1; s < l.length; s++) {
                        if (m = o.trim(l[s]), y = o.trim(l[s]), m = m.split("{")[1].split("}")[0], l.length - 1 == s)
                                for (var w = 0; w < d.length; w++) {
                                        g = 0;
                                        var v = new RegExp("({|;)" + d[w] + ":");
                                        if (null !== y.match(v) && (g = parseInt(y.match(v).length)), 0 === g) {
                                                var b = c,
                                                        C = b.css(d[w]);
                                                if ("top" == d[w] && "auto" == C && (C = "0px"), "left" == d[w] && "auto" == C && (C = "0px"),
                                                        "width" == d[w] && "auto" == C && (C = b.width()), "height" == d[w] && "auto" == C && (C = b
                                                                .height()), "opacity" == d[w] && "auto" == C && (C = "1"), "right" != d[w] && "auto" !=
                                                        C && "bottom" != d[w] && "auto" != C) {
                                                        var z = d[w] + ":" + C + ";";
                                                        y = y.toString().replace(/\}$/, "") + z + "}", n = n.replace("0% {", "0% {" + z), p += z
                                                }
                                        }
                                }
                        for (f = m.split(";"), u = 0; u < f.length; u++)
                                if ("" != f[u].split(":")[0]) {
                                        var O = f[u].split(":")[0];
                                        h = 0, null !== n.match("{" + O + ":") && (h = parseInt(n.match("{" + O + ":").length)), null !== n.match(";" +
                                                O + ":") && (h += parseInt(n.match(";" + O + ":").length)), h < parseInt(a - 1) && d.push(O)
                                }
                }
                var D = n.replace(/\}/g, "}TYQA"),
                        A = D.split("TYQA"),
                        S = [],
                        T = [];
                for (s = 0; s < A.length; s++)
                        if (m = o.trim(A[s]), "" != m && " " != m) {
                                for (m = m.split("{")[1].split("}")[0], f = m.split(";"), u = 0; u < f.length; u++)
                                        if ("" != f[u].split(":")[0]) {
                                                var E = f[u].split(":")[0],
                                                        L = f[u].replace(/^(.*?):(.*?)$/g, "$2");
                                                L = o.trim(L).replace(/\s+?!important/g, "").replace(/\;$/g, "");
                                                var B = S.indexOf(E); - 1 != B && (S.splice(B, 1), T.splice(B, 1)), S.push(E), T.push(L)
                                        } for (var M = "{" + m, Z = 0; Z < S.length; Z++) {
                                        var P = S[Z],
                                                R = T[Z];
                                        g = 0, null !== M.match("{" + P + ":") && (g = parseInt(M.match("{" + P + ":").length)), null !== M.match(";" +
                                                P + ":") && (g = h + parseInt(M.match(";" + P + ":").length)), 1 > g && (M = "{" + P + ":" + R +
                                                ";" + M.replace("{", ""))
                                }
                                var I = o.trim(A[s]).split("{")[0] + "{" + m.replace("{", "") + "}",
                                        Y = o.trim(A[s]).split("{")[0] + "{" + M.replace("{", "") + "}";
                                n = n.replace(I, Y)
                        } return n = "@keyframes " + e + "{\r" + n + "\r}", n = n.replace(/\}/g, "}\r"), n = n.replace(";;", ""), n
        }

        function ae(e) {
                Qi.removeClass("wyp-ani-cre").removeAttr("data-anim-scene").removeClass("wyp-animate-test-playing"), window.ypData
                        .is_animate_creator = !1, Qi.removeAttr("data-anim-scene");
                var t = o.trim(tn.attr("class").replace(/wyp-scene-[0-9]/g, ""));
                tn.attr("class", t), t = o.trim(Ji.attr("class").replace(/wyp-scene-[0-9]/g, "")), Ji.attr("class", t), Gi.find(
                                "#wyp-anim-scenes #scene-1,#wyp-anim-scenes #scene-2,#wyp-anim-scenes #scene-3,#wyp-anim-scenes #scene-4,#wyp-anim-scenes #scene-5,#wyp-anim-scenes #scene-6"
                                ).empty(), we(), o(".anim-bar .scenes .scene:not(.scene-1):not(.scene-2):not(.scene-add)").each(function() {
                                o(this).remove()
                        }), Gi.find("#animate-test-drive").empty(), o(".scene-add").show(), e && "disable" != window.animGeneratorOldAnim && "" !=
                        window.animGeneratorOldAnim && "none" != window.animGeneratorOldAnim && (tt(null, "animation-name", window.animGeneratorOldAnim,
                                        ""), tt(null, "animation-duration", window.animGeneratorOldAnimDuration, window.animGeneratorOldAnimDurationF),
                                tt(null, "animation-delay", window.animGeneratorOldAnimDelay, window.animGeneratorOldAnimDelayF), tt(null,
                                        "animation-fill-mode", window.animGeneratorOldAnimFillMode, "")), o.throttle(Be(), 32), Ze()
        }

        function ie(e) {
                var t = o("#" + e + "-group"),
                        a = t.parents(".wyp-t-cont");
                o(".wyp-t-cont").hide(), o(".ed-pnl-list > li").removeClass("active"), a.prev("h3").trigger("click"), a.parent("li").show(), t.addClass(
                        "focus-option"), setTimeout(function() {
                        t.removeClass("focus-option")
                }, 1600), o.throttle(Be(), 32)
        }


        function se() {
                setTimeout(function() {
                        var e = 0;
                        if (0 < o(".wyp-bg-ast.active").length) {
                                var t = o(".wyp-bg-ast.active").index();
                                e = 68 * (parseInt(t / 4) - 1.5)
                        }
                        o(".wyp-background-asts").scrollTop(e), oe()
                }, 10)
        }

        function oe() {
                o(".wyp-background-asts .wyp-bg-ast:in-viewport").each(function() {
                        o(this).css("backgroundImage", "url(" + pluginurl + "assets/" + o(this).data("url") + ")")
                })
        }

        function le(e, t, a, i) {
                var n = e.add(e.parents()),
                        s = !0,
                        r, l;
                return n.each(function() {
                        if (l = o(this), r = null, !1 === l.hasClass("wyp-animating")) {
                                if (r = l.css("animationFillMode"), "forwards" == r || "both" == r) {
                                        if (s = de(l, t, a, i, r), !0 === s) return !1;
                                } else if (s = de(l, t, a, i), !0 === s) return !1;
                        } else if (s = de(l, t, a, i), !0 === s) return !1
                }), s
        }

        function de(e, t, a, i, n) {
                var s = e.css(t);
                if ("transform" == t && "matrix(1, 0, 0, 1, 0, 0)" == s && (s = "none"), "==" == i) {
                        if (s === a) return void 0 !== n && e.css("animationFillMode", n), !0;
                } else if (s !== a) return void 0 !== n && e.css("animationFillMode", n), !0;
                return void 0 !== n && e.css("animationFillMode", n), !1
        }

        function pe(e) {
                var t = Gi.height(),
                        a = o("#iframe").height();
                0 < o(".wyp-panel-hide:visible").length ? o(".wyp-panel-show").css("top", o(".wyp-panel-hide").offset().top) : o(".wyp-panel-show").css(
                                "top", "50vh"), t > a ? o(".wyp-panel-show").css("right", ei() + "px") : o(".wyp-panel-show").css("right", "0px"), !
                        0 === e ? tn.removeClass("wyp-clean-look wyp-cln-lo-manual") : tn.toggleClass("wyp-cln-lo-manual"), N(), Ze()
        }

        function ce(e) {
                var t = "any";
                if (null == e) {
                        if (Ji.hasClass("wyp-ele-n-vis")) return !1;
                        C() && (e = _(), t = "selected")
                }
                if (null == e || 1 !== e.length) return !1;
                if (le(_(), "position", "fixed", "==")) return !1;
                var a = parseInt(o(window).height() / 2),
                        i = parseInt(e.height() / 2),
                        n = e.offset(),
                        s = n.top - 50;
                i < a && (s = i + n.top - a), nn.scroll({
                        top: s,
                        behavior: "smooth"
                }), "selected" == t && ii()
        }

        function ue(e, t, a) {
                var n = [],
                        s = null,
                        r = null,
                        l = [],
                        d = "",
                        p;
                if (e = e.replace(/\s+/g, " "), -1 != e.indexOf(":")) return [];
                var c = e.substr(e.length - 1),
                        u = ua(e),
                        m = u[u.length - 1];
                " " == c && (m = " ");
                var g = u;
                " " != c && g.pop(), g = g.join(" ");
                var h = g.replace(/(\s+$|\.$|#$)/g, ""),
                        y = m.replace(/(\.|#)/g, ""),
                        v = ["body", "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "abbr", "address", "b", "bdi", "bdo", "blockquote", "center",
                                "cite", "code", "del", "dfn", "em", "font", "i", "ins", "kbd", "mark", "meter", "pre", "progress", "q", "rp", "rt",
                                "ruby", "s", "samp", "small", "strike", "strong", "sub", "sup", "time", "tt", "u", "var", "wbr", "form", "input",
                                "textarea", "button", "select", "optgroup", "option", "label", "fieldset", "legend", "datalist", "output", "frame",
                                "iframe", "img", "map", "area", "canvas", "figcaption", "figure", "picture", "audio", "source", "track", "video", "a",
                                "link", "nav", "ul", "ol", "li", "dir", "dl", "dt", "dd", "menu", "menuitem", "table", "caption", "th", "tr", "td",
                                "thead", "tbody", "tfoot", "col", "colgroup", "div", "span", "header", "footer", "main", "section", "article", "aside",
                                "details", "dialog", "summary"
                        ],
                        b, x, _, C, z;
                !0 == /^[a-z-A-Z0-9_-]+\.$/g.test(m) && (d = m.split(".")[0], l.push(d + "[class]")), !0 == /^[a-z-A-Z0-9_-]+#$/g.test(m) && (d = m
                                .split("#")[0], l.push(d + "[id]")), !0 == /^[a-z-A-Z0-9_-]+\.[a-z-A-Z0-9_-]+$/g.test(m) && (d = m.split(".")[0], p = m
                                .split(".")[1], l.push(d + "[class*='" + p + "']")), !0 == /^[a-z-A-Z0-9_-]+#[a-z-A-Z0-9_-]+$/g.test(m) && (d = m.split(
                                "#")[0], p = m.split("#")[1], l.push(d + "[id^='" + p + "']")), !0 == /^\#$/g.test(m) && l.push("[id]"), !0 == /^\.$/g
                        .test(m) && l.push("[class]"), !0 == /^\.[a-z-A-Z0-9_-]+$/g.test(m) && (p = m.split(".")[1], l.push("[class*='" + p + "']")), !
                        0 == /^\#[a-z-A-Z0-9_-]+$/g.test(m) && (p = m.split("#")[1], l.push("[id^='" + p + "']")), !0 == /^[a-z-A-Z0-9_-]+$/g.test(m) &&
                        l.push("[tag*='" + m + "']"), " " == m && l.push("[tag]"), !0 == /^[a-z-A-Z0-9_-]+$/g.test(m) && l.push("[id^='" + m + "']"), !
                        0 == /^[a-z-A-Z0-9_-]+$/g.test(m) && l.push("[class*='" + m + "']");
                for (var O = 0, D; O < l.length; O++) {
                        if ("[tag]" == l[O] || -1 != l[O].indexOf("[tag*="))
                                for (b = new RegExp("^" + m + "(.+)?"), D = 0; D < v.length; D++)
                                        if (z = "[tag]" == l[O] || b.test(v[D]), z) {
                                                try {
                                                        C = 0 < h.length ? Gi.find(h).find(v[D]).not(w("", ",", "", window.simple_not_list)) : Gi.find(
                                                                v[D]).not(w("", ",", "", window.simple_not_list))
                                                } catch (t) {
                                                        continue
                                                }
                                                if (0 < C.length && (r = g + " " + v[D], Ca(r, !0, !1, !1) && n.push(r), hi(n).length >= t)) break
                                        } try {
                                C = 0 < h.length ? Gi.find(h).find(l[O]).not(w("", ",", "", window.simple_not_list)) : Gi.find(l[O]).not(w("", ",", "",
                                        window.simple_not_list))
                        } catch (t) {
                                continue
                        }
                        C.each(function(a) {
                                if (!0 == /^\[class\*\=/g.test(l[O]))
                                        for (x = o(this).attr("class").split(" "), b = new RegExp("^" + y + "(.+)?"), a = 0; a < x
                                                .length && (_ = b.exec(x[a]), !(null !== _ && (r = g + " ." + _[0], Ca(r, !0, !1, !1) &&
                                                        n.push(r), hi(n).length >= t))); a++);
                                else if (-1 != l[O].indexOf("[class]")) {
                                        if (s = o(this).attr("class"), -1 != s.indexOf(" ") && (s = s.split(" ")[0]), "" == s) return !
                                        0;
                                        if (r = "" == d ? g + " ." + s : g + " " + d + "." + s, Ca(r, !0, !1, !1) && n.push(r), hi(n)
                                                .length >= t) return !1
                                } else if (-1 != l[O].indexOf("[id]") || -1 != l[O].indexOf("[id^=")) {
                                        if (r = "" == d ? g + " #" + o(this).attr("id") : g + " " + d + "#" + o(this).attr("id"), Ca(r,
                                                        !0, !1, !1) && n.push(r), hi(n).length >= t) return !1;
                                } else if (!0 == /^[a-z-A-Z0-9_-]+\[class\*\=/g.test(l[O]))
                                        for (x = o(this).attr("class").split(" "), a = 0; a < x.length; a++)
                                                if (b = new RegExp("^" + e.split(".")[1] + "(.+)?"), _ = b.exec(x[a]), null !== _ && (
                                                                r = g + " " + d + "." + _[0], Ca(r, !0, !1, !1) && n.push(r), hi(n)
                                                                .length >= t)) return !1
                        })
                }
                n = hi(n);
                for (var A = 0; A < window.plugin_classes_list.split("|").length; A++)
                        for (D = n.length - 1; 0 <= D; D--) - 1 != n[D].replace(/\./g, "").trim().indexOf(window.plugin_classes_list.split("|")[A]) && n
                                .splice(D, 1);
                var S = [];
                for (Ji.hasAttr("class") && (S = ma(Ji.attr("class"))), D = 0; D < n.length; D++) n[D] = n[D].replace(/(^\s+|\s+$)/g, "").replace(
                        /\s\s+/g, " "), -1 != n[D].indexOf(".") && -1 != S.indexOf(n[D].replace(/\./g, "")) && (n[D] = "body" + n[D]);
                return 1 == n.length && "autocomplete" == a && n[0] == e && (n = []), n
        }

        function me() {
                o("#autocomplete-selector-list li").remove();
                var e;
                if (e = o("#wyp-selector-editor").val(), J(e)) return !1;
                if ("  " == e || " " == e || "" == e) return !1;
                for (var t = ue(e.replace(/(\s?)+>(\s?)+/g, " "), 10, "autocomplete"), a = 0; a < t.length; a++)
                        if (10 > o("#autocomplete-selector-list li").length) {
                                if (0 === Gi.find(t[a]).length) return !1;
                                if (0 < o("#" + gi(t[a])).length) return !1;
                                o("#autocomplete-selector-list").append("<li id='" + gi(t[a]) + "'>" + t[a] + "</li>")
                        } window.selectorActive = -1
        }

        function fe() {
                window.ypData.editor_context_menu_open && _().contextMenu("hide"), o("#wyp-selector-editor").removeClass("selector-is-invalid"), Qi
                        .addClass("wyp-selector-editor-active");
                var e = _a();
                ":hover" == tn.attr("data-wyp-selector") && (e += ":hover"), ":focus" == tn.attr("data-wyp-selector") && (e += ":focus"), ":link" == tn
                        .attr("data-wyp-selector") && (e += ":link"), ":active" == tn.attr("data-wyp-selector") && (e += ":active"), ":visited" == tn
                        .attr("data-wyp-selector") && (e += ":visited"), ":checked" == tn.attr("data-wyp-selector") && (e += ":checked"), ":disabled" ==
                        tn.attr("data-wyp-selector") && (e += ":disabled"), ":enabled" == tn.attr("data-wyp-selector") && (e += ":enabled"),
                        ":invalid" == tn.attr("data-wyp-selector") && (e += ":invalid"), ":valid" == tn.attr("data-wyp-selector") && (e += ":valid"), J(
                                e) && (e = ""), o("#wyp-selector-editor").trigger("focus").val(e).trigger("keyup"), me()
        }

        function ge(e) {
                "cursor" === window.ypData.inspector && (o(".inspector-sublist-default").trigger("click"), window.ypData.inspector = "default", o(
                        ".inspector-sublist").css("display", "none")), o(e).removeClass("selector-is-invalid");
                var t = o(e).val();
                if ("" == t || " " == t) return "#wyp-selector-editor" == e && (Qi.removeClass("wyp-selector-editor-active"), window.selectorActive = -
                        1), !1;
                var a = t.match(/:hover(.*?)$/g),
                        i = t.match(/:focus(.*?)$/g),
                        n = t.match(/:visited(.*?)$/g),
                        s = t.match(/:active(.*?)$/g),
                        r = t.match(/:link(.*?)$/g),
                        l = t.match(/:checked(.*?)$/g),
                        d = t.match(/:disabled(.*?)$/g),
                        p = t.match(/:enabled(.*?)$/g),
                        c = t.match(/:invalid(.*?)$/g),
                        u = t.match(/:valid(.*?)$/g);
                a = null === a ? 0 : a.toString().trim().replace(/:hover/g, "").trim().length, i = null === i ? 0 : i.toString().trim().replace(
                                /:focus/g, "").trim().length, n = null === n ? 0 : n.toString().trim().replace(/:visited/g, "").trim().length, s =
                        null === s ? 0 : s.toString().trim().replace(/:active/g, "").trim().length, r = null === r ? 0 : r.toString().trim().replace(
                                /:link/g, "").trim().length, l = null === l ? 0 : l.toString().trim().replace(/:checked/g, "").trim().length, d =
                        null === d ? 0 : d.toString().trim().replace(/:disabled/g, "").trim().length, p = null === p ? 0 : p.toString().trim().replace(
                                /:enabled/g, "").trim().length, c = null === c ? 0 : c.toString().trim().replace(/:invalid/g, "").trim().length, u =
                        null === u ? 0 : u.toString().trim().replace(/:valid/g, "").trim().length;
                var m = t.replace(/\:(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g, ""),
                        f = Ca(m, !0, !1, !0);
                return !1 == f ? (o(e).addClass("selector-is-invalid"), !1) : void(0 < Gi.find(m).length && "*" != m && 0 === a && 0 === i && 0 == n &&
                        0 == s && 0 == r && 0 == l && 0 == d && 0 == p && 0 == c && 0 == u && (Gi.find(t).hasClass("wyp-selected") && (window
                                        .ypData["wyp-will-selected"] = _()), L(_i(t)), Q(_i(t), null, !0), ce(), "#wyp-selector-editor" == e &&
                                (Qi.removeClass("wyp-selector-editor-active"), window.selectorActive = -1)))
        }

        function he(e) {
                var t = o(".breakpoint-bar");
                t.find(".breakpoint-item").tooltip("destroy"), t.empty();
                var i = qa(!0, !1, !1, !1);
                0 == i.length && (i = ["(max-width:1200px)", "(max-width:992px)", "(max-width:768px)", "(max-width:576px)"]);
                var n = 0,
                        s = 0,
                        r = [],
                        l = "",
                        d = o(".media-control").attr("data-code"),
                        c = o(window).width(),
                        u, m;
                if (0 < i.length) {
                        if (o.each(i, function(e, t) {
                                        u = Ya(t), t = t.replace(/(\d+)\.(\d+)/g, "$1"), !1 !== u && (n = parseInt(mi(u.replace(/</g, "")
                                                        .replace(/\>/g, ""))), s = _i(t.match(/\:(.*?)\)/g).toString().replace(/\:/g,
                                                        "").replace(/\)/g, "")), -1 == u.indexOf(",") && -1 == u.indexOf("and") &&
                                                270 <= n && (-1 != u.indexOf(">") && "min-width" == o(".media-control").attr(
                                                                "data-code") && -1 == r.indexOf("min-breakpoint-" + n) && n <= c && (r
                                                                .push("min-breakpoint-" + n), m = "", 0 < p(a(null, !1),
                                                                        "[selector=YPtoAddBreakpoint][msize=(min-width:" + s + ")]")
                                                                .length && (m = " defined-with-yellowpencil"), l +=
                                                                "<div data-breakpoint='" + n + "' data-media-content='" + t +
                                                                "' data-breakpoint-data='(min-width:" + s +
                                                                ")' class='min-width breakpoint-item" + m + "' id='min-breakpoint-" +
                                                                n + "' style='width:" + n + "px;'></div>"), -1 != u.indexOf("<") &&
                                                        "max-width" == d && -1 == r.indexOf("max-breakpoint-" + n) && (r.push(
                                                                        "max-breakpoint-" + n), m = "", 0 < p(a(null, !1),
                                                                        "[selector=YPtoAddBreakpoint][msize=(max-width:" + s + ")]")
                                                                .length && (m = " defined-with-yellowpencil"), l +=
                                                                "<div data-breakpoint='" + n + "' data-media-content='" + t +
                                                                "' data-breakpoint-data='(max-width:" + s +
                                                                ")' class='max-width breakpoint-item" + m + "' id='max-breakpoint-" +
                                                                n + "' style='width:" + n + "px;'></div>")))
                                }), t.html(l), "max-width" == d) t.find(".breakpoint-item").sort(function(e, t) {
                                return +t.dataset.breakpoint - +e.dataset.breakpoint
                        }).appendTo(t);
                        else {
                                t.find(".breakpoint-item").sort(function(e, t) {
                                        return +e.dataset.breakpoint - +t.dataset.breakpoint
                                }).appendTo(t);
                                var f = t.find(".min-width"),
                                        g = f.length,
                                        h = !1,
                                        y;
                                f.each(function(e) {
                                        y = o(this), y.css("z-index", 50 - e), 0 === e && (h = y.css("width")), g == e + 1 ? y.addClass(
                                                "last-min-breakpoint") : y.css("width", y.next().css("width"))
                                }), !1 !== h && t.append("<div class='empty-placeholder' style='width:" + h + " !important;'></div>")
                        }
                        t.find(".breakpoint-item").each(function() {
                                var e = o(this),
                                        t = e.attr("data-breakpoint"),
                                        a = e.next(".breakpoint-item").attr("data-breakpoint");
                                1 >= Math.abs(t - a) && e.remove(), 23 > Math.abs(t - a) ? e.addClass("xsmall-breakpoint") : 44 >= Math
                                        .abs(t - a) && e.addClass("small-breakpoint")
                        }), t.find(".breakpoint-item").on("mouseover", function() {
                                o(this).addClass("hover-breakpoint"), o(this).nextAll(".breakpoint-item").addClass("hover-breakpoint")
                        }).on("mouseout", function() {
                                tn.hasClass("wyp-contextmenu-breakpoint") || o(".hover-breakpoint").removeClass("hover-breakpoint")
                        }), t.find(".breakpoint-item").on("mouseenter", function(e) {
                                var a = o(this);
                                a.tooltip({
                                        template: "<div class=\"tooltip breakpoints-tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
                                        title: function() {
                                                var e = o(".media-control").text(),
                                                        t = o(this).attr("data-breakpoint"),
                                                        a = "";
                                                return a = o(this).hasClass("edited") ?
                                                        "<span class='breakpoint-tooltip-e'>(right-click to manage)</span>" :
                                                        o(this).hasClass("defined-with-yellowpencil") ?
                                                        "<span class='breakpoint-tooltip-e'>(right-click to manage)</span>" :
                                                        "<span class='breakpoint-tooltip-t'>(defined by the theme)</span>",
                                                        qi.breakpoint_size.replace("{$1}", t).replace("{$2}",
                                                        e) + a
                                        },
                                        delay: {
                                                show: 50,
                                                hide: 0
                                        },
                                        placement: "bottom",
                                        trigger: "manual",
                                        container: "body",
                                        html: !0
                                }).on("shown.bs.tooltip", function() {
                                        var i = a.outerWidth(),
                                                n = a.offset(),
                                                s = a.prev();
                                        a.hasClass("max-width") && (s = a.next());
                                        var r = (e.clientX - n.left) / i,
                                                l = o(".breakpoints-tooltip"),
                                                d = l.outerWidth(),
                                                p = 240,
                                                c;
                                        0 < s.length ? p = s.outerWidth() : a.hasClass("min-width") && (p = t.find(
                                                ".empty-placeholder").width()), 0 !== p && (.5 < r ? c = n
                                                .left + i - (i - p) / 4 : c = n.left + (i - p) / 4), c && (c -=
                                                d / 2, l.css("left", c + 1 + "px"))
                                }), a.tooltip("show")
                        })
                }!0 == e && X(), setTimeout(function() {
                        j()
                }, window.YellowDelay)
        }

        function ye() {
                if (!1 === A()) return !1;
                var e = o("#iframe").width(),
                        t = o(".breakpoint-bar > .breakpoint-item.focus");
                0 === t.length && o(".device-size").text(e)
        }

        function we() {
                if (T() && H(), !1 === C()) return !1;
                var e = o(".ed-pnl-list > li.active .op-g");
                if (o("li[data-loaded]").removeAttr("data-loaded"), 0 < e.length) {
                        var t = _a();
                        e.each(function() {
                                var e = 1;
                                "animation-duration-group" == o(this).attr("id") && !0 === S() && (e = 0), 1 == e && pa(G(this), t)
                        }), e.parent().attr("data-loaded", "true")
                }
                sa()
        }

        function ve(e) {
                e.each(function() {
                        var e = o(this),
                                t = e.parents(".op-g"),
                                a = t.attr("data-css"),
                                n = t.find("textarea");
                        var parsedVal = n.val();
                        if (parsedVal.trim().startsWith('[') || parsedVal.trim().startsWith('{')) {
                            try {
                                parsedVal = JSON.parse(decodeURIComponent(parsedVal));
                            } catch(err) {
                                console.error("JSON parse error for field:", a, err);
                            }
                        }
                        n = parsedVal;
                        e.catcomplete({
                                        source: n,
                                        delay: 0,
                                        minLength: 0,
                                        autoFocus: !0,
                                        close: function() {
                                                o("#fake-layer").trigger("click"), o(".active-autocomplete-item")
                                                        .removeClass("active-autocomplete-item"), e.removeClass(
                                                                "active"), e.parent().removeClass("active"), tn
                                                        .removeClass("autocomplete-active"), e.parent().find(
                                                                "select option:contains(" + e.val() + ")").length && e
                                                        .val(e.parent().find("select option:contains(" + e.val() + ")")
                                                                .val()), "" == e.val() && e.val(window.openVal), Qi
                                                        .find("[id^='wyp-font-test-']").remove()
                                        },
                                        change: function() {
                                                if ("font-family" == a) {
                                                        var t = mt(e.val());
                                                        t ? (o("#include-webfont-label").css("display", "none"), tt(
                                                                        null, "--google-webfont", "disable")) : o(
                                                                        "#include-webfont-label").css("display",
                                                                        "inline-block"), o("#font-family-group")
                                                                .addClass("font-family-changed");
                                                        var i = Wn(o.trim(P(e.val()).replace(/ /g, "+")));
                                                        !1 === t && 0 === o("#wyp-font-load-" + i).length && Qi.append(
                                                                "<link rel='stylesheet' id='wyp-font-load-" +
                                                                i +
                                                                "'  href='https://fonts.googleapis.com/css2?family=" +
                                                                o.trim(P(e.val()).replace(/ /g, "+")) +
                                                                ":ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' type='text/css' media='all' />"
                                                                )
                                                }
                                        },
                                        focus: function(t, i) {
                                                null != window.openVal && ("font-weight" == a && (_t("font-weight"), ht(
                                                                "font-weight", i.item.value), o(
                                                                ".ac-d li").each(function() {
                                                                e.css("fontWeight", i.item
                                                                        .value)
                                                        }), o(".ac-d li").css("fontFamily", o(
                                                                "#wyp-font-family").val())), "font-family" ==
                                                        a && (clearTimeout(window.load_near_fonts_delay), window
                                                                .load_near_fonts_delay = setTimeout(function() {
                                                                        gt()
                                                                }, 48), _t("font-family"), ht("font-family", i
                                                                        .item.value)))
                                        },
                                        open: function(i) {
                                                W({
                                                                index: 2147483646,
                                                                container: ".ed-pnl",
                                                                callback: function() {}
                                                        }), o(i.target).next().find("ul").width(parseFloat(e.css(
                                                                "width")) - 2), null == window.openVal && (window
                                                                .openVal = e.val()), e.addClass("active"), e.parent()
                                                        .addClass("active"), tn.addClass("autocomplete-active");
                                                var s = e.val();
                                                o("#autocomplete-custom-style-" + a).remove(), o(
                                                        ".up-style-autocomplete").removeClass(
                                                        "up-style-autocomplete"), o(
                                                        ".up-style-autocomplete-input").removeClass(
                                                        "up-style-autocomplete-input");
                                                var r = e.get(0).getBoundingClientRect(),
                                                        l = o(".ed-pnl-list > li.active > .wyp-t-cont").get(0)
                                                        .getBoundingClientRect(),
                                                        d = 272,
                                                        p = l.bottom - r.top - r.height + 1 - 10,
                                                        c = r.top - l.top - 10,
                                                        u = t.find(".ui-autocomplete.ui-menu li").outerHeight(),
                                                        m;
                                                if (200 > p && 200 > c) p = 360, m = parseInt(p / u), 16 < m && (m =
                                                        16), p = parseInt(m) * u, tn.append(
                                                                "<style id=\"autocomplete-custom-style-" + a + "\">#" +
                                                                a + "-group .ui-autocomplete.ui-menu{max-height:" + p +
                                                                "px;position:fixed;top:" + (r.top + r.height - 1) +
                                                                "px;}</style>"), d = p;
                                                else if (c <= p) m = parseInt(p / u), 16 < m && (m = 16), p = parseInt(
                                                        m) * u, tn.append(
                                                        "<style id=\"autocomplete-custom-style-" + a + "\">#" +
                                                        a + "-group .ui-autocomplete.ui-menu{max-height:" + p +
                                                        "px;}</style>"), d = p;
                                                else if ("font-family" != a) {
                                                        m = parseInt(c / u), 16 < m && (m = 16), c = parseInt(m) * u;
                                                        var f = t.find(".ui-autocomplete.ui-menu").outerHeight() + r
                                                                .height - 2,
                                                                g = c + r.height - 2;
                                                        f > g && (f = g), tn.append(
                                                                "<style id=\"autocomplete-custom-style-" + a +
                                                                "\">#" + a +
                                                                "-group .ui-autocomplete.ui-menu{top:-" + f +
                                                                "px;max-height:" + (f - r.height + 2) +
                                                                "px;}</style>"), t.find(
                                                                ".ui-autocomplete.ui-menu").addClass(
                                                                "up-style-autocomplete"), e.addClass(
                                                                "up-style-autocomplete-input"), d = c
                                                }
                                                "font-family" == a ? -1 != s.indexOf(",") && (s = o.trim(s.split(",")[
                                                                0]).replace(/'/g, "").replace(/"/g, "")) :
                                                        "text-shadow" == a && ("rgba(0, 0, 0, 0.3) 0px 1px 1px" == s ?
                                                                s = "Basic Shadow" :
                                                                "rgb(255, 255, 255) 1px 1px 0px, rgb(170, 170, 170) 2px 2px 0px" ==
                                                                s ? s = "Multiple" :
                                                                "rgb(255, 0, 0) -1px 0px 0px, rgb(0, 255, 255) 1px 0px 0px" ==
                                                                s ? s = "Anaglyph" :
                                                                "rgb(255, 255, 255) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px" ==
                                                                s ? s = "Emboss" :
                                                                "rgb(255, 255, 255) 0px 0px 2px, rgb(255, 255, 255) 0px 0px 4px, rgb(255, 255, 255) 0px 0px 6px, rgb(255, 119, 255) 0px 0px 8px, rgb(255, 0, 255) 0px 0px 12px, rgb(255, 0, 255) 0px 0px 16px, rgb(255, 0, 255) 0px 0px 20px, rgb(255, 0, 255) 0px 0px 24px" ==
                                                                s ? s = "Neon" :
                                                                "rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) -1px 0px 1px" ==
                                                                s && (s = "Outline"));
                                                var y = e.parent().find(".ac-d li").filter(function() {
                                                        return "font-weight" == a ? o.text([this]) ===
                                                                s || o.text([this]).replace(/\D/g,
                                                                "") === s : o.text([this]) === s
                                                });
                                                if (1 == y.length && (o(".active-autocomplete-item").removeClass(
                                                                        "active-autocomplete-item"), 0 === o(
                                                                        ".active-autocomplete-item").length && y
                                                                .addClass("active-autocomplete-item")), 0 < o(
                                                                ".active-autocomplete-item").length) {
                                                        e.parent().find(".ac-d").find("li.ui-state-focus").removeClass(
                                                                "ui-state-focus");
                                                        var w = e.parent().find(".ac-d li.active-autocomplete-item")
                                                                .parent(),
                                                                v = e.parent().find(
                                                                ".ac-d li.active-autocomplete-item"),
                                                                b = v.height();
                                                        w.scrollTop(w.scrollTop() + v.position().top - parseInt((
                                                                parseInt(d / b) - 1) / 2) * b)
                                                }
                                                if ("font-weight" == a) o(".ac-d li").each(function() {
                                                        var e = Math.abs(mi(o(this).text()));
                                                        o(this).css("fontWeight", e)
                                                }), o("#ac-pl-font-weight ul li").css("fontFamily", o(
                                                        "#wyp-font-family").val());
                                                else if ("font-family" == a || "font-weight" == a) "font-family" == a &&
                                                        gt();
                                                else if ("animation-name" == a) {
                                                        var h, x;
                                                        o("#animation-name-group .ui-autocomplete.ui-menu li").each(
                                                                function() {
                                                                        h = o(this), x = h.text()
                                                                })
                                                } else "text-shadow" == a ? o("#ac-pl-text-shadow li").each(function(
                                                e) {
                                                        o(this).css("textShadow", n[e].value)
                                                }) : "cursor" == a && o("#ac-pl-cursor li").each(function(e) {
                                                        o(this).attr("style", "cursor:" + n[e].value +
                                                                " !important;")
                                                })
                                        },
                                        appendTo: e.next()
                                }).focus(function() {
                                        clearTimeout(window.AutoCompleteDelay), window.AutoCompleteDelay = setTimeout(
                                function() {
                                                e.catcomplete("search", "")
                                        }, window.Yellow2Delay)
                                })
                })
        }


        function xe(e, t, a) {
                var i = e.parent().parent().parent(),
                        n;
                if ("-" == e.parent().find(".css-un").val() && e.hasClass("css-va") && e.val() != be(i) && e.parent().find(".css-un").val("px").trigger(
                                "autogrow"), isNaN(e.parent().find(".css-va").val()) && !1 == o(document.activeElement).hasClass("css-un") && e.parent()
                        .find(".css-un").val("-").trigger("autogrow"), !1 === t && (t = e.parent().find(".css-va").val(), a = e.parent().find(".css-un")
                                .val()), /(\d+)([a-z%]{1,3})$/i.test(t)) {
                        var s = t.match(/(\d+)([a-z%]{1,3})$/i);
                        /^(em|rem|vh|vw|%|px|ms|s|pt|pc|in|mm|cm|ex|ch|vmin|vmax)$/.test(s[2]) && (t = parseFloat(s[1]), a = s[2])
                }
                var r = e.parent().parent().find(".sl-d");
                if (n = ot(a, i), void 0 === n || !1 === n) return !1;
                var l = parseInt(n[0]),
                        d = parseInt(n[1]);
                t < l && (l = parseInt(t)), t > d && (d = t), !1 === isNaN(l) && !1 === isNaN(d) && !1 === isNaN(t) && r.slider({
                        min: parseInt(l),
                        max: parseInt(d),
                        value: t
                }, !0)
        }

        function _e(e) {
                if (!1 == window.ypData["wyp-css-ed-act"]) return !1;
                if (!C()) n.setValue(Et(!0, null, !0)), setTimeout(function() {
                        n.getSession().removeMarker(window.typeHereMarker)
                }, 2), e && n.focus(), n.execCommand("gotolineend");
                else if (!1 == window.disable_auto_insert) {
                        tt(null, "a", "a", "");
                        var t = Et(!1, null, !0),
                                a = t.split("\ta:a")[0].split(/\r\n|\r|\n/).length;
                        t = t.replace(/a:a !important;/g, ""), t = t.replace(/a:a;/g, ""), tt(null, "a", "disable", ""), n.setValue(t), n.resize(!0),
                                setTimeout(function() {
                                        n.scrollToLine(a, !0, !1);
                                        var e = ace.require("ace/range").Range,
                                                t = "";
                                        A() && (t = " ace-type-here-in-responsive"), n.getSession().removeMarker(window.typeHereMarker), window
                                                .typeHereMarker = n.session.addMarker(new e(a - 1, 0, a - 1, 1), "ace-type-here" + t, "line", !
                                                        0)
                                }, 2), e && n.focus(), A() ? n.gotoLine(a, 2, !0) : n.gotoLine(a, 1, !0)
                }
                n.resize()
        }

        function ke(e) {
                if (void 0 === e && (e = _()), !e) return !1;
                if (void 0 === e[0] || !1 === e[0] || null === e[0]) return !1;
                for (var t = e.parentsUntil("body"), a = "body", n = ya(e), s = t.length - 1, o; 0 <= s; s--) o = ya(t[s]), /\.|#/g.test(o) && (o = t[s]
                        .tagName.toLowerCase() + o), a = _i(a).trim() + " > " + o + window.separator;
                return a = _i(a + " > " + n + ".wyp-selected"), a
        }

        function Ce(e, t) {
                var a = "wyp-selected";
                window.ypData["wyp-control-key-down"] && C() && (a = "wyp-multiple-selected");
                var n = ua(e),
                        s = 0,
                        r = 0,
                        l = "";
                for (s = 0; s < n.length; s++) l += 0 < s ? window.separator + n[s] : n[s], 1 < Gi.find(l).length && Gi.find(l).each(function() {
                        ")" != l.substr(l.length - 1) && 0 < o(this).parent().length && (r = 0, o(this).parent().children().each(
                                function() {
                                        r++, (0 < o(this).find("." + a).length || o(this).hasClass(a)) && (l = l +
                                                ":nth-child(" + r + ")")
                                }))
                });
                if (-1 != l.indexOf(":nth-child")) {
                        for (n = ua(l), s = 0; s < n.length; s++) {
                                var d = Oe(n, s).join(" "),
                                        p = De(n, s).join(" "),
                                        c = d + window.separator + n[s].replace(/:nth-child\((.*?)\)/i, "") + window.separator + p;
                                c = _i(c), 1 == Gi.find(c).length && (n[s] = n[s].replace(/:nth-child\((.*?)\)/i, ""))
                        }
                        l = _i(n.join(" "))
                }
                return t ? l : (window.ypOption.show_css_selector && (l = Da(l)), ze(l))
        }

        function ze(e) {
                for (var t = ua(e), a = "", n = 0, s, r, l, d; n < t.length; n++) r = t[n].replace(/:nth-child\((.*?)\)/i, ""), l = _i(o.trim(a + window
                                .separator + r + window.separator + r)), d = Gi.find(l), s = d.length, 0 < s && d.hasClass("wyp-selected") ? a = _i(a) +
                        " > " + t[n] + window.separator : a += t[n] + window.separator;
                if (a = o.trim(a), 1 < Gi.find(a).length && (a = a.replace(/(?=[^ ]*$)/i, " > ")), -1 != a.indexOf(">")) {
                        var p = a.split(">").length,
                                c = Gi.find(a).length;
                        for (n = 1; n < p; n++) d = Gi.find(a.replace(/ > /i, " ")), d.length == c && d.hasClass("wyp-selected") && (a = a.replace(
                                / > /i, " "))
                }
                return /^[>\s]+/gi.test(a) && (a = a.replace(/^[>\s]+/gi, "")), _i(a)
        }

        function Oe(e, t) {
                for (var a = [], n = 0; n < e.length; n++) n < t && a.push(e[n]);
                return a
        }

        function De(e, t) {
                for (var a = [], n = 0; n < e.length; n++) n > t && a.push(e[n]);
                return a
        }

        function Ae() {
                o("#ed-elt-tr span").remove();
                var e = o("#ed-elt-tr ul");
                if (e.empty(), e.parent().removeClass("ed-eld-larger"), void 0 === _()) return !1;
                var t = _().parentsUntil("html").addBack(),
                        a = t.length,
                        n = "",
                        s = t.length,
                        r = "",
                        l, d, p;
                t.each(function(e) {
                        return !!(e < a - window.maxDeep) || void(l = this, l.classList.add("wyp-pa-r" + e), d = ya(l), p = Se(d, l),
                                n += s - 1 == e ? "<li data-index='" + e + "' data-parent-selector='" + d +
                                "' class='active'><span>" + p + "</span></li>" : "<li data-index='" + e +
                                "' data-parent-selector='" + d + "'><span>" + p + "</span></li>", r += p + " ")
                }), 70 < r.length && 4 < s && e.parent().addClass("ed-eld-larger"), e.append(n)
        }

        function Se(e, t) {
                var a = bi(e, !1, o(t));
                return (null == a || !1 == a) && (a = qi.unknown), a.toLowerCase() == qi.division && (a = e), a = a.replace(/\\/g, ""), a
        }

        function Te() {
                var e;
                if ("" == window.parentItems) {
                        e = "";
                        var t = _().parentsUntil("html"),
                                a = t.length - 1,
                                n;
                        t.each(function(t) {
                                        return !(t > window.maxDeep) && void(e = Se(ya(this), this), 22 < e.length && (e = e.substr(0, 21) +
                                                        "&hellip;"), n = "", !0 == Ee(null, "wyp-pa-r" + (a - t)) && (n = "Edited"), e =
                                                e + "<i class='wyp-contextmenu-small'>" + n + "</i>", window.parentItems +=
                                                "\"parent-" + t + "\" : {\"name\": \"" + e + "\"},")
                                }), window.parentItems += "\"show-more-parent-link\" : {\"name\": \"...\", \"className\": \"show-more-parent-link\"},",
                                window.parentItems = o.parseJSON("{" + window.parentItems.replace(/,$/g, "").toString() + "}")
                }
                "" == window.childrenItems && (e = "", _().children().each(function(t) {
                                return !(t > window.maxDeep) && void("BR" != o(this).prop("tagName").toUpperCase() && (e = Se(ya(this),
                                                this), 22 < e.length && (e = e.substr(0, 21) + "&hellip;"), window
                                        .childrenItems += "\"children-" + t + "\" : {\"name\": \"" + e + "\"},"))
                        }), window.childrenItems +=
                        "\"show-more-children-link\" : {\"name\": \"...\", \"className\": \"show-more-children-link\"},", window.childrenItems =
                        o.parseJSON("{" + window.childrenItems.replace(/,$/g, "").toString() + "}"))
        }

        function Ee(e, t) {
                var a = !1,
                        i = [],
                        n, s;
                if (i = Nt(e).selectors, !1 != i && null != i && 0 < i.length)
                        for (var o = 0; o < i.length; o++)
                                if ((n = xi(i[o], !0, !0, !0, !0), s = Ca(n, !0, !1, !1), !1 != s) && !0 == Gi.find(n).hasClass(t)) {
                                        a = !0;
                                        break
                                } return a
        }

        function Le() {
                o(".wyp-contextmenu-reset-single-childs,.wyp-contextmenu-reset-template-childs,.wyp-contextmenu-reset-global-childs,.wyp-contextmenu-reset-single-self,.wyp-contextmenu-reset-template-self,.wyp-contextmenu-reset-global-self")
                        .removeClass("wyp-disable-contextmenu");
                for (var e = [], a = 0, n = 0, s = 0, r = 0, l = 0, d = 0, p = [], c = null, u = ["global", "template", "single"], m = 0, f = 0, g, h,
                                y, w, v, b; f < u.length; f++) {
                        if (n = 0, s = 0, r = 0, c = u[f], o(".wyp-contextmenu-reset-" + c + "-childs,.wyp-contextmenu-reset-" + c + "-self").addClass(
                                        "wyp-disable-contextmenu"), w = Nt(c), c == E() && (v = w), p = w.selectors, e = w.rules, !1 == p || null ==
                                p || 0 >= p.length) {
                                o(".wyp-contextmenu-reset-" + c).addClass("wyp-disable-contextmenu");
                                continue
                        }
                        for (b = 0; b < p.length; b++)(h = e[b], g = xi(p[b], !0, !0, !0, !0), y = Ca(g, !0, !1, !1), !1 != y) && (0 < Gi.find(g)
                                .parents(".wyp-selected").length ? (o(".wyp-contextmenu-reset-" + c + "-childs").removeClass(
                                        "wyp-disable-contextmenu"), d++, a += h, n += h, s += h) : !0 == Gi.find(g).hasClass("wyp-selected") &&
                                (o(".wyp-contextmenu-reset-" + c + "-self").removeClass("wyp-disable-contextmenu"), l++, a += h, n += h, r += h)
                                );
                        0 == n && o(".wyp-contextmenu-reset-" + c).addClass("wyp-disable-contextmenu"), o(".wyp-contextmenu-reset-" + c +
                                "-self > span").html(o(".wyp-contextmenu-reset-" + c + "-self > span").nodeText() +
                                "<i class='wyp-contextmenu-small'>" + r + "</i>"), o(".wyp-contextmenu-reset-" + c + "-childs > span").html(o(
                                        ".wyp-contextmenu-reset-" + c + "-childs > span").nodeText() + "<i class='wyp-contextmenu-small'>" + s +
                                "</i>"), m += r
                }
                0 == l && 0 == d && o(".wyp-contextmenu-reset-styles").addClass("wyp-disable-contextmenu"), 0 == l ? o(".wyp-contextmenu-review-styles")
                        .addClass("wyp-disable-contextmenu") : o(".wyp-contextmenu-review-styles > span").html(o(
                                ".wyp-contextmenu-review-styles > span").nodeText() + "<i class='wyp-contextmenu-small'>" + m + "</i>"), o(
                                ".wyp-contextmenu-pseudo-classes .wyp-contextmenu-small").remove(), p = v.selectors;
                var x = "";
                if (!1 != p && null != p && 0 < p.length)
                        for (b = 0; b < p.length; b++) !1 != /(:|yp-selector-)(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)/g
                                .test(p[b]) && (x = p[b].match(
                                                /(:|\.yp-selector-)(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)/g)[0]
                                        .replace(/(\:|\.yp-selector-)/g, ""), g = xi(p[b], !0, !0, !0, !0), y = Ca(g, !0, !1, !1), !1 != y) && !0 == Gi
                                .find(g).hasClass("wyp-selected") && o(".wyp-contextmenu-" + x).append("<i class='wyp-contextmenu-small'>Edited</i>")
        }


        function Me(e) {
                if (!1 === window.leftBarSize && (window.leftBarSize = document.querySelector(".editor-leftbar").getBoundingClientRect()), "cursor" !==
                        window.ypData.inspector && window.ypData["wyp-met-dis"]) {
                        var t = o(e.target),
                                a = t.get(0),
                                i = C(),
                                n = t.prop("tagName").toLowerCase();
                        if (t.hasClass("wyp-iframe-ph") && void 0 !== window.ypData["wyp-will-selected"] && (t = window.ypData["wyp-will-selected"]), !
                                1 == window.setSelector && !1 == i && ("iframe" == n || "audio" == n || "video" == n) && !J(a)) {
                                var s = Ra(a),
                                        r = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()),
                                        l = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                                        d = s.width,
                                        p = s.height,
                                        c = s.top + l,
                                        u = s.left + r,
                                        m = t.css(["margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right",
                                                "padding-bottom", "padding-left"
                                        ]),
                                        f = m["margin-top"],
                                        g = m["margin-right"],
                                        h = m["margin-bottom"],
                                        y = m["margin-left"],
                                        w = m["padding-top"],
                                        v = m["padding-right"],
                                        b = m["padding-bottom"],
                                        x = m["padding-left"];
                                c -= parseFloat(f), u -= parseFloat(y), sn.extra.append("<div class='wyp-iframe-ph' style='transform:translate3d(" + u +
                                        "px, " + c + "px, 0px) !important;width:" + d + "px !important;height:" + p +
                                        "px !important;margin-top:" + f + ";margin-right:" + g + ";margin-bottom:" + h + ";margin-left:" + y +
                                        ";padding-top:" + w + ";padding-right:" + v + ";padding-bottom:" + b + ";padding-left:" + x +
                                        ";'></div>"), window.ypData["wyp-will-selected"] = t
                        }
                        if (!0 === i && !1 === window.ypData["wyp-control-key-down"] && (window.ypData["wyp-rcnt-hvr-el"] = t), window
                                .placeholderSelector) return !1;
                        if (t.hasClass("wyp-iframe-ph")) return !1;
                        if (!1 === window.ypData["wyp-control-key-down"]) {
                                if (window.firstSelectLimit) return !1;
                                if (!0 === i) return !1
                        }
                        if ("html" == n) return !1;
                        if (null === t) return !1;
                        if (0 === t.length) return !1;
                        !1 === i && (void 0 !== _() && _().removeClass("wyp-selected"), window.ypData["data-clickable-select"] = void 0, window.ypData
                                .get_selected_element = void 0, Gi.find(".wyp-selected-others").removeClass(".wyp-selected-others"), t.addClass(
                                        "wyp-selected"), window.ypData.get_selected_element = t);
                        var k;
                        if (k = !1 === window.setSelector ? Ma(t, "default") : window.setSelector, e.stopPropagation(), e.preventDefault(), !1 === i) {
                                var z = bi(k, !0, t),
                                        O = sn.general.find(".wyp-selected-tooltip");
                                0 == O.length && sn.general.append(
                                                "<div class='wyp-selected-tooltip'><div class='wyp-slct-tooltip'><span class='wyp-slct-menu'></span></div><small class='wyp-tooltip-small'></small></div>"
                                                ), sn.general.get(0).style.setProperty("--tooltip-selector", "\"" + o.trim(k) + "\""), sn.general.get(0)
                                        .style.setProperty("--tooltip-title", "\"" + z + "\"");
                                var D = Pa(),
                                        A = Ra(a, D),
                                        S = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                                        T = parseFloat(Ji.scrollLeft() + Ki.scrollLeft());
                                ti(k, void 0, {
                                        boxSize: A,
                                        scrollTop: S,
                                        scrollLeft: T,
                                        diff: D
                                }), ii({
                                        boxSize: A,
                                        scrollTop: S,
                                        scrollLeft: T,
                                        diff: D
                                })
                        } else window.ypData["wyp-control-key-down"] && 0 === t.parents(".wyp-selected").length && (Gi.find(".wyp-multiple-selected")
                                .removeClass("wyp-multiple-selected"), t.addClass("wyp-multiple-selected"), window.ypData["wyp-rcnt-hvr-el"] =
                                t, ti(t, "multiple"))
                }
        }

        function Ze() {
                if (void 0 === _()) return !1;
                var e = _().get(0),
                        t;
                return (J(e) ? (t = {}, t.width = 0, t.height = 0) : t = e.getBoundingClientRect(), 0 == t.width && 0 == t.height) ? (clearTimeout(
                        window.SelectedElHidden), window.SelectedElHidden = setTimeout(function() {
                        C() && (!Ji.hasClass("wyp-ele-n-vis") && Li("The Element Is Hidden",
                                        "The selected element is hidden in the current screen size.", "selectedElement"
                                        ), Ji.addClass("wyp-ele-n-vis"))
                }, 600), !1) : void(clearTimeout(window.SelectedElHidden), Bi("selectedElement"), Ji.removeClass("wyp-ele-n-vis"), Ia(
                        ".wyp-selected", "wyp-selected-boxed"), ti(), ii())
        }

        function Pe(e) {
                return "desktop" == e ? "" : "@media " + e + "{"
        }

        function Re(e) {
                return "desktop" == e ? "" : "}"
        }

        function Ie(e, t, i, n, s, o, l) {
                if (!1 == window.ypOption.smart_important_tag) return !1;
                s = je(s, t, i), e = at(e, t), i = i.replace(/\s+?!important/g, "").replace(/\;$/g, "");
                var d = a(null, !1);
                null == l && (l = c(d, "[selector=" + gi(e) + "][rule=" + t + "][msize=" + s + "]"));
                var p = null;
                if (p = c(d, "[selector=" + gi(e) + "][rule=" + h(t) + "][msize=" + s + "]"), null != p && (l = p + 1), r(u(a(null, !1), "[selector=" +
                                gi(e) + "][rule=" + t + "][msize=" + s + "]")), r(u(a(null, !1), "[selector=" + gi(e) + "][rule=" + h(t) + "][msize=" +
                                s + "]")), "animation-name" == t && $e(e, t, i, n, s, o), "disable" == i || "" == i || "undefined" == i || null === i)
                        return !1;
                "a" != i && !0 == window.ypOption.append_auto_comments && Ci(e, null);
                var f = Pe(s),
                        g = Re(s),
                        y = i + n;
                if ("" != gi(e) && (!0 === S() && "position" != t ? (Gi.find("#wyp-anim-scenes #" + gi(Qi.attr("data-anim-scene") + t)).remove(), Gi
                                .find("#wyp-anim-scenes #" + Qi.attr("data-anim-scene") + "").append("<style data-rule=\"" + t +
                                        "\" class=\"style-" + Qi.attr("data-anim-scene") + " scenes-" + gi(t) + "-style\">" + e + "{" + t +
                                        ":" + y + " !important}</style>")) : (d = a(null, !1), -1 != window.webkitArray.indexOf(t) && r(m(d, f +
                                e + "{-webkit-" + t + ":" + y + " !important}" + g, l)), r(m(a(null, !1), f + e + "{" + t + ":" + y +
                                " !important}" + g, l)))), Ji.hasClass("wyp-wf-on") && C()) {
                        var w = qt(t)[0];
                        ("color" == t || "background-color" == t || "background-image" == t || "box-shadow" == w || "border-color" == t ||
                                "text-shadow" == t || -1 != w.indexOf("-radius") || "filter" == w || "backdrop-filter" == w) && _().addClass(
                                "wyp-no-wf")
                }
                var v = nt(null, t, y);
                v.always(function(l) {
                        if (!1 == l) {
                                var d = ua(e).length;
                                if (12 < d + 1) return !1;
                                window.minCrpdSlctr = d + 1;
                                var p = Ma(Gi.find(".wyp-con-slcd .wyp-selected"), window.lastParentQueryStatus);
                                if (window.minCrpdSlctr = !1, ua(p).length <= d) return !1;
                                r(u(a(o, !1), "[selector=" + gi(e) + "][rule=" + t + "][msize=" + s + "]"), o), r(u(a(o, !1),
                                        "[selector=" + gi(e) + "][rule=" + h(t) + "][msize=" + s + "]"), o), Ie(p, t, i, n, s,
                                        o, "default"), setTimeout(function() {
                                        Ze()
                                }, window.Yellow2Delay)
                        }
                })
        }

        function Ye(e) {
                var t = o("<pre>");
                t.html(e), e = t.html();
                for (var a = e.replace(/\,\r?\n(\s+)?/g, function(e) {
                                var t = ",",
                                        i = e.match(/\r?\n/g);
                                if (i)
                                        for (var n = 0; n < i.length; n++) t += "tx8thk3bz1u9i6av";
                                return t
                        }).replace(/\r?\n(\s+)?\{/g, function(e) {
                                var t = "{",
                                        i = e.match(/\r?\n/g);
                                if (i)
                                        for (var n = 0; n < i.length; n++) t += "tx8thk3bz1u9i6av";
                                return t
                        }).replace(/\:\r?\n(\s+)?/g, function(e) {
                                var t = ":",
                                        i = e.match(/\r?\n/g);
                                if (i)
                                        for (var n = 0; n < i.length; n++) t += "tx8thk3bz1u9i6av";
                                return t
                        }).split(/\r?\n/g), s = {
                                open: 0,
                                isComment: !1,
                                close: 0
                        }, r = a.length, l = null, d = null, p = 0, c = 0, u, m, f, g, h, y, w, v, b; c < r; c++) {
                        if (u = a[c], m = null, g = 0, h = null, d = null, w = u.match(/\/\*/g), w && 0 < w.length && (s.isComment = !0), y = u.match(
                                        /\*\//g), s.isComment && y && 0 < y.length && (s.isComment = !1), /tx8thk3bz1u9i6av/.test(u) && (u = u.replace(
                                        /tx8thk3bz1u9i6av/g,
                                        function() {
                                                return p++, ""
                                        })), u = u.replace(/(\/\*)[^\n]+(\*\/)/g, ""), u = u.replace(/\s+/g, ""), u = u.replace(
                                        /(\"([^\"]+)?\"|\'([^\']+)?\'|\(([^\)]+)?\))/g, "np2ne4pf9j3x8hpj"), !1 == /\/\*/.test(u) && /\*\//.test(u) ?
                                u = u.replace(/^([^\n]+)?(\*\/)/g, "") : /\/\*/.test(u) && !1 == /\*\//.test(u) && (u = u.replace(/(\/\*)([^\n]+)?$/g,
                                        "")), w && 0 < w.length && 0 == u.length) continue;
                        else if (y && 0 < y.length && 0 == u.length) continue;
                        else if (null === w && null === y && s.isComment) continue;
                        else if (0 == u.length) continue;
                        if (f = u.match(/\}/g), m = u.match(/\{/g), m && (s.open += m.length, h =
                                        /^(\s+)?\@(keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes|media|supports|-webkit-supports|-moz-supports|-o-supports|document|-webkit-document|-moz-document|-o-document)/g
                                        .test(u) ? "function-open" : "selector-open"), f && (s.close += f.length), g = s.open - s.close,
                                "function-open" == h ? l = h : "selector-open" == h && 2 > g ? l = h : 0 == g && (l = null), null === f && null === m) {
                                if ("function-open" == l && 2 == g) {
                                        if (!1 === /^(\s+)?([^\:]+\:[^\;]+\;)/.test(u))
                                                if (v = u.match(/:/g), b = u.match(/\;/g), v && b && 0 < v.length && b.length === v.length);
                                                else if (!/^(\s+)?([^\:]+\:[^\;]+)/.test(u)) {
                                                d = {
                                                        text: "Invalid CSS property at line " + (c + p + 1),
                                                        index: c + 1
                                                };
                                                break
                                        } else if (!1 == a[c + 1] || !1 == /^[^\:\;]+$/g.test(a[c + 1].replace(/\/\*([^\n]+)?\*\//g, ""))) {
                                                d = {
                                                        text: "expected character: ; at line " + (c + p + 1),
                                                        index: c + 1
                                                };
                                                break
                                        }
                                } else if ("selector-open" == l && 1 == g && !1 === /^(\s+)?([^\:]+\:[^\;]+\;(\s+)?$)/.test(u))
                                        if (v = u.match(/:/g), b = u.match(/\;/g), v && b && 0 < v.length && b.length === v.length);
                                        else if (!/^(\s+)?([^\:]+\:[^\;]+)/.test(u)) {
                                        d = {
                                                text: "Invalid CSS property at line " + (c + p + 1),
                                                index: c + 1
                                        };
                                        break
                                } else if (!1 == a[c + 1] || !1 == /^[^\:\;]+$/g.test(a[c + 1].replace(/\/\*([^\n]+)?\*\//g, ""))) {
                                        d = {
                                                text: "expected character: ; at line " + (c + p + 1),
                                                index: c + 1
                                        };
                                        break
                                }
                                if (/(^[^\:]+$|^(\s+)?\@(keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes|media|supports|-webkit-supports|-moz-supports|-o-supports|document|-webkit-document|-moz-document|-o-document))/
                                        .test(u) && 0 !== u.length)
                                        if (/^(\s+)?\@(keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes|media|supports|-webkit-supports|-moz-supports|-o-supports|document|-webkit-document|-moz-document|-o-document)/g
                                                .test(u)) {
                                                d = {
                                                        text: "expected character: { at line " + (c + p + 1),
                                                        index: c + 1
                                                };
                                                break
                                        } else if (!1 === /(\/\*|\*\/)/g.test(u))
                                        if (/^(\s+)?\@(charset|import|namespace)/.test(u)) {
                                                d = {
                                                        text: "unsupported feature at line " + (c + p + 1),
                                                        index: c + 1
                                                };
                                                break
                                        } else {
                                                d = {
                                                        text: "expected character: { at line " + (c + p + 1),
                                                        index: c + 1
                                                };
                                                break
                                        }
                        }
                        if (1 < g && "function-open" !== l) {
                                d = {
                                        text: "unexpected character: { at line " + (c + p + 1),
                                        index: c + 1
                                };
                                break
                        }
                        if ("function-open" === l &&
                                /^(\s+)?\@(keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes|supports|-webkit-supports|-moz-supports|-o-supports|document|-webkit-document|-moz-document|-o-document)/
                                .test(u)) {
                                d = {
                                        text: "unsupported feature at line " + (c + p + 1),
                                        index: c + 1
                                };
                                break
                        }
                }
                d || (s.open > s.close ? d = {
                        text: "expected character: } at line " + (c + p),
                        index: c
                } : s.close > s.open ? d = {
                        text: "unexpected character: } at line " + (c + p),
                        index: c
                } : s.isComment && (d = {
                        text: "expected character: */ at line " + (c + p),
                        index: c
                })), tn.removeClass("css-code-unvalid"), n.getSession().setAnnotations([]), d ? (tn.addClass("css-code-unvalid"), o(
                                ".unvalid-css-error span").text(d.text), o(".unvalid-css-error").attr("data-error-index", d.index + p), n
                        .getSession().setAnnotations([{
                                row: d.index - 1 + p,
                                column: 0,
                                text: d.text,
                                type: "error"
                        }])) : tn.removeClass("css-error-message")
        }

        function Ne(e) {
                var t;
                e = e.replace(/\}/g, "}\n"), e = e.replace(
                        /(^|\s|\}|\*\/)(.*?):(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid){/g,
                        function(e) {
                                return t = "", -1 != e.indexOf("\n") && (e = e.replace(/\n/g, ""), t = "\n"), t + Xe(e)
                        }), e = e.replace(/\:yp-onscreen/g, ".yp_onscreen").replace(/\:yp-focus/g, ".yp_focus").replace(/\:yp-hover/g,
                        ".yp_hover").replace(/\:yp-click/g, ".yp_click");
                var a = new RegExp("([^-])(" + window.webkitArray.join("|") + "):(.*?);", "g");
                return e = e.replace(a, "$1-webkit-$2:$3;\n\t$2:$3;"), e
        }

        

        

        function Fe() {
                var e = "desktop";
                if (A()) {
                        var t, a;
                        t = 0 < o(".breakpoint-bar .breakpoint-item.focus").length ? o(".breakpoint-bar .breakpoint-item.focus").attr(
                                "data-breakpoint") : o("#iframe").width(), a = o(".media-control").attr("data-code"), e = "(" + a + ":" + t + "px)"
                }
                return e
        }



        function Ve(e, t) {
                return !0 === t ? (e = e.replace(/:nth-child\((.*?)\)/g, ".nth-child.$1."), e = e.replace(/:not\((.*?)\)/g, ".notYP$1YP"), e = e
                        .replace(/:lang\((.*?)\)/g, ".langYP$1YP"), e = e.replace(/:nth-last-child\((.*?)\)/g, ".nth-last-child.$1."), e = e
                        .replace(/:nth-last-of-type\((.*?)\)/g, ".nth-last-of-type.$1."), e = e.replace(/:nth-of-type\((.*?)\)/g,
                                ".nth-of-type.$1.")) : (e = e.replace(/\.nth-child\.(.*?)\./g, ":nth-child($1)"), e = e.replace(
                        /\.notYP(.*?)YP/g, ":not($1)"), e = e.replace(/\.langYP(.*?)YP/g, ":lang($1)"), e = e.replace(
                        /\.nth-last-child\.(.*?)\./g, ":nth-last-child($1)"), e = e.replace(/\.nth-last-of-type\.(.*?)\./g,
                        ":nth-last-of-type($1)"), e = e.replace(/\.nth-of-type\.(.*?)\./g, ":nth-of-type($1)")), e
        }

        function Ue(e, t, a, i) {
                var n = "",
                        s = Pe(i),
                        o = Re(i);
                if ("" != gi(e) && "disable" != a) {
                        n = d(s + e + "{" + t + ":" + a + "}" + o)
                }
                return n
        }

        function qe(e) {
                tn.addClass("process-by-code-editor");
                var t = Ne(Et(!0, null, !1));
                t = Ve(t, !0), t = t.replace(/(\r\n|\n|\r)/g, "").replace(/\t/g, ""), t = t.replace(/\}\s+\}/g, "}}").replace(/\s+\{/g, "{").replace(
                        /\}\s+/g, "}"), t = t.replace(/\s+\}/g, "}").replace(/\{\s+/g, "{"), t = ka(t);
                var a = t;
                if (t = t.replace(/(\/\*)(.*?)\*\/(\s+)?/g, ""), t = t.replace(/@?([a-zA-Z0-9_-]+)?keyframes(.*?)\}\}/g, "").replace(
                                /@(-webkit-|-moz-|-o-)?(supports|document)(.*?)\}\}/g, ""), "desktop" != e) {
                        var n = o.trim(e.replace(/\)/g, "\\)").replace(/\(/g, "\\(")),
                                s = new RegExp(n + "(.*?)}}", "g"),
                                r = new RegExp(n, "g");
                        null != t.match(s) && (t = t.match(s).toString()), t = t.replace(r, ""), t = t.toString().replace(/\}\}/g, "}")
                } else t = t.replace(/@media(.*?)\}\}/g, "");
                if ("" == t) return tn.removeClass("process-by-code-editor"), !1;
                var d = "",
                        p;
                "desktop" == e && St().empty(), t = t.toString().replace(/\}\,/g, "}");
                var c = hi(t.replace(/\{(.*?)\}/g, "|BREAK|").split("|BREAK|")),
                        u = e.toString().replace(/\{/g, "").replace(/@media /g, "").replace(/@media/g, "");
                t = "}" + t, t = t.replace(/\}/g, "}}");
                for (var m = 0; m < c.length; m++)
                        if ((p = c[m], null != p && "" != p) && (p = p.trim(), -1 == p.indexOf("}") && -1 == p.indexOf("{"))) {
                                var f = Na(p),
                                        g = window.selectorComments[gi(p)];
                                null != g && null != g && !1 == new RegExp("\\/\\*(.*?)\\*\\/" + f + "{", "gi").test(a) && delete window
                                        .selectorComments[gi(p)];
                                var h = t.match(new RegExp("}" + f + "{(.*?)}", "g"));
                                if (p = Ve(_i(p), !1), null !== h && "" != h) {
                                        h = h.toString().match(/\{(.*?)\}/g).toString().replace(/\}\,\{/g, ";").replace(/\{/g, "").replace(/\}/g, "")
                                                .replace(/\;\;/g, ";"), h = h.replace(/\((.*?)\)|\"(.*?)\"/g, function(e) {
                                                        return e.replace(/\;/g, "YxkHNXdP")
                                                }), h = h.replace(/\((.*?)\)|\"(.*?)\"/g, function(e) {
                                                        return e.replace(/\:/g, "HXImiddP")
                                                }), h = h.split(";");
                                        for (var y = 0, w, v, b; y < h.length; y++) w = o.trim(h[y]).replace(/YxkHNXdP/g, ";").replace(/HXImiddP/g,
                                                ":"), void 0 !== w && 3 <= w.length && -1 != w.indexOf(":") && (v = w.split(":")[0], "" != v && "a" !=
                                                        v && (b = w.split(":").slice(1).join(":"), "" != b && (d += Ue(p, v, b, u))))
                                }
                        }
                "" != d && l(d), tn.removeClass("process-by-code-editor")
        }

        function $e(e, t, a, i, n, s) {
                if ("disable" != a && "none" != a && C() && !1 === T()) {
                        var r = _();
                        if (!1 === o("#animation-duration-group").hasClass("hidden-option") && !1 === o("#animation-delay-group").hasClass(
                                        "hidden-option")) {
                                var l = r.css("animationDuration").replace(/[^0-9.,]/g, ""),
                                        d = r.css("animationDelay").replace(/[^0-9.,]/g, "");
                                xi(e, !1, !1, !0, !0) == _a().trim() && ("0" == l && (l = 1), tt(e, "animation-duration", l + "s", i, n, s), 0 > d && (
                                        d = 0), tt(e, "animation-delay", d + "s", i, n, s))
                        }
                        var p = r.css("animationFillMode");
                        (null == p || "none" == p) && (p = "both"), tt(_a(), "animation-fill-mode", p, i, n, s), pa("animation-duration"), pa(
                                "animation-delay"), pa("animation-fill-mode")
                }
                "bounce" == a ? tt(e, "transform-origin", "center bottom", i, n, s) : "swing" == a ? tt(e, "transform-origin", "top center", i, n, s) :
                        "jello" == a ? tt(e, "transform-origin", "center", i, n, s) : tt(e, "transform-origin", "disable", i, n, s), "lightSpeedIn" ==
                        a || "heartBeat" == a || "headShake" == a ? tt(e, "animation-timing-function", "ease-out", i, n, s) : "lightSpeedOut" == a ? tt(
                                e, "animation-timing-function", "ease-in", i, n, s) : tt(e, "animation-timing-function", "disable", i, n, s), "flip" ==
                        a || "flipInX" == a || "flipInY" == a || "flipOutX" == a || "flipOutY" == a ? tt(e, "backface-visibility", "visible", i, n, s) :
                        tt(e, "backface-visibility", "disable", i, n, s)
        }

        function Ge(e, t) {
                var a = xi(e, !0, !0, !0, !0),
                        i = xi(t, !0, !0, !0, !0),
                        n = Ca(a, !0, !1, !1);
                if (!1 == n) return !1;
                var s = Ca(i, !0, !1, !1);
                if (!1 == s) return !1;
                n.addClass("test-selector1-group");
                var o = s.filter(".test-selector1-group");
                return n.removeClass("test-selector1-group"), s.length == o.length && n.length == s.length && 0 != n.length && /yp-selector-hover/g
                        .test(e) == /yp-selector-hover/g.test(t) && /yp-selector-focus/g.test(e) == /yp-selector-focus/g.test(t) &&
                        /yp-selector-active/g.test(e) == /yp-selector-active/g.test(t) && /yp-selector-visited/g.test(e) == /yp-selector-visited/g.test(
                                t) && /yp-selector-link/g.test(e) == /yp-selector-link/g.test(t) && /yp-selector-checked/g.test(e) ==
                        /yp-selector-checked/g.test(t) && /yp-selector-disabled/g.test(e) == /yp-selector-disabled/g.test(t) && /yp-selector-enabled/g
                        .test(e) == /yp-selector-enabled/g.test(t) && /yp-selector-invalid/g.test(e) == /yp-selector-invalid/g.test(t) &&
                        /yp-selector-valid/g.test(e) == /yp-selector-valid/g.test(t) && /wyp-scene-1/g.test(e) == /wyp-scene-1/g.test(t) &&
                        /wyp-scene-2/g.test(e) == /wyp-scene-2/g.test(t) && /wyp-scene-3/g.test(e) == /wyp-scene-3/g.test(t) && /wyp-scene-4/g.test(
                        e) == /wyp-scene-4/g.test(t) && /wyp-scene-5/g.test(e) == /wyp-scene-5/g.test(t) && /wyp-scene-6/g.test(e) == /wyp-scene-6/g
                        .test(t) && /wyp-selected/g.test(e) == /wyp-selected/g.test(t) && /yp(-|_)onscreen/g.test(e) == /yp(-|_)onscreen/g.test(t) &&
                        /yp(-|_)hover/g.test(e) == /yp(-|_)hover/g.test(t) && /yp(-|_)focus/g.test(e) == /yp(-|_)focus/g.test(t) && /yp(-|_)click/g
                        .test(e) == /yp(-|_)click/g.test(t) && /:active/g.test(e) == /:active/g.test(t) && /:checked/g.test(e) == /:checked/g.test(t) &&
                        /:disabled/g.test(e) == /:disabled/g.test(t) && /:empty/g.test(e) == /:empty/g.test(t) && /:enabled/g.test(e) == /:enabled/g
                        .test(t) && /:hover/g.test(e) == /:hover/g.test(t) && /:focus/g.test(e) == /:focus/g.test(t) && /:in-range/g.test(e) ==
                        /:in-range/g.test(t) && /:invalid/g.test(e) == /:invalid/g.test(t) && /:lang/g.test(e) == /:lang/g.test(t) && /:link/g.test(
                        e) == /:link/g.test(t) && /:optional/g.test(e) == /:optional/g.test(t) && /:out-of-range/g.test(e) == /:out-of-range/g.test(
                        t) && /:valid/g.test(e) == /:valid/g.test(t) && /:visited/g.test(e) == /:visited/g.test(t) && /body\.logged-in/g.test(e) ==
                        /body\.logged-in/g.test(t) && /body\.non-logged-in/g.test(e) == /body\.non-logged-in/g.test(t)
        }

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        function Aa(e, t, a, s, o) {
                var r = e.slice(0),
                        l, d, p, c, u;
                for (d = 0; d < e.length; d++)
                        for (l = e[d], u = a + window.separator + l + window.separator + s, an.querySelectorAll(u).length == o && t.push(u), r.shift(),
                                p = 0; p < r.length; p++) c = r[p], u = a + window.separator + l + window.separator + c + window.separator + s, an
                                .querySelectorAll(u).length == o && t.push(u);
                return t
        }

        

        

        

        

        


        function Za(e, t, a) {
                var i = Gi.find(e),
                        n = Gi.find(o.trim(e.match(new RegExp("^(.*?)(?=" + Na(t) + "$)", "g")).join("").toString()) + window.separator + a
                        .toLowerCase());
                if (1 == i.length && 1 == n.length) return !0;
                if (i.length == n.length && /.|#/g.test(t)) {
                        var s = [],
                                r = [];
                        Gi.find(t).each(function() {
                                var e = o(this);
                                s.push(e.parents().length), r.push(e.prop("tagName"))
                        });
                        var l = s.every(function(e, t, i) {
                                        return e === i[0]
                                }),
                                d = r.every(function(e, t, i) {
                                        return e === i[0]
                                });
                        if (l && d) return !0
                }
                return !1
        }

        function Pa() {
                if (60 < (Date.now() - Rn) / 1e3) {
                        var e = Ji.css(["position", "transform"]);
                        if ("relative" === e.position || "none" !== e.transform) {
                                var t = Ji.offset();
                                In = 0 - t.top, Yn = 0 - t.left
                        }
                        Rn = Date.now()
                }
                return {
                        top: In,
                        left: Yn
                }
        }

        function Ra(e, t) {
                var a = e.getBoundingClientRect(),
                        i = {
                                x: a.left,
                                y: a.top,
                                top: a.top,
                                left: a.left,
                                bottom: a.bottom,
                                right: a.right,
                                width: a.width,
                                height: a.height
                        },
                        n;
                return n = t ? t : Pa(), i.y += n.top, i.top = i.y, i.bottom = i.top + i.height, i.x += n.left, i.left = i.x, i.right = i.left + i
                        .width, i
        }

        function Ia(e, t, a) {
                if (C()) {
                        var i = "object" == typeof e ? o(e) : Gi.find(e);
                        var n = C(),
                                s = !1;
                        if (n && (s = !0), 0 < i.length) {
                                var r = "",
                                        l = "",
                                        d = "",
                                        p = "",
                                        c = "",
                                        u = "",
                                        m = "",
                                        f = "",
                                        g, h, y, w, v, b, x, _, k, z, O, D, S, T;
                                if (s) {
                                        var E = i.css(["margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right",
                                                "padding-bottom", "padding-left"
                                        ]);
                                        g = E["margin-top"], w = E["margin-right"], h = E["margin-bottom"], y = E["margin-left"], v = E["padding-top"],
                                                _ = E["padding-right"], b = E["padding-bottom"], x = E["padding-left"], 0 >= parseFloat(g) && (g =
                                                        "0px"), 0 >= parseFloat(h) && (h = "0px"), 0 >= parseFloat(w) && (w = "0px"), 0 >= parseFloat(
                                                y) && (y = "0px"), k = y, z = w, O = parseInt(v), D = parseInt(_), S = parseInt(b), T = parseInt(x),
                                                0 == parseInt(v) && (v = "12px"), 0 == parseInt(_) && (_ = "10px"), 0 == parseInt(b) && (b = "12px"),
                                                0 == parseInt(x) && (x = "12px"), on.find(".wyp-zero-m-h").removeClass("wyp-zero-m-h"), 0 == parseInt(
                                                g) && n && (g = "10px", sn.active.find(".wyp-selected-boxed-margin-top").addClass("wyp-zero-m-h"))
                                }
                                var L = i.get(0);
                                if (J(L)) return !1;
                                var B, M, Z;
                                a ? (B = a.boxSize, M = a.scrollTop, Z = a.scrollLeft) : (B = Ra(L), M = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                                        Z = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()));
                                var P = B.width,
                                        R = B.height,
                                        I = B.top + M,
                                        Y = B.left + Z,
                                        N = B.bottom + M,
                                        H = Gi.height();
                                !0 == n && 0 == parseInt(h) && Math.round(N) != H && Math.round(N + 2) != H && (h = "10px", sn.active.find(
                                                ".wyp-selected-boxed-margin-bottom").addClass("wyp-zero-m-h")), !0 == n && Math.round(N) == H || Math
                                        .round(N + 2) == H ? Ji.addClass("wyp-selected-bottom") : Ji.removeClass("wyp-selected-bottom");
                                var W = o("#iframe").width(),
                                        F = W - Ki.width(),
                                        j = o(window).width() - F,
                                        X = 1;
                                n && (X = 2), Y + P > j ? P = j - Y - X : A() && (Y + P > W && (P = W - Y - F), W == P && Ki.height() > o("#iframe")
                                        .height() && (P -= F));
                                var V = Y + P - X;
                                if (Y + P + 2 >= W - F ? Ji.addClass("wyp-full-width-selected") : Ji.removeClass("wyp-full-width-selected"), s) {
                                        var U = !1;
                                        W == parseFloat(2 * y) + P && 0 < parseFloat(y) ? U = !0 : 0 < i.parent().length && parseFloat(i.parent()
                                                .width()) == 2 * parseFloat(y) + P && 0 < parseFloat(y) && (U = !0), W - F > Y + P + 30 && (on.find(
                                                                ".wyp-zero-m-w").removeClass("wyp-zero-m-w"), 0 == parseInt(w) && n && (w = "10px",
                                                                U = !1, sn.active.find(".wyp-selected-boxed-margin-right").addClass("wyp-zero-m-w")),
                                                        0 == parseInt(y) && n && (y = "10px", U = !1, sn.active.find(".wyp-selected-boxed-margin-left")
                                                                .addClass("wyp-zero-m-w"))), 30 < parseInt(g) && (r = parseInt(g) + "px"), 30 <
                                                parseInt(w) && (l = parseInt(w) + "px"), 30 < parseInt(h) && (d = parseInt(h) + "px"), 30 < parseInt(
                                                y) && (p = parseInt(y) + "px"), 30 < parseInt(v) && (c = parseInt(v) + "px"), 30 < parseInt(_) && (u =
                                                        parseInt(_) + "px"), 30 < parseInt(b) && (m = parseInt(b) + "px"), 30 < parseInt(x) && (f =
                                                        parseInt(x) + "px"), U && (p = "Auto", l = "Auto")
                                }
                                if (1 < R && 1 < P) {
                                        if (0 === on.find("." + t + "-top").length) {
                                                var q = "<div class='" + t + "-top'></div><div class='" + t + "-bottom'></div><div class='" + t +
                                                        "-left'></div><div class='" + t + "-right'></div>";
                                                q += 10 >= parseFloat(g) ? "<div class='" + t + "-margin-top wyp-zero-m-h'>" + r + "</div>" :
                                                        "<div class='" + t + "-margin-top'>" + r + "</div>", q += 10 >= parseFloat(w) ? "<div class='" +
                                                        t + "-margin-right wyp-zero-m-w'>" + l + "</div>" : "<div class='" + t + "-margin-right'>" + l +
                                                        "</div>", q += 10 >= parseFloat(h) ? "<div class='" + t + "-margin-bottom wyp-zero-m-h'>" + d +
                                                        "</div>" : "<div class='" + t + "-margin-bottom'>" + d + "</div>", q += 10 >= parseFloat(y) ?
                                                        "<div class='" + t + "-margin-left wyp-zero-m-w'>" + p + "</div>" : "<div class='" + t +
                                                        "-margin-left'>" + p + "</div>", q += "<div class='" + t + "-padding-left'>" + f +
                                                        "</div><div class='" + t + "-padding-top'>" + c + "</div><div class='" + t +
                                                        "-padding-bottom'>" + m + "</div><div class='" + t + "-padding-right'>" + u + "</div>", sn
                                                        .active.append(q)
                                        } else s && (sn.active.find("." + t + "-margin-top").text(r), sn.active.find("." + t + "-margin-right").text(l),
                                                sn.active.find("." + t + "-margin-bottom").text(d), sn.active.find("." + t + "-margin-left")
                                                .text(p), sn.active.find("." + t + "-padding-top").text(c), sn.active.find("." + t +
                                                        "-padding-right").text(u), sn.active.find("." + t + "-padding-bottom").text(m), sn
                                                .active.find("." + t + "-padding-left").text(f));
                                        var $ = "." + t + "-top{top:" + I + "px !important;left:" + Y + "px !important;width:" + P +
                                                "px !important;border-bottom:" + (R - 2) + "px solid rgba(66, 133, 244, 0.04) !important;}";
                                        if ($ += "." + t + "-bottom{top:" + N + "px !important;left:" + Y + "px !important;width:" + P +
                                                "px !important;}", $ += "." + t + "-left{top:" + I + "px !important;left:" + Y +
                                                "px !important;height:" + R + "px !important;}", $ += "." + t + "-right{top:" + I +
                                                "px !important;left:" + V + "px !important;height:" + R + "px !important;}", s) {
                                                var G = parseFloat(I) - parseFloat(g),
                                                        K = parseFloat(Y) - parseFloat(y),
                                                        Q = N - parseFloat(b),
                                                        ee = V - parseFloat(_),
                                                        te = parseFloat(w);
                                                V + 2 + parseFloat(w) > W - F && (te = W - F - (V + 2));
                                                var ae = parseFloat(P) + parseFloat(k) + parseFloat(z),
                                                        ie = parseFloat(Y) - parseFloat(k);
                                                ie + ae > j && (ae = P + parseFloat(k)), $ += "." + t + "-margin-top{transform: translate3d(" + ie +
                                                        "px, " + G + "px, 0) !important;width:" + ae + "px !important;height:" + parseFloat(g) +
                                                        "px !important;}", $ += "." + t + "-margin-bottom{transform: translate3d(" + ie + "px, " + N +
                                                        "px, 0) !important;width:" + ae + "px !important;height:" + parseFloat(h) + "px !important;}",
                                                        $ += "." + t + "-margin-left{transform: translate3d(" + K + "px, " + I +
                                                        "px, 0) !important;width:" + parseFloat(y) + "px !important;height:" + R + "px !important;}",
                                                        $ += "." + t + "-margin-right{transform: translate3d(" + (parseFloat(V) + 2) + "px, " + I +
                                                        "px, 0) !important;width:" + parseFloat(te) + "px !important;height:" + R + "px !important;}",
                                                        $ += "." + t + "-padding-top{transform: translate3d(" + parseFloat(Y) + "px, " + I +
                                                        "px, 0) !important;width:" + P + "px !important;height:" + parseFloat(v) + "px !important;}",
                                                        $ += "." + t + "-padding-bottom{transform: translate3d(" + parseFloat(Y) + "px, " + Q +
                                                        "px, 0) !important;width:" + P + "px !important;height:" + parseFloat(b) + "px !important;}",
                                                        $ += "." + t + "-padding-left{transform: translate3d(" + parseFloat(Y) + "px, " + I +
                                                        "px, 0) !important;width:" + parseFloat(x) + "px !important;height:" + parseFloat(R) +
                                                        "px !important;}", $ += "." + t + "-padding-right{transform: translate3d(" + parseFloat(ee) +
                                                        "px, " + I + "px, 0) !important;width:" + parseFloat(_) + "px !important;height:" + parseFloat(
                                                                R) + "px !important;}", 0 == parseInt(O) && ($ += "." + t +
                                                                "-padding-top:before{display:none !important;}"), 0 == parseInt(D) && ($ += "." + t +
                                                                "-padding-right:before{display:none !important;}"), 0 == parseInt(S) && ($ += "." + t +
                                                                "-padding-bottom:before{display:none !important;}"), 0 == parseInt(T) && ($ += "." + t +
                                                                "-padding-left:before{display:none !important;}")
                                        }
                                        var ne = Ji.find("#wyp-drw-bx");
                                        0 < ne.length ? ne.text($) : Ji.append("<style id='wyp-drw-bx'>" + $ + "</style>")
                                }
                        }
                }
        }

        function Ya(e) {
                var t = !1;
                if (/\bhandheld\b|\baural\b|\bbraille\b|\bembossed\b|\bprojection\b|\btty\b|\btv\b|\bprint\b|\b3d-glasses\b/.test(e)) return !1;
                if (/,|\bnot\b/.test(e)) return !1;
                var a = parseFloat(Ki.css("fontSize"));
                e = e.replace(/[0-9. ]+(rem|em)/g, function(e) {
                        return parseFloat(e) * a + "px"
                });
                var i = e.match(/\((.*?)\)/g),
                        n = [];
                return o.each(i, function(e, a) {
                        return !1 == /max-width|min-width/.test(a) ? (t = !0, !1) : void(a = a.replace(/\(|\)|:|px|\s+/g, ""), a = a
                                .replace(/min-width/g, ">"), a = a.replace(/max-width/g, "<"), a = a.replace(/(\d+)\.(\d+)/g,
                                        "$1"), n.push(a))
                }), 0 === n.length && (t = !0), !1 == t && n.toString()
        }

        function Na(e) {
                return e.replace(/\\/g, "\\\\").replace(/\//g, "\\/").replace(/\./g, "\\.").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\(/g,
                                "\\(").replace(/\)/g, "\\)").replace(/\^/g, "\\^").replace(/\$/g, "\\$").replace(/\*/g, "\\*").replace(/\:/g, "\\:")
                        .replace(/\+/g, "\\+").replace(/\?/g, "\\?").replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/\|/g, "\\|")
        }

        function Ha(e) {
                var t = null;
                return t = -1 == e.indexOf(",") ? e.replace(/([^\d+])(\d+)/g, "$2$1").replace(/</g, " and smaller").replace(/\>/g, " and larger")
                        .replace(/\.\d+/g, "").replace(/(\d+)(\s|$)/g, "$1px$2") + " screen sizes" : "screen sizes " + e.replace(/</g, "smaller than ")
                        .replace(/\>/g, "larger than ").replace(/\,/g, " and ").replace(/\.\d+/g, "").replace(/(\d+)(\s|$)/g, "$1px$2"), t = t.replace(
                                /(\d+)\./g, ""), t
        }

        function Wa(e) {
                if (!K(e)) return e;
                var t, a;
                if (null == e || !1 == e) return !1;
                if (e = e.toString(), t = parseInt(mi(e.replace(/</g, "").replace(/\>/g, ""))), a = "", -1 == e.indexOf(",") && -1 == e.indexOf(
                        "and") && (-1 != e.indexOf(">") && (a = "(min-width:" + t + "px)"), -1 != e.indexOf("<") && (a = "(max-width:" + t + "px)")), -
                        1 != e.indexOf(",")) {
                        var n = e.split(",");
                        a = "";
                        for (var s = 0, r = 0; r < n.length; r++) s = parseInt(mi(n[r].replace(/</g, "").replace(/\>/g, ""))), -1 != n[r].indexOf(
                                ">") && (a += "and (min-width:" + s + "px) "), -1 != n[r].indexOf("<") && (a += "and (max-width:" + s + "px) ");
                        a = o.trim(a).replace(/\s+/g, " ").replace(/^and /g, "")
                }
                return a
        }

        function Fa(e, t) {
                var a = [],
                        i;
                return (o.each(e, function(e, n) {
                        -1 != n.indexOf(">") && -1 != n.indexOf(",") && -1 != n.indexOf("<") && (i = parseInt(Math.abs(n.split(
                                ",")[0].replace(/(<|\>)/g, "") - t) + Math.abs(n.split(",")[1].replace(
                                /(<|\>)/g, "") - t)), a.push({
                                diff: i,
                                index: e
                        }))
                }), 0 == a.length) ? null : (a.sort(function(e, t) {
                        return e.diff > t.diff ? 1 : t.diff > e.diff ? -1 : 0
                }), e[a[0].index])
        }

        function ja(e, t) {
                var a = null;
                return o.each(e, function(e, i) {
                        -1 != i.indexOf(">") && -1 == i.indexOf(",") && (i = parseInt(i.replace(/(<|\>|\,)/g, "")), (null == a || Math
                                .abs(i - t) < Math.abs(a - t)) && (a = i))
                }), a
        }

        function Xa(e, t) {
                var a = null;
                return o.each(e, function(e, i) {
                        -1 != i.indexOf("<") && -1 == i.indexOf(",") && (i = parseInt(i.replace(/(<|\>|\,)/g, "")), (null == a || Math
                                .abs(i - t) < Math.abs(a - t)) && (a = i))
                }), a
        }

        function Va(e) {
                if (S() || A()) return !1;
                var t = [],
                        a = [],
                        i = [],
                        n, s, r, l;
                if (s = o("#iframe").width(), n = qa(!1, e, !0, !1), 0 == n.length) return !1;
                if (o.each(n, function(e, n) {
                                r = Ya(n), !1 !== r && (t.push(r), l = _i(n.replace("@media", "")), nn.matchMedia(l).matches ? a.push(r) : i
                                        .push(r))
                        }), 0 < a.length) {
                        var d = ja(a, s),
                                p = Xa(a, s),
                                c = Fa(a, s);
                        return null == c ? null == d ? Wa("<" + p) : Wa(">" + d) : Wa(c)
                }
                return Ua(i, s)
        }

        function Ua(e, t) {
                var a = !1,
                        i = ja(e, t),
                        n = Xa(e, t);
                if (null == i || null == n) {
                        var s, o, r, l, d;
                        d = Fa(e, t), null != d && (s = d.split(",")[0], o = d.split(",")[1], -1 == s.indexOf("<") ? l = s : r = s, -1 == o.indexOf(
                                "<") ? l = o : r = o, r = parseInt(r.replace(/(<|\>|\,)/g, "")), l = parseInt(l.replace(/(<|\>|\,)/g, "")),
                                null == n && r < t && (n = r), null == i && l > t && (i = l))
                }
                return null != i && --i, null != n && ++n, null != n && null != i ? a = "(min-width:" + n + "px) and (max-width:" + i + "px)" : null ==
                        n ? null != i && (a = "(max-width:" + i + "px)") : a = "(min-width:" + n + "px)", a
        }

        function qa(e, a, s, o) {
                for (var r = an.styleSheets, l = null, d = [], c = [], u = [], m = [], f = !1, g = 0, h, y, w, v, b, x, _, C, z, O; g < r.length; g++) {
                        try {
                                _ = r[g]
                        } catch (t) {
                                continue
                        }
                        if ((O = _.ownerNode.className, O = O + " " + _.ownerNode.id, -1 == O.indexOf("wyp-drw-bx") && -1 == O.indexOf(
                                        "wyp-ui-transform-hide")) && !(s && (-1 != O.indexOf("wyp-inline-data") || -1 != O.indexOf(
                                        "wyp-live-css-data") || -1 != O.indexOf("wyp-styles-area"))) && !(o && -1 == O.indexOf("wyp-inline-data") && -
                                        1 == O.indexOf("wyp-live-css-data") && -1 == O.indexOf("wyp-styles-area")) && (l = _.href, null == l && (l =
                                                location.protocol + "//" + window.location.hostname), -1 == l.indexOf("waspthemes-yellow-pencil") && -
                                        1 == l.indexOf("animate") && -1 == l.indexOf("webkit") && -1 == l.indexOf("animation") && -1 == l.indexOf(
                                                "keyframe") && -1 == l.indexOf("font") && -1 == l.indexOf("icon") && -1 == l.indexOf(
                                        "googleapis.com") && -1 == l.indexOf("print") && -1 == l.indexOf("reset") && -1 == l.indexOf("player") && -1 ==
                                        l.indexOf("video") && -1 == l.indexOf("audio") && "ie" != l && -1 == l.indexOf("ie6") && -1 == l.indexOf(
                                        "ie7") && -1 == l.indexOf("ie8") && -1 == l.indexOf("ie9") && -1 == l.indexOf("ie10") && -1 == l.indexOf(
                                        "ie11") && -1 == l.indexOf("jquery") && -1 == l.indexOf("color") && -1 == l.indexOf("skin") && -1 == l.indexOf(
                                                "scheme") && -1 == l.indexOf("setting") && -1 == l.indexOf("admin")) && -1 != l.indexOf(location
                                        .protocol + "//" + window.location.hostname)) {
                                try {
                                        h = _.cssRules
                                } catch (t) {
                                        continue
                                }
                                for (var D = 0; D < h.length; D++)
                                        if (y = h[D], y.media) {
                                                try {
                                                        x = y.media[0].replace(/(\s+)?\:(\s+)?/g, ":")
                                                } catch (t) {
                                                        continue
                                                }
                                                w = y.cssRules;
                                                for (var A = 0; A < w.length; A++)
                                                        if ((v = w[A], b = v.selectorText, !J(b)) && !1 == /(\*|\:|\@)/i.test(b) && !1 != Ca(b))
                                                                if (b = b.trim(), e) - 1 == d.indexOf(x) && d.push(x);
                                                                else if (!1 != a) Gi.find(xi(b)).hasClass("wyp-selected") && a in v.style && "" !== v
                                                        .style[a] && -1 == d.indexOf(x) && d.push(x);
                                                else if (Gi.find(xi(b)).hasClass("wyp-selected")) {
                                                        u = [], m = [];
                                                        for (var S = 0; S < v.style.length; S++) u.push(v.style[S]), m.push(v.style[u[S]]);
                                                        for (var T = 0; T < u.length; T++)
                                                                if (!/(-webkit-|-moz-|-o-|-ms-)/g.test(u[T]) && !/(\:|\{|\}|\(|\))/g.test(u[T])) {
                                                                        if ("padding" == u[T]) {
                                                                                u.push("padding-top", "padding-right", "padding-bottom",
                                                                                "padding-left");
                                                                                continue
                                                                        } else if ("margin" == u[T]) {
                                                                                u.push("margin-top", "margin-right", "margin-bottom", "margin-left");
                                                                                continue
                                                                        } else if ("overflow" == u[T]) {
                                                                                u.push("overflow-x", "overflow-y");
                                                                                continue
                                                                        } else if ("border-width" == u[T]) {
                                                                                u.push("border-top-width", "border-right-width", "border-bottom-width",
                                                                                        "border-left-width");
                                                                                continue
                                                                        } else if ("border-style" == u[T]) {
                                                                                u.push("border-top-style", "border-right-style", "border-bottom-style",
                                                                                        "border-left-style");
                                                                                continue
                                                                        } else if ("border-color" == u[T]) {
                                                                                u.push("border-top-color", "border-right-color", "border-bottom-color",
                                                                                        "border-left-color");
                                                                                continue
                                                                        } else if ("border-top" == u[T]) {
                                                                                u.push("border-top-width", "border-top-style", "border-top-color");
                                                                                continue
                                                                        } else if ("border-right" == u[T]) {
                                                                                u.push("border-right-width", "border-right-style",
                                                                                "border-right-color");
                                                                                continue
                                                                        } else if ("border-bottom" == u[T]) {
                                                                                u.push("border-bottom-width", "border-bottom-style",
                                                                                        "border-bottom-color");
                                                                                continue
                                                                        } else if ("border-left" == u[T]) {
                                                                                u.push("border-left-width", "border-left-style", "border-left-color");
                                                                                continue
                                                                        } else if ("background" == u[T]) {
                                                                                /(\s+|^)(#[a-zA-Z-0-9]{6}|#[a-zA-Z-0-9]{3}|rgb\(|rgba\()(\s+|$)/g.test(
                                                                                                m[T]) && u.push("background-color"),
                                                                                        /(\s+|^)url\((\s+|$)/g.test(m[T]) && u.push("background-image"),
                                                                                        /(\s+|^)(left|top|right|bottom|center)(\s+|$)/g.test(m[T]) && u
                                                                                        .push("background-position"),
                                                                                        /(\s+|^)(auto|cover|contain)(\s+|$)/g.test(m[T]) && u.push(
                                                                                                "background-size"), /(\s+|^)(repeat)(\s+|$)/g.test(m[
                                                                                        T]) && u.push("background-repeat"),
                                                                                        /(\s+|^)(padding-box|border-box|content-box)(\s+|$)/g.test(m[
                                                                                        T]) && (u.push("background-origin"), u.push("background-clip")),
                                                                                        /(\s+|^)(fixed|scroll|local)(\s+|$)/g.test(m[T]) && u.push(
                                                                                                "background-attachment");
                                                                                continue
                                                                        } else if ("border-radius" == u[T]) {
                                                                                u.push("border-top-left-radius", "border-top-right-radius",
                                                                                        "border-bottom-right-radius",
                                                                                        "border-bottom-left-radius");
                                                                                continue
                                                                        } else if ("flex" == u[T]) {
                                                                                u.push("flex-grow"), 1 < u[T].split(/\+s/g).length && u.push(
                                                                                        "flex-shrink"), 2 < u[T].split(/\+s/g).length && u.push(
                                                                                        "flex-basis");
                                                                                continue
                                                                        } else if ("flex-flow" == u[T]) {
                                                                                u.push("flex-direction"), -1 != u[T].indexOf(" ") && u.push(
                                                                                "flex-wrap");
                                                                                continue
                                                                        } else if ("list-style" == u[T]) {
                                                                                /(\s+|^)url\((\s+|$)/g.test(m[T]) && u.push("list-style-image"),
                                                                                        /(\s+|^)(disc|armenian|circle|cjk-ideographic|decimal|decimal-leading-zero|georgian|hebrew|hiragana|hiragana-iroha|katakana|katakana-iroha|lower-alpha|lower-greek|lower-latin|lower-roman|none|square|upper-alpha|upper-greek|upper-latin|upper-roman)(\s+|$)/g
                                                                                        .test(m[T]) && u.push("list-style-image"),
                                                                                        /(\s+|^)(inside|outside)(\s+|$)/g.test(m[T]) && u.push(
                                                                                                "list-style-position");
                                                                                continue
                                                                        } else if ("animation" == u[T]) {
                                                                                u.push("animation-name", "animation-duration", "animation-delay"),
                                                                                        /(\s+|^)(paused|running)(\s+|$)/g.test(m[T]) && u.push(
                                                                                                "animation-play-state"),
                                                                                        /(\s+|^)(forwards|backwards|both)(\s+|$)/g.test(m[T]) && u.push(
                                                                                                "animation-fill-mode"),
                                                                                        /(\s+|^)(normal|reverse|alternate|alternate-reverse)(\s+|$)/g
                                                                                        .test(m[T]) && u.push("animation-direction"),
                                                                                        /(\s+|^)(linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps\(|cubic-bezier\()(\s+|$)/g
                                                                                        .test(m[T]) && u.push("animation-timing-function");
                                                                                continue
                                                                        } else if ("border" == u[T]) {
                                                                                u.push("border-width", "border-style", "border-color");
                                                                                continue
                                                                        } else if ("font" == u[T]) {
                                                                                u.push("font-size", "line-height", "font-family"),
                                                                                        /(\s+|^)(normal|italic|oblique)(\s+|$)/g.test(m[T]) && u.push(
                                                                                                "font-style"), /(\s+|^)(normal|small-caps)(\s+|$)/g
                                                                                        .test(m[T]) && u.push("font-variant"),
                                                                                        /(\s+|^)(100|200|300|400|500|600|700|800|900|normal|bold|bolder|lighter)(\s+|$)/g
                                                                                        .test(m[T]) && u.push("font-weight");
                                                                                continue
                                                                        } else if ("transform" == u[T]) {
                                                                                /scale\(/g.test(m[T]) && u.push("scale-transform"), /rotateX\(/g.test(m[
                                                                                                T]) && u.push("rotatex-transform"), /rotateY\(/g.test(m[
                                                                                                T]) && u.push("rotatey-transform"), /rotateZ\(/g.test(m[
                                                                                                T]) && u.push("rotatez-transform"), /translatex\(/g
                                                                                        .test(m[T]) && u.push("translate-x-transform"), /translatey\(/g
                                                                                        .test(m[T]) && u.push("translate-y-transform"), /skewx\(/g.test(
                                                                                                m[T]) && u.push("skew-x-transform"), /skewy\(/g.test(m[
                                                                                                T]) && u.push("skew-y-transform");
                                                                                continue
                                                                        } else if ("filter" == u[T]) {
                                                                                /blur\(/g.test(m[T]) && u.push("blur-filter"), /brightness\(/g.test(m[
                                                                                        T]) && u.push("brightness-filter"), /contrast\(/g.test(
                                                                                        m[T]) && u.push("contrast-filter"), /grayscale\(/g.test(
                                                                                        m[T]) && u.push("grayscale-filter"), /invert\(/g.test(m[
                                                                                        T]) && u.push("invert-filter"), /hue-rotate\(/g.test(m[
                                                                                        T]) && u.push("hue-rotate-filter"), /saturate\(/g.test(
                                                                                        m[T]) && u.push("saturate-filter"), /sepia\(/g.test(m[
                                                                                        T]) && u.push("sepia-filter");
                                                                                continue
                                                                        } else if ("backdrop-filter" == u[T]) {
                                                                                /blur\(/g.test(m[T]) && u.push("blur-backdrop-filter"), /brightness\(/g
                                                                                        .test(m[T]) && u.push("brightness-backdrop-filter"),
                                                                                        /contrast\(/g.test(m[T]) && u.push("contrast-backdrop-filter"),
                                                                                        /grayscale\(/g.test(m[T]) && u.push(
                                                                                        "grayscale-backdrop-filter"), /invert\(/g.test(m[T]) && u.push(
                                                                                                "invert-backdrop-filter"), /hue-rotate\(/g.test(m[T]) &&
                                                                                        u.push("hue-rotate-backdrop-filter"), /saturate\(/g.test(m[
                                                                                        T]) && u.push("saturate-backdrop-filter"), /sepia\(/g.test(m[
                                                                                        T]) && u.push("sepia-backdrop-filter");
                                                                                continue
                                                                        }
                                                                        var E = Ya(x);
                                                                        if (!1 !== E) {
                                                                                for (v = u[T].trim(), C = Ga(x), f = !1, z = 0; z < c.length; z++)
                                                                                        if (v == c[z].rule && x == c[z].query && C == c[z].order) {
                                                                                                f = !0;
                                                                                                break
                                                                                        }! 1 == f && -1 == v.indexOf("outline-") && c.push({
                                                                                        rule: v,
                                                                                        query: x,
                                                                                        order: C
                                                                                })
                                                                        }
                                                                }
                                                }
                                        }
                        }
                }
                return e || a ? d : c
        }

        function $a(e) {
                if (0 == o(".ed-pnl-list > li.active .op-g").length) return !1;
                var t = qa(!1, !1, !1, !0).reverse();
                t.sort(function(e, t) {
                        return e.order - t.order
                });
                var a;
                4 == o.map(t, function(e) {
                        if (/border-(.*?)-style/g.test(e.rule)) return a = e, !0
                }).length && t.push({
                        rule: "border-style",
                        query: a.query,
                        order: a.order
                }), 4 == o.map(t, function(e) {
                        if (/border-(.*?)-width/g.test(e.rule)) return a = e, !0
                }).length && t.push({
                        rule: "border-width",
                        query: a.query,
                        order: a.order
                }), 4 == o.map(t, function(e) {
                        if (/border-(.*?)-color/g.test(e.rule)) return a = e, !0
                }).length && t.push({
                        rule: "border-color",
                        query: a.query,
                        order: a.order
                });
                var i = o("#property-responsive-menu");
                i.find(".pr-res-ite").tooltip("destroy"), i.empty();
                var n, s, r, l, d, p, c, u;
                i.append("<div class='pr-res-ite' data-info='-' title='" + qi.all_msg +
                        "' data-insert-media='desktop' data-responsive-size='all'><span class='yicon icon-desktop'></span>All<span class='yicon icon-no-alt'></span></div>"
                        );
                for (var m = 0; m < t.length; m++) {
                        n = t[m].rule, s = t[m].query;
                        try {
                                if (0 == o("#" + n + "-group").length) continue
                        } catch (t) {
                                continue
                        }(r = o("#" + n + "-group"), n == e) && (l = Ya(s), !1 !== l) && (0 < i.find("[data-responsive-size='" + l + "']").length || (
                                d = l.replace(/</g, "max ").replace(/\>/g, "min. ").replace(/\,/g, " & ").replace(/\.\d+/g, "").replace(
                                        /(\d+)(\s|$)/g, "$1px$2"), p = Ha(l), c = parseInt(mi(l.replace(/</g, "").replace(/\>/g, ""))), u = "",
                                -1 == l.indexOf(",") && -1 == l.indexOf("and") && (-1 != l.indexOf(">") && (u = "(min-width:" + c + "px)"), -
                                        1 != l.indexOf("<") && (u = "(max-width:" + c + "px)")), i.append(
                                        "<div class='pr-res-ite' data-info='-' title='" + p + "' data-insert-media='" + u +
                                        "' data-responsive-size='" + l + "'><span class='yicon icon-smartphone'></span>" + d +
                                        "<span class='yicon icon-no-alt'></span></div>")))
                }
                o(".pr-res-ite").tooltip({
                        template: "<div class=\"tooltip small-tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
                        container: ".ed-pnl",
                        delay: {
                                show: 50,
                                hide: 0
                        },
                        placement: "left"
                })
        }

        function Ga(e) {
                var t;
                if (t = /(>|<)/g.test(e) && !1 === /\@media/gi.test(e) ? e : Ya(e), !1 !== t) {
                        var a = t.replace(/(<|\>)/g, "");
                        return -1 != a.indexOf(",") && (-1 == t.split(",")[1].indexOf("<") ? a = a.split(",")[0] : a = a.split(",")[1]), parseFloat(a)
                }
                return !1
        }

        function Ka() {
                var e = o(".mo-i.active");
                if (0 < e.length) {
                        var t = o("#property-responsive-menu"),
                                a = e.offset(),
                                i = o(".ed-pnl"),
                                n = i.offset(),
                                s = a.top - n.top,
                                r = n.top + i.height() - a.top;
                        t.removeClass("top bottom"), r > s ? (t.css("top", a.top), t.css("left", a.left), t.addClass("top")) : (t.css("top", a.top - t
                                .height()), t.css("left", a.left), t.addClass("bottom"))
                }
        }

        function Ja(e) {
                var t = o(".responsive-size-text");
                o(".breakpoint-bar .breakpoint-item").removeClass("focus active"), t.removeAttr("data-before"), t.find(".device-size").text(e.attr(
                        "data-breakpoint")), e.addClass("focus"), e.nextAll(".breakpoint-item").addClass("active"), C() && _e();
                var a = e.attr("data-breakpoint");
                o("#iframe").width(a), j(), setTimeout(function() {
                        Ze(), ce(), j(), ye(), we()
                }, window.YellowDelay)
        }

        function Qa() {
                o(".fake-layer-responsive").remove(), o(".responsive-menu-open").removeClass("responsive-menu-open"), o(".mo-i").removeClass("active"),
                        tn.removeClass("property-responsive-open wyp-bg-layer-active")
        }

        

        function ti(e, t, a) {
                var n = "",
                        s, r, l, d, p, c, u, m, f, g, h;
                a ? (l = a.scrollTop, d = a.scrollLeft) : (l = parseFloat(Ji.scrollTop() + Ki.scrollTop()), d = parseFloat(Ji.scrollLeft() + Ki
                        .scrollLeft())), p = o(nn).width(), (null == e || null == e) && (e = _a()), (null == t || null == t) && (t = "default");
                var y;
                y = "multiple" == t ? e : C() ? Gi.find(e + ":in-viewport").not(".wyp-selected,.wyp-multiple-selected") : Gi.find(e + ":in-viewport")
                        .not(".wyp-multiple-selected"), "multiple" != t && sn.other.empty(), y.each(function(e) {
                                if (s = o(this), r = s.attr("class"), "multiple" == t && (e = "multiple"), 200 < e) return !1;
                                if (h = s.prop("tagName"), null === s) return !0;
                                if ("HTML" == h || "BODY" == h) return !0;
                                if (0 === s.length) return !0;
                                if (!0 === le(s, "opacity", "0", "==") || !0 === le(s, "visibility", "hidden", "==")) return !0;
                                if ("&nbsp;" == s.html() && "P" == h) return !0;
                                if (Ji.hasClass("wyp-h-trfm")) return !0;
                                if (c = a ? Ra(this, a.diff) : Ra(this), 0 == c.length) return !1;
                                if (u = c.top + l, m = c.left + d, f = c.width, g = c.height, m > p) return !0;
                                if (f + m > p && (f = p - m), 1 < g && 1 < f) {
                                        var y = "";
                                        /(^|\s)wyp-selected($|\s)/.test(r) && (y = " fast-selected-box"), 0 === sn.other.find(
                                                        ".wyp-selected-others-" + e + "-box").length ? n +=
                                                "<div class='wyp-selected-others-box" + y + " wyp-selected-others-" + e +
                                                "-box' style='transform:translate3d(" + m + "px, " + u + "px, 0) !important;width:" +
                                                parseFloat(f) + "px !important;height:" + parseFloat(g) + "px !important;'></div>" : sn.other
                                                .find(".wyp-selected-others-" + e + "-box").attr("style", "transform:translate3d(" + m +
                                                        "px, " + u + "px, 0) !important;width:" + parseFloat(f) + "px !important;height:" +
                                                        parseFloat(g) + "px !important;")
                                }
                        }), "" != n && sn.other.append(n)
        }

        function ai(e) {
                var t = e.get(0);
                if (J(t)) return 0;
                var a = t.getBoundingClientRect(),
                        i = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                        n = a.top + i,
                        s = a.height;
                return n < i ? s - (i - n) : s
        }

        function ii(e) {
                var t = sn.general.find(".wyp-selected-tooltip");
                if (0 >= t.length) return !1;
                t.removeClass("wyp-small-tooltip wyp-tooltip-bttm-out wyp-fixed-tooltip wyp-fixed-tooltip-parentbar wyp-fixed-tooltip-bottom");
                var a = _(),
                        i = a.get(0);
                if (J(i)) return !1;
                var n, s, r, l;
                e ? (n = e.boxSize, s = e.scrollTop, r = e.scrollLeft, l = e.diff) : (n = Ra(i), s = parseFloat(Ji.scrollTop() + Ki.scrollTop()), r =
                        parseFloat(Ji.scrollLeft() + Ki.scrollLeft()), l = Pa());
                var d = o(window).height(),
                        p = o("#iframe").width(),
                        c = parseFloat(n.top + s) - 25,
                        u = parseFloat(n.left + r);
                0 > u && (u = 0), !0 !== window.ypOption.fixed_left_bar && !1 == tn.hasClass("wyp-res-mod") && !1 == tn.hasClass("wyp-cln-lo-manual") &&
                        !1 == tn.hasClass("wyp-clean-look") && u - l.left <= window.leftBarSize.right && c - s - l.top <= window.leftBarSize.bottom && (
                                u = window.leftBarSize.right + l.left), t.css({
                                left: u + "px",
                                top: c + "px"
                        });
                var m;
                if (c - l.top >= d + s - 25) t.addClass("wyp-fixed-tooltip wyp-fixed-tooltip-bottom"), u - l.left < o("#ed-elt-tr").width() && t
                        .addClass("wyp-fixed-tooltip-parentbar"), t.css("left", u + "px");
                else if (2 > c - l.top || c - l.top < s + 2)
                        if (C()) {
                                var f = ai(a),
                                        g = parseFloat(sn.active.find(".wyp-selected-boxed-bottom").css("top"));
                                c = g - parseFloat(f), t.css("left", u + "px"), t.addClass("wyp-fixed-tooltip"), m = 100 * t.outerHeight() / f, 10 <
                                        m && (t.addClass("wyp-tooltip-bttm-out"), c = g, t.css({
                                                left: u + "px",
                                                top: c + "px"
                                        }))
                        } else t.addClass("wyp-tooltip-bttm-out"), t.css({
                                top: c + a.outerHeight() + 25 + "px"
                        });
                var h = Ra(t.get(0));
                0 >= p - (h.width + h.left + 80) && t.addClass("wyp-small-tooltip")
        }

        function ni(e) {
                var t;
                return t = -1 < e.indexOf("://") ? e.split("/")[2] : e.split("/")[0], t = t.split(":")[0], o.trim(t)
        }

        function si() {
                k({
                                title: qi.page_information_cant_be_retrieved,
                                text: qi.page_information_cant_be_retrieved_msg,
                                customClass: "wyp-page-information-cant-be-retrieved",
                                noButton: !0
                        }), o(".loading-files").text(""), o(".wyp-iframe-loader").css("background-image", "none"), o(
                                ".sa-error-container,.sa-button-container").css("display", "none"), o(".editor-style-ok p").css("margin-bottom", "0px"),
                        o(document).on("keyup keydown", function(t) {
                                var e = t.keyCode || t.which;
                                if (27 == e) return !1
                        })
        }

        function oi(e) {
                "block" == o(".inspector-sublist").css("display") && !1 == o(e.target).is(
                                ".cursor-main-btn,.cursor-main-btn *,.inspector-sublist,.inspector-sublist *") && o(".inspector-sublist").hide(),
                        "block" == o(".interface-settings").css("display") && !1 == o(e.target).is(
                                ".left-menu-btn,.left-menu-btn *,.interface-settings,.interface-settings *") && (o(".left-menu-btn").toggleClass(
                                "yhover"), o(".interface-settings").hide());
                var t = o(e.target);
                if (window.ypData["wyp-control-key-down"] && t.hasClass("wyp-selected-others") && 0 < _a().split(",").length) {
                        var a = _a();
                        t.removeClass("wyp-selected-others");
                        var i = Ma(t, "sharp");
                        a = a.replace(new RegExp("," + Na(i), "g"), "");
                        var s = _();
                        return L(a), Q(a, s, !0), t.removeClass("wyp-multiple-selected"), Ze(), !1
                }
                if (tn.hasClass("wyp-tooltip-input-blur-only")) return !1;
                if (window.ypData["wyp-css-ed-act"] && n.blur(), "cursor" !== window.ypData.inspector && window.ypData["wyp-met-dis"]) {
                        if ((1 == e.which || void 0 === e.which) && (e.stopPropagation(), e.preventDefault()), Ji.hasClass(
                                        "wyp-animate-manager-playing")) return !1;
                        if (window.ypData["wyp-visual-edited"]) return window.ypData["wyp-visual-edited"] = void 0, !1;
                        if (window.ypData["wyp-element-resized"] || window.ypData["resize-time-delay"]) return window.ypData["wyp-element-resized"] =
                                void 0, window.ypData["resize-time-delay"] = void 0, !1;
                        if (!0 === C() && window.ypData.editor_context_menu_open) return _().contextMenu("hide"), !1;
                        var r = o(e.target),
                                l, d;
                        if ((void 0 === e.which || 1 == e.which) && !0 === C()) {
                                if (r.hasClass("wyp-slct-menu")) {
                                        if (d = r.get(0), J(d)) return !1;
                                        l = d.getBoundingClientRect();
                                        var p = l.left + Ji.scrollLeft() + Ki.scrollLeft();
                                        0 === p && (p = 1);
                                        var c = l.top + 26 + 1 + Ji.scrollTop() + Ki.scrollTop();
                                        return _().contextMenu({
                                                x: p,
                                                y: c
                                        }), o(".context-menu-root").addClass("no-top-radius"), !1
                                }
                                if (r.hasClass("wyp-selected-tooltip")) return fe(), !1;
                                if (0 < r.parent().length && r.parent().hasClass("wyp-selected-tooltip")) return fe(), !1;
                                if (r.is("[class*=wyp-selected-boxed-margin-],[class*=wyp-selected-boxed-padding-]")) return clearTimeout(window
                                        .visualEditDelay), !1
                        }
                        if (1 == e.which || void 0 === e.which)
                                if (!1 === r.hasClass("wyp-selected") && window.ypData["wyp-rcnt-hvr-el"] && window.ypData["wyp-rcnt-hvr-el"].is(r)) {
                                        if (!0 === C() && 1 != r.parents(".wyp-selected").length) {
                                                if (S() && !1 === z()) return k({
                                                        title: qi.closeAnim,
                                                        showCancelButton: !0,
                                                        confirmButtonText: "Close"
                                                }, function() {
                                                        ae(!0)
                                                }), !1;
                                                if (C() && window.ypData["wyp-control-key-down"]) {
                                                        if (!1 === r.hasClass("wyp-selected-others-box")) {
                                                                var u = _a(),
                                                                        m = Ma(r, "sharp");
                                                                sn.other.find(".wyp-selected-others-multiple-box").remove(), Gi.find(
                                                                                ".wyp-multiple-selected").addClass("wyp-selected-others").removeClass(
                                                                                "wyp-multiple-selected"), L(u + "," + m), Q(u + "," + m, _(), !0), r
                                                                        .blur()
                                                        }
                                                        return !1
                                                }
                                                At(), window.mouseoverTrigger = !0, o(e.target).trigger("fakeOver"), window.mouseoverTrigger = !1
                                        }
                                } else if (!1 === C()) {
                                if (window.visualResizingType = "width", window.ResizeSelectedBorder = "right", window.styleAttrBeforeChange = r.attr(
                                                "style"), d = r.get(0), J(d)) return !1;
                                l = Ra(d), window.elementOffsetLeft = l.left, window.elementOffsetRight = l.right, r.width(parseFloat(r.width() + 10)),
                                        window.ResizeSelectedBorder = window.elementOffsetLeft == l.left && window.elementOffsetRight != l.right ?
                                        "right" : window.elementOffsetLeft != l.left && window.elementOffsetRight == l.right ? "left" : "right", K(
                                                window.styleAttrBeforeChange) ? r.attr("style", window.styleAttrBeforeChange) : (r.removeAttr("style"),
                                                window.styleAttrBeforeChange = null), window.mouseoverTrigger || Q(Ma(r, "default"), r, !1), r.blur()
                        }
                }
                return "cursor" === window.ypData.inspector ? void 0 : (e.stopPropagation(), e.preventDefault(), !1)
        }

        function ri() {
                if (Qi.hasClass("wyp-smart-guide-disabled")) return !1;
                for (var e = Ji.find(ui()).filter(":in-viewport"), t = 0; t < e.length; t++) {
                        var a = o(e[t]),
                                n = a.get(0);
                        if (!J(n)) {
                                var s = n.getBoundingClientRect().width,
                                        r = Ra(n);
                                if (0 >= a.parents(".wyp-selected").length && 0 >= a.parents(".wyp-selected-others").length && "none" != a.css(
                                                "display") && "0" != a.css("opacity") && "hidden" != a.css("visibility") && 10 <= r.height) {
                                        var l = Math.round(r.top + Ji.scrollTop() + Ki.scrollTop()),
                                                d = Math.round(r.left + Ji.scrollLeft() + Ki.scrollLeft()),
                                                p = Math.round(r.height);
                                        0 >= Ji.find("[data-wyp-top=\"" + l + "\"][data-wyp-left=\"" + d + "\"][data-wyp-width=\"" + s +
                                                "\"][data-wyp-height=\"" + p + "\"]").length && a.addClass("wyp-smrt-gd-el").attr(
                                                "data-wyp-top", l).attr("data-wyp-left", d).attr("data-wyp-top-round", ci(l)).attr(
                                                "data-wyp-bottom-round", ci(l + p)).attr("data-wyp-left-round", ci(d)).attr(
                                                "data-wyp-right-round", ci(d + s)).attr("data-wyp-width", s).attr("data-wyp-height", p)
                                }
                        }
                }
                sn.extra.append("<div class='wyp-x-distance-border'></div><div class='wyp-y-distance-border'></div>")
        }

        function li() {
                sn.extra.find(".wyp-x-distance-border,.wyp-y-distance-border,.wyp-helper-tooltip").remove(), Ji.find(".wyp-smrt-gd-el").removeClass(
                        "wyp-smrt-gd-el").removeAttr("data-wyp-top").removeAttr("data-wyp-left").removeAttr("data-wyp-width").removeAttr(
                        "data-wyp-top-round").removeAttr("data-wyp-bottom-round").removeAttr("data-wyp-left-round").removeAttr(
                        "data-wyp-right-round").removeAttr("data-wyp-height")
        }

        function di(e, t) {
                var a = e.parentsUntil("body"),
                        i = !1,
                        n;
                return a.each(function() {
                        if (n = o(this).hasClass(t), n) return i = !0, !1
                }), i
        }

        function pi(e, t) {
                var a = [],
                        i = !1,
                        n = e.parent(),
                        s = n.css(["display"]);
                if (0 < n.length && -1 == s.display.indexOf("table") && "inline" != s.display && "inline-flex" != s.display) {
                        var o = n.width();
                        !0 == window.liveResizeWPercent && (i = !0, a.val = Math.round(10 * (100 * parseFloat(t) / parseFloat(o))) / 10, a.format =
                                "%"), parseInt(o) == parseInt(t) && !1 == i && (i = !0, a.val = 100, a.format = "%"), parseInt(o / 2) == parseInt(t) &&
                                !1 == i && (i = !0, a.val = 50, a.format = "%"), parseInt(o / 4) == parseInt(t) && !1 == i && (i = !0, a.val = 25, a
                                        .format = "%"), parseInt(o / 5) == parseInt(t) && !1 == i && (i = !0, a.val = 20, a.format = "%")
                }
                return !1 === i && (a.val = t, a.format = "px"), a
        }

        function ci(e) {
                return 6 * Math.round(e / 6)
        }

        function ui() {
                var e = "*",
                        t = window.simple_not_list.split("|"),
                        a, n, s, o;
                for (a = window.plugin_classes_list.split("|"), n = window.plugin_id_list.split("|"), s = 0; s < a.length; s++) a[s] = "." + a[s];
                for (s = 0; s < n.length; s++) n[s] = "#" + n[s];
                for (t = t.concat(a), t = t.concat(n), o = 0; o < t.length; o++) e += ":not(" + t[o] + ")";
                return e
        }

        


        

        

        

        function wi(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
        }

        

        

        

        

        function ki(e) {
                e = Xe(e);
                var t = window.selectorComments[gi(e)],
                        a = "";
                return J(t) && (/(\.|\:)yp(-|_)onscreen/g.test(e) ? a = " (onscreen)" : /(\.|\:)yp(-|_)hover/g.test(e) ? a = " (hover)" :
                        /(\.|\:)yp(-|_)click/g.test(e) ? a = " (click)" : /(\.|\:)yp(-|_)focus/g.test(e) && (a = " (focus)"), -1 != e.indexOf(
                                ".yp-selector-") && (a = " (" + e.match(
                                /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g)[0].replace(
                                /\.yp-selector-/, "").trim() + ")"), t = window.selectorComments[gi(xi(e, !0, !0, !0, !0))]), !J(t) && t + a
        }

        function Ci(e, t) {
                (null == t || null == t) && (t = Ai(e, !1));
                var a = gi(Xe(e));
                (null == window.selectorComments[a] || null == window.selectorComments[a]) && window.newComments.push(a), window.selectorComments[a] =
                        Oi(t)
        }

        function zi(e) {
                if (e.split("{").length != e.split("}").length) return !1;
                e = e.replace(/\*\/(body)?\.yp-selector-(.*?)\n/gi, "*/\n$1.yp-selector-$2");
                var t = e.match(/\/\*(.*?)\*\/\n(.*?){/gi);
                if (null == t) return !1;
                for (var a = 0, n, s, o; a < t.length; a++)(n = t[a], o = n.split("*/")[0].replace(/\/\*/g, "").replace(/(\r\n|\n|\r|\t)/g, "").trim(),
                                s = n.split("*/")[1].replace(/(\r\n|\n|\r|\t)/g, "").replace(/(\{|\})/g, "").trim(), !0 != /\@media/g.test(s)) &&
                        null != s && null != s && Ci(s, o);
                Di()
        }

        function Oi(e) {
                return null == e || null == e || "" == e ? e : (e = e.replace(/(select|delete|create|drop|alter|insert|update|truncate)/g, "Unknown"),
                        e = e.replace(/(\r\n|\n|\r)/g, "").replace(/(\/\*|\*\/)/g, "").replace(/[^a-zA-Z0-9\_\-\?\s\=\/\.\,\@\&\+\!\(\)]/g, "")
                        .trim(), 0 == e.length) ? "" : (e = e.match(/.{1,70}/i)[0], e)
        }

        

        function Ai(e, t) {
                e = Xe(e);
                var a = "",
                        i;
                i = bi(e, t, null), J(i) && (i = vi(e));
                var n = ki(e);
                return !1 != n && (n = n.toLowerCase()), i.toLowerCase() != n && (/(\.|\:)yp(-|_)onscreen/g.test(e) ? a = " (onscreen)" :
                        /(\.|\:)yp(-|_)hover/g.test(e) ? a = " (hover)" : /(\.|\:)yp(-|_)click/g.test(e) ? a = " (click)" :
                        /(\.|\:)yp(-|_)focus/g.test(e) && (a = " (focus)"), -1 != e.indexOf(".yp-selector-") && (a = " (" + e.match(
                                /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g)[0].replace(
                                /\.yp-selector-/, "").trim() + ")")), (i + a).trim()
        }

        function Si(e, t) {
                var a = "",
                        i = !1,
                        n = "",
                        s, r, l, d;
                if (e = xi(e, !0, !0, !0, !0), null == t && (t = Gi.find(e).filter(".wyp-selected"), 0 >= t.length && (t = Gi.find(e))), "*" == e)
                        return "All Elements";
                if (":root" == e) return "Root";
                if (s = ua(e).length - 1, r = t.prop("tagName"), l = ua(e)[s].trim(), -1 != l.indexOf(".") && (l = "." + l.split(".")[1]), -1 != l
                        .indexOf("#") && (l = "#" + l.split("#")[1]), -1 != l.indexOf(":") && (l = l.split(":")[0]), t.hasAttr("id") && (n = t.attr(
                                "id")), t.hasAttr("class") && (a = t.attr("class").toUpperCase()), d = "" == a ? o.trim(l.replace(/[^a-zA-Z0-9\s]/g,
                                "")) : o.trim((a + " " + n).replace(/[^a-zA-Z0-9\s]/g, "")), "BODY" == r) return "Body";
                if (/(^|\s)WIDGET($|\s)/.test(d)) return "Widget";
                if (/(^|\s)(MENU|MAIN-MENU|NAVIGATION|NAV)($|\s)/.test(d)) return "Menu";
                if (/(^|\s)(FA|FA-(.*?))($|\s)/.test(a)) return "Font Icon";
                if (/(^|\s)SUBMIT($|\s)/.test(d) && "INPUT" == r) return "Submit Button";
                if (/(^|\s)MENUITEM($|\s)/.test(d)) return "Menu Item";
                if (/(^|\s)(ENTRYMETA|ENTRYMETABOX|POSTMETABOX)($|\s)/.test(d)) return "Post Meta Division";
                if (/(^|\s)COMMENTREPLYTITLE($|\s)/.test(d)) return "Comment Reply Title";
                if (/(^|\s)LOGGEDINAS($|\s)/.test(d)) return "Login Info";
                if (/(^|\s)FORMALLOWEDTAGS($|\s)/.test(d)) return "Allowed Tags Section";
                if (/(^|\s)LOGO($|\s)/.test(d)) return "Logo";
                if (/(^|\s)(ENTRYTITLE|POSTTITLE)($|\s)/.test(d)) return "Post Title";
                if (/(^|\s)COMMENTFORM($|\s)/.test(d)) return "Comment Form";
                if (/(^|\s)WIDGETTITLE($|\s)/.test(d)) return "Widget Title";
                if (/(^|\s)TAGCLOUD($|\s)/.test(d)) return "Tag Cloud";
                if (/(^|\s)ROW($|\s)/.test(d)) return "Row";
                if (/(^|\s)(BUTTON|BTN)($|\s)/.test(d)) return "Button";
                if (/(^|\s)LEAD($|\s)/.test(d)) return "Lead";
                if (/(^|\s)WELL($|\s)/.test(d)) return "Well";
                if (/(^|\s)ACCORDIONTOGGLE($|\s)/.test(d)) return "Accordion Toggle";
                if (/(^|\s)PANELBODY($|\s)/.test(d)) return "Accordion Content";
                if (/(^|\s)ALERT($|\s)/.test(d)) return "Alert Division";
                if (/(^|\s)MORELINK($|\s)/.test(d)) return "Show More Link";
                if (/(^|\s)(MENULINK|MENUICON|MENUBTN|MENUBUTTON)($|\s)/.test(d)) return "Menu Link";
                if (/(^|\s)SUBMENU($|\s)/.test(d)) return "Sub Menu";
                if (/(^|\s)(POSTBODY|POST)($|\s)/.test(d)) return "Post Division";
                if (/(^|\s)(CONTENT|DEFAULTCONTENT)($|\s)/.test(d)) return "Content Division";
                if (/(^|\s)ENTRYCONTENT($|\s)/.test(d)) return "Entry Content";
                if (/(^|\s)ENTRYFOOTER($|\s)/.test(d)) return "Entry Footer";
                if (/(^|\s)ENTRYHEADER($|\s)/.test(d)) return "Entry Header";
                if (/(^|\s)ENTRYTIME($|\s)/.test(d)) return "Entry Time";
                if (/(^|\s)POSTEDITLINK($|\s)/.test(d)) return "Post Edit Link";
                if (/(^|\s)POSTTHUMBNAIL($|\s)/.test(d)) return "Post Thumbnail";
                if (/(^|\s)THUMBNAIL($|\s)/.test(d)) return "Thumbnail";
                if (/([a-zA-Z0-9_-]+)?ATTACHMENT([a-zA-Z0-9_-]+)?/.test(a)) return "Thumbnail Image";
                if (/(^|\s)EDITLINK($|\s)/.test(d)) return "Edit Link";
                if (/(^|\s)COMMENTSLINK($|\s)/.test(d)) return "Comments Link Division";
                if (/(^|\s)SITEDESCRIPTION($|\s)/.test(d)) return "Site Description";
                if (K(a)) {
                        var p = a.match(
                                /([a-zA-Z0-9_-]+)?(span|small|medium|large|col|column|[_-]l|[_-]m|[_-]s|col-xs|col-md|col-lg|-col-sm)([_-])?[0-9]+/i);
                        if (K(p) && !1 === /section/gi.test(a)) {
                                var c = parseInt(p[0].replace(/\D/g, ""));
                                if (0 < c && 13 > c) return "Column " + c + "/12"
                        }
                }
                if (i = Ti(l), !1 !== i && !0 == /(#|\.)/g.test(l)) return i;
                if (-1 != ["h1", "h2", "h3", "h4", "h5", "h6", "p", "img", "a", "li", "ul", "header", "footer", "article", "code", "form", "label",
                                "ol", "blockquote", "nav"
                        ].indexOf(l) && !1 == /(#|\.)/g.test(l)) {
                        if ("h1" == l || "h2" == l || "h3" == l || "h4" == l || "h5" == l || "h6" == l) return "Heading";
                        if ("p" == l) return "Paragraph";
                        if ("img" == l) return "Image";
                        if ("a" == l) return "Link";
                        if ("li" == l) return "List Item";
                        if ("ul" == l) return "List";
                        if ("header" == l) return "Header";
                        if ("footer" == l) return "Footer";
                        if ("article" == l) return "Article";
                        if ("code" == l) return "Code Tag";
                        if ("form" == l) return "Form Division";
                        if ("label" == l) return "Label";
                        if ("ol" == l) return "List";
                        if ("blockquote" == l) return "Block Quote";
                        if ("nav" == l) return "Navigation"
                }
                return /(^|\s)(CONTAINER|WRAPPER)($|\s)/.test(d) ? "Wrapper" : "BR" == r ? "Line Break" : "HR" == r ? "Horizontal Rule" : "PRE" == r ?
                        "Preformatted" : "TABLE" == r ? "Table" : "TR" == r ? "Table Row" : "TD" == r ? "Table Data" : "BUTTON" == r ? "Button" :
                        "CENTER" == r ? "Centred block" : "DL" == r ? "Definition list" : "DT" == r ? "Definition term" : "DD" == r ?
                        "Definition description" : "TEXTAREA" == r ? "Text Area" : "TBODY" == r ? "Body Of Table" : "THEAD" == r ? "Head Of Table" :
                        "TFOOT" == r ? "Foot Of Table" : "U" == r ? "Underline text tag" : "Q" == r ? "Quotation" : "CITE" == r ? "Citation Tag" :
                        "TIME" == r ? "Time Tag" : "CAPTION" == r ? "Caption Of table" : "INPUT" == r ? "Input" : "SPAN" == r ? "Span Tag" : "B" == r ?
                        "Bold Tag" : "EM" == r || "I" == r ? "Italic Tag" : "STRONG" == r ? "Strong Tag" : "SMALL" == r ? "Small Tag" : "DIV" == r ?
                        "Division" : ("H1" == r || "H2" == r || "H3" == r || "H4" == r || "H5" == r || "H6" == r ? r = "Heading" : "P" == r ? r =
                                "Paragraph" : "IMG" == r ? r = "Image" : "A" == r ? r = "Link" : "LI" == r ? r = "List Item" : "UL" == r ? r = "List" :
                                "HEADER" == r ? r = "Header" : "FOOTER" == r ? r = "Footer" : "ARTICLE" == r ? r = "Article" : "CODE" == r ? r =
                                "Code Tag" : "FORM" == r ? r = "Form Division" : "LABEL" == r ? r = "Label" : "OL" == r ? r = "List" : "BLOCKQUOTE" ==
                                r ? r = "Block Quote" : "NAV" == r && (r = "Navigation"), "undefined" == typeof r || !1 === r ? "Unknown Element" : wi(r
                                        .replace(/(_|-)/g, " ").toLowerCase()))
        }

        function Ti(e) {
                if ("undefined" == typeof e || !1 === e) return !1;
                e = e.replace(/(#|\.)/g, ""), e = e.replace(/([A-Z][a-z])/g, "-$1").toLowerCase();
                var t = /[A-Z]/,
                        a = /-/;
                if (window.ypOption.show_css_selector) {
                        if (/_/.test(e) && a.test(e)) return !1;
                        if (a.test(e) && 3 <= e.match(/(-|_)/g).length) return !1
                } else if (a.test(e) && 5 <= e.match(/(-|_)/g).length) return !1;
                if (e = e.replace(/_/g, " ").replace(/-/g, " "), window.ypOption.show_css_selector) {
                        if (e.match(t) || 5 > e.length || 20 < e.length) return !1;
                } else if (e.match(t) || 3 > e.length || 50 < e.length) return !1;
                return Ei(e)
        }

        function Ei(e) {
                for (var t = [], a = e.split(" "), n = 0; n < a.length; n++) 28 < a[n].length || 1 < a.length &&
                        /\b(elementor|oxy|ast|uael|owl|avia)\b/gi.test(a[n]) || (/(A|E|I|O|U)/gi.test(a[n]) && 2 < a[n].length ? t.push(a[n]) : !1 ===
                                /[A-Z]/i.test(a[n]) ? t.push(a[n]) : 3 < a[n].length && t.push(a[n]));
                var s = t.join(" ").trim();
                return !!(2 < s.length) && wi(s)
        }

        

        


        function Zi() {
                if (!1 === window.ypData["wyp-need-to-process"] || window.ypData["wyp-processing-now"]) return !1;
                var e = Et(!0, null, !1);
                if (window.ypData["wyp-need-to-process"] = !1, window.ypData["wyp-processing-now"] = !0, qe("desktop"), e = e.toString(), -1 != e
                        .indexOf("@media")) {
                        var i = e.replace(/(\r\n|\n|\r)/g, "").replace(/(\/\*)(.*?)\*\/(\s+)?/g, "").replace(/@media[^\{]+{(\s?)+}/g, "").match(
                                /@media(.*?){/g);
                        i = hi(i), o.each(i, function(e, t) {
                                t = za(t, !1), qe(t)
                        })
                }
                Gi.find("#wyp-live-css-data").remove(), r(f(null, null, null, !0)), window.ypData["wyp-processing-now"] = !1, T() && H();
                var n = ["single", "template", "global"],
                        s, l, d, c;
                for (s = 0; s < n.length; s++) c += a(n[s], !1);
                for (gn = 0; gn < window.newComments.length; gn++)(d = window.newComments[gn], null != d && null != d) && (l = p(c, "[selector=" + d +
                        "]"), null != l && null != l) && 0 == l.length && delete window.selectorComments[d];
                Di()
        }



        function Ii(e) {
                return J(e) ? "" : e.replace(new RegExp(window.plugin_classes_list_sorted, "gi"), "")
        }



        

        function Wi(e) {
                var t, a, i;
                t = o("#unsplash-search").val(), "" == t.trim() && (t = null);
                window.getJsonNow = !0, a = null == t ? "https://api.unsplash.com/photos" : "https://api.unsplash.com/search/photos", a +=
                        "?client_id=5746b12f75e91c251bddf6f83bd2ad0d658122676e9bd2444e110951f9a04af8", null != t && (a += "&query=" + t), null != e && (
                                a += "&page=" + e);

                console.log("[YP-Extension] Wi called, constructed API URL:", a);

                var listener = function(event) {
                        if (event.data && event.data.type === 'WYP_FETCH_UNSPLASH_RESULT') {
                                console.log("[YP-Extension] Wi received WYP_FETCH_UNSPLASH_RESULT:", event.data);
                                window.removeEventListener('message', listener);
                                if (event.data.success) {
                                        var e = event.data.data;
                                        0 == e.total ? o(".wyp-unsplash-list").addClass("no-result") : o(".wyp-unsplash-list").removeClass("no-result"),
                                                i = null == t ? e : e.results;
                                        var a;
                                        o.each(i, function(e, t) {
                                                a = t.urls.thumb, o(".wyp-unsplash-list").append("<span style='background-color:" + t
                                                        .color + ";' data-id='" + t.id + "' data-regular='" + t.urls.regular +
                                                        "' data-small='" + t.urls.small + "' data-thumb='" + t.urls.thumb +
                                                        "' ><i>Upload</i></span>")
                                        }), window.getJsonNow = !1, Fi();
                                } else {
                                        console.error("[YP-Extension] Unsplash API fetch failed with error:", event.data.error);
                                        Li("Loading Error", "Could Not Load Json library. (Unsplash API)", "jsonError");
                                }
                        }
                };
                window.addEventListener('message', listener);
                window.postMessage({ type: 'WYP_FETCH_UNSPLASH', url: a }, '*');
        }

        function Fi() {
                o(".wyp-unsplash-list > span:in-viewport").each(function() {
                        o(this).css("background-image", "url(" + o(this).attr("data-thumb") + ")")
                })
        }

        function ji() {
                if (0 < o(".wyp-unsplash-list > span:nth-last-child(-n+4):in-viewport").length) {
                        var e = o(".wyp-unsplash-list > span").length;
                        !1 == window.getJsonNow && Wi(e / 10 + 1)
                }
        }

        function Xi(e) {
                var t = e.match(/id=["|'|](.*?)["|'|\s|>]/g);
                if (t && 0 < t.length) {
                        for (var a = 0; a < t.length; a++) t[a] = t[a].replace(/^id=("|'|)|("|'|>)$/g, "").trim();
                        return t
                }
                return []
        }

        function Vi(e) {
                var t = [],
                        a = e.match(/class=["|'|](.*?)["|'|>]/g);
                if (a && 0 < a.length)
                        for (var n = 0; n < a.length; n++) a[n] = a[n].replace(/^class=("|'|)|("|'|>)$/g, "").trim(), t = t.concat(ma(a[n]));
                return t
        }
        if (window.ypData = {
                        "data-clickable-select": void 0,
                        is_content_selected: !1,
                        is_responsive_mod: !1,
                        is_dragging: !1,
                        is_resizing: !1,
                        is_visual_editing: !1,
                        is_animate_creator: !1,
                        is_animation_manager: !1,
                        "wyp-need-to-process": !1,
                        "wyp-processing-now": !1,
                        "wyp-met-dis": !0,
                        inspector: "default",
                        editor_context_menu_open: !1,
                        demo_mode: !1,
                        "wyp-control-key-down": !1
                }, window.bMode) {
                window.ypOption = {
                        fixed_right_panel: !1,
                        fixed_left_bar: !1,
                        hide_premium_options: !1,
                        show_css_selector: !1,
                        smart_responsive_technology: !0,
                        smart_important_tag: !0,
                        append_auto_comments: !0
                }, window.selectorComments = {};
                var Ui = new URL(window.location);
                Ui.searchParams.set("wyp", "1"), window.history.pushState({}, "", Ui), o(window).on("popstate", function() {
                        location.reload()
                })
        }
        var qi = window.qi = {};
        qi.back_to_menu = "Back to menu", qi.close_editor = "Close Editor", qi.saving = window.bMode ? "Exportar" : "Guardando", qi.save = window.bMode ?
                "Exportar" : "Guardar", qi.saved = window.bMode ? "Exportar" : "Guardado", qi.unknown = "Unknown", qi.no_el_selected = "No element selected", qi
                .live_preview_alert = "This tool is disabled in demo mode!", qi.live_preview_text =
                "You can download the free version of the plugin and try on your site.", qi.save_alert = "Saving is disabled in demo mode!", qi
                .list_notice = "The selected element is not a list item, Select a list item to edit styles.", qi.list_notice1 =
                "Disable list style image property to use this property.", qi.display_notice =
                "This property may not work, Set 'block' or 'inline-block' value to display option from extra section.", qi.absolute_notice =
                "The absolute value could harm mobile view, Set absolute value just to high screen sizes with responsive tool.", qi.fixed_notice =
                "The fixed value could harm mobile view, Set fixed value just to high screen sizes with responsive tool.", qi.negative_margin_notice =
                "Negative margin value could break the website layout.", qi.high_position_notice =
                "High position value could harm mobile view, Please apply this change only to large screen sizes using the responsive tool.", qi
                .bg_img_notice_two = "Set a background image for using this feature.", qi.bg_img_notice_tree =
                "Set a background color or image for using this feature.", qi.sure = "Are you sure you want to leave the page without saving?", qi
                .height_notice =
                "The height property can cause conflict with the dynamic elements. Use min height and max height for dynamic contents.", qi.cantUndo =
                "You can't undo the changes while creating a new animation. Click \"reset icon\" if you want to disable any option.", qi
                .cantUndoAnimManager = "You can't undo the changes while animation manager on.", qi.cantEditor =
                "You can't use the CSS editor while creating a new animation.", qi.allScenesEmpty =
                "Please add properties to the scenes to play the animation.", qi.scene = "Scene", qi.closeAnim =
                "Are you sure you want to close Animation Generator without saving?", qi.notice = "Notice", qi.warning = "Warning", qi.empty = "empty",
                qi.style = "style", qi.type_not_available = "Can not be used on the current page.", qi.you_are_sure = "You are sure?", qi.delete_anim =
                "Delete Animate", qi.welcome_pro = "Welcome to Pro Club!", qi.license_activated =
                "License Activated! Thank you for your purchase. We are here to help! Check out <a href='https://yellowpencil.waspthemes.com/documentation/' target='_blank'>Plugin Docs</a> and join <a href='https://www.facebook.com/groups/YellowPencils/' target='_blank'>Facebook Community</a>.",
                qi.general = "General", qi.paragraph = "Paragraph", qi.heading_level = "Heading Level", qi.element_id = "Element ID", qi.tag = "Tag", qi
                .affected_els = "Selected elements", qi.pseudo_class = "States&hellip;", qi.conditions = "Conditions&hellip;", qi.all_devices =
                "All Devices", qi.delay = "Delay", qi.duration = "Duration", qi.delete_t = "Delete", qi.reset = "Reset", qi.add_new_anim =
                "Add New Animate", qi.sorry = "Sorry.", qi.all_scenes_empty = "All scenes are empty.", qi.animation_name = "Save Animation", qi
                .save_animation = "Save", qi.set_animation_name = "Set a name to the animation to save.", qi.scene_properties = "Scene Properties", qi
                .no_property_yet = "No properties yet.", qi.save_error = "An error occurred while saving.", qi.save_error_msg =
                "The server may be offline either server's maximum post limit is not enough. Please try again later.", qi.save_error_nonce_msg =
                "Nonce verification has failed. Please copy the CSS data from the CSS Editor and refresh the page.", qi.save_error_authorized_msg =
                "You do not have the authority to edit the site appearance or you may have logged out.", qi.save_error_json_msg =
                "Unable to save CSS comments. You can fix this problem by resetting settings from WP Dashboard > YellowPencil > Settings page.", qi
                .define_breakpoints = "breakpoints", qi.breakpoint_size = "{$1}px and {$2} screens", qi.css_parse_error = "CSS Parse Error.", qi
                .css_parse_error_text =
                "The changes you made in the CSS editor seems to be invalid. To continue, undo changes with CMD + Z or fix this CSS error.", qi
                .delete_media_query = "Do you want reset {$1} Media Query?", qi.delete_media_query_msg =
                "This process will reset the media query just in the current customization type.", qi.active_breakpoint = "Active Breakpoint", qi
                .review_breakpoint = "Review Breakpoint", qi.show_in_editor = "Show In CSS Editor", qi.parent_elements = "Parent Elements&hellip;", qi
                .children_elements = "Child Elements&hellip;", qi.select_only_this = "Select Only This", qi.write_css = "Write CSS", qi.edit_selector =
                "Edit Selector <span style='opacity: 0.6;margin-left: 4px;'>(F)</span>", qi.review_styles = "Review Styles", qi.reset_styles =
                "Reset Styles&hellip;", qi.single = "Single&hellip;", qi.the_element = "Element", qi.child_elements = "Child Elements", qi.template =
                "Template&hellip;", qi.global_t = "Global&hellip;", qi.leave = "Leave", qi.above_t = "larger", qi.below_t = "smaller", qi
                .toggle_media_query_condition = "Toggle media query condition as {$1}", qi.customize_type_not_available =
                "This customizing type can not be used on the current page.", qi.cursor_warning =
                "This change does not appear in the editor, check it with Live Preview.", qi.reset_type_msg =
                "You are sure to reset all styles in <strong>{$1} customization</strong>?", qi.reset_btn = "Yes, Reset!", qi.manager_msg1 =
                "There is no style matching with the selected element.", qi.manager_msg2 = "Select an item to review matching styles.", qi
                .manager_msg3 = "Single customization is empty.", qi.manager_msg4 = "Template customization is empty.", qi.manager_msg5 =
                "Global customization is empty.", qi.manager_msg6 = "There is no style in this media query.", qi.manager_msg7 =
                "There are no styles matching your search term.", qi.manager_msg8 = "No style found. Check again after making a few edits.", qi
                .manager_msg9 = "All styles on the current page are listed below.", qi.manager_msg10 =
                "The styles matching with the selected element are listed below.", qi.manager_msg11 = "Single Customization styles listed below.", qi
                .manager_msg12 = "Template Customization styles listed below.", qi.manager_msg13 = "Global Customization styles listed below.", qi
                .manager_msg14 = "All styles in this media query are listed below.", qi.manager_msg15 =
                "No styles were found. Check again after making a few edits.", qi.manager_msg16 =
                "All styles that match your search term are listed below.", qi.selector_no_match =
                "The selector doesn't match any element on this page", qi.all_msg = "All screen sizes", qi.not_wp_link =
                "This link is not an wordpress page. You can't edit this page.", qi.external_link =
                "This is an external link. You can't edit this page. <em style='opacity:0.8'>(Click the element while holding down CTRL key to run the Javascript action.)</em>",
                qi.link_not_valid =
                "This link is not an wordpress page. You can't edit this page. <em style='opacity:0.8'>(Click the element while holding down CTRL key to run the Javascript action.)</em>",
                qi.page_loading = "Loading Editor", qi.page_information_cant_be_retrieved = "Page information cannot be retrieved.", qi
                .page_information_cant_be_retrieved_msg = "Please close the page and open the target page manually with YellowPencil.", qi.contrast_ac =
                "Background and text colors should meet WCAG contrast standards to make the text legible on all devices.", qi.line_spacing_ac =
                "Line spacing should be minimum 1 and maximum 2. This ratio varies depending on the font size.", qi.font_size_ac =
                "Font size should be a minimum of 12 pixels to easy readable.", window.plugin_classes_list =
                "wyp-bg-layer-active|wyp-x-distance-border|wyp-y-distance-border|hv-in-bx|wyp-helper-tooltip|wyp-css-editor-disable|wyp-no-wf|wyp-ele-n-vis|wyp-iframe-ph|wyp-data-updated|wyp-inline-data|wyp-animating|wyp-scene-1|wyp-single-inspector-active|wyp-scene-2|wyp-scene-3|wyp-scene-4|wyp-scene-5|wyp-scene-6|wyp-ani-cre|wyp-animate-test-playing|yp-yellow-pencil-demo-mode|yellow-pencil-ready|yp_onscreen|yp_hover|yp_click|yp_focus|wyp-selected-others|wyp-multiple-selected|wyp-demo-link|wyp-live-editor-link|yp-yellow-pencil|wyp-con-slcd|wyp-hid-bor-n|wyp-selector-editor-active|wyp-res-mod|wyp-met-dis|wyp-css-ed-act|wtfv|wyp-clean-look|wyp-h-trfm|wyp-selected|wyp-el-reing|context-menu-active|wyp-selectors-hide|wyp-control-key-down|wyp-selected-others-multiple-box|wyp-if-movleav|wyp-selected-boxed-top|wyp-selected-boxed-bottom|wyp-selected-boxed-left|wyp-selected-boxed-right|wyp-selected-boxed-margin-left|wyp-zero-m-w|wyp-animate-manager-active|wyp-wf-on|yp-selector-hover|wyp-size-handle|wyp-flexible-inspector-active|wyp-selected-boxed-margin-top|wyp-selected-boxed-margin-bottom|wyp-selected-boxed-margin-right|wyp-selected-boxed-padding-left|wyp-selected-boxed-padding-top|wyp-selected-boxed-padding-bottom|wyp-selected-boxed-padding-right|wyp-selected-tooltip|wyp-slct-tooltip|wyp-slct-menu|wyp-full-width-selected|wyp-zero-m-h|wyp-tooltip-small|wyp-selected-bottom|wyp-fixed-tooltip|wyp-tooltip-bttm-out|wyp-css-slctr-off";
        for (var $i = 0; 51 > $i; $i++) window.plugin_classes_list += "|wyp-pa-r" + $i;
        window.plugin_id_list =
                "wyp-drw-bx|wyp-anim-scenes|anim-tester|wyp-animate-data|yellow-pencil-canvas|yellow-pencil-focus-canvas|yellow-pencil-other-canvas|yellow-pencil-extra-canvas",
                window.simple_not_list =
                "link|style|script|noscript|meta|title|br|param|option|head|circle|rect|polygon|defs|linearGradient|stop|ellipse|text|line|polyline|path|g|tspan",
                o(".fixed-right-panel-checkbox input").prop("checked", window.ypOption.fixed_right_panel), o(".fixed-left-bar-checkbox input").prop(
                        "checked", window.ypOption.fixed_left_bar), o(".hide-premium-options-checkbox input").prop("checked", window.ypOption
                        .hide_premium_options), o(".show-css-selector-checkbox input").prop("checked", window.ypOption.show_css_selector), o(
                        ".smart-responsive-technology-checkbox input").prop("checked", window.ypOption.smart_responsive_technology), o(
                        ".smart-important-tag-checkbox input").prop("checked", window.ypOption.smart_important_tag), o(
                        ".append-auto-comments-checkbox input").prop("checked", window.ypOption.append_auto_comments), window.define = window.define ||
                ace.define, !0 !== window.bMode && ace.config.set("basePath", aceEditorBase);
        var n = ace.edit("css-data");
        window.YP.setEditor(n);
        n.setTheme("ace/theme/twilight"), n.$blockScrolling = 1 / 0, n.setShowPrintMargin(!1), n.setOptions({
                enableMultiselect: !0,
                enableBasicAutocompletion: !0,
                enableLiveAutocompletion: !0,
                enableSnippets: !1,
                fontSize: "14px"
        }), n.container.style.lineHeight = "19px";
        var b = {
                        singleData: ace.createEditSession("", "ace/mode/css"),
                        templateData: ace.createEditSession("", "ace/mode/css"),
                        globalData: ace.createEditSession("", "ace/mode/css")
                },
                x = 0;
        window.leftBarSize = !1, window.setSelector = !1, window.separator = " ", window.minCrpdSlctr = !1, window.YellowDelay = 5, window
                .Yellow2Delay = 10, window.lastTextColor = null, window.targetIsParentTree = !1, window.selectedByView = !1, window.editedByReview = !1,
                window.sourceViewClick = !1, window.resizedByPropertySize = !1, window.licenseCheckDelay = !1, window.responsiveFirstWasOpen = !1,
                window.parentItems = "", window.childrenItems = "", window.idList = [], window.ClassList = [], window.allow_input_CSS_process = !1,
                window.firstSelectLimit = !1, window.newComments = [], window.placeholderSelector = !1, window.mouseoverTrigger = !1, window
                .getJsonNow = !1, window.colorsReady = !1, window.maxDeep = 24, window.isDynamicSelectorsReady = !1, window.triggedByNav = !1, window
                .isIrisOpen = !1, window.webkitArray = ["column-count", "backdrop-filter", "transform", "box-shadow", "filter", "animation-fill-mode",
                        "animation-timing-function", "transition-property", "transition-duration", "transition-timing-function", "flex-direction",
                        "justify-content", "align-items", "flex-wrap", "align-content", "column-gap", "row-gap", "animation-duration",
                        "animation-delay", "animation-name", "grid-template-columns", "grid-template-rows", "backface-visibility", "transform-origin",
                        "animation-iteration-count", "transition-delay", "perspective", "flex", "background-clip"
                ];
        var Gi = o("#iframe").contents(),
                Ki = Gi.find("html"),
                Ji = Gi.find("body"),
                Qi = o(document.body).add(Ji),
                en = o(document).add(Gi),
                tn = o(document.body),
                _setYpElements = (function() {
                    if (window.YP && window.YP.elements) {
                        window.YP.elements.Gi = Gi;
                        window.YP.elements.Ki = Ki;
                        window.YP.elements.Ji = Ji;
                        window.YP.elements.Qi = Qi;
                        window.YP.elements.tn = tn;
                    }
                })(),
                an = document.getElementById("iframe"),
                nn = an.contentWindow;
        an = an.contentWindow.document || an.contentDocument, Gi.find("#wyp-animate-data").after(
                "<div id='yellow-pencil-canvas'></div><div id='yellow-pencil-focus-canvas'></div><div id='yellow-pencil-other-canvas'></div><div id='yellow-pencil-extra-canvas'></div>"
                );
        var sn = [];
        sn.general = Ji.find("#yellow-pencil-canvas"), sn.active = Ji.find("#yellow-pencil-focus-canvas"), sn.other = Ji.find(
                "#yellow-pencil-other-canvas"), sn.extra = Ji.find("#yellow-pencil-extra-canvas");
        var on = Ji.find("#yellow-pencil-canvas,#yellow-pencil-focus-canvas,#yellow-pencil-other-canvas");
        if (!1 == window.ypData.demo_mode) {
                var rn = !1;
                window.addEventListener("beforeunload", function() {
                        rn = !0
                }), nn.addEventListener("beforeunload", function(t) {
                        !1 === rn && (t.preventDefault(), t.returnValue = "")
                })
        }
        Gi.on("webkitAnimationStart animationstart", w("*", ":not(", ")", window.simple_not_list), function() {
                        if (S() || T()) return !1;
                        var e = o(this);
                        return e.hasClass("wyp-animating") || e.addClass("wyp-animating"), e.hasClass("wyp-selected") && !1 == Ji.hasClass(
                                "wyp-h-trfm") && C() && Ji.addClass("wyp-h-trfm"), !1
                }), 0 == o(".css-editor-btn").length && tn.addClass("wyp-css-editor-disable"), o(".wyp-t-cont").each(function() {
                        0 == o(this).find(".op-g").length && o(this).parent().addClass("empty-property")
                }), Ji.addClass("non-logged-in logged-in"), o("#c-t-list .type-disabled").each(function() {
                        var e = o(this).attr("data-value");
                        o(".editor-tabs." + e + "-tab").addClass("disabled"), o(".editor-tabs." + e + "-tab").attr("title", qi
                                .type_not_available)
                }), o(".editor-tabs").tooltip({
                        title: function() {
                                var e = o(this),
                                        t;
                                return e.hasClass("single-tab") ? (t = o("#c-t-list li[data-value='single'] h6 > span:not(.type-byte)")
                                                .text().toLowerCase(), "The styles applied to <b>" + t + "</b>.") : e.hasClass(
                                                "template-tab") ? (t = o(
                                                        "#c-t-list li[data-value='template'] h6 > span:not(.type-byte)").text()
                                                .toLowerCase(), "The styles applied to  <b>" + t + "</b>.") :
                                        "The styles applied to the <b>entire website</b>."
                        },
                        placement: "bottom",
                        container: "#css-editor-bar",
                        html: !0
                }), o("#include-webfont-label").tooltip({
                        container: ".ed-pnl",
                        title: "Include the font file."
                }), o(".fixed-right-panel-checkbox input").change(function(t) {
                        o(this).is(":checked") ? (tn.addClass("wyp-fix-pan"), window.ypData["wyp-fix-pan"] = !0, window.ypOption
                                .fixed_right_panel = !0, N(), o.throttle(Be(), 32), Ze(), Ct(), t.originalEvent && v(
                                        "fixed_right_panel", "true")) : (tn.removeClass("wyp-fix-pan"), window.ypData["wyp-fix-pan"] = !
                                1, window.ypOption.fixed_right_panel = !1, pe(!0), o.throttle(Be(), 32), Ct(), t.originalEvent && v(
                                        "fixed_right_panel", "false"))
                }), o(".fixed-left-bar-checkbox input").change(function(t) {
                        o(this).is(":checked") ? (tn.addClass("wyp-fix-leftbar"), window.ypOption.fixed_left_bar = !0, window.leftBarSize = o(
                                        ".editor-leftbar").get(0).getBoundingClientRect(), N(), o.throttle(Be(), 32), Ze(), t
                                .originalEvent && v("fixed_left_bar", "true")) : (tn.removeClass("wyp-fix-leftbar"), window.ypOption
                                .fixed_left_bar = !1, window.leftBarSize = o(".editor-leftbar").get(0).getBoundingClientRect(), N(), o
                                .throttle(Be(), 32), Ze(), t.originalEvent && v("fixed_left_bar", "false")), Y(I("cssEditorWidth", 400),
                                I("cssEditorHeight", 320) - 36)
                }), o(".hide-premium-options-checkbox input").change(function(t) {
                        o(this).is(":checked") ? (o("li.animation-option").hasClass("active") && o("li.animation-option.active > h3").trigger(
                                "click"), o(
                                "#font-family-group,#color-group,#background-color-group,#background-image-group,#width-group,#height-group,li.animation-option,.animation-manager-btn"
                                ).hide(), o("li.animation-option").addClass("disabled"), o(".wyp-badge.wyp-lite").css(
                                "visibility", "hidden"), window.ypOption.hide_premium_options = !0, t.originalEvent && v(
                                "hide_premium_options", "true")) : (o(
                                        "#font-family-group,#color-group,#background-color-group,#background-image-group,#width-group,#height-group,.animation-manager-btn"
                                        ).show(), 0 == o(".ed-pnl-list > li.active").length ? o("li.animation-option").removeClass(
                                        "disabled").show() : o("li.animation-option").removeClass("disabled").hide(), o(
                                        ".wyp-badge.wyp-lite").css("visibility", "visible"), window.ypOption.hide_premium_options = !1,
                                t.originalEvent && v("hide_premium_options", "false"))
                }), o(".smart-responsive-technology-checkbox input").change(function(t) {
                        o(this).is(":checked") ? (window.ypOption.smart_responsive_technology = !0, t.originalEvent && v(
                                "smart_responsive_technology", "true")) : (window.ypOption.smart_responsive_technology = !1, t
                                .originalEvent && v("smart_responsive_technology", "false"))
                }), o(".smart-important-tag-checkbox input").change(function(t) {
                        o(this).is(":checked") ? (window.ypOption.smart_important_tag = !0, t.originalEvent && v("smart_important_tag",
                                "true")) : (window.ypOption.smart_important_tag = !1, t.originalEvent && v("smart_important_tag", "false"))
                }), o(".show-css-selector-checkbox input").change(function(t) {
                        o(this).is(":checked") ? (Ji.removeClass("wyp-css-slctr-off"), window.ypOption.show_css_selector = !0, t
                                .originalEvent && (v("show_css_selector", "true"), C() && Q(_a(), _(), !0), 0 == o(
                                        ".left-menu-btn.yhover").length && o(".left-menu-btn").trigger("click"))) : (Ji.addClass(
                                "wyp-css-slctr-off"), window.ypOption.show_css_selector = !1, t.originalEvent && (v(
                                        "show_css_selector", "false"), C() && Q(_a(), _(), !0), 0 == o(".left-menu-btn.yhover")
                                .length && o(".left-menu-btn").trigger("click")))
                }), window.ypOption.show_css_selector || Ji.addClass("wyp-css-slctr-off"), o(".append-auto-comments-checkbox input").change(function(
                t) {
                        o(this).is(":checked") ? (window.ypOption.append_auto_comments = !0, t.originalEvent && v("append_auto_comments",
                                "true")) : (window.ypOption.append_auto_comments = !1, t.originalEvent && v("append_auto_comments",
                                "false"))
                }), tn.hasClass("yp-yellow-pencil-demo-mode") && (window.ypData.demo_mode = !0), !0 == window.ypOption.fixed_right_panel && (o(
                        ".fixed-right-panel-checkbox input").prop("checked", !0), o(".fixed-right-panel-checkbox input").trigger("change")), !0 ==
                window.ypOption.fixed_left_bar && (o(".fixed-left-bar-checkbox input").prop("checked", !0), o(".fixed-left-bar-checkbox input").trigger(
                        "change")), !0 == window.ypOption.hide_premium_options && (o(".hide-premium-options-checkbox input").prop("checked", !0), o(
                        ".hide-premium-options-checkbox input").trigger("change")), null != o.urlParam("wyp_load_popup") && (function() {
                        var e = o("#wyp-customizing-type-frame"),
                                t = o.urlParam("wyp_mode"),
                                a = e.attr("data-page-id"),
                                i = e.attr("data-page-type"),
                                n = e.attr("data-page-href"),
                                s = e.attr("data-page-visitor");
                        s = "true" == s || !0 == s ? "&wyp_out=true" : "";
                        var r = e.attr("data-src") + "&wyp_page_href=" + n + "&wyp_page_id=" + a + "&wyp_page_type=" + i + "&wyp_mode=" + t + s;
                        if (r == e.attr("src")) return !1;
                        var l = o("<div />").append(o("#wyp-customizing-type-frame").clone().attr("src", r)).html();
                        e.remove(), o("#iframe").after(l)
                }(), setTimeout(function() {
                        o("#wyp-current-page").trigger("click")
                }, 10)), Gi.on("webkitAnimationEnd animationend", w("*", ":not(", ")", window.simple_not_list), function() {
                        if (S() || T()) return !1;
                        var e = o(this);
                        return e.hasClass("wyp-animating") && e.removeClass("wyp-animating"), e.hasClass("wyp-selected") && C() && (Ji
                                .removeClass("wyp-h-trfm"), Ze()), !1
                }), o("#min-width-group .wyp-after,#min-height-group .wyp-after,#max-width-group .wyp-after,#max-height-group .wyp-after").css(
                        "display", "none"), o(".wyp-wireframe-btn").click(function() {
                        Ji.toggleClass("wyp-wf-on")
                }), $(), o(".wyp-anim-control-play").on("click", function() {
                        if (o(this).hasClass("active")) return !1;
                        Qi.addClass("wyp-animate-manager-playing"), tn.addClass("wyp-clean-look"), Ji.addClass("wyp-hid-bor-n");
                        var e = Math.max.apply(null, o(".wyp-anim-process-inner").map(function() {
                                        return o(this).outerWidth(!0)
                                }).get()),
                                n = parseFloat(e) / 100;
                        o("#wyp-animate-helper").text("@-webkit-keyframes playingBorder{from{left: 0px;}to{left:" + e +
                                        "px;}}@keyframes playingBorder{from{left: 0px;}to{left:" + e + "px;}}"), o(".wyp-anim-playing-border")
                                .css("animation-duration", n + "s").addClass("active"), o(this).addClass("active");
                        Yi(), window.animationTimer3 = setTimeout(function() {
                                o(".wyp-anim-control-pause").trigger("click")
                        }, 1e3 * n), o(".wyp-anim-playing-over").css("width", e + o(window).width());
                        for (var s = ["single", "template", "global"], r = 0; r < s.length; r++)
                                for (var l = p(a(s[r], !1), "[rule=animation-name]"), d = 0, c, u; d < l.length; d++) c = l[d].replace(
                                        /(\/\*(.*?)\*\/|\n)/g, ""), u = Ut(c), u = u.replace(
                                        /(\.|:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)click|yp(-|_)focus)/g, ""), Gi.find(u).each(
                                        function() {
                                                o(this).addClass("yp_hover yp_focus yp_click yp_onscreen")
                                        });
                        var m = 0;
                        window.animMinC = setInterval(function() {
                                ++m, 59 == g && (g = 0);
                                var e = m;
                                10 > m && (e = "0" + m), o(".wyp-counter-min").text(e)
                        }, 6e4);
                        var f = 0;
                        window.animSecC = setInterval(function() {
                                ++f;
                                var e = f;
                                10 > f && (e = "0" + f), o(".wyp-counter-second").text(e)
                        }, 1e3);
                        var g = 0;
                        window.animMsC = setInterval(function() {
                                ++g, 99 == g && (g = 0);
                                var e = g;
                                10 > g && (e = "0" + g), o(".wyp-counter-ms").text(e)
                        }, 1)
                }), o(".wyp-anim-control-pause").on("click", function() {
                        clearTimeout(window.wyp_anim_player), o(".wyp-anim-playing-border").removeClass("active"), o(".wyp-anim-control-play")
                                .removeClass("active");
                        for (var e = ["single", "template", "global"], n = 0; n < e.length; n++)
                                for (var s = p(a(null, !1), "[rule=animation-name]"), r = 0, l, d; r < s.length; r++) l = s[r].replace(
                                        /(\/\*(.*?)\*\/|\n)/g, ""), d = Ut(l), d = d.replace(
                                        /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)click|yp(-|_)focus)/g, ""), Gi.find(d).each(
                                        function() {
                                                o(this).removeClass("yp_hover yp_focus yp_click yp_onscreen")
                                        });
                        tn.removeClass("wyp-clean-look"), Ji.removeClass("wyp-hid-bor-n"), Qi.removeClass("wyp-animate-manager-playing"), o(
                                        ".wyp-counter-min").text("00"), o(".wyp-counter-second").text("00"), o(".wyp-counter-ms").text("00"),
                                clearInterval(window.animMinC), clearInterval(window.animSecC), clearInterval(window.animMsC)
                }), o(".wyp-anim-control-close,.wyp-visual-editor-link").on("click", function() {
                        o(".animation-manager-btn").trigger("click")
                }), o(".wyp-animate-manager-inner").on("scroll", o.throttle(function() {
                        0 < o(this).scrollLeft() ? o(".wyp-animate-manager").addClass("view-scrolled") : o(".wyp-animate-manager")
                                .removeClass("view-scrolled")
                }, 48)), o(".animation-manager-btn").on("click", function() {
                        if (Qi.toggleClass("wyp-animate-manager-active"), window.ypData.is_animation_manager = !window.ypData
                                .is_animation_manager, o(".wyp-animate-manager").toggle(), o(".wyp-anim-control-pause").trigger("click"), !o(
                                        this).hasClass("active")) {
                                o(".wyp-css-ed-act .wyp-css-close-btn").trigger("click"), It(), H();
                                var e = Math.max.apply(null, o(".wyp-anim-process-inner").map(function() {
                                        return o(this).outerWidth(!0)
                                }).get());
                                o(".wyp-anim-process-bar-area").width(e + o(window).width())
                        } else j(), N();
                        0 < o(".animation-option.active").length && (o(".animation-option.active h3").trigger("click"), o(
                                ".animation-option.active").removeAttr("data-loaded")), we(), Ze()
                }), o(document).on("mouseenter", ".wyp-control-trash", function() {
                        o(this).parent().tooltip("hide"), o(this).tooltip("show")
                }), o(document).on("click", ".wyp-control-trash", function() {
                        var e = o(this);
                        k({
                                title: qi.you_are_sure,
                                showCancelButton: !0,
                                confirmButtonText: qi.delete_anim
                        }, function() {
                                e.parent(".wyp-anim-process-bar").prev(".wyp-anim-process-bar-delay").remove(), e.parent(
                                        ".wyp-anim-process-bar").remove(), window.ypData["wyp-anim-removing"] = !0, o(
                                        ".wyp-delay-zero").each(function() {
                                        var e = o(".wyp-anim-process-inner").offset().left - 5,
                                                t = o(this).next(".wyp-anim-process-bar").offset().left - e;
                                        o(this).css("left", t), o(this).next(".wyp-anim-process-bar").addClass(
                                                "wyp-anim-has-zero-delay")
                                }), F(), window.ypData["wyp-anim-removing"] = void 0, H()
                        })
                }), !1 === window.ypData.demo_mode && !0 !== window.bMode && o(window).add(o(nn)).focus(function() {
                        tn.hasClass("wtfv") && tn.hasClass("wyp-mouseleave") && window.ypData["wyp-if-movleav"] && !1 == window
                                .licenseCheckDelay && (o.post(ajaxurl, {
                                        action: "wyp_check_license",
                                        _wpnonce: window.wyp_editor_nonce
                                }).done(function(e) {
                                        "1" == e && (tn.removeClass("wtfv"), o(".wyp-popup-background,.wyp-info-modal").hide(),
                                                k({
                                                        title: qi.welcome_pro,
                                                        text: qi.license_activated
                                                }))
                                }), window.licenseCheckDelay = !0, setTimeout(function() {
                                        window.licenseCheckDelay = !1
                                }, 1e4))
                }), o(".info-btn").on("click", function() {
                        if (!o(this).hasClass("active")) {
                                var e = "element";
                                0 == o(".advance-info-btns.active").length ? o(".element-btn").trigger("click") : o(".advance-info-btns.active")
                                        .hasClass("design-btn") && (e = "typography"), o(".information-updated").removeClass(
                                                "information-updated"), M(e), window.ypData["wyp-css-ed-drgable"] && o(".css-editor-btn.active")
                                        .trigger("click"), o(".wyp-navigation-btn.active").trigger("click")
                        }
                        o(".advanced-info-box").toggle()
                }), o(".design-btn").on("click", function() {
                        o(this).parent().find(".active").removeClass("active"), o(this).addClass("active"), o(".element-content").hide(), o(
                                ".typography-content").show(), !1 == o(this).hasClass("information-updated") && (M("typography"), o(
                                this).addClass("information-updated"))
                }), o(".element-btn").on("click", function() {
                        o(this).parent().find(".active").removeClass("active"), o(this).addClass("active"), o(".typography-content").hide(), o(
                                ".element-content").show()
                }), o(".advance-info-btns").on("click", function() {
                        o(".advanced-info-box-inner").scrollTop(0)
                }), o(document).on("mousedown", ".ui-resizable-handle", function() {
                        0 == o(this).parents(".wyp-anim-process-inner").length && (tn.addClass("fake-layer-x-bg"), tn.append(
                                "<div class='fake-layer-x'></div>"), o(this).addClass("active"))
                }), o(document).on("mouseup", ".ui-resizable-handle,.fake-layer-x", function() {
                        0 == o(this).parents(".wyp-anim-process-inner").length && (tn.removeClass("fake-layer-x-bg"), o(".fake-layer-x")
                        .remove(), o(".ui-resizable-handle").removeClass("active"))
                });
        var ln = I("CSSEditorDraggable", "0");
        "1" == ln && (tn.addClass("wyp-css-ed-drgable"), window.ypData["wyp-css-ed-drgable"] = !0);
        var dn = 276;
        ln = I("rightPanelWidth", dn), tn.append("<style id='rightpanel-personalized-view'>.ed-pnl{width:" + ln + "px !important;}</style>"), dn = 276,
                ln = I("visualManagerWidth", dn), tn.append("<style id='visual-manager-personalized-view'>#vsl-css-vi{width:" + ln +
                        "px !important;}</style>"), ln = I("advancedInfoBoxWidth", 280), tn.append(
                        "<style id='advancedinfobox-personalized-view'>.advanced-info-box {width:" + ln + "px !important;}</style>"), Y(I(
                        "cssEditorWidth", 400), I("cssEditorHeight", 320) - 36), ln = I("animManagerHeight", 234), tn.append(
                        "<style id='animmanager-personalized-view'>body.wyp-animate-manager-active #iframe{height:-webkit-calc(100% - " + parseInt(ln) +
                        "px) !important;height:calc(100% - " + parseInt(ln) +
                        "px) !important;}body.wyp-animate-manager-active.wyp-res-mod #iframe, body.wyp-animate-manager-active.wyp-res-mod .responsive-right-handle,body.wyp-animate-manager-active.wyp-res-mod .responsive-left-handle{height:-webkit-calc(100% - " +
                        parseInt(ln + 24) + "px) !important;height:calc(100% - " + parseInt(ln + 24) + "px) !important;}.wyp-animate-manager{height:" +
                        ln + "px !important;}</style>"), ln = I("navigationWidth", 230), tn.append(
                        "<style id='navigation-personalized-view'>#layer-tree{width:" + parseFloat(ln) + "px !important;}</style>"), o(
                        ".wyp-css-editor-detach").on("click", function() {
                        window.ypData["wyp-css-ed-drgable"] || (o(".wyp-navigation-btn.active").trigger("click"), o(".info-btn.active").trigger(
                                "click")), tn.toggleClass("wyp-css-ed-drgable"), window.ypData["wyp-css-ed-drgable"] = !window.ypData[
                                "wyp-css-ed-drgable"], n.resize(), N(), ye(), Ze(), Y(I("cssEditorWidth", 400), I("cssEditorHeight",
                                320) - 36), window.ypData["wyp-css-ed-drgable"] ? R("CSSEditorDraggable", "1") : R("CSSEditorDraggable",
                                "0")
                }), o(".wyp-animate-manager-inner").on("scroll", o.throttle(function() {
                        o(".wyp-anim-left-part-column").css("left", o(this).scrollLeft())
                }, 64)), o(document).on("click", ".wyp-anim-list-menu ul li", function() {
                        Gi.find(".yp_onscreen,.yp_hover,.yp_click,.yp_focus").removeClass("yp_onscreen yp_hover yp_click yp_focus");
                        var e = o(".wyp-anim-add.active");
                        window.ypData["wyp-animate-manager-mode"] = !0;
                        var t = e.parent().attr("data-selector-full"),
                                a = [],
                                i = [],
                                n = [],
                                s = e.parents(".wyp-anim-process-bar-area").attr("data-responsive"),
                                r = e.parents(".wyp-anim-process-bar-area").attr("data-anim-type");
                        if (e.parent().find(".wyp-anim-process-inner").is(":empty")) tt(t, "animation-name", o(this).data("value"), "", s, r);
                        else {
                                e.parent().find(".wyp-anim-process-inner .wyp-anim-process-bar").each(function() {
                                        a.push(o(this).text()), i.push(o(this).width() / 100 + "s")
                                }), e.parent().find(".wyp-anim-process-inner .wyp-anim-process-bar-delay").each(function() {
                                        var t = (o(this).offset().left - e.parent().find(".wyp-anim-process-inner").offset()
                                                .left) / 100;
                                        o(this).hasClass("wyp-delay-zero") ? n.push(t + "s") : n.push(t + o(this).width() /
                                                100 + "s")
                                }), a.push(o(this).data("value")), i.push("1s");
                                var l = e.parent().find(".wyp-anim-process-inner .wyp-anim-process-bar").last(),
                                        d = (l.offset().left + l.width() - e.parent().find(".wyp-anim-process-inner").offset().left) / 100;
                                n.push(d + "s"), tt(t, "animation-name", a.toString(), "", s, r), tt(t, "animation-duration", i.toString(), "",
                                        s, r), tt(t, "animation-delay", n.toString(), "", s, r)
                        }
                        o("#fake-layer").trigger("click"), window.ypData["wyp-animate-manager-mode"] = void 0, setTimeout(function() {
                                H(), F()
                        }, 100)
                }), o(document).on("click", ".wyp-anim-add", function(a) {
                        a.stopPropagation();
                        var e = o(this).offset().top,
                                t = o(this).offset().left,
                                i = o(".wyp-anim-list-menu ul");
                        o(".wyp-anim-list-menu").removeAttr("style").removeClass("wyp-anim-list-top");
                        var n = "",
                                s = [];
                        o.each(JSON.parse(o("#animation-name-group textarea").val()), function(e, t) {
                                -1 === s.indexOf(t.category) && (n += "<li class='anim-cat-list'>" + t.category + "</li>", s
                                        .push(t.category)), "none" != t.value && (n += "<li data-value='" + t.value +
                                        "' data-text='" + t.label + "' data-content='" + t.label + "'>" + t.label +
                                        "</li>")
                        }), i.html(n);
                        var r = o(window).height() - e;
                        310 > r ? o(".wyp-anim-list-menu").addClass("wyp-anim-list-top") : i.height() > r && i.height(r), o(
                                ".wyp-anim-list-menu").css({
                                left: t,
                                top: e
                        }).show(), o(".wyp-anim-list-menu").css("margin-left", "-" + parseInt(o(".wyp-anim-list-menu").width() / 2 -
                                10) + "px"), o(".wyp-anim-add").removeClass("active"), o(this).addClass("active"), W({
                                index: 2147483646,
                                container: ".wyp-animate-manager",
                                callback: function() {
                                        o(".wyp-anim-list-menu").hide()
                                }
                        })
                }), o(".wyp-info-modal-close").click(function() {
                        o(".wyp-info-modal,.wyp-popup-background").fadeOut("fast")
                }), o(".wyp-popup-background").click(function() {
                        o(this).fadeOut(), o(".wyp-info-modal").fadeOut("fast")
                }), o(".cursor-main-btn").mousedown(function() {
                        !1 == o(this).hasClass("active") ? (!window.ypData["wyp-met-dis"] && o(".wyp-ruler-btn").trigger("click"), o(this)
                                .addClass("active")) : o(".inspector-sublist").toggle(), o(this).tooltip("hide")
                }), o(".inspector-sublist li").click(function() {
                        var e = o(this).attr("data-cursor-action");
                        o(".wyp-ruler-btn").hasClass("active") && o(".wyp-ruler-btn").trigger("click"), window.ypData.inspector = e,
                                "default" == e ? (tn.removeClass("wyp-single-inspector-active"), tn.addClass("wyp-flexible-inspector-active")) :
                                "single" == e ? tn.addClass("wyp-single-inspector-active") : (tn.removeClass(
                                        "wyp-flexible-inspector-active wyp-single-inspector-active"), At()), o(".inspector-sublist").toggle(),
                                o(".inspector-sublist li").removeClass("active"), o(this).addClass("active")
                }), tn.on("click", function(t) {
                        "block" == o(".inspector-sublist").css("display") && !1 == o(t.target).is(
                                        ".cursor-main-btn,.cursor-main-btn *,.inspector-sublist,.inspector-sublist *") && o(
                                        ".inspector-sublist").hide(), "block" == o(".interface-settings").css("display") && !1 == o(t.target)
                                .is(".left-menu-btn,.left-menu-btn *,.interface-settings,.interface-settings *") && (o(".left-menu-btn")
                                        .toggleClass("yhover"), o(".interface-settings").hide())
                }), window.responsiveModeRMDown = !1, window.SelectorDisableResizeRight = !1, window.selectorWasActive = !1, window.rulerWasActive = !1,
                o(".responsive-right-handle,.responsive-left-handle").on("mousedown", function() {
                        if (window.responsiveModeRMDown) return !1;
                        window.ypData["wyp-met-dis"] || o(".wyp-ruler-btn").trigger("click");
                        var e = o(this);
                        window.responsiveModeRMDown = !0, e.hasClass("responsive-right-handle") ? Qi.addClass(
                                        "wyp-res-resizing wyp-res-resizing-right") : Qi.addClass("wyp-res-resizing wyp-res-resizing-left"), tn
                                .addClass("wyp-clean-look"), Ji.addClass("wyp-hid-bor-n"), window.selectorWasActive = !!o(".wyp-selector-mode")
                                .hasClass("active"), o(".wyp-ruler-btn").hasClass("active") ? window.rulerWasActive = !0 : (window
                                        .rulerWasActive = !1, o(".wyp-ruler-btn").trigger("click").removeClass("active")), o(
                                        ".wyp-selector-mode").hasClass("active") && !1 === C() && (o(".wyp-selector-mode").trigger("click"),
                                        window.SelectorDisableResizeRight = !0), e.hasClass("responsive-right-handle") ? j("right") : j("left"),
                                setTimeout(function() {
                                        o(".metric-left-tooltip").html("W: <span>" + parseInt(o("#iframe").width()) + "</span>px")
                                }, 1)
                });
        var pn, cn;
        en.on("mousemove", o.throttle(function(t) {
                if (!0 === window.responsiveModeRMDown) {
                        var e = N(!0);
                        t.pageX -= 10, tn.hasClass("wyp-res-resizing-right") ? t.pageX -= parseInt(o("#iframe").offset().left) :
                                t.pageX = parseInt(o("#iframe").offset().left + o("#iframe").width()) - t.pageX - 16, 270 > t
                                .pageX && (t.pageX = 270), t.pageX > e - 220 && (t.pageX = e - 220), o("#iframe").width(t
                                .pageX), tn.hasClass("wyp-res-resizing-left") ? j("left") : j(), clearTimeout(pn), clearTimeout(
                                        cn), pn = setTimeout(function() {
                                        X()
                                }, window.YellowDelay), cn = setTimeout(function() {
                                        o(".metric-left-tooltip").html("W: <span>" + parseInt(o("#iframe").width()) +
                                                "</span>px")
                                }, 1)
                }
        }, 32)), en.on("mouseup", function() {
                !0 === window.responsiveModeRMDown && (window.responsiveModeRMDown = !1, Qi.removeClass(
                                "wyp-res-resizing wyp-res-resizing-right wyp-res-resizing-left"), tn.removeClass(
                                "wyp-clean-look"), setTimeout(function() {
                                Ji.removeClass("wyp-hid-bor-n"), Ze()
                        }, 25), !0 === window.SelectorDisableResizeRight && (window.SelectorDisableResizeRight = !1), !1 ===
                        window.rulerWasActive && o(".wyp-ruler-btn").addClass("active").trigger("click"), !0 === window
                        .selectorWasActive ? !1 === o(".wyp-selector-mode").hasClass("active") && o(".wyp-selector-mode")
                        .trigger("click") : o(".wyp-selector-mode").hasClass("active") && o(".wyp-selector-mode").trigger(
                                "click"), we(), C() && _e())
        }), o(".responsive-add-breakpoint").on("click", function() {
                var e = "(" + o(".media-control").attr("data-code") + ":" + o("#iframe").width() + "px)",
                        t = Pe(e),
                        i = Re(e);
                r(m(a(null, !1), t + "YPtoAddBreakpoint{b:b;}" + i, null), null, "b"), Mi(), o(".breakpoint-bar .focus").addClass(
                        "defined-with-yellowpencil").removeClass("edited"), we(), j()
        });
        var un = 0;
        en.on("keyup", function(t) {
                un = new Date;
                var e = t.target.tagName.toLowerCase(),
                        a = !1,
                        i = !1;
                (!0 === t.ctrlKey || !0 === t.metaKey) && (a = !0), ("input" == e || "textarea" == e) && (i = !0), !1 === a && !1 ===
                        i && (Ji.removeClass("wyp-control-key-down"), window.ypData["wyp-control-key-down"] = !1, Gi.find(
                                ".wyp-multiple-selected").removeClass("wyp-multiple-selected"), sn.other.find(
                                ".wyp-selected-others-multiple-box").remove())
        });
        var mn;
        en.on("keydown", function(t) {
                var e = new Date,
                        a = t.target.tagName.toLowerCase(),
                        i = o(t.target),
                        n = t.keyCode || t.which,
                        s = !1,
                        d = !!t.shiftKey,
                        p = !1,
                        c;
                if ((!0 === t.ctrlKey || !0 === t.metaKey) && (s = !0), ("input" == a || "textarea" == a) && (p = !0), 83 == n && !0 ===
                        s && !1 === d && (t.preventDefault(), o(".wyp-button.wyp-save-btn").trigger("click")), 46 == n && !1 === s && !
                        1 === p && !1 === d && (tt(null, "display", "none", ""), Mi(), setTimeout(function() {
                                At(), sn.extra.find(".wyp-el-viewer").remove()
                        }, window.Yellow2Delay)), 27 == n && !1 === s && !1 === d) {
                        if (O() || D()) return !1;
                        if ("none" == o(".yellow-alert").css("display") || 0 === o(".yellow-alert").length) {
                                if (!0 !== window.bMode && "none" != o(".wyp-popup-background").css("display")) return o(
                                        ".wyp-info-modal-close").trigger("click"), !1;
                                if (Qi.hasClass("wyp-selector-editor-active")) return o("#wyp-selector-editor").val(""), ge(
                                        "#wyp-selector-editor"), !1
                        }
                }
                if (!1 === s && !1 === p && !0 === d && !1 == window.ypData["wyp-if-movleav"] && 37 != n && 38 != n && 39 != n && 40 !=
                        n && (clearTimeout(mn), mn = setTimeout(function() {
                                +e > +un && C() && (Ji.addClass("wyp-control-key-down"), window.ypData[
                                                "wyp-control-key-down"] = !0, window.ypData[
                                        "wyp-rcnt-hvr-el"] && 0 < window.ypData["wyp-rcnt-hvr-el"].length && (
                                                window.mouseoverTrigger = !0, window.ypData["wyp-rcnt-hvr-el"]
                                                .trigger("fakeOver"), window.mouseoverTrigger = !1), window
                                        .ypData["wyp-rcnt-hvr-el"] = void 0)
                        }, 200)), !1 === s && !1 === p && (38 == n || 40 == n || 37 == n || 39 == n) && C() && !1 === z() && !1 ==
                        window.ypData["wyp-if-movleav"] && (t.preventDefault(), clearTimeout(window.KeymovingDelay), window
                                .KeymovingDelay = setTimeout(function() {
                                        var e = _(),
                                                a = parseInt(e.css("top")),
                                                i = parseInt(e.css("left"));
                                        isNaN(a) && (a = 0), isNaN(i) && (i = 0);
                                        var s = 1;
                                        if (d && (s = 10), 38 == n ? a -= s : 40 == n && (a += s), 37 == n ? i -= s : 39 == n &&
                                                (i += s), a += "px", i += "px", 38 == n || 40 == n) {
                                                tt(null, "top", a, "");
                                                var p = parseInt(e.css("bottom"));
                                                isNaN(p) && (p = 0), 0 !== parseFloat(a) + parseFloat(p) && tt(null, "bottom",
                                                        "auto", "")
                                        }
                                        if (37 == n || 39 == n) {
                                                tt(null, "left", i, "");
                                                var c = parseInt(e.css("right"));
                                                isNaN(c) && (c = 0), 0 !== parseFloat(i) + parseFloat(c) && tt(null, "right",
                                                        "auto", "")
                                        }
                                        var u = e.css("position");
                                        if ("static" == u && tt(null, "position", "relative", ""), 0 < o(
                                                        "li.position-option.active").length) {
                                                var m = _a();
                                                o("#top-group,#left-group").each(function() {
                                                        pa(G(this), m)
                                                })
                                        } else o("li.position-option").removeAttr("data-loaded");
                                        Mi()
                                }, 40)), !0 === p && 27 == n && !1 === s && !1 === d) return i.blur(), !1;
                if (8 == n && !1 === s && !1 === p && !1 === d) return t.preventDefault(), !1;
                if (90 == n && !0 == s && !1 === p && !1 === d) return t.preventDefault(), clearTimeout(window.historyDelay), tn
                        .hasClass("wyp-history-delay") ? window.historyDelay = setTimeout(function() {
                                U()
                        }, 220) : setTimeout(function() {
                                U()
                        }, 50), !1;
                if (71 == n && !0 === s && !1 === p && !1 === d) return t.preventDefault(), Qi.toggleClass("wyp-smart-guide-disabled"),
                        !1;
                if (89 == n && !0 === s && !1 === p && !1 === d) return t.preventDefault(), clearTimeout(window.historyDelay), tn
                        .hasClass("wyp-history-delay") ? window.historyDelay = setTimeout(function() {
                                q()
                        }, 220) : setTimeout(function() {
                                q()
                        }, 50), !1;
                if (90 == n && !0 === s && !0 === d && !1 === p) return t.preventDefault(), clearTimeout(window.historyDelay), tn
                        .hasClass("wyp-history-delay") ? window.historyDelay = setTimeout(function() {
                                q()
                        }, 220) : setTimeout(function() {
                                q()
                        }, 50), !1;
                if (86 == n && !1 === s && !1 === p && !1 === d) return "cursor" === window.ypData.inspector ? (o(
                        ".inspector-sublist-default").trigger("click"), window.ypData.inspector = "default") : (o(
                        ".inspector-sublist-cursor").trigger("click"), window.ypData.inspector = "cursor"), o(
                        ".inspector-sublist").css("display", "none"), !1;
                if (27 == n && !1 === s && !1 === d) {
                        if (t.preventDefault(), z()) return !1;
                        if (tn.hasClass("wyp-bg-layer-active")) return o("#fake-layer").trigger("click"), !1;
                        if (0 < o("#wyp-customizing-type-frame").length && !1 == p && "block" == o("#wyp-customizing-type-frame").css(
                                        "display")) return o("#wyp-current-page").removeClass("active"), o(
                                "#wyp-customizing-type-frame").css("display", "none"), !1;
                        if ("block" == o("#image_uploader").css("display") && !1 == p) return o("#image_uploader").toggle(), o(
                                "#image_uploader_background").toggle(), o(".wyp-upload-btn").toggleClass("active"), !1;
                        if (!1 === tn.hasClass("autocomplete-active") && "none" == o(".yellow-alert").css("display") || 0 === o(
                                        ".yellow-alert").length && !1 == p) {
                                if (window.isIrisOpen) return o(".iris-picker").hide(), !1;
                                if (0 < o("#context-menu-layer:visible").length) return o("#context-menu-layer,.context-menu-list")
                                        .hide(), !1;
                                if (tn.hasClass("customization-type-popup")) return o("#customizing-mode").trigger("click"), !1;
                                if ("block" == o(".inspector-sublist").css("display")) return o(".inspector-sublist").css("display",
                                        "none"), !1;
                                if ("block" == o(".interface-settings").css("display")) return o(".interface-settings").css("display",
                                        "none"), o(".left-menu-btn.yhover").removeClass("yhover"), !1;
                                if (0 < o(".info-btn.active").length) return o(".info-btn.active").trigger("click"), !1;
                                if ("block" == o("#css-editor-bar").css("display")) return o(".css-editor-btn").trigger("click"), !1;
                                if (tn.hasClass("wyp-nvgtn-act")) return o(".wyp-navigation-btn.active").trigger("click"), !1;
                                if (window.ypData["vsl-css-vi-active"]) return It(), !1;
                                if (0 < o(".animation-manager-btn.active").length) return o(".animation-manager-btn").trigger("click"),
                                        !1;
                                if (0 < o(".wyp-ruler-btn.active").length) return o(".wyp-ruler-btn").trigger("click"), !1;
                                if (S()) return o(".wyp-anim-cancel").trigger("click"), !1;
                                if (C()) return At(), o.throttle(Be(), 32), !1;
                                if (0 == o(".wyp-responsive-btn.active").length) return o(".wyp-responsive-btn").trigger("click"), !1
                        }
                }
                if (32 == n && !1 === d && !1 === s && !1 === p && C()) return t.preventDefault(), ce(), !1;
                if (32 == n && !1 === s && !1 === d && !1 === p && !1 === C() && o(".wyp-selector-mode").hasClass("active")) return t
                        .preventDefault(), void 0 !== _() && 0 < _().length && (c = "single" === window.ypData.inspector ? o
                                .trim(Ma(null, "sharp")) : o.trim(Ma(null, "default")), L(c), Q(c, _(), !0)), !1;
                if (32 == n && !1 === s && !0 === d && !1 === p && !0 === C() && o(".wyp-selector-mode").hasClass("active")) {
                        t.preventDefault();
                        var u = Gi.find(".wyp-multiple-selected");
                        if (0 == u.length) return !1;
                        var r = _a(),
                                l = Ma(u, "sharp");
                        if (u.hasClass("wyp-selected-others") && 0 < r.split(",").length) {
                                u.removeClass("wyp-selected-others"), r = r.replace(new RegExp("," + Na(l), "g"), "");
                                var m = _();
                                return L(r), Q(r, m, !0), u.removeClass("wyp-multiple-selected"), Ze(), !1
                        }
                        return sn.other.find(".wyp-selected-others-multiple-box").remove(), u.addClass("wyp-selected-others")
                                .removeClass("wyp-multiple-selected"), L(r + "," + l), Q(r + "," + l, _(), !0), !1
                }
                return 82 == n && !1 === s && !1 === p && !1 === d ? (t.preventDefault(), o(".wyp-responsive-btn.active").trigger(
                                "click"), !1) : 77 == n && !1 === s && !1 === p && !1 === d ? (t.preventDefault(), o(".wyp-ruler-btn")
                                .trigger("click"), !1) : 87 == n && !1 === s && !1 === p && !1 === d ? (t.preventDefault(), o(
                                ".wyp-wireframe-btn").trigger("click"), !1) : 68 == n && !1 === s && !1 === p && !1 === d ? (t
                                .preventDefault(), o(".info-btn:not(.active)").trigger("click"), !1) : 65 == n && !1 === s && !1 ===
                        p && !1 === d ? (t.preventDefault(), !window.bMode) && (o(".animation-manager-btn:not(.active)").trigger(
                                "click"), !1) : 67 == n && !1 === s && !1 === p && !1 === d && (t.preventDefault(), !window.ypData[
                                "vsl-css-vi-active"]) ? (o(".wyp-button-manage").trigger("click"), !1) : 72 == n && !1 === s && !1 ===
                        p && !1 === d ? (t.preventDefault(), pe(), !1) : 0 < o(".css-editor-btn").length && !1 === s && !1 === p && !
                        1 === tn.hasClass("process-by-code-editor") && !1 === d && (162 == n || 69 == n) ? (t.preventDefault(), S()) ? (
                                k({
                                        title: qi.sorry,
                                        text: qi.cantEditor
                                }), !1) : !window.bMode && (o(".css-editor-btn").trigger("click"), !1) : 192 == n && !1 === s && !1 ===
                        p && !1 === tn.hasClass("process-by-code-editor") && !1 === d ? (t.preventDefault(), S()) ? (k({
                                title: qi.sorry,
                                text: qi.cantEditor
                        }), !1) : !window.bMode && (o(".css-editor-btn").trigger("click"), !1) : 70 == n && !1 === s && !1 === p && !
                        1 === d ? (t.preventDefault(), fe(), !1) : 78 == n && !1 === s && !1 === p && !1 === d ? (t.preventDefault(), o(
                                ".wyp-navigation-btn:not(.active)").trigger("click"), !1) : void 0
        }), n.commands.addCommand({
                name: "close",
                bindKey: {
                        win: "ESC",
                        mac: "ESC"
                },
                exec: function() {
                        o(".css-editor-btn").trigger("click")
                },
                readOnly: !1
        }), n.commands.addCommand({
                name: "save",
                bindKey: {
                        win: "CTRL+S",
                        mac: "CMD+S"
                },
                exec: function() {
                        var e = o(".wyp-button.wyp-save-btn");
                        (!1 === window.saveFromEditor || void 0 === window.saveFromEditor) && !1 === tn.hasClass(
                                "css-code-unvalid") && e.hasClass("waiting-for-save") && (window.saveFromEditor = !0, e
                                .trigger("click"))
                },
                readOnly: !1
        }), n.on("copy", function(e) {
                if (!window.ypData.demo_mode && tn.hasClass("wtfv")) {
                        var t = e.text.match(
                                /(\s|\{)(font-family|color|background-image|background-color|width|height|animation-name)\:/g);
                        if (null !== t) return o(".wyp-info-modal .wyp-info-modal-top-inner h2").text("Copy Failed. Upgrade to Pro!"),
                                o(".wyp-info-modal .wyp-info-modal-top-inner p").text(
                                        "You are using some premium features. Upgrade to Pro or disable premium features to copy code."
                                        ), o(".wyp-info-modal,.wyp-popup-background").fadeIn("fast"), navigator.clipboard
                                .writeText(""), !1
                }
        }), Gi.find("form").submit(function(t) {
                if (t.preventDefault(), "cursor" !== window.ypData.inspector) return !1
        }), o(".wyp-ruler-btn").click(function() {
                return !1 === C() && At(), Qi.toggleClass("wyp-met-dis"), window.ypData["wyp-met-dis"] = !1 === window.ypData[
                        "wyp-met-dis"], o.throttle(Be(), 32), o(".cursor-main-btn").toggleClass("active"), window.ypData[
                        "wyp-met-dis"] && (Gi.find(".hv-in-bx").css("transform", "translate3d(-1000px, -1000px, -1000px)"), Gi
                        .find(".wyp-size-handle").css("top", "-1000px"), tn.find(
                                ".metric-top-tooltip,.metric-left-tooltip,.metric-left-border,.metric-top-border").css(
                                "transform", "translate3d(-1000px, -1000px, -1000px)")), !1
        }), o(".css-va,.wyp-bgs-css-val").keydown(function(t) {
                var e = t.keyCode || t.which,
                        a = parseFloat(o(this).val());
                isNaN(a) && (a = 0), 38 == e && (t.preventDefault(), o(this).val(a + parseFloat(1))), 40 == e && (t.preventDefault(), o(
                        this).val(a - parseFloat(1)))
        }), o(".css-va,.wyp-bgs-css-val,.ac-p-d > .in-ac,.wyp-input,.css-un,.wyp-bgs-prefix,.iris-picker input").on("focus", function() {
                o(this).hasClass("select-able") || o(this)[0].setSelectionRange(0, o(this).val().length), o(this).addClass(
                        "select-able")
        }).on("blur", function() {
                o(this).removeClass("select-able")
        }), o(document).on("focus", ".iris-picker input", function() {
                o(this).hasClass("select-able") || o(this)[0].setSelectionRange(0, o(this).val().length), o(this).addClass(
                        "select-able")
        }), o(document).on("blur", ".iris-picker input", function() {
                o(this).removeClass("select-able")
        }), o.fn.hasAttr = function(e) {
                return void 0 !== this.attr(e)
        }, o.fn.getCursorPosition = function() {
                var e = this.get(0);
                if (e) {
                        if ("selectionStart" in e) return e.selectionStart;
                        if (document.selection) {
                                e.focus();
                                var t = document.selection.createRange(),
                                        a = document.selection.createRange().text.length;
                                return t.moveStart("character", -e.value.length), t.text.length - a
                        }
                }
        }, o.fn.cssImportant = function(e, t) {
                this.css(e, t), o(this).attr("style", this.attr("style").replace(e + ": " + t, e + ": " + t + " !important"))
        }, o(".wyp-button-live").click(function() {
                var e = o(this);
                e.addClass("live-btn-loading"), window.ypData["wyp-need-to-process"] && Zi(), setTimeout(function() {
                        var t = e.attr("data-href");
                        if (window.ypData.demo_mode) return k({
                                title: qi.live_preview_alert,
                                text: qi.live_preview_text
                        }), e.removeClass("live-btn-loading"), !1;
                        var a = "",
                                i;
                        if (Gi.find(".wyp-inline-data").each(function() {
                                        i = o(this).attr("data-source-mode"), a += Et(!0, i, !1, !0)
                                }), window.bMode) return !1;
                        var n = o.post(ajaxurl, {
                                action: "wyp_preview_data_save",
                                wyp_data: a,
                                _wpnonce: window.wyp_editor_nonce
                        });
                        n.always(function() {
                                return e.removeClass("live-btn-loading"), window.open(t, t), !1
                        })
                }, 100)
        }), window.cacheFirstLoad = [E()];
        for (var fn = ["single", "template", "global"], gn = 0; gn < fn.length; gn++) fn[gn] != window.cacheFirstLoad && (y(fn[gn]), setTimeout(
                function() {
                        n.setValue(Et(!0, fn[gn], !0)), n.getSession().setUndoManager(new ace.UndoManager)
                }, 300));
        y(), setTimeout(function() {
                n.setValue(Et(!0, null, !0)), n.getSession().setUndoManager(new ace.UndoManager)
        }, 300), window.old_premium_rules = (Gi.find(".wyp-inline-data").text().match(
                /(\s|\{)(font-family|color|background-image|background-color|width|height|animation-name)\:/g) || []).length, o(
                "[data-toggle=\"tooltipTopBottom\"]").tooltip({
                container: ".ed-pnl",
                template: "<div class=\"tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
                html: !0
        }), o("[data-toggle=\"tooltip-bar\"]").tooltip({
                container: "body",
                html: !0
        }), o(".info-btn").on("show.bs.tooltip", function() {
                if (o(this).hasClass("active")) return !1
        }), o(".responsive-add-breakpoint").tooltip({
                template: "<div class=\"tooltip tooltip-breakpoint-add\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
                title: function() {
                        return "Add A Breakpoint<span class='breakpoint-tooltip-t'>" + o("#iframe").width() + "px and " + o(
                                ".media-control").text() + " screens</span>"
                },
                container: "body",
                delay: {
                        show: 50,
                        hide: 0
                },
                placement: "bottom",
                html: !0
        }), o(".mo-i").tooltip({
                template: "<div class=\"tooltip small-tooltip tooltip-responsive-icon\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
                title: "Has edits on another screen size(s).",
                container: ".ed-pnl",
                delay: {
                        show: 50,
                        hide: 0
                },
                placement: "top"
        }), o(".op-l span").tooltip({
                template: "<div class=\"tooltip property-help-tooltip\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\"></div></div>",
                delay: {
                        show: 200,
                        hide: 0
                },
                container: ".ed-pnl",
                placement: "top",
                html: !0
        }), o("[data-toggle=\"tooltipAnimGenerator\"]").tooltip({
                html: !0
        }), o("[data-toggle=\"tooltip\"]").tooltip({
                container: ".ed-pnl",
                html: !0
        }).on("shown.bs.tooltip", function() {
                0 < o(".popover").length && o(this).tooltip("hide")
        }), o("[data-toggle=\"popover\"]").popover({
                trigger: "hover",
                container: ".ed-pnl"
        }), o(".op-g,.wyp-advanced-option").on("shown.bs.popover", function() {
                80 > parseFloat(o(".popover").css("top")) && o(this).popover("hide")
        }), o(".ed-pnl").draggable({
                handle: ".ed-pnl-top",
                cancel: ".ed-pnl-top *",
                start: function() {
                        tn.append("<div class='fake-layer' style='background-color:rgba(0,0,0,0.05);'></div>"), window.ypData[
                                "wyp-fix-pan"] && (o(".fixed-right-panel-checkbox input").prop("checked", !1).trigger(
                                "change"), v("fixed_right_panel", "false"), pe(!0), Ct())
                },
                drag: function(e, t) {
                        t.position.top = Math.max(-30, t.position.top), t.position.top = Math.min(o(window).height() - 30, t
                                        .position.top), o(".wyp-right-panel-placeholder").show(), t.position.left > o(window)
                                .width() - o(".ed-pnl").width() ? o(".wyp-right-panel-placeholder").addClass("active") : o(
                                        ".wyp-right-panel-placeholder").removeClass("active"), o.throttle(Be(), 32)
                },
                stop: function(e, t) {
                        o(".fake-layer").remove(), setTimeout(function() {
                                Ct()
                        }, 5), o(".wyp-right-panel-placeholder").hide(), t.position.left > o(window).width() - o(
                                ".ed-pnl").width() && (o(".fixed-right-panel-checkbox input").prop("checked", !0)
                                .trigger("change"), v("fixed_right_panel", "true"), N(), o.throttle(Be(), 32), Ze(),
                                Ct())
                }
        }), o(".anim-bar").draggable({
                handle: ".anim-bar-title",
                cancel: ".wyp-anim-btn",
                containment: "window",
                start: function() {
                        tn.append("<div class='fake-layer'></div>")
                },
                drag: function(e, t) {
                        t.position.top = Math.max(-30, t.position.top)
                },
                stop: function() {
                        o(".anim-bar").addClass("anim-bar-dragged"), o(".fake-layer").remove(), setTimeout(function() {
                                Ct()
                        }, 5)
                }
        }), o("#left-area-editor").draggable({
                handle: "#css-editor-bar",
                cancel: "#css-editor-bar *",
                start: function() {
                        return !!window.ypData["wyp-css-ed-drgable"] && void(tn.append("<div class='fake-layer'></div>"), window
                                .leftAreaEditors = o("#left-area-editor").attr("style"), o("#css-editor-drag-style")
                                .remove(), window.cssHeightLimit = parseInt(o(window).height() - 25 * o(
                                        "#left-area-editor").height() / 100))
                },
                drag: function(e, t) {
                        return !!window.ypData["wyp-css-ed-drgable"] && void(32 > t.position.left && (t.position.left = 32), -
                                14 > t.position.top && (t.position.top = -14), t.position.top > window.cssHeightLimit &&
                                (t.position.top = window.cssHeightLimit))
                },
                stop: function(e, t) {
                        return !!window.ypData["wyp-css-ed-drgable"] && void(J(window.leftAreaEditors) ? o("#left-area-editor")
                                .removeAttr("style") : o("#left-area-editor").attr("style", window.leftAreaEditors), tn
                                .append("<style id='css-editor-drag-style'>body.wyp-css-ed-drgable #left-area-editor{left:" +
                                        t.position.left + "px !important;top:" + t.position.top +
                                        "px !important;}</style>"), o(".fake-layer").remove())
                }
        }), o(document).on("keydown keyup", ".scenes .scene input", function() {
                o(this).val(mi(o(this).val().replace(/\-/g, ""))), 100 < parseFloat(o(this).val()) && o(this).val("100"), 0 >
                        parseFloat(o(this).val()) && o(this).val("0")
        }), o(document).on("click", ".scenes .scene-no-click-yet", function() {
                o(this).removeClass("scene-no-click-yet")
        }), o(document).on("keyup keydown blur", ".scenes .scene:not(.scene-add):last input", function() {
                o(this).val("100")
        }), o(document).on("keyup keydown blur", ".scenes .scene:first-child input", function() {
                o(this).val("0")
        }), o(document).on("click", ".wyp-anim-play", function() {
                var e = o(this);
                if (tn.hasClass("wyp-animate-test-playing")) return o(".scenes .scene-" + window.willActive + "").trigger("click"), e
                        .html("<span class=\"yicon icon-controls-play\"></span>"), e.attr("data-original-title", "Play")
                        .tooltip("fixTitle").tooltip("show"), Qi.removeClass("wyp-animate-test-playing"), Gi.find(
                                "#animate-test-drive").empty(), Ji.removeClass("wyp-hid-bor-n"), Ni(), Ze(), Yi(), !1;
                if (window.willActive = 1, o(".scenes .scene").each(function(e) {
                                o(this).hasClass("scene-active") && (window.willActive = e + 1)
                        }), 0 === Gi.find("#wyp-anim-scenes style").length) return k({
                        title: qi.all_scenes_empty,
                        text: qi.allScenesEmpty
                }), !1;
                o(".scenes .scene-1").trigger("click");
                var t = te("animationGeneratorTestAnimate");
                t = t + " " + t.replace(/@keyframes/g, "@-webkit-keyframes");
                var a, i;
                Ji.addClass("wyp-hid-bor-n");
                var n = o.trim(tn.attr("class").replace(/wyp-scene-[0-9]/g, ""));
                tn.attr("class", n), n = o.trim(Ji.attr("class").replace(/wyp-scene-[0-9]/g, "")), Ji.attr("class", n), Qi.addClass(
                                "wyp-animate-test-playing"), Gi.find("#animate-test-drive").empty(), Gi.find("#animate-test-drive")
                        .append("<style>" + za(t, !1) + "</style>"), a = o("#animation-duration-value").val(), i = "s" == o(
                                "#animation-duration-after").val() ? 1e3 * a : a, i -= 10, a += o("#animation-duration-after").val(), Gi
                        .find("#animate-test-drive").append(
                                "<style>body.wyp-animate-test-playing .wyp-selected,body.wyp-animate-test-playing .wyp-selected-others,body.wyp-animate-test-playing.wyp-selected{animation-name:animationGeneratorTestAnimate !important;animation-duration:" +
                                a + " !important;animation-iteration-count:1 !important;}</style>"), e.html(
                                "<span class=\"yicon icon-controls-pause\"></span>"), e.attr("data-original-title", "Pause").tooltip(
                                "fixTitle").tooltip("hide"), Yi(), window.animationTimer4 = setTimeout(function() {
                                e.html("<span class=\"yicon icon-controls-play\"></span>"), e.attr("data-original-title",
                                                "Play").tooltip("fixTitle").tooltip("hide"), e.is(":hover") && e.tooltip(
                                        "show"), Qi.removeClass("wyp-animate-test-playing"), Gi.find("#animate-test-drive")
                                        .empty(), Ji.removeClass("wyp-hid-bor-n"), o(".scenes .scene-" + window.willActive + "")
                                        .trigger("click"), Ni(), Ze()
                        }, i)
        }), o(document).on("keyup", ".yellow-alert input", function() {
                o(this).val(Wn(o(this).val()))
        }), o(".wyp-anim-save").click(function() {
                return 0 === Gi.find("#wyp-anim-scenes style").length ? (k({
                        title: qi.sorry,
                        text: qi.allScenesEmpty
                }), !1) : (setTimeout(function() {
                        var e = Wn(yi(bi(_a(), !1, null))) + "_Animate_" + parseInt(JSON.parse(o(
                                "#animation-name-group textarea").val()).length + 1);
                        o(".yellow-alert input").val(e).trigger("focus")
                }, 20), k({
                        title: qi.animation_name,
                        confirmButtonText: qi.save_animation,
                        showCancelButton: !0,
                        showInput: !0,
                        text: qi.set_animation_name
                }, function() {
                        o(".scenes .scene-1").trigger("click");
                        var e = o(".yellow-alert input").val(),
                                t = te(e);
                        (!1 == window.ypData.demo_mode || !0 !== window.bMode) && o.post(ajaxurl, {
                                action: "wyp_add_animation",
                                wyp_anim_data: t,
                                wyp_anim_name: e,
                                _wpnonce: window.wyp_editor_nonce
                        });
                        var a = o("#animation-name-group textarea");
                        a.val(a.val().replace(/^\[\{/, "[{\"value\":\"" + e + "\",\"label\":\"" + e +
                                        "\",\"category\":\"my animations\"},{")), o("#wyp-animation-name")
                                .catcomplete({
                                        source: JSON.parse(decodeURIComponent(a.val()))
                                }), Gi.find("#wyp-animate-data").append("<style id='" + e + "style'>" + t +
                                        "</style>"), Gi.find("#wyp-animate-data").append("<style id='webkit-" +
                                        e + "style'>" + t.replace("@keyframes", "@-webkit-keyframes") +
                                        "</style>"), ae(!1), setTimeout(function() {
                                        tt(null, "animation-name", e, ""), tt(null,
                                                        "animation-fill-mode", "both", ""), o(
                                                        "li.animation-option").removeAttr(
                                                "data-loaded"), o("#wyp-animation-name").val(e).trigger(
                                                        "blur"), ie("animation-name")
                                }, 500)
                }), !1)
        }), o("#search-css-selector").tooltip({
                container: "body",
                title: "Find elements by CSS selector"
        }), o("#search-css-selector").on("click", function() {
                fe(), o("#wyp-selector-editor").val("")
        }), o(document).on("click", ".scenes .scene .scene-delete", function() {
                var e = o(this).parent().attr("data-scene").replace("scene-", ""),
                        t = o(".scenes .scene").length - 1;
                o(".scenes .scene:not('.scene-add')").remove();
                for (var a = 1; a < t; a++) o(".scene-add").trigger("click");
                return 6 == t && (o(".scene-add").show(), ee()), Gi.find("#wyp-anim-scenes #scene-" + e + "").empty(), o(
                        ".scenes .scene-" + (e - 1) + "").trigger("click"), !1
        }), o(document).on("mouseover", ".scene-info", function() {
                var e = o(this).parent().parent().attr("data-scene"),
                        t = "";
                Gi.find("#wyp-anim-scenes #" + e + " style").each(function() {
                        t += "<span class='anim-info-rule'>" + o(this).attr("data-rule") + "</span>", t +=
                                "<span class='anim-info-value'>" + Vt(o(this).html()) + "</span>", t +=
                                "<span class='anim-info-border'></span>"
                }), o(this).tooltip("destroy"), o(this).popover("destroy"), "" == t ? o(this).tooltip({
                        title: qi.no_property_yet,
                        placement: "top",
                        trigger: "hover",
                        container: ".anim-bar",
                        html: !0
                }).tooltip("show") : o(this).popover({
                        title: qi.scene_properties + " " + o(".anim-bar ." + e + " input").val() + "%",
                        content: t,
                        trigger: "hover",
                        placement: "top",
                        container: ".anim-bar",
                        html: !0
                }).popover("show")
        }), o(document).on("click", ".scenes .scene", function() {
                if (o(this).hasClass("scene-add")) {
                        var e = o(".scenes .scene").length;
                        o(".scenes .scene-let-delete").removeClass("scene-let-delete"), o(".scene-add").before(
                                        "<div class=\"scene-let-delete scene scene-" + e + "\" data-scene=\"scene-" + e +
                                        "\"><span class=\"yicon icon-trash scene-delete\"></span><p><span class=\"scene-info yicon icon-warning\"></span>" +
                                        qi.scene + " " + e + "<span><input type=\"text\" value=\"100\" /></span></p></div>"), o(
                                        ".scenes .scene-" + e + "").trigger("click"), o(".scene-1 input").val("0"), o(".scene-2 input")
                                .val("100"), 3 == e && (o(".scene-1 input").val("0"), o(".scene-2 input").val("50"), o(".scene-3 input")
                                        .val("100")), 4 == e && (o(".scene-1 input").val("0"), o(".scene-2 input").val("33.3"), o(
                                        ".scene-3 input").val("66.6"), o(".scene-4 input").val("100")), 5 == e && (o(".scene-1 input")
                                        .val("0"), o(".scene-2 input").val("25"), o(".scene-3 input").val("50"), o(".scene-4 input")
                                        .val("75"), o(".scene-5 input").val("100")), 6 == e && (o(".scene-1 input").val("0"), o(
                                        ".scene-2 input").val("20"), o(".scene-3 input").val("40"), o(".scene-4 input").val(
                                        "60"), o(".scene-5 input").val("80"), o(".scene-6 input").val("100")), 6 == e && o(".scene-add")
                                .hide();
                        var t, a, i;
                        return Gi.find("#wyp-anim-scenes #scene-" + e + " style").each(function() {
                                return a = o(this), t = a.attr("data-rule"), i = Gi.find("#wyp-anim-scenes #scene-" +
                                                parseInt(e - 1) + " style[data-rule='" + t + "']"), 0 == i.length ||
                                        void a.text(i.text().replace(/body\.wyp-scene-(\d+)/g, "body.wyp-scene-" + e))
                        }), ee(), !1
                }
                o(".scene-active").removeClass("scene-active"), o(this).addClass("scene-active"), Qi.attr("data-anim-scene", o(this)
                        .attr("data-scene"));
                var n = o.trim(tn.attr("class").replace(/wyp-scene-[0-9]/g, ""));
                tn.attr("class", n), n = o.trim(Ji.attr("class").replace(/wyp-scene-[0-9]/g, "")), Ji.attr("class", n), Qi.addClass(
                        "wyp-" + o(this).attr("data-scene"));
                for (var s = parseInt(o(this).attr("data-scene").replace("scene-", "")); 1 < s; s--) Qi.addClass("wyp-scene-" + s);
                we(), Ze()
        }), o(".wyp-anim-cancel").click(function() {
                k({
                        title: qi.closeAnim,
                        showCancelButton: !0,
                        confirmButtonText: "Close"
                }, function() {
                        ae(!0)
                })
        }), o(".wyp-add-animation-link").click(function() {
                return window.animGeneratorOldAnim = o("#wyp-animation-name").val(), window.animGeneratorOldAnimDuration = o(
                                "#animation-duration-value").val(), window.animGeneratorOldAnimDelay = o("#animation-delay-value")
                .val(), window.animGeneratorOldAnimDurationF = o("#animation-duration-after").val(), window.animGeneratorOldAnimDelayF =
                        o("#animation-delay-after").val(), window.animGeneratorOldAnimFillMode = o("#wyp-animation-fill-mode").val(),
                        "none" == window.animGeneratorOldAnim && (window.animGeneratorOldAnim = "disable"), tt(null, "animation-name",
                                "disable", ""), ("0" == o("#animation-duration-value").val() || "0.00" == o("#animation-duration-value")
                                .val()) && (o("#animation-duration-value").val("1"), o("#animation-duration-value").trigger("blur")),
                        0 === Gi.find("#wyp-anim-scenes").length && Gi.find("#wyp-animate-data").after(
                                "<div id=\"wyp-anim-scenes\"><div id=\"scene-1\"></div><div id=\"scene-2\"></div><div id=\"scene-3\"></div><div id=\"scene-4\"></div><div id=\"scene-5\"></div><div id=\"scene-6\"></div></div><div id=\"animate-test-drive\"></div>"
                                ), window.ypData["wyp-css-ed-act"] && o(".wyp-css-close-btn").trigger("click"), Qi.addClass(
                                "wyp-ani-cre"), window.ypData.is_animate_creator = !0, Qi.addClass("wyp-scene-1"), Qi.attr(
                                "data-anim-scene", "scene-1"), o(".scene-active").removeClass("scene-active"), o(
                                ".scenes .scene:first-child").addClass("scene-active"), ee(), o(".animation-option.active > h3")
                        .trigger("click"), sa(), o.throttle(Be(), 32), !1
        }), o(".wyp-advanced-link").click(function() {
                return !o(this).hasClass("wyp-add-animation-link") && void(o(".wyp-on").not(this).removeClass("wyp-on"), o(
                        ".wyp-advanced-option").not(o(this).next(".wyp-advanced-option")).hide(0), o(this).next(
                        ".wyp-advanced-option").toggle(0), o(this).toggleClass("wyp-on"), o.throttle(Be(), 32))
        }), o(".wyp-responsive-btn").click(function() {
                j()
        }), o(".leftbar-button:not(.left-menu-btn):not(.undo-btn):not(.redo-btn):not(.cursor-main-btn):not(.css-editor-btn)").click(function() {
                !1 === S() ? (o(this).toggleClass("active"), o(this).tooltip("hide")) : !1 === o(this).hasClass("wyp-selector-mode") &&
                        (o(this).toggleClass("active"), o(this).tooltip("hide"))
        }), o(".left-menu-btn").click(function() {
                o(this).toggleClass("yhover"), o(".interface-settings").toggle()
        }), o(".undo-btn").click(function() {
                clearTimeout(window.historyDelay), tn.hasClass("wyp-history-delay") ? window.historyDelay = setTimeout(function() {
                        U()
                }, 220) : U()
        }), o(".redo-btn").click(function() {
                clearTimeout(window.historyDelay), tn.hasClass("wyp-history-delay") ? window.historyDelay = setTimeout(function() {
                        q()
                }, 220) : q()
        }), o(".wyp-bg-img-btn").click(function() {
                var e = o(this);
                e.hasAttr("data-json") && o.getJSON(e.attr("data-json"), function(t) {
                        var a = "";
                        o.each(t.patterns, function(e, t) {
                                a += "<div class=\"wyp-bg-ast\" data-url=\"" + t + "\"></div>"
                        }), o(".wyp-background-asts").append(a), e.removeAttr("data-json"), se()
                }).fail(function() {
                        Li("Loading Error", "Could Not Load Json library. (patterns.json)", "jsonError")
                }), e.toggleClass("active"), o(".wyp-background-asts").toggle(), e.hasClass("active") ? (o(
                        ".wyp-gradient-btn.active,.wyp-unsplash-btn.active").trigger("click"), o(
                        ".wyp-background-image-show").hide()) : ne(null);
                var t = o("#wyp-background-image").val(); - 1 == t.indexOf("yellow-pencil") ? o(".wyp-bg-ast").removeClass("active") :
                        o(".wyp-bg-ast[data-url='" + t.replace(/"/g, "").replace(/'/g, "").replace(/url\(/g, "").replace(/\)/g, "") +
                                "']").addClass("active"), !1 == e.hasAttr("data-json") && se(), o.throttle(Be(), 32)
        }), o(".wyp-bg-ast").on("mouseenter mouseover", function() {
                o(".wyp-bg-ast").removeClass("focus"), o(this).addClass("focus")
        }), o(".wyp-background-asts").on("scroll", o.throttle(function() {
                oe()
        }, 64)), o(".wyp-gradient-btn").on("click", function() {
                var e = o(this);
                if (e.hasAttr("data-json") && o.getJSON(e.attr("data-json"), function(t) {
                                var a = "";
                                o.each(t, function(e, t) {
                                        a += 8 > e ?
                                                "<div class=\"wyp-gradient-demo free-gradient\" data-gradient=\"" +
                                                t.gradient + "\"><span style=\"background-image:" + t.gradient +
                                                "\"></span> <div>" + t.name + "</div></div>" :
                                                "<div class=\"wyp-gradient-demo\" data-gradient=\"" + t
                                                .gradient + "\"><span style=\"background-image:" + t.gradient +
                                                "\"></span> <div>" + t.name + "</div></div>"
                                }), o(".wyp-gradient-list").append(a), e.removeAttr("data-json")
                        }).fail(function() {
                                Li("Loading Error", "Could Not Load Json library. (gradients.json)", "jsonError")
                        }), e.toggleClass("active"), o(".wyp-gradient-section").toggle(), e.hasClass("active")) {
                        o(".wyp-unsplash-btn.active,.wyp-bg-img-btn.active").trigger("click"), o(".wyp-background-image-show").hide();
                        var t = o("#wyp-background-image").val(); - 1 == t.indexOf("linear-gradient(") ? Ot(
                                "linear-gradient(141deg, #0fb8ad 0%, #2cb5e8 100%)") : Ot(t), setTimeout(function() {
                                0 < o(".wyp-gradient-demo.active").length ? o(".wyp-gradient-list").scrollTop(30 * (o(
                                                ".wyp-gradient-demo.active").index() - 3)) : o(".wyp-gradient-list")
                                        .scrollTop(0)
                        }, window.YellowDelay)
                } else ne(null);
                o.throttle(Be(), 32)
        }), o(".wyp-clear-btn").on("click", function() {
                o(this).parent().find("input").val("none").trigger("keyup").trigger("blur"), ne(null)
        }), o(document).on("change keyup", ".in-wr > input", function() {
                var e = o(this),
                        t = e.val(),
                        a = e.parent();
                "" == t || "none" == t ? a.addClass("empty-input") : a.removeClass("empty-input")
        });
        var hn = !1;
        o(".wyp-unsplash-btn").on("click", function() {
                var e = o(this);
                hn || (Wi(1), hn = !0), e.toggleClass("active"), o(".wyp-unsplash-section").toggle(), e.hasClass("active") ? (o(
                        ".wyp-gradient-btn.active,.wyp-bg-img-btn.active").trigger("click"), o(
                        ".wyp-background-image-show").hide(), setTimeout(function() { Fi(); }, 150)) : ne(null), o.throttle(Be(), 32)
        }), o(document).on("click", ".wyp-gradient-demo", function() {
                Ot(o(this).attr("data-gradient")), Dt("insert"), o(
                                ".wyp-unsplash-list > span.active,.wyp-gradient-demo.active,.wyp-bg-ast.active").removeClass("active"),
                        o(this).addClass("active"), o(".wyp-background-image-show").hide()
        }), o(".wyp-upload-btn").click(function() {
                o("#image_uploader iframe")[0].contentWindow.location.replace(o("#image_uploader iframe").attr("data-url")), o(
                        "#image_uploader iframe").attr("src", function(e, t) {
                        return t
                }), window.send_to_editor = function(e) {
                        var t = e.match(/src="(.*?)"/g);
                        if (null != t) {
                                var a = "";
                                if (t = t.toString().replace("src=\"", "").replace("\"", ""), "" != t) {
                                        var i = t.split("-").length - 1;
                                        null === t.split("-")[i].match(/(.*?)x(.*?)\./g) ? a = t : (a = t.replace("-" + t.split(
                                                "-")[i], ""), -1 != t.split("-")[i].indexOf(".") && (a = a +
                                                "." + t.split("-")[i].split(".")[1]))
                                }
                                0 < o(".background-option.active").length ? o("#wyp-background-image").val(a).trigger("keyup") :
                                        o("#wyp-list-style-image").val(a).trigger("keyup")
                        } else k({
                                title: "Please upload only image type files.",
                                text: "You can only upload images."
                        });
                        window.send_to_editor = window.restore_send_to_editor, o("#image_uploader").toggle(), o(
                                "#image_uploader_background").toggle(), o(".wyp-upload-btn").toggleClass("active")
                }, o("#image_uploader").toggle(), o("#image_uploader_background").toggle(), o(".wyp-upload-btn").toggleClass(
                        "active")
        }), o("#image_uploader_background").click(function() {
                o("#image_uploader").toggle(), o("#image_uploader_background").toggle(), o(".wyp-upload-btn").toggleClass("active"), o(
                        "#image_uploader iframe").attr("src", function(e, t) {
                        return t
                })
        }), window.restore_send_to_editor = window.send_to_editor, window.send_to_editor = function(e) {
                var t = o("img", e).attr("src");
                0 < o(".background-option.active").length ? o("#wyp-background-image").val(t) : o("#wyp-list-style-image").val(t), window
                        .send_to_editor = window.restore_send_to_editor, o("#image_uploader").toggle(), o("#image_uploader_background")
                .toggle(), o(".wyp-upload-btn").toggleClass("active"), o("#image_uploader iframe").attr("src", function(e, t) {
                                return t
                        })
        }, !1 == window.ypData.demo_mode && (window.onbeforeunload = function() {
                if (!0 !== window.wyp_redirect_on && o(".wyp-save-btn").hasClass("waiting-for-save")) return confirm(qi.sure)
        }), o(".wyp-save-btn").on("click", function() {
                if (o(this).hasClass("wyp-disabled")) return !1;
                if (window.bMode) {
                        if (/wp-content/.test(Gi.find("head").html()) && !1 === e()?.is_subscription_active) return o(
                                ".wyp-info-modal .wyp-info-modal-top-inner h2").text(
                                "Consider Upgrading to the Professional Plan"), o(
                                ".wyp-info-modal .wyp-info-modal-top-inner p").text(
                                "A pro plan is required to editing WordPress-based sites. Save your time with a pro plan."
                                ), o(".wyp-info-modal .wyp-buy-link").attr("href",
                                "https://visualcsseditor.com/?utm_source=chrome-editor&utm_medium=wordpress-based-upgrade&utm_campaign=chrome-upgrade"
                                ), o(".wyp-info-modal .wyp-buy-link").text("See Pricing"), o(
                                ".wyp-info-modal .wyp-info-modal-close").text("Maybe Later"), o(
                                ".wyp-info-modal .wyp-info-unlock-p").attr("style", "visibility:hidden;"), o(
                                ".wyp-info-modal .wyp-info-last-note").text(
                                "Get unlimited usage and premium customer support today."), o(
                                ".wyp-info-modal .activate-pro").attr("href", "https://visualcsseditor.com/sign-in"), o(
                                ".wyp-info-modal,.wyp-popup-background").fadeIn("fast"), !1;
                        window.ypData["wyp-need-to-process"] && Zi(), o(".wyp-save-btn").removeClass("waiting-for-save");
                        var t = Et(),
                                a = t.match(/font-family(\s)?:([^;]+);/gi),
                                n = "",
                                s = [],
                                r;
                        if (a) {
                                for (var l = 0; l < a.length; l++) - 1 !== a[l].indexOf(",") && !1 !== /(\"|\')/g.test(a[l]) && (r = a[
                                                l].replace(/(^font-family(\s)?:|;$|!important|"|')/g, "").split(",")[0].trim(),
                                        -1 === s.indexOf(r)) && (mt(r) || (s.push(r), n +=
                                        "@import url(\"//fonts.googleapis.com/css2?family=" + r.replace(/\s+/g, "+") +
                                        ":ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap\");",
                                        n += "\n"));
                                0 < n.length && (n = "/* Import Google Fonts */\n" + n + "\n")
                        }
                        k({
                                customClass: "yellow-alert-bmode",
                                text: "<div class='export-title'>Export CSS Code <div class='cly' onclick='document.querySelector(\".button-container .cancel\").click();'></div></div><div id='b-mode-css'>" +
                                        (n + t.replace(/\t/g, " ")) + "</div>",
                                showCancelButton: !0
                        }), o(".yellow-alert-bmode.yellow-overlay").on("mousedown", function(t) {
                                o(t.target).hasClass("yellow-alert-bmode") && o(".yellow-alert-bmode").remove()
                        });
                        var d = ace.edit("b-mode-css");
                        return d.setTheme("ace/theme/twilight"), d.getSession().setMode("ace/mode/css"), d.getSession().setUseWorker(!
                                1), d.setOptions({
                                        fontSize: "14px",
                                        enableBasicAutocompletion: !1,
                                        enableSnippets: !1,
                                        enableLiveAutocompletion: !1
                                }), d.focus(), !1
                }
                var p = window.location.href.split("&wyp_page_id=");
                p = p[1].split("&"), p = p[0];
                var c = window.location.href.split("&wyp_page_type=");
                if (c = c[1].split("&"), c = c[0], !window.ypData.demo_mode) {
                        var u = Gi.find(".wyp-inline-data").text(),
                                m = Gi.find("#wyp-live-css-data");
                        0 < m.length && (u += m.text());
                        var f = !0;
                        if (tn.hasClass("wtfv")) {
                                var g = (u.match(
                                                /(\s|\{)(font-family|color|background-image|background-color|width|height|animation-name)\:/g) ||
                                        []).length - window.old_premium_rules;
                                0 >= g ? o(".wyp-save-btn").text(qi.saving).addClass("wyp-disabled") : (f = !1, o(".wt-save-btn").text(
                                        qi.save).removeClass("waiting-for-save").removeClass("wt-disabled"), o(
                                        ".wyp-info-modal .wyp-info-modal-top-inner h2").text(
                                        "Changes Are Not Saved. Upgrade To Pro!"), o(
                                        ".wyp-info-modal .wyp-info-modal-top-inner p").text(
                                        "You are using some premium features. Upgrade to Pro or disable premium features to save changes."
                                        ), o(".wyp-info-modal,.wyp-popup-background").fadeIn("fast"))
                        } else o(".wyp-save-btn").text(qi.saving).addClass("wyp-disabled");
                        if (!window.ypData["wyp-need-to-process"]) f && re(p, c);
                        else if (f) return Zi(), setTimeout(function() {
                                re(p, c)
                        }, 100), !1
                } else k({
                        title: qi.save_alert,
                        text: qi.live_preview_text
                }), o(".wyp-save-btn").text(qi.saved).addClass("wyp-disabled").removeClass("waiting-for-save")
        }), o("#wyp-crnt-el").on("click", function() {
                if (C()) {
                        tn.addClass("wyp-crnt-el-menu");
                        var e = this.getBoundingClientRect(),
                                t = e.left + 1 + Ji.scrollLeft() + Ki.scrollLeft(),
                                a = e.top + 35 + Ji.scrollTop() + Ki.scrollTop();
                        _().contextMenu({
                                x: t,
                                y: a
                        })
                }
        }), o(document).on("mousewheel DOMMouseScroll", "#context-menu-layer", o.throttle(function() {
                window.ypData.editor_context_menu_open && _().contextMenu("hide")
        }, 64)), o(document).on("mouseover", "#context-menu-layer", function() {
                sn.extra.find(".wyp-el-viewer").remove()
        });
        var yn = null,
                wn = null;
        Gi.on("scroll", o.throttle(function() {
                null !== yn && clearTimeout(yn), null !== wn && clearTimeout(wn), C() && (!0 === le(_(), "position", "fixed",
                        "==") && (Ji.hasClass("wyp-h-trfm") ? yn = setTimeout(function() {
                        Ji.removeClass("wyp-h-trfm")
                }, 200) : Ji.addClass("wyp-h-trfm")), wn = setTimeout(function() {
                        Ze()
                }, 200))
        }, 64)), o(document).on("click", ".wyp-background-asts div", function() {
                var e = o(this);
                o(".wyp-unsplash-list > span.active,.wyp-gradient-demo.active,.wyp-bg-ast.active").removeClass("active"), e.parent()
                        .parent().find(".wyp-input").val(pluginurl + "assets/" + e.data("url")).trigger("keyup"), e.addClass("active"),
                        o(".wyp-background-image-show").hide();
                var t = _(),
                        a = t.css(["background-repeat", "background-size"]);
                "no-repeat" == a["background-repeat"] && (tt(null, "background-repeat", "repeat"), pa("background-repeat")), "auto" !=
                        a["background-size"] && (tt(null, "background-size", "auto"), pa("background-size"))
        }), o(document).on("click", ".iris-color-preview", function() {
                var e = o(this),
                        t = e.parents(".iris-picker"),
                        a = e.parents(".op-g").find("input.co-p");
                0 == a.length && (a = o("#iris-gradient-color")), e.addClass("active");
                var i = a.val();
                i = i.replace(/\s/g, ""), -1 != i.indexOf("#") && (i = Ri(i), i = i.replace(/rgb\(/g, "rgba("), i = i.replace(/\)$/g,
                                ",0)")), -1 == i.indexOf("rgba(") ? -1 != i.indexOf("rgb(") && (i = i.replace(/rgb\(/g, "rgba("), i = i
                                .replace(/\)$/g, ",0)")) : i = i.replace(/,[\d.]+\)$/, ",0)"), a.val("transparent").trigger("change"), a
                        .iris("color", i), t.find(".information-item.hex input").val("transparent")
        }), o(document).on("keyup", ".iris-picker .information-item.rgb input", function() {
                var e = o(this).parents(".op-g").find(".co-p");
                0 == e.length && (e = o("#iris-gradient-color"));
                var t = o(this).parents(".information-item"),
                        i = t.find(".rgb-r input").val(),
                        n = t.find(".rgb-g input").val(),
                        s = t.find(".rgb-b input").val(),
                        r = t.find(".rgb-a input").val(),
                        a = "rgba(" + i + "," + n + "," + s + "," + r + ")";
                return 1 == r && (a = "rgb(" + i + "," + n + "," + s + ")"), "" != o(this).val() && void(e.val(a).trigger("change"), e
                        .iris("color", a))
        }), window.inputFocusVal = "", o(document).on("focus", ".iris-picker .information-item input", function() {
                window.inputFocusVal = o(this).val()
        }), o(document).on("change", ".iris-picker .information-item.rgb input", function() {
                "" == o(this).val() && (window.BlockIrisTypeChange = !0, o(this).val(window.inputFocusVal).trigger("keyup"), window
                        .BlockIrisTypeChange = !1)
        }), o(document).on("change keyup", ".iris-picker .information-item.hex input", function(e) {
                var t = o(this),
                        a = t.parents(".op-g").find(".co-p");
                0 == a.length && (a = o("#iris-gradient-color"));
                var i = t.val();
                return "" == i ? ("change" == e.type && t.val(window.inputFocusVal).trigger("keyup"), !1) : void(a.val(i).trigger(
                        "change"), a.iris("color", i))
        }), o(document).on("click", ".iris-color", function() {
                var e = o(this),
                        t = e.attr("data-color"),
                        a = e.parents(".op-g").find(".co-p");
                0 == a.length && (a = o("#iris-gradient-color")), a.val(t).trigger("change"), a.iris("color", t)
        }), o(document).on("click", "#autocomplete-selector-list li", function() {
                var e = o(this).text().split(" |")[0];
                o("#wyp-selector-editor").val(e).trigger("keyup").trigger("focus")
        }), window.selectorActive = -1, o("#wyp-selector-editor").keyup(function(t) {
                var e = o(this).val(),
                        a = e.substr(e.length - 1);
                if (32 == t.keyCode && !1 == /(\#|\.)/g.test(e) && !1 == Ca(e, !0, !1, !1)) {
                        var i = o("#autocomplete-selector-list li.active");
                        if (0 < i.length && e != i.text()) return o(this).val(i.text() + " ").trigger("keyup"), !1
                }
                if (40 != t.keyCode && 38 != t.keyCode && me(), o("#wyp-selector-editor").removeClass("selector-is-invalid"), o(
                                "#autocomplete-selector-list li").removeClass("active"), 0 < o("#autocomplete-selector-list li")
                        .length && !0 == /[a-z-A-Z0-9_-]/g.test(a)) {
                        var n = 1e4;
                        o("#autocomplete-selector-list li").each(function() {
                                o(this).text().length < n && (n = o(this).text().length, o(
                                                "#autocomplete-selector-list li").removeClass("active"), o(this)
                                        .addClass("active"))
                        })
                }
                if (13 == t.keyCode) return 0 < o("#autocomplete-selector-list li.active").length && o(this).val() != o(
                        "#autocomplete-selector-list li.active").text() ? (o(this).val(o(
                                "#autocomplete-selector-list li.active").text()), o("#autocomplete-selector-list li")
                        .remove(), !1) : (ge("#wyp-selector-editor"), !1);
                var s = o("#autocomplete-selector-list li.active");
                0 < s.length && -1 == window.selectorActive && (window.selectorActive = o("#autocomplete-selector-list li.active")
                                .prevAll().length), 40 == t.keyCode && o("#autocomplete-selector-list li").length >= window
                        .selectorActive + 2 ? window.selectorActive++ : 38 == t.keyCode && 0 <= window.selectorActive - 1 ? window
                        .selectorActive-- : 38 == t.keyCode && 0 > window.selectorActive && (window.selectorActive = o(
                                "#autocomplete-selector-list li").length - 1), (40 == t.keyCode || 38 == t.keyCode) && (o(
                                "#autocomplete-selector-list li").removeClass("active"), o("#autocomplete-selector-list li").eq(
                                window.selectorActive).addClass("active"), 0 < o("#autocomplete-selector-list li").eq(window
                                .selectorActive).length && o(this).val(o("#autocomplete-selector-list li").eq(window
                                .selectorActive).text()))
        }), o("#wyp-selector-editor").on("keyup keydown", function(t) {
                if (40 == t.keyCode || 38 == t.keyCode) return !1
        }), o("#selector-editor-background").click(function() {
                o("#wyp-selector-editor").val(""), ge("#wyp-selector-editor")
        }), o(document).on("mouseout", ".info-element-class-list li", function() {
                clearTimeout(window.focusElementTimer), sn.extra.find(".wyp-el-viewer").remove()
        }), o(document).on("click", ".info-element-class-list li", function() {
                var e = o(this).text();
                window.focusElementTimer = setTimeout(function() {
                        ce(Gi.find(e)), st(Gi.find(e))
                }, 80)
        }), o(document).on("click", ".breakpoint-bar .breakpoint-item", function() {
                Ja(o(this))
        }), o(document).on("mouseout", ".breakpoint-bar .breakpoint-item", function() {
                o(this).tooltip("destroy")
        }), o("#wyp-animation-play").on("keyup keydown keypress", function(t) {
                if (t.originalEvent) return !1
        }), o.widget("custom.catcomplete", o.ui.autocomplete, {
                _create: function() {
                        this._super(), this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)")
                },
                _renderMenu: function(e, t) {
                        var a = this,
                                i = "";
                        o.each(t, function(t, n) {
                                null == n.category && (n.category = "google fonts");
                                var s;
                                n.category != i && (e.append("<li class='ui-autocomplete-category'>" + n
                                        .category + "</li>"), i = n.category), s = a._renderItemData(e,
                                        n), n.category && s.attr("aria-label", n.category + " : " + n
                                        .label)
                        })
                }
        }), o(".wyp-responsive-btn").click(function() {
                var e, t;
                if (o(this).hasClass("active")) Qi.removeClass("wyp-res-mod"), window.ypData.is_responsive_mod = !1, o(this).addClass(
                        "active"), e = o("#iframe").attr("style"), o("#iframe").removeAttr("style"), o("#iframe").attr(
                        "data-style", e), o.throttle(Be(), 32);
                else if (Qi.addClass("wyp-res-mod"), window.ypData.is_responsive_mod = !0, o(this).removeClass("active"), he(!1), window
                        .resizedByPropertySize && (window.responsiveFirstWasOpen = !0), !1 == window.responsiveFirstWasOpen) {
                        t = o(".breakpoint-bar > .max-width");
                        var a;
                        0 < t.length ? (a = !1, t.each(function() {
                                        var e = o(this);
                                        600 < parseInt(e.attr("data-breakpoint")) && 1100 > parseInt(e.attr(
                                                "data-breakpoint")) && (a = !0, Ja(e))
                                }), !a && Ja(t.last())) : (o(".media-control").trigger("click"), t = o(".breakpoint-bar > .min-width"),
                                        a = !1, t.each(function() {
                                                var e = o(this);
                                                600 < parseInt(e.attr("data-breakpoint")) && 1100 > parseInt(e.attr(
                                                        "data-breakpoint")) && (a = !0, Ja(e))
                                        }), !a && Ja(t.first())), o(".media-control").tooltip("hide"), window.responsiveFirstWasOpen = !
                                0
                } else e = o("#iframe").attr("data-style"), o("#iframe").removeAttr("data-style"), o("#iframe").attr("style", e);
                N(), Ze(), ce(), setTimeout(function() {
                        window.responsiveFirstWasOpen && X(), we()
                }, window.YellowDelay)
        }), Gi.contextmenu(function(t) {
                if (!1 == o(t.target).is("input,textarea,select,img")) return !1
        }), window.disable_auto_insert = !1, o(".css-editor-btn,.wyp-css-close-btn").click(function() {
                if (T() && o(".animation-manager-btn.active").trigger("click"), o(".css-editor-btn").toggleClass("active"), "none" == o(
                                "#left-area-editor").css("display")) {
                        o("#css-data,#css-editor-bar,#left-area-editor").show(), tn.addClass("wyp-css-ed-act"), window.ypData[
                                "wyp-css-ed-act"] = !0, N();
                        var e = o(".css-editor-btn"),
                                t = e.attr("data-original-title");
                        e.attr("data-title", t), e.attr("data-original-title", ""), _e(!0), tn.hasClass("wyp-fix-leftbar") ? o(
                                ".wyp-navigation-btn.active").trigger("click") : window.ypData["wyp-css-ed-drgable"] && o(
                                ".wyp-navigation-btn.active").trigger("click"), window.ypData["wyp-css-ed-drgable"] && o(
                                ".info-btn.active").trigger("click")
                } else {
                        if (tn.hasClass("css-code-unvalid")) return k({
                                title: qi.css_parse_error,
                                text: qi.css_parse_error_text
                        }), !1;
                        o("#css-data,#css-editor-bar,#left-area-editor").hide(), tn.removeClass("wyp-css-ed-act"), window.ypData[
                                "wyp-css-ed-act"] = !1, N(), o(".css-editor-btn").attr("data-original-title", o(
                                ".css-editor-btn").attr("data-title")), $(), Ze(), sn.extra.find(".wyp-el-viewer").remove()
                }
                Ze()
        }), o(".css-va,.css-un,.wyp-bgs-css-val,.wyp-bgs-prefix").on("keydown keyup", function(t) {
                if (!1 == t.originalEvent && !1 == window.allow_input_CSS_process) return !1;
                var e = t.keyCode || t.which;
                if (27 == e || 13 == e) return o(this).trigger("blur"), !1;
                if (9 != e && 17 != e && 18 != e && 39 != e && 37 != e) {
                        var a = o(this),
                                i;
                        clearTimeout(window.manualChangeInputDelay), window.manualChangeInputDelay = setTimeout(function() {
                                if (a.hasClass("wyp-bgs-css-val") || a.hasClass("wyp-bgs-prefix")) {
                                        i = a.parents(".op-g").attr("data-css");
                                        var e = o("#background-size-x-value").val(),
                                                t = o("#background-size-x-custom").val(),
                                                n = o("#background-size-y-value").val(),
                                                s = o("#background-size-y-custom").val();
                                        if (!1 == /\d+/g.test(e) && "" != e.replace(/\s+/g) ? !1 == o(document
                                                        .activeElement).hasClass("wyp-bgs-prefix") && o(
                                                        "#background-size-x-custom").val("-") : "-" == t && (o(
                                                        "#background-size-x-custom").val("%"), t = "%"), !1 == /\d+/g
                                                .test(n) && "" != n.replace(/\s+/g) ? !1 == o(document.activeElement)
                                                .hasClass("wyp-bgs-prefix") && o("#background-size-y-custom").val("-") :
                                                "-" == s && (o("#background-size-y-custom").val("%"), s = "%"), "-" ==
                                                t && (t = "", e = "auto"), "-" == s && (s = "", n = "auto"), isNaN(e) &&
                                                "auto" != e) return !1;
                                        if (isNaN(n) && "auto" != n) return !1;
                                        if (-1 == window.validUnits.indexOf(t)) return !1;
                                        if (-1 == window.validUnits.indexOf(s)) return !1;
                                        "auto" == e && (t = ""), "auto" == n && (s = ""), "auto" == n && /\d+/g.test(
                                                e) && (n = e, s = t);
                                        var r = o.trim(e + t + " " + n + s);
                                        if ("auto auto" == r && (r = "auto"), "" == a.val()) return !1;
                                        window.lastEditID = i, tt(null, i, r, ""), Mi()
                                } else {
                                        i = a.parents(".op-g").attr("data-css");
                                        var l = a.parent().find(".css-va").val(),
                                                d = a.parent().find(".css-un").val();
                                        if ("" == d || "" == l) return !1;
                                        xe(a, !1), lt(o("#wyp-" + i), i, !0, !1), Mi()
                                }
                        }, 20)
                }
        }), o(".wyp-panel-hide,.wyp-panel-show").click(function() {
                pe()
        }), o(document).on("click", "#ed-elt-tr ul li", function() {
                var e = o(this),
                        t, a;
                o("#ed-elt-tr ul li").removeClass("active"), a = e.attr("data-parent-selector"), t = Gi.find(".wyp-pa-r" + e.attr(
                                "data-index")), !1 == e.hasClass("wyp-parent-has-selector") && (a = Ma(t, "defaultNoCache"), e.attr(
                                "data-parent-selector", a), e.addClass("wyp-parent-has-selector")), window.targetIsParentTree = !0, L(
                        a), Q(a, t, !0), window.targetIsParentTree = !1, e.addClass("active"), sn.extra.find(".wyp-el-viewer").addClass(
                                "wyp-el-viewer-relax-opacity").removeClass("wyp-el-viewer").fadeOut(300), window.relaxView = setTimeout(
                                function() {
                                        sn.extra.find(".wyp-el-viewer-relax-opacity").remove()
                                }, 320), ce()
        }), o(document).on("mouseenter mouseover", "#ed-elt-tr ul li", function() {
                var e = o(this),
                        t = e.attr("data-parent-selector"),
                        a = Gi.find(".wyp-pa-r" + e.attr("data-index"));
                !1 == e.hasClass("wyp-parent-has-selector") && (t = Ma(a, "defaultNoCache"), e.attr("data-parent-selector", t), e
                        .addClass("wyp-parent-has-selector")), st(Gi.find(t))
        }), o(document).on("mouseleave mouseout", "#ed-elt-tr ul li", function() {
                sn.extra.find(".wyp-el-viewer").remove()
        }), o(document).on("mouseenter", ".context-menu-list.wyp-contextmenu-parent li", function() {
                var e = o(this).prevAll("li").length,
                        t = _().parentsUntil("html").eq(e),
                        a = Ma(t, "defaultNoCache");
                st(Gi.find(a))
        }), o(document).on("mouseenter", ".context-menu-list.wyp-contextmenu-children li", function() {
                var e = o(this).prevAll("li").length,
                        t = _().children().eq(e),
                        a = Ma(t, "defaultNoCache");
                st(Gi.find(a))
        }), o(document).on("mouseleave", ".context-menu-list.wyp-contextmenu-parent li,.context-menu-list.wyp-contextmenu-children li",
                function() {
                        sn.extra.find(".wyp-el-viewer").remove()
                }), o(document).on("click", ".show-more-parent-link", function() {
                var e = o(".context-menu-list.wyp-contextmenu-parent");
                e.removeClass("wyp-limit-parent-view")
        }), o(document).on("click", ".show-more-children-link", function() {
                var e = o(".context-menu-list.wyp-contextmenu-children");
                e.removeClass("wyp-limit-children-view")
        }), o(".ed-pnl").resizable({
                handles: "w, e",
                minWidth: 276,
                maxWidth: 400,
                start: function() {
                        o(".fake-layer-x").css("cursor", "e-resize"), He(0)
                },
                resize: function(e, t) {
                        o("#rightpanel-personalized-view").remove(), tn.append(
                                "<style id='rightpanel-personalized-view'>.ed-pnl{width:" + t.size.width +
                                "px !important;}</style>"), N()
                },
                stop: function(e, t) {
                        o(".fake-layer-x").remove(), R("rightPanelWidth", t.size.width), We(0)
                }
        }), o("#vsl-css-vi").resizable({
                handles: "w",
                minWidth: 276,
                maxWidth: o(window).width(),
                start: function() {
                        o(".fake-layer-x").css("cursor", "e-resize"), He(0)
                },
                resize: function(e, t) {
                        o("#visual-manager-personalized-view").remove(), t.size.width > parseInt(o(window).width() - 10) && (t
                                .size.width = o(window).width()), tn.append(
                                "<style id='visual-manager-personalized-view'>#vsl-css-vi{width:" + t.size.width +
                                "px !important;}</style>"), N()
                },
                stop: function(e, t) {
                        o(".fake-layer-x").remove(), R("visualManagerWidth", t.size.width), We(0)
                }
        }), o(".advanced-info-box").resizable({
                handles: "e",
                minWidth: 280,
                maxWidth: 500,
                start: function() {
                        o(".fake-layer-x").css("cursor", "e-resize")
                },
                resize: function(e, t) {
                        o("#advancedinfobox-personalized-view").remove(), tn.append(
                                "<style id='advancedinfobox-personalized-view'>.advanced-info-box {width:" + t.size
                                .width + "px !important;}</style>")
                },
                stop: function(e, t) {
                        o(".fake-layer-x").remove(), R("advancedInfoBoxWidth", t.size.width)
                }
        }), o(".wyp-animate-manager").resizable({
                handles: "n",
                minHeight: 234,
                maxHeight: 70 * o(window).height() / 100,
                start: function() {
                        He(0), o(".fake-layer-x").css("cursor", "n-resize")
                },
                resize: function(e, t) {
                        o("#animmanager-personalized-view").remove(), tn.append(
                                "<style id='animmanager-personalized-view'>body.wyp-animate-manager-active #iframe{height:-webkit-calc(100% - " +
                                parseInt(t.size.height) + "px) !important;height:calc(100% - " + parseInt(t.size
                                .height) +
                                "px) !important;}body.wyp-animate-manager-active.wyp-res-mod #iframe, body.wyp-animate-manager-active.wyp-res-mod .responsive-right-handle,body.wyp-animate-manager-active.wyp-res-mod .responsive-left-handle{height:-webkit-calc(100% - " +
                                parseInt(t.size.height + 24) + "px) !important;height:calc(100% - " + parseInt(t.size
                                        .height + 24) + "px) !important;}.wyp-animate-manager{height:" + t.size.height +
                                "px !important;}</style>")
                },
                stop: function(e, t) {
                        o(".fake-layer-x").remove(), R("animManagerHeight", t.size.height)
                }
        }), o("#layer-tree").resizable({
                handles: "e",
                minWidth: 230,
                maxWidth: 400,
                start: function() {
                        o(".fake-layer-x").css("cursor", "e-resize"), He(0)
                },
                resize: function(e, t) {
                        o("#navigation-personalized-view").remove(), tn.append(
                                "<style id='navigation-personalized-view'>#layer-tree{width:" + parseFloat(t.size
                                .width) + "px !important;}</style>"), N()
                },
                stop: function(e, t) {
                        o(".fake-layer-x").remove(), R("navigationWidth", t.size.width), We(0)
                }
        }), o("#left-area-editor").resizable({
                handles: "e, s",
                maxWidth: o(window).width(),
                minWidth: 370,
                delay: 150,
                start: function(e, t) {
                        var a = o(this).data("ui-resizable").axis;
                        "e" == a && (o("#css-data").width(t.size.width - 41), o("#css-editor-bar").width(t.size.width)), He(0),
                                "e" == a ? o(".fake-layer-x").css("cursor", "e-resize") : o(".fake-layer-x").css("cursor",
                                        "s-resize")
                },
                resize: function(e, t) {
                        var a = o(this).data("ui-resizable").axis;
                        "e" == a && (t.size.width > parseInt(o(window).width() - 10) && (t.size.width = o(window).width()), o(
                                        "#css-data").width(t.size.width - 41), o("#css-editor-bar").width(t.size.width)), 200 > t
                                .size.height && (t.size.height = 200), "s" == a && o("#css-data").height(t.size.height - 76), o(
                                        "#csseditor-personalized-view").remove(), window.ypData["wyp-css-ed-drgable"] ? Y(t.size
                                        .width, t.size.height - 36) : Y(t.size.width, null), n.resize(), j(), N()
                },
                stop: function(e, t) {
                        var a = o(this).data("ui-resizable").axis;
                        o(".fake-layer-x").remove(), o("#css-data").width(t.size.width - 41), o("#css-editor-bar").width(t.size
                                .width), "s" == a && o("#css-data").height(t.size.height - 76), R("cssEditorWidth", t
                                .size.width), window.ypData["wyp-css-ed-drgable"] && R("cssEditorHeight", t.size.height)
                }
        }), o.contextMenu({
                events: {
                        show: function() {
                                var e = o(this);
                                tn.addClass("wyp-contextmenu-breakpoint"), e.nextAll(".breakpoint-item").addClass(
                                        "hover-breakpoint"), setTimeout(function() {
                                        !1 == e.hasClass("edited") && !1 == e.hasClass(
                                                "defined-with-yellowpencil") ? (o(
                                                        ".reset-breakpoint-menu").addClass("disabled"),
                                                o(".review-breakpoint-menu").addClass("disabled"), o(
                                                        ".show-css-menu").addClass("disabled")) : (o(
                                                        ".review-breakpoint-menu").removeClass(
                                                        "disabled"), o(".reset-breakpoint-menu")
                                                .removeClass("disabled"), o(".show-css-menu")
                                                .removeClass("disabled"))
                                }, window.YellowDelay)
                        },
                        hide: function() {
                                tn.removeClass("wyp-contextmenu-breakpoint"), o(".breakpoint-item").removeClass(
                                        "hover-breakpoint")
                        }
                },
                selector: ".breakpoint-bar .breakpoint-item",
                className: "dom_contextmenu breakpoint-contextmenu",
                trigger: "right",
                callback: function(e) {
                        var t;
                        if ("active" === e && Ja(o(this)), "reset" == e && (t = o(this).attr("data-breakpoint-data"), k({
                                        title: qi.delete_media_query.replace("{$1}",
                                                "<strong class='bold-light'>" + t + "</strong>"),
                                        text: qi.delete_media_query_msg,
                                        showCancelButton: !0,
                                        confirmButtonColor: "#F94141",
                                        confirmButtonText: qi.reset + "!"
                                }, function() {
                                        r(u(a(null, !1), "[msize=" + t + "]")), Mi(), we(), Ze()
                                })), "reviewBreakpoint" == e && (t = o(this).attr("data-breakpoint-data"), Rt(), o(
                                        "#visual-rule-filter").val(t).trigger("keyup")), "showCSS" == e) {
                                window.disable_auto_insert = !0, !1 == window.ypData["wyp-css-ed-act"] && o(".css-editor-btn")
                                        .trigger("click");
                                var i = Et(!0, null, !0).replace(/ |\t/g, "");
                                window.disable_auto_insert = !1;
                                var s = o(this).attr("data-media-content"); - 1 == i.indexOf(s) && (s = o(this).attr(
                                        "data-breakpoint-data").replace(/ |\t/g, ""));
                                var l = i.split(s)[0].split(/\r\n|\r|\n/).length,
                                        d = i.replace(/\}\s+\}/g, "}}");
                                if (K(d.split(s)[1])) {
                                        setTimeout(function() {
                                                n.scrollToLine(l, !0, !1)
                                        }, 4);
                                        var p = d.split(s)[1].split(/\}\}/g)[0].split(/\r\n|\r|\n/).length,
                                                c = ace.require("ace/range").Range;
                                        n.selection.setRange(new c(l - 1, 0, l + p + 1, 1))
                                }
                        }
                },
                items: {
                        active: {
                                name: qi.active_breakpoint,
                                className: "active-breakpoint-menu"
                        },
                        reviewBreakpoint: {
                                name: qi.review_breakpoint,
                                className: "review-breakpoint-menu"
                        },
                        showCSS: {
                                name: qi.show_in_editor,
                                className: "show-css-menu"
                        },
                        reset: {
                                name: qi.reset,
                                className: "reset-breakpoint-menu"
                        }
                }
        }), o.contextMenu({
                events: {
                        hide: function() {
                                tn.removeClass("wyp-crnt-el-menu"), o(".context-menu-root").removeClass("no-top-radius"), o(
                                                ".wyp-limit-parent-view").removeClass("wyp-limit-parent-view"), o(
                                                ".wyp-limit-children-view").removeClass("wyp-limit-children-view"), Ze(), window
                                        .ypData.editor_context_menu_open = !1
                        },
                        show: function() {
                                window.ypData.editor_context_menu_open = !0, o(
                                        ".wyp-contextmenu-hover,.wyp-contextmenu-focus,.wyp-contextmenu-active,.wyp-contextmenu-checked,.wyp-contextmenu-disabled,.wyp-contextmenu-enabled,.wyp-contextmenu-invalid,.wyp-contextmenu-link,.wyp-contextmenu-valid,.wyp-contextmenu-visited"
                                        ).hide();
                                var e = _(),
                                        t = e.prop("tagName").toUpperCase();
                                if (o(".wyp-contextmenu-hover,.wyp-contextmenu-active").show(), "INPUT" == t) {
                                        var a = e.attr("type");
                                        o(".wyp-contextmenu-disabled,.wyp-contextmenu-enabled,.wyp-contextmenu-focus").show(), (
                                                        null == a || "text" == a || "password" == a || "date" == a ||
                                                        "datetime-local" == a || "email" == a || "month" == a || "number" ==
                                                        a || "range" == a || "search" == a || "tel" == a || "time" == a ||
                                                        "week" == a || "url" == a) && o(
                                                        ".wyp-contextmenu-invalid,.wyp-contextmenu-valid").show(), "checkbox" ==
                                                a && o(".wyp-contextmenu-checked").show()
                                }
                                "A" == t && o(".wyp-contextmenu-link,.wyp-contextmenu-visited").show(), S() && e.contextMenu(
                                        "hide");
                                var i = _a(),
                                        n = Gi.find(i).parent();
                                0 < n.length && "html" != n.prop("tagName").toLowerCase() ? o(".wyp-contextmenu-parent")
                                        .removeClass("wyp-disable-contextmenu") : o(".wyp-contextmenu-parent").addClass(
                                                "wyp-disable-contextmenu");
                                var s = e.children().not("br");
                                0 < s.length ? o(".wyp-contextmenu-children").removeClass("wyp-disable-contextmenu") : o(
                                                ".wyp-contextmenu-children").addClass("wyp-disable-contextmenu"), o(
                                                ".wyp-active-contextmenu").removeClass("wyp-active-contextmenu"), tn.hasAttr(
                                                "data-wyp-selector") && o(".wyp-contextmenu-" + tn.attr("data-wyp-selector")
                                                .replace(":", "")).addClass("wyp-active-contextmenu"), /body\.non-logged-in/i
                                        .test(i) && o(".wyp-contextmenu-non-logged-in").addClass("wyp-active-contextmenu"),
                                        /body\.logged-in/i.test(i) && o(".wyp-contextmenu-logged-in").addClass(
                                                "wyp-active-contextmenu"), 0 < Gi.find(".wyp-selected-others").length ? o(
                                                ".wyp-contextmenu-select-it").show() : o(".wyp-contextmenu-select-it").hide();
                                var r = o(".context-menu-list.wyp-contextmenu-parent"),
                                        l = o(".context-menu-list.wyp-contextmenu-parent li");
                                7 < l.length && r.addClass("wyp-limit-parent-view");
                                var d = o(".context-menu-list.wyp-contextmenu-children"),
                                        p = o(".context-menu-list.wyp-contextmenu-children li");
                                7 < p.length && d.addClass("wyp-limit-children-view"), setTimeout(function() {
                                        Le()
                                }, 200)
                        }
                },
                selector: "body.wyp-con-slcd .wyp-selected,body.wyp-con-slcd.wyp-selected",
                callback: function(e) {
                        var t = _(),
                                a = _a(),
                                i, s, r;
                        if ("logged-in" == e || "non-logged-in" == e) {
                                if (o(".wyp-contextmenu-" + e).hasClass("wyp-active-contextmenu")) L(a.replace(new RegExp(
                                        "body." + e, "g"), "")), Q(a.replace(new RegExp("body." + e, "g"), ""), t);
                                else {
                                        var l = a;
                                        "logged-in" == e ? (l = l.replace("body.non-logged-in", ""), tn.addClass(
                                                "wyp-logged-in-mode")) : "non-logged-in" == e && (l = l.replace(
                                                "body.logged-in", ""), tn.addClass("wyp-non-logged-in-mode")), L(Hi(l,
                                                e)), Q(Hi(l, e), t)
                                }
                                window.ypData.editor_context_menu_open && _().contextMenu("hide")
                        }
                        if (("hover" == e || "focus" == e || "link" == e || "visited" == e || "active" == e || "checked" == e ||
                                        "disabled" == e || "enabled" == e || "invalid" == e || "valid" == e) && (a = a.replace(
                                                /:(?!hover|focus|active|link|visited|checked|disabled|enabled|invalid|valid)/g,
                                                "WYP_DOTTED_PREFIX"), a = o(".wyp-contextmenu-" + e).hasClass(
                                                "wyp-active-contextmenu") ? a.split(":")[0] : -1 == a.indexOf(":") ? a + ":" +
                                        e : a.split(":")[0] + ":" + e, a = a.replace(/WYP_DOTTED_PREFIX/g, ":"), L(a), Q(a, t, !
                                                0)), "reviewStyles" == e && (Rt(), o("#visual-rule-filter").val("matched")
                                        .trigger("keyup")), "resetSingleSelf" == e && (Ht(!1, "single"), t.contextMenu("hide")),
                                "resetSingleChilds" == e && (Ht(!0, "single"), t.contextMenu("hide")), "resetTemplateSelf" ==
                                e && (Ht(!1, "template"), t.contextMenu("hide")), "resetTemplateChilds" == e && (Ht(!0,
                                        "template"), t.contextMenu("hide")), "resetGlobalSelf" == e && (Ht(!1, "global"), t
                                        .contextMenu("hide")), "resetGlobalChilds" == e && (Ht(!0, "global"), t.contextMenu(
                                        "hide")), "show-more-parent-link" == e || "show-more-children-link" == e) return !1;
                        if (-1 != e.indexOf("parent-") && "show-more-parent-link" != e && (s = e.replace("parent-", ""), i = t
                                        .parentsUntil("html").eq(s), window.ypData["wyp-will-selected"] = i, At(), r = o.trim(
                                                Ma(window.ypData["wyp-will-selected"], "default")), L(r), Q(r, i, !1), sn.extra
                                        .find(".wyp-el-viewer").addClass("wyp-el-viewer-relax-opacity").removeClass(
                                                "wyp-el-viewer").fadeOut(300), setTimeout(function() {
                                                sn.extra.find(".wyp-el-viewer-relax-opacity").remove()
                                        }, 400)), -1 != e.indexOf("children-") && "show-more-children-link" != e && (s = e
                                        .replace("children-", ""), i = t.children().eq(s), window.ypData["wyp-will-selected"] =
                                        i, At(), r = o.trim(Ma(window.ypData["wyp-will-selected"], "default")), L(r), Q(r, i, !
                                                1), sn.extra.find(".wyp-el-viewer").addClass("wyp-el-viewer-relax-opacity")
                                        .removeClass("wyp-el-viewer").fadeOut(300), setTimeout(function() {
                                                sn.extra.find(".wyp-el-viewer-relax-opacity").remove()
                                        }, 400)), "writeCSS" == e && (window.ypData["wyp-css-ed-act"] && o(".css-editor-btn")
                                        .trigger("click"), o(".css-editor-btn").trigger("click"), t.contextMenu("hide")),
                                "selectjustit" == e) {
                                tn.addClass("wyp-select-just-it");
                                var d = _a();
                                if (1 < Gi.find(d).length) {
                                        a = Ma(null, "sharp");
                                        var p = Ce(a, !1);
                                        0 !== Gi.find(p).length && (L(p), Q(p, null, !0))
                                }
                                window.lastParentQueryStatus = "sharp", tn.removeClass("wyp-select-just-it")
                        }
                        "close" == e && (At(), o.throttle(Be(), 32)), "editselector" == e && fe()
                },
                build: function() {
                        return Te(), {
                                items: {
                                        "pseudo-class": {
                                                name: qi.pseudo_class,
                                                className: "wyp-contextmenu-pseudo-classes",
                                                items: {
                                                        hover: {
                                                                name: ":hover",
                                                                className: "wyp-contextmenu-hover"
                                                        },
                                                        focus: {
                                                                name: ":focus",
                                                                className: "wyp-contextmenu-focus"
                                                        },
                                                        link: {
                                                                name: ":unvisited",
                                                                className: "wyp-contextmenu-link"
                                                        },
                                                        visited: {
                                                                name: ":visited",
                                                                className: "wyp-contextmenu-visited"
                                                        },
                                                        active: {
                                                                name: ":active",
                                                                className: "wyp-contextmenu-active"
                                                        },
                                                        checked: {
                                                                name: ":checked",
                                                                className: "wyp-contextmenu-checked"
                                                        },
                                                        disabled: {
                                                                name: ":disabled",
                                                                className: "wyp-contextmenu-disabled"
                                                        },
                                                        enabled: {
                                                                name: ":enabled",
                                                                className: "wyp-contextmenu-enabled"
                                                        },
                                                        invalid: {
                                                                name: ":invalid",
                                                                className: "wyp-contextmenu-invalid"
                                                        },
                                                        valid: {
                                                                name: ":valid",
                                                                className: "wyp-contextmenu-valid"
                                                        }
                                                }
                                        },
                                        conditions: {
                                                name: qi.conditions,
                                                className: "wyp-contextmenu-conditions",
                                                items: {
                                                        "logged-in": {
                                                                name: "Logged-in",
                                                                className: "wyp-contextmenu-logged-in"
                                                        },
                                                        "non-logged-in": {
                                                                name: "Non-logged-in",
                                                                className: "wyp-contextmenu-non-logged-in"
                                                        }
                                                }
                                        },
                                        editselector: {
                                                name: qi.edit_selector,
                                                className: "wyp-contextmenu-selector-edit"
                                        },
                                        writeCSS: {
                                                name: qi.write_css,
                                                className: "wyp-contextmenu-type-css"
                                        },
                                        sep2: "---------",
                                        selectjustit: {
                                                name: qi.select_only_this,
                                                className: "wyp-contextmenu-select-it"
                                        },
                                        parent: {
                                                name: qi.parent_elements,
                                                className: "wyp-contextmenu-parent",
                                                items: window.parentItems
                                        },
                                        children: {
                                                name: qi.children_elements,
                                                className: "wyp-contextmenu-children",
                                                items: window.childrenItems
                                        },
                                        sep3: "---------",
                                        reviewStyles: {
                                                name: qi.review_styles,
                                                className: "wyp-contextmenu-review-styles"
                                        },
                                        reset: {
                                                name: qi.reset_styles,
                                                className: "wyp-contextmenu-reset-styles",
                                                items: {
                                                        resetSingle: {
                                                                name: qi.single,
                                                                className: "wyp-contextmenu-reset-single",
                                                                items: {
                                                                        resetSingleSelf: {
                                                                                name: qi.the_element,
                                                                                className: "wyp-contextmenu-reset-single-self"
                                                                        },
                                                                        resetSingleChilds: {
                                                                                name: qi.child_elements,
                                                                                className: "wyp-contextmenu-reset-single-childs"
                                                                        }
                                                                }
                                                        },
                                                        resetTemplate: {
                                                                name: qi.template,
                                                                className: "wyp-contextmenu-reset-template",
                                                                items: {
                                                                        resetTemplateSelf: {
                                                                                name: qi.the_element,
                                                                                className: "wyp-contextmenu-reset-template-self"
                                                                        },
                                                                        resetTemplateChilds: {
                                                                                name: qi.child_elements,
                                                                                className: "wyp-contextmenu-reset-template-childs"
                                                                        }
                                                                }
                                                        },
                                                        resetGlobal: {
                                                                name: qi.global_t,
                                                                className: "wyp-contextmenu-reset-global",
                                                                items: {
                                                                        resetGlobalSelf: {
                                                                                name: qi.the_element,
                                                                                className: "wyp-contextmenu-reset-global-self"
                                                                        },
                                                                        resetGlobalChilds: {
                                                                                name: qi.child_elements,
                                                                                className: "wyp-contextmenu-reset-global-childs"
                                                                        }
                                                                }
                                                        }
                                                }
                                        },
                                        close: {
                                                name: qi.leave,
                                                className: "wyp-contextmenu-close"
                                        }
                                }
                        }
                }
        });
        var vn;
        o.throttle(Be(!0), 32), en.on("mousemove mousedown", o.throttle(function(t) {
                if (!1 === window.ypData["wyp-met-dis"]) {
                        var e = t.pageX,
                                a = t.pageY,
                                i = t.clientX,
                                n = t.clientY,
                                s = 0;
                        tn.hasClass("wyp-if-movleav") || (i += o("#iframe").offset().left, n += o("#iframe").offset().top,
                                window.ypOption.fixed_left_bar ? s = 44 : n <= window.leftBarSize.bottom && !1 == tn
                                .hasClass("wyp-cln-lo-manual") && !1 == tn.hasClass("wyp-clean-look") && (s = window
                                        .leftBarSize.right), o(".metric-top-border").attr("style",
                                        "transform:translate3d(" + parseInt(i - 1) +
                                        "px, 0px, 0px) !important;display:block;"), o(".metric-left-border").attr(
                                        "style", "transform:translate3d(0px, " + parseInt(n - 1) +
                                        "px, 0px) !important;"), o(".metric-top-tooltip").attr("style",
                                        "transform:translate3d(" + parseInt(s) + "px, " + parseInt(n) +
                                        "px, 0px) !important;display:block;"), o(".metric-left-tooltip").attr("style",
                                        "transform:translate3d(" + parseInt(i) +
                                        "px, 0px, 0px) !important;display:block;"), o(".metric-top-tooltip").html(
                                        "Y: <span>" + a + "</span>px"), o(".metric-left-tooltip").html("X: <span>" + e +
                                        "</span>px"))
                }
        }, 32)), Gi.on("mousemove", o.throttle(function(t) {
                if (!1 === window.ypData["wyp-met-dis"]) {
                        var e = o(t.target),
                                a = _();
                        if ((O() || D() || z()) && (e = a), e && e.hasAttr("class") && /(^|\s+)wyp-(.*?)/g.test(e.attr(
                                "class")) && !1 == /(wyp-pa-r|wyp-selected-others)/g.test(e.attr("class")) && (e = a),
                                void 0 !== e) {
                                var i = e.get(0);
                                if (!J(i)) {
                                        var n = Ra(i),
                                                s = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                                                r = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()),
                                                l = n.width,
                                                d = n.height,
                                                p = n.top + s,
                                                c = n.left + r,
                                                u = n.bottom + s;
                                        0 > c && (c = 0), 0 === sn.extra.find(".hv-in-bx").length && sn.extra.append(
                                                "<div class='hv-in-bx'></div>"), sn.extra.find(".hv-in-bx").css({
                                                width: l,
                                                height: d,
                                                transform: "translate3d(" + c + "px, " + p + "px, 0px)"
                                        });
                                        var m = sn.extra.find(".wyp-size-handle"),
                                                f = "<b class='wyp-size-handle-b'>" + i.tagName + "</b> " + parseInt(l) +
                                                " X " + parseInt(d);
                                        0 === m.length && (sn.extra.append("<div class='wyp-size-handle'>" + f + "</div>"), m =
                                                sn.extra.find(".wyp-size-handle")), m.html(f), c += l / 2, m.css({
                                                top: u,
                                                bottom: "auto",
                                                left: c,
                                                position: "absolute"
                                        }), parseFloat(u + 40) > parseFloat(o("#iframe").height()) + s && m.css({
                                                bottom: "10px",
                                                top: "auto",
                                                left: c,
                                                position: "fixed"
                                        })
                                }
                        }
                }
        }, 32));
        var bn;
        o(window).resize(function() {
                clearTimeout(bn), bn = setTimeout(function() {
                        N(), o.throttle(Be(), 32), Ct(), A() && j(), Ze()
                }, 30)
        }), Gi.on("mouseout", ".wyp-iframe-ph", function() {
                window.ypData["wyp-will-selected"] = void 0, sn.extra.find(".wyp-iframe-ph").remove(), C() || At()
        }), an.addEventListener("mouseup", function(e) {
                var t = o(e.target);
                if (clearTimeout(window.dragDelay), window.drag.active && (window.drag.initialX = window.drag.currentX, window.drag
                                .initialY = window.drag.currentY, window.drag.active = !1, li(), ii(), Ji.find("#wyp-drag-style")
                                .remove(), tt(null, "transform", "translatex(" + window.drag.currentX + "px) translatey(" + window.drag
                                        .currentY + "px)", ""), we(), Mi(), Qi.removeClass("wyp-dragging"), window.ypData
                                .is_dragging = !1, tn.removeClass("wyp-clean-look"), Ji.removeClass("wyp-hid-bor-n"), Ze(), o.throttle(
                                        Be(), 32)), t.hasClass("wyp-iframe-ph")) {
                        var i = window.ypData["wyp-will-selected"],
                                n;
                        n = Ma(i, "default"), tn.hasAttr("data-wyp-selector") && (n += tn.attr("data-wyp-selector")), window
                                .placeholderSelector = !0, L(n), Q(n, i, !1), window.placeholderSelector = !1
                }
                if (window.ypData["wyp-will-selected"] = void 0, sn.extra.find(".wyp-iframe-ph").remove(), clearTimeout(window
                                .resizeDelay), O()) {
                        li(), sn.extra.find(".wyp-helper-tooltip").remove(), window.ypData["wyp-element-resized"] = !0;
                        var s = "width" == window.visualResizingType ? window.exWidthX : window.exWidthY;
                        var i = _(),
                                l = parseFloat(i.css(window.visualResizingType)).toString(),
                                d = "px",
                                p = l;
                        if ("width" == window.visualResizingType) {
                                var c = pi(i, l);
                                l = c.val, d = c.format
                        }
                        l = Math.round(l), null !== window.exWidthX && "left" == window.ResizeSelectedBorder && p != s && tt(null,
                                        "margin-left", parseFloat(i.css("marginLeft")), "px"), null !== window.exWidthY && "top" ==
                                window.ResizeSelectedBorder && p != s && tt(null, "margin-top", parseFloat(i.css("marginTop")), "px"),
                                K(window.styleAttrBeforeChange) ? i.attr("style", window.styleAttrBeforeChange) : i.removeAttr("style"),
                                ht("min-height", l + "" + d), p != s && ("height" == window.visualResizingType && p > window
                                        .orginalHeight ? (r(u(a(), "[selector=" + gi(_a()) + "][rule=height][msize=" + Fe() + "]")),
                                                setTimeout(function() {
                                                        tt(null, "min-height", l, d)
                                                }, 5)) : tt(null, window.visualResizingType, l, d)), Ji.removeClass("wyp-el-reing"),
                                window.ypData.is_resizing = !1, tn.removeClass("wyp-clean-look"), window.maxData[window
                                        .visualResizingType] < l && tt(null, "max-" + window.visualResizingType, l, d), window.minData[
                                        window.visualResizingType] > l && tt(null, "min-" + window.visualResizingType, l, d), Mi();
                        var m = _a();
                        o.each(["width", "height", "max-width", "max-height", "min-width", "min-height", "margin-left", "margin-top"],
                                function(e, t) {
                                        pa(t, m)
                                }), window.mouseisDown = !1, window.liveResizeWPercent = !1, Ze(), setTimeout(function() {
                                window.ypData["wyp-element-resized"] = !1, window.ypData["resize-time-delay"] = !1
                        }, 100)
                }
                if (window.visualEdit) {
                        window.visualEdit = !1, window.ypData["wyp-visual-edited"] = !0, tn.removeClass("wyp-clean-look"), Ji
                                .removeClass("wyp-h-trfm wyp-vis-edng wyp-vis-edng-x wyp-vis-edng-y"), window.ypData
                                .is_visual_editing = !1, Gi.find("#wyp-visual-edit-css").remove();
                        var i = sn.active.find(".wyp-selected-boxed-" + window.visualEditType + "-" + window.visualEditPosition + ""),
                                f = i.text();
                        30 >= parseInt(f) && i.html(""), window.visualEditValueOr != f && (tt(null, window.visualEditType + "-" + window
                                .visualEditPosition, f), Mi(), pa(window.visualEditType + "-" + window
                                .visualEditPosition), o.throttle(Be(), 32)), setTimeout(function() {
                                Gi.find(".wyp-visual-active").removeClass("wyp-visual-active"), window.ypData[
                                        "wyp-visual-edited"] = void 0, Ze()
                        }, 100)
                }
                return "cursor" === window.ypData.inspector ? void 0 : (e.stopPropagation(), e.preventDefault(), !1)
        }, !0);
        Gi.on("mouseover", o.throttle(function(e) {
                Me(e)
        }, 64)), o(".media-control").click(function() {
                var e = o(this).attr("data-code");
                "max-width" == e && (o(this).attr("data-code", "min-width"), o(this).text(qi.above_t)), "min-width" == e && (o(this)
                        .attr("data-code", "max-width"), o(this).text(qi.below_t)), he(!0), o(this).tooltip("fixTitle").tooltip(
                        "show")
        }), o(".media-control").tooltip({
                title: function() {
                        var e = o(this).attr("data-code");
                        return "max-width" == e ? e = "min-width" : "min-width" == e && (e = "max-width"), qi
                                .toggle_media_query_condition.replace("{$1}", "<strong>" + e + "</strong>")
                },
                delay: {
                        show: 50,
                        hide: 0
                },
                placement: "bottom",
                trigger: "hover",
                container: "body",
                html: !0
        });
        var xn, _n;
        o(document).on("mousemove", ".unvalid-css-cover, .wyp-css-close-btn,.editor-tabs:not(.active)", o.throttle(function() {
                        tn.hasClass("css-code-unvalid") && tn.addClass("css-error-message")
                }, 64)), o(document).on("click", ".unvalid-css-cover", function() {
                        if (tn.hasClass("css-code-unvalid")) return k({
                                title: qi.css_parse_error,
                                text: qi.css_parse_error_text
                        }), !1
                }), o(".unvalid-css-error").click(function() {
                        var e = o(this).attr("data-error-index");
                        n.scrollToLine(e, !0, !1), n.gotoLine(e, 0, !0)
                }), n.getSession().on("change", function() {
                        clearTimeout(_n), _n = setTimeout(function() {
                                Ye(n.getValue())
                        }, 100)
                }), o("#css-data").on("keyup keydown", function(t) {
                        if (window.saveFromEditor) return !1;
                        n.getSession().removeMarker(window.typeHereMarker);
                        var e = 0;
                        if (t.originalEvent && (e = 900), !1 === Ji.hasClass("wyp-selectors-hide") && 0 !== e) {
                                if (Ji.addClass("wyp-selectors-hide"), window.ypData.editor_context_menu_open && _().contextMenu("hide"), A()) {
                                        var a = tn.find(".context-menu-active");
                                        0 < a.length && a.contextMenu("hide")
                                }
                                He(200)
                        }
                        var i = sn.extra.find(".wyp-el-viewer");
                        0 < i.length && i.remove(), clearTimeout(_n), _n = setTimeout(function() {
                                Ye(n.getValue())
                        }, 100), clearTimeout(xn), xn = setTimeout(function() {
                                return Ji.hasClass("wyp-selectors-hide") && 0 === o(".sl-d .ui-state-active").length && !1 ===
                                        tn.hasClass("autocomplete-active") && 0 === o(".ed-pnl .tooltip").length && (Ji
                                                .removeClass("wyp-selectors-hide"), We(200)), "keydown" != t.type && !1 == tn
                                        .hasClass("css-code-unvalid") && (A() && he(!0), we(), window.ypData[
                                                "vsl-css-vi-active"] && (Yt(), Zt())), !1
                        }, e), "keydown" != t.type && (V(n.getValue()), $())
                }), o(document).on("mouseenter", "#iframe", function() {
                        We(200)
                }), o(document).on("mouseenter", "#ed-elt-tr,.wyp-t-cont,.anim-bar,#vsl-css-vi,.fake-layer,.fake-layer-x,.fake-layer-x-bg", function(
                t) {
                        return !o(t.target).is(".pr-res-ite") && void(window.ypData.editor_context_menu_open && _().contextMenu("hide"), He(
                                200))
                }), o(document).on("mouseenter", "ul.wyp-contextmenu-parent,ul.wyp-contextmenu-children", function() {
                        He(200)
                }).on("mouseleave", "ul.wyp-contextmenu-parent,ul.wyp-contextmenu-children", function() {
                        We(200)
                }), o(document).on("mouseenter", "#vsl-css-vi", function() {
                        window.ypData["wyp-need-to-process"] && Zi()
                }), o(document).on("mouseleave", ".view-media-line", function() {
                        He(200)
                }), o("#wyp-current-page").on("click", function() {
                        o(this).toggleClass("active");
                        var e = o("#wyp-customizing-type-frame");
                        return e.css("display", "block"), Qe(!1), !1
                }), window.bMode && tn.find(".editor-tabs.template-tab,.editor-tabs.single-tab").addClass("disabled"), !0 !== window.bMode && o(
                        "#customizing-mode").on("click", function() {
                        return tn.hasClass("wyp-bg-layer-active") ? (o("#fake-layer").trigger("click"), !1) : void(o("#c-t-list").show(), o(
                                this).addClass("active"), o("#c-t-list").addClass("active"), tn.addClass(
                                "customization-type-popup customization-type-popup-" + o(
                                        "#c-t-list > ul > li:not(.type-disabled):not(#wyp-current-page)").length), o(
                                "#c-t-list li").each(function() {
                                var e = o(this).attr("data-value"),
                                        t = o(this),
                                        a = Et(!0, e, !1),
                                        i = Et(!0, e, !1).match(/:(.*?);/g);
                                if (0 < a.length && null != i) {
                                        var n = "";
                                        1 < i.length && (n = "s"), t.find(".type-byte span").text(i.length + " " + qi
                                                .style + n), t.removeClass("empty-customization")
                                } else t.find(".type-byte span").text(qi.empty), t.addClass("empty-customization")
                        }), W({
                                index: 2147483646,
                                container: ".wyp-customizing-inner",
                                callback: function() {
                                        tn.removeClass(
                                                        "wyp-bg-layer-active customization-type-popup customization-type-popup-1 customization-type-popup-2 customization-type-popup-3"),
                                                o("#c-t-list").hide(), o("#customizing-mode, #c-t-list")
                                                .removeClass("active")
                                }
                        }))
                }), o(".type-disabled").tooltip({
                        title: qi.customize_type_not_available,
                        placement: "left",
                        container: ".ed-pnl",
                        html: !0
                }), o(".manage-this-type").tooltip({
                        title: "Manage Styles",
                        placement: "left",
                        container: ".ed-pnl",
                        html: !0
                }), o(".reset-this-type").tooltip({
                        title: "Reset Styles",
                        placement: "left",
                        container: ".ed-pnl",
                        html: !0
                }), o(document).on("click", "#c-t-list li", function() {
                        var e = o(this).attr("data-value");
                        if (o(this).hasClass("type-disabled")) return !1;
                        window.ypData["wyp-need-to-process"] && Zi(), o("#fake-layer").trigger("click"), n.getSession().removeMarker(window
                                .typeHereMarker);
                        var t = o(this).find("h6 > span").text();
                        Gi.find(".wyp-inline-data").removeAttr("id"), Gi.find(".wyp-inline-data[data-source-mode=\"" + e + "\"]").attr("id",
                                        "wyp-styles-area"), o(".active-customizing-list").removeClass("active-customizing-list"), o(this)
                                .addClass("active-customizing-list"), o("#customizing-mode .type-heading").text(t), y(), window
                                .sourceViewClick || _e(!0), Qe(!1), $(), we()
                }), o(".editor-tabs").on("click", function() {
                        if (o(this).hasClass("disabled") || o(this).hasClass("active")) return !1;
                        if (tn.hasClass("css-code-unvalid")) return k({
                                title: qi.css_parse_error,
                                text: qi.css_parse_error_text
                        }), !1;
                        var e = o(this).attr("data-type-value");
                        o(".editor-tabs").removeClass("active"), o(this).addClass("active"), o("#customizing-mode").removeClass("done"), o(
                                ".wyp-type-menu-link").addClass("focus").addClass("done"), setTimeout(function() {
                                o(".wyp-type-menu-link").removeClass("focus").removeClass("done")
                        }, 600), o("#c-t-list li[data-value='" + e + "']").trigger("click")
                }), o(document).on("mouseenter", ".ace_line_group", function() {
                        var e = o(this).text(),
                                t;
                        !0 == /\{/g.test(e) && !1 == /\@(media|font-face|import)/g.test(e) && (t = e.split("{")[0], window.focusDelay =
                                setTimeout(function() {
                                        if (t = xi(t, !0, !0, !0, !0), "*" == t.trim()) return !1;
                                        var e = Ca(t, !0, !1, !1);
                                        return !1 != e && void st(e)
                                }, 200))
                }), o(document).on("mouseleave", ".ace_line_group", function() {
                        clearTimeout(window.focusDelay), sn.extra.find(".wyp-el-viewer").remove()
                }), o("#wyp-border-type .ra").on("click", function() {
                        var e = o("#wyp-border-type .ra.active input").val();
                        o(".wyp-border-all-section,.wyp-border-top-section,.wyp-border-right-section,.wyp-border-bottom-section,.wyp-border-left-section")
                                .hide(), o(".wyp-border-" + e + "-section").show()
                }), o("#wyp-background-type .ra").on("click", function() {
                        var e = o("#wyp-background-type .ra.active input").val();
                        o(".wyp-background-background-section,.wyp-background-filter-section").hide(), o(".wyp-background-" + e + "-section")
                                .show()
                }), o("#wyp-spacing-type .ra").on("click", function() {
                        var e = o("#wyp-spacing-type .ra.active input").val();
                        o(".wyp-spacing-margin-section,.wyp-spacing-padding-section").hide(), o(".wyp-spacing-" + e + "-section").show()
                }), o("#wyp-transform-type .ra").on("click", function() {
                        var e = o("#wyp-transform-type .ra.active input").val();
                        o(".wyp-transform-move-section,.wyp-transform-rotate-section,.wyp-transform-skew-section,.wyp-transform-extra-section")
                                .hide(), o(".wyp-transform-" + e + "-section").show()
                }), o("#wyp-filter-type .ra").on("click", function() {
                        var e = o("#wyp-filter-type .ra.active input").val();
                        o(".wyp-filter-color-adjustment-section,.wyp-filter-color-effects-section").hide(), o(".wyp-filter-" + e + "-section")
                                .show()
                }), o("#wyp-motion-type .ra").on("click", function() {
                        var e = o("#wyp-motion-type .ra.active input").val();
                        o(".wyp-motion-animation-section,.wyp-motion-transition-section").hide(), o(".wyp-motion-" + e + "-section").show()
                }), o(".ra-o .ra label").on("click", function() {
                        var e, t, a, i, n;
                        return e = o(this), t = e.parent(), a = t.parent().parent().parent(), n = a.attr("data-css"), !(0 === o(
                                ".position-option.active").length && t.hasClass("active")) && void(a.find(".active").removeClass(
                                        "active"), t.addClass("active"), e.prev("input").prop("checked", !0), i = o("input[name=" + n +
                                        "]:checked").val(), "background-size" == n && (o(this).is("#background-size-auto") ? ut() : o(
                                        ".background-size-custom-group").hide()), "border-type" != n && "background-type" != n &&
                                "spacing-type" != n && "transform-type" != n && "filter-type" != n && "motion-type" != n && (window
                                        .lastEditID = n, tt(null, n, i, ""), Mi()))
                }), o("#margin-left-group,#margin-right-group,#margin-top-group,#margin-bottom-group").on("mousemove", function(t) {
                        if (!t.originalEvent) return !0;
                        o(this).popover("destroy");
                        var e = da(["display"]);
                        if ("inline" == e.display || "table-cell" == e.display) o(this).popover({
                                title: qi.notice,
                                content: qi.display_notice,
                                trigger: "hover",
                                placement: "left",
                                container: ".ed-pnl",
                                html: !0
                        }).popover("show");
                        else if (0 > o("#" + o(this).attr("data-css") + "-value").val()) {
                                if (!1 == o(this).hasClass("reset-enable") && 0 == o(this).find(".sl-d .ui-state-active").length) return !0;
                                o(this).popover({
                                        title: qi.notice,
                                        content: qi.negative_margin_notice,
                                        trigger: "hover",
                                        placement: "left",
                                        container: ".ed-pnl",
                                        html: !0
                                }).popover("show")
                        }
                }), o("#list-style-type-group").on("mousemove", function(t) {
                        return !t.originalEvent || void(o(this).popover("destroy"), 12 < o("#wyp-list-style-image").val().length && "none" != o(
                                "#wyp-list-style-image").val() && o(this).popover({
                                title: qi.notice,
                                content: qi.list_notice1,
                                trigger: "hover",
                                placement: "left",
                                container: ".ed-pnl",
                                html: !0
                        }).popover("show"))
                }), o("#cursor-group").on("mousemove", function(t) {
                        return !t.originalEvent || void(o(this).popover("destroy"), o("#cursor-group").hasClass("reset-enable") && o(this)
                                .popover({
                                        title: qi.notice,
                                        content: qi.cursor_warning,
                                        trigger: "hover",
                                        placement: "left",
                                        container: ".ed-pnl",
                                        html: !0
                                }).popover("show"))
                }), o("#list-style-position-group,#list-style-image-group,#list-style-type-group").on("mousemove", function(t) {
                        if (!t.originalEvent) return !0;
                        o(this).popover("destroy");
                        var e = _().prop("tagName").toLowerCase();
                        "li" != e && "ul" != e && o(this).popover({
                                title: qi.notice,
                                content: qi.list_notice,
                                trigger: "hover",
                                placement: "left",
                                container: ".ed-pnl",
                                html: !0
                        }).popover("show")
                }), o(
                        "#scale-transform-group,#rotatex-transform-group,#rotatey-transform-group,#rotatez-transform-group,#translate-x-transform-group,#translate-y-transform-group,#skew-x-transform-group,#skew-y-transform-group,#padding-left-group,#padding-right-group,#padding-top-group,#padding-bottom-group,#width-group,#height-group,#animation-name-group")
                .on("mousemove", function(t) {
                        return !t.originalEvent || void(o(this).popover("destroy"), "inline" == da("display") && o(this).popover({
                                title: qi.notice,
                                content: qi.display_notice,
                                trigger: "hover",
                                placement: "left",
                                container: ".ed-pnl",
                                html: !0
                        }).popover("show"))
                }), o("#left-group,#right-group,#top-group,#bottom-group").on("mousemove", function(t) {
                        return !t.originalEvent || !!A() || !1 == o(this).hasClass("reset-enable") && 0 == o(this).find(
                                ".sl-d .ui-state-active").length || void(o(this).popover("destroy"), 50 <= o("#" + o(this).attr("id")
                                .replace("group", "value")).val() && o(this).popover({
                                title: qi.notice,
                                content: qi.high_position_notice,
                                trigger: "hover",
                                placement: "left",
                                container: ".ed-pnl",
                                html: !0
                        }).popover("show"))
                }), o("#position-group").on("mousemove click", function(t) {
                        return !t.originalEvent || (o(this).popover("destroy"), !!A() || !1 == o(this).hasClass("reset-enable") && 0 == o(this)
                                .find(".sl-d .ui-state-active").length || void(0 < o(".ra.active #position-fixed").length ? o(this)
                                        .popover({
                                                title: qi.notice,
                                                content: qi.fixed_notice,
                                                trigger: "hover",
                                                placement: "left",
                                                container: ".ed-pnl",
                                                html: !0
                                        }).popover("show") : 0 < o(".ra.active #position-absolute").length && o(this).popover({
                                                title: qi.notice,
                                                content: qi.absolute_notice,
                                                trigger: "hover",
                                                placement: "left",
                                                container: ".ed-pnl",
                                                html: !0
                                        }).popover("show")))
                }), o(
                        "#background-size-group,#background-repeat-group,#background-blend-mode-group,#background-attachment-group,#background-position-x-group,#background-position-y-group")
                .on("mousemove", function(t) {
                        return !t.originalEvent || void(o(this).popover("destroy"), "" == o("#wyp-background-image").val() && o(this).popover({
                                title: qi.notice,
                                content: qi.bg_img_notice_two,
                                trigger: "hover",
                                placement: "left",
                                container: ".ed-pnl",
                                html: !0
                        }).popover("show"))
                }), o("#background-clip-group").on("mousemove", function(t) {
                        return !t.originalEvent || void(o(this).popover("destroy"), "" == o("#wyp-background-image").val() && o(this).popover({
                                title: qi.notice,
                                content: qi.bg_img_notice_tree,
                                trigger: "hover",
                                placement: "left",
                                container: ".ed-pnl",
                                html: !0
                        }).popover("show"))
                }), o("#height-group").on("mousemove", function(t) {
                        if (!t.originalEvent) return !0;
                        o(this).popover("destroy");
                        var e = _().prop("tagName");
                        ("P" == e || "H1" == e || "H2" == e || "H3" == e || "H4" == e || "H5" == e || "H6" == e) && o(this).popover({
                                title: qi.notice,
                                content: qi.height_notice,
                                trigger: "hover",
                                placement: "left",
                                container: ".ed-pnl",
                                html: !0
                        }).popover("show")
                }), o(document).on("click", ".reset-enable .di-btn", function() {
                        o(this).parents(".op-g").popover("destroy")
                }), o(".ed-pnl-list").on("scroll", o.throttle(function() {
                        o(".op-g,.wyp-advanced-option").popover("hide")
                }, 64)), o(".in-ac").keydown(function(t) {
                        var e = t.keyCode || t.which;
                        (38 == e || 40 == e) && (o(this).parent().find(".ac-d .ui-state-focus").prev().trigger("mouseout"), o(this).parent()
                                .find(".ac-d .ui-state-focus").trigger("mouseover")), 13 == e && o(this).blur()
                }), o(document).on("click", ".ac-d ul li", function() {
                        o(this).parent().parent().parent().find(".ui-autocomplete-input").trigger("keyup").trigger("blur")
                });
        var kn;
        o(".in-ac").on("keyup", function() {
                var e = o(this).attr("id");
                "wyp-font-family" == e && (clearTimeout(kn), kn = setTimeout(function() {
                        var e = mt(o("#wyp-font-family").val());
                        e ? (o("#include-webfont-label").css("display", "none"), tt(null, "--google-webfont",
                                "disable")) : o("#include-webfont-label").css("display", "inline-block")
                }, window.Yellow2Delay))
        }), o(".in-ac").on("blur keyup", function(t) {
                var e = o(this),
                        a = e.parent().parent().parent().attr("data-css"),
                        i = e.val();
                e.removeClass("active"), e.parent().removeClass("active"), _t(a);
                var n = !1;
                return "font-family" == a ? P(window.openVal) == P(i) && (n = !0) : window.openVal == i && (n = !0), "" == i && (n = !
                        0), "blur" == t.type && (window.openVal = void 0), !n && void("font-weight" == a && o("#wyp-font-weight").css(a,
                                        i).css("fontFamily", o("#wyp-font-family").val()), "font-family" == a && (o("#wyp-font-family")
                                        .css(a, i), o("#wyp-font-weight").css("fontFamily", o("#wyp-font-family").val())),
                                "text-shadow" == a && o("#wyp-text-shadow").css(a, i), "font-family" == a && -1 == i.indexOf(",") && -
                                1 == i.indexOf("'") && -1 == i.indexOf("\"") && (i = "'" + i + "'"), window.lastEditID = a, tt(null, a,
                                        i, ""), Mi())
        }), o(document).on("mouseout", ".ac-d", function() {
                var e = o(this).parents(".op-g").attr("data-css");
                _t(e)
        }), o(document).on("mouseleave", function() {
                return !Qi.hasClass("wyp-mouseleave") && void(Qi.addClass("wyp-mouseleave"), Ji.removeClass("wyp-control-key-down"),
                        window.ypData["wyp-control-key-down"] = !1, Gi.find(".wyp-multiple-selected").removeClass(
                                "wyp-multiple-selected"), sn.other.find(".wyp-selected-others-multiple-box").remove(), tn
                        .removeClass("fake-layer-x-bg"), o(".fake-layer-x").remove(), o(".ui-resizable-handle").removeClass(
                                "active"))
        }), o(document).on("mouseup", function() {
                0 != o(".ui-resizable-resizing").length && o(".ui-resizable-handle").removeClass("active")
        }), o(document).on("mouseenter", function() {
                Qi.removeClass("wyp-mouseleave"), Ji.removeClass("wyp-control-key-down"), window.ypData["wyp-control-key-down"] = !1, Gi
                        .find(".wyp-multiple-selected").removeClass("wyp-multiple-selected"), sn.other.find(
                                ".wyp-selected-others-multiple-box").remove()
        }), Gi.on("mouseleave", function() {
                return !window.ypData["wyp-if-movleav"] && void(Qi.addClass("wyp-if-movleav"), window.ypData["wyp-if-movleav"] = !0, Ji
                        .removeClass("wyp-control-key-down"), window.ypData["wyp-control-key-down"] = !1, Gi.find(
                                ".wyp-multiple-selected").removeClass("wyp-multiple-selected"), sn.other.find(
                                ".wyp-selected-others-multiple-box").remove())
        }), Gi.on("mouseenter", function(e) {
                e.originalEvent && (Qi.removeClass("wyp-if-movleav"), window.ypData["wyp-if-movleav"] = !1, !1 == C() && Ji.removeClass(
                        "wyp-full-width-selected"))
        }), o(document).on("click", ".animation-option:not(.active) > h3", function() {
                o(".anim-player-icon.icon-controls-pause").trigger("click")
        }), o(".anim-player-icon").on("click", function() {
                return (Gi.find(".yp_onscreen,.yp_hover,.yp_click,.yp_focus").removeClass("yp_onscreen yp_hover yp_click yp_focus"),
                Ni(), Yi(), window.ypData["wyp-force-hide-select-ui"] = void 0, Ji.removeClass(
                        "wyp-h-trfm wyp-hid-bor-n"), o(this).hasClass("icon-controls-pause")) ? (o(".anim-player-icon")
                        .removeClass("icon-controls-pause").addClass("icon-controls-play"), !1) : (clearTimeout(window.timer5),
                        "none" != o("#wyp-animation-name").val() && void(window.timer5 = setTimeout(function() {
                                Gi.find(_a()).addClass("yp_onscreen yp_hover yp_click yp_focus"), o(
                                        ".anim-player-icon").removeClass("icon-controls-play").addClass(
                                        "icon-controls-pause");
                                var e = _();
                                window.ypData["wyp-force-hide-select-ui"] = !0, Ji.addClass("wyp-hid-bor-n");
                                var t = e.css("animationDuration"),
                                        a = e.css("animationDelay"),
                                        i = ft(t, a);
                                a = !1 === i ? J(a) ? 0 : Wt(a) : i, t = J(t) ? 1e3 : Wt(t), t = parseFloat(t) +
                                        parseFloat(a), 0 === t && (t = 1e3), t += 100, Yi(), window
                                        .animationTimer5 = setTimeout(function() {
                                                window.ypData["wyp-force-hide-select-ui"] = void 0, Ji
                                                        .removeClass("wyp-hid-bor-n"), Ni(), o(
                                                                ".anim-player-icon").removeClass(
                                                                "icon-controls-pause").addClass(
                                                                "icon-controls-play"), Ze(), !1 ==
                                                        window.ypData["wyp-if-movleav"] && setTimeout(
                                                                function() {
                                                                        We(200)
                                                                }, 300)
                                        }, t)
                        }, 5)))
        }), o(".wf-close-btn-link").on("click", function(t) {
                0 < o(".ed-pnl-list > li.active").length ? (t.preventDefault(), o(".ed-pnl-list > li.active > h3").trigger("click")) :
                        window.bMode && o(this).attr("href", document.getElementById("iframe").contentWindow.location.href)
        }), window.cachedSelector = null, window.cachedSelectorStrong = null, o(document).on("click", ".iris-picker .format-change-button",
                function() {
                        var e = o(this).parents(".information");
                        e.hasClass("rgb") ? e.removeClass("rgb").addClass("hex") : e.addClass("rgb").removeClass("hex")
                }), o(document).on("click", ".iris-picker .format-change-palette-button", function() {
                var e = o(this).parents(".iris-color-control");
                if (e.hasClass("flat")) e.removeClass("flat").addClass("meterial");
                else if (e.hasClass("meterial")) e.removeClass("meterial").addClass("soft");
                else if (e.hasClass("soft")) {
                        e.removeClass("soft").addClass("page"), J(window.colorJsonList) && M("typography");
                        for (var t = "", a = 0, n; a < window.colorJsonList.length; a++) n = window.colorJsonList[a], t +=
                                "<div class='iris-color page' data-color='" + n + "' style='background:" + n + "'></div>";
                        e.find(".iris-color-list .iris-color.page").remove(), e.find(".iris-color-list").append(t)
                } else e.hasClass("page") && e.removeClass("page").addClass("flat")
        });
        var Cn;
        en.on("mousemove", o.throttle(function() {
                !0 === window.isIrisOpen && (clearTimeout(Cn), Cn = setTimeout(function() {
                        var e, t, a;
                        0 < o(".iris-dragging").length && (e = o(".iris-dragging").parents(".op-g"), t =
                                e.data("css"), a = e.find(".co-p").val(), "background-image" !=
                                t && (_t(t, !1), ht(t, a, !1))), 0 < o(".iris-slider").find(
                                ".ui-state-active").length && (e = o(".iris-slider").find(
                                        ".ui-state-active").parents(".op-g"), t = e.data("css"),
                                a = e.find(".co-p").val(), "background-image" != t && (_t(t, !
                                        1), ht(t, a, !1))), 0 < o(".cs-alpha-slider").find(
                                ".ui-state-active").length && (e = o(".cs-alpha-slider").find(
                                        ".ui-state-active").parents(".op-g"), t = e.data("css"),
                                a = e.find(".co-p").val(), "background-image" != t && (_t(t, !
                                        1), ht(t, a, !1)))
                }, window.YellowDelay))
        }, 48)), en.on("mouseup", function(e) {
                if (!0 === window.isIrisOpen) {
                        var t;
                        0 < o(document).find(".iris-dragging").length ? (t = o(".iris-dragging").parents(".op-g"), t.find(".co-p")
                                        .trigger("change"), "background-image-group" == t.attr("id") && Dt("insert")) : 0 < o(document)
                                .find(".iris-slider .ui-state-active").length ? (t = o(".ui-state-active").parents(".op-g"), t.find(
                                        ".co-p").trigger("change"), "background-image-group" == t.attr("id") && Dt("insert")) : 0 < o(
                                        document).find(".cs-alpha-slider .ui-state-active").length ? (t = o(
                                                ".cs-alpha-slider .ui-state-active").parents(".op-g"), "background-image-group" == t
                                        .attr("id") && Dt("insert")) : o(e.target).hasClass("iris-square-handle") && (t = o(e.target)
                                        .parents(".op-g"), t.find(".co-p").trigger("change"), "background-image-group" == t.attr(
                                        "id") && Dt("insert"))
                }
        }), o(".co-p").on("blur", function() {
                if ("" == o(this).val()) return !1
        }).on("click", function() {
                o(this).parent().parent().find(".iris-picker").show()
        }).on("keydown keyup", function() {
                o(this).parent().find(".co-sw-co").css("backgroundColor", o(this).val())
        }).on("change", function() {
                var e, t, a, i;
                e = o(this), t = e.parent().parent().parent(), a = t.attr("data-css"), i = e.val(), i = i.replace(/##/g, "#"), e.val(i),
                        /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g.test(i) && -1 == i.indexOf("#") ? i = "#" + i : !1 ==
                        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g.test(i) && -1 == i.indexOf("rgb(") && -1 == i.indexOf("rgba(") &&
                        "inherit" != i && "initial" != i && ("red" == i ? i = "#FF0000" : "white" == i ? i = "#FFFFFF" : "blue" == i ?
                                i = "#0000FF" : "orange" == i ? i = "#FFA500" : "green" == i ? i = "#008000" : "purple" == i ? i =
                                "#800080" : "pink" == i ? i = "#FFC0CB" : "black" == i ? i = "#000000" : "brown" == i ? i = "#A52A2A" :
                                "yellow" == i ? i = "#FFFF00" : "gray" == i ? i = "#808080" : i = "transparent"), 3 > i.length && (i =
                                "transparent"), _t(a, !1), window.lastEditID = a, tt(null, a, i, ""), o(this).parent().find(".co-sw-co")
                        .css("backgroundColor", i), Mi()
        }), o(".in-o .wyp-input").on("change", function() {
                var e, t, a;
                e = o(this), t = e.parent().parent().parent(), a = t.attr("data-css"), "background-image" == a && (0 < o(
                                ".wyp-unsplash-list .active").length && o(".wyp-unsplash-list .active").removeClass("active"),
                        0 < o(".wyp-gradient-list .active").length && o(".wyp-gradient-list .active").removeClass("active"), 0 <
                        o(".wyp-background-asts .active").length && o(".wyp-background-asts .active").removeClass("active"))
        }), o(".in-o .wyp-input").on("keyup", function() {
                var e, t, a, i;
                e = o(this), t = e.parent().parent().parent(), i = t.attr("data-css"), a = e.val(), "" == a && (a = "none"),
                        "background-image" == i && ut(), "background-image" == i && -1 == a.indexOf("gradient(") && "none" != a && "" !=
                        a && "disable" != a && "inherit" != a && "initial" != a && (-1 == a.indexOf("url(") && (a = "url(\"" + a +
                                        "\")"), 0 == o(".wyp-unsplash-btn.active").length && 0 == o(".wyp-gradient-btn.active")
                                .length && ne(a)), "list-style-image" == i && "none" != a && "" != a && "disable" != a && "inherit" !=
                        a && "initial" != a && -1 == a.indexOf("url(") && (a = "url(\"" + a + "\")"), window.lastEditID = i, tt(null, i,
                                a, ""), Mi()
        }), o(document).on("mouseover", ".op-g.reset-enable .di-btn", function() {
                o(this).tooltip("disable")
        }), o(document).on("mouseover", ".op-g:not(.reset-enable) .di-btn", function() {
                o(this).tooltip("enable")
        }), o(document).on("mousedown", ".wyp-gradient-pointer-area", function(t) {
                if (3 == t.which) return !1;
                if (o(t.target).hasClass("wyp-gradient-pointer") || o(t.target).hasClass("wyp-gradient-pointer-color")) return !1;
                var e = o(".wyp-gradient-pointer-area"),
                        a = e.width(),
                        i = e.offset(),
                        n = i.left,
                        s = t.pageX - n;
                s = parseInt(100 * (s / a)), o(".wyp-gradient-pointer").removeClass("active");
                var r = "#FF5253";
                7 == o("#iris-gradient-color").val().length && (r = o("#iris-gradient-color").val());
                var l = "<div class=\"wyp-gradient-pointer active\" data-color=\"" + r + "\" data-position=\"" + s +
                        "\" style=\"left:" + s + "%;\"><i class=\"wyp-gradient-pointer-color\" style=\"background-color:" + r +
                        ";\"></i></div>";
                e.append(l), Ct(), Dt("insert")
        }), o(".wyp-gradient-orientation i").draggable({
                containment: "parent",
                start: function() {},
                drag: function(t, e) {
                        var a = o(".wyp-gradient-orientation"),
                                i = a.offset(),
                                n = i.left + a.width() / 2,
                                s = i.top + a.height() / 2,
                                r = e.offset.left,
                                l = e.offset.top,
                                d = Math.atan2(r - n, l - s),
                                p = -1 * (d * (180 / Math.PI));
                        o(this).parent().attr("data-degree", parseInt(p)), Dt("live")
                },
                stop: function() {
                        Dt("insert")
                }
        }), window.blockIris = !1, window.iris_global_change_callback = function(e, t) {
                var a = t.color.toString(),
                        i = o(e.target).next(".iris-picker"),
                        n = i.find(".information input").is(":focus");
                if (0 < i.length) {
                        i.find(".iris-color-preview").removeClass("active");
                        var s = a; - 1 != a.indexOf("#") && (s = Ri(a)), s = s.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(","), null == s[3] && (
                                s[3] = 1), !1 == n && (i.find(".information-item.rgb .rgb-r input").val(s[0]), i.find(
                                        ".information-item.rgb .rgb-g input").val(s[1]), i.find(".information-item.rgb .rgb-b input")
                                .val(s[2]), i.find(".information-item.rgb .rgb-a input").val(s[3]));
                        var r = 100 * s[3],
                                l = i.find(".cs-alpha-slider").slider("value");
                        r != l && i.find(".cs-alpha-slider").slider("value", r);
                        var d = a;
                        /(RGB\(|rgb\()/g.test(a) && (d = Pi(a)), 0 == r && (i.find(".iris-color-preview").addClass("active"), d =
                                "transparent"), !1 == n && (i.find(".information-item.hex .hex input").val(d), !1 == window
                                        .BlockIrisTypeChange && (-1 != a.indexOf("rgba") && 0 != r ? i.find(".information.hex").removeClass(
                                                "hex").addClass("rgb") : i.find(".information.rgb").removeClass("rgb").addClass("hex")))
                }
                0 < o(".wyp-gradient-section .iris-picker:visible").length && (o(".wyp-gradient-pointer.active i").css("background-color", a),
                        o(".wyp-gradient-pointer.active").attr("data-color", a), Dt("live"))
        }, o("#iris-gradient-color").on("change", function() {
                var e = o(this).val();
                o(".wyp-gradient-pointer.active i").css("background-color", e), o(".wyp-gradient-pointer.active").attr("data-color", e),
                        Dt("insert")
        }), o(document).on("mousedown", ".iris-square", function() {
                var e = o(this).parent().find(".input-field.rgb-a input"),
                        t = e.val();
                if ("0" == t) {
                        var a = o(this).parents(".op-g").find(".co-p");
                        0 == a.length && (a = o("#iris-gradient-color"));
                        var i = a.val(); - 1 != i.indexOf("rgba(") && (i = i.replace(/(\s|rgba|\(|\))/g, "").split(","), i = "rgb(" + i[
                                0] + "," + i[1] + "," + i[2] + ")", a.iris("color", i))
                }
        }), o(document).on("click contextmenu", ".wyp-gradient-pointer", function() {
                o(".wyp-gradient-pointer").removeClass("active"), o(this).addClass("active")
        }), o(document).on("contextmenu dblclick", ".wyp-gradient-pointer", function() {
                if (!0 == window.blockIris) return !1;
                var e = o(this).attr("data-color");
                window.gradientlastColor = e, o(".wyp-gradient-pointer").removeClass("active focus"), o(this).addClass("active focus");
                var t = -1 === e.indexOf("rgba") ? 100 : parseFloat(100 * e.replace(/^.*,(.+)\)/, "$1"));
                "transparent" == e && (t = 0), o(".wyp-gradient-section").find(".cs-alpha-slider").slider("value", t), o(
                        ".wyp-gradient-section .iris-picker").show();
                var a = o(".wyp-gradient-section .iris-picker").find(".information.hex input");
                return o("#iris-gradient-color").iris("color", e), 0 < a.length && (a.trigger("focus"), a[0].setSelectionRange(0, a
                .val().length)), window.isIrisOpen = !0, W({
                        index: 2147483646,
                        container: ".ed-pnl",
                        callback: function() {
                                window.isIrisOpen = !1, o(".wyp-gradient-pointer").removeClass("focus"), o(
                                        ".wyp-gradient-section .iris-picker").hide()
                        }
                }), !1
        }), o(document).on("click", ".view-rule-value", function() {
                var e = o(this),
                        t = e.next(".value-input");
                e.hide(), t.val(e.text()), t.css("display", "inline").focus(), t[0].setSelectionRange(0, t.val().length), e.parent()
                        .find(".rule-end").css("margin-left", "-12px"), e.next(".value-input").autoGrowInput(), e.parents(
                                ".css-rule-view").hasClass("view-rule-disabled") && (t.addClass("rule-was-disable"), e.parents(
                                ".css-rule-view").removeClass("view-rule-disabled"))
        }), o(document).on("change", ".css-rule-label input", function() {
                var e = o(this).parents(".css-rule-view"),
                        t = e.find(".value-input");
                if (!1 == o(this).is(":checked")) e.addClass("view-rule-disabled"), t.val("disable");
                else {
                        var a = t.prev(".view-rule-value").text();
                        t.val(a)
                }
                t.trigger("blur"), !0 == o(this).is(":checked") && e.removeClass("view-rule-disabled")
        }), o(".manage-this-type").on("click", function() {
                var e = o(this).parent().attr("data-value");
                return Rt(), o("#visual-rule-filter").val(e + ".css").trigger("keyup"), o("#fake-layer").trigger("click"), !1
        }), o(".reset-this-type").on("click", function() {
                var e = o(this).parent().attr("data-value");
                return k({
                        title: qi.reset_type_msg.replace("{$1}", e),
                        confirmButtonText: qi.reset_btn,
                        showCancelButton: !0,
                        confirmButtonColor: "#F94141"
                }, function() {
                        window.ypData["wyp-need-to-process"] && Zi(), o("#fake-layer").trigger("click"), r("", e), Mi()
                }), !1
        }), o(document).on("click", ".css-selector-open .selector-view span", function() {
                var e = o(this).parents(".selector-group").attr("data-view-selector"),
                        t = !1;
                C() && e == _a() && (t = !0);
                var a = xi(e, !0, !0, !0, !0);
                t || !1 == Ca(a, !0, !1, !1) || (e = e.replace(/(\.|\:)(yp(-|_)onscreen|yp(-|_)focus|yp(-|_)hover|yp(-|_)click)/g, ""),
                        e = e.replace(
                                /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?)$/g,
                                function(e) {
                                        var t = e.match(
                                                        /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g)[
                                                        0].replace(/(body)?\.yp-selector-/g, ""),
                                                a = e.replace(
                                                        /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                                                        "");
                                        return " " != a[0] && (a = "body" + a), a = a.trim().replace(/\{/g, "") + ":" + t, a
                                }), window.selectedByView = !0, L(e), Q(e, null, !0), window.selectedByView = !1, o(
                                ".selector-group").removeClass("active"), o(this).parents(".selector-group").addClass("active"),
                        sn.extra.find(".wyp-el-viewer").remove()), ce()
        }), o(document).on("click", ".selector-heading", function(t) {
                if (o(t.target).hasClass("selector-heading")) {
                        var e = o(this),
                                a = e.parent(),
                                i = a.nextAll(".view-children-group[data-clean-selector='" + a.attr("data-clean-selector") + "']");
                        a.toggleClass("focus"), i.toggleClass("focus"), o(".selector-group.focus").not(a).not(i).removeClass("focus")
                }
        }), o(document).on("click", ".selector-heading span", function() {
                "cursor" === window.ypData.inspector && (o(".inspector-sublist-default").trigger("click"), window.ypData.inspector =
                        "default", o(".inspector-sublist").css("display", "none"));
                var e = o(this).parents(".selector-group"),
                        t = e.attr("data-view-selector"),
                        a = !1;
                e.hasClass("active") && (a = !0);
                var i = xi(t, !0, !0, !0, !0);
                a || !1 == Ca(i, !0, !1, !1) || (t = t.replace(/(\.|\:)(yp(-|_)onscreen|yp(-|_)focus|yp(-|_)hover|yp(-|_)click)/g, ""),
                        t = t.replace(
                                /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?)$/g,
                                function(e) {
                                        var t = e.match(
                                                        /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g)[
                                                        0].replace(/(body)?\.yp-selector-/g, ""),
                                                a = e.replace(
                                                        /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                                                        "");
                                        return " " != a[0] && (a = "body" + a), a = a.trim().replace(/\{/g, "") + ":" + t, a
                                }), window.selectedByView = !0, L(t), Q(t, null, !0), window.selectedByView = !1, o(
                                ".selector-group").removeClass("active"), o(this).parents(".selector-group").addClass("active"),
                        sn.extra.find(".wyp-el-viewer").remove()), ce()
        }), o(document).on("mouseover", ".selector-heading span", function() {
                var e = o(this);
                window.focusDelay = setTimeout(function() {
                        var t = e.parents(".selector-group").attr("data-view-selector");
                        if (t = xi(t, !0, !0, !0, !0), "*" == t.trim()) return !1;
                        var a = Ca(t, !0, !1, !1);
                        return !1 != a && void st(a)
                }, 200)
        }), o(document).on("click", ".wyp-anim-el-column > i", function() {
                "cursor" === window.ypData.inspector && (o(".inspector-sublist-default").trigger("click"), window.ypData.inspector =
                        "default", o(".inspector-sublist").css("display", "none"));
                var e = o(this).attr("data-title"),
                        t = !1;
                C() && e == _a() && (t = !0);
                var a = xi(e, !0, !0, !0, !0);
                t || !1 == Ca(a, !0, !1, !1) || (e = e.replace(/(\.|\:)(yp(-|_)onscreen|yp(-|_)focus|yp(-|_)hover|yp(-|_)click)/g, ""),
                        e = e.replace(
                                /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?)$/g,
                                function(e) {
                                        var t = e.match(
                                                        /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g)[
                                                        0].replace(/(body)?\.yp-selector-/g, ""),
                                                a = e.replace(
                                                        /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                                                        "");
                                        return " " != a[0] && (a = "body" + a), a = a.trim().replace(/\{/g, "") + ":" + t, a
                                }), window.selectedByView = !0, L(e), Q(e, null, !0), window.selectedByView = !1, o(
                                ".selector-group").removeClass("active"), o(this).parents(".selector-group").addClass("active"),
                        sn.extra.find(".wyp-el-viewer").remove()), ce()
        }), o(document).on("mouseover", ".wyp-anim-el-column > i", function() {
                var e = o(this);
                window.focusDelay = setTimeout(function() {
                        var t = e.attr("data-title");
                        if (t = xi(t, !0, !0, !0, !0), "*" == t.trim()) return !1;
                        var a = Ca(t, !0, !1, !1);
                        return !1 != a && void st(a)
                }, 200)
        }), o(document).on("mouseleave mouseout", ".selector-heading span, .css-selector-open .selector-view span,.wyp-anim-el-column > i",
                function() {
                        clearTimeout(window.focusDelay), sn.extra.find(".wyp-el-viewer").remove()
                }), o(document).on("mouseover", ".css-selector-open .selector-view span", function() {
                var e = o(this);
                window.focusDelay = setTimeout(function() {
                        var t = e.parents(".selector-group").attr("data-view-selector");
                        if (t = xi(t, !0, !0, !0, !0), "*" == t.trim()) return !1;
                        var a = Ca(t, !0, !1, !1);
                        return !1 != a && void st(a)
                }, 200)
        }), o(document).on("click", ".source-view", function() {
                var e = o(this).text().replace(/.css/g, "");
                window.disable_auto_insert = !0, !1 == window.ypData["wyp-css-ed-act"] && o(".css-editor-btn").trigger("click"), window
                        .sourceViewClick = !0, o("#c-t-list li[data-value='" + e + "']").trigger("click"), window.sourceViewClick = !1;
                var t = Et(!0, null, !0);
                window.disable_auto_insert = !1;
                var a = o(this).parents(".selector-group"),
                        i = a.attr("data-view-selector") + "{",
                        s = a.attr("data-view-size");
                "desktop" != s && (i = "\t" + a.attr("data-view-selector") + "{");
                var r = t.split(i)[0],
                        l = r.split(/\r\n|\r|\n/).length;
                setTimeout(function() {
                        n.focus(), n.scrollToLine(l, !0, !1), "desktop" == s ? n.gotoLine(l, 0, !0) : n.gotoLine(l, 1, !
                                0)
                }, 4)
        }), o(document).on("blur", ".css-rule-view .value-input", function(t) {
                var e = o(this),
                        i = e.parents(".css-rule-view"),
                        n = e.parents(".selector-group"),
                        s = e.val(),
                        l = e.prev();
                e.hide(), e.removeClass("rule-was-disable"), l.parent().find(".rule-end").removeAttr("style"), s = s.replace(/\;$/i,
                        ""), 0 == s.length && (s = "disable"), "disable" == s && !1 == i.hasClass("view-rule-disabled") && (1 == e
                                .parents(".selector-group").find(".css-rule-view").length ? (e.parents(".selector-group").css(
                                                "background-color", "#A43A3A"), e.parents(".selector-group").delay(100).slideUp(300),
                                        setTimeout(function() {
                                                e.parents(".selector-group").remove()
                                        }, 420)) : (e.parents(".css-rule-view").css("background-color", "#A43A3A").delay(80).slideUp(
                                        200), setTimeout(function() {
                                        e.parents(".css-rule-view").remove()
                                }, 300)));
                var d = n.attr("data-view-selector"),
                        p = n.attr("data-view-size"),
                        m = n.attr("data-view-type"),
                        f = i.attr("data-view-rule"),
                        g = s.trim();
                if (0 == s.length) return l.show(), !0;
                if (s == l.text() && !1 == i.hasClass("view-rule-disabled")) return l.show(), !0;
                !1 == i.hasClass("view-rule-disabled") ? l.text(s).show() : l.show(), t.originalEvent && i.find(".css-rule-label input")
                        .prop("checked", !0), Mt(), r(u(a(m, !1), "[selector=" + gi(d) + "][rule=" + f + "][msize=" + p + "]"), m), r(u(
                                a(m, !1), "[selector=" + gi(d) + "][rule=" + h(f) + "][msize=" + p + "]"), m), window.editedByReview = !
                        0;
                var y = null,
                        w, v, b, x;
                w = n.find(".css-rule-view:not(.view-rule-disabled)").not(i).first(), 0 < w.length && (v = w.attr("data-view-rule"), y =
                        c(a(m, !1), "[selector=" + gi(d) + "][rule=" + v + "][msize=" + p + "]"), b = w.prevAll(
                                ".css-rule-view:not(.view-rule-disabled)").length, x = i.prevAll(
                                ".css-rule-view:not(.view-rule-disabled)").length, x >= b && (y += x - b)), tt(d, f, g, "", p,
                        m, y), Mi(), window.editedByReview = !1
        }), o(document).on("keyup", ".css-rule-view .value-input", function(t) {
                var e = t.keyCode || t.which,
                        a = o(this),
                        i = a.parents(".css-rule-view"),
                        n = a.parents(".selector-group"),
                        s = a.val(),
                        r = a.prev(),
                        l = i.attr("data-view-rule");
                if (Mt(), 13 == e) return i.find(".css-rule-label input").prop("checked", !0), a.trigger("blur"), !1;
                if (27 == e) return a.val(r.text()), a.hasClass("rule-was-disable") && (i.addClass("view-rule-disabled"), a.removeClass(
                        "rule-was-disable")), a.trigger("blur"), !1;
                var d = n.attr("data-view-selector"),
                        p = n.attr("data-view-size"),
                        c = s.replace(/\;$/i, "").trim();
                return 0 == s.length || void Bt(d, l, c, p)
        }), o("#vsl-css-co").on("scroll", o.throttle(function() {
                0 < o(this).scrollTop() ? o("#vsl-css-vi").addClass("view-scrolled") : o("#vsl-css-vi").removeClass(
                        "view-scrolled")
        }, 48));
        var zn = "";
        o(document).on("keyup keydown", "#visual-rule-filter", function() {
                var e = null,
                        t, a, i, n, s, r;
                t = o(this), a = t.val().toLowerCase().trim(), i = o("#vsl-css-co"), n = i.find(".selector-group"), "matched" == a && o(
                                ".selector-group.active").removeClass("active").removeClass("active-view-group"), 0 < a.length && zn !=
                        a && i.scrollTop(0), zn = a, C() && (e = _a()), n.each(function() {
                                s = o(this), "single.css" == a || "template.css" == a || "global.css" == a ? s.attr(
                                                "data-view-type").toLowerCase() == a.replace(/\.css/g, "").trim() ? s.addClass(
                                                "selector-group-visible") : s.removeClass("selector-group-visible") :
                                        "matched" == a ? "matched" == a && null != e ? (r = Ca(s.attr("data-clean-selector"), !
                                                        0, !1, !1), !1 == r ? s.removeClass("selector-group-visible") : r
                                                .hasClass("wyp-selected") ? s.addClass("selector-group-visible") : s
                                                .removeClass("selector-group-visible")) : s.removeClass(
                                                "selector-group-visible") : -1 == s.text().toLowerCase().indexOf(a.trim()) ? s
                                        .removeClass("selector-group-visible") : s.addClass("selector-group-visible")
                        }), 0 == o(".selector-group-visible").length ? (o("#view-no-item span").removeClass("view-hand-icon"),
                                "matched" == a ? C() ? o("#view-no-item p").text(qi.manager_msg1) : (o("#view-no-item span").addClass(
                                        "view-hand-icon"), o("#view-no-item p").text(qi.manager_msg2)) : "single.css" == a ? o(
                                        "#view-no-item p").text(qi.manager_msg3) : "template.css" == a ? o("#view-no-item p").text(qi
                                        .manager_msg4) : "global.css" == a ? o("#view-no-item p").text(qi.manager_msg5) : -1 != a
                                .indexOf("(max-width:") || -1 != a.indexOf("(max-width:") ? o("#view-no-item p").text(qi.manager_msg6) :
                                "" == a ? o("#view-no-item p").text(qi.manager_msg8) : o("#view-no-item p").text(qi.manager_msg7), o(
                                        "#view-no-item").show(), o(".view-information").text("").hide()) : (o("#view-no-item").hide(),
                                "" == a ? o(".view-information").text(qi.manager_msg9).show() : "matched" == a ? o(".view-information")
                                .text(qi.manager_msg10).show() : "single.css" == a ? o(".view-information").text(qi.manager_msg11)
                                .show() : "template.css" == a ? o(".view-information").text(qi.manager_msg12).show() : "global.css" ==
                                a ? o(".view-information").text(qi.manager_msg13).show() : -1 != a.indexOf("(max-width:") || -1 != a
                                .indexOf("(min-width:") ? o(".view-information").text(qi.manager_msg14).show() : 0 < a.length ? o(
                                        ".view-information").text(qi.manager_msg16).show() : o(".view-information").text("").hide()),
                        Pt()
        }), o(".wyp-button-manage").click(function() {
                Rt(), o("#visual-rule-filter").trigger("keyup")
        }), o(".visual-manager-close").click(function() {
                It()
        }), o(document).on("mouseenter mouseover",
                ".wyp-contextmenu-reset-single-childs,.wyp-contextmenu-reset-template-childs,.wyp-contextmenu-reset-global-childs",
                function() {
                        var e = o(this).attr("class").match(/wyp-contextmenu-reset-(.*?)-childs/g)[0].replace(
                                        /(wyp-contextmenu-reset-|-childs)/g, "").trim(),
                                t = Nt(e).selectors,
                                a = [];
                        if (!1 != t && null != t && 0 < t.length) {
                                for (var n = 0, s, r; n < t.length; n++)(s = xi(t[n], !0, !0, !0, !0), r = Ca(s, !0, !1, !1), !1 != r) && 0 < Gi
                                        .find(s).parents(".wyp-selected").length && -1 == a.indexOf(s) && a.push(s);
                                0 < a.length && st(Gi.find(a.join(",")))
                        }
                }), o(document).on("mouseleave mouseout",
                ".wyp-contextmenu-reset-single-childs,.wyp-contextmenu-reset-template-childs,.wyp-contextmenu-reset-global-childs",
                function() {
                        sn.extra.find(".wyp-el-viewer").remove()
                }), o("#background-image-group .di-btn").click(function(t) {
                t.originalEvent && (o("#background-image-group .wyp-background-image-show").toggle(), ut())
        }), o("#box-shadow-inset-group .di-btn").click(function(t) {
                t.originalEvent && (o("#box-shadow-inset-inset").parent().removeClass("active"), o("#box-shadow-inset-no").parent()
                        .addClass("active"))
        }), o(document).on("keyup change", ".this-grid-input", function() {
                var e = o(this).parents(".gr-bu-ar");
                la(e)
        }), o(document).on("change", ".grid-format", function() {
                var e = o(this),
                        t = e.parent().parent().find(".this-grid-input"),
                        a = e.val();
                "auto" == a ? t.val("").prop("disabled", !0) : (t.prop("disabled", !1), "" == t.val() && ("fr" == a && t.val(1), "%" ==
                        a && t.val(10)));
                var i = e.parents(".gr-bu-ar");
                la(i)
        }), o(document).on("click", ".grid-builder-add-new", function() {
                var e = o(this),
                        t = e.parents(".gr-bu-ar"),
                        a = e.parents(".op-g").attr("data-css"),
                        n = t.find(".this-grid").length + 1,
                        i = "Row";
                "grid-template-columns" == a && (i = "Column"), o(this).before(
                        "<div class=\"this-grid\"><input class=\"this-grid-input\" placeholder=\"auto\" type=\"number\" min=\"1\" value=\"1\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\"><div class=\"grid-format-div\"><select class=\"grid-format\"><option value=\"fr\" selected>fr</option><option value=\"%\">%</option><option value=\"px\">px</option><option value=\"auto\">auto</option></select></div><span class=\"yicon icon-no-alt delete-grid\"></span></div>"
                        ), o(".last-grid").removeClass("last-grid"), la(t)
        }), o(document).on("click", ".delete-grid", function() {
                var e = o(this).parents(".gr-bu-ar"),
                        t = o(this).parents(".op-g").attr("data-css");
                o(this).parent().remove(), la(e), pa(t)
        }), o(".gr-o .gr-bu-in").on("keyup", function() {
                var e, t, a, i;
                e = o(this), t = e.parent().parent(), i = t.attr("data-css"), a = e.val(), window.lastEditID = i, tt(null, i, a, ""),
                        Mi()
        }), o("#include-webfont-label input").on("change", function() {
                o(this).is(":checked") ? tt(null, "--google-webfont", "disable") : tt(null, "--google-webfont", "no-include"), Mi()
        }), o("#include-webfont-label").on("mouseout", function() {
                o("#include-webfont-label").tooltip("hide")
        });
        var On;
        window.cachedCSS = void 0, window.validUnits = ["px", "%", "em", "rem", "vh", "vw", "cm", "ex", "in", "mm", "pc", "pt", "ch", "vmin", "vmax",
                "ms", "s", "deg", ""
        ];
        var Dn = ["(current-menu-item|post|hentry|widget|wp-post-image|comment-author-admin|next|prev|product|footer|footer-top|footer-bottom|header|navbar|sidebar|masthead|copyright|menu-item|form-control|row_inner|wpDataTable|ls-wrapper|x-column)",
                        "active(!singleInspector)", "current(!singleInspector)", "(entry|article|post|page|item|widget)([-_])?title",
                        "(entry|article|post|page|item|widget)([-_])?content", "(entry|article|post|page|item|widget)([-_])?meta",
                        "([a-zA-Z0-9_-]+)?item"
                ],
                An = ["([a-zA-Z0-9_-]+)?(infinite|bounce|pulse|rubberBand|shake|headShake|swing|wobble|jello|hinge|fade)([a-zA-Z0-9_-]+)?",
                        "(([a-zA-Z0-9_-]+)?([-_]flash|flash[-_]|[-_]flash[-_])([a-zA-Z0-9_-]+)?|flash)",
                        "(([a-zA-Z0-9_-]+)?([-_]tada|tada[-_]|[-_]tada[-_])([a-zA-Z0-9_-]+)?|tada)",
                        "([a-zA-Z0-9_-]+)?slide([a-zA-Z0-9_-]+)?(in|out)([a-zA-Z0-9_-]+)?(up|down|left|right)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)?(roll|fall|flip|lightSpeed|rotate|zoom)([a-zA-Z0-9_-]+)?(in|out|up|down|left|right)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)?(publish|draft|pending|private|trash)([a-zA-Z0-9_-]+)?",
                        "(standard|aside|audio|chat|gallery|image|link|quote|status|video)",
                        "([a-zA-Z0-9_-]+)?([-_]drag[-_]|drag[-_]|[-_]drag|active-slide|current-slide|selected-slide|slide-active|slide-current|slide-selected|draggable|sortable|dismissable|flippable|clickable|focus|viewport|ltr|inherit|relative|absolute|transparent|visibility|spaced|hidden|hideresize|cloned|status|clean|clr|clfw|ready|validate|false|true|loading|loaded|added|move|moving|finished|delay|enabled|disabled|bold|italic|initialised|even|odd|underlined|gutter|animation|animating|animate|transition|repeat|cursor|pointer|uppercase|lowecase|all-caps|capitalize|padding|margin|padded|[_-])(to|from)([_-])(top|left|right|bottom)([a-zA-Z0-9_-]+)?",
                        "((?!n2)([a-zA-Z0-9_-]+)hover([_-])([a-zA-Z0-9]+)?|hover|hover([_-])([a-zA-Z0-9]+)?|(?!n2)([a-zA-Z0-9_-]+)hover|hovered)",
                        "(?!n2)([a-zA-Z0-9_-]+)[-_]font([a-zA-Z0-9_-]+)?", "currency([a-zA-Z0-9_-]+)?",
                        "(lang|language|translate)([-_])([a-zA-Z0-9_-]+)?", "([_-]?)([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3}|rgba|rgb)([_-]?)?",
                        "([a-zA-Z0-9_-]+)?rand",
                        "([a-zA-Z0-9_-]+)?(mrg|pdg|m|p|pad|mar|margin|pading|padng|mrn)([-_])(t|r|b|l|btm|top|left|right|tp|lft|rght|bottom)([-_])([a-zA-Z0-9_-]+)",
                        "is([_-])([a-zA-Z0-9_-]+)?", "([a-zA-Z0-9_-]+)none", "([a-zA-Z0-9_-]+)?with([_-])([a-zA-Z0-9]+)",
                        "(display[-_]?block|display[-_]?inline|display[-_]?inline[-_]?block)",
                        "(bottom|top|left|right|center|align|middle|up|down)[-_](bottom|top|left|right|center|align|middle|up|down)",
                        "(bottom|top|left|right|center|align|middle|up|down)[-_](bottom|top|left|right|center|align|middle|up|down)[-_](bottom|top|left|right|center|align|middle|up|down)",
                        "(not|no)([_-])([a-zA-Z0-9_-]+)?",
                        "(roboto|lato|montserrat|slabo|raleway|merriweather|poppins|lora|titillium[-_]?web|muli|arimo)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)[-_](serif|sans|display|monospace|webfont)([a-zA-Z0-9_-]+)?", "page([_-])item",
                        "([a-zA-Z0-9_-]+)?object([_-])page", "([a-zA-Z0-9_-]+)?closed", "thread([_-])alt",
                        "([a-zA-Z0-9_-]+)?([_-])has([_-])?([a-zA-Z0-9_-]+)|([a-zA-Z0-9_-]+)?([_-])?has([_-])([a-zA-Z0-9_-]+)",
                        "screen([_-])reader([_-])text", "tag-link([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)?(internet([-_])?explorer|opera|firefox|safari|chrome|product_tag|product_cat)([a-zA-Z0-9_-]+)?",
                        "calculated_shipping", "woocommerce-MyAccount-navigation-link--([a-zA-Z0-9_-]+)?",
                        "(img-responsive|ls-active|disappear|appear|noSwipe|wow|bootstrap-touchspin-down|section--no|cat-item|kc-elm|kc_column|selected|alternate_color|open-mega-a|sf-menu|sf-arrows|ajax|neg-marg|lazy|lazyload|lazy-img|text-shadow-small|full|sort|elementor-column-gap-no|n2-ow|et_pb_css_mix_blend_mode_passthrough|filterall|notranslate|vce|bordb|master-slider-parent|ms-sl-selected|non-hundred-percent-height-scrolling|hundred-percent-fullwidth|post-no-media|ie|form-label-above)",
                        "([a-zA-Z0-9_-]+)?((syle|style)-default|nojquery|js-comp-ver|wpb-js-composer|disable-responsive-headings|ut-vc-|default([-_])template|ga-track|raw([-_])code|raw([-_])html|withbg|bg([-_])layout)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)?-shd", "([a-zA-Z0-9_-]+)?video-aspect-ratio-([a-zA-Z0-9_-]+)", "([a-zA-Z0-9_-]+)?([-_])spacing([-_])(no|yes)",
                        "n2-(ow|ss)-(all|desktop|mobile|tablet)", "([a-zA-Z0-9_-]+)?show-dropdown", "page-section-[a-zA-Z0-9]{13,13}"
                ],
                Sn = ["([a-zA-Z0-9_-]+)([_-])", "([_-])([a-zA-Z0-9_-]+)",
                        "([a-zA-Z0-9_-]+)?([_-])([_-]|tag|category|cat)([_-]|format)([a-zA-Z0-9_-]+)?", "menu([_-])item([_-])type([_-])post([_-])type",
                        "menu([_-])item([_-])object([_-])page", "menu([_-])item([_-])(object|type)([_-])custom", "widget_([a-zA-Z0-9_-]+)",
                        "bg([-_])([a-zA-Z0-9_-]+)", "([a-zA-Z0-9_-]+)?([_-])(l|m|s|xs)([_-])[0-9]+",
                        "([a-zA-Z0-9_-]+)?pure([_-])([a-zA-Z0-9_-]+)?([_-])u([_-])[0-9]+([_-])[0-9]+",
                        "([a-zA-Z0-9_-]+)?col([_-])([a-zA-Z0-9_-]+)?([_-])[0-9]+",
                        "([a-zA-Z0-9_-]+)?col([_-])([a-zA-Z0-9_-]+)?([_-])offset([_-])[0-9]+", "([a-zA-Z0-9_-]+)?(medium|large|small)([_-])[0-9]+",
                        "([a-zA-Z0-9_-]+)?(medium|large|small)([_-])([a-zA-Z0-9_-]+)?([_-])[0-9]+",
                        "(start|end|center|between)([_-])(xs|s|m|l|xl|xsmall|small|medium|large|xlarge)",
                        "(xs|s|m|l|xl|xsmall|small|medium|large|xlarge)([_-])(start|end|center|between)",
                        "([a-zA-Z0-9_-]+)?(small|medium|large)([_-])(push|pull)([_-])[0-9]+", "([a-zA-Z0-9_-]+)?span([_-])?[0-9]+",
                        "([a-zA-Z0-9_-]+)?col([_-])[0-9]+([_-])[0-9]+", "([a-zA-Z0-9_-]+)?col([_-])[0-9]+", "(column|columns|col)",
                        "([a-zA-Z0-9_-]+)(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)?(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)([a-zA-Z0-9_-]+)",
                        "([a-zA-Z0-9_-]+)?(sticky|fixed|logged|print|visible|trigger|required)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)?pull([a-zA-Z0-9_-]+)(left|right)", "(left|right)",
                        "([a-zA-Z0-9_-]+)?([_-])(yes|no)([_-]|yes|no)([_-]|([_-])(yes|no)[_-]|is([_-])active|clearfix|clear)([a-zA-Z0-9_-]+)?",
                        "(xsmall|x?[-_]small|small|large|medium|huge|normal)",
                        "([a-zA-Z0-9_-]+)?(background|width|height|position|parent|color|layout|invert|scroll|equal|square|([_-])skin|skin([_-])|toggled|style([0-9_-]+)|rounded|radius|type|dynamic|row|border|align|dimension|inline-inside|corner-pointed|float|last-child|first-child|hide|show|parallax|responsive|intense|completed|with_ajax|no-sibling)([a-zA-Z0-9_-]+)?",
                        "(?!n2-)([a-zA-Z0-9_-]+)style([a-zA-Z0-9_-]+)?", "([a-zA-Z0-9_-]+)?first", "([a-zA-Z0-9_-]+)?last",
                        "([a-zA-Z0-9_-]+)?text([_-])justify", "([a-zA-Z0-9_-]+)?effect([0-9_-]+)",
                        "([a-zA-Z0-9_-]+)?(round|scale|shadow|rotate|default|minimal|anim|pos[-_]align|angled)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)([_-])(on|off)", "([a-zA-Z0-9_-]+)(size|mobile|desktop|populated)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)?(blue|black|red|white|light|green|yellow|purple|pink|orange|brown|gray)([a-zA-Z0-9_-]+)?",
                        "([a-zA-Z0-9_-]+)?(black|dark|white|light)([a-zA-Z0-9_-]+)?", "([a-zA-Z0-9_-]+)([_-])only",
                        "([a-zA-Z0-9_-]+)?(text-left|text-center|text-right)([a-zA-Z0-9_-]+)?",
                        "(unyson-page|end|larger|smaller|height-full|created_group|mini|activity_update|forge-block|forge-|elementor-section-items-middle|themify_builder|module|dslc-post-no-thumb|downloadable|purchasable|instock|above|open|template-page|alpha|units|flex_column_div|woocommerce|affix-top|st-menu|circle|vc_figure|vc_general|waves-effect|collapsed|collapse)"
                ],
                Tn = ["([a-zA-Z0-9_-]+)?(inner|overlay|container|google-fonts|fl-col-content)([a-zA-Z0-9_-]+)?",
                        "elementor([a-zA-Z0-9_-]+)?(column|gap|wide|wrap)([a-zA-Z0-9_-]+)?", "ms-([a-zA-Z0-9_-]+)-view",
                        "(kc-wrap-columns|dslc-modules-section-wrapper|av-content-full|ninja-forms-form-wrap|nf-fields-wrap|nf-field-element|tp-tab-mask|n2-ss-section-outer|sp-mask|sp-grab|ms-slide-layers|ls-layers|snp-fb|form_sublabel_below|gform_body)"
                ];
        Tn = Tn.concat(An), Tn = Tn.concat(Sn);
        var En = ["([a-zA-Z0-9_-]+)?(wpcf7|mc4wp)([a-zA-Z0-9_-]+)?"],
                Ln = ["([a-zA-Z0-9_-]+)?page([_-])item([_-])([0-9]+)", "(vc_|vc-)(.*?)(_|-)[a-zA-Z-0-9]{22,22}", "themify_builder_content-([0-9]+)",
                        "themify_builder_([0-9]+)_row", "tb_([0-9]+)_column", "et_pb_image_([0-9]+)",
                        "([a-zA-Z0-9_-]+)?(post|page|portfolio|product|work|port|form|video)([_-])([0-9]+)",
                        "([a-zA-Z0-9_-]+)?(post|page|portfolio|product|work|port|form|video)([_-])(entry|item|id)([_-])([0-9]+)", "([0-9])+(px|em|rem)",
                        "([a-zA-Z0-9_-]+)?wishlist-([0-9])+", "wpbs-bookable-([0-9])+", "wpbs-day-([0-9])+", "([a-zA-Z0-9_-]+)?rand-([0-9])+",
                        "([a-zA-Z0-9_-]+)?(([-_])ie|ie8|ie9|ie10|ie11)", "testimonials-items-([a-zA-Z0-9_-]+)", "instance-([0-9]+)"
                ],
                Bn = ["wp-image-[0-9]+", "([a-zA-Z0-9_-]+)?(section|slide|button|image|row)([a-zA-Z0-9_-]+)?", "gb-container-([a-zA-Z0-9_-]+)?",
                        "wp-container-[0-9]+", "wp-elements-[0-9]+", "vc_custom_([a-zA-Z0-9_-]+)?", "fl-node([a-zA-Z0-9_-]+)?",
                        "fl-row([a-zA-Z0-9_-]+)?", "module_row_([0-9]+)", "module_column_([0-9]+)", "et_pb_(section|row)_[0-9]+", "kc-css-([0-9]+)",
                        "forge-col[0-9]+", "(avia|av)-builder-el-([0-9]+)", "footer-([0-9]+)", "(n2-font-|n2-style-)([a-zA-Z0-9_-]+)?",
                        "n2-ss-([0-9]+)item([0-9]+)", "n-uc-([a-zA-Z0-9_-]+)", "ms-parent-id-([0-9_-]+)", "msp-cn-([a-zA-Z0-9_-]+)", "e([0-9-]+)",
                        "td_module_([0-9]+)", "cp_id_([a-zA-Z0-9_-]+)", "snp-pop-([0-9]+)", "dsgn__basic-([0-9]+)", "td_block_([0-9]+)",
                        "weforms-([0-9]+)", "fusion-builder-row-([0-9]+)"
                ],
                Mn = ["([a-zA-Z0-9_-]+)?(module|slide|section|row|layout|form|wrapper|container|parallax|block)([a-zA-Z0-9_-]+)?",
                        "layers-widget-([a-zA-Z0-9_-]+)?", "builder-module-([a-zA-Z0-9_-]+)?", "pg-([a-zA-Z0-9_-]+)?", "ptpb_s([a-zA-Z0-9_-]+)?",
                        "billing_address_([0-9])([a-zA-Z0-9_-]+)?", "el-([a-zA-Z0-9_-]+)", "dslc-module-([a-zA-Z0-9_-]+)",
                        "module-([0-9]){13,13}-([0-9]){4,4}", "wrapper-([0-9]){13,13}-([0-9]){4,4}", "eluid([a-zA-Z0-9_-]+)", "nf-form-([0-9]+)-cont",
                        "nf-field-([0-9]+)-wrap", "ulp-inline-([a-zA-Z0-9_-]+)?", "ulp-layer-([a-zA-Z0-9_-]+)?", "ulp-([a-zA-Z0-9_-]+)?",
                        "esg-grid-([0-9]+)-([0-9]+)", "snp-bld-step-([0-9]+)", "snp-bld-step-([0-9]+)-el-([0-9]+)", "snppopup-content-([0-9]+)",
                        "gform_([0-9]+)"
                ],
                Zn = ["widget", "recentcomments", "fws_([a-zA-Z0-9_-]+)", "rps_([a-zA-Z0-9_-]+)", "wrapper-[a-zA-Z-0-9]{16,16}",
                        "search-form-[a-zA-Z0-9]{13,13}", "fullwidth-block-[a-zA-Z0-9]{13,13}", "nf-field-([0-9]+)-container", "phantom",
                        "wpforms-([0-9]+)-field_([0-9]+)([a-zA-Z0-9_-]+)?(!singleInspector)",
                        "input_([0-9]+)_([0-9]+)_([0-9]+)_container(!singleInspector)", "gform_fields_([0-9]+)"
                ],
                Pn = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "img", "strong", "a", "li", "i", "ul", "header", "footer", "article", "b", "em",
                        "code", "form", "label", "ol", "small", "blockquote", "nav"
                ];
        window.YP = window.YP || {};
        window.YP.Tn = Tn;
        window.YP.Pn = Pn;
        window.reGetBestClass = !1, o(".wyp-navigation-btn").on("click", function() {
                var e = o(this);
                if (e.hasClass("active")) {
                        var t = Ta(Ki.not("head"), !0);
                        o("#layer-tree-title").after(t), tn.addClass("wyp-nvgtn-act"), C() ? Ba() : o("#layer-tree-ul").children("li")
                                .first().find(".icon-arrow-down").trigger("click"), tn.hasClass("wyp-fix-leftbar") ? o(
                                        ".css-editor-btn.active").trigger("click") : window.ypData["wyp-css-ed-drgable"] && o(
                                        ".css-editor-btn.active").trigger("click"), o(".info-btn.active").trigger("click")
                } else o("#layer-tree-ul").remove(), tn.removeClass("wyp-nvgtn-act");
                N(), C() && Ze()
        }), tn.on("click", "#layer-tree", function(e) {
                window.triggedByNav = !0;
                var t = o(e.target),
                        a = o(this),
                        i = t.parents("li").first(),
                        n;
                if (t.hasClass("icon-arrow-down") && i.hasClass("has-children") && (i.toggleClass("active"), i.children("ul").remove(),
                                i.hasClass("active") && (n = Ta(La(i), !1), i.append(n))), (t.hasClass("layer-tree-title") || t
                                .hasClass("layer-tree-wrap")) && (a.find(".selected").removeClass("selected"), At(), !i.hasClass(
                                "selected"))) {
                        "cursor" === window.ypData.inspector && (o(".inspector-sublist-default").trigger("click"), window.ypData
                                        .inspector = "default", o(".inspector-sublist").css("display", "none")), i.addClass("selected"),
                                n = La(i);
                        var s = Ma(n);
                        L(s), Q(s, n, !1), ce()
                }
                window.triggedByNav = !1
        });
        var Rn = 0,
                In = 0,
                Yn = 0;
        o(document).on("click", ".view-media-line", function() {
                var e = o(this).parents(".selector-group").attr("data-view-size"),
                        t = Ga(e),
                        a = Pe(e),
                        i = "max-width";
                if (-1 != e.indexOf("and")) return o(this).css("cursor", "default"), !1;
                if (window.resizedByPropertySize = !0, "desktop" != e) {
                        0 < o(".wyp-responsive-btn.active").length && o(".wyp-responsive-btn").trigger("click");
                        var n = Ya(a);
                        !1 !== n && -1 === n.indexOf(",") && (-1 !== n.indexOf("<") && 0 == o(".breakpoint-bar .max-width").length && (
                                        o(".media-control").trigger("click"), o(".media-control").tooltip("hide")), -1 !== n
                                .indexOf(">") && (0 == o(".breakpoint-bar .min-width").length && (o(".media-control").trigger(
                                        "click"), o(".media-control").tooltip("hide")), i = "min-width"), Ja(o(
                                        ".breakpoint-bar > ." + i + "[data-breakpoint='" + parseInt(mi(t)) + "']")))
                } else 0 == o(".wyp-responsive-btn.active").length && o(".wyp-responsive-btn").trigger("click");
                setTimeout(function() {
                        window.resizedByPropertySize = !1, We(200), setTimeout(function() {
                                He(200)
                        }, 1500)
                }, window.YellowDelay)
        }), o(document).on("click", ".mo-i", function() {
                var e = o(this);
                e.toggleClass("active");
                var t = e.parents(".property-responsive");
                $a(t.attr("data-css"));
                var a = o("#property-responsive-menu");
                e.hasClass("active") ? (a.addClass("responsive-menu-open"), tn.addClass("property-responsive-open"), W({
                        index: 2147483646,
                        container: ".ed-pnl",
                        custom_class: "fake-layer-responsive",
                        callback: function() {
                                Qa()
                        }
                }), Ka(), sa()) : o("#fake-layer").trigger("click")
        }), o(document).on("click", ".pr-res-ite .icon-no-alt", function() {
                var e = o(".mo-i.active").parents(".op-g").attr("data-css"),
                        t = o(this).parent().attr("data-insert-media");
                return tt(null, e, "disable", null, t), Mi(), o(this).parent(".pr-res-ite").addClass("hided").hide(), 0 == o(this)
                        .parent().parent().find(".pr-res-ite:not(.hided)").not("[data-info='-']").length ? (o("#" + e + "-group")
                                .removeClass("property-responsive"), tn.removeClass("node-has-other-screen-edits"), tn.removeAttr(
                                        "node-edits-screen"), Qa()) : Ka(), !1
        }), o(document).on("click", ".pr-res-ite", function() {
                var e = o(this),
                        t = e.attr("data-responsive-size"),
                        a = Ga(t),
                        i = "max-width";
                window.resizedByPropertySize = !0, !1 !== t && "all" != t ? (0 < o(".wyp-responsive-btn.active").length && o(
                                ".wyp-responsive-btn").trigger("click"), -1 === t.indexOf(",") && (-1 != t.indexOf("<") && 0 ==
                                o(".breakpoint-bar .max-width").length && (o(".media-control").trigger("click"), o(
                                        ".media-control").tooltip("hide")), -1 != t.indexOf(">") && (0 == o(
                                        ".breakpoint-bar .min-width").length && (o(".media-control").trigger("click"),
                                        o(".media-control").tooltip("hide")), i = "min-width"), Ja(o(".breakpoint-bar > ." + i +
                                        "[data-breakpoint='" + parseInt(a) + "']")))) : 0 == o(".wyp-responsive-btn.active").length &&
                        o(".wyp-responsive-btn").trigger("click"), setTimeout(function() {
                                window.resizedByPropertySize = !1, We(200), setTimeout(function() {
                                        He(200)
                                }, 1500)
                        }, window.YellowDelay), Qa()
        }), window.scrollbar_width_cache = void 0, window.drag = {
                active: !1,
                currentX: 0,
                currentY: 0,
                initialX: 0,
                initialY: 0,
                xOffset: 0,
                yOffset: 0,
                scrollY: 0,
                scrollX: 0
        };
        var Nn;
        an.body.addEventListener("mousemove", o.throttle(function(a) {
                        window.drag.active && (clearTimeout(Nn), Nn = setTimeout(function() {
                                a.preventDefault();
                                var e = parseFloat(Ji.scrollTop() + Ki.scrollTop()) - window.drag.scrollY,
                                        i = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()) - window.drag.scrollX;
                                window.drag.currentX = a.clientX - window.drag.initialX + i, window.drag
                                        .currentY = a.clientY - window.drag.initialY + e, window.drag.xOffset =
                                        window.drag.currentX, window.drag.yOffset = window.drag.currentY, Ji
                                        .find("#wyp-drag-style").remove(), Ji.append(
                                                "<style id='wyp-drag-style'>html body.wyp-con-slcd.wyp-dragging .wyp-selected{transform: translatex(" +
                                                window.drag.currentX + "px) translatey(" + window.drag
                                                .currentY + "px) !important;}</style>");
                                var n = Pa(),
                                        s = window.drag.item.offset(),
                                        o = s.top + n.top,
                                        r = s.left + n.left,
                                        l = 6,
                                        t, d, p, u, m, g, h, y, w, v, b, x;
                                Ia(".wyp-selected", "wyp-selected-boxed");
                                var _ = window.drag.item.outerWidth(),
                                        k = Math.round(parseFloat(sn.active.find(".wyp-selected-boxed-top").css(
                                                "top"))),
                                        C = Math.round(parseFloat(sn.active.find(".wyp-selected-boxed-left")
                                                .css("left"))),
                                        z = Math.round(parseFloat(sn.active.find(".wyp-selected-boxed-right")
                                                .css("left"))),
                                        O = Math.round(parseFloat(sn.active.find(".wyp-selected-boxed-bottom")
                                                .css("top"))),
                                        D = z - C,
                                        A = O - k,
                                        S = window.drag.item.css(["margin-top", "margin-left"]),
                                        T = parseFloat(S["margin-top"]),
                                        E = parseFloat(S["margin-left"]),
                                        L = Ji.find(".wyp-y-distance-border"),
                                        B = Ji.find(".wyp-x-distance-border");
                                B.css("display", "none"), L.css("display", "none");
                                var M = Ji.find(".wyp-smrt-gd-el[data-wyp-bottom-round='" + ci(O) + "']");
                                M = M.add(Ji.find(".wyp-smrt-gd-el[data-wyp-top-round='" + ci(k) + "']")), M = M
                                        .add(Ji.find(".wyp-smrt-gd-el[data-wyp-top-round='" + ci(O) + "']")),
                                        M = M.add(Ji.find(".wyp-smrt-gd-el[data-wyp-bottom-round='" + ci(k) +
                                                "']")), 0 < M.length && (h = parseFloat(M.attr("data-wyp-top")),
                                                y = parseFloat(M.attr("data-wyp-left")), w = parseFloat(M.attr(
                                                        "data-wyp-width")), v = parseFloat(M.attr(
                                                        "data-wyp-height")), b = parseFloat(h + v), x =
                                                parseFloat(y + w), C > y ? (p = y, u = z - y) : (p = C, u = x -
                                                        C), M.attr("data-wyp-top-round") == ci(k) && (m = h), M
                                                .attr("data-wyp-bottom-round") == ci(O) && (m = b), M.attr(
                                                        "data-wyp-bottom-round") == ci(k) && (m = b), M.attr(
                                                        "data-wyp-top-round") == ci(O) && (m = h), t = o + T -
                                                h, t < l && t > -Math.abs(l) && (d = Math.round(h - k + window
                                                                .drag.currentY), window.drag.currentY = d, B
                                                        .css({
                                                                transform: "translate3d(" + p + "px, " +
                                                                        m + "px, 0)",
                                                                width: u,
                                                                display: "block"
                                                        })), t = o + T - b + A, t < l && t > -Math.abs(l) && (
                                                        d = Math.round(b - O + window.drag.currentY), window
                                                        .drag.currentY = d, B.css({
                                                                transform: "translate3d(" + p + "px, " +
                                                                        m + "px, 0)",
                                                                width: u,
                                                                display: "block"
                                                        })), t = o + T - h + A, t < l && t > -Math.abs(l) && (
                                                        d = Math.round(h - O + window.drag.currentY), window
                                                        .drag.currentY = d, B.css({
                                                                transform: "translate3d(" + p + "px, " +
                                                                        m + "px, 0)",
                                                                width: u,
                                                                display: "block"
                                                        })), t = o + T - b, t < l && t > -Math.abs(l) && (d =
                                                        Math.round(b - k + window.drag.currentY), window.drag
                                                        .currentY = d, B.css({
                                                                transform: "translate3d(" + p + "px, " +
                                                                        m + "px, 0)",
                                                                width: u,
                                                                display: "block"
                                                        })));
                                var Z = Ji.find(".wyp-smrt-gd-el[data-wyp-right-round='" + ci(z) + "']");
                                Z = Z.add(Ji.find(".wyp-smrt-gd-el[data-wyp-left-round='" + ci(C) + "']")), Z =
                                        Z.add(Ji.find(".wyp-smrt-gd-el[data-wyp-left-round='" + ci(z) + "']")),
                                        Z = Z.add(Ji.find(".wyp-smrt-gd-el[data-wyp-right-round='" + ci(C) +
                                                "']")), 0 < Z.length && (h = parseFloat(Z.attr("data-wyp-top")),
                                                y = parseFloat(Z.attr("data-wyp-left")), w = parseFloat(Z.attr(
                                                        "data-wyp-width")), v = parseFloat(Z.attr(
                                                        "data-wyp-height")), b = parseFloat(h + v), x =
                                                parseFloat(y + w), k > h ? (m = h, g = O - h) : (m = k, g = b -
                                                        k), Z.attr("data-wyp-left-round") == ci(C) && (p = y), Z
                                                .attr("data-wyp-right-round") == ci(z) && (p = x), Z.attr(
                                                        "data-wyp-right-round") == ci(C) && (p = x), Z.attr(
                                                        "data-wyp-left-round") == ci(z) && (p = y), t = r + E -
                                                y, t < l && t > -Math.abs(l) && (d = Math.round(y - C + window
                                                                .drag.currentX), window.drag.currentX = d, L
                                                        .css({
                                                                transform: "translate3d(" + p + "px, " +
                                                                        m + "px, 0)",
                                                                height: g,
                                                                display: "block"
                                                        })), t = r + E - x, t < l && t > -Math.abs(l) && (d =
                                                        Math.round(x - C + window.drag.currentX), window.drag
                                                        .currentX = d, L.css({
                                                                transform: "translate3d(" + p + "px, " +
                                                                        m + "px, 0)",
                                                                height: g,
                                                                display: "block"
                                                        })), t = r + E - x + D, t < l && t > -Math.abs(l) && (
                                                        d = Math.round(x - z + window.drag.currentX), window
                                                        .drag.currentX = d, L.css({
                                                                transform: "translate3d(" + p + "px, " +
                                                                        m + "px, 0)",
                                                                height: g,
                                                                display: "block"
                                                        })), t = Math.round(r + E - y + _), t < l && t > -Math
                                                .abs(l) && (d = Math.round(y - z + window.drag.currentX - (_ -
                                                        D)), window.drag.currentX = d, L.css({
                                                        transform: "translate3d(" + p + "px, " +
                                                                m + "px, 0)",
                                                        height: g,
                                                        display: "block"
                                                }))), (1 == window.drag.currentY || -1 == window.drag
                                                .currentY || 2 == window.drag.currentY || -2 == window.drag
                                                .currentY) && (window.drag.currentY = 0), (1 == window.drag
                                                .currentX || -1 == window.drag.currentX || 2 == window.drag
                                                .currentX || -2 == window.drag.currentX) && (window.drag
                                                .currentX = 0), 60 <= k ? sn.extra.find(".wyp-helper-tooltip")
                                        .css("transform", "translate3d(" + C + "px, " + k + "px, 0)").html(
                                                "X: " + parseInt(window.drag.currentX) + "<br>Y: " + parseInt(
                                                        window.drag.currentY)) : sn.extra.find(
                                                ".wyp-helper-tooltip").css("transform", "translate3d(" + C +
                                                "px, " + (k + A + 40 + 10) + "px, 0)").html("X: " + parseInt(
                                                window.drag.currentX) + "<br>Y: " + parseInt(window.drag
                                                .currentY))
                        }, window.YellowDelay))
                }, 32), !1), window.mouseisDown = !1, window.styleAttrBeforeChange = null, window.visualResizingType = null, window
                .ResizeSelectedBorder = null, window.elementOffsetLeft = null, window.elementOffsetRight = null;
        var Hn = function(e) {
                var t = document.createElement("a");
                return t.href = e, t.protocol + "//" + t.host + t.pathname + t.search + t.hash
        };
        Gi.find("a[href]").on("click", function(e) {
                        if (o(this).attr("target", "_self"), !1 === window.ypData["wyp-met-dis"]) return !1;
                        if ("cursor" === window.ypData.inspector) {
                                if (window.bMode) return !1;
                                var t = o(this).attr("href");
                                if ("" == t || "#" == t.substring(0, 1) || -1 != t.indexOf("javascript:") || -1 != t.indexOf(
                                                "yellow_pencil=true")) return !0;
                                if (t = Hn(t), "" != t && "#" != t.substring(0, 1) && -1 == t.indexOf("javascript:") && -1 == t.indexOf(
                                                "yellow_pencil=true")) {
                                        var a = ni(t),
                                                i = window.location.hostname;
                                        if (a != i) return !1 != e.ctrlKey || !1 != e.metaKey || (k({
                                                title: qi.sorry,
                                                text: qi.external_link
                                        }), !1);
                                        if (-1 == t.indexOf(siteurl.split("://")[1]) || -1 != t.indexOf("wp-login.php?action=logout")) return !
                                                1 != e.ctrlKey || !1 != e.metaKey || (k({
                                                        title: qi.sorry,
                                                        text: qi.link_not_valid
                                                }), !1);
                                        if ("http:" == location.protocol && -1 != t.indexOf("https:") && -1 == t.indexOf("http:") && (t = t
                                                        .replace("https:", "http:"), o(this).attr("href", t)), "https:" == location.protocol &&
                                                -1 != t.indexOf("http:") && -1 == t.indexOf("https:") && (t = t.replace("http:", "https:"), o(
                                                        this).attr("href", t)), o(".wyp-save-btn").hasClass("waiting-for-save"))
                                                if (!0 == confirm(qi.sure)) o(".waiting-for-save").removeClass("waiting-for-save");
                                                else return !0
                                } else return !0;
                                o("#loader i").css("width", "5%"), o("#iframe").remove(), tn.removeClass("yellow-pencil-ready"), o(
                                        ".wyp-iframe-loader").show(), o(".loading-files").text(qi.page_loading);
                                var n = window.location;
                                n = n.toString().split("href=")[0] + "href=";
                                var s = t;
                                if ("about:" == s.substring(0, 6)) return o(this).show(), !1;
                                s = s.replace(/\/?(\?|#|$)/, "/$1"), o.post(s, {
                                        wyp_get_details: "true"
                                }).done(function(e) {
                                        if (e = o("<div />").append(e).find("#wyp_page_details").html(), -1 != s.indexOf(
                                                        "/wp-login.php") && (e = "login|login|single"), -1 != s.indexOf(
                                                        "/wp-login.php") && -1 != s.indexOf("action=lostpassword") && (e =
                                                        "lostpassword|lostpassword|single"), -1 != s.indexOf("/wp-login.php") &&
                                                -1 != s.indexOf("action=register") && (e = "register|register|single"), null ==
                                                e || null == e) return si(), !1;
                                        var t = e.split("|")[0],
                                                a = e.split("|")[1],
                                                i = e.split("|")[2];
                                        s = s.replace(/.*?:\/\//g, ""), s = s.replace("&yellow_pencil_frame", "").replace(
                                                        "?yellow_pencil_frame", ""), s = encodeURIComponent(s), n = n + s +
                                                "&wyp_page_id=" + t + "&wyp_page_type=" + a + "&wyp_mode=" + i, window
                                                .location = n
                                }).fail(function() {
                                        si()
                                })
                        }
                }), an.addEventListener("click", oi, !0), an.addEventListener("fakeClick", oi, !0), Gi.on("fakeOver", Me), window.visualEdit = !1,
                window.visualEditDelay = null, an.addEventListener("mousedown", function(e) {
                        var t = o(e.target),
                                a = t.prop("tagName");
                        if (C() && "BODY" != a && "HTML" != a && 1 === e.which && (t.hasClass("wyp-selected") || t.hasClass("wyp-selected") ||
                                        di(t, "wyp-selected")) && (clearTimeout(window.dragDelay), window.dragDelay = setTimeout(function() {
                                        var a = t.css("transform"),
                                                i = !0,
                                                n;
                                        try {
                                                n = new DOMMatrixReadOnly(a)
                                        } catch (t) {
                                                i = !1
                                        }
                                        i && (window.drag.xOffset = n.m41, window.drag.yOffset = n.m42, window.drag.initialX = e
                                                .clientX - window.drag.xOffset, window.drag.initialY = e.clientY -
                                                window.drag.yOffset, e.target === t.get(0) && (window.drag.active = !0,
                                                        window.drag.item = t), window.ypData.editor_context_menu_open &&
                                                t.contextMenu("hide"), window.drag.scrollY = parseFloat(Ji.scrollTop() +
                                                        Ki.scrollTop()), window.drag.scrollX = parseFloat(Ji
                                                .scrollLeft() + Ki.scrollLeft()), t.removeClass(
                                                        "yp_onscreen yp_hover yp_click yp_focus"), Qi.addClass(
                                                        "wyp-dragging"), window.ypData.is_dragging = !0, tn.addClass(
                                                        "wyp-clean-look"), Ji.addClass("wyp-hid-bor-n"), sn.extra
                                                .append("<div class='wyp-helper-tooltip'></div>"), "inline" == t.css(
                                                        "display") && tt(null, "display", "inline-block", ""), ri())
                                }, 75)), t.hasClass("wyp-selected-boxed-left") || t.hasClass("wyp-selected-boxed-right")) {
                                var i = t;
                                if (!1 == Ji.hasClass("wyp-element-float") && i.hasClass("wyp-selected-boxed-left")) return !1;
                                window.ypData["resize-time-delay"] = !0;
                                var n = "",
                                        s = Ft(_a(), "width", [!0, !1]);
                                if (s) {
                                        var r = Ft(_a(), "width", [!1, !1]);
                                        r.always(function(e) {
                                                !1 !== n && (n = e)
                                        })
                                }
                                clearTimeout(window.resizeDelay), window.resizeDelay = setTimeout(function() {
                                        if (!1 === C()) return !1;
                                        var e;
                                        window.visualResizingType = "width", window.ResizeSelectedBorder = i.hasClass(
                                                "wyp-selected-boxed-left") ? "left" : "right", window.mouseisDown = !0;
                                        var t = _(),
                                                a = i.get(0);
                                        J(a) ? (e = {}, e.width = 0, e.height = 0, e.left = 0, e.right = 0, e.top = 0, e
                                                .bottom = 0) : e = Ra(a);
                                        var o = t.css(["margin-left", "max-width", "max-height", "min-width", "min-height",
                                                        "width"
                                                ]),
                                                r = parseFloat(Ji.scrollLeft() + Ki.scrollLeft());
                                        window.mouseDownX = e.left + r, window.exWidthX = parseFloat(e.width), window.exWidthY =
                                                null, window.currentMarginLeft = parseFloat(o["margin-left"]), window
                                                .maxData = {
                                                        width: parseFloat(o["max-width"]),
                                                        height: parseFloat(o["max-height"])
                                                }, window.minData = {
                                                        width: parseFloat(o["min-width"]),
                                                        height: parseFloat(o["min-height"])
                                                };
                                        var l = pi(t, o.width);
                                        window.liveResizeWPercent = !1, "%" == l.format && (window.liveResizeWPercent = !0),
                                                "%" != l.format && s && -1 != n.indexOf("%") && (window.liveResizeWPercent = !
                                                0), Ji.addClass("wyp-el-reing"), window.ypData.is_resizing = !0, tn.addClass(
                                                        "wyp-clean-look"), window.ypData.editor_context_menu_open && t
                                                .contextMenu("hide"), sn.extra.append("<div class='wyp-helper-tooltip'></div>"),
                                                ri()
                                }, 150)
                        }
                        if (t.hasClass("wyp-selected-boxed-bottom")) {
                                var i = t;
                                window.ypData["resize-time-delay"] = !0, clearTimeout(window.resizeDelay), window.resizeDelay = setTimeout(
                                        function() {
                                                if (!1 === C()) return !1;
                                                var e;
                                                window.mouseisDown = !0, window.visualResizingType = "height", window
                                                        .ResizeSelectedBorder = i.hasClass("wyp-selected-boxed-top") ? "top" : "bottom";
                                                var t = _(),
                                                        a = t.get(0);
                                                J(a) ? (e = {}, e.width = 0, e.height = 0, e.left = 0, e.right = 0, e.top = 0, e
                                                        .bottom = 0) : e = Ra(a);
                                                var n = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                                                        s = t.css(["margin-top", "max-width", "max-height", "min-width", "min-height"]);
                                                window.mouseDownY = e.top + n, window.exWidthY = parseFloat(e.height), window.exWidthX =
                                                        null, window.currentMarginTop = parseFloat(s["margin-top"]), window.maxData = {
                                                                width: parseFloat(s["max-width"]),
                                                                height: parseFloat(s["max-height"])
                                                        }, window.minData = {
                                                                width: parseFloat(s["min-width"]),
                                                                height: parseFloat(s["min-height"])
                                                        }, Ji.addClass("wyp-el-reing"), window.ypData.is_resizing = !0, tn.addClass(
                                                                "wyp-clean-look"), window.ypData.editor_context_menu_open && _()
                                                        .contextMenu("hide"), Gi.find(_a()).removeClass(
                                                                "wyp_selected yp_onscreen yp_hover yp_focus yp_click"), sn.extra.append(
                                                                "<div class='wyp-helper-tooltip'></div>"), ri()
                                        }, 150)
                        }
                        if (t.hasClass("wyp-selected-boxed-margin-left") || t.hasClass("wyp-selected-boxed-margin-right") || t.hasClass(
                                        "wyp-selected-boxed-margin-top") || t.hasClass("wyp-selected-boxed-margin-bottom") || t.hasClass(
                                        "wyp-selected-boxed-padding-left") || t.hasClass("wyp-selected-boxed-padding-right") || t.hasClass(
                                        "wyp-selected-boxed-padding-top") || t.hasClass("wyp-selected-boxed-padding-bottom")) {
                                if (2 == e.which || 3 == e.which) return !1;
                                var i = t;
                                clearTimeout(window.visualEditDelay), window.visualEditDelay = setTimeout(function() {
                                        if (!1 === C()) return !1;
                                        var t = i.attr("class").trim();
                                        i.addClass("wyp-visual-active").removeClass("wyp-zero-m-w wyp-zero-m-h"), window
                                                .visualEditType = t.match(/boxed-[a-z]+/g).toString().replace("boxed-", ""),
                                                window.visualEditPosition = t.match(/boxed-(margin|padding)-[a-z]+/g).toString()
                                                .replace(/boxed-|margin|padding|-/g, ""), window.visualEdit = !0, window
                                                .visualEditX = Math.round(e.pageX), window.visualEditY = Math.round(e.pageY);
                                        var a = window.visualEditType + "-" + window.visualEditPosition;
                                        window.visualEditValue = _().css(a), window.visualEditValueOr = window.visualEditValue,
                                                window.visualEditValue = J(window.visualEditValue) ? 5 : parseInt(window
                                                        .visualEditValue), Ji.addClass("wyp-vis-edng"), window.ypData
                                                .is_visual_editing = !0, tn.removeClass("wyp-clean-look"), /(left|right)/g.test(
                                                        window.visualEditPosition) ? Ji.addClass("wyp-vis-edng-x") : Ji
                                                .addClass("wyp-vis-edng-y"), window.currentLiveSelector = ke(), Ji.addClass(
                                                        "wyp-h-trfm")
                                }, 150)
                        }
                        return "cursor" === window.ypData.inspector ? void 0 : (e.stopPropagation(), e.preventDefault(), !1)
                }, !0), Gi.on("mousemove", o.throttle(function(e) {
                        if (!0 === window.mouseisDown) {
                                var t = sn.extra.find(".wyp-y-distance-border"),
                                        a = sn.extra.find(".wyp-x-distance-border"),
                                        i = _(),
                                        n = i.get(0),
                                        s;
                                J(n) ? (s = {}, s.width = 0, s.height = 0, s.left = 0, s.right = 0, s.top = 0, s.bottom = 0) : s = Ra(
                                n);
                                var r = Pa();
                                e.pageY += r.top, e.pageX += r.left, "inline" == i.css("display") && tt(null, "display", "inline-block",
                                        "");
                                var l = "px";
                                !0 == window.liveResizeWPercent && (l = "%");
                                var d, p, c, u;
                                "width" == window.visualResizingType ? (u = s.width - i.outerWidth(!1), d = "left" == window
                                        .ResizeSelectedBorder ? Math.round(s.left + Ji.scrollLeft() + Ki.scrollLeft()) + Math
                                        .round(s.width) - Math.round(e.pageX) - u : Math.round(e.pageX) - Math.round(s.left + Ji
                                                .scrollLeft() + Ki.scrollLeft()) - u, ("px" == l && 4 < d || "%" == l && 2 <
                                        d) && ("content-box" == i.css("boxSizing") && (d = d - Math.round(parseFloat(i.css(
                                                                "paddingLeft"))) - Math.round(parseFloat(i.css(
                                                        "paddingRight")))), p = pi(i, d), d = p.val, l = p.format, !1 === window
                                                .wasLockX && i.cssImportant("width", d + l), Ia(".wyp-selected",
                                                        "wyp-selected-boxed"))) : "height" == window.visualResizingType && (u =
                                        s.height - i.outerHeight(!1), c = "top" == window.ResizeSelectedBorder ? Math.round(s
                                                .bottom + Ji.scrollTop() + Ki.scrollTop()) - Math.round(e.pageY) : Math.round(e
                                                .pageY) - Math.round(s.top + Ji.scrollTop() + Ki.scrollTop()) - u, "px" == l &&
                                        4 < c && ("content-box" == i.css("boxSizing") && (c = c - Math.round(parseFloat(i.css(
                                                        "paddingTop"))) - Math.round(parseFloat(i.css(
                                                "paddingBottom")))), !1 === window.wasLockY && i.cssImportant("height",
                                                c + l), Ia(".wyp-selected", "wyp-selected-boxed")));
                                var m = "",
                                        f = 0;
                                "width" == window.visualResizingType ? (5 > d && "px" == l ? d = 5 : 2 > d && (d = 2), f = Math.round(
                                                d), m = "W: " + f + l) : (5 > c && (c = 5), f = Math.round(c), m = "H: " + f + l),
                                        "height" == window.visualResizingType ? parseInt(window.orginalHeight) == parseInt(c) && (m =
                                                "H: Initial - " + window.orginalHeight) : parseInt(window.orginalWidth) == parseInt(
                                        d) && (m = "W: Initial - " + window.orginalWidth);
                                var g = Math.round(parseFloat(sn.active.find(".wyp-selected-boxed-top").css("top"))),
                                        h = Math.round(parseFloat(sn.active.find(".wyp-selected-boxed-left").css("left"))),
                                        y = Math.round(parseFloat(sn.active.find(".wyp-selected-boxed-right").css("left"))),
                                        w = Math.round(parseFloat(sn.active.find(".wyp-selected-boxed-bottom").css("top"))),
                                        v, b, x, k, C, z, O, D, A, S, T, E;
                                if ("height" == window.visualResizingType) {
                                        a.css("display", "none"), window.wasLockY = !1;
                                        var L = Ji.find(".wyp-smrt-gd-el[data-wyp-top-round='" + ci(e.pageY) +
                                                "'],.wyp-smrt-gd-el[data-wyp-bottom-round='" + ci(e.pageY) + "']").first();
                                        0 < L.length && (O = parseFloat(L.attr("data-wyp-top")), D = parseFloat(L.attr(
                                                "data-wyp-left")), A = parseFloat(L.attr("data-wyp-width")), S = parseFloat(L
                                                        .attr("data-wyp-height")), T = parseFloat(O + S), E = parseFloat(D + A),
                                                h > D ? (v = D, b = y - v) : (v = h, b = E - h), L.attr("data-wyp-top-round") ==
                                                ci(e.pageY) ? (x = O, k = O - g) : (x = T, k = T - g), u = s.height - i
                                                .outerHeight(!1), k -= u, "top" == window.ResizeSelectedBorder ? k = c : (i
                                                        .cssImportant("height", k + l), window.wasLockY = !0), a.css({
                                                        transform: "translate3d(" + v + "px, " + x + "px, 0)",
                                                        width: b,
                                                        display: "block"
                                                }), 5 > k && (k = 5), f = Math.round(k), m = "H: " + f + l), parseInt(window
                                                .orginalHeight) == parseInt(k) && (m = "H: Initial - " + window.orginalHeight)
                                }
                                if ("width" == window.visualResizingType) {
                                        window.wasLockX = !1, t.css("display", "none");
                                        var B = Ji.find(".wyp-smrt-gd-el[data-wyp-left-round='" + ci(e.pageX) +
                                                "'],.wyp-smrt-gd-el[data-wyp-right-round='" + ci(e.pageX) + "']").first();
                                        0 < B.length && (O = parseFloat(B.attr("data-wyp-top")), D = parseFloat(B.attr(
                                                        "data-wyp-left")), A = parseFloat(B.attr("data-wyp-width")), S = parseFloat(B
                                                                .attr("data-wyp-height")), T = parseFloat(O + S), E = parseFloat(D + A),
                                                        g > O ? (x = O, C = w - O) : (x = g, C = T - g), B.attr(
                                                        "data-wyp-left-round") == ci(e.pageX) ? (v = D, z = D - h) : (v = E, z = E - h),
                                                        u = s.width - i.outerWidth(!1), z -= u, p = pi(i, z), z = p.val, l = p.format,
                                                        "left" == window.ResizeSelectedBorder ? z = d : (i.cssImportant("width", z + l),
                                                                window.wasLockX = !0), t.css({
                                                                transform: "translate3d(" + v + "px, " + x + "px, 0)",
                                                                height: C,
                                                                display: "block"
                                                        }), "%" == l ? (2 > z && (z = 2), f = Math.round(z)) : (5 > z && (z = 5), f =
                                                                Math.round(z)), m = "W: " + f + l), parseInt(window.orginalWidth) ==
                                                parseInt(z) && (m = "W: Initial - " + window.orginalWidth)
                                }
                                var M = e.pageX + 30;
                                M + 120 >= o("#iframe").width() && (M = e.pageX - 120), sn.extra.find(".wyp-helper-tooltip").css(
                                        "transform", "translate3d(" + M + "px, " + e.pageY + "px, 0)").html(m)
                        }
                }, 32)), Gi.on("mousemove", o.throttle(function(e) {
                        if (window.visualEdit) {
                                var t, a, i, n, s;
                                /(left|right)/g.test(window.visualEditPosition) ? (t = "padding" == window.visualEditType ? /left/g
                                                .test(window.visualEditPosition) ? Math.round(e.pageX) - window.visualEditX : window
                                                .visualEditX - Math.round(e.pageX) : Math.round(e.pageX) - window.visualEditX, n =
                                                "width") : (t = Math.round(e.pageY) - window.visualEditY, n = "height"), a = window
                                        .visualEditType + "-" + window.visualEditPosition, ("padding-bottom" == a || "margin-left" ==
                                                a || "margin-top" == a) && (0 > t ? t = Math.abs(t) : t = -Math.abs(t)), t += window
                                        .visualEditValue, 0 > t && (t = 0), i = "";
                                var o = _(),
                                        r = o.get(0);
                                J(r) ? (s = {}, s.width = 0, s.height = 0, s.left = 0, s.right = 0, s.top = 0, s.bottom = 0) : s = Ra(
                                r);
                                var l = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                                        d = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()),
                                        p = s.width,
                                        c = s.height,
                                        u = s.top + l,
                                        m = s.left + d,
                                        f = parseFloat(m + p),
                                        g = parseFloat(u + c);
                                "margin-right" == window.visualEditType + "-" + window.visualEditPosition && (i +=
                                                ".wyp-selected-boxed-margin-right{ transform: translate3d(" + f + "px, " + u +
                                                "px, 0) !important; height:" + c + "px !important; }"), "padding-right" == window
                                        .visualEditType + "-" + window.visualEditPosition && (i +=
                                                ".wyp-selected-boxed-padding-right{ transform: translate3d(" + (f - t) + "px, " + u +
                                                "px, 0) !important; height:" + c + "px !important; }"), "margin-left" == window
                                        .visualEditType + "-" + window.visualEditPosition && (i +=
                                                ".wyp-selected-boxed-margin-left{ transform: translate3d(" + (m - t) + "px, " + u +
                                                "px, 0) !important; height:" + c + "px !important; }"), "padding-left" == window
                                        .visualEditType + "-" + window.visualEditPosition && (i +=
                                                ".wyp-selected-boxed-padding-left{ transform: translate3d(" + m + "px, " + u +
                                                "px, 0) !important; height:" + c + "px !important; }");
                                var h, y, w, v;
                                ("margin-top" == window.visualEditType + "-" + window.visualEditPosition || "margin-bottom" == window
                                        .visualEditType + "-" + window.visualEditPosition) && (h = parseFloat(o.css("margin-left")), y =
                                        parseFloat(o.css("margin-right")), w = parseFloat(p) + h + y, v = parseFloat(m) - h),
                                "margin-top" == window.visualEditType + "-" + window.visualEditPosition && (i +=
                                                ".wyp-selected-boxed-margin-top{ transform: translate3d(" + v + "px, " + (u - t) +
                                                "px, 0) !important; width:" + w + "px !important; }"), "padding-top" == window
                                        .visualEditType + "-" + window.visualEditPosition && (i +=
                                                ".wyp-selected-boxed-padding-top{ transform: translate3d(" + m + "px, " + u +
                                                "px, 0) !important; width:" + p + "px !important; }"), "margin-bottom" == window
                                        .visualEditType + "-" + window.visualEditPosition && (i +=
                                                ".wyp-selected-boxed-margin-bottom{ transform: translate3d(" + v + "px, " + g +
                                                "px, 0) !important; width:" + w + "px !important; }"), "padding-bottom" == window
                                        .visualEditType + "-" + window.visualEditPosition && (i +=
                                                ".wyp-selected-boxed-padding-bottom{ transform: translate3d(" + m + "px, " + (g - t) +
                                                "px, 0) !important; width:" + p + "px !important; }"), t = parseInt(t), i +=
                                        ".wyp-selected-boxed-" + window.visualEditType + "-" + window.visualEditPosition + "{ " + n +
                                        " : " + t + "px !important; }", i += "body.wyp-con-slcd .wyp-selected," + window
                                        .currentLiveSelector + "{ " + a + " : " + t + "px !important; }", 0 == Gi.find(
                                                "#wyp-visual-edit-css").length ? Ji.append("<style id='wyp-visual-edit-css'>" + i +
                                                "</style>") : Gi.find("#wyp-visual-edit-css").text(i), sn.active.find(
                                                ".wyp-selected-boxed-" + window.visualEditType + "-" + window.visualEditPosition + "")
                                        .text(t + "px")
                        }
                }, 32)), o(document).on("click", ".wyp-color-background", function() {
                        var e = o(this),
                                t = e.parents(".op-g"),
                                a = t.attr("data-css");
                        if (tn.hasClass("wyp-bg-layer-active")) return o("#fake-layer").trigger("click"), !1;
                        t.parent().hasClass("option-group-class") && (t = t.parent());
                        var i = e.parent().parent().find(".iris-picker");
                        i.toggle();
                        var n = t.offset(),
                                s = parseInt(e.offset().left + e.width() / 2 - n.left) - parseInt(i.css("marginLeft"));
                        t.find(".custom-iris-pos-css").remove(), t.append("<style class='custom-iris-pos-css'>.op-g[data-css='" + a +
                                        "'] .iris-picker::after, .op-g[data-css='" + a + "'] .iris-picker::before{left:" + s + "px;}</style>"),
                                i.css("top", e.offset().top).css("left", n.left);
                        var r = e.find(".co-sw-co").css("background-color"),
                                l = -1 === r.indexOf("rgba") ? 100 : parseFloat(100 * r.replace(/^.*,(.+)\)/, "$1"));
                        "transparent" == r && (l = 0), i.find(".cs-alpha-slider").slider("value", l);
                        var d = i.find(".information.hex input");
                        0 < d.length && (d.trigger("focus"), d[0].setSelectionRange(0, d.val().length)), e.addClass("active"), window
                                .isIrisOpen = !0, W({
                                        index: 2147483646,
                                        container: ".ed-pnl",
                                        callback: function() {
                                                window.isIrisOpen = !1, e.removeClass("active"), e.prev(".iris-picker").hide()
                                        }
                                })
                }), tn.on("mousedown", ".ed-pnl-list > li:not(.active)", function() {
                        if (!0 === C()) {
                                var e = o(this),
                                        t = e.attr("data-loaded"),
                                        i = e.attr("data-setup");
                                if (("undefined" == typeof i || !1 === i) && (e.find(".co-p").cs_iris(), e.hasClass("background-option") && o(
                                                "#iris-gradient-color").cs_iris(), e.find(".sl-o").each(function() {
                                                rt(G(this), o(this).data("decimals"))
                                        }), e.find(".se-o").each(function() {
                                                var t = o(this),
                                                        a = t.find("textarea");
                                                !(a.val().trim().startsWith('[') || a.val().trim().startsWith('{')) ? o.getJSON(a.val(), function(e) {
                                                        a.val(JSON.stringify(e)), ve(t.find(".in-ac"))
                                                }).fail(function() {
                                                        Li("Loading Error", "Could Not Load Json library.",
                                                                "jsonError")
                                                }) : ve(t.find(".in-ac"))
                                        }), ct(e), e.attr("data-setup", "true")), "undefined" == typeof t || !1 === t) {
                                        var n = _a();
                                        t = {
                                                element: _(),
                                                size: Fe(),
                                                styles: a(null, !0)
                                        }, e.find(".op-g").each(function() {
                                                pa(G(this), n, t)
                                        }), e.attr("data-loaded", "true")
                                }
                        }
                }), Gi.on("mouseout mouseover", ".wyp-selected", o.throttle(function(t) {
                        return !(window.firstSelectLimit && "mouseover" == t.type) && (window.firstSelectLimit ? (window
                                .firstSelectLimit = !1, !1) : void(!0 == C() && !1 == O() && !1 == z() && !1 == D() && (
                                clearTimeout(window.update_drawmouseOver), window.update_drawmouseOver =
                                setTimeout(function() {
                                        Ze()
                                }, 200))))
                }, 64)), o(document).on("click", ".reset-enable .di-btn", function(t) {
                        var e, a;
                        a = o(this).parent().parent().parent(), e = G(a);
                        var i = o("#wyp-" + e).val();
                        if ("background-image" == e && o(".wyp-unsplash-list > span.active,.wyp-gradient-demo.active,.wyp-bg-ast.active")
                                .removeClass("active"), t.originalEvent) {
                                if (a.removeClass("reset-enable"), o(this).hasClass("di-btn")) {
                                        var n = Ft(null, e, [!1, !0]);
                                        n.always(function(t) {
                                                !1 !== t && ("all" == t && (t = "desktop"), tt(null, e, "disable", "", t),
                                                        setTimeout(function() {
                                                                pa(e)
                                                        }, window.Yellow2Delay))
                                        })
                                }
                                Mi()
                        }
                        a.hasClass("in-o") && ("" == i || "none" == i ? a.find(".in-wr").addClass("empty-input") : a.find(".in-wr").removeClass(
                                "empty-input")), o.throttle(Be(), 32)
                }), o(".in-o .in-wr input,.sl-o .wyp-after input,.wyp-bgs-css-val,.wyp-bgs-prefix").on("blur", function() {
                        var e = o(this).parents(".op-g").attr("data-css"),
                                t = o(this).val();
                        "" == t && pa(e)
                }), o(".ed-pnl-list > li > h3").click(function() {
                        var e = o(this),
                                t = e.parent(),
                                a = o(".wyp-close-btn"),
                                i = o(".ed-pnl-list > li");
                        i.not(t).hide(), t.toggleClass("active"), o(".ed-pnl-list").toggleClass("list-active"), t.find(".wyp-t-cont").toggle(),
                                !1 == t.hasClass("active") ? (i.show(), a.removeClass("icon-menu").addClass("icon-no-alt"), a.tooltip("hide")
                                        .attr("data-original-title", qi.close_editor).tooltip("fixTitle"), t.hasClass("animation-option") && (Gi
                                                .find(".yp_onscreen,.yp_hover,.yp_click,.yp_focus").removeClass(
                                                        "yp_onscreen yp_hover yp_click yp_focus"), t.removeAttr("data-loaded"))) : (a
                                        .removeClass("icon-no-alt").addClass("icon-menu"), a.tooltip("hide").attr("data-original-title", qi
                                                .back_to_menu).tooltip("fixTitle")), o(".ed-pnl-list").scrollTop(0), o(
                                        ".op-g,.wyp-advanced-option").popover("hide"), o.throttle(Be(), 32)
                });
        var Wn = function(e) {
                return "undefined" != typeof e && "" != e ? (e = e.replace(/\W+/g, ""), e) : ""
        };
        o(document).on("mouseenter", ".selector-group", function() {
                o(this).find(".selector-comment-input").autoGrowInput()
        }), o(document).on("keyup keydown", ".selector-comment-input", function(t) {
                var e = t.keyCode || t.which;
                if (13 == e && o(this).trigger("blur"), 27 == e) return o(this).val("").trigger("blur"), !1
        }), o(document).on("focus", ".selector-comment-input", function() {
                var e = o(this).val(),
                        t = e.match(/ \(\d+\)$/);
                null == t && (t = ""), o(this).attr("data-len", t), o(this).val(e.replace(/ \(\d+\)$/g, "").trim())
        }), o(document).on("blur", ".selector-comment-input", function() {
                var e = o(this).parents(".selector-group"),
                        t = !1,
                        a = o(this).val(),
                        i = e.attr("data-view-selector"),
                        n;
                "" == Oi(a) && (t = !0, a = Ai(i, !0)), Ci(i, a), n = t ? a : Oi(a) + " " + o(this).attr("data-len"), e.hasClass(
                        "active") && Di(), o(this).val(n), setTimeout(function() {
                        e.find(".selector-comment-input").autoGrowInput()
                }, 4), window.editedByReview = !0, Mi(), window.editedByReview = !1
        }), o(document).on("click", ".wyp-message-box", function() {
                var e = o(this);
                e.css("opacity", "0"), setTimeout(function() {
                        e.remove()
                }, 350)
        }), window.plugin_classes_list_sorted = window.plugin_classes_list.split("|").sort(function(e, t) {
                return t.length - e.length
        }).join("|"), en.keydown(function(t) {
                var e = t.target.tagName.toLowerCase();
                "input" != e && "textarea" != e && t.shiftKey && ("61" == t.which || "107" == t.which || "173" == t.which || "109" == t
                        .which || "187" == t.which || "189" == t.which) && t.preventDefault()
        }), o(document).on("click", ".wyp-unsplash-list > span > i", function() {
                var e = o(this);
                if (clearInterval(window.ypLocalUploader), window.ypData.demo_mode || window.bMode) return !1;
                var t = 0;
                return window.ypLocalUploader = setInterval(function() {
                        t++, 0 == t % 2 ? (e.text("Upload."), e.css("padding-left", "0px")) : (e.text("Upload.."), e
                                .css("padding-left", "3px"))
                }, 200), o.post(ajaxurl, {
                        action: "wyp_unsplash_api",
                        wyp_link: o("#wyp-background-image").val(),
                        wyp_id: e.parent().attr("data-id"),
                        _wpnonce: window.wyp_editor_nonce
                }).done(function(t) {
                        -1 == t.indexOf("http") ? k({
                                title: qi.sorry,
                                text: t
                        }) : (e.parent().parent().parent().parent().parent().find(".wyp-input").val(t).trigger(
                                        "keyup"), o(".wyp-unsplash-btn.active").trigger("click"), e.parent()
                                .attr("data-local", t), ne(t))
                }).always(function() {
                        clearInterval(window.ypLocalUploader), e.text("Upload"), e.css("padding-left", "0px")
                }), !1
        }), window.glblUnsplashIndex = 0;
        var Fn;
        o("#unsplash-search").on("keyup", function() {
                        window.glblUnsplashIndex = 0, clearTimeout(Fn), Fn = setTimeout(function() {
                                o(".wyp-unsplash-list").empty(), Wi(null)
                        }, 400)
                }), o(document).on("click", ".wyp-unsplash-list > span", function() {
                        var e = o(this),
                                t;
                        if (e.hasClass("active") && !1 == e.hasClass("unsplash-img-loading")) return e.find("i").trigger("click"), !1;
                        var a = 100 * _().width() / Ji.width();
                        a = parseInt(2560 * a / 100), a = 10 * Math.ceil(a / 10), t = 200 > a ? e.attr("data-thumb") : 400 > a ? e.attr(
                                        "data-small") : 1080 > a ? e.attr("data-regular") : e.attr("data-regular").replace(/w=1080/g, "w=" + a),
                                null != e.attr("data-local") && null != e.attr("data-local") && (t = e.attr("data-local")), e.parent().parent()
                                .parent().parent().find(".wyp-input").val(t).trigger("keyup"), o(
                                        ".wyp-unsplash-list > span.unsplash-img-loading").removeClass("unsplash-img-loading"), e.attr(
                                        "data-content", "1%");
                        var i = 1;
                        e.addClass("unsplash-img-loading"), Ji.find("#unsplash-img-loader").remove(), Ji.append("<img src='" + t +
                                "' id='unsplash-img-loader' />"), Ji.find("#unsplash-img-loader").on("load", function() {
                                i = 100, e.attr("data-content", i + "%"), clearTimeout(window.unsplashLoaderIn), setTimeout(
                                        function() {
                                                e.removeClass("unsplash-img-loading"), o(
                                                        ".wyp-unsplash-list > span.active,.wyp-gradient-demo.active,.wyp-bg-ast.active"
                                                        ).removeClass("active"), e.addClass("active")
                                        }, 500)
                        }).on("error", function() {
                                i = 100, e.attr("data-content", "Error"), clearTimeout(window.unsplashLoaderIn), setTimeout(
                                        function() {
                                                e.removeClass("unsplash-img-loading");
                                                Li("Loading Error", "Could not load image preview.", "imgError");
                                        }, 500)
                        }), clearInterval(window.unsplashLoaderIn), window.unsplashLoaderIn = setInterval(function() {
                                var t = 8;
                                97 < i ? t = 1.1 : 95 < i ? t = 1.2 : 90 < i ? t = 1.3 : 80 < i ? t = 1.4 : 70 < i ? t = 1.5 :
                                        60 < i ? t = 1.6 : 50 < i ? t = 1.7 : 40 < i ? t = 1.8 : 30 < i ? t = 1.9 : 20 < i && (
                                                t = 2), 99 != i && (i += Math.floor(Math.random() * t)), e.attr("data-content",
                                                i + "%")
                        }, 100), o(".wyp-background-image-show").hide()
                }), o(".wyp-unsplash-list").on("scroll", o.throttle(function() {
                        ji(), Fi()
                }, 64)), Array.prototype.diff = function(e) {
                        return this.filter(function(t) {
                                return 0 > e.indexOf(t)
                        })
                },
                function() {
                        var e = Ki.html(),
                                t = Math.floor(963100 * Math.random()) + 136900,
                                a;
                        a = !0 === window.bMode ? decodeURIComponent(window.location.href) : location.protocol + "//" + decodeURIComponent(o.urlParam(
                                        "href")), a = new URL(a), !0 !== window.bMode && (a.searchParams.set("wyp_rand", t), a.searchParams.set(
                                        "yellow_pencil_frame", "true"), o.urlParam("wyp_out") && a.searchParams.set("wyp_out", "true")), o.post(a)
                                .always(function(t, a, n) {
                                        var s = n.status;
                                        if (window.isDynamicSelectorsReady = !0, 200 != s) return !1;
                                        for (var o = Xi(e).diff(Xi(t)), r = Vi(e).diff(Vi(t)), l = 0; l < o.length; l++) - 1 != window
                                                .plugin_classes_list.indexOf(o[l]) && delete o[l];
                                        for (l = 0; l < r.length; l++) - 1 != window.plugin_classes_list.indexOf(r[l]) && delete r[l];
                                        window.idList = o.filter(Boolean), window.ClassList = r.filter(Boolean)
                                })
                }(), N(), !0 !== window.bMode && yp_js_hook()

window.YP_refreshPropertyPanel = typeof Be !== 'undefined' ? Be : window.YP_refreshPropertyPanel;
window.YP_refreshCSSEditor = typeof _e !== 'undefined' ? _e : window.YP_refreshCSSEditor;
window.YP_scrollPanelToSelector = typeof Ae !== 'undefined' ? Ae : window.YP_scrollPanelToSelector;
window.YP_updateBreadcrumb = typeof Ze !== 'undefined' ? Ze : window.YP_updateBreadcrumb;
if (window.YP && window.YP._compat) {
    window.YP._compat.Be = typeof Be !== 'undefined' ? Be : undefined;
    window.YP._compat.Mi = typeof Mi !== 'undefined' ? Mi : undefined;
    window.YP._compat.Ni = typeof Ni !== 'undefined' ? Ni : undefined;
    window.YP._compat.Yi = typeof Yi !== 'undefined' ? Yi : undefined;
    window.YP._compat.fi = typeof fi !== 'undefined' ? fi : function(e) { return typeof e !== 'undefined' && e !== '' ? e.replace(/\d/g, '').replace('.px', 'px') : ''; };
    window.YP._compat.je = typeof je !== 'undefined' ? je : undefined;
    window.YP._compat.ne = typeof ne !== 'undefined' ? ne : undefined;
    window.YP._compat.Pi = typeof Pi !== 'undefined' ? Pi : undefined;
    window.YP._compat.Ri = typeof Ri !== 'undefined' ? Ri : undefined;
    window.YP._compat.Ci = typeof Ci !== 'undefined' ? Ci : undefined;
    window.YP._compat._e = typeof _e !== 'undefined' ? _e : undefined;
    window.YP._compat.$ = typeof $ !== 'undefined' ? $ : undefined;
    window.YP._compat.he = typeof he !== 'undefined' ? he : undefined;
    window.YP._compat.y = typeof y !== 'undefined' ? y : undefined;
    window.YP._compat.Ce = typeof Ce !== 'undefined' ? Ce : undefined;
    window.YP._compat.Ge = typeof Ge !== 'undefined' ? Ge : undefined;
    window.YP._compat.Za = typeof Za !== 'undefined' ? Za : undefined;
    window.YP._compat.Na = typeof Na !== 'undefined' ? Na : undefined;
}
})(jQuery);