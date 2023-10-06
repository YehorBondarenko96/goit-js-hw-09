import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const ValueDays = document.querySelector('span[data-days]');
const ValueHours = document.querySelector('span[data-hours]');
const ValueMinutes = document.querySelector('span[data-minutes]');
const ValueSeconds = document.querySelector('span[data-seconds]');

let selectedDate = 0;

start.disabled = true;
const options = {
    enableTime: true,
    enableSeconds: false,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        console.log(selectedDate);
        if (selectedDate > new Date()) {
            start.disabled = false;
        } else if (selectedDate < new Date()) {
            start.disabled = true;
            Notiflix.Notify.failure("Please choose a date in the future");
        } 
    },
};

flatpickr(input, options);



function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function value(date) {
    const remainderMs = date - new Date()
    if (remainderMs > 0) {
        const convert = convertMs(remainderMs);
        days = convert.days;
        hours = convert.hours;
        minutes = convert.minutes;
        seconds = convert.seconds;
    } else {
        days = hours = minutes = seconds = 0;
    };
    
    ValueDays.textContent = String(days).padStart(2, "0");
    ValueHours.textContent = String(hours).padStart(2, "0");
    ValueMinutes.textContent = String(minutes).padStart(2, "0");
    ValueSeconds.textContent = String(seconds).padStart(2, "0");
};

start.addEventListener('click', () => {

idInterval = setInterval(() => {value(selectedDate)}, 1000);
});



