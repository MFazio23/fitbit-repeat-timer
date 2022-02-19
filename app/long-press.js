const longPressTimeout = 1000

let timer = null

const longPress = (element, action, timeout) => {
    timeout = timeout || longPressTimeout
    element.addEventListener('mousedown', (e) => {
        timer = setTimeout(action, timeout);
    })

    element.addEventListener('mouseup', (e) => {
        clearTimeout(timer);
    })
}

export {
    longPress
}