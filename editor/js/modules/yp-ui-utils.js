/**
 * yp-ui-utils.js
 * Yellow Pencil – UI Utilities
 *
 * Generic helpers: alerts, cookies, font helpers, string builders, toasts.
 * Extracted from yellow-pencil.js.
 *
 * Dependencies: jQuery (o), window.YP, window.ypData, window.qi (i18n strings)
 */
(function (o) {
    "use strict";


function getGi() { return window.YP && window.YP.elements ? window.YP.elements.Gi : null; }
function getKi() { return window.YP && window.YP.elements ? window.YP.elements.Ki : null; }
function getJi() { return window.YP && window.YP.elements ? window.YP.elements.Ji : null; }
function getQi() { return window.YP && window.YP.elements ? window.YP.elements.Qi : null; }
function getTn() { return window.YP && window.YP.elements ? window.YP.elements.tn : null; }
function getOn() { return window.YP && window.YP.elements ? window.YP.elements.On : null; }
function setOn(v) { if (window.YP && window.YP.elements) window.YP.elements.setOn(v); }


    var YP = window.YP = window.YP || {};

    // ─── Internal references ────────────────────────────────────────────────────
    // getTn() = document.body (jQuery), set by yellow-pencil.js before modules load.
    // We defer resolution to first call to allow correct load order.
    function getTn() { return o(document.body); }

    /* =========================================================================
     * Alert Dialog  (original: k)
     * Shows a modal overlay with optional input, cancel, and OK button.
     * opts: { title, text, customClass, showInput, noButton, showCancelButton,
     *          confirmButtonText, confirmButtonColor }
     * callback: called when OK is clicked.
     * ========================================================================= */
    function showAlert(opts, callback) {
        var overlay, cancelBtn, okBtn;

        overlay = o("<div class='yellow-overlay'><div class='yellow-alert'></div></div>");

        if (opts.title)       overlay.find(".yellow-alert").append("<h2>" + opts.title + "</h2>");
        if (opts.text)        overlay.find(".yellow-alert").append("<p>" + opts.text + "</p>");
        if (opts.customClass) overlay.addClass(opts.customClass);
        if (opts.showInput)   overlay.find(".yellow-alert").append("<input type=\"text\" />");

        if (opts.noButton !== true) {
            overlay.find(".yellow-alert").append("<div class='button-container'></div>");

            if (opts.showCancelButton) {
                cancelBtn = o("<span class='cancel'>Cancel</span>");
                overlay.find(".button-container").append(cancelBtn);
                cancelBtn.on("click", function () {
                    getTn()().find(".yellow-overlay").remove();
                });
            }

            okBtn = o("<span>Ok!</span>");
            overlay.find(".button-container").append(okBtn);

            if (opts.confirmButtonText)  okBtn.text(opts.confirmButtonText);
            if (opts.confirmButtonColor) okBtn.css("background-color", opts.confirmButtonColor);
        }

        getTn()().find(".yellow-overlay").remove();
        getTn()().append(overlay);

        setTimeout(function () { overlay.css("opacity", "1"); }, 5);

        if (okBtn) {
            okBtn.on("click", function () {
                if (callback) callback();
                getTn()().find(".yellow-overlay").remove();
            });
        }
    }

    /* =========================================================================
     * Cookie Helpers  (original: R / I)
     * ========================================================================= */

    /**
     * Set a cookie with a 1-year expiry.
     * Original: R(name, value)
     */
    function setCookie(name, value) {
        var expires = "",
            date = new Date();
        date.setTime(date.getTime() + 31536000000); // 1 year
        expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    /**
     * Read a cookie value, returning an integer.
     * Falls back to `defaultValue` (or the CSS editor panel width for special key).
     * Original: I(name, defaultValue)
     */
    function getCookie(name, defaultValue) {
        var cookieKey = name + "=",
            cookies   = document.cookie.split(";"),
            i, cookie;

        for (i = 0; i < cookies.length; i++) {
            cookie = cookies[i];
            while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(cookieKey) === 0) {
                return parseInt(cookie.substring(cookieKey.length, cookie.length));
            }
        }

        // Special fallback: editor panel fix
        if (window.ypData["wyp-fix-pan"] && name === "visualManagerWidth") {
            return parseInt(o(".ed-pnl").width());
        }
        return parseInt(defaultValue);
    }

    /* =========================================================================
     * Font Family Cleaner  (original: P)
     * Strips quotes and returns just the first family name.
     * ========================================================================= */
    function cleanFontFamily(fontFamily) {
        if (fontFamily === null) return "";
        if (fontFamily.indexOf(",") !== -1) fontFamily = fontFamily.split(",")[0];
        fontFamily = o.trim(fontFamily).replace(/\W+/g, " ");
        return o.trim(fontFamily);
    }

    /* =========================================================================
     * Multi-value String Builder  (original: w)
     * Builds strings like "prefix:val1 suffix, prefix:val2 suffix"
     * separator = ","  produces a trimmed leading-comma result.
     * ========================================================================= */
    function buildMultiValue(base, prefix, suffix, pipeList) {
        var parts = pipeList.split("|");
        for (var i = 0; i < parts.length; i++) {
            base += prefix + parts[i] + suffix;
        }
        if (prefix === "," && suffix === "") {
            base = base.substring(1);
        }
        return base;
    }

    /* =========================================================================
     * Toast / Inline Notifications  (original: Li / Bi)
     * Li shows a non-blocking message bar; Bi removes one by id.
     *
     * These reference DOM elements created by the editor HTML —
     * they are lightweight wrappers that avoid touching CSS storage.
     * ========================================================================= */

    /**
     * Show a dismissible message box.
     * Original: Li(title, text, id)
     */
    function showToast(title, text, id) {
        if (o("#wyp-msg-" + id).length) return; // already shown

        var html = "<div id='wyp-msg-" + id + "' class='wyp-message-box'>" +
                   (title ? "<strong>" + title + "</strong> " : "") +
                   (text  ? text : "") +
                   "</div>";

        getTn()().append(html);

        // Auto-hide after 4 s
        setTimeout(function () {
            var el = o("#wyp-msg-" + id);
            el.css("opacity", "0");
            setTimeout(function () { el.remove(); }, 350);
        }, 4000);
    }

    /**
     * Remove a message box by id.
     * Original: Bi(id)
     */
    function hideToast(id) {
        var el = o("#wyp-msg-" + id);
        if (el.length) {
            el.css("opacity", "0");
            setTimeout(function () { el.remove(); }, 350);
        }
    }

    /* =========================================================================
     * Live Option Saver  (original: v)
     * Posts a single option value to the server immediately (no-op in demo mode).
     * ========================================================================= */
    function liveOptionSave(optionName, optionValue) {
        if (window.ypData.demo_mode || window.bMode) return false;
        return o.post(ajaxurl, {  // ajaxurl is a global set by WordPress
            action           : "wyp_live_save_option",
            wyp_option_name  : optionName,
            wyp_option_value : optionValue,
            _wpnonce         : window.wyp_editor_nonce
        });
    }

    /* =========================================================================
     * Clickable Selector Setter  (original: L)
     * Stores the last non-pseudo selector for re-selection.
     * ========================================================================= */
    function setClickableSelector(selector) {
        if (!/\:(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/gi.test(selector)) {
            window.ypData["data-clickable-select"] = selector;
        }
    }

    /* =========================================================================
     * Numeric Extractor  (original: mi)
     * Pulls the first numeric value out of a CSS string.
     * ========================================================================= */
    function extractNumber(cssValue) {
        if (cssValue === null || cssValue === undefined) return 0;
        var n = parseFloat(cssValue);
        return isNaN(n) ? 0 : n;
    }

    /* =========================================================================
     * Vendor Prefix Helpers  (original: g / h)
     * ========================================================================= */

    /**
     * Remove any vendor prefix from a CSS property name.
     * Original: g(e)
     */
    function stripVendorPrefix(prop) {
        return prop.replace(/(-webkit-|-moz-|-o-|-ms-|-khtml-)/g, "");
    }

    /**
     * Add -webkit- prefix to a CSS property name (stripping any existing prefix first).
     * Original: h(e)
     */
    function addWebkitPrefix(prop) {
        return "-webkit-" + prop.replace(/(-webkit-|-moz-|-o-|-ms-|-khtml-)/g, "");
    }

    /* =========================================================================
     * Export to namespace
     * ========================================================================= */
    YP.utils = {
        showAlert           : showAlert,
        setCookie           : setCookie,
        getCookie           : getCookie,
        cleanFontFamily     : cleanFontFamily,
        buildMultiValue     : buildMultiValue,
        showToast           : showToast,
        hideToast           : hideToast,
        liveOptionSave      : liveOptionSave,
        setClickableSelector: setClickableSelector,
        extractNumber       : extractNumber,
        stripVendorPrefix   : stripVendorPrefix,
        addWebkitPrefix     : addWebkitPrefix
    };

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        k   : showAlert,
        R   : setCookie,
        I   : getCookie,
        P   : cleanFontFamily,
        w   : buildMultiValue,
        Li  : showToast,
        Bi  : hideToast,
        v   : liveOptionSave,
        L   : setClickableSelector,
        mi  : extractNumber,
        g   : stripVendorPrefix,
        h   : addWebkitPrefix
    });

})(jQuery);
