/**
 * yp-state.js
 * Yellow Pencil – State Guards & Value Validators
 *
 * Extracted from yellow-pencil.js (original IIFE).
 * Exposes read-only state getters and primitive helpers via window.YP.state.
 *
 * Dependencies: jQuery (o), window.ypData, window.YP (namespace created by yellow-pencil.js)
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    /* -------------------------------------------------------------------------
     * Value Validators
     * K(e) → isDefined   – truthy check (not undefined/false/empty/null)
     * J(e) → isEmpty     – falsy check
     * ------------------------------------------------------------------------- */

    /**
     * Returns true if `e` is a non-empty, defined value.
     * Original name: K
     */
    function isDefined(e) {
        return "undefined" !== typeof e &&
            false !== e &&
            "" !== e &&
            " " !== e &&
            "undefined" !== e &&
            null !== e;
    }

    /**
     * Returns true if `e` is empty / undefined / null / false.
     * Original name: J
     */
    function isEmpty(e) {
        return "undefined" === typeof e ||
            false === e ||
            "" === e ||
            " " === e ||
            "undefined" === e ||
            null === e;
    }

    /* -------------------------------------------------------------------------
     * Editor State Getters  (read-only wrappers over window.ypData)
     * ------------------------------------------------------------------------- */

    /** Is an element currently selected in the iframe? (original: C) */
    function isContentSelected() {
        return window.ypData.is_content_selected;
    }

    /** Is the user dragging an element? (original: z) */
    function isDragging() {
        return window.ypData.is_dragging;
    }

    /** Is the user resizing an element? (original: O) */
    function isResizing() {
        return window.ypData.is_resizing;
    }

    /** Is visual editing (margin/padding drag) active? (original: D) */
    function isVisualEditing() {
        return window.ypData.is_visual_editing;
    }

    /** Is responsive mode active? (original: A) */
    function isResponsiveMod() {
        return window.ypData.is_responsive_mod;
    }

    /** Is the animation creator open? (original: S) */
    function isAnimateCreator() {
        return window.ypData.is_animate_creator;
    }

    /** Is the animation manager panel open? (original: T) */
    function isAnimationManager() {
        return window.ypData.is_animation_manager;
    }

    /**
     * Returns the currently active customizing mode ('single', 'template', 'global').
     * Original name: E
     */
    function getActiveMode() {
        return o(".active-customizing-list").attr("data-value");
    }

    /**
     * Returns the currently selected element (jQuery object) or undefined.
     * Original name: _
     */
    function getSelectedElement() {
        return window.ypData.get_selected_element;
    }

    /* -------------------------------------------------------------------------
     * Body-level Data Store  (original: e / t)
     * Used to persist lightweight key-value pairs in data-b-mode-data attribute.
     * ------------------------------------------------------------------------- */

    /** Read the body data store. Original: e */
    function getBodyData() {
        var raw = document.body.getAttribute("data-b-mode-data");
        return (raw === undefined || raw === null) ? {} : JSON.parse(raw);
    }

    /** Write a key into the body data store. Original: t */
    function setBodyData(key, value) {
        var store = getBodyData();
        store[key] = value;
        document.body.setAttribute("data-b-mode-data", JSON.stringify(store));
    }

    /* -------------------------------------------------------------------------
     * CSS Media-size helpers  (original: Pe / Re)
     * Used when building media query wrappers around CSS rules.
     * ------------------------------------------------------------------------- */

    /** Returns '@media X {' or '' for desktop. Original: Pe */
    function mediaOpen(size) {
        return "desktop" === size ? "" : "@media " + size + "{";
    }

    /** Returns '}' or '' for desktop. Original: Re */
    function mediaClose(size) {
        return "desktop" === size ? "" : "}";
    }

    /* -------------------------------------------------------------------------
     * Current size getter  (original: Fe)
     * Returns the current responsive breakpoint string, e.g. '(max-width:768px)'
     * or 'desktop' when not in responsive mode.
     * ------------------------------------------------------------------------- */
    function getCurrentSize() {
        var size = "desktop";
        if (isResponsiveMod()) {
            var bp, code;
            bp = o(".breakpoint-bar .breakpoint-item.focus").length > 0
                ? o(".breakpoint-bar .breakpoint-item.focus").attr("data-breakpoint")
                : o("#iframe").width();
            code = o(".media-control").attr("data-code");
            size = "(" + code + ":" + bp + "px)";
        }
        return size;
    }

    /* -------------------------------------------------------------------------
     * Vendor prefix helpers  (original: g / h)
     * ------------------------------------------------------------------------- */

    /** Strip vendor prefixes from a CSS property name. Original: g */
    function stripPrefix(prop) {
        return prop.replace(/(-webkit-|-moz-|-o-|-ms-|-khtml-)/g, "");
    }

    /** Prepend webkit prefix to a CSS property name. Original: h */
    function webkitPrefix(prop) {
        return "-webkit-" + prop.replace(/(-webkit-|-moz-|-o-|-ms-|-khtml-)/g, "");
    }

    /* -------------------------------------------------------------------------
     * Export to namespace
     * ------------------------------------------------------------------------- */
    YP.state = {
        // Value validators
        isDefined      : isDefined,
        isEmpty        : isEmpty,

        // Editor state
        isContentSelected  : isContentSelected,
        isDragging         : isDragging,
        isResizing         : isResizing,
        isVisualEditing    : isVisualEditing,
        isResponsiveMod    : isResponsiveMod,
        isAnimateCreator   : isAnimateCreator,
        isAnimationManager : isAnimationManager,
        getActiveMode      : getActiveMode,
        getSelectedElement : getSelectedElement,

        // Body data store
        getBodyData  : getBodyData,
        setBodyData  : setBodyData,

        // Media query helpers
        mediaOpen    : mediaOpen,
        mediaClose   : mediaClose,
        getCurrentSize: getCurrentSize,

        // Vendor prefix helpers
        stripPrefix  : stripPrefix,
        webkitPrefix : webkitPrefix
    };

    // Backward-compat aliases so the rest of yellow-pencil.js can still call
    // K(), J() etc. without changes during the migration phase.
    // These are attached to the YP namespace and the main IIFE will re-alias them.
    YP._compat = {
        K  : isDefined,
        J  : isEmpty,
        C  : isContentSelected,
        z  : isDragging,
        O  : isResizing,
        D  : isVisualEditing,
        A  : isResponsiveMod,
        S  : isAnimateCreator,
        T  : isAnimationManager,
        E  : getActiveMode,
        _  : getSelectedElement,
        e  : getBodyData,
        t  : setBodyData,
        Pe : mediaOpen,
        Re : mediaClose,
        Fe : getCurrentSize,
        g  : stripPrefix,
        h  : webkitPrefix
    };

})(jQuery);
