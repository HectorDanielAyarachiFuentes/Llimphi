/**
 * yp-animation.js
 * Yellow Pencil – Animation Manager UI
 *
 * Builds and synchronises the Animation Manager timeline panel.
 * Handles animation bar rendering, resizable duration/delay bars, and
 * keyframe value extraction from the CSS data store.
 *
 * Original functions: H (buildAnimationManager), F (syncAnimationBars),
 *                     j (centerResponsiveView),
 *                     Vt (extractAnimValue), Ut (resolveAnimSelector),
 *                     yi (getAnimTypeLabel)
 *
 * Dependencies: jQuery (o), window.YP, window.qi, window.ypData
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    // ─── Lazy refs ────────────────────────────────────────────────────────────
    function Gi()  { return o("#iframe").contents(); }
    function tn()  { return o(document.body); }
    function C()   { return window.ypData.is_content_selected; }
    function A()   { return window.ypData.is_responsive_mod; }
    function E()   { return o(".active-customizing-list").attr("data-value"); }
    function K(v)  { return typeof v !== "undefined" && v !== false && v !== "" && v !== " " && v !== "undefined" && v !== null; }
    function J(v)  { return !K(v); }
    function getCSSData(m, r) { return YP.cssStorage ? YP.cssStorage.getCSSData(m, r) : ""; }
    function findRules(css, f){ return YP.cssParser  ? YP.cssParser.findRules(css, f) : []; }
    function encodeSelector(s){ return YP.cssParser  ? YP.cssParser.encodeSelector(s) : encodeURIComponent(s); }
    function resolveSelector(s,h,f,c,os){ return YP.selector ? YP.selector.resolveSelector(s,h,f,c,os) : s; }
    function validateSelector(s,q){ return YP.selector ? YP.selector.validateSelector(s,q) : false; }
    function getActiveSelector(){ return YP.selector ? YP.selector.getActiveSelector() : ""; }
    function updateIframeLayout(){ if (YP.responsive) YP.responsive.updateIframeLayout(); }
    function getCurrentSize(){ return YP.state ? YP.state.getCurrentSize() : "desktop"; }

    /* =========================================================================
     * extractAnimValue / Vt
     * Pulls the animation property value from a CSS rule comment-block string.
     * e.g. "... selector{animation-name: fadeIn !important}" → "fadeIn"
     * ========================================================================= */
    function extractAnimValue(blockStr) {
        var val = blockStr.replace(/(\/\*(.*?)\*\/|\n)/g, "").trim();
        val = val.split("{").pop().split("}")[0];
        val = val.split(":").pop().replace(/\s*!important\s*/g, "").replace(/;/g, "").trim();
        return val;
    }

    /* =========================================================================
     * resolveAnimSelector / Ut
     * Converts the stored selector (with .yp_hover etc.) to the clean version.
     * ========================================================================= */
    function resolveAnimSelector(blockStr) {
        var val = blockStr.replace(/(\/\*(.*?)\*\/|\n)/g, "").trim();
        // Extract selector portion (before first {)
        val = val.split("{")[0].trim();
        return resolveSelector(val, true, true, true, true);
    }

    /* =========================================================================
     * getAnimTypeLabel / yi
     * Returns a short label for the customising mode / trigger type.
     * ========================================================================= */
    function getAnimTypeLabel(str) {
        var qi = window.qi || {};
        if (!str) return "";
        if (str === "single")   return qi.single   || "Single";
        if (str === "template") return qi.template  || "Template";
        if (str === "global")   return qi.global    || "Global";
        if (str === "yp_hover")     return ":hover";
        if (str === "yp_focus")     return ":focus";
        if (str === "yp_click")     return ":click";
        if (str === "yp_onscreen")  return ":onscreen";
        return str;
    }

    /* =========================================================================
     * buildAnimationManager  (original: H)
     *
     * Re-renders the full animation manager timeline from the CSS data store.
     * ========================================================================= */
    function buildAnimationManager() {
        var qi = window.qi || {};

        // Track selectors already rendered
        var renderedSelectors = [];
        o(".wyp-anim-process-bar-area").each(function () {
            var sel = o(this).attr("data-selector-full");
            if (renderedSelectors.indexOf(sel) === -1) renderedSelectors.push(sel);
        });

        // Destroy old resizables and tooltips cleanly
        o(".wyp-animate-manager [data-toggle='tooltipAnim']").tooltip("destroy");
        if (o(".wyp-anim-process-bar-delay.ui-resizable-e,.wyp-anim-process-bar.ui-resizable-e").length) {
            o(".wyp-anim-process-bar-delay,.wyp-anim-process-bar").resizable("destroy");
        }
        o(".wyp-anim-el-column,.wyp-animate-bar").remove();
        o(".wyp-anim-metric").empty();

        // Rebuild second-metric ruler (60 seconds)
        for (var n = 1; n <= 60; n++) {
            o(".wyp-anim-metric").append("<div class=\"second\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><b>" + n + "s</b></div>");
        }

        var modes   = ["single", "template", "global"];
        var barIndex = 0;

        for (var mi = 0; mi < modes.length; mi++) {
            var mode    = modes[mi];
            var cssText = getCSSData(mode, false);
            var nameRules = findRules(cssText, "[rule=animation-name]");

            // Collect all animated selectors in this mode
            for (n = 0; n < nameRules.length; n++) {
                var resolvedSel = resolveAnimSelector(nameRules[n]);
                if (renderedSelectors.indexOf(resolvedSel) === -1) renderedSelectors.push(resolvedSel);
            }

            if (renderedSelectors.length === 0) continue;

            for (n = 0; n < renderedSelectors.length; n++) {
                var fullSel  = renderedSelectors[n];
                var dRules   = findRules(cssText, "[selector=" + encodeSelector(fullSel) + "][rule=animation-name]");

                for (var oi = 0; oi < dRules.length; oi++) {
                    barIndex++;
                    var block    = dRules[oi];
                    var msize    = (/\[msize\=(.*?)\]/.exec(block) || ["", "desktop"])[1].trim();
                    var cleanSel = resolvedSel.replace(/(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)click|yp(-|_)focus)/g, "");
                    var animName = extractAnimValue(block);
                    var trigger  = "yp_onscreen";

                    if (/yp(-|_)hover/g.test(fullSel))    trigger = "yp_hover";
                    else if (/yp(-|_)focus/g.test(fullSel))  trigger = "yp_focus";
                    else if (/yp(-|_)click/g.test(fullSel))  trigger = "yp_click";

                    var deviceLabel = msize === "desktop" ? (qi.all_devices || "All Devices") : msize;
                    var deviceBadge = deviceLabel ? " <span class='wyp-device-responsive'>" + deviceLabel + "</span><span class='wyp-type-anim-text'>" + getAnimTypeLabel(mode) + "</span>" : "";

                    var elLabel = "";
                    if (Gi().find(cleanSel).length > 0) {
                        // Use the built-in bi() / vi() helpers if available
                        elLabel = typeof window.YP_getElementLabel === "function"
                            ? window.YP_getElementLabel(cleanSel)
                            : cleanSel;
                    } else {
                        elLabel = typeof window.YP_getVirtualLabel === "function"
                            ? window.YP_getVirtualLabel(cleanSel)
                            : cleanSel;
                    }

                    var unavailableClass = validateSelector(cleanSel, true) ? "" : " unavailable-animate-bar";

                    // Duration
                    var durRules = findRules(cssText, "[selector=" + encodeSelector(fullSel) + "][rule=animation-duration][msize=" + msize + "]");
                    var duration = durRules.length > 0 ? extractAnimValue(durRules[0]) : "1s";

                    // Delay
                    var delRules = findRules(cssText, "[selector=" + encodeSelector(fullSel) + "][rule=animation-delay][msize=" + msize + "]");
                    var delay    = delRules.length > 0 ? extractAnimValue(delRules[0]) : "0s";

                    var durS = parseFloat(duration.replace(/[^0-9.]+/g, "")) || 1;
                    var delS = parseFloat(delay.replace(/[^0-9.]+/g, ""))   || 0;

                    var bars = "";
                    // Multiple animations (comma-separated)
                    if (animName.indexOf(",") !== -1) {
                        var animParts = animName.split(",");
                        var durParts  = duration.toString().indexOf(",") !== -1 ? duration.split(",") : null;
                        var delParts  = delay.toString().indexOf(",")    !== -1 ? delay.split(",")    : null;
                        var offset    = 0;

                        for (var ai = 0; ai < animParts.length; ai++) {
                            var aPart   = o.trim(animParts[ai]);
                            var durVal  = durParts ? parseFloat(o.trim(durParts[ai])) || 1 : durS;
                            var delVal  = delParts ? parseFloat(o.trim(delParts[ai])) || 0 : delS;
                            var delPx   = Math.max(10, Math.round(delVal * 100));
                            var durPx   = Math.round(durVal * 100);
                            var delPxAdj = delPx - offset;
                            var zeroClass = delPxAdj <= 10 ? " wyp-delay-zero" : "";

                            bars += "<div class='wyp-anim-process-bar-delay" + zeroClass + "' data-toggle='tooltipAnim' data-placement='top' title='" + (qi.delay || "Delay") + " " + delVal.toFixed(2) + "s' style='width:" + delPxAdj + "px;'></div>" +
                                    "<div class='wyp-anim-process-bar' data-toggle='tooltipAnim' data-placement='top' title='" + (qi.duration || "Duration") + ": " + durVal.toFixed(2) + "s' style='width:" + durPx + "px;'>" +
                                    "<span class='animate-part-icons wyp-control-trash' data-toggle='tooltipAnim' data-placement='top' title='" + (qi.delete_t || "Delete") + "'><span class='yicon icon-trash'></span></span>" +
                                    "<span class='animation-name'>" + aPart + "</span></div>";

                            offset = delPx + durPx;
                        }
                    } else {
                        var dPx = Math.max(10, Math.round(delS * 100));
                        var uPx = Math.round(durS * 100);
                        var zClass = dPx <= 10 ? " wyp-delay-zero" : "";

                        bars = "<div class='wyp-anim-process-bar-delay" + zClass + "' data-toggle='tooltipAnim' data-placement='top' title='" + (qi.delay || "Delay") + " " + delS.toFixed(2) + "s' style='width:" + dPx + "px;'></div>" +
                               "<div class='wyp-anim-process-bar' data-toggle='tooltipAnim' data-placement='top' title='" + (qi.duration || "Duration") + ": " + durS.toFixed(2) + "s' style='width:" + uPx + "px;'>" +
                               "<span class='animate-part-icons wyp-control-trash' data-toggle='tooltipAnim' data-placement='top' title='" + (qi.delete_t || "Delete") + "'><span class='yicon icon-trash'></span></span>" +
                               "<span class='animation-name'>" + animName + "</span></div>";
                    }

                    o(".wyp-anim-left-part-column").append(
                        "<div class='wyp-anim-el-column wyp-anim-el-column-" + encodeSelector(cleanSel) + unavailableClass + "' data-anim-media-size='" + msize + "'>" +
                        "<i data-title='" + cleanSel + "'></i><span>" + elLabel + "</span> <label>" + getAnimTypeLabel(trigger) + "</label>" + deviceBadge + "</div>"
                    );

                    o(".wyp-anim-right-part-column").append(
                        "<div class='wyp-animate-bar" + unavailableClass + "' id='wyp-animate-bar-" + barIndex + "'>" +
                        "<div class='wyp-anim-process-bar-area' data-responsive='" + msize + "' data-selector='" + cleanSel + "' data-selector-full='" + fullSel + "' data-anim-type='" + mode + "'>" +
                        "<div class='wyp-anim-process-inner'>" + bars + "</div>" +
                        "<a class='wyp-anim-add' data-toggle='tooltipAnim' data-placement='right' title='" + (qi.add_new_anim || "Add") + "'></a></div>"
                    );
                }
            }
        }

        // Active element row (if selected but not yet shown)
        var activeSel  = getActiveSelector();
        var activeSize = getCurrentSize();
        var activeCol  = o(".wyp-anim-el-column-" + encodeSelector(activeSel) + "[data-anim-media-size='" + activeSize + "']");

        if (K(activeSel) && activeCol.length === 0 && C()) {
            var elLbl = typeof window.YP_getElementLabel === "function" ? window.YP_getElementLabel(activeSel) : activeSel;
            var szLabel = activeSize === "desktop" ? " <span class='wyp-device-responsive'>" + ((window.qi || {}).all_devices || "All") + "</span>" : " <span class='wyp-device-responsive'>" + activeSize + "</span>";

            o(".wyp-anim-left-part-column").append(
                "<div class='wyp-anim-el-column anim-active-row wyp-anim-el-column-" + encodeSelector(activeSel) + "' data-anim-media-size='" + activeSize + "'>" +
                "<i data-title='" + activeSel + "'></i><span>" + elLbl + "</span> <label>onscreen</label>" + szLabel +
                "<span class='wyp-type-anim-text'>" + getAnimTypeLabel(E()) + "</span></div>"
            );
            o(".wyp-anim-right-part-column").append(
                "<div class='wyp-animate-bar anim-active-row' id='wyp-animate-bar-current'>" +
                "<div class='wyp-anim-process-bar-area' data-responsive='" + activeSize + "' data-anim-type='" + E() + "' data-selector='" + activeSel + "' data-selector-full='" + (activeSel + ".yp_onscreen") + "'>" +
                "<div class='wyp-anim-process-inner'></div>" +
                "<a class='wyp-anim-add' data-toggle='tooltipAnim' data-placement='right' title='" + ((window.qi || {}).add_new_anim || "Add") + "'></a></div>"
            );
        } else {
            activeCol.addClass("anim-active-row");
        }

        // Position zero-delay bars
        o(".wyp-delay-zero").each(function () {
            var innerLeft = o(".wyp-anim-process-inner").offset().left - 5;
            var barLeft   = o(this).next(".wyp-anim-process-bar").offset().left - innerLeft;
            o(this).css("left", barLeft);
            o(this).next(".wyp-anim-process-bar").addClass("wyp-anim-has-zero-delay");
        });

        // Init resizables on bars
        o(".wyp-anim-process-bar-delay,.wyp-anim-process-bar").resizable({
            handles: "e",
            minWidth: 10,
            start: function () {
                o(".wyp-anim-process-bar-delay,.wyp-anim-process-bar").not(this).tooltip("disable").tooltip("hide");
            },
            resize: function (e, t) {
                var bar   = o(this);
                var w     = t.size.width;
                var secs  = parseFloat((w / 100).toFixed(2));
                var label;

                if (bar.hasClass("wyp-anim-process-bar-delay")) {
                    label = (w <= 10 ? "0" : secs.toString());
                    label = ((window.qi || {}).delay || "Delay") + ": " + label;
                    if (w <= 10) {
                        bar.addClass("wyp-delay-zero");
                        bar.next(".wyp-anim-process-bar").addClass("wyp-anim-has-zero-delay");
                    } else if (bar.hasClass("wyp-delay-zero")) {
                        bar.removeClass("wyp-delay-zero").css("left", "0");
                        bar.next(".wyp-anim-process-bar").removeClass("wyp-anim-has-zero-delay");
                    }
                } else {
                    label = ((window.qi || {}).duration || "Duration") + ": " + secs;
                }

                // Reposition zero-delay bars in same row
                bar.parents(".wyp-animate-bar").find(".wyp-delay-zero").each(function () {
                    var iLeft = o(".wyp-anim-process-inner").offset().left - 5;
                    o(this).css("left", o(this).next(".wyp-anim-process-bar").offset().left - iLeft);
                });

                bar.attr("data-original-title", label + "s").tooltip("show");
            },
            stop: function () {
                syncAnimationBars();
                o(this).tooltip("hide");
                o(".wyp-anim-process-bar-delay,.wyp-anim-process-bar").tooltip("enable");
            }
        });

        // Init tooltips
        o("[data-toggle=\"tooltipAnim\"]").tooltip({ container: ".wyp-animate-manager", html: true });
        o("[data-toggle='tooltipAnim']").on("show.bs.tooltip", function () {
            o("[data-toggle='tooltipAnim']").not(this).tooltip("hide");
        });

        // Empty state
        o(".wyp-animate-bar").length === 0 ? o(".animation-manager-empty").show() : o(".animation-manager-empty").hide();

        // Expand bar area to maximum bar width
        var maxW = Math.max.apply(null, o(".wyp-anim-process-inner").map(function () { return o(this).outerWidth(true); }).get());
        o(".wyp-anim-process-bar-area").width(maxW + o(window).width());

        updateIframeLayout();
    }

    /* =========================================================================
     * syncAnimationBars  (original: F)
     *
     * Reads the current pixel widths of the draggable bars and writes them
     * back to the CSS data store as animation-name / duration / delay.
     * ========================================================================= */
    function syncAnimationBars() {
        window.ypData["wyp-animate-manager-mode"] = true;

        var maxW = Math.max.apply(null, o(".wyp-anim-process-inner").map(function () { return o(this).outerWidth(true); }).get());
        o(".wyp-anim-process-bar-area").width(maxW + o(window).width());

        o(".wyp-animate-bar").each(function () {
            var area      = o(this).find(".wyp-anim-process-bar-area");
            var fullSel   = area.attr("data-selector-full");
            var responsive = area.attr("data-responsive");
            var animType  = area.attr("data-anim-type");
            var names = [], durs = [], delays = [];
            var prevEnd = 0;

            o(this).find(".wyp-anim-process-bar,.wyp-anim-process-bar-delay").each(function () {
                var bar = o(this);
                var w   = bar.width();
                var sec = w / 100;

                if (bar.hasClass("wyp-anim-process-bar-delay")) {
                    if (o(this).parent().find(".wyp-anim-process-bar-delay").length === 1) {
                        // Single delay bar
                        var d = w <= 10 ? "0" : (Math.round(sec * 100) / 100).toString();
                        if (typeof window.YP_setProperty === "function") {
                            window.YP_setProperty(fullSel, "animation-delay", d + "s", "", responsive, animType);
                        }
                    } else {
                        // Multi-delay: offset based
                        var barLeft = bar.offset().left - bar.parents(".wyp-anim-process-inner").offset().left;
                        barLeft /= 100;
                        barLeft = Math.round(barLeft * 100) / 100;
                        if (w > 10) {
                            delays.push((Math.round((w / 100) * 100) / 100 + barLeft) + "s");
                        } else {
                            delays.push(barLeft + "s");
                        }
                    }
                } else if (bar.hasClass("wyp-anim-process-bar")) {
                    if (o(this).parent().find(".wyp-anim-process-bar").length === 1) {
                        // Single animation
                        if (typeof window.YP_setProperty === "function") {
                            window.YP_setProperty(fullSel, "animation-duration", sec, "s", responsive, animType);
                            window.YP_setProperty(fullSel, "animation-name", bar.text(), "", responsive, animType);
                        }
                        names.push(bar.text());
                    } else {
                        durs.push(sec + "s");
                        names.push(bar.text());
                    }
                }
            });

            if (names.length > 1 && typeof window.YP_setProperty === "function") {
                window.YP_setProperty(fullSel, "animation-delay",    delays.join(","), "", responsive, animType);
                window.YP_setProperty(fullSel, "animation-duration", durs.join(","),   "", responsive, animType);
                window.YP_setProperty(fullSel, "animation-name",     names.join(","),  "", responsive, animType);
            } else if (names.length === 0 && window.ypData["wyp-anim-removing"] && typeof window.YP_setProperty === "function") {
                window.YP_setProperty(fullSel, "animation-delay",    "disable", "", responsive, animType);
                window.YP_setProperty(fullSel, "animation-duration", "disable", "", responsive, animType);
                window.YP_setProperty(fullSel, "animation-name",     "disable", "", responsive, animType);
            }

            // Rebuild keyframes summary
            if (typeof window.YP_rebuildKeyframesSummary === "function") {
                window.YP_rebuildKeyframesSummary();
            }
        });

        window.ypData["wyp-animate-manager-mode"] = undefined;
    }

    /* =========================================================================
     * centerResponsiveView  (original: j)
     *
     * Positions the responsive handles and metric tooltip relative to the iframe.
     * Side: 'right' | 'left' | undefined (right)
     * ========================================================================= */
    function centerResponsiveView(side) {
        if (!A()) return false;

        var rect = o("#iframe").get(0).getBoundingClientRect();
        var h    = o(window).height() - rect.top;

        var css  = "body.wyp-res-mod:not(.wyp-crnt-el-menu) .context-menu-root:not(.dom_contextmenu){margin-left:" + rect.left + "px !important;}" +
                   ".responsive-right-handle{left:" + parseInt(rect.right) + "px !important;top:" + rect.top + "px !important;height:" + h + "px !important;}" +
                   ".responsive-left-handle{left:" + (rect.left - 14) + "px !important;top:" + rect.top + "px !important;height:" + h + "px !important;}";

        css += side === "left"
            ? "body.wyp-res-mod .metric-left-tooltip,body.wyp-res-mod .metric-top-border{transform:translate3d(" + parseInt(rect.left - 2) + "px, 0px, 0px) !important;}"
            : "body.wyp-res-mod .metric-left-tooltip,body.wyp-res-mod .metric-top-border{transform:translate3d(" + parseInt(rect.right) + "px, 0px, 0px) !important;}";

        css += o(".breakpoint-bar [data-breakpoint=" + parseInt(rect.width) + "]").length === 0
            ? ".responsive-add-breakpoint{left:" + rect.right + "px !important;display:block !important;}"
            : ".responsive-add-breakpoint{display:none !important;}";

        var styleEl = tn().find("#responsive-live-style");
        if (styleEl.length === 0) {
            tn().append("<style id='responsive-live-style'>" + css + "</style>");
        } else {
            styleEl.text(css);
        }
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.animation = {
        buildAnimationManager : buildAnimationManager,
        syncAnimationBars     : syncAnimationBars,
        centerResponsiveView  : centerResponsiveView,
        extractAnimValue      : extractAnimValue,
        resolveAnimSelector   : resolveAnimSelector,
        getAnimTypeLabel      : getAnimTypeLabel
    };

    // Expose for cross-module calls
    window.YP_centerResponsiveView = centerResponsiveView;
    window.YP_extractAnimValue     = extractAnimValue;

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        H  : buildAnimationManager,
        F  : syncAnimationBars,
        j  : centerResponsiveView,
        Vt : extractAnimValue,
        Ut : resolveAnimSelector,
        yi : getAnimTypeLabel
    });

})(jQuery);
