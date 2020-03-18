"use strict";
/**
 * Entry point of menubar
 * @example
 * ```typescript
 * import { menubar } from 'menubar';
 * ```
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/** */
var electron_1 = require("electron");
var Menubar_1 = require("./Menubar");
exports.Menubar = Menubar_1.Menubar;
__export(require("./util/getWindowPosition"));
/**
 * Factory function to create a menubar application
 *
 * @param options - Options for creating a menubar application, see
 * {@link Options}
 */
function menubar(options) {
    return new Menubar_1.Menubar(electron_1.app, options);
}
exports.menubar = menubar;
