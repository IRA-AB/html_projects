function botMove() {
    const bestMove = getBestMove();
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