/**
 * yp-selector.js
 * Yellow Pencil – Selector Engine
 *
 * Builds unique, minimal CSS selectors for elements inside the editor iframe.
 * Also handles pseudo-class injection and selector autocomplete queries.
 *
 * Original functions: ya, wa, ua, ma, fa, hi, Ca, xi, _i, gi, Da, Hi
 *
 * Dependencies: jQuery (o), window.YP, window.ypData, window.ypOption
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    /* =========================================================================
     * Helpers
     * ========================================================================= */
    function encodeSelector(sel) {
        return YP.cssParser ? YP.cssParser.encodeSelector(sel) : encodeURIComponent(sel);
    }

    function getIframe() { return o("#iframe").contents(); }

    /* =========================================================================
     * _i / cleanSelector  (original: _i)
     * Normalises whitespace and strips double child combinators.
     * ========================================================================= */
    function cleanSelector(sel) {
        return o.trim(sel)
            .replace(/\s+/g, " ")
            .replace(/\s?>\s?/g, " > ")
            .replace(/ > > /g, " > ")
            .replace(/^> /, "")
            .replace(/ >$/,  "");
    }

    /* =========================================================================
     * splitSelector  (original: ua)
     * Splits a compound selector string by spaces, honouring parens/brackets.
     * ========================================================================= */
    function splitSelector(selectorStr) {
        var parts    = [];
        var depth    = 0;
        var current  = "";

        for (var i = 0; i < selectorStr.length; i++) {
            var ch = selectorStr[i];
            if (ch === "(" || ch === "[") depth++;
            else if (ch === ")" || ch === "]") depth--;
            if (ch === " " && depth === 0) {
                if (current.length > 0) { parts.push(current); current = ""; }
            } else {
                current += ch;
            }
        }
        if (current.length > 0) parts.push(current);
        return parts;
    }

    /* =========================================================================
     * splitClasses  (original: ma)
     * Splits a compound class string (e.g. ".foo.bar") into an array.
     * ========================================================================= */
    function splitClasses(str) {
        return str.split(".").filter(Boolean).map(function (c) { return "." + c; });
    }

    /* =========================================================================
     * filterClasses  (original: fa)
     * Removes blacklisted class tokens from a selector string.
     * ========================================================================= */
    function filterClasses(blacklist, str) {
        if (!blacklist || !blacklist.length) return str;
        for (var i = 0; i < blacklist.length; i++) {
            str = str.replace(new RegExp("(\\.|^)" + blacklist[i], "g"), "");
        }
        return str;
    }

    /* =========================================================================
     * deduplicateSelectors  (original: hi)
     * Removes duplicate entries from an array, preserving order.
     * ========================================================================= */
    function deduplicateSelectors(arr) {
        var seen   = {};
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (!seen[arr[i]]) { seen[arr[i]] = true; result.push(arr[i]); }
        }
        return result;
    }

    /* =========================================================================
     * buildSelector  (original: wa)
     *
     * Builds an unscoped CSS selector for a single DOM element by walking
     * its IDs, classes, and attributes.
     * ========================================================================= */
    function buildSelector(el) {
        var node = o(el);
        if (node.length === 0) return "";

        var tag = node.prop("tagName").toLowerCase();

        // ID takes priority (if not dynamically generated)
        var id = node.attr("id");
        if (id && !/^\d/.test(id) && !/[\s]/.test(id) && !/(yellow-pencil|wyp-|wyp_)/.test(id)) {
            return "#" + id;
        }

        // Collect classes (blacklisting YP internals)
        var blacklist = [
            "wyp-selected", "wyp-multiple-selected", "wyp-selected-others",
            "wyp-animating", "wyp-wf-on", "wyp-no-wf", "wyp-ele-n-vis",
            "wyp-pa-r", "yp_onscreen", "yp_hover", "yp_click", "yp_focus",
            "non-logged-in", "logged-in"
        ];

        var classes = [];
        node[0].className.split(" ").forEach(function (c) {
            c = o.trim(c);
            var skip = false;
            for (var i = 0; i < blacklist.length; i++) {
                if (c.indexOf(blacklist[i]) !== -1) { skip = true; break; }
            }
            if (c && !skip) classes.push("." + c);
        });

        var selector = tag + classes.join("");

        // If the selector is still ambiguous, add parent context
        if (getIframe().find(selector).length > 1) {
            var nthParent = 0;
            node.parent().children().each(function (i) {
                if (this === node[0]) { nthParent = i + 1; return false; }
            });
            selector += ":nth-child(" + nthParent + ")";
        }

        return selector;
    }

    /* =========================================================================
     * getSelector  (original: ya)
     *
     * Returns the cached or freshly built selector for `el`.
     * Caches the result in data-wyp-slctr to avoid repeated computation.
     * ========================================================================= */
    function getSelector(el) {
        var node     = o(el);
        var cacheKey = "data-wyp-slctr";
        var cached   = node.attr(cacheKey);
        if (cached) return cached;

        var sel = buildSelector(el);
        node.attr(cacheKey, sel);
        return sel;
    }

    /* =========================================================================
     * xi / resolveSelector  (original: xi)
     *
     * Resolves pseudo-classes: replaces :hover → .yp_hover etc.
     * Also handles :yp-onscreen, :yp-focus, :yp-click custom pseudo-classes.
     * ========================================================================= */
    function resolveSelector(sel, stripHover, stripFocus, stripClick, stripOnscreen) {
        if (stripHover)   sel = sel.replace(/(:|\.)yp-selector-hover/g,   ".yp_hover").replace(/:hover/g,   ".yp_hover");
        if (stripFocus)   sel = sel.replace(/(:|\.)yp-selector-focus/g,   ".yp_focus").replace(/:focus/g,   ".yp_focus");
        if (stripClick)   sel = sel.replace(/(:|\.)yp-selector-click/g,   ".yp_click").replace(/:click/g,   ".yp_click");
        if (stripOnscreen)sel = sel.replace(/(:|\.)yp-selector-onscreen/g,".yp_onscreen").replace(/:onscreen/g,".yp_onscreen");

        sel = sel.replace(/(:|\.)yp-selector-active/g,   ":active")
                 .replace(/(:|\.)yp-selector-visited/g,  ":visited")
                 .replace(/(:|\.)yp-selector-link/g,     ":link")
                 .replace(/(:|\.)yp-selector-checked/g,  ":checked")
                 .replace(/(:|\.)yp-selector-disabled/g, ":disabled")
                 .replace(/(:|\.)yp-selector-enabled/g,  ":enabled")
                 .replace(/(:|\.)yp-selector-invalid/g,  ":invalid")
                 .replace(/(:|\.)yp-selector-valid/g,    ":valid");

        return cleanSelector(sel);
    }

    /* =========================================================================
     * Ca / validateSelector  (original: Ca)
     *
     * Returns the selector only if it matches ≥ 1 element in the iframe,
     * or false if it would throw or match nothing.
     * ========================================================================= */
    function validateSelector(sel, quiet, noIframe, returnBool) {
        if (!sel) return false;
        try {
            var Gi = getIframe();
            if (noIframe) {
                var count = document.querySelectorAll(sel).length;
                return returnBool ? count > 0 : (count > 0 ? sel : false);
            }
            var matches = Gi.find(sel);
            return returnBool ? matches.length > 0 : (matches.length > 0 ? sel : false);
        } catch (err) {
            if (!quiet) console.warn("[yp-selector] invalid selector:", sel, err);
            return false;
        }
    }

    /* =========================================================================
     * Da / getCleanSelector  (original: Da)
     * Returns a version of the selector without the editor's internal class suffixes.
     * ========================================================================= */
    function getCleanSelector(sel) {
        return sel
            .replace(/\.yp_hover/g,    ":hover")
            .replace(/\.yp_focus/g,    ":focus")
            .replace(/\.yp_click/g,    ":click")
            .replace(/\.yp_onscreen/g, ":onscreen")
            .replace(/\.yp-selector-hover/g,    ":hover")
            .replace(/\.yp-selector-focus/g,    ":focus")
            .replace(/\.yp-selector-active/g,   ":active")
            .replace(/\.yp-selector-visited/g,  ":visited")
            .replace(/\.yp-selector-link/g,     ":link")
            .replace(/\.yp-selector-checked/g,  ":checked")
            .replace(/\.yp-selector-disabled/g, ":disabled")
            .replace(/\.yp-selector-enabled/g,  ":enabled")
            .replace(/\.yp-selector-invalid/g,  ":invalid")
            .replace(/\.yp-selector-valid/g,    ":valid");
    }

    /* =========================================================================
     * Hi / addConditionToSelector  (original: Hi)
     * Appends a body-class condition to a selector (e.g. body.logged-in .foo).
     * ========================================================================= */
    function addConditionToSelector(sel, condition) {
        var parts  = splitSelector(sel);
        var result = [];
        for (var i = 0; i < parts.length; i++) {
            result.push("body." + condition + " " + parts[i]);
        }
        return result.join(", ");
    }

    /* =========================================================================
     * getActiveSelector  (original: _a)
     * Returns the selector currently shown in the selector input field.
     * ========================================================================= */
    function getActiveSelector() {
        return o(document.body).attr("data-wyp-selector") || "";
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.selector = {
        getSelector           : getSelector,
        buildSelector         : buildSelector,
        splitSelector         : splitSelector,
        splitClasses          : splitClasses,
        filterClasses         : filterClasses,
        deduplicateSelectors  : deduplicateSelectors,
        resolveSelector       : resolveSelector,
        validateSelector      : validateSelector,
        cleanSelector         : cleanSelector,
        getCleanSelector      : getCleanSelector,
        addConditionToSelector: addConditionToSelector,
        getActiveSelector     : getActiveSelector
    };

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        ya : getSelector,
        wa : buildSelector,
        ua : splitSelector,
        ma : splitClasses,
        fa : filterClasses,
        hi : deduplicateSelectors,
        xi : resolveSelector,
        Ca : validateSelector,
        Da : getCleanSelector,
        Hi : addConditionToSelector,
        _i : cleanSelector,
        _a : getActiveSelector
    });

})(jQuery);
