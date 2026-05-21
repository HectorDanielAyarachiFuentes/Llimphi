/**
 * yp-panel-ui.js
 * Yellow Pencil – Property Panel & UI Helper Functions
 *
 * This module handles panel resizing, background thumbnail previews, color conversions,
 * custom animation timers, and reset operations.
 *
 * Original functions extracted from yellow-pencil.js:
 *   ne, be, Be, je, Xe, fi, Mi, Pi, Ri, Yi, Ni
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    /* =========================================================================
     * Dynamic DOM element & editor getters
     * ========================================================================= */
    function getGi()  { return YP.elements ? YP.elements.Gi  : o("#iframe").contents(); }
    function getKi()  { return YP.elements ? YP.elements.Ki  : getGi().find("html"); }
    function getJi()  { return YP.elements ? YP.elements.Ji  : getGi().find("body"); }
    function getTn()  { return YP.elements ? YP.elements.tn  : o(document.body); }
    
    function getEditor() { return YP.getEditor ? YP.getEditor() : null; }
    function _a() { return YP._compat && YP._compat._a ? YP._compat._a() : ""; }
    function E() { return YP._compat && YP._compat.E ? YP._compat.E() : "single"; }
    function K(v) { return YP._compat && YP._compat.K ? YP._compat.K(v) : !v; }
    function A() { return YP._compat && YP._compat.A ? YP._compat.A() : false; }
    
    function ei() { return YP._compat && YP._compat.ei ? YP._compat.ei() : 0; }
    function Li(a, b, c) { if (YP._compat && YP._compat.Li) { YP._compat.Li(a, b, c); } }
    function Va(t) { return YP._compat && YP._compat.Va ? YP._compat.Va(t) : t; }
    function Hi(a, b) { return YP._compat && YP._compat.Hi ? YP._compat.Hi(a, b) : a; }
    
    function Et(a, b, c, d) { return YP._compat && YP._compat.Et ? YP._compat.Et(a, b, c, d) : ""; }
    function sa() { if (YP._compat && YP._compat.sa) { YP._compat.sa(); } }
    function yt(m) { if (YP._compat && YP._compat.yt) { YP._compat.yt(m); } }
    function _e() { if (YP._compat && YP._compat._e) { YP._compat._e(); } }
    function $() { if (YP._compat && YP._compat.$) { YP._compat.$(); } }
    function he(e) { if (YP._compat && YP._compat.he) { YP._compat.he(e); } }
    
    function y(m) { if (YP._compat && YP._compat.y) { YP._compat.y(m); } }

    var vn; // local timer variable for Be()

    /* =========================================================================
     * ne (background image preview)
     * ========================================================================= */
    function ne(e) {
        null == e && (e = o("#wyp-background-image").val()), 0 < o(".wyp-background-image-show").length && o(".wyp-background-image-show").attr(
                        "src") == e && o(".wyp-background-image-show").show(), o(".wyp-background-image-show").remove(), e = e.replace(/"/g, "")
                .replace(/'/g, "").replace(/url\(/g, "").replace(/\)/g, ""), -1 == e.indexOf("yellow-pencil") && (-1 != e.indexOf("//") || -1 !=
                        e.indexOf("data:")) && o("#background-image-group .op-c").append("<img src='" + e +
                        "' class='wyp-background-image-show' />")
    }

    /* =========================================================================
     * be (data-default attribute fallback)
     * ========================================================================= */
    function be(e) {
        return e.hasAttr("data-default") ? e.attr("data-default") : "no-defined";
    }

    /* =========================================================================
     * Be (resize property panel lists & heights)
     * ========================================================================= */
    function Be(e) {
        var t = 0,
                a = o(".ed-pnl"),
                i = o(".ed-pnl-list"),
                n = o(".ed-pnl-footer"),
                s = window.ypData["wyp-fix-pan"];
        if ("none" === a.css("display") && !0 !== e) return n.show(), !1;
        window.lastScrollTop = i.scrollTop();
        var r = i.offset().top,
                l = n.height();
        i.hasClass("list-active") || (l = 0);
        var d = getGi().height(),
                p = o("#iframe").height(),
                c = o(window).height(),
                u = c - (r + l);
        if (i.removeAttr("style"), i.find(".wyp-t-cont").css("height", ""), t = i.height(), i.hasClass("list-active")) t > u && !1 == s && i
                .height(u - 10), s && i.height(u);
        else {
            var m = i.find("li.active .wyp-t-cont"),
                    f = 41;
            s || (f += 10), t > u && m.height(u - f)
        }
        n.css("width", parseInt(a.width()) + "px"), i.scrollTop(window.lastScrollTop), 0 < o(".ed-pnl-list > li.active").length ? n.hide() : n
                .show(), !1 == A() && (clearTimeout(vn), vn = setTimeout(function() {
                        d > p ? a.css("marginRight", 4 + ei() + "px") : a.css("marginRight", "4px")
                }, window.Yellow2Delay))
    }

    /* =========================================================================
     * je (smart media queries & responsive layout checker)
     * ========================================================================= */
    function je(e, t, a) {
        if ("--google-webfont" == t) return "desktop";
        if (K(e)) return e;
        if (A()) {
            var i, n;
            return i = 0 < o(".breakpoint-bar .breakpoint-item.focus").length ? o(".breakpoint-bar .breakpoint-item.focus").attr(
                            "data-breakpoint") : o("#iframe").width(), n = o(".media-control").attr("data-code"), e = "(" + n + ":" + i +
                    "px)", e
        }
        if (!0 == window.ypOption.smart_responsive_technology && "disable" != a && ("font-size" == t || "line-height" == t ||
                        "letter-spacing" == t || "word-spacing" == t || "margin-left" == t || "margin-right" == t || "margin-top" == t ||
                        "margin-bottom" == t || "padding-left" == t || "padding-right" == t || "padding-top" == t || "padding-bottom" == t ||
                        "z-index" == t || "column-count" == t || "position" == t || "top" == t || "left" == t || "right" == t || "bottom" ==
                        t || "width" == t || "height" == t || "min-width" == t || "min-height" == t || "max-width" == t || "max-height" == t ||
                        "animation-name" == t || "animation-duration" == t || "animation-delay" == t || "animation-fill-mode" == t ||
                        "transform" == t || "filter" == t || "backdrop-filter" == t || "opacity" == t || "display" == t || "cursor" == t ||
                        "float" == t || "clear" == t || "visibility" == t || "pointer-events" == t || "overflow" == t)) {
            var s = Va(t);
            if (K(s)) return null != a && !1 != a && "disable" != a && Li("Preserving Responsive Design",
                    "The style was applied to a specific screen size to preserve the responsive design.", "responsiveLayout"
                    ), s
        }
        return "desktop"
    }

    /* =========================================================================
     * Xe (selector sanitiser for pseudo elements/classes)
     * ========================================================================= */
    function Xe(e) {
        e = e.replace(/\:yp-onscreen/g, ".yp_onscreen").replace(/\:yp-focus/g, ".yp_focus").replace(/\:yp-hover/g, ".yp_hover").replace(
                /\:yp-click/g, ".yp_click");
        var t = e.match(/:(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)/g);
        if (null != t) t = t[0].replace(/:/g, "");
        else return e;
        var a = "",
                i = "";
        return ("hover" == t || "focus" == t || "active" == t || "visited" == t || "link" == t || "checked" == t || "disabled" == t ||
                "enabled" == t || "invalid" == t || "valid" == t) && ("}" == e.charAt(0) && (a = "}"), "{" == e.slice(-1) && (i = "{"),
                e = e.replace(/(\{|\})/g, ""), e = e.replace(
                        /(body)?\.yp-selector-(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)\./g, "body."),
                e = e.replace(/(body)?\.yp-selector-(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)/g, ""), e =
                e.replace(/:(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)(\s+)?$/g, ""), e = Hi(e,
                        "yp-selector-" + t), e = e.replace(/(\r|\n)/g, ""), e = a + e + i), e
    }

    /* =========================================================================
     * fi (standard unit extraction utility)
     * ========================================================================= */
    function fi(e) {
        return "undefined" != typeof e && "" != e ? e.replace(/\d/g, "").replace(".px", "px") : ""
    }

    /* =========================================================================
     * Mi (cleans up property panels, resets values & history markers)
     * ========================================================================= */
    function Mi() {
        var n = getEditor();
        if (clearTimeout(window.wyp_insert_data_delay), getTn().hasClass("css-code-unvalid")) return !1;
        getTn().addClass("wyp-history-delay"), o(".wyp-save-btn").text(window.qi.save).removeClass("wyp-disabled").addClass("waiting-for-save");
        var e = window.editedByReview,
                t = 370;
        window.wyp_insert_data_delay = setTimeout(function() {
            var t = E();
            getGi().find(".wyp-data-only-updated").each(function() {
                var e = o(this),
                        t;
                t = e.attr("data-source-mode"), y(t);
                var a = Et(!0, t, !0);
                if (n) n.setValue(a);
                e.removeClass("wyp-data-only-updated")
            }), y(t), window.ypData["vsl-css-vi-active"] && !1 == e && (YP._compat.Yt && YP._compat.Yt(), YP._compat.Zt && YP._compat.Zt()), sa(), getTn().removeClass(
                    "wyp-history-delay"), window.ypData["wyp-css-ed-act"] && _e(), n && n.getSession().removeMarker(
                    window.typeHereMarker), yt("all")
        }, t), setTimeout(function() {
            $()
        }, t + 20), A() && he(!0), 0 == o(".wyp-type-menu-link.done").length && (o(".wyp-type-menu-link").addClass("focus").addClass(
                "done"), setTimeout(function() {
                o(".wyp-type-menu-link").removeClass("focus")
        }, 600))
    }

    /* =========================================================================
     * Pi (RGB/RGBA color to HEX string converter)
     * ========================================================================= */
    function Pi(e) {
        return "undefined" == typeof e ? "" : -1 == e.indexOf("rgba") ? (e = e.match(
                /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i), e && 4 === e.length ? "#" + ("0" +
                parseInt(e[1], 10).toString(16)).slice(-2) + ("0" + parseInt(e[2], 10).toString(16)).slice(-2) + ("0" +
                parseInt(e[3], 10).toString(16)).slice(-2) : "") : e.replace(/\s+/g, "")
    }

    /* =========================================================================
     * Ri (HEX color to RGB string converter)
     * ========================================================================= */
    function Ri(e) {
        e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, a, i) {
                return t + t + a + a + i + i
        });
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? "rgb(" + parseInt(t[1], 16) + "," + parseInt(t[2], 16) + "," + parseInt(t[3], 16) + ")" : null
    }

    /* =========================================================================
     * Yi (clears active custom control/animation timers)
     * ========================================================================= */
    function Yi() {
        clearTimeout(window.animationTimer1), clearTimeout(window.animationTimer2), clearTimeout(window.animationTimer3), clearTimeout(window
                .animationTimer4), clearTimeout(window.animationTimer5)
    }

    /* =========================================================================
     * Ni (triggers animationend on the selected element)
     * ========================================================================= */
    function Ni() {
        getGi().find(_a()).trigger("animationend")
    }

    /* =========================================================================
     * Register in the global namespace & bridge
     * ========================================================================= */
    YP.panel = {
        ne: ne,
        be: be,
        Be: Be,
        je: je,
        Xe: Xe,
        fi: fi,
        Mi: Mi,
        Pi: Pi,
        Ri: Ri,
        Yi: Yi,
        Ni: Ni
    };

    Object.assign(YP._compat, YP.panel);

})(jQuery);
