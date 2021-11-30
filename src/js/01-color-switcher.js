
// объявление переменных
const startColorChange = document.querySelector('[data-start]');
const stopColorChange = document.querySelector('[data-stop]');
let timer = null;

// создание функции смены цветв
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// функция Страт смены цвета
startColorChange.addEventListener('click', () => {
    timer = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        startColorChange.setAttribute('disabled', true);

    }, 1000)
})

// функция Остановить смену цвета 
stopColorChange.addEventListener('click', () => {
    clearInterval(timer);
    startColorChange.disabled = false;
})