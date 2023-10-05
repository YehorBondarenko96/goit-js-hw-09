    const body = document.querySelector('body');
    const start = document.querySelector('button[data-start]');
    const stop = document.querySelector('button[data-stop]');
    let repeater;
    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
    };

start.addEventListener('click', () => {
    start.disabled = true;
    stop.disabled = false;
    repeater = setInterval(() => { body.style.backgroundColor = getRandomHexColor() }, 1000)
});

stop.addEventListener('click', () => {
    start.disabled = false;
    stop.disabled = true;
    clearInterval(repeater) 
});