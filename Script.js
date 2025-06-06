const timerEl = document.getElementById("timer");
const markList = document.getElementById("marks-list");
let intervalId = 0;
let timer = 0;
let marks = [];

// Formata o tempo para hh:mm:ss:cs
const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${hundredths.toString().padStart(2, "0")}`;
};

// Adiciona a marcação no HTML
const addMarkToList = (markIndex, markTime) => {
    markList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
};

// Marca o tempo atual
const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
};

// Liga/Desliga o cronômetro
const toggleTimer = () => {
    const button = document.getElementById("power");
    const action = button.getAttribute("action");

    clearInterval(intervalId);

    if (action === "start" || action === "continue") {
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);

        button.setAttribute("action", "pause");
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action === "pause") {
        button.setAttribute("action", "continue");
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
};

// Reseta o cronômetro e as marcações
const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    markList.innerHTML = "";
    const button = document.getElementById("power");
    button.setAttribute("action", "start");
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
};

// Atualiza o timer no display
const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
};

// Event Listeners
document.getElementById("power").addEventListener("click", toggleTimer);
document.getElementById("mark").addEventListener("click", markTime);
document.getElementById("reset").addEventListener("click", resetTimer);

