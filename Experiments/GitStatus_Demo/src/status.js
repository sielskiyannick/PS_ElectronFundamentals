const fs = require('fs')
const exec = require('child_process').exec
const os = require('os')





function isDir() {
    try {
        return fs.lstatSync(dir).isDirectory()
    }
    catch (e) {
        return false
    }
}
function checkGitStatus(dir) {
    exec('git status', {
        cwd: dir
    }, (err, stdout, stderr) => {
        console.log('err', err)
        console.log('stdout', stdout)
        console.log('stderr', stderr)
    })
}
function formatDir(dir){
    console.log(dir)
    return /^~/.test(dir)
    ? os.homedir() + dir.substr(1).trim() 
    : dir.trim()
}




let timer

document.getElementById('inputDirectory').addEventListener('keyup', evt => {
    clearTimeout(timer)
    timer = setTimeout( () => {
        console.log('typing more, logging less: ', evt.target.value)
        const dir = formatDir(evt.target.value)
        console.log(`${dir} isDir ? :`, isDir(dir))
        if (isDir(dir))
            checkGitStatus(dir) 
    }, 500)
})

