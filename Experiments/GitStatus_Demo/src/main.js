const electron = require('electron')

const { app, BrowserWindow } = electron

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 900,
    })

    mainWindow.loadURL(`file://${__dirname}/status.html`)
    mainWindow.openDevTools()

    mainWindow.on('close', () => {
        mainWindow = null
    })
})

