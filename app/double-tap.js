const doubleTapTimeout = 300;
const cooldown = 500;

let timer = null
let cooldownTimer = null

const doubleTap = (element, action, timeout) => {
    timeout = timeout || doubleTapTimeout;

    element.addEventListener('mousedown', (e) => {
        if (cooldownTimer == null) {
            if (timer != null) {
                action();
                cooldownTimer = setTimeout(() => {
                    clearTimeout(cooldownTimer);
                    cooldownTimer = null;
                }, cooldown)
            } else {
                timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                }, timeout);
            }
        }
    })
}

export {
    doubleTap
}