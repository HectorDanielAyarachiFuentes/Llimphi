/**
 * yp-namespace.js
 * Yellow Pencil – Namespace Bootstrap & Compatibility Bridge
 *
 * MUST be loaded FIRST, before any other yp-*.js module.
 *
 * Creates window.YP and a backward-compat bridge that re-exposes
 * all module functions under their original single-letter names
 * so yellow-pencil.js (the main IIFE) can call them without changes
 * during the migration phase.
 *
 * Load order:
 *   1. yp-namespace.js     ← this file
 *   2. yp-state.js
 *   3. yp-ui-utils.js
 *   4. yp-css-storage.js
 *   5. yp-css-parser.js
 *   6. yp-selector.js
 *   7. yp-responsive.js
 *   8. yp-save.js
 *   9. yellow-pencil.js    ← original IIFE (remaining code)
 */
(function () {
    "use strict";

    // Create top-level namespace
    window.YP = window.YP || {
        _compat: {},
        state       : {},
        utils       : {},
        cssStorage  : {},
        cssParser   : {},
        selector    : {},
        responsive  : {},
        save        : {}
    };

    /**
     * applyCompat()
     *
     * Iterates over all _compat aliases registered by modules and exposes them
     * directly on the window.YP object AND (for the main IIFE bridge) as a map
     * that the IIFE can destructure at boot time.
     *
     * Call this once after all modules have loaded and before yellow-pencil.js
     * boots its IIFE.
     */
    window.YP.applyCompat = function () {
        var compat = window.YP._compat;
        var k;
        for (k in compat) {
            if (Object.prototype.hasOwnProperty.call(compat, k)) {
                window.YP[k] = compat[k];
            }
        }
    };

    /**
     * expose(name, fn)
     *
     * Convenience: modules call this to register an export under window.YP
     * and its compat alias simultaneously.
     */
    window.YP.expose = function (alias, name, fn) {
        window.YP[name] = fn;
        window.YP._compat[alias] = fn;
    };

}());
