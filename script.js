let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateCell(index);
        checkWinner();
        togglePlayer();
    }
}

function updateCell(index) {
    const cell = document.getElementsByClassName('cell')[index];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            displayWinner(gameBoard[a]);
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        displayDraw();
        gameActive = false;
    }
}

function displayWinner(winner) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = `${winner} wins!`;
    messageElement.style.color = 'green';

    setTimeout(() => {
        showPopup(`Player ${winner} wins!`);
    }, 500);
}

function displayDraw() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'It\'s a draw!';
    messageElement.style.color = 'orange';

    setTimeout(() => {
        showPopup('It\'s a draw!');
    }, 500);
}

function showPopup(message) {
    const popup = document.querySelector('.popup');
    const popupMessage = document.querySelector('.popup h2');
    popupMessage.textContent = message;
    popup.style.display = 'block';
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    }

    const messageElement = document.getElementById('message');
    messageElement.textContent = '';
    messageElement.style.color = '';

    const popup = document.querySelector('.popup');
    popup.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.onclick = resetGame;
    resetButton.style.position = 'fixed';
    resetButton.style.bottom = '20px';
    resetButton.style.left = '50%';
    resetButton.style.transform = 'translateX(-50%)';
    resetButton.style.padding = '10px';
    resetButton.style.backgroundColor = '#00BCD4';
    resetButton.style.color = '#005e74';
    resetButton.style.border = 'none';
    resetButton.style.cursor = 'pointer';
    resetButton.style.zIndex = '1';
    resetButton.style.borderRadius = '10px';
    document.body.appendChild(resetButton);
}); 