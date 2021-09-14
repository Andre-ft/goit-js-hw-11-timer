import css from './styles.css';
import CountdownTimer from './js/countdown-timer.js'

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2022'),
});