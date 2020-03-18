"use strict";
/**
 * Utilities to get taskbar position and consequently menubar's position
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determine taskbard location: "top", "bottom", "left" or "right".
 *
 * Only tested on Windows for now, and only used in Windows.
 *
 * @param tray - The Electron Tray instance.
 */
function taskbarLocation(tray) {
    var trayBounds = tray.getBounds();
    // Determine taskbar location
    if (trayBounds.width !== trayBounds.height && trayBounds.y === 0) {
        return 'top';
    }
    if (trayBounds.width !== trayBounds.height && trayBounds.y > 0) {
        return 'bottom';
    }
    if (trayBounds.width === trayBounds.height && trayBounds.x < trayBounds.y) {
        return 'left';
    }
    if (trayBounds.width === trayBounds.height && trayBounds.x > trayBounds.y) {
        return 'right';
    }
    // By default, return 'bottom'
    return 'bottom';
}
exports.taskbarLocation = taskbarLocation;
/**
 * Depending on where the taskbar is, determine where the window should be
 * positioned.
 *
 * @param tray - The Electron Tray instance.
 */
function getWindowPosition(tray) {
    switch (process.platform) {
        // macOS
        // Supports top taskbars
        case 'darwin':
            return 'trayCenter';
        // Linux
        // Supports top taskbars
        // TODO Support bottom taskbars too https://github.com/maxogden/menubar/issues/123
        case 'linux':
            return 'topRight';
        // Windows
        // Supports top/bottom/left/right taskbar, default bottom
        case 'win32':
            var traySide = taskbarLocation(tray);
            // Assign position for menubar
            if (traySide === 'top') {
                return 'trayCenter';
            }
            if (traySide === 'bottom') {
                return 'trayBottomCenter';
            }
            if (traySide === 'left') {
                return 'trayBottomLeft';
            }
            if (traySide === 'right') {
                return 'bottomRight';
            }
    }
}
exports.getWindowPosition = getWindowPosition;
