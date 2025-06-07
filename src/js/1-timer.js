import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const myInput = document.querySelector("#datetime-picker");
const btn = document.querySelector("[data-start]");
btn.disabled = true;
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let userSelectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  }
};


flatpickr(myInput, options);



btn.addEventListener("click", () => {
  btn.disabled = true;
  myInput.disabled = true;
  timerId = setInterval(() => {
    const now = new Date();
    const ms = userSelectedDate - now;

    if (ms <= 0) {
      clearInterval(timerId);
      updateTimer(0);
      myInput.disabled = false;
      return;
    }

    updateTimer(ms);
  }, 1000);
});

function updateTimer(ms) {
  const { days: d, hours: h, minutes: m, seconds: s } = convertMs(ms);
  days.textContent = addLeadingZero(d);
  hours.textContent = addLeadingZero(h);
  minutes.textContent = addLeadingZero(m);
  seconds.textContent = addLeadingZero(s);
}

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
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}