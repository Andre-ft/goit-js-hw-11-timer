export default class CountdownTimer{
    _refs;
    _targetDate;
    _intervalId
    constructor({selector, targetDate}) {
        this._targetDate = new Date(targetDate).getTime();
        this._refs = this.getRefs(selector);
        this.startTimer();
    }

    getRefs(selector) {
        let refs = {};
        const timerBlock = document.querySelector(selector);
        refs.daysField = timerBlock.querySelector('[data-value="days"]');
        refs.hoursField = timerBlock.querySelector('[data-value="hours"]')
        refs.minsField = timerBlock.querySelector('[data-value="mins"]')
        refs.secsField = timerBlock.querySelector('[data-value="secs"]')
        return refs;
    }

    startTimer() {
        this._intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this._targetDate - currentTime;
            if (deltaTime <= 0) {
                clearInterval(this._intervalId);
                return;
            }
            const timeComponents = this.getTimeComponents(deltaTime);
            this.updateTimerFace(timeComponents);
        }, 1000);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));    
        return { days, hours, mins, secs };
    }
    
    pad(value) {
        return String(value).padStart(2, 0);
    }

    updateTimerFace({ days, hours, mins, secs }) {
        this._refs.daysField.textContent = days;
        this._refs.hoursField.textContent = hours;
        this._refs.minsField.textContent = mins;
        this._refs.secsField.textContent = secs;
    }
}