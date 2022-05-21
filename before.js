const valid_file_re = /^[^<>:"\/\\|?*]+[^<>:"\/\\|?*\s]$/

window.addEventListener("drop", (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    let dt = evt.dataTransfer
    let files = dt.files

    if (files.length > 35) return

    let filesSent = 0
    let progress = document.querySelector(".upload-overlay .progress")
    for (var i = 0; i < files.length; i++) {
        var name = files[i].name
        if (name.startsWith(".")) name = name.substring(1)
        var oReq = new XMLHttpRequest()
        oReq.open("PUT", window.location + files[i].name, true)
        oReq.onload = () => { 
            filesSent++
            progress.style.width = (filesSent/files.length)*100
        }
        oReq.send(files[i])
    }
    
    setInterval(() => {
        if (filesSent < files.length) return
        window.history.go(0)
    }, 500)
})

window.addEventListener('dragenter', (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    document.querySelector(".upload-overlay").style.display = 'flex'
    setTimeout(() => {
        document.querySelector(".upload-overlay").style.opacity = 0.7
    }, 100)
    
})

window.addEventListener('dragleave', (evt) => {
    evt.preventDefault()
    evt.stopPropagation()

    if (evt.fromElement) return
    document.querySelector(".upload-overlay").style.opacity = 0
    setTimeout(() => {
        document.querySelector(".upload-overlay").style.display = 'none'
    }, 510)
})


window.addEventListener('dragover', (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
})

var ctxTarget = null

function deleteItem() {
    if (ctxTarget == null) return
    if (!confirm(`Do you want to delete ${ctxTarget.innerText}?`)) return
    var oReq = new XMLHttpRequest()
    oReq.open("DELETE", ctxTarget.href, true)
    oReq.onload = () => {
        window.history.go(0)
    }
    oReq.send(null)
}

window.addEventListener('load', (evt) => {
    let ctxMenu = document.querySelector(".context-menu")

    document.querySelectorAll('pre > a').forEach((a) => {
        if (a.innerText == '../') return
        a.addEventListener("contextmenu", (evt) => {
            if (evt.shiftKey || evt.ctrlKey) return
            evt.preventDefault()
            evt.stopPropagation()
            let rect = evt.target.getClientRects()[0]
            ctxTarget = evt.target
            ctxMenu.style.top = `${rect.y+3}px`
            ctxMenu.style.left = `${rect.x+rect.width+3}px`
            ctxMenu.style.display = 'flex'
            setTimeout(() => {
                ctxMenu.style.opacity = 1
            }, 100)
        })
    })

    window.addEventListener("mousedown", (evt) => {
        ctxMenu.style.opacity = 0
        setTimeout(() => {
            if (ctxMenu.style.opacity==1) return
            ctxMenu.style.display = 'none'
        }, 510)
    })

    var form = document.createElement('form')
    form.autocomplete = false; form.className = "new-folder"
    var input = document.createElement("input")
    input.type = 'text'; input.value = "new-folder"; input.spellcheck = false
    input.onkeyup = (evt) => {
        if (input.value.match(valid_file_re)) {
            input.className = ""
        } else {
            input.className = "invalid"
        }
    }
    input.onclick = (evt) => {
        input.setSelectionRange(0, input.value.length)
    }
    form.onsubmit = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        if (!input.value.match(valid_file_re))
            return
        var oReq = new XMLHttpRequest()
        oReq.open("MKCOL", `${window.location}${input.value}/`), true
        oReq.onload = () => {
            window.history.go(0)
        }
        oReq.send(null)
    }
    form.appendChild(input)
    document.querySelector("body > pre").appendChild(form)
})