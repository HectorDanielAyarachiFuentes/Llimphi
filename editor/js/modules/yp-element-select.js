/**
 * yp-element-select.js
 * Yellow Pencil – Element Selection Engine
 *
 * Handles click/hover element picking inside the iframe:
 *   – Applies .wyp-selected on the target element
 *   – Resolves pseudo-class states (hover, focus, etc.)
 *   – Updates the selector input, tooltip, and current-element UI
 *   – Triggers CSS panel refresh, animation manager sync, and info panel
 *
 * Original functions: Q (selectElement), ee (centreAnimBar),
 *                     bi (getElementBreadcrumb), vi (getVirtualBreadcrumb),
 *                     da (getComputedStyle), At (clearMouseoverTrigger),
 *                     Ba (closeNavigation), Di (rebuildDomContextMenu)
 *
 * Dependencies: jQuery (o), window.YP, window.qi, window.ypData, window.ypOption
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    // ─── Lazy refs ────────────────────────────────────────────────────────────
    function Gi()  { return o("#iframe").contents(); }
    function Ji()  { return o("#iframe").contents().find("body"); }
    function tn()  { return o(document.body); }
    function _()   { return window.ypData.get_selected_element; }
    function C()   { return window.ypData.is_content_selected; }
    function T()   { return window.ypData.is_animation_manager; }
    function A()   { return window.ypData.is_responsive_mod; }
    function K(v)  { return typeof v !== "undefined" && v !== false && v !== "" && v !== " " && v !== "undefined" && v !== null; }
    function J(v)  { return !K(v); }

    function resolveSelector(s, h, f, c, os) { return YP.selector ? YP.selector.resolveSelector(s, h, f, c, os) : s; }
    function validateSelector(s, q)          { return YP.selector ? YP.selector.validateSelector(s, q) : false; }
    function getCleanSelector(s)             { return YP.selector ? YP.selector.getCleanSelector(s) : s; }
    function setClickableSelector(s)         { if (YP.utils) YP.utils.setClickableSelector(s); }
    function getActiveSelector()             { return YP.selector ? YP.selector.getActiveSelector() : ""; }

    /* =========================================================================
     * getComputedCSSValue / da
     *
     * Returns the computed CSS value for `prop` on element `el`,
     * stripping vendor prefixes.
     * ========================================================================= */
    function getComputedCSSValue(prop, el) {
        if (!el || el.length === 0) return "";
        var val = el.css(prop);
        if (!val || val === "none") {
            // Fallback: try prefixed
            var prefixed = window.getComputedStyle(el[0]);
            val = prefixed ? prefixed.getPropertyValue(prop) : "";
        }
        return val || "";
    }

    /* =========================================================================
     * getElementBreadcrumb / bi
     *
     * Returns a human-readable label for `selector` by finding the element
     * in the iframe and composing "tag#id.class (Nth Child)" labels.
     *
     * includeCount – append element count in parens
     * el           – explicit jQuery element (skip live lookup)
     * ========================================================================= */
    function getElementBreadcrumb(selector, includeCount, el) {
        if (!selector) return "";
        try {
            var target = el || Gi().find(selector).first();
            if (!target || target.length === 0) return getVirtualBreadcrumb(selector);

            var tag    = target.prop("tagName").toLowerCase();
            var id     = target.attr("id") ? "#" + target.attr("id") : "";
            var cls    = "";

            (target.attr("class") || "").split(" ").forEach(function (c) {
                c = o.trim(c);
                if (c && !/(wyp-|yp_|yp-)/.test(c)) cls += "." + c;
            });

            var label = tag + id + cls;

            if (includeCount) {
                var count = Gi().find(selector).length;
                if (count > 1) label += " (" + count + ")";
            }

            return label;
        } catch (e) {
            return selector;
        }
    }

    /* =========================================================================
     * getVirtualBreadcrumb / vi
     *
     * Returns a human-readable label for a selector that does NOT match
     * any live element (e.g. from CSS rules for elements off-screen / removed).
     * ========================================================================= */
    function getVirtualBreadcrumb(selector) {
        if (!selector) return "";
        var clean = selector.replace(/\s*>\s*/g, " › ").replace(/\s+/g, " ");
        return clean;
    }

    /* =========================================================================
     * centreAnimBar  (original: ee)
     * Centres the animation creator bar if it hasn't been dragged.
     * ========================================================================= */
    function centreAnimBar() {
        if (!o(".anim-bar").hasClass("anim-bar-dragged")) {
            o(".anim-bar").css("left", parseFloat(o(window).width() / 2) - o(".anim-bar").width() / 2);
        }
    }

    /* =========================================================================
     * selectElement  (original: Q)
     *
     * Core element-selection routine. Called when the user clicks/hovers
     * an element in the iframe.
     *
     * selector – resolved CSS selector string
     * target   – jQuery object of the clicked element (or null)
     * noHighlight – if truthy, skip triggering fakeOver highlight
     * ========================================================================= */
    function selectElement(selector, target, noHighlight) {
        if (window.ypData.inspector === "cursor") return false;

        window.mouseoverTrigger = true;
        if (noHighlight) clearMouseoverTrigger();
        if (selector.trim() === "*") return false;

        // Resolve pseudo-classes and validate
        var resolvedSel = resolveSelector(selector, true, true, false, false);
        var matchedEls  = validateSelector(resolvedSel, true, false, false);
        if (!matchedEls) return false;

        // Strip to clean display selector if option set
        var displaySel = window.ypOption.show_css_selector ? selector : getCleanSelector(selector);

        // Trigger visual highlight
        if (target !== null && !target.hasClass("wyp-selected")) {
            if (target === null) {
                if (typeof window.ypData["wyp-will-selected"] === "undefined") {
                    Gi().find(resolvedSel).filter(":visible").first().trigger("fakeOver").trigger("fakeClick");
                } else {
                    window.ypData["wyp-will-selected"].trigger("fakeOver").trigger("fakeClick");
                    window.ypData["wyp-will-selected"] = undefined;
                }
            } else {
                target.trigger("fakeOver").trigger("fakeClick");
            }
        }

        // Mark multiple matches
        var allMatched = Gi().find(resolveSelector(selector, true, true, true, true));
        allMatched.not(".wyp-selected,.wyp-multiple-selected").addClass("wyp-selected-others");

        // Apply selected state
        if (!allMatched.hasClass("wyp-selected")) {
            if (allMatched.length === 1) {
                allMatched.addClass("wyp-selected");
                window.ypData.get_selected_element = allMatched;
            } else if (allMatched.length > 1) {
                allMatched.first().addClass("wyp-selected");
                window.ypData.get_selected_element = allMatched.first();
            }
        }

        // Update panel state
        var Qi = o("#customizing-mode");
        Qi.addClass("wyp-con-slcd");
        window.ypData.is_content_selected = true;

        if (tn().hasClass("wyp-nvgtn-act")) closeNavigation();

        Ji().addClass("wyp-imp-chk");

        // Store dimensions for resize tracking
        window.orginalHeight = parseFloat((getComputedCSSValue("height", allMatched) || "").replace(/px/g, ""));
        window.orginalWidth  = parseFloat((getComputedCSSValue("width",  allMatched) || "").replace(/px/g, ""));

        // Float detection
        var marginLeft = getComputedCSSValue("margin-left", allMatched);
        var leftBefore = allMatched.offset().left;
        allMatched.css("margin-left", "2px");
        var floated = getComputedCSSValue("float", allMatched) === "right" || leftBefore === allMatched.offset().left;
        floated ? Ji().addClass("wyp-element-float") : Ji().removeClass("wyp-element-float");

        // Restore margin
        var origStyle = allMatched.attr("style");
        if (origStyle === undefined) {
            allMatched.removeAttr("style");
        } else if (origStyle.indexOf("margin-left") === -1) {
            allMatched.css("margin-left", "");
        } else {
            allMatched.css("margin-left", marginLeft);
        }

        // Tag-based class additions
        var tag = allMatched.prop("tagName").toLowerCase();
        (tag === "ul" || tag === "ol" || tag === "li")
            ? tn().addClass("wyp-element-list")
            : tn().removeClass("wyp-element-list");

        // Update selector tooltip
        var sn = { general: o(".sn-general") };
        if (sn.general.length) {
            var tooltipTitle = sn.general.css("--tooltip-title");
            if (J(tooltipTitle)) tooltipTitle = getElementBreadcrumb(selector, true, allMatched);
            sn.general.get(0).style.setProperty("--tooltip-selector", "\"" + selector + "\"");
            sn.general.get(0).style.setProperty("--tooltip-title",    "\"" + tooltipTitle + "\"");
        }

        var qi = window.qi || {};
        C() ? o("#wyp-crnt-el").text(getElementBreadcrumb(selector, true, allMatched)) : o("#wyp-crnt-el").text(qi.no_el_selected || "");

        Ji().removeClass("wyp-imp-chk");

        // Apply pseudo-class state
        var pseudoMap = {
            ":hover"    : "yp-selector-hover",
            ":focus"    : "yp-selector-focus",
            ":visited"  : "yp-selector-visited",
            ":link"     : "yp-selector-link",
            ":active"   : "yp-selector-active",
            ":checked"  : "yp-selector-checked",
            ":disabled" : "yp-selector-disabled",
            ":enabled"  : "yp-selector-enabled",
            ":invalid"  : "yp-selector-invalid",
            ":valid"    : "yp-selector-valid"
        };

        if (/:/g.test(selector)) {
            Object.keys(pseudoMap).forEach(function (pseudo) {
                if (new RegExp(pseudo.replace(":", "\\:"), "g").test(selector)) {
                    Ji().addClass(pseudoMap[pseudo]);
                    tn().attr("data-wyp-selector", pseudo);
                    selector = selector.replace(new RegExp(pseudo.replace(":", "\\:"), "g"), "");
                }
            });
        }

        window.setSelector = selector;
        setClickableSelector(selector);

        // Notify other subsystems
        if (window.ypData["wyp-css-ed-act"] && typeof window.YP_refreshCSSEditor === "function") {
            window.YP_refreshCSSEditor();
        }
        if (window.ypData["vsl-css-vi-active"] && typeof window.YP_refreshVisualPanel === "function") {
            window.YP_refreshVisualPanel();
        }

        if (!window.targetIsParentTree) {
            setTimeout(function () {
                if (typeof window.YP_scrollPanelToSelector === "function") window.YP_scrollPanelToSelector();
            }, 96);
        }

        if (T() && YP.animation) YP.animation.buildAnimationManager();

        setTimeout(function () {
            if (typeof window.YP_initContextMenu === "function") window.YP_initContextMenu();
        }, 64);

        // Property panel refresh
        if (typeof window.YP_refreshPropertyPanel === "function") {
            o.throttle(window.YP_refreshPropertyPanel, 32)();
        }

        // Info panel update
        if (o(".advanced-info-box").css("display") === "block" && YP.infoPanel) {
            YP.infoPanel.updateInfoPanel("element");
        }

        window.setSelector    = false;
        window.mouseoverTrigger = false;

        // Rebuild DOM context menu
        rebuildDomContextMenu();

        // Update breadcrumb path
        if (typeof window.YP_updateBreadcrumb === "function") window.YP_updateBreadcrumb();
    }

    /* =========================================================================
     * clearMouseoverTrigger / At
     * Resets the internal mouse-over state.
     * ========================================================================= */
    function clearMouseoverTrigger() {
        window.mouseoverTrigger = false;
    }

    /* =========================================================================
     * closeNavigation / Ba
     * Closes the navigation DOM panel.
     * ========================================================================= */
    function closeNavigation() {
        tn().removeClass("wyp-nvgtn-act");
        o(".wyp-navigate-panel").hide();
    }

    /* =========================================================================
     * rebuildDomContextMenu / Di
     * Triggers the DOM context menu rebuild in the iframe.
     * ========================================================================= */
    function rebuildDomContextMenu() {
        if (typeof window.YP_rebuildContextMenu === "function") {
            window.YP_rebuildContextMenu();
        }
    }

    /* =========================================================================
     * deselectElement
     * Clears all selection state.
     * ========================================================================= */
    function deselectElement() {
        Gi().find(".wyp-selected,.wyp-selected-others,.wyp-multiple-selected")
            .removeClass("wyp-selected wyp-selected-others wyp-multiple-selected");
        Ji().removeClass(
            "yp-selector-hover yp-selector-focus yp-selector-visited yp-selector-link " +
            "yp-selector-active yp-selector-checked yp-selector-disabled " +
            "yp-selector-enabled yp-selector-invalid yp-selector-valid"
        );
        window.ypData.is_content_selected = false;
        window.ypData.get_selected_element = undefined;
        o("#customizing-mode").removeClass("wyp-con-slcd");
        tn().removeAttr("data-wyp-selector");
        tn().removeClass("wyp-element-list wyp-element-float");
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.elementSelect = {
        selectElement         : selectElement,
        deselectElement       : deselectElement,
        getElementBreadcrumb  : getElementBreadcrumb,
        getVirtualBreadcrumb  : getVirtualBreadcrumb,
        getComputedCSSValue   : getComputedCSSValue,
        centreAnimBar         : centreAnimBar,
        clearMouseoverTrigger : clearMouseoverTrigger,
        closeNavigation       : closeNavigation,
        rebuildDomContextMenu : rebuildDomContextMenu
    };

    // Global hooks for cross-module calls
    window.YP_getElementLabel  = getElementBreadcrumb;
    window.YP_getVirtualLabel  = getVirtualBreadcrumb;

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        Q  : selectElement,
        ee : centreAnimBar,
        bi : getElementBreadcrumb,
        vi : getVirtualBreadcrumb,
        da : getComputedCSSValue,
        At : clearMouseoverTrigger,
        Ba : closeNavigation,
        Di : rebuildDomContextMenu
    });

})(jQuery);
