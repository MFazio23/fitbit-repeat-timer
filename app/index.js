import * as document from "document";
import {FitFont} from 'fitfont';
import {vibration} from "haptics";
import {longPress} from './long-press';
import {doubleTap} from "./double-tap";

const timeBetween = 5;
const timerTime = 30;

let isTimerActive = false;
let isBetweenTimers = false;

let timer = null;
let roundCount = 1;
let timeLeft = timerTime;

const playButton = document.getElementById("play-button");
const roundText = document.getElementById("round-text");
const timerTextSVG = document.getElementById("timer-text-svg");

const timerText = new FitFont({
    id: 'timer-text',
    font: 'JetBrains_Mono_60',
    halign: 'middle',
    valign: 'top',
    letterspacing: 0
});

const setTimer = (time) => {
    time = parseInt(time);
    timeLeft = time;
    setTimerText(time)
}

const resetTimer = () => setTimer(timerTime)

const nextRound = () => {
    roundCount++
    setRoundText(roundCount);
}

const setRoundText = (round) => {
    roundText.text = `Round ${round}`;
}

const setTimerText = (secondsLeft) => {
    try {
        const absSecondsLeft = Math.abs(secondsLeft);
        const minutesNum = parseInt(absSecondsLeft / 60);
        const secondsNum = parseInt(absSecondsLeft - (minutesNum * 60));

        const minutes = minutesNum < 10 ? `0${minutesNum}` : minutesNum;
        const seconds = secondsNum < 10 ? `0${secondsNum}` : secondsNum;

        timerText.text = `${(secondsLeft < 0 ? "-0" : minutes)}:${seconds}`;
    } catch (e) {
        console.log("Error in setTimerText: ", e)
    }
}

playButton.addEventListener('click', () => {
    isTimerActive = !isTimerActive;

    playButton.href = isTimerActive ? "pause-button.png" : "play-button.png"

    if (isTimerActive && isBetweenTimers) startBetweenTimer();
    else if (isTimerActive) startNormalTimer();
    else clearInterval(timer);

    vibration.start('confirmation');
});

const startNormalTimer = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        try {
            timeLeft--;
            setTimerText(timeLeft);
            if (timeLeft <= 0) {
                if (timer) clearInterval(timer);
                vibration.start('nudge-max');
                setTimer(-timeBetween);
                isBetweenTimers = true;
                startBetweenTimer();
            }
        } catch (e) {
            console.log("Error in startNormalTimer interval: ", e)
        }
    }, 1000);
}

const startBetweenTimer = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft++;
        setTimerText(timeLeft);
        if (timeLeft >= 0) {
            if (timer) clearInterval(timer);
            vibration.start('confirmation-max');
            setTimer(timerTime);
            nextRound();
            isBetweenTimers = false;
            startNormalTimer();
        }
    }, 1000);
}

longPress(roundText, () => {
    setRoundText(1);
    roundCount = 1;
    vibration.start('nudge');
}, true);

doubleTap(roundText, () => {
    roundCount++;
    setRoundText(roundCount);
    vibration.start('nudge');
})

longPress(timerTextSVG, () => {
    resetTimer();
    vibration.start('nudge');
});

setTimerText(timerTime);