/**
 * yp-css-parser.js
 * Yellow Pencil – CSS Rule Parser
 *
 * Handles the annotated CSS comment format used internally:
 *   "/* [rule=X] [selector=Y] [msize=Z] *​/"
 *
 * Original functions: d, p, c, u, m, f
 *
 * Dependencies: jQuery (o), window.YP, YP.cssStorage
 */
(function (o) {
    "use strict";

    var YP = window.YP = window.YP || {};

    // Convenience shorthands resolved at call time (lazy) for correct load order
    function getCSSData(mode, raw) {
        return YP.cssStorage ? YP.cssStorage.getCSSData(mode, raw) : "";
    }
    function setCSSData(css, mode, flag) {
        if (YP.cssStorage) YP.cssStorage.setCSSData(css, mode, flag);
    }

    /* =========================================================================
     * encodeSelector  (original: gi)
     * URL-encodes a CSS selector for safe embedding inside comment annotations.
     * ========================================================================= */
    function encodeSelector(selector) {
        try { return encodeURIComponent(selector); }
        catch (e) { return selector; }
    }

    /* =========================================================================
     * annotateRule  (original: d)
     *
     * Takes a single CSS rule string (e.g. ".foo { color: red; }") and
     * prepends a comment annotation with [rule], [selector], and [msize] tags.
     *
     * Returns the annotated string.
     * ========================================================================= */
    function annotateRule(ruleStr) {
        ruleStr = ruleStr.trim().replace(/(\/\*|^)(.*?)\*\//g, "");

        var msize    = "desktop";
        var selector = ruleStr.split("{")[0];
        var property;

        if (ruleStr.indexOf("@media") === -1) {
            property = ruleStr.split("{")[1].split("}")[0];
        } else {
            msize    = ruleStr.match(/@media(.*?){/g)[0]
                             .replace(/(^@media(\s+)|\{$)/g, "");
            property = ruleStr.split("{")[2].split("}")[0];
        }

        if (selector.indexOf("@media") !== -1) {
            selector = ruleStr.split("{")[1].split("{")[0];
        }

        property = property.split(":")[0];

        return "/* [rule=" + property.trim() +
               "] [selector=" + encodeSelector(selector.trim()) +
               "] [msize=" + msize.trim() + "] */ " + ruleStr.trim();
    }

    /* =========================================================================
     * findRules  (original: p)
     *
     * Returns an array of annotated CSS blocks from `cssText` that match
     * all tags in `filterStr` (e.g. "[rule=color] [selector=.foo]").
     *
     * excludeBreakpoints – if true, skips blocks containing YPtoAddBreakpoint.
     * ========================================================================= */
    function findRules(cssText, filterStr, excludeBreakpoints) {
        var tags    = filterStr.match(/\[(.*?)\]/g);
        var blocks  = cssText.split("/*");
        var matches = [];
        var tagCount = tags.length;
        var t0 = o.trim(tags[0]);
        var t1 = o.trim(tags[1]);
        var t2 = o.trim(tags[2]);

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];

            if (excludeBreakpoints && block.indexOf("YPtoAddBreakpoint") !== -1) continue;

            var has0 = block.indexOf(t0) !== -1;
            var has1 = tagCount >= 2 ? block.indexOf(t1) !== -1 : false;
            var has2 = tagCount >= 3 ? block.indexOf(t2) !== -1 : false;

            // Special case: [style] without msize/selector means any annotated block
            var isStyleWild = tagCount === 1 && t0 === "[style]" &&
                              block.indexOf("[msize=")     === -1 &&
                              block.indexOf("[selector=")  === -1 &&
                              block.indexOf("[rule=")      === -1;

            if (tagCount === 3 && has0 && has1 && has2) {
                matches.push(block);
            } else if (tagCount === 2 && has0 && has1) {
                matches.push(block);
            } else if (tagCount === 1 && (has0 || t0 === "[style]") && !isStyleWild) {
                matches.push(block);
            }
        }

        return matches;
    }

    /* =========================================================================
     * findRuleIndex  (original: c)
     *
     * Returns the zero-based index (minus one) of the first block in `cssText`
     * that matches `filterStr`, or null if not found.
     * ========================================================================= */
    function findRuleIndex(cssText, filterStr) {
        var tags     = filterStr.match(/\[(.*?)\]/g);
        var blocks   = cssText.split("/*");
        var tagCount = tags.length;
        var t0 = o.trim(tags[0]);
        var t1 = o.trim(tags[1]);
        var t2 = o.trim(tags[2]);
        var found    = -1;

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            var has0  = block.indexOf(t0) !== -1;
            var has1  = tagCount >= 2 ? block.indexOf(t1) !== -1 : false;
            var has2  = tagCount >= 3 ? block.indexOf(t2) !== -1 : false;

            var isStyleWild = tagCount === 1 && t0 === "[style]" &&
                              block.indexOf("[msize=")     === -1 &&
                              block.indexOf("[selector=")  === -1 &&
                              block.indexOf("[rule=")      === -1;

            if (tagCount === 3 && has0 && has1 && has2) { found = i; break; }
            if (tagCount === 2 && has0 && has1)          { found = i; break; }
            if (tagCount === 1 && (has0 || t0 === "[style]") && !isStyleWild) { found = i; break; }
        }

        if (found === 1) return found - 1;
        if (found > 1)  return found - 1;
        return null;
    }

    /* =========================================================================
     * removeRule  (original: u)
     *
     * Returns `cssText` with all blocks matching `filterStr` removed.
     * ========================================================================= */
    function removeRule(cssText, filterStr) {
        var tags     = filterStr.match(/\[(.*?)\]/g);
        var blocks   = cssText.split("/*");
        var tagCount = tags.length;
        var t0 = o.trim(tags[0]);
        var t1 = o.trim(tags[1]);
        var t2 = o.trim(tags[2]);
        var kept     = [];

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            var has0  = block.indexOf(t0) !== -1;
            var has1  = tagCount >= 2 ? block.indexOf(t1) !== -1 : false;
            var has2  = tagCount >= 3 ? block.indexOf(t2) !== -1 : false;

            var shouldRemove = (tagCount === 3 && has0 && has1 && has2) ||
                               (tagCount === 2 && has0 && has1) ||
                               (tagCount === 1 && has0);

            if (!shouldRemove) kept.push(block);
        }

        kept = kept.filter(Boolean);
        kept.splice(0, 0, "");
        return kept.join("/*").trim();
    }

    /* =========================================================================
     * upsertRule  (original: m)
     *
     * Inserts or updates a rule in `cssText`.
     * Maintains proper ordering: desktop rules, then max-width, then min-width.
     *
     * cssText  – full CSS string
     * ruleStr  – annotated rule string (will be annotated if not already)
     * position – insertion index (null = append in natural order)
     * ========================================================================= */
    function upsertRule(cssText, ruleStr, position) {
        if (position === "default") position = null;

        ruleStr = annotateRule(ruleStr).replace(/^\/\*/, "");

        var ruleProp  = o.trim(ruleStr.match(/\[rule\=(.*?)\]/)[0]);
        var ruleSel   = o.trim(ruleStr.match(/\[selector\=(.*?)\]/)[0]);
        var ruleMsize = o.trim(ruleStr.match(/\[msize\=(.*?)\]/)[0]);

        if (ruleProp === "a") position = null;

        var maxBlocks     = [];
        var minBlocks     = [];
        var desktopBlocks = [];
        var replaced      = false;
        var block, msize;

        if (cssText.length > 0) {
            var parts = cssText.split("/*");
            for (var g = 0; g < parts.length; g++) {
                block = parts[g];
                if (block.length <= 1) continue;
                msize = block.match(/\[msize\=(.*?)\]/)[0];
                if (msize.indexOf("max-width") !== -1 && msize.indexOf("and") === -1) {
                    maxBlocks.push(block);
                } else if (msize.indexOf("min-width") !== -1 && msize.indexOf("and") === -1) {
                    minBlocks.push(block);
                } else {
                    desktopBlocks.push(block);
                }
            }
        }

        // Determine which bucket to insert into
        var isMax     = ruleMsize.indexOf("max-width") !== -1 && ruleMsize.indexOf("and") === -1;
        var isMin     = ruleMsize.indexOf("min-width") !== -1 && ruleMsize.indexOf("and") === -1;
        var targetArr = isMax ? maxBlocks : isMin ? minBlocks : desktopBlocks;

        if (isMax && position !== null) position -= desktopBlocks.length;
        if (isMin && position !== null) position = position - maxBlocks.length - desktopBlocks.length;

        // Try to replace existing entry with same rule+selector+msize
        for (var gi = targetArr.length; gi--;) {
            block = targetArr[gi];
            if (block.indexOf(ruleProp) !== -1 &&
                block.indexOf(ruleSel)  !== -1 &&
                block.indexOf(ruleMsize) !== -1) {
                targetArr[gi] = ruleStr;
                replaced = true;
                break;
            }
        }

        // Try to insert after a block with same selector+msize
        if (!replaced) {
            for (var gj = targetArr.length; gj--;) {
                block = targetArr[gj];
                if (block.indexOf(ruleSel) !== -1 && block.indexOf(ruleMsize) !== -1) {
                    if (position === null) {
                        targetArr.splice(gj + 1, 0, ruleStr);
                    } else {
                        targetArr.splice(position, 0, ruleStr);
                    }
                    replaced = true;
                    break;
                }
            }
        }

        if (targetArr.length === 0 || !replaced) {
            if (position === null) {
                targetArr.push(ruleStr);
            } else {
                targetArr.splice(position, 0, ruleStr);
            }
        }

        return sortRules(desktopBlocks, maxBlocks, minBlocks, false);
    }

    /* =========================================================================
     * sortRules  (original: f)
     *
     * Sorts and joins CSS blocks into the canonical order:
     *   desktop → max-width (desc) → min-width (asc)
     *
     * If `reload` is true, re-reads the full CSS from the store first.
     * ========================================================================= */
    function sortRules(desktopBlocks, maxBlocks, minBlocks, reload) {
        if (reload === true) {
            maxBlocks     = [];
            minBlocks     = [];
            desktopBlocks = [];

            var raw    = getCSSData().split("/*");
            var block, msize;

            for (var r = 0; r < raw.length; r++) {
                block = raw[r];
                if (block.length <= 1) continue;
                msize = block.match(/\[msize\=(.*?)\]/)[0];
                if (msize.indexOf("max-width") !== -1 && msize.indexOf("and") === -1) {
                    maxBlocks.push(block);
                } else if (msize.indexOf("min-width") !== -1 && msize.indexOf("and") === -1) {
                    minBlocks.push(block);
                } else {
                    desktopBlocks.push(block);
                }
            }
        }

        // Group max-width by breakpoint value, sort descending
        var maxGrouped = {};
        maxBlocks.filter(Boolean).forEach(function (block) {
            var key = block.match(/\[msize\=(.*?)\]/)[0].replace(/\D/g, "");
            if (!maxGrouped[key]) maxGrouped[key] = [];
            maxGrouped[key].push(block);
        });
        var maxSorted = Object.keys(maxGrouped).sort(function (a, b) { return b - a; });
        var flatMax   = [];
        maxSorted.forEach(function (k) { maxGrouped[k].forEach(function (b) { flatMax.push(b); }); });

        // Group min-width by breakpoint value, sort ascending
        var minGrouped = {};
        minBlocks.filter(Boolean).forEach(function (block) {
            var key = block.match(/\[msize\=(.*?)\]/)[0].replace(/\D/g, "");
            if (!minGrouped[key]) minGrouped[key] = [];
            minGrouped[key].push(block);
        });
        var minSorted = Object.keys(minGrouped).sort(function (a, b) { return a - b; });
        var flatMin   = [];
        minSorted.forEach(function (k) { minGrouped[k].forEach(function (b) { flatMin.push(b); }); });

        var result = desktopBlocks.concat(flatMax).concat(flatMin);
        result.splice(0, 0, "");
        return result.join("/*").trim();
    }

    /* =========================================================================
     * Export
     * ========================================================================= */
    YP.cssParser = {
        annotateRule    : annotateRule,
        findRules       : findRules,
        findRuleIndex   : findRuleIndex,
        removeRule      : removeRule,
        upsertRule      : upsertRule,
        sortRules       : sortRules,
        encodeSelector  : encodeSelector
    };

    // Backward-compat aliases
    YP._compat = YP._compat || {};
    Object.assign(YP._compat, {
        d  : annotateRule,
        p  : findRules,
        c  : findRuleIndex,
        u  : removeRule,
        m  : upsertRule,
        f  : sortRules,
        gi : encodeSelector
    });

})(jQuery);
