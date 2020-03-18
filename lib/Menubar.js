"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var events_1 = require("events");
var fs = require("fs");
var path = require("path");
var Positioner = require("electron-positioner");
var cleanOptions_1 = require("./util/cleanOptions");
var getWindowPosition_1 = require("./util/getWindowPosition");
/**
 * The main Menubar class.
 *
 * @noInheritDoc
 */
var Menubar = /** @class */ (function (_super) {
    __extends(Menubar, _super);
    function Menubar(app, options) {
        var _this = _super.call(this) || this;
        _this._supportsTrayHighlightState = false;
        _this._app = app;
        _this._options = cleanOptions_1.cleanOptions(options);
        if (app.isReady()) {
            // See https://github.com/maxogden/menubar/pull/151
            process.nextTick(function () {
                return _this.appReady().catch(function (err) { return console.error('menubar: ', err); });
            });
        }
        else {
            app.on('ready', function () {
                return _this.appReady().catch(function (err) { return console.error('menubar: ', err); });
            });
        }
        return _this;
    }
    Object.defineProperty(Menubar.prototype, "app", {
        /**
         * The Electron [App](https://electronjs.org/docs/api/app)
         * instance.
         */
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menubar.prototype, "positioner", {
        /**
         * The [electron-positioner](https://github.com/jenslind/electron-positioner)
         * instance.
         */
        get: function () {
            if (!this._positioner) {
                throw new Error('Please access `this.positioner` after the `after-create-window` event has fired.');
            }
            return this._positioner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menubar.prototype, "tray", {
        /**
         * The Electron [Tray](https://electronjs.org/docs/api/tray) instance.
         */
        get: function () {
            if (!this._tray) {
                throw new Error('Please access `this.tray` after the `ready` event has fired.');
            }
            return this._tray;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menubar.prototype, "window", {
        /**
         * The Electron [BrowserWindow](https://electronjs.org/docs/api/browser-window)
         * instance, if it's present.
         */
        get: function () {
            return this._browserWindow;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieve a menubar option.
     *
     * @param key - The option key to retrieve, see {@link Options}.
     */
    Menubar.prototype.getOption = function (key) {
        return this._options[key];
    };
    /**
     * Hide the menubar window.
     */
    Menubar.prototype.hideWindow = function () {
        if (this._supportsTrayHighlightState) {
            this.tray.setHighlightMode('never');
        }
        if (!this._browserWindow || !this._browserWindow.isVisible()) {
            return;
        }
        this.emit('hide');
        this._browserWindow.hide();
        this.emit('after-hide');
    };
    /**
     * Change an option after menubar is created.
     *
     * @param key - The option key to modify, see {@link Options}.
     * @param value - The value to set.
     */
    Menubar.prototype.setOption = function (key, value) {
        this._options[key] = value;
    };
    /**
     * Show the menubar window.
     *
     * @param trayPos - The bounds to show the window in.
     */
    Menubar.prototype.showWindow = function (trayPos) {
        return __awaiter(this, void 0, void 0, function () {
            var noBoundsPosition, position, x, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tray) {
                            throw new Error('Tray should have been instantiated by now');
                        }
                        if (this._supportsTrayHighlightState) {
                            this.tray.setHighlightMode('always');
                        }
                        if (!!this._browserWindow) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createWindow()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // Use guard for TypeScript, to avoid ! everywhere
                        if (!this._browserWindow) {
                            throw new Error('Window has been initialized just above. qed.');
                        }
                        this.emit('show');
                        if (trayPos && trayPos.x !== 0) {
                            // Cache the bounds
                            this._cachedBounds = trayPos;
                        }
                        else if (this._cachedBounds) {
                            // Cached value will be used if showWindow is called without bounds data
                            trayPos = this._cachedBounds;
                        }
                        else if (this.tray.getBounds) {
                            // Get the current tray bounds
                            trayPos = this.tray.getBounds();
                        }
                        noBoundsPosition = null;
                        if ((trayPos === undefined || trayPos.x === 0) &&
                            this._options.windowPosition &&
                            this._options.windowPosition.startsWith('tray')) {
                            noBoundsPosition =
                                process.platform === 'win32' ? 'bottomRight' : 'topRight';
                        }
                        position = this.positioner.calculate(noBoundsPosition || this._options.windowPosition, trayPos);
                        x = this._options.browserWindow.x !== undefined
                            ? this._options.browserWindow.x
                            : position.x;
                        y = this._options.browserWindow.y !== undefined
                            ? this._options.browserWindow.y
                            : position.y;
                        // Multi-Taskbar: optimize vertical position
                        // https://github.com/maxogden/menubar/pull/217
                        if (process.platform === 'win32') {
                            if (trayPos &&
                                this._options.windowPosition &&
                                this._options.windowPosition.startsWith('bottom')) {
                                y =
                                    trayPos.y +
                                        trayPos.height / 2 -
                                        this._browserWindow.getBounds().height / 2;
                            }
                        }
                        // `.setPosition` crashed on non-integers
                        // https://github.com/maxogden/menubar/issues/233
                        this._browserWindow.setPosition(Math.round(x), Math.round(y));
                        this._browserWindow.show();
                        this.emit('after-show');
                        return [2 /*return*/];
                }
            });
        });
    };
    Menubar.prototype.appReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            var trayImage, defaultClickEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.app.dock && !this._options.showDockIcon) {
                            this.app.dock.hide();
                        }
                        trayImage = this._options.icon || path.join(this._options.dir, 'IconTemplate.png');
                        if (typeof trayImage === 'string' && !fs.existsSync(trayImage)) {
                            trayImage = path.join(__dirname, '..', 'assets', 'IconTemplate.png'); // Default cat icon
                        }
                        defaultClickEvent = this._options.showOnRightClick
                            ? 'right-click'
                            : 'click';
                        this._tray = this._options.tray || new electron_1.Tray(trayImage);
                        // Type guards for TS not to complain
                        if (!this.tray) {
                            throw new Error('Tray has been initialized above');
                        }
                        if (process.platform !== "win32" && process.platform !== "darwin") {
                            this.tray.setContextMenu(null);
                        }
                        this.tray.on(defaultClickEvent, this.clicked.bind(this));
                        this.tray.on('double-click', this.clicked.bind(this));
                        this.tray.setToolTip(this._options.tooltip);
                        if (!this._options.windowPosition) {
                            // Fill in this._options.windowPosition when taskbar position is available
                            this._options.windowPosition = getWindowPosition_1.getWindowPosition(this.tray);
                        }
                        try {
                            this.tray.setHighlightMode('never');
                            this._supportsTrayHighlightState = true;
                        }
                        catch (e) {
                            /* Do nothing */
                        }
                        if (!this._options.preloadWindow) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createWindow()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.emit('ready');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Callback on tray icon click or double-click.
     *
     * @param e
     * @param bounds
     */
    Menubar.prototype.clicked = function (event, bounds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (event && (event.shiftKey || event.ctrlKey || event.metaKey)) {
                            return [2 /*return*/, this.hideWindow()];
                        }
                        if (this._browserWindow && this._browserWindow.isVisible()) {
                            return [2 /*return*/, this.hideWindow()];
                        }
                        this._cachedBounds = bounds || this._cachedBounds;
                        return [4 /*yield*/, this.showWindow(this._cachedBounds)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Menubar.prototype.createWindow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaults;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.emit('create-window');
                        defaults = {
                            show: false,
                            frame: false // Remove window frame
                        };
                        this._browserWindow =
                            this._options.browserWindow instanceof electron_1.BrowserWindow
                                ? this._options.browserWindow
                                : new electron_1.BrowserWindow(__assign({}, defaults, this._options.browserWindow, this._options));
                        this._positioner = new Positioner(this._browserWindow);
                        this._browserWindow.on('blur', function () {
                            if (!_this._browserWindow) {
                                return;
                            }
                            _this._browserWindow.isAlwaysOnTop()
                                ? _this.emit('focus-lost')
                                : _this.hideWindow();
                        });
                        if (this._options.showOnAllWorkspaces !== false) {
                            this._browserWindow.setVisibleOnAllWorkspaces(true);
                        }
                        this._browserWindow.on('close', this.windowClear.bind(this));
                        return [4 /*yield*/, this._browserWindow.loadURL(this._options.index)];
                    case 1:
                        _a.sent();
                        this.emit('after-create-window');
                        return [2 /*return*/];
                }
            });
        });
    };
    Menubar.prototype.windowClear = function () {
        this._browserWindow = undefined;
        this.emit('after-close');
    };
    return Menubar;
}(events_1.EventEmitter));
exports.Menubar = Menubar;
