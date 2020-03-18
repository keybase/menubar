/// <reference types="jest" />
export declare const MOCK_APP_GETAPPPATH = "mock.app.getAppPath";
export declare const app: {
    getAppPath: jest.Mock<string, []>;
    isReady: () => Promise<void>;
};
export declare class BrowserWindow {
    loadURL(): void;
    on(): void;
    setVisibleOnAllWorkspaces(): void;
}
export declare class Tray {
    on(): void;
    setToolTip(): void;
}
