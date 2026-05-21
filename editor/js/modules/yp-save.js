/**
 * yp-save.js
 * Yellow Pencil – Save / AJAX + Layer Tree Helpers
 *
 * Handles persisting CSS to the server in single / template / global modes.
 * Also provides layer-tree building helpers (Ta, Sa, Ba, Ea, La),
 * CSS sanitisation helpers (ka, za), class-ranking helpers (ba, xa),
 * and the selector minimiser (Oa).
 *
 * Original functions: re (saveAll), ba, xa, ka, za, Oa, Sa, Ta, Ea, La, Ba
 *
 * Dependencies: jQuery (o), window.YP, window.qi, ajaxurl, window.wyp_editor_nonce
 */
(function (o) {
    "use strict";

    /* =========================================================================
     * Dynamic DOM element getters
     * All iframe-document references are resolved at call-time so that the
     * functions work correctly even when the iframe is loaded after this module.
     * ========================================================================= */
    function getGi()  { return window.YP && window.YP.elements ? window.YP.elements.Gi  : o("#iframe").contents(); }
    function getKi()  { return window.YP && window.YP.elements ? window.YP.elements.Ki  : getGi().find("html"); }
    function getJi()  { return window.YP && window.YP.elements ? window.YP.elements.Ji  : getGi().find("body"); }
    function getTn()  { return window.YP && window.YP.elements ? window.YP.elements.tn  : o(document.body); }
    function getOn()  { return window.YP && window.YP.elements ? window.YP.elements.On  : null; }
    function setOn(v) { if (window.YP && window.YP.elements) window.YP.elements.On = v; }

    /** Get the iframe's native document (for querySelectorAll) */
    function getIframeDoc() {
        var iframe = document.getElementById("iframe");
        if (!iframe) return null;
        return iframe.contentWindow ? (iframe.contentWindow.document || iframe.contentDocument) : iframe.contentDocument;
    }

    /** Get the selected element via the state module (original: _() ) */
    function getSelectedEl() {
        return window.YP && window.YP.state ? window.YP.state.getSelectedElement() : null;
    }

    var YP = window.YP = window.YP || {};

    /* =========================================================================
     * Helpers from the compat bridge (resolved lazily at call-time)
     * ========================================================================= */
    function _J(v)   { return window.YP && window.YP._compat && window.YP._compat.J ? window.YP._compat.J(v) : !v; }
    function _ua(s)  { return window.YP && window.YP._compat && window.YP._compat.ua ? window.YP._compat.ua(s) : s.split(" "); }
    function _Ca(a, b, c, d) { return window.YP && window.YP._compat && window.YP._compat.Ca ? window.YP._compat.Ca(a, b, c, d) : false; }
    function _ya(el) { return window.YP && window.YP._compat && window.YP._compat.ya ? window.YP._compat.ya(el) : ""; }
    function _bi(l, f, el) { return window.YP && window.YP._compat && window.YP._compat.bi ? window.YP._compat.bi(l, f, el) : l; }
    function _C()   { return window.YP && window.YP._compat && window.YP._compat.C ? window.YP._compat.C() : false; }
    function _i_(s) { return window.YP && window.YP._compat && window.YP._compat._i ? window.YP._compat._i(s) : s; }

    /* =========================================================================
     * ka (original: ka)
     * Normalises fancy Unicode quotes to ASCII equivalents.
     * ========================================================================= */
    function ka(e) {
        return e.replace(/[\u2018\u2019\u2032]/g, "'").replace(/[\u201c\u201d\u2033]/g, '"');
    }

    /* =========================================================================
     * za (original: za)
     * Strips comments, normalises whitespace, and optionally removes @media rules.
     * ========================================================================= */
    function za(e, t) {
        e = e.replace(/(\r\n|\n|\r)/g, "").replace(/\t/g, "");
        e = e.replace(/(\/\*)(.*?)\*\//g, "");
        e = e.replace(/\}\s+\}/g, "}}").replace(/\s+\{/g, "{");
        e = e.replace(/\s+\}/g, "}").replace(/\{\s+/g, "{");
        e = ka(e);
        if (true === t) e = e.replace(/@media(.*?)\}\}/g, "");
        return e;
    }

    /* =========================================================================
     * Oa (original: Oa)
     * Minimises a compound CSS selector by dropping redundant middle parts
     * while keeping the same match count.
     * ========================================================================= */
    function Oa(e) {
        var Gi = getGi();
        var t = 5, a = false, i = null, n, s, r, l, d, p;
        if (false !== window.minCrpdSlctr) t = window.minCrpdSlctr;
        p = _ua(e);
        if (p.length > t) {
            n = Gi.find(e).length;
            s = -1 === e.indexOf(">") ? p : e.replace(/\s+>\s+/g, ">");
            o.each(p, function () {
                if (false === a) {
                    if (-1 === e.indexOf(">")) {
                        s.shift(); r = s.join(" "); d = s.length;
                    } else {
                        s = (false === /^[^\s>]+\s/.test(s))
                            ? s.replace(/\s[^\s>]+\s/, " ")
                            : s.replace(/^[^\s>]+\s/, "");
                        r = s; d = _ua(s);
                    }
                    l = Gi.find(r).length;
                    if (n === l) { i = r; }
                    if (d <= t && n === l) { a = true; e = r; }
                }
            });
        }
        if (a) {
            e = o.trim(e.replace(/>/g, " > "));
        } else if (null !== i) {
            e = o.trim(i.replace(/>/g, " > "));
        }
        return e;
    }

    /* =========================================================================
     * xa (original: xa)
     * Given a sorted array of class names, returns the "best" representative
     * class by looking for a short prefix that uniquely identifies elements.
     * ========================================================================= */
    function xa(e) {
        var Gi = getGi();
        var t  = e[0],
            a  = e[0].split(/[-_]/)[0] + e[0].charAt(e[0].split(/[-_]/)[0].length) + e[0].split(/[-_]/)[1],
            n  = null,
            s  = null,
            ok = false,
            r  = Gi,
            l, d, c;

        for (l = 2;
             l < e[0].split(/[-_]/).length - 1 &&
             (a  = a + e[0].charAt(a.length) + e[0].split(/[-_]/)[l],
              n  = e[0].split(/[-_]/)[e[0].split(/[-_]/).length - l],
              !(3 > n.length || /(\d|current|active)/g.test(n)));
             l++) {
            for (d = 0; d < e.length; d++) {
                if (e[d] === a) { t = a; ok = true; break; }
            }
            if (ok) break;
        }

        if (!ok && null !== e[0].split(/[-_]/)[e[0].split(/[-_]/).length - 2]) {
            for (c  = e[0].split(/[-_]/)[e[0].split(/[-_]/).length - 2] +
                     e[0].charAt(e[0].length - e[0].split(/[-_]/)[e[0].split(/[-_]/).length - 1].length - 1) +
                     e[0].split(/[-_]/)[e[0].split(/[-_]/).length - 1],
                 l  = e[0].split(/[-_]/).length - 1;
                 2 < l &&
                 (c = e[0].split(/[-_]/)[l - 2] + e[0].charAt(e[0].length - c.length - 1) + c,
                  s = e[0].split(/[-_]/)[e[0].split(/[-_]/).length - l - 1],
                  !(3 > s.length || /(\d|current|active)/g.test(s)));
                 l--) {
                for (d = 0; d < e.length; d++) {
                    if (e[d] === c) { t = c; break; }
                }
                if (ok) break;
            }
        }

        var u = getSelectedEl();
        if (u && 0 < u.length) r = u.parent();
        return r.find("." + e[0]).length === r.find("." + t).length ? t : e[0];
    }

    /* =========================================================================
     * ba (original: ba)
     * Picks the "best" class token from a class array: prefers hyphenated classes,
     * avoids triple-character repetition, and sorts by length.
     * ========================================================================= */
    function ba(e, t, a) {
        var Gi = getGi();
        if (0 === e.length) return false;
        if (1 === e.length && true === a) return false;
        if (false === t) {
            if (1 === e.length && false === a) return !!(1 < e[0].length) && ("." + e[0]);
        } else if (1 === e.length && false === a) return !!(1 < e[0].length) && e;

        var n = [], s = [], r = [], l = [], d = [], p = [], c = [], u;
        for (u = 0; u < e.length; u++) {
            if (r = [], l = [], !/(,|\[|\]|\#)/g.test(e[u])) {
                Gi.find("." + e[u]).each(function () {
                    var el = o(this);
                    r.push(el.parents().length);
                    l.push(el.prop("tagName"));
                });
                var m = r.every(function (v, i, arr) { return v === arr[0]; }),
                    f = l.every(function (v, i, arr) { return v === arr[0]; });
                if (m && f) n.push(e[u]);
            }
        }
        if (0 === n.length) n = e;
        for (u = 0; u < n.length; u++) {
            if (false === /\_/g.test(n[u]) && true === /\-/g.test(n[u])) p.push(n[u]);
        }
        if (0 === p.length) {
            for (u = 0; u < n.length; u++) {
                if (false === /\-/g.test(n[u]) && true === /\_/g.test(n[u])) c.push(n[u]);
            }
            s = (0 === c.length) ? n : c;
        } else {
            s = p;
        }
        for (u = 0; u < s.length; u++) {
            if (false === /(.)\\1\\1/.test(s[u])) d.push(s[u]);
        }
        if (0 === d.length) d = n;
        d.sort(function (a, b) { return b.length - a.length; });
        return t ? d : ("." + xa(d));
    }

    /* =========================================================================
     * Sa (original: Sa)
     * Returns true when a DOM node should appear in the layer tree
     * (filters out editor-internal, invisible, and utility elements).
     * ========================================================================= */
    function Sa(e, t, a, i, n) {
        return "LINK" !== t && "STYLE" !== t && "SCRIPT" !== t && "PARAM" !== t &&
            "OPTION" !== t && "NOSCRIPT" !== t && "BR" !== t &&
            "wyp-anim-scenes" !== a && "animate-test-drive" !== a &&
            "wyp-animate-data" !== a && "yellow-pencil-canvas" !== a &&
            "yellow-pencil-focus-canvas" !== a && "yellow-pencil-other-canvas" !== a &&
            "yellow-pencil-extra-canvas" !== a && "elementor-device-mode" !== a &&
            !(i.contains("wyp-x-distance-border") || i.contains("wyp-y-distance-border") ||
              i.contains("hv-in-bx") || i.contains("wyp-size-handle") ||
              i.contains("wyp-slct-tooltip") || i.contains("wyp-slct-menu") ||
              i.contains("wyp-selected-tooltip") || i.contains("wyp-tooltip-small") ||
              i.contains("wyp-helper-tooltip") || i.contains("wyp-iframe-ph") ||
              i.contains("wyp-data-updated") || i.contains("wyp-inline-data") ||
              i.contains("wyp-multiple-selected") || i.contains("wyp-demo-link") ||
              i.contains("wyp-live-editor-link") || i.contains("context-menu-active") ||
              i.contains("wyp-selected-others-multiple-box") ||
              i.contains("wyp-selected-boxed-top") || i.contains("wyp-selected-boxed-bottom") ||
              i.contains("wyp-selected-boxed-left") || i.contains("wyp-selected-boxed-right") ||
              i.contains("wyp-selected-boxed-margin-left") || i.contains("wyp-zero-m-w") ||
              i.contains("wyp-size-handle") || i.contains("wyp-selected-boxed-margin-top") ||
              i.contains("wyp-selected-boxed-margin-bottom") || i.contains("wyp-selected-boxed-margin-right") ||
              i.contains("wyp-selected-boxed-padding-left") || i.contains("wyp-selected-boxed-padding-top") ||
              i.contains("wyp-selected-boxed-padding-bottom") || i.contains("wyp-selected-boxed-padding-right") ||
              i.contains("wyp-zero-m-h") || i.contains("wyp-drw-bx") ||
              i.contains("wyp-selected-bottom") || i.contains("wyp-fixed-tooltip")) &&
            !/^(\s+)?(clearfix|clear|clr|clrfix)(\s+)?$/gi.test(i) &&
            "none" !== e.css("display") && "0" !== e.css("opacity") &&
            ("DIV" !== t || false !== i || false !== a || "BODY" !== n.prop("tagName"));
    }

    /* =========================================================================
     * Ta (original: Ta)
     * Recursively builds the HTML for the layer-tree navigator panel.
     * e   – jQuery set of elements to scan (children of target parent)
     * t   – true when building the root <ul> (adds id='layer-tree-ul')
     * a   – current depth level (stops at 2)
     * ========================================================================= */
    function Ta(e, t, a) {
        if (!a) a = 0;
        var i = "", n = [], s = e.children(), r, l, d, p, c, u, m, f;
        if (0 < s.length) {
            if (2 < a) return i;
            i += t ? "<ul id='layer-tree-ul'>" : "<ul>";
            s.each(function (a) {
                if (n = [], r = o(this), u = r.prop("tagName"), c = r.prop("id"), p = this.classList,
                    t && "BODY" !== u) return true;
                if ("hidden" === r.css("visibility") && "svg" === u) return true;
                if (false === Sa(r, u, c, p, e)) return true;
                l  = _ya(r);
                d  = _bi(l, false, r);
                m  = r.children().filter(function () {
                    if (f = o(this), Sa(f, f.prop("tagName"), f.prop("id"), this.classList, e)) return e;
                });
                if (0 < m.length) n.push("has-children");
                if ("hidden" === r.css("visibility")) n.push("is-hidden");
                n = (0 < n.length) ? "class='" + n.join(" ") + "' " : "";

                // SVG icon – default box icon
                var icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g><g><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10V0Z"></path></g></g></svg>';
                if (/header/i.test(d)) {
                    icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)" fill="currentColor"></path><path d="M0,0H9" transform="translate(42.5 75.5)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>';
                } else if (/footer/i.test(d)) {
                    icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)"></path><path d="M0,0H9" transform="translate(42.5 78.5)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>';
                } else if (/column/i.test(d)) {
                    icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)"></path><path d="M0,0H9.221" transform="translate(47 81.221) rotate(-90)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>';
                } else if (/row/i.test(d)) {
                    icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)"></path><path d="M0,0H9.451" transform="translate(42.274 76.79)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>';
                } else if (/section/i.test(d) || "SECTION" === u) {
                    icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)"></path><path d="M0,0H9" transform="translate(42.5 74.5)" fill="currentColor" stroke="currentColor" stroke-width="1"></path><path d="M0,0H9" transform="translate(42.5 79.5)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>';
                } else if ("BODY" === u) {
                    icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-32 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(32 72)"/><rect fill="currentColor" width="9.5" height="2.8" transform="translate(32.25 72.25)"/></g></svg>';
                }
                i += "<li " + n + "data-index='" + a + "'>" +
                     "<div class='layer-tree-wrap'>" +
                     "<div class='yicon icon-arrow-down'></div>" +
                     "<div class='layer-tree-title'>" + icon + d + "</div>" +
                     "</div></li>";
            });
            i += "</ul>";
        }
        return i;
    }

    /* =========================================================================
     * Ea (original: Ea)
     * Returns an array of DOM-index breadcrumbs from the selected element up
     * to <html>. Used by Ba to scroll the layer tree to the selected node.
     * ========================================================================= */
    function Ea(e) {
        var t;
        if (e) {
            t = [e.index()];
            e.parentsUntil("html").each(function () {
                t.push(o(this).index());
            });
            t.reverse();
        } else {
            t = null;
        }
        return t;
    }

    /* =========================================================================
     * La (original: La)
     * Walks the layer tree DOM using the breadcrumb path stored on a <li>
     * element and returns the matching live DOM element.
     * ========================================================================= */
    function La(e) {
        var Ki = getKi();
        var t = parseInt(e.attr("data-index")), a, n, s;
        a = [t];
        e.parentsUntil("#layer-tree").each(function () {
            e = o(this);
            if ("LI" === e.prop("tagName")) a.push(parseInt(e.attr("data-index")));
        });
        a.reverse();
        s = Ki;
        for (n = 0; n < a.length; n++) s = s.children().eq(a[n]);
        return s;
    }

    /* =========================================================================
     * Ba (original: Ba)
     * Scrolls the layer-tree panel to highlight the currently selected element.
     * ========================================================================= */
    function Ba() {
        var e, t;
        if (false === window.triggedByNav && _C()) {
            e = Ea(getSelectedEl());
            if (!e) return true;
            t = o("#layer-tree");
            t.find(".selected").removeClass("selected");
            var a = t, found = false, s;
            for (s = 0; s < e.length && (a = a.children("ul").children("li[data-index=\"" + e[s] + "\"]"),
                 a.hasClass("active") || !(e.length > s + 1)); s++) {
                if (s + 1 === e.length) {
                    a.addClass("selected");
                    var r = o("#layer-tree-ul");
                    if (0 < r.length) r.scrollTop(t.offset().top - r.offset().top - r.height() / 2 + r.scrollTop());
                    found = true;
                }
            }
            if (true !== found) {
                var l = -1;
                for (s = 0; s < e.length; s++) (function (idx) {
                    setTimeout(function () {
                        if (l++, t = t.children("ul").children("li[data-index=\"" + e[l] + "\"]"),
                            t.hasClass("active") || t.find(".layer-tree-wrap > .icon-arrow-down").trigger("click"),
                            l + 1 === e.length && 0 < t.length) {
                            t.addClass("selected");
                            var a = o("#layer-tree-ul");
                            a.scrollTop(t.offset().top - a.offset().top - a.height() / 2 + a.scrollTop());
                        }
                    }, 50 * idx);
                })(s);
            }
        }
    }

    /* =========================================================================
     * saveAll  (original: re)
     *
     * Iterates over all elements with .wyp-data-updated and POSTs their CSS
     * to the server. Also saves a preview copy and selector comments.
     *
     * pageId   – WP page ID (for 'single' mode)
     * pageType – WP page type (for 'template' mode, e.g. 'home', 'login')
     * ========================================================================= */

    function _handleSaveError(errorCode) {
        var qi = window.qi || {};
        o(".wyp-save-btn")
            .text(qi.save || "Save")
            .removeClass("wyp-disabled")
            .addClass("waiting-for-save");
        clearInterval(window.savingChecker);
        window.saveFromEditor = false;
        var showAlert = YP.utils ? YP.utils.showAlert : function () {};
        if (errorCode === "nonce_error") {
            showAlert({ title: qi.save_error, text: qi.save_error_nonce_msg });
        } else if (errorCode === "authorized_error") {
            showAlert({ title: qi.save_error, text: qi.save_error_authorized_msg });
        } else if (errorCode === "json_error") {
            showAlert({ title: qi.save_error, text: qi.save_error_json_msg });
        } else {
            showAlert({ title: qi.save_error, text: qi.save_error_msg });
        }
    }

    function _postSave(params, onSuccess) {
        params._wpnonce = window.wyp_editor_nonce;
        return o.post(ajaxurl, params)
            .done(function (response) {
                if (response === "nonce_error" || response === "authorized_error" || response === "json_error") {
                    _handleSaveError(response);
                } else {
                    if (typeof onSuccess === "function") onSuccess();
                }
            })
            .fail(function () { _handleSaveError("network"); });
    }

    function saveAll(pageId, pageType) {
        if (window.bMode) return false;
        var qi         = window.qi || {};
        var allCSS     = "";
        var totalSaves = 0;
        var doneSaves  = 0;

        function getEditorData(mode) {
            if (typeof window.YP_getEditorData === "function") return window.YP_getEditorData(mode);
            return "";
        }
        function getProcessedCSS(mode) {
            if (typeof window.YP_getProcessedCSS === "function") return window.YP_getProcessedCSS(mode);
            return "";
        }

        getGi().find(".wyp-data-updated").each(function () {
            totalSaves++;
            var mode         = o(this).attr("data-source-mode");
            var editorData   = getEditorData(mode);
            var processedCSS = getProcessedCSS(mode);
            allCSS += processedCSS;
            var saveMode = mode, saveType = pageType;
            if (pageId === "home" && mode === "single")           { saveMode = "template"; saveType = pageId; }
            if ((pageId === "login" || pageId === "lostpassword" || pageId === "register") && mode === "single") {
                saveMode = "template"; saveType = pageId;
            }
            var params = { action: "wyp_ajax_save", wyp_data: processedCSS, wyp_editor_data: editorData };
            if (saveMode === "single")    params.wyp_page_id   = pageId;
            else if (saveMode === "template") params.wyp_page_type = saveType;
            _postSave(params, function () { doneSaves++; });
        });

        _postSave({ action: "wyp_preview_data_save", wyp_data: allCSS }, function () { doneSaves++; });
        _postSave({ action: "wyp_save_comments_option", wyp_selector_comments: JSON.stringify(window.selectorComments || {}) }, function () { doneSaves++; });

        var expectedDone = totalSaves + 2;
        window.savingChecker = setInterval(function () {
            if (doneSaves === expectedDone) {
                o(".wyp-save-btn").text(qi.saved || "Saved").addClass("wyp-disabled").removeClass("waiting-for-save");
                clearInterval(window.savingChecker);
                window.saveFromEditor = false;
                getGi().find(".wyp-data-updated").removeClass("wyp-data-updated");
                o(".customizing-type-updated").removeClass("customizing-type-updated");
                o.post(ajaxurl, { action: "wyp_ajax_update_css", _wpnonce: window.wyp_editor_nonce });
                if ("none" === o("#wyp-customizing-type-frame").css("display")) {
                    if (typeof window.YP_refreshTypeFrame === "function") window.YP_refreshTypeFrame(true);
                }
            }
        }, 200);
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.save = {
        saveAll : saveAll,
        ba      : ba,
        xa      : xa,
        ka      : ka,
        za      : za,
        Oa      : Oa,
        Sa      : Sa,
        Ta      : Ta,
        Ea      : Ea,
        La      : La,
        Ba      : Ba
    };

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        re : saveAll,
        ba : ba,
        xa : xa,
        ka : ka,
        za : za,
        Oa : Oa,
        Sa : Sa,
        Ta : Ta,
        Ea : Ea,
        La : La,
        Ba : Ba
    });

})(jQuery);
