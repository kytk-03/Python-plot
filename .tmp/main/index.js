'use strict';

var _electron = require('electron');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var win = void 0;

function createWindow() {
    var size = _electron.screen.getPrimaryDisplay().size;
    win = new _electron.BrowserWindow({ width: size.width, height: size.height, 'icon': __dirname + '/../../public/icon.ico' });
    win.loadURL('file://' + __dirname + '/../../public/index.html');
    win.on("close", function () {
        win = null;
    });
}

_electron.app.on("ready", function () {
    createWindow();
    installMenu();
});

_electron.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        _electron.app.quit();
    }
});

_electron.app.on("activate", function (_e, hasVisibleWindows) {
    if (!hasVisibleWindows) {
        createWindow();
    }
});

function installMenu() {
    var template = void 0;

    template = [{
        label: 'File',
        submenu: [{
            label: 'Import Experiment',
            accelerator: 'CmdOrCtrl+I',
            click: function click(item, focusedWindow) {
                var experiment = _electron.dialog.showOpenDialog({ properties: ['openDirectory'] });
                _fs2.default.writeFileSync(".experiment", experiment, "utf-8");
                if (focusedWindow) focusedWindow.reload();
            }
        }, {
            label: 'Change Python path',
            accelerator: 'CmdOrCtrl+e',
            click: function click(item, focusedWindow) {
                var pythonPath = _electron.dialog.showOpenDialog({ title: "Please select the Python interpreter.", properties: ['openFile'], filters: [{ name: "", "extensions": ["exe"] }] });
                _fs2.default.writeFileSync("./.path", pythonPath, { encoding: "utf-8" });
                if (focusedWindow) focusedWindow.reload();
            }
        }, {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: function click() {
                _electron.app.quit();
            }
        }]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.reload();
            }
        }, {
            type: 'separator'
        }, {
            role: 'resetzoom'
        }, {
            role: 'zoomin'
        }, {
            role: 'zoomout'
        }, {
            type: 'separator'
        }, {
            role: 'togglefullscreen'
        }, {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: function click() {
                win.toggleDevTools();
            }
        }]
    }];

    var menu = _electron.Menu.buildFromTemplate(template);
    _electron.Menu.setApplicationMenu(menu);
}