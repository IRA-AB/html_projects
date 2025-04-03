const redLight = document.getElementById('red');
const yellowLight = document.getElementById('yellow');
const greenLight = document.getElementById('green');

function turnofflights() {
    redLight.style.opacity = 0.3;
    yellowLight.style.opacity = 0.3;
    greenLight.style.opacity = 0.3;
}

function sequence() {
    turnofflights();
    redLight.style.opacity = 1;
    setTimeout(() => {
        turnofflights();
        yellowLight.style.opacity = 1;
        setTimeout(() => {
            turnofflights();
            greenLight.style.opacity = 1;
        }, 9000); 
    }, 9000); 
}

sequence();
setInterval(sequence, 27000);
