/**
 * yp-css-storage.js
 * Yellow Pencil – CSS Data Storage
 *
 * Handles reading and writing CSS from/to the DOM nodes that serve as
 * the editor's CSS store (style elements and textareas inside the iframe).
 *
 * Original functions: a, r, l, V (and helper St)
 *
 * Dependencies: jQuery (o), window.YP, window.ypData, window.qi
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    // ─── Lazy DOM references ──────────────────────────────────────────────────
    // These are resolved on first call so modules can be loaded before the
    // iframe is fully initialised.
    function getIframeDoc() {
        return document.getElementById("iframe").contentWindow.document ||
               document.getElementById("iframe").contentDocument;
    }

    /**
     * Returns the jQuery wrapper for the current mode's source element
     * (the <div data-source-mode="..."> inside #wyp-styles-area).
     * Original: St()
     */
    function getSourceElement() {
        // Equivalent of the original St() that returned the active data source element
        var mode   = YP.state ? YP.state.getActiveMode() : o(".active-customizing-list").attr("data-value");
        var an     = getIframeDoc();
        var el     = an.querySelector('[data-source-mode="' + mode + '"]');
        return el ? o(el) : o(an.getElementById("wyp-styles-area"));
    }

    /**
     * Check if `mode` is a named mode (single / template / global).
     * Used to decide which DOM node to read/write.
     * Equivalent of the original K() check for mode strings.
     */
    function isNamedMode(mode) {
        return typeof mode !== "undefined" &&
               mode !== false &&
               mode !== "" &&
               mode !== " " &&
               mode !== "undefined" &&
               mode !== null;
    }

    /* =========================================================================
     * getCSSData  (original: a)
     *
     * Reads all CSS for a given mode from the in-iframe DOM store.
     *   mode  – 'single' | 'template' | 'global' | null (active mode)
     *   raw   – if false, triggers a pre-process flush first
     *
     * Returns the CSS string with trailing whitespace normalised.
     * ========================================================================= */
    function getCSSData(mode, raw) {
        // Flush pending changes if switching away from an active mode
        if (raw === false) {
            var isEmpty = YP._compat && YP._compat.J;
            var needsProcess = window.ypData["wyp-need-to-process"];
            if (needsProcess && isEmpty && isEmpty(mode)) {
                // Equivalent of Zi() — the CSS flush function lives in the main IIFE
                if (typeof window.YP_flushCSS === "function") window.YP_flushCSS();
            }
        }

        var an   = getIframeDoc();
        var css;

        if (isNamedMode(mode)) {
            var el = an.querySelector('[data-source-mode="' + mode + '"]');
            if (el !== null) css = el.innerHTML;
        } else {
            var stylesArea = an.getElementById("wyp-styles-area");
            if (stylesArea) css = stylesArea.innerHTML;
        }

        if (css === undefined || css.length === 0) return "";

        return (css + " /*")
            .replace(/\n/g, "")
            .replace(/\s+/g, " ")
            .replace(/\s+:\s+/g, ":");
    }

    /* =========================================================================
     * setCSSData  (original: r)
     *
     * Writes `css` to the DOM store for `mode`.
     * Also marks the store element and the mode tab as "updated"
     * (unless flag === 'a', which suppresses UI feedback).
     * ========================================================================= */
    function setCSSData(css, mode, flag) {
        css = css.replace(/\/\*/g, "\n/*").replace(/\*\//g, "*/\n");

        var an = getIframeDoc();

        // Named mode: write to <div data-source-mode="X">
        if (isNamedMode(mode)) {
            if (flag !== "a") {
                var Gi = o("#iframe").contents();
                Gi.find('[data-source-mode="' + mode + '"]')
                    .addClass("wyp-data-updated wyp-data-only-updated");
                o("#c-t-list li[data-value='" + mode + "']")
                    .addClass("customizing-type-updated");
            }
            var namedEl = an.querySelector('[data-source-mode="' + mode + '"]');
            if (namedEl !== null) namedEl.innerHTML = css;

        } else {
            // Global/active mode
            if (flag !== "a") {
                getSourceElement().addClass("wyp-data-updated wyp-data-only-updated");
                o(".active-customizing-list").addClass("customizing-type-updated");
            }
            var stylesArea = an.getElementById("wyp-styles-area");
            if (stylesArea) stylesArea.innerHTML = css;
        }
    }

    /* =========================================================================
     * appendCSSData  (original: l)
     *
     * Appends `css` to the DOM store for `mode` without overwriting.
     * ========================================================================= */
    function appendCSSData(css, mode) {
        css = css.replace(/\/\*/g, "\n/*").replace(/\*\//g, "*/\n");
        var an = getIframeDoc();

        if (isNamedMode(mode)) {
            var el = an.querySelector('[data-source-mode="' + mode + '"]');
            if (el) el.insertAdjacentHTML("beforeend", css);
        } else {
            var stylesArea = an.getElementById("wyp-styles-area");
            if (stylesArea) stylesArea.insertAdjacentHTML("beforeend", css);
        }
    }

    /* =========================================================================
     * applyLiveCSS  (original: V)
     *
     * Injects processed CSS into the live preview <style> tag,
     * marks the data as needing a save, and updates UI state.
     * ========================================================================= */
    function applyLiveCSS(css) {
        var Ji    = o("#iframe").contents().find("body");
        var Gi    = o("#iframe").contents();
        var qi    = window.qi || {};

        // Ensure the live style tag exists
        if (Gi.find("#wyp-live-css-data").length === 0) {
            getSourceElement().after("<style id='wyp-live-css-data'></style>");
        }

        // Run through Ne() (CSS normaliser) if available
        if (typeof window.YP_normalizeCSS === "function") {
            css = window.YP_normalizeCSS(css);
        }

        // Apply to live style and clear the source store
        window.ypData["wyp-need-to-process"] = true;
        Gi.find("#wyp-live-css-data").text(css);
        getSourceElement().empty();
        Gi.find(".wyp-live-css").remove();

        // Update UI
        o(".wyp-save-btn")
            .text(qi.save || "Save")
            .removeClass("wyp-disabled")
            .addClass("waiting-for-save");

        getSourceElement().addClass("wyp-data-updated");
        o(".active-customizing-list").addClass("customizing-type-updated");
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.cssStorage = {
        getCSSData     : getCSSData,
        setCSSData     : setCSSData,
        appendCSSData  : appendCSSData,
        applyLiveCSS   : applyLiveCSS,
        getSourceElement: getSourceElement
    };

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        a : getCSSData,
        r : setCSSData,
        l : appendCSSData,
        V : applyLiveCSS
    });

})(jQuery);
