/**
 * yp-events.js
 * Yellow Pencil – DOM Event Bindings
 *
 * Registers all resizable panel bindings and panel/button event listeners.
 * Called once after all other modules and the DOM are ready.
 *
 * This module is the only one that calls jQuery UI .resizable() on panels.
 * All callback logic delegates to other YP modules where possible.
 *
 * Original: the large event-binding block inside yellow-pencil.js
 *           (~lines 7818 – 8300)
 *
 * Dependencies: jQuery (o), window.YP, window.ypData, window.ypOption,
 *               window.qi, window.n (ace editor instance)
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

    // ─── Lazy helpers ─────────────────────────────────────────────────────────
    function getTn()  { return o(document.body); }
    function setCookie(k, v) { if (YP.utils) YP.utils.setCookie(k, v); }
    function updateEditorLayout(w, h) { if (YP.responsive) YP.responsive.updateEditorLayout(w, h); }
    function updateIframeLayout()    { if (YP.responsive) YP.responsive.updateIframeLayout(); }
    function centerResponsiveView()  { if (YP.animation)  YP.animation.centerResponsiveView(); }

    /* =========================================================================
     * addFakeLayer / He
     * Inserts a transparent full-screen overlay while a panel is being resized,
     * preventing the iframe from stealing mouse events.
     * ========================================================================= */
    function addFakeLayer(zIndex) {
        getTn()().append(
            "<div class='fake-layer-x' style='position:fixed;left:0;top:0;width:100%;height:100%;z-index:" +
            (zIndex || 99999) + ";cursor:default;'></div>"
        );
    }

    /* =========================================================================
     * removeFakeLayer / We
     * Removes the fake-layer overlay and triggers a layout refresh.
     * ========================================================================= */
    function removeFakeLayer(delay) {
        if (delay) {
            setTimeout(function () { o(".fake-layer-x").remove(); }, delay);
        } else {
            o(".fake-layer-x").remove();
        }
        updateIframeLayout();
    }

    /* =========================================================================
     * initResizablePanels
     *
     * Registers jQuery UI Resizable on all editor panels.
     * ========================================================================= */
    function initResizablePanels() {

        // ── Right Panel (CSS Properties) ─────────────────────────────────────
        o(".ed-pnl").resizable({
            handles  : "w, e",
            minWidth : 276,
            maxWidth : 400,
            start    : function () {
                o(".fake-layer-x").css("cursor", "e-resize");
                addFakeLayer(0);
            },
            resize   : function (e, t) {
                o("#rightpanel-personalized-view").remove();
                getTn()().append("<style id='rightpanel-personalized-view'>.ed-pnl{width:" + t.size.width + "px !important;}</style>");
                updateIframeLayout();
            },
            stop     : function (e, t) {
                o(".fake-layer-x").remove();
                setCookie("rightPanelWidth", t.size.width);
                removeFakeLayer(0);
            }
        });

        // ── Visual CSS Inspector ──────────────────────────────────────────────
        o("#vsl-css-vi").resizable({
            handles  : "w",
            minWidth : 276,
            maxWidth : o(window).width(),
            start    : function () {
                o(".fake-layer-x").css("cursor", "e-resize");
                addFakeLayer(0);
            },
            resize   : function (e, t) {
                if (t.size.width > parseInt(o(window).width() - 10)) t.size.width = o(window).width();
                o("#visual-manager-personalized-view").remove();
                getTn()().append("<style id='visual-manager-personalized-view'>#vsl-css-vi{width:" + t.size.width + "px !important;}</style>");
                updateIframeLayout();
            },
            stop     : function (e, t) {
                o(".fake-layer-x").remove();
                setCookie("visualManagerWidth", t.size.width);
                removeFakeLayer(0);
            }
        });

        // ── Advanced Info Box ─────────────────────────────────────────────────
        o(".advanced-info-box").resizable({
            handles  : "e",
            minWidth : 280,
            maxWidth : 500,
            start    : function () {
                o(".fake-layer-x").css("cursor", "e-resize");
            },
            resize   : function (e, t) {
                o("#advancedinfobox-personalized-view").remove();
                getTn()().append("<style id='advancedinfobox-personalized-view'>.advanced-info-box {width:" + t.size.width + "px !important;}</style>");
            },
            stop     : function (e, t) {
                o(".fake-layer-x").remove();
                setCookie("advancedInfoBoxWidth", t.size.width);
            }
        });

        // ── Animation Manager ─────────────────────────────────────────────────
        o(".wyp-animate-manager").resizable({
            handles   : "n",
            minHeight : 234,
            maxHeight : Math.round(70 * o(window).height() / 100),
            start     : function () {
                addFakeLayer(0);
                o(".fake-layer-x").css("cursor", "n-resize");
            },
            resize    : function (e, t) {
                var h = parseInt(t.size.height);
                o("#animmanager-personalized-view").remove();
                getTn()().append(
                    "<style id='animmanager-personalized-view'>" +
                    "body.wyp-animate-manager-active #iframe{height:-webkit-calc(100% - " + h + "px) !important;height:calc(100% - " + h + "px) !important;}" +
                    "body.wyp-animate-manager-active.wyp-res-mod #iframe," +
                    "body.wyp-animate-manager-active.wyp-res-mod .responsive-right-handle," +
                    "body.wyp-animate-manager-active.wyp-res-mod .responsive-left-handle{height:-webkit-calc(100% - " + (h + 24) + "px) !important;height:calc(100% - " + (h + 24) + "px) !important;}" +
                    ".wyp-animate-manager{height:" + h + "px !important;}</style>"
                );
            },
            stop      : function (e, t) {
                o(".fake-layer-x").remove();
                setCookie("animManagerHeight", t.size.height);
            }
        });

        // ── Navigation / Layer Tree ───────────────────────────────────────────
        o("#layer-tree").resizable({
            handles  : "e",
            minWidth : 230,
            maxWidth : 400,
            start    : function () {
                o(".fake-layer-x").css("cursor", "e-resize");
                addFakeLayer(0);
            },
            resize   : function (e, t) {
                o("#navigation-personalized-view").remove();
                getTn()().append("<style id='navigation-personalized-view'>#layer-tree{width:" + parseFloat(t.size.width) + "px !important;}</style>");
                updateIframeLayout();
            },
            stop     : function (e, t) {
                o(".fake-layer-x").remove();
                setCookie("navigationWidth", t.size.width);
                removeFakeLayer(0);
            }
        });

        // ── CSS Editor Panel ──────────────────────────────────────────────────
        o("#left-area-editor").resizable({
            handles  : "e, s",
            maxWidth : o(window).width(),
            minWidth : 370,
            delay    : 150,
            start    : function (e, t) {
                var axis = o(this).data("ui-resizable").axis;
                if (axis === "e") {
                    o("#css-data").width(t.size.width - 41);
                    o("#css-editor-bar").width(t.size.width);
                }
                addFakeLayer(0);
                o(".fake-layer-x").css("cursor", axis === "e" ? "e-resize" : "s-resize");
            },
            resize   : function (e, t) {
                var axis = o(this).data("ui-resizable").axis;
                if (axis === "e") {
                    if (t.size.width > parseInt(o(window).width() - 10)) t.size.width = o(window).width();
                    o("#css-data").width(t.size.width - 41);
                    o("#css-editor-bar").width(t.size.width);
                }
                if (t.size.height < 200) t.size.height = 200;
                if (axis === "s") o("#css-data").height(t.size.height - 76);

                o("#csseditor-personalized-view").remove();
                if (window.ypData["wyp-css-ed-drgable"]) {
                    updateEditorLayout(t.size.width, t.size.height - 36);
                } else {
                    updateEditorLayout(t.size.width, null);
                }

                // Resize ace editor instance
                if (window.n && typeof window.n.resize === "function") window.n.resize();

                centerResponsiveView();
                updateIframeLayout();
            },
            stop     : function (e, t) {
                var axis = o(this).data("ui-resizable").axis;
                o(".fake-layer-x").remove();
                o("#css-data").width(t.size.width - 41);
                o("#css-editor-bar").width(t.size.width);
                if (axis === "s") o("#css-data").height(t.size.height - 76);
                setCookie("cssEditorWidth", t.size.width);
                if (window.ypData["wyp-css-ed-drgable"]) setCookie("cssEditorHeight", t.size.height);
            }
        });
    }

    /* =========================================================================
     * initPanelButtons
     *
     * Click/keyboard handlers for top-level editor buttons:
     * save, undo, redo, responsive toggle, animation manager toggle.
     * ========================================================================= */
    function initPanelButtons() {
        var qi = window.qi || {};

        // ── Save ─────────────────────────────────────────────────────────────
        o(document).on("click", ".wyp-save-btn", function () {
            if (o(this).hasClass("wyp-disabled") || !o(this).hasClass("waiting-for-save")) return false;
            o(".wyp-save-btn")
                .text(qi.saving || "Saving...")
                .addClass("wyp-disabled")
                .removeClass("waiting-for-save");

            if (YP.save && typeof YP.save.saveAll === "function") {
                var pageId   = o(".active-customizing-list").attr("data-page-id")   || "";
                var pageType = o(".active-customizing-list").attr("data-page-type") || "";
                YP.save.saveAll(pageId, pageType);
            }
        });

        // ── Keyboard shortcut: Ctrl/Cmd + S ───────────────────────────────────
        o(document).on("keydown", function (e) {
            if ((e.ctrlKey || e.metaKey) && e.which === 83) {
                e.preventDefault();
                o(".wyp-save-btn").trigger("click");
            }
        });

        // ── Undo ─────────────────────────────────────────────────────────────
        o(document).on("click", ".undo-btn", function () {
            if (typeof window.YP_undo === "function") window.YP_undo();
        });

        // ── Redo ─────────────────────────────────────────────────────────────
        o(document).on("click", ".redo-btn", function () {
            if (typeof window.YP_redo === "function") window.YP_redo();
        });

        // ── Advanced Info Box tab toggle ──────────────────────────────────────
        o(document).on("click", ".wyp-info-tab", function () {
            var tab = o(this).attr("data-info-tab");
            o(".wyp-info-tab").removeClass("active");
            o(this).addClass("active");
            o(".wyp-info-content").hide();
            o(".wyp-info-content[data-info-tab='" + tab + "']").show();
            if (YP.infoPanel) YP.infoPanel.updateInfoPanel(tab);
        });

        // ── Advanced Info Box open/close ──────────────────────────────────────
        o(document).on("click", ".wyp-info-box-toggle", function () {
            var box = o(".advanced-info-box");
            if (box.css("display") === "none") {
                box.show();
                var activeTab = o(".wyp-info-tab.active").attr("data-info-tab") || "typography";
                if (YP.infoPanel) YP.infoPanel.updateInfoPanel(activeTab);
            } else {
                box.hide();
            }
        });

        // ── Context menu parent/children show-more ────────────────────────────
        o(document).on("click", ".show-more-parent-link", function () {
            o(".context-menu-list.wyp-contextmenu-parent").removeClass("wyp-limit-parent-view");
        });
        o(document).on("click", ".show-more-children-link", function () {
            o(".context-menu-list.wyp-contextmenu-children").removeClass("wyp-limit-children-view");
        });
    }

    /* =========================================================================
     * initWindowResize
     *
     * Throttled window resize handler that keeps all panels in sync.
     * ========================================================================= */
    function initWindowResize() {
        o(window).on("resize.yp", o.throttle(function () {
            updateIframeLayout();
            if (window.ypData.is_responsive_mod) centerResponsiveView();
        }, 100));
    }

    /* =========================================================================
     * init
     *
     * Entry point called once after the DOM is ready and all modules are loaded.
     * ========================================================================= */
    function init() {
        initResizablePanels();
        initPanelButtons();
        initWindowResize();
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.events = {
        init               : init,
        initResizablePanels: initResizablePanels,
        initPanelButtons   : initPanelButtons,
        initWindowResize   : initWindowResize,
        addFakeLayer       : addFakeLayer,
        removeFakeLayer    : removeFakeLayer
    };

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        He : addFakeLayer,
        We : removeFakeLayer
    });

})(jQuery);
