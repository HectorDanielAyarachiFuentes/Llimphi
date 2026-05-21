/**
 * yp-save.js
 * Yellow Pencil – Save / AJAX
 *
 * Handles persisting CSS to the server in single / template / global modes.
 * Original functions: re (saveAll), v (liveOptionSave — also in yp-ui-utils.js)
 *
 * Dependencies: jQuery (o), window.YP, window.qi, ajaxurl, window.wyp_editor_nonce
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

    /* =========================================================================
     * _handleSaveError  (private)
     * Resets the save button and shows an appropriate error alert.
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

    /* =========================================================================
     * _postSave  (private)
     * Generic AJAX save for one data chunk.
     * Returns the jQuery Deferred from $.post.
     * ========================================================================= */
    function _postSave(params, onSuccess) {
        params._wpnonce = window.wyp_editor_nonce;

        return o.post(ajaxurl, params)
            .done(function (response) {
                if (response === "nonce_error" ||
                    response === "authorized_error" ||
                    response === "json_error") {
                    _handleSaveError(response);
                } else {
                    if (typeof onSuccess === "function") onSuccess();
                }
            })
            .fail(function () {
                _handleSaveError("network");
            });
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
    function saveAll(pageId, pageType) {
        if (window.bMode) return false;

        var qi         = window.qi || {};
        var Gi = o("#iframe").contents();
        var allCSS     = "";
        var totalSaves = 0;
        var doneSaves  = 0;

        // Helper to compute processed CSS — delegates to the main IIFE's Tt/Et
        function getEditorData(mode) {
            if (typeof window.YP_getEditorData === "function") {
                return window.YP_getEditorData(mode);
            }
            return "";
        }
        function getProcessedCSS(mode) {
            if (typeof window.YP_getProcessedCSS === "function") {
                return window.YP_getProcessedCSS(mode);
            }
            return "";
        }

        getGi().find(".wyp-data-updated").each(function () {
            totalSaves++;

            var mode        = o(this).attr("data-source-mode");
            var editorData  = getEditorData(mode);
            var processedCSS = getProcessedCSS(mode);
            allCSS += processedCSS;

            // Remap 'home' and login-family pages
            var saveMode = mode;
            var saveType = pageType;
            if (pageId === "home" && mode === "single")           { saveMode = "template"; saveType = pageId; }
            if ((pageId === "login" || pageId === "lostpassword" || pageId === "register") && mode === "single") {
                saveMode = "template"; saveType = pageId;
            }

            var params = {
                action          : "wyp_ajax_save",
                wyp_data        : processedCSS,
                wyp_editor_data : editorData
            };

            if (saveMode === "single") {
                params.wyp_page_id = pageId;
            } else if (saveMode === "template") {
                params.wyp_page_type = saveType;
            }

            _postSave(params, function () { doneSaves++; });
        });

        // Save preview copy
        _postSave({
            action   : "wyp_preview_data_save",
            wyp_data : allCSS
        }, function () { doneSaves++; });

        // Save selector comments
        _postSave({
            action                : "wyp_save_comments_option",
            wyp_selector_comments : JSON.stringify(window.selectorComments || {})
        }, function () { doneSaves++; });

        // Poll until all requests complete
        var expectedDone = totalSaves + 2; // +2 for preview + comments
        window.savingChecker = setInterval(function () {
            if (doneSaves === expectedDone) {
                o(".wyp-save-btn")
                    .text(qi.saved || "Saved")
                    .addClass("wyp-disabled")
                    .removeClass("waiting-for-save");

                clearInterval(window.savingChecker);
                window.saveFromEditor = false;

                getGi().find(".wyp-data-updated").removeClass("wyp-data-updated");
                o(".customizing-type-updated").removeClass("customizing-type-updated");

                // Trigger CSS rebuild on server
                o.post(ajaxurl, {
                    action   : "wyp_ajax_update_css",
                    _wpnonce : window.wyp_editor_nonce
                });

                // Refresh the customizing type frame if hidden
                if ("none" === o("#wyp-customizing-type-frame").css("display")) {
                    if (typeof window.YP_refreshTypeFrame === "function") {
                        window.YP_refreshTypeFrame(true);
                    }
                }
            }
        }, 200);
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.save = {
        saveAll : saveAll
    };

    // Backward-compat alias
    YP._compat = YP._compat || {};
    YP._compat.re = saveAll;

})(jQuery);
