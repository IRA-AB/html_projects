let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameMode = 'player'; // 'player' or 'bot'
let gameActive = true;

function startGame(mode) {
    gameMode = mode;
    document.getElementById('popup').style.display = 'none'; // Close the popup
    resetGame();
}

function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = `${currentPlayer}'s turn`;
    renderBoard();
}

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

function handleCellClick(index) {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner(currentPlayer)) {
        document.getElementById('status').textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        document.getElementById('status').textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'bot' && currentPlayer === 'O') {
        botMove();
    }
}

function botMove() {
    let bestMove;
    if (Math.random() < 0.01) {
        // 1% chance of making a mistake
        const availableMoves = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
        bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
        // Optimal move using Minimax
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

function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    );
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('popup').style.display = 'flex'; // Show the popup on load
    renderBoard();
});