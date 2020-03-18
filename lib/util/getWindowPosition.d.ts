/**
 * Utilities to get taskbar position and consequently menubar's position
 */
/** */
import { Tray } from 'electron';
/**
 * Determine taskbard location: "top", "bottom", "left" or "right".
 *
 * Only tested on Windows for now, and only used in Windows.
 *
 * @param tray - The Electron Tray instance.
 */
export declare function taskbarLocation(tray: Tray): "left" | "right" | "top" | "bottom";
/**
 * Depending on where the taskbar is, determine where the window should be
 * positioned.
 *
 * @param tray - The Electron Tray instance.
 */
export declare function getWindowPosition(tray: Tray): "trayBottomLeft" | "trayCenter" | "trayBottomCenter" | "topRight" | "bottomRight" | undefined;
