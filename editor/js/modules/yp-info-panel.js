/**
 * yp-info-panel.js
 * Yellow Pencil – Advanced Info Panel (Typography & Element)
 *
 * Renders typography metrics, color palette, image list, and element info
 * for the advanced info box.
 *
 * Original functions: M (updateInfoPanel), Z (initClipboardTooltips),
 *                     ia, aa, ea, ta (accessibility helpers)
 *
 * Dependencies: jQuery (o), window.YP, window.qi, ClipboardJS
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    // ─── Lazy refs ────────────────────────────────────────────────────────────
    function Gi()  { return o("#iframe").contents(); }
    function Ji()  { return o("#iframe").contents().find("body"); }
    function _()   { return YP.state ? YP.state.getSelectedElement() : window.ypData.get_selected_element; }
    function C()   { return window.ypData.is_content_selected; }
    function K(e)  { return typeof e !== "undefined" && e !== false && e !== "" && e !== " " && e !== "undefined" && e !== null; }
    function _a()  { return YP.selector ? YP.selector.getActiveSelector() : o(document.body).attr("data-wyp-selector") || ""; }
    function P(e)  { return YP.utils ? YP.utils.cleanFontFamily(e) : (e || ""); }
    function getCSSData(m, r) { return YP.cssStorage ? YP.cssStorage.getCSSData(m, r) : ""; }
    function findRules(css, f) { return YP.cssParser ? YP.cssParser.findRules(css, f) : []; }

    /* =========================================================================
     * Accessibility helpers
     * ========================================================================= */

    /**
     * Text contrast ratio of the selected element vs its background.
     * Original: ia()
     */
    function getContrastRatio() {
        var el = _();
        if (!el) return "N/A";
        var fg = el.css("color");
        var bg = el.css("background-color");

        function lum(r, g, b) {
            var a = [r, g, b].map(function (v) {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        }

        function parseRGB(str) {
            var m = str.match(/\d+/g);
            return m ? [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])] : [0, 0, 0];
        }

        var fgC = parseRGB(fg);
        var bgC = parseRGB(bg);
        var L1  = lum.apply(null, fgC);
        var L2  = lum.apply(null, bgC);
        var ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        ratio = Math.round(ratio * 100) / 100;

        var label = ratio >= 7 ? " ✓ AAA" : ratio >= 4.5 ? " ✓ AA" : ratio >= 3 ? " △ AA Large" : " ✗ Fail";
        return ratio + ":1" + label;
    }

    /**
     * Line-spacing accessibility assessment.
     * Original: aa()
     */
    function getLineSpacingStatus() {
        var el = _();
        if (!el) return "N/A";
        var lh = parseFloat(el.css("line-height"));
        var fs = parseFloat(el.css("font-size"));
        if (isNaN(lh) || isNaN(fs) || fs === 0) return "N/A";
        var ratio = lh / fs;
        return ratio >= 1.5 ? "Good (" + (Math.round(ratio * 100) / 100) + ")" :
               ratio >= 1.2 ? "OK (" + (Math.round(ratio * 100) / 100) + ")" :
               "Poor (" + (Math.round(ratio * 100) / 100) + ")";
    }

    /**
     * Font-size legibility assessment.
     * Original: ea()
     */
    function getLegibilityStatus() {
        var el = _();
        if (!el) return "N/A";
        var fs = parseFloat(el.css("font-size"));
        return isNaN(fs) ? "N/A" :
               fs >= 16 ? "Good (" + fs + "px)" :
               fs >= 12 ? "OK (" + fs + "px)" :
               "Too Small (" + fs + "px)";
    }

    /**
     * Count lines of text in an element (line-height based).
     * Original: ta(el)
     */
    function countLines(el) {
        var lh = parseFloat(el.css("line-height"));
        return isNaN(lh) || lh === 0 ? 1 : lh;
    }

    /* =========================================================================
     * Selector that returns all meaningful DOM nodes for typography scan.
     * Original: ui()
     * ========================================================================= */
    function getTypographySelector() {
        var blacklist = window.simple_not_list || [
            ".wyp-selected", ".wyp-multiple-selected", ".wyp-selected-others",
            "#yellow-pencil-canvas", "#yellow-pencil-focus-canvas",
            "#yellow-pencil-other-canvas", "#yellow-pencil-extra-canvas"
        ];
        var notStr = blacklist.join(",");
        return "*:not(" + notStr + ")";
    }

    /* =========================================================================
     * updateInfoPanel  (original: M)
     *
     * tab – 'typography' | 'element'
     * Reads from the iframe DOM and populates the advanced info box.
     * ========================================================================= */
    function updateInfoPanel(tab) {
        var qi    = window.qi || {};
        var JiEl  = Ji();
        var wfWasOn = false;

        if (JiEl.hasClass("wyp-wf-on")) {
            wfWasOn = true;
            JiEl.removeClass("wyp-wf-on");
        }

        var s, r;

        if (tab === "typography") {
            window.colorJsonList = [];
            o(".info-color-scheme-list,.info-font-family-list,.info-animation-list,.info-basic-typography-list,.info-image-list").empty();

            var colorList  = o(".info-color-scheme-list");
            var fontList   = o(".info-font-family-list");
            var imgList    = o(".info-image-list");
            var animList   = o(".info-animation-list");
            var typoList   = o(".info-basic-typography-list");

            // Append heading test nodes (temporary)
            JiEl.append(
                "<h1 id='wyp-heading-test-level-1'></h1>" +
                "<h2 id='wyp-heading-test-level-2'></h2>" +
                "<h3 id='wyp-heading-test-level-3'></h3>" +
                "<h4 id='wyp-heading-test-level-4'></h4>" +
                "<h5 id='wyp-heading-test-level-5'></h5>" +
                "<h6 id='wyp-heading-test-level-6'></h6>" +
                "<h6 id='wyp-paragraph-test'></h6>"
            );

            var para    = JiEl.find("#wyp-paragraph-test");
            var bodyFs  = Math.round(10 * parseFloat(JiEl.css("fontSize"))) / 10;
            var paraFs  = Math.round(10 * parseFloat(para.css("fontSize"))) / 10;
            var bodyFf  = JiEl.css("fontFamily");
            var paraFf  = para.css("fontFamily");

            typoList.append(
                "<li><span class=\"typo-list-left\">" + (qi.general || "General") + " (body)</span><span class=\"typo-list-right\"><span>" + bodyFs + "px, " + P(bodyFf) + "</span></span></li>" +
                "<li><span class=\"typo-list-left\">" + (qi.paragraph || "Paragraph") + "</span><span class=\"typo-list-right\"><span>" + paraFs + "px, " + P(paraFf) + "</span></span></li>"
            );
            para.remove();

            s = "";
            for (r = 1; r <= 6; r++) {
                var hEl = JiEl.find("#wyp-heading-test-level-" + r);
                var hFs = Math.round(10 * parseFloat(hEl.css("fontSize"))) / 10;
                var hFf = hEl.css("fontFamily");
                s += "<li><span class=\"typo-list-left\">" + (qi.heading_level || "Heading") + " " + r + "</span><span class=\"typo-list-right\"><span>" + hFs + "px, " + P(hFf) + "</span></span></li>";
                hEl.remove();
            }
            typoList.append(s);

            // Scan all elements for colors, fonts, images
            var colors  = [];
            var fonts   = [];
            var images  = [];
            var anims   = [];
            var nodes   = JiEl.find(getTypographySelector());

            for (r = 0; r < nodes.length && r < 10000; r++) {
                var tag  = nodes[r].tagName;
                if (/^(UL|LI|SPAN|A|I|STRONG|IFRAME|LABEL|BUTTON|FORM|INPUT|B|EM)$/g.test(tag)) continue;
                if (nodes[r].clientWidth && nodes[r].clientWidth < 40) continue;

                var node = o(nodes[r]);
                var ff   = P(node.css("fontFamily")).toLowerCase();
                if (fonts.indexOf(ff) === -1) fonts.push(ff);

                var bg = node.css("backgroundColor").toLowerCase().replace(/ /g, "");
                if (bg !== "transparent" && bg !== "rgb(255,255,255)" && bg !== "rgba(0,0,0,0)" && bg !== "rgba(255,255,255,0)") {
                    colors.push(bg);
                }

                var bgImg = node.css("background-image");
                if (bgImg && bgImg.indexOf("http") !== -1 && /url\(("|'|)(.*?)("|'|)\)/i.test(bgImg)) {
                    images.push(bgImg.match(/url\(("|'|)(.*?)("|'|)\)/i)[0].replace(/^url\(("|'|)/g, "").replace(/("|'|)\)$/g, ""));
                }

                if (tag === "IMG") {
                    var src = node.attr("data-src") || node.attr("src");
                    if (src && src !== "") images.push(src);
                }
            }

            // Animations from CSS data
            var animRules = findRules(getCSSData(null, false), "[rule=animation-name]");
            for (r = 0; r < animRules.length; r++) {
                var animName = animRules[r].replace(/(\/\*(.*?)\*\/|\n)/g, "");
                // Extract animation value from rule
                if (typeof window.YP_extractAnimValue === "function") {
                    animName = window.YP_extractAnimValue(animName);
                } else {
                    animName = animName.split(":").pop().replace(/\s*;?\s*$/, "").trim();
                }
                if (anims.indexOf(animName) === -1) anims.push(animName);
            }

            // Color palette (de-duplicated, weighted)
            var colorStr = "";
            var seen = [];
            for (r = 0; r < colors.length; r++) {
                if (seen.indexOf(colors[r]) !== -1) continue;
                var count = colors.filter(function (c) { return c === colors[r]; }).length;
                var pct   = Math.round(100 * count / colors.length);
                seen.push(colors[r]);
                window.colorJsonList.push(colors[r]);
                colorStr += "<div data-width=\"" + pct + "\" data-color=\"" + colors[r] + "\" style=\"width:" + pct + "%;background-color:" + colors[r] + ";\"></div>";
            }
            colorList.append(colorStr);

            // Images (de-duplicated)
            var uniqueImgs = [];
            images.forEach(function (src) {
                if (uniqueImgs.indexOf(src) === -1) uniqueImgs.push(src);
            });
            s = "";
            uniqueImgs.forEach(function (src) {
                if (src.indexOf("wyp_rand=") === -1 && src.indexOf("wyp_mode=") === -1 && src.indexOf("bing.com/action/") === -1) {
                    s += "<img src='" + src + "' />";
                }
            });
            if (s === "") { imgList.prev("h3").remove(); imgList.remove(); }
            else imgList.append(s);

            // Fonts
            s = fonts.map(function (f) { return "<li>" + f + "</li>"; }).join("");
            fontList.append(s);

            // Animations
            s = anims.map(function (a) { return "<li>" + a + "</li>"; }).join("");
            animList.append(s);
            anims.length === 0 ? o("#animations-heading").hide() : o("#animations-heading").show();

        } else if (tab === "element") {
            var genList  = o(".info-element-general");
            var accList  = o(".info-element-accessibility");
            var clsList  = o(".info-element-class-list");
            var selList  = o(".info-element-selector-list");

            o(".info-element-general,.info-element-class-list,.info-element-selector-list,.info-element-accessibility").empty();

            if (C()) {
                o(".info-no-element-selected").hide();
                o(".info-element-selected-section").show();

                var el    = _();
                var elId  = el.attr("id");

                if (K(elId) && elId !== "") {
                    genList.append("<li><span class=\"typo-list-left\">" + (qi.element_id || "ID") + "</span><span class=\"typo-list-right\"><span>#" + elId + "</span></span></li>");
                }
                genList.append(
                    "<li><span class=\"typo-list-left\">" + (qi.tag || "Tag") + "</span><span class=\"typo-list-right\"><span>" + el.prop("tagName") + "</span></span></li>" +
                    "<li><span class=\"typo-list-left\">" + (qi.affected_els || "Affected") + "</span><span class=\"typo-list-right\"><span>" + (parseInt(Gi().find(".wyp-selected-others").length) + 1) + "</span></span></li>"
                );

                // Classes
                var classes = [];
                var rawClass = el.attr("class") || "";
                rawClass.split(" ").forEach(function (c) {
                    c = o.trim(c);
                    if (!c || /^(wyp-|yp_|yp-|wyp_)/.test(c)) return;
                    if (classes.indexOf(c) === -1) classes.push(c);
                });
                s = classes.map(function (c) { return "<li>." + c + "</li>"; }).join("");
                clsList.append(s);
                classes.length === 0 ? o(".info-element-classes-section").hide() : o(".info-element-classes-section").show();

                selList.append("<li>" + _a() + "</li>");

                if (el.text().length > 0) {
                    accList.append("<li class=\"contrast-accessibility\"><span class=\"typo-list-left\">Text Contrast</span><span class=\"typo-list-right\"><span>" + getContrastRatio() + "</span></span></li>");

                    var lineRatio = parseFloat(el.height()) / countLines(el);
                    if (lineRatio >= 2) {
                        accList.append("<li class=\"line-spacing-accessibility\"><span class=\"typo-list-left\">Line Spacing</span><span class=\"typo-list-right\"><span>" + getLineSpacingStatus() + "</span></span></li>");
                    }
                    accList.append("<li class=\"font-size-accessibility\"><span class=\"typo-list-left\">Legibility</span><span class=\"typo-list-right\"><span>" + getLegibilityStatus() + "</span></span></li>");
                }

                accList.find("li").length === 0 ? o(".info-element-accessibility-section").hide() : o(".info-element-accessibility-section").show();

                // Clone for DOM preview
                var cloned = el.clone();
                cloned.removeAttr("class").removeAttr("data-wyp-slctr");
                classes.forEach(function (c) { cloned.addClass(c); });
                cloned.html("...");
                var domStr = o("<div />").append(cloned).html().replace(/(\s+)?style=""/, "");
                o(".info-element-dom").val(domStr);

            } else {
                o(".info-no-element-selected").show();
                o(".info-element-selected-section").hide();
            }
        }

        if (wfWasOn) JiEl.addClass("wyp-wf-on");

        // Reinit clipboard tooltips
        initClipboardTooltips();

        // Accessibility tooltips
        o(".info-element-accessibility li").tooltip("destroy");
        o(".font-size-accessibility").tooltip({ trigger: "hover", container: ".advanced-info-box-inner", title: (window.qi || {}).font_size_ac || "", delay: { show: 100, hide: 0 } });
        o(".line-spacing-accessibility").tooltip({ trigger: "hover", container: ".advanced-info-box-inner", title: (window.qi || {}).line_spacing_ac || "", delay: { show: 100, hide: 0 } });
        o(".contrast-accessibility").tooltip({ trigger: "hover", container: ".advanced-info-box-inner", title: (window.qi || {}).contrast_ac || "", delay: { show: 100, hide: 0 } });
    }

    /* =========================================================================
     * initClipboardTooltips  (original: Z)
     * Sets up ClipboardJS + tooltip interactions for color swatches and images.
     * ========================================================================= */
    function initClipboardTooltips() {
        // Color swatches
        new ClipboardJS(".info-color-scheme-list div", {
            text: function (el) {
                var color = el.getAttribute("data-color");
                return typeof window.YP_colorToHex === "function" ? window.YP_colorToHex(color) : color;
            }
        });

        o(".info-color-scheme-list > div").tooltip("destroy");
        o(".info-color-scheme-list > div").tooltip({ animation: true, trigger: "manual", container: ".advanced-info-box-inner", html: true });

        o(".info-color-scheme-list > div").off(".ypInfo").on("mouseenter.ypInfo", function () {
            var color = o(this).attr("data-color");
            var label = typeof window.YP_colorToHex === "function" ? window.YP_colorToHex(color) : color;
            o(this).attr("data-original-title", label).tooltip("fixTitle").tooltip("show");
        }).on("click.ypInfo", function () {
            o(this).attr("data-original-title", "Copied!").tooltip("fixTitle").tooltip("show");
        }).on("mouseleave.ypInfo", function () {
            o(this).tooltip("hide");
        });

        // Images
        new ClipboardJS(".info-image-list img", {
            text: function (el) { return el.getAttribute("src"); }
        });

        o(".info-image-list img").tooltip("destroy");
        o(".info-image-list img").tooltip({ placement: "top", animation: true, trigger: "manual", container: ".advanced-info-box-inner", html: true });

        o(".info-image-list img").off(".ypInfo").on("mouseenter.ypInfo", function () {
            o(this).attr("data-original-title", "Copy URL").tooltip("fixTitle").tooltip("show");
        }).on("click.ypInfo", function () {
            o(this).attr("data-original-title", "Copied!").tooltip("fixTitle").tooltip("show");
        }).on("mouseleave.ypInfo", function () {
            o(this).tooltip("hide");
        });
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.infoPanel = {
        updateInfoPanel       : updateInfoPanel,
        initClipboardTooltips : initClipboardTooltips,
        getContrastRatio      : getContrastRatio,
        getLineSpacingStatus  : getLineSpacingStatus,
        getLegibilityStatus   : getLegibilityStatus
    };

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        M  : updateInfoPanel,
        Z  : initClipboardTooltips,
        ia : getContrastRatio,
        aa : getLineSpacingStatus,
        ea : getLegibilityStatus,
        ta : countLines
    });

})(jQuery);
