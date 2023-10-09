const longPressTimeout = 750

let timer = null

const longPress = (element, action, bold, timeout) => {
    timeout = timeout || longPressTimeout
    element.addEventListener('mousedown', (e) => {
        if (bold) element.style.fontWeight = 'bold';
        timer = setTimeout(action, timeout);
    })

    element.addEventListener('mouseup', (e) => {
        if (bold) element.style.fontWeight = 'inherit';
        clearTimeout(timer);
    })
}

export {
    longPress
}