const electron =  require("electron")

const { app, BrowserWindow, globalShortcut } = electron



app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 900,
        resizable: false,
        frame: false,        
    })

    mainWindow.openDevTools()

    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.on('close', () => {
        mainWindow = null
    })

    globalShortcut.register('Ctrl+P', () => {
        mainWindow.webContents.send('capture', app.getPath('pictures'))
    })
})