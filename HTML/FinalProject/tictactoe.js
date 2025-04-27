let board = Array(9).fill(null); //board size with empty cells
let currentPlayer = 'X'; 
let gameMode = 'player'; // Switch for AI or player vs player
let gameActive = true; //Game check if active
let botThinking = false; //stops player moves during bot's turn

// Function to start the game with selected mode
function startGame(mode) {
    gameMode = mode;
    document.getElementById('popup').style.display = 'none'; // Close the popup
    resetGame();
}
// Function for resetting the game
function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = `${currentPlayer}'s turn`;
    renderBoard();
}
// Rendering voard DO NOT TOUCH
function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell) cellElement.classList.add('taken');
        cellElement.textContent = cell || '';
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}
// eventlistener for click events
function handleCellClick(index) {
    if (!gameActive || board[index] || botThinking) return; // Prevent moves during bot's turn

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner(currentPlayer)) {
        document.getElementById('status').textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('status').textContent = 'It\'s a draw';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'bot' && currentPlayer === 'O') {
        botThinking = true; // Set botThinking to true
        setTimeout(() => {
            botMove();
            botThinking = false; // Reset botThinking after bot's move
        }, Math.floor(Math.random() * 750) + 500); // random delay between .5 sec to 1 sec
    }
}
//move of AI
function botMove() {
    let bestMove;
    if (Math.random() < 0.01) {
        // For random (1%) chance of mistake (Game balancing making the AI beatable but with extremely low chance)
        const availableMoves = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
        bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
        bestMove = getBestMove();
    }

    board[bestMove] = 'O';
    renderBoard();

    if (checkWinner('O')) {
        document.getElementById('status').textContent = 'O wins!';
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('status').textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
}
// fucntion for findingg best move
function getBestMove() {
    let bestScore = -Infinity;
    let move = null;

    board.forEach((cell, index) => {
        if (!cell) {
            board[index] = 'O';
            const score = minimax(board, 0, false);
            board[index] = null;
            if (score > bestScore) {
                bestScore = score;
                move = index;
            }
        }
    });

    return move;
}
//AI algorithm MINIMAX for Extreme difficulties (Need pa aralin dahil complex) source: youtube
function minimax(board, depth, isMaximizing) {
    if (checkWinner('O')) return 10 - depth;
    if (checkWinner('X')) return depth - 10;
    if (board.every(cell => cell)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        board.forEach((cell, index) => {
            if (!cell) {
                board[index] = 'O';
                const score = minimax(board, depth + 1, false);
                board[index] = null;
                bestScore = Math.max(score, bestScore);
            }
        });
        return bestScore;
    } else {
        let bestScore = Infinity;
        board.forEach((cell, index) => {
            if (!cell) {
                board[index] = 'X';
                const score = minimax(board, depth + 1, true);
                board[index] = null;
                bestScore = Math.min(score, bestScore);
            }
        });
        return bestScore;
    }
}
//winning combinations
function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    );
}

// For swapping game modes
function changeMode() {
    document.getElementById('popup').style.display = 'flex'; // Show the popup again
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('popup').style.display = 'flex'; // Show the popup on load
    renderBoard();
});