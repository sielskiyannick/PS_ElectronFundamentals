const electron = require("electron")
const path = require("path")

const { app, Menu, Tray, clipboard, globalShortcut } = electron

const MAX_STACK_SIZE = 5
const MAX_TEXT_LENGTH = 20


function addToStack(item, stack) {
    return [item].concat(stack.length >= MAX_STACK_SIZE ? stack.slice(0, stack.length - 1) : stack )
}
function checkClipboardForChange(clipboard, onChange) {
    let cache = clipboard.readText()
    let latest
    setInterval( () => {
        latest = clipboard.readText()
        if (latest !== cache) {
            cache = latest
            onChange(cache)
        }
    }, 1000 )
}
function formatMenuTemplateForStack(stack, clipboard) {
    return stack.map( (item, i) => {
        return {
            label: `Copy ${formatStackItemText(item)}`,
            click: () => {
                clipboard.writeText(item)
            }
        }     
    })
}
function formatStackItemText(item) 
{
    console.log('formatting: ', item)

    if (item.length >= 20)
    {
        return item.substr(0, MAX_TEXT_LENGTH) + '...'
    }
    return item
}
function registerShortcuts(clipboard, stack, globalShortcut) {
    for (let i=0 ; i< MAX_STACK_SIZE ; ++i) {
        globalShortcut.register(`Cmd+Alt+${i + 1}`, () => {
            clipboard.writeText(stack[i])
            console.log('text to clipboard from sholrtcut: ', stack[i])
        })
    }
}


app.on("ready", () => {
    let stack = []

    const tray = new Tray(path.join('src', 'Resources', 'trayIcon.png'))
    tray.setContextMenu(Menu.buildFromTemplate([
        { label: '<empty>', enabled: false }
    ]))

    checkClipboardForChange(clipboard, text => {
        stack = addToStack(text, stack)    
        tray.setContextMenu(Menu.buildFromTemplate(formatMenuTemplateForStack(stack, clipboard))) 
        registerShortcuts(clipboard, stack, globalShortcut)
    })
})


