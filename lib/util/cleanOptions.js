"use strict";
/**
 * @ignore
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** */
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var DEFAULT_WINDOW_HEIGHT = 400;
var DEFAULT_WINDOW_WIDTH = 400;
// Deprecated fields on Options
var DEPRECATED = {
    alwaysOnTop: true,
    height: true,
    width: true,
    x: true,
    y: true
};
/**
 * Take as input some options, and return a sanitized version of it.
 *
 * @param opts - The options to clean.
 * @ignore
 */
function cleanOptions(opts) {
    var options;
    if (typeof opts === 'undefined') {
        options = { browserWindow: {}, dir: electron_1.app.getAppPath() };
    }
    else if (typeof opts === 'string') {
        console.warn('Passing a string into Menubar is deprecated. Please pass an `Options` object instead.');
        options = { browserWindow: {}, dir: opts };
    }
    else {
        // These 5 fields are deprecated, we don't want them in `options`
        // tslint:disable-next-line
        var alwaysOnTop = opts.alwaysOnTop, height = opts.height, width = opts.width, x = opts.x, y = opts.y, rest = __rest(opts, ["alwaysOnTop", "height", "width", "x", "y"]);
        options = __assign({}, rest);
    }
    if (!options.dir) {
        options.dir = electron_1.app.getAppPath();
    }
    if (!path.isAbsolute(options.dir)) {
        options.dir = path.resolve(options.dir);
    }
    if (!options.index) {
        options.index = url.format({
            pathname: path.join(options.dir, 'index.html'),
            protocol: 'file:',
            slashes: true
        });
    }
    options.tooltip = options.tooltip || '';
    // `icon`, `preloadWindow`, `showDockIcon`, `showOnAllWorkspaces`,
    // `showOnRightClick` don't need any special treatment
    // Now we take care of `browserWindow`
    if (!options.browserWindow) {
        options.browserWindow = {};
    }
    // Backward-compat
    Object.keys(DEPRECATED).forEach(backwardCompat(opts, options));
    // Set width/height on options to be usable before the window is created
    options.browserWindow.width =
        options.browserWindow.width !== undefined
            ? options.browserWindow.width
            : DEFAULT_WINDOW_WIDTH;
    options.browserWindow.height =
        options.browserWindow.height !== undefined
            ? options.browserWindow.height
            : DEFAULT_WINDOW_HEIGHT;
    return options;
}
exports.cleanOptions = cleanOptions;
/**
 * Helper function to deal with backwards-compatibility of the following fields:
 * x, y, height, width, alwaysOnTop
 */
function backwardCompat(opts, options) {
    return function (field) {
        if (opts === undefined || typeof opts === 'string') {
            return;
        }
        var _field = field;
        if (opts[_field]) {
            console.warn("Passing 'options." + field + "' is deprecated, please use 'options.browserWindow." + field + "'");
            options.browserWindow[_field] =
                opts.browserWindow && opts.browserWindow[_field] !== undefined
                    ? opts.browserWindow[_field]
                    : opts[_field];
        }
    };
}
