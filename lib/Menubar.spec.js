"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var Menubar_1 = require("./Menubar");
describe('Menubar', function () {
    var mb;
    beforeEach(function () {
        mb = new Menubar_1.Menubar(electron_1.app, { preloadWindow: true });
    });
    it('should have property `app`', function () {
        expect(mb.app).toBeDefined();
    });
    it('should have property `positioner`', function (done) {
        expect(function () { return mb.positioner; }).toThrow();
        mb.on('after-create-window', function () {
            expect(mb.positioner).toBeDefined();
            done();
        });
    });
    it('should have property `tray`', function (done) {
        expect(function () { return mb.tray; }).toThrow();
        mb.on('ready', function () {
            expect(mb.tray).toBeInstanceOf(electron_1.Tray);
            done();
        });
    });
    it('should have property `window`', function (done) {
        expect(mb.window).toBeUndefined();
        mb.on('ready', function () {
            expect(mb.window).toBeInstanceOf(electron_1.BrowserWindow);
            done();
        });
    });
});
