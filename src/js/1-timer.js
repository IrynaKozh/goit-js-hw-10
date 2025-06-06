
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const myInput = document.querySelector("#datetime-picker");
const btn = document.querySelector(".btn");
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
  },
  onChange(selectedDates) {
    if (!selectedDates.length) return;
    userSelectedDate = selectedDates[0];
    const today = new Date();
    if (userSelectedDate < today) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      btn.classList.remove('is-active');
    } else {
      btn.classList.add('is-active');
    }
  },
};
const fp = flatpickr(myInput, options);

btn.addEventListener("click", handleClick);
function handleClick() {
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
 

}

  