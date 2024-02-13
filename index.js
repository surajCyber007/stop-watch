let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;
let startTime = 0;

// Check if there are stored timer values in localStorage
if (localStorage.getItem('timerValues')) {
    const storedTimerValues = JSON.parse(localStorage.getItem('timerValues'));
    milliseconds = storedTimerValues.milliseconds;
    seconds = storedTimerValues.seconds;
    minutes = storedTimerValues.minutes;
    hours = storedTimerValues.hours;
    startTime = storedTimerValues.startTime;
    if (storedTimerValues.isRunning) {
        int = setInterval(updateAndDisplayTimer, 10);
    } else {
        displayTimer();
    }
}

document.getElementById('startTimer').addEventListener('click', () => {
    if (int !== null) {
        clearInterval(int);
    }
    startTime = Date.now() - (hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds);
    int = setInterval(updateAndDisplayTimer, 10);
});

document.getElementById('pauseTimer').addEventListener('click', () => {
    clearInterval(int);
    saveTimerValuesLocally(false);
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    displayTimer();
    localStorage.removeItem('timerValues');
});

function updateAndDisplayTimer() {
    let elapsed = Date.now() - startTime;
    hours = Math.floor(elapsed / 3600000);
    elapsed %= 3600000;
    minutes = Math.floor(elapsed / 60000);
    elapsed %= 60000;
    seconds = Math.floor(elapsed / 1000);
    elapsed %= 1000;
    milliseconds = elapsed;
    displayTimer();
    saveTimerValuesLocally(true);
}

function displayTimer() {
    let h = hours < 10 ? '0' + hours : hours;
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    let ms = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}

function saveTimerValuesLocally(isRunning) {
    const timerValues = {
        milliseconds,
        seconds,
        minutes,
        hours,
        startTime: startTime,
        isRunning: isRunning
    };
    localStorage.setItem('timerValues', JSON.stringify(timerValues));
}
