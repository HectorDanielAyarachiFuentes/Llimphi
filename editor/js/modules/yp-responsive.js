/**
 * yp-responsive.js
 * Yellow Pencil – Responsive Mode & Breakpoints
 *
 * Manages the breakpoint bar, iframe layout calculations,
 * and media-query CSS generation.
 *
 * Original functions: Y, N, X, he, j (layout/responsive helpers)
 *
 * Dependencies: jQuery (o), window.YP, window.ypData, window.ypOption, window.qi
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    /* =========================================================================
     * Internal shorthands
     * ========================================================================= */
    function isResponsiveMod()    { return window.ypData.is_responsive_mod; }
    function isAnimationManager() { return window.ypData.is_animation_manager; }
    function getCookie(k, d)      { return YP.utils ? YP.utils.getCookie(k, d) : parseInt(d); }
    function getCSSData(m, r)     { return YP.cssStorage ? YP.cssStorage.getCSSData(m, r) : ""; }
    function findRules(css, f, x) { return YP.cssParser ? YP.cssParser.findRules(css, f, x) : []; }

    /* =========================================================================
     * updateEditorLayout  (original: Y)
     *
     * Injects a <style> block into document.body that positions the CSS editor
     * panel according to the given width (and optional draggable height).
     * ========================================================================= */
    function updateEditorLayout(width, height) {
        var marginOffset = 0;
        if (window.ypOption.fixed_left_bar && !window.ypData["wyp-css-ed-drgable"]) {
            marginOffset = 44;
        }

        var css = "<style id='csseditor-personalized-view'>";
        css += "#css-data,#css-editor-bar,#left-area-editor{width:" + parseFloat(width) + "px!important}";
        css += "body.wyp-css-ed-act:not(.wyp-res-mod):not(.wyp-css-ed-drgable) #iframe{left:" +
               (width + marginOffset) + "px!important;margin-left:0 !important}";
        css += "body.wyp-css-ed-act:not(.wyp-css-ed-drgable):not(.wyp-fix-leftbar) .editor-leftbar," +
               "body.wyp-css-ed-act:not(.wyp-res-mod):not(.wyp-css-ed-drgable) .metric-top-tooltip," +
               "body.wyp-css-ed-act:not(.wyp-res-mod):not(.wyp-css-ed-drgable):not(.wyp-crnt-el-menu) " +
               ".context-menu-root:not(.dom_contextmenu){margin-left:" + (width + marginOffset) + "px!important}";

        if (window.ypOption.fixed_left_bar) {
            css += "body.wyp-fix-leftbar:not(.wyp-css-ed-drgable) #left-area-editor{left:44px !important;}";
            css += ".breakpoint-bar .min-width.breakpoint-item.last-min-breakpoint {width: calc(100% - 44px) !important;}";
        }

        var winWidth = o(window).width();
        if (width > 40 * winWidth / 100) {
            css += "body.wyp-css-ed-act:not(.wyp-css-ed-drgable) #ed-elt-tr{display:none !important}";
        } else {
            css += "body.wyp-css-ed-act:not(.wyp-css-ed-drgable) #ed-elt-tr{max-width:" +
                   parseFloat(40 * (100 - 100 * width / winWidth) / 100) + "% !important;}";
            css += "body.wyp-css-ed-act:not(.wyp-css-ed-drgable) #ed-elt-tr{left:" + width + "px!important;}";
            css += "body.wyp-css-ed-act.wyp-fix-leftbar:not(.wyp-css-ed-drgable) #ed-elt-tr{left:0px!important;z-index:9999999 !important;background-color:#d7d7d7 !important;}";
            css += "body.wyp-css-ed-act.wyp-fix-leftbar:not(.wyp-css-ed-drgable) #ed-elt-tr ul li:not(.active):after{border-left-color:#d7d7d7 !important;}";
            css += "body.wyp-css-ed-act.wyp-fix-leftbar:not(.wyp-css-ed-drgable) #ed-elt-tr ul li.active{background-color:#f8f8f8 !important;}";
        }

        if (height) {
            css += ".wyp-css-ed-drgable #css-data{height: " + height + "px;}" +
                   ".wyp-css-ed-drgable #left-area-editor{height: calc(" + height + "px + 36px);}";
        }

        css += "}</style>";

        o(document.body).find("#csseditor-personalized-view").remove();
        o(document.body).append(css);
    }

    /* =========================================================================
     * updateIframeLayout  (original: N)
     *
     * Computes the available iframe width factoring in open panels,
     * and injects a <style> block to position the iframe.
     *
     * If returnOnly is truthy, just returns the computed width without injecting.
     * ========================================================================= */
    function updateIframeLayout(returnOnly) {
        var totalOffset  = 0;
        var winWidth     = o(window).width();
        var leftBarWidth = 0;
        var responsive   = isResponsiveMod();
        var panelWidth   = 0;

        if (window.ypOption.fixed_left_bar) {
            leftBarWidth = 44;
            winWidth    -= leftBarWidth;
        }

        if (!responsive) {
            if (window.ypData["vsl-css-vi-active"])  totalOffset += o("#vsl-css-vi").width();
            if (window.ypData["wyp-css-ed-act"] && !window.ypData["wyp-css-ed-drgable"]) {
                totalOffset += o("#left-area-editor").width();
            }
        }

        var availableWidth = winWidth - totalOffset;

        if (window.ypData["wyp-fix-pan"] &&
            !o(document.body).hasClass("wyp-cln-lo-panel-only") &&
            !o(document.body).hasClass("wyp-cln-lo-manual") &&
            !isAnimationManager()) {
            totalOffset += o(".ed-pnl").width();
        }

        var iframeWidth = winWidth - totalOffset;

        if (returnOnly) return iframeWidth;

        o(document.body).find("#iframe-general-style").remove();

        var css = "<style id='iframe-general-style'>";
        css += "#iframe{width:" + iframeWidth + "px;}";

        if (window.ypOption.fixed_left_bar && !responsive) {
            css += "#iframe{margin-left:" + leftBarWidth + "px;}";
        }

        if (responsive) {
            panelWidth = o(".ed-pnl").width();

            if (window.ypOption.fixed_left_bar && window.ypOption.fixed_right_panel &&
                !o(document.body).hasClass("wyp-cln-lo-manual") &&
                !o(document.body).hasClass("wyp-cln-lo-panel-only") &&
                !isAnimationManager()) {
                css += ".responsive-size-text,#iframe{left:calc(50% - (" + panelWidth + "px/2) + (" + leftBarWidth + "px/2)) !important;}";
                css += ".breakpoint-bar{margin-left:" + leftBarWidth + "px !important;width:calc(100% - " + panelWidth + "px - " + leftBarWidth + "px) !important;}";
            } else if (window.ypOption.fixed_left_bar && window.ypOption.fixed_right_panel &&
                       o(document.body).hasClass("wyp-cln-lo-manual")) {
                css += ".responsive-size-text,#iframe{left:calc(50% + (" + leftBarWidth + "px/2)) !important;}";
                css += ".breakpoint-bar{margin-left:" + leftBarWidth + "px !important;width:calc(100% - " + leftBarWidth + "px) !important;}";
            } else if (window.ypOption.fixed_left_bar && window.ypOption.fixed_right_panel &&
                       o(document.body).hasClass("wyp-cln-lo-panel-only")) {
                var viWidth = o("#vsl-css-vi").width();
                css += ".responsive-size-text,#iframe{left:calc(50% - (" + viWidth + "px/2) + (" + leftBarWidth + "px/2)) !important;}";
                css += ".breakpoint-bar{margin-left:" + leftBarWidth + "px !important;width:calc(100% - " + viWidth + "px - " + leftBarWidth + "px) !important;}";
            } else if (window.ypOption.fixed_left_bar && !window.ypOption.fixed_right_panel) {
                css += ".responsive-size-text,#iframe{left:calc(50% + (" + leftBarWidth + "px/2)) !important;}";
                css += ".breakpoint-bar{margin-left:" + leftBarWidth + "px !important;width:calc(100% - " + leftBarWidth + "px) !important;}";
            } else if (!window.ypOption.fixed_left_bar && window.ypOption.fixed_right_panel) {
                css += ".responsive-size-text,#iframe{left:calc(50% - (" + panelWidth + "px/2)) !important;}";
                css += ".breakpoint-bar{width:calc(100% - " + panelWidth + "px) !important;}";
            }
        }

        css += "</style>";
        o(document.body).append(css);

        // Close context menu if open
        if (window.ypData.editor_context_menu_open) {
            var sel = YP.state ? YP.state.getSelectedElement() : undefined;
            if (sel) sel.contextMenu("hide");
        }

        // Re-center responsive view
        if (responsive && typeof window.YP_centerResponsiveView === "function") {
            window.YP_centerResponsiveView();
        }
    }

    /* =========================================================================
     * updateBreakpointBar  (original: X)
     *
     * Syncs the breakpoint bar UI: marks active, focused, and edited items.
     * ========================================================================= */
    function updateBreakpointBar() {
        o(".breakpoint-bar .breakpoint-item").removeClass("active focus edited");

        var items   = o(".breakpoint-bar .breakpoint-item");
        var iframeW = o("#iframe").width();
        var nn      = document.getElementById("iframe").contentWindow;
        var focused, breakWidth, editsCount;

        items.each(function () {
            var item       = o(this);
            var bpData     = item.attr("data-breakpoint-data");
            var rules      = findRules(getCSSData(null, false), "[msize=" + bpData + "]", true);

            item.attr("data-edits", rules.length);
            if (rules.length > 0) item.addClass("edited");

            if (nn.matchMedia(bpData).matches) {
                breakWidth = parseInt(item.css("width"));
                var sizeText = o(".responsive-size-text");

                if (iframeW <= breakWidth) {
                    o(".breakpoint-bar .breakpoint-item.focus").removeClass("focus");
                    item.addClass("focus");
                    sizeText.find(".device-size").text(item.attr("data-breakpoint"));
                }
            } else if (parseFloat(o(".breakpoint-bar .breakpoint-item.focus").attr("data-breakpoint")) !== iframeW) {
                var bp = item.attr("data-breakpoint");
                if (Math.abs(bp - iframeW) === 1) {
                    if (typeof window.YP_activateBreakpoint === "function") window.YP_activateBreakpoint(item);
                    return false;
                }
            }
        });

        o(".breakpoint-bar .breakpoint-item.focus").nextAll(".breakpoint-item").addClass("active");
        if (o(".breakpoint-bar .breakpoint-item.focus").length === 0) {
            o(".breakpoint-bar .breakpoint-item").addClass("active");
        }

        setTimeout(function () {
            if (typeof window.YP_updateResponsiveLiveStyle === "function") {
                window.YP_updateResponsiveLiveStyle();
            }
        }, window.Yellow2Delay || 10);
    }

    /* =========================================================================
     * getScrollbarWidth  (original: ei)
     * Returns the scrollbar width of the main window.
     * ========================================================================= */
    function getScrollbarWidth() {
        var outer = document.createElement("div");
        outer.style.cssText = "overflow:scroll;position:absolute;top:-9999px;";
        document.body.appendChild(outer);
        var width = outer.offsetWidth - outer.clientWidth;
        document.body.removeChild(outer);
        return width;
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.responsive = {
        updateEditorLayout  : updateEditorLayout,
        updateIframeLayout  : updateIframeLayout,
        updateBreakpointBar : updateBreakpointBar,
        getScrollbarWidth   : getScrollbarWidth
    };

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        Y  : updateEditorLayout,
        N  : updateIframeLayout,
        X  : updateBreakpointBar,
        ei : getScrollbarWidth
    });

})(jQuery);
