
const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");
const resultText = document.getElementById("result");

const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

const playerXCard = document.getElementById("playerX");
const playerOCard = document.getElementById("playerO");

const newGameBtn = document.getElementById("newGame");
const resetScoreBtn = document.getElementById("resetScore");

// Game variables
let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let gameActive = true;

let scoreX = 0;
let scoreO = 0;

// All possible winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell clicks
cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        const index = Number(cell.dataset.index);

        // Prevent invalid moves
        if (!gameActive || board[index] !== "") {
            return;
        }

        // Update board
        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());

        cell.disabled = true;

        checkWinner();

    });

});

// Check winning combinations
function checkWinner() {

    let winningCombination = null;

    for (const combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            winningCombination = combination;
            break;
        }

    }

    // If a player wins
    if (winningCombination) {

        gameActive = false;

        winningCombination.forEach(index => {
            cells[index].classList.add("winner");
        });

        if (currentPlayer === "X") {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }

        statusText.textContent = `Player ${currentPlayer} wins!`;

        resultText.textContent = `Congratulations! ${currentPlayer} is the winner!`;

        return;
    }

    // Check draw
    if (!board.includes("")) {

        gameActive = false;

        statusText.textContent = "It's a draw!";

        resultText.textContent = "Well played! Nobody wins this round.";

        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    updateTurn();

}

// Update active player display
function updateTurn() {

    statusText.textContent = `Player ${currentPlayer}'s turn`;

    playerXCard.classList.toggle(
        "active",
        currentPlayer === "X"
    );

    playerOCard.classList.toggle(
        "active",
        currentPlayer === "O"
    );

}

// Start a new round
function newGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;

    cells.forEach(cell => {

        cell.textContent = "";

        cell.disabled = false;

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );

    });

    resultText.textContent = "";

    updateTurn();

}

// Reset scores and start again
function resetScores() {

    scoreX = 0;
    scoreO = 0;

    scoreXText.textContent = "0";
    scoreOText.textContent = "0";

    newGame();

}

// Button events
newGameBtn.addEventListener("click", newGame);

resetScoreBtn.addEventListener("click", resetScores);

// Initial game setup
updateTurn();
