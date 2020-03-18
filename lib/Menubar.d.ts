/// <reference types="node" />
import { Tray, BrowserWindow } from 'electron';
import { EventEmitter } from 'events';
import { Options } from './types';
/**
 * The main Menubar class.
 *
 * @noInheritDoc
 */
export declare class Menubar extends EventEmitter {
    private _app;
    private _browserWindow?;
    private _cachedBounds?;
    private _options;
    private _positioner;
    private _supportsTrayHighlightState;
    private _tray?;
    constructor(app: Electron.App, options?: Partial<Options> | string);
    /**
     * The Electron [App](https://electronjs.org/docs/api/app)
     * instance.
     */
    readonly app: Electron.App;
    /**
     * The [electron-positioner](https://github.com/jenslind/electron-positioner)
     * instance.
     */
    readonly positioner: any;
    /**
     * The Electron [Tray](https://electronjs.org/docs/api/tray) instance.
     */
    readonly tray: Tray;
    /**
     * The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
     * instance, if it's present.
     */
    readonly window: BrowserWindow | undefined;
    /**
     * Retrieve a menubar option.
     *
     * @param key - The option key to retrieve, see {@link Options}.
     */
    getOption(key: keyof Options): string | number | boolean | Electron.NativeImage | Tray | Electron.BrowserWindowConstructorOptions | undefined;
    /**
     * Hide the menubar window.
     */
    hideWindow(): void;
    /**
     * Change an option after menubar is created.
     *
     * @param key - The option key to modify, see {@link Options}.
     * @param value - The value to set.
     */
    setOption(key: keyof Options, value: any): void;
    /**
     * Show the menubar window.
     *
     * @param trayPos - The bounds to show the window in.
     */
    showWindow(trayPos?: Electron.Rectangle): Promise<void>;
    private appReady;
    /**
     * Callback on tray icon click or double-click.
     *
     * @param e
     * @param bounds
     */
    private clicked;
    private createWindow;
    private windowClear;
}
