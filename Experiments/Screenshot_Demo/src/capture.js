const electron = require('electron')
const path = require('path')
const fs = require('fs')

const { ipcRenderer: ipc, desktopCapturer, screen } = electron



ipc.on('capture', onCapture)



function onCapture(evt, targetPath) {
    console.log('OnCapture')
    getMainSource(desktopCapturer, screen, source => {
        // const png = source.thumbnail.toPng()
        // const filePath = path.join(targetPath, new Date() + '.png')
        // writeScreenshot(png, filePath)
        console.log('tmp done')
    })
}
function getMainSource(desktopCapturer, screen, done) {
    console.log('getMainSource')
    const options = { types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize }
    desktopCapturer.getSources(options, (err, sources) => {
        if (err) return console.log('cannot capture screen!', err)
        console.log(source.name)
        const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1'
        // done(sources.filter(isMainSource)[0])
        done(sources[0])
    })
}
function writeScreenshot(png, filePath) {
    fs.writeFile(filePath, png, err => {
        if (err) return console.log('failed to write screenshot: ', err)
    })
}
