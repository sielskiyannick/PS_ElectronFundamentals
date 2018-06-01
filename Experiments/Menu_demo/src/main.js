const electron = require('electron')

const app = electron.app
const browserWindow = electron.BrowserWindow
const Menu = electron.Menu

app.on('ready', () => {    
    printAppLoggingInfo()     

     let window = new browserWindow({
            height: 500,
            width: 500
     })

     const name = app.getName()
     const submenuAboutName = `about ${name}`
     const template = [
         {
             label: name,
             submenu: [{
                 label: `about ${name}`,
                 click: () => {
                     console.log(`${submenuAboutName} clicked`)
                 }
             }, {
                 type: 'separator'
             }, {
                 label: 'Quit',
                 click: () => {
                    quitApplication()            
                 },
                 accelerator: 'CmdOrCtrl+B',
             }]
         }
    ]     
     const menu = Menu.buildFromTemplate(template)
     Menu.setApplicationMenu(menu )
})

const printAppLoggingInfo = () => {
    console.log('application info:')
    console.log(`electron version: ${process.versions.electron}`)
}

const quitApplication = () => {
    console.log('quit')
    app.quit()
}
