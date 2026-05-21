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


function getGi() { return window.YP && window.YP.elements ? window.YP.elements.Gi : null; }
function getKi() { return window.YP && window.YP.elements ? window.YP.elements.Ki : null; }
function getJi() { return window.YP && window.YP.elements ? window.YP.elements.Ji : null; }
function getQi() { return window.YP && window.YP.elements ? window.YP.elements.Qi : null; }
function getTn() { return window.YP && window.YP.elements ? window.YP.elements.tn : null; }
function getOn() { return window.YP && window.YP.elements ? window.YP.elements.On : null; }
function setOn(v) { if (window.YP && window.YP.elements) window.YP.elements.setOn(v); }


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
        var rawClass = node[0].getAttribute("class") || "";
        rawClass.split(" ").forEach(function (c) {
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
    function validateSelector(sel, quiet, useBodyOnly, returnBool) {
        var J = window.YP && window.YP.state ? window.YP.state.isEmpty : function(v) { return !v; };
        var qi = window.YP && window.YP.elements ? window.YP.elements.Qi : null;
        if (J(sel)) {
            return returnBool ? (qi ? qi.selector_no_match : "No elements match") : false;
        }
        sel = resolveSelector(sel, true, true, true);
        try {
            var Gi = getGi();
            var Ji = window.YP && window.YP.elements ? window.YP.elements.Ji : null;
            if (!Gi || Gi.length === 0) Gi = o("#iframe").contents();
            if (!Ji || Ji.length === 0) Ji = Gi.find("body");
            var matches = useBodyOnly ? Ji.find(sel) : Gi.find(sel);
            if (quiet && matches.length === 0) {
                return returnBool ? (qi ? qi.selector_no_match : false) : false;
            }
            return returnBool ? true : matches;
        } catch (err) {
            if (!quiet) console.warn("[yp-selector] invalid selector:", sel, err);
            return returnBool ? err.message : false;
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
     * Ma / generateSelector  (original: Ma)
     *
     * Core selector generation engine. Takes a jQuery node element and walks up
     * the DOM tree to construct a unique, highly minimal CSS selector.
     * ========================================================================= */
    function generateSelector(elementNode, mode) {
        const clickableSelect = window.ypData ? window.ypData["data-clickable-select"] : "";
        
        if (window.ypData && window.ypData.inspector === "single") {
            mode = "sharp";
        }
        
        const K = YP._compat && YP._compat.K ? YP._compat.K : (val) => !val;
        const _ = YP._compat && YP._compat._ ? YP._compat._ : () => null;
        
        if (mode === "default" && !window.minCrpdSlctr && K(clickableSelect) && validateSelector(clickableSelect, true, false, false) !== false) {
            return clickableSelect;
        }
        
        if (mode === "defaultNoCache") {
            mode = "default";
        }
        
        let el = elementNode;
        if (el === null) {
            el = _();
        }
        
        if (!el || !el[0]) {
            return false;
        }
        
        const tagName = el[0].tagName;
        const J = YP._compat && YP._compat.J ? YP._compat.J : (val) => !val;
        
        if (J(tagName)) {
            return false;
        }
        
        if (tagName === "HTML" || tagName === "BODY") {
            return "body";
        }
        
        const parents = el.parentsUntil("body");
        let queryPath = "";
        let prevTag = "";
        const currentSelector = getSelector(el);
        
        if (/#/g.test(currentSelector)) {
            return currentSelector;
        }
        
        const matchesArray = [];
        let isMinSelectorLevel = false;
        let isMinLimitReached = false;
        
        if (window.minCrpdSlctr !== false && window.minCrpdSlctr >= parents.length) {
            isMinSelectorLevel = true;
        }
        
        let deepLevel = parents.length;
        if (deepLevel > window.maxDeep) {
            deepLevel = window.maxDeep;
        }
        
        const separator = window.separator || " ";
        const Ce = YP._compat && YP._compat.Ce ? YP._compat.Ce : (s) => s;
        const Gi = getGi();
        
        for (let i = deepLevel - 1; i >= 0; i--) {
            let isMatched = false;
            const parentSelector = getSelector(parents[i]);
            
            isMinLimitReached = false;
            if (window.minCrpdSlctr !== false && i - 1 <= window.minCrpdSlctr) {
                isMinLimitReached = true;
            }
            
            if (/\.|#/g.test(parentSelector) && !isMinSelectorLevel && !isMinLimitReached && Gi.find(parentSelector).length === 1 && parentSelector !== ".active") {
                let canInclude = true;
                if (parentSelector.indexOf("#") === -1 && i <= 0) {
                    canInclude = false;
                }
                
                if (canInclude) {
                    if (mode === "sharp") {
                        if (Ce(queryPath, true).indexOf("nth-child") === -1) {
                            queryPath = `${parentSelector}${separator}`;
                            matchesArray.push(parentSelector);
                            isMatched = true;
                        }
                    } else {
                        queryPath = `${parentSelector}${separator}`;
                        matchesArray.push(parentSelector);
                        isMatched = true;
                    }
                }
            }
            
            if (!isMatched) {
                const combinedLength = Gi.find(`${queryPath}${separator}${parentSelector}${separator}${parentSelector},${queryPath}${separator}${prevTag}${separator}${parentSelector}`).length;
                if (mode === "default" && combinedLength > 0 && cleanSelector(queryPath).trim() !== "") {
                    queryPath = `${cleanSelector(queryPath).trim()} > ${parentSelector}${separator}`;
                } else {
                    queryPath += `${parentSelector}${separator}`;
                }
            }
            prevTag = parentSelector;
        }
        
        const ultimateLength = Gi.find(`${queryPath}${separator}${currentSelector}${separator}${currentSelector},${queryPath}${separator}${prevTag}${separator}${currentSelector}`).length;
        if (ultimateLength > 0 && queryPath.length > 0) {
            queryPath = cleanSelector(`${queryPath} > ${currentSelector}`);
        } else {
            queryPath = cleanSelector(`${queryPath}${separator}${currentSelector}`);
        }
        
        const Tn = window.YP.Tn || [];
        if (matchesArray.length > 1 && queryPath.charAt(0) !== "#") {
            const filteredMatches = [];
            for (let i = 0; i < matchesArray.length; i++) {
                let isValidMatch = true;
                for (let j = 0; j < Tn.length; j++) {
                    const blacklistRegex = new RegExp(`(\\s|^).${Tn[j]}(\\s|$)`, "gi");
                    if (blacklistRegex.test(matchesArray[i])) {
                        isValidMatch = false;
                        break;
                    }
                }
                if (isValidMatch) {
                    filteredMatches.push(matchesArray[i]);
                }
            }
            
            let parentCandidates = [];
            if (filteredMatches.length > 1) {
                for (let i = 0; i < filteredMatches.length; i++) {
                    const distances = [];
                    const tagNames = [];
                    Gi.find(filteredMatches[i]).each(function() {
                        const jqNode = o(this);
                        distances.push(jqNode.parents().length);
                        tagNames.push(jqNode.prop("tagName"));
                    });
                    
                    const isSameDistance = distances.every((val, idx, arr) => val === arr[0]);
                    const isSameTag = tagNames.every((val, idx, arr) => val === arr[0]);
                    
                    if (isSameDistance && isSameTag) {
                        parentCandidates.push(filteredMatches[i]);
                    }
                }
            }
            
            if (J(parentCandidates)) {
                parentCandidates = [];
            }
            
            let bestParent = null;
            if (parentCandidates.length > 0) {
                bestParent = parentCandidates[parentCandidates.length - 1];
            } else if (filteredMatches.length > 0) {
                bestParent = filteredMatches[filteredMatches.length - 1];
            }
            
            if (bestParent !== null) {
                let tailMatch = queryPath.match(/(\s)(.*?)$/g);
                if (tailMatch) {
                    let tailSelector = tailMatch.join("").toString();
                    let candidateQuery = bestParent + tailSelector;
                    const Ge = YP._compat && YP._compat.Ge ? YP._compat.Ge : () => false;
                    if (validateSelector(candidateQuery, true, false, false) && Ge(queryPath, candidateQuery)) {
                        queryPath = candidateQuery;
                    }
                }
            }
        }
        
        if (window.setSelector === false) {
            window.lastParentQueryStatus = mode;
        }
        
        if (mode === "sharp" || queryPath === "div") {
            if (queryPath === "div") {
                queryPath = "body div";
            }
            return Ce(queryPath, false);
        }
        
        const Pn = window.YP.Pn || [];
        if (Pn.indexOf(tagName.toLowerCase()) !== -1) {
            const resolvedTags = [];
            Gi.find(queryPath).each(function() {
                const tag = o(this).prop("tagName");
                if (resolvedTags.indexOf(tag) === -1) {
                    resolvedTags.push(tag);
                }
            });
            
            const Na = YP._compat && YP._compat.Na ? YP._compat.Na : (s) => s;
            const Za = YP._compat && YP._compat.Za ? YP._compat.Za : () => false;
            
            if (resolvedTags.length > 1 && /(\.|#)/g.test(currentSelector)) {
                const regexStr = `^(.*?)(?=${Na(currentSelector)}$)`;
                const matchedPrefix = queryPath.match(new RegExp(regexStr, "g"));
                const cleanedPrefix = matchedPrefix ? o.trim(matchedPrefix.join("").toString()) : "";
                queryPath = `${cleanedPrefix}${separator}${tagName.toLowerCase()}${currentSelector}`;
            } else if (Za(queryPath, currentSelector, tagName)) {
                const regexStr = `^(.*?)(?=${Na(currentSelector)}$)`;
                const matchedPrefix = queryPath.match(new RegExp(regexStr, "g"));
                const cleanedPrefix = matchedPrefix ? o.trim(matchedPrefix.join("").toString()) : "";
                queryPath = `${cleanedPrefix}${separator}${tagName.toLowerCase()}`;
            }
        }
        
        queryPath = cleanSelector(queryPath);
        if (queryPath.indexOf(">") !== -1) {
            const depthCombinators = queryPath.split(">").length;
            const originalLength = Gi.find(queryPath).length;
            for (let i = 1; i < depthCombinators; i++) {
                const simplifiedQuery = queryPath.replace(/ > /i, " ");
                if (Gi.find(simplifiedQuery).length === originalLength) {
                    queryPath = simplifiedQuery;
                }
            }
        }
        
        queryPath = cleanSelector(queryPath);
        if (mode !== "sharp" && /\.wp-block-gallery/i.test(queryPath) && /\.wp-image-[0-9]+$/i.test(queryPath)) {
            queryPath = queryPath.replace(/\s\.wp-image-[0-9]+/i, " img");
        }
        
        queryPath = queryPath.replace(/(^|\s)\.wpforms-field([a-zA-Z0-9_-]+)?\s/i, " ");
        queryPath = queryPath.replace(/(^|\s)\.wpuf-el\s/i, " ");
        
        if (mode !== "sharp") {
            queryPath = queryPath.replace(/(^|\s)\.wpuf-name-field-([a-zA-Z0-9_-]+)?\s/i, " ");
        }
        
        if (/( |>)div$/g.test(queryPath) && Gi.find(queryPath).length >= 20) {
            return Ce(queryPath);
        }
        
        if (window.ypOption && window.ypOption.show_css_selector) {
            queryPath = getCleanSelector(queryPath);
        }
        
        return queryPath;
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.selector = {
        generateSelector      : generateSelector,
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
        Ma : generateSelector,
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
