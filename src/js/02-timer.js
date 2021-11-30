// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
// all modules
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require ("flatpickr/dist/themes/confetti.css");
  

 const   startInput = document.querySelector('input#datetime-picker');
 const   startBtn = document.querySelector('button[data-start]');
 const   days = document.querySelector('span[data-days]');
 const   hours = document.querySelector('span[data-hours]');
 const   minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const body = document.querySelector('body');
const timer = document.querySelector('.timer')

body.style.backgroundColor = "olive";
timer.style.display = "flex";
timer.style.justifyContent = "space-between";
body.style.padding = "0 150px"



const currentDate = Date.now();
let timeLeft = null;
let timerId = null;
startBtn.disabled = true;
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    
      timeLeft= selectedDates[0]; 
      if (timeLeft > currentDate) {
        startBtn.disabled = false;
      
      } else {
       Notify.failure("Please choose a date in the future");
    }}
  };
const flatpickrEl  = new flatpickr(startInput, options);

startBtn.addEventListener('click',updateClockRun);

function updateClockRun() {
  
    timerId =  setInterval(() => {
    const currentDate = Date.now();
    const currentTime = timeLeft - currentDate;
    days.textContent = convertMs(currentTime).days;
    hours.textContent = convertMs(currentTime).hours;
    minutes.textContent = convertMs(currentTime).minutes;
    seconds.textContent = convertMs(currentTime).seconds;
    startBtn.disabled = true;
       flatpickrEl.input.setAttribute("disabled", "disabled")
       if (currentTime < 1000) {
     clearInterval(timerId);
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
  startInput.disabled = false;
    }  
     }, 1000);
}

function  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
  return { days, hours, minutes, seconds };
 
}
function pad(value) {
  return String(value).padStart(2, "0");
}
