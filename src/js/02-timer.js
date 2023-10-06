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
let days;
let hours;
let minutes;
let seconds;

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

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
};

function valueDate(date) {
    const remainderMs = date.getTime() - new Date().getTime();
    if (remainderMs > 0) {
        const convert = convertMs(remainderMs);
        days = convert.days;
        hours = convert.hours;
        minutes = convert.minutes;
        seconds = convert.seconds;
    } else {
        days = hours = minutes = seconds = 0;
    };
    
    ValueDays.textContent = addLeadingZero(days);
    ValueHours.textContent = addLeadingZero(hours);
    ValueMinutes.textContent = addLeadingZero(minutes);
    ValueSeconds.textContent = addLeadingZero(seconds);
};


start.addEventListener('click', () => {
idInterval = setInterval(() => {valueDate(selectedDate)}, 1000);
});



