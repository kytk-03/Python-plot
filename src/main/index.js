import {app, BrowserWindow, Menu, screen } from "electron";
import fs from 'fs';
import { dialog } from 'electron'

let win;

function createWindow() {
    const size = screen.getPrimaryDisplay().size;
    win = new BrowserWindow({width: size.width, height: size.height, 'icon': __dirname + '/../../public/icon.ico'});
    win.loadURL(`file://${__dirname}/../../public/index.html`);
    win.on("close", () => {
        win = null
    })
}

app.on("ready", () => {
    createWindow();
    installMenu()
});

app.on("window-all-closed", () => {
    if(process.platform!=="darwin"){
        app.quit();
    }
});

app.on("activate", (_e, hasVisibleWindows) => {
    if(!hasVisibleWindows) {
        createWindow()
    }
});

function installMenu() {
    let template;

    template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Import Experiment',
                    accelerator: 'CmdOrCtrl+I',
                    click(item, focusedWindow) {
                        let experiment = dialog.showOpenDialog({properties: ['openDirectory']});
                        fs.writeFileSync(".experiment", experiment, "utf-8");
                        if (focusedWindow) focusedWindow.reload();
                    }
                },
                {
                    label: 'Change Python path',
                    accelerator: 'CmdOrCtrl+e',
                    click(item, focusedWindow) {
                        let pythonPath = dialog.showOpenDialog({title: "Please select the Python interpreter.",properties: ['openFile'], filters: [{name: "", "extensions": ["exe"]}]});
                        fs.writeFileSync("./.path", pythonPath, {encoding:"utf-8"});
                        if (focusedWindow) focusedWindow.reload();
                    }
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: function() { app.quit(); }
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click(item, focusedWindow){
                        if(focusedWindow) focusedWindow.reload()
                    },
                },
                {
                    type: 'separator',
                },
                {
                    role: 'resetzoom',
                },
                {
                    role: 'zoomin',
                },
                {
                    role: 'zoomout',
                },
                {
                    type: 'separator',
                },
                {
                    role: 'togglefullscreen',
                },
                {
                    label: 'Toggle &Developer Tools',
                    accelerator: 'Alt+Ctrl+I',
                    click: function() { win.toggleDevTools(); }
                },
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}