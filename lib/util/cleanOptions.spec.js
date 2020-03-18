"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var electron_1 = require("../__mocks__/electron");
var cleanOptions_1 = require("./cleanOptions");
var DEFAULT_OPTIONS = {
    browserWindow: {
        height: 400,
        width: 400
    },
    dir: path.resolve(electron_1.MOCK_APP_GETAPPPATH),
    index: "file://" + path.join(path.resolve(electron_1.MOCK_APP_GETAPPPATH), 'index.html'),
    tooltip: ''
};
describe('cleanOptions', function () {
    it('should handle undefined', function () {
        expect(cleanOptions_1.cleanOptions(undefined)).toEqual(DEFAULT_OPTIONS);
    });
    it('should handle a string with relative path', function () {
        expect(cleanOptions_1.cleanOptions('MY_RELATIVE_PATH')).toEqual(__assign({}, DEFAULT_OPTIONS, { dir: path.resolve('MY_RELATIVE_PATH'), index: "file://" + path.join(path.resolve('MY_RELATIVE_PATH'), 'index.html') }));
    });
    it('should handle a string with absolute path', function () {
        expect(cleanOptions_1.cleanOptions('/home/me/MY_ABSOLUTE_PATH')).toEqual(__assign({}, DEFAULT_OPTIONS, { dir: '/home/me/MY_ABSOLUTE_PATH', index: 'file:///home/me/MY_ABSOLUTE_PATH/index.html' }));
    });
    it('should handle an object', function () {
        expect(cleanOptions_1.cleanOptions({
            browserWindow: {
                height: 100
            },
            index: 'file:///home/abc/index.html',
            showDockIcon: true,
            windowPosition: 'trayCenter'
        })).toEqual(__assign({}, DEFAULT_OPTIONS, { browserWindow: __assign({}, DEFAULT_OPTIONS.browserWindow, { height: 100 }), index: 'file:///home/abc/index.html', showDockIcon: true, windowPosition: 'trayCenter' }));
    });
    describe('Backwards compatibility', function () {
        ['height', 'width', 'x', 'y'].forEach(function (field) {
            it("should handle options." + field, function () {
                var _a, _b;
                console.warn = jest.fn();
                expect(cleanOptions_1.cleanOptions((_a = {},
                    _a[field] = 123,
                    _a))).toEqual(__assign({}, DEFAULT_OPTIONS, { browserWindow: __assign({}, DEFAULT_OPTIONS.browserWindow, (_b = {}, _b[field] = 123, _b)) }));
                expect(console.warn).toHaveBeenCalledWith("Passing 'options." + field + "' is deprecated, please use 'options.browserWindow." + field + "'");
            });
        });
    });
});
