const images = [
    'Mem_images/Css.png',
    'Mem_images/Html.png',
    'Mem_images/Javascript.png',
    'Mem_images/Java.png',
    'Mem_images/Python.png',
    'Mem_images/Swift.png'
];

const gameContainer = document.querySelector('.memory-game');
let cards = [...images, ...images]; // Duplicate images for pairs

let flipCount = 0;
let timerInterval;
let startTime;

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function updateFlipCount() {
    flipCount++;
    document.getElementById('flip-count').textContent = flipCount;
}

function initializeGame() {
    gameContainer.innerHTML = '';
    flipCount = 0;
    document.getElementById('flip-count').textContent = '0';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    clearInterval(timerInterval);
    
    cards.sort(() => 0.5 - Math.random()); // Shuffle cards

    cards.forEach(src => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.innerHTML = `
            <img src="${src}" alt="Memory Card" class="front-face">
            <img src="Mem_images/bg.png" alt="Card Back" class="back-face">
        `;
        gameContainer.appendChild(card);
    });

    document.querySelectorAll('.memory-card').forEach(card => card.addEventListener('click', flipCard));
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flip')) return;
    
    if (flipCount === 0) {
        startTimer();
    }
    
    updateFlipCount();
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true; // Lock the board to prevent further flips
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.front-face').src === secondCard.querySelector('.front-face').src;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched'); // Add matched class
    secondCard.classList.add('matched'); // Add matched class
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    clearInterval(timerInterval);
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    initializeGame();
}

// Initialize the game on page load
initializeGame();
