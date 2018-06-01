const electron = require("electron")
const path = require("path")

// const menu = electron.menu
// const app = electron.app
// const tray = electron.Tray

const { app, Menu, Tray } = electron

app.on('ready', () => {
    console.log('started')
    const tray = new Tray(path.join("src","trayIcon.png"))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'wow',
            click: () => {console.log('clicked wow')}
        },
        {
            label: 'great',
            click: () => {console.log('clicked great')}
        }
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip("insane app")
})

