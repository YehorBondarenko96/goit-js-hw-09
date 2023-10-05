import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');

start.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0] > new Date()) {
            start.disabled = false;
        } else if (selectedDates[0] < new Date()) {
            window.alert("Please choose a date in the future");
        } else { start.disabled = true };
    },
};

flatpickr(input, options);
