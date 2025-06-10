// Retrieve score from localStorage, or use default if nothing is stored yet
const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  ties: 0,
  losses: 0,
};

// Update the score display when the page loads
updateScore();

/**
 * Updates the score displayed on the webpage
 */
function updateScore() {
  document.querySelector(".score").innerHTML = `
    Wins: ${score.wins}
    Ties: ${score.ties}
    Losses: ${score.losses}`;
}

/**
 * Picks a random move for the computer
 * @returns {"Rock" | "Paper" | "Scissors"} The computer's move
 */
function pickComputerMove() {
  let computerMove = "";
  const number = Math.random();

  if (number < 1 / 3) {
    computerMove = "Rock";
  } else if (number < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }

  return computerMove;
}

/**
 * Calculates and displays the result of a round
 * @param {"Rock" | "Paper" | "Scissors"} playerMove - The player's selected move
 */
function resultCalc(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  // Determine result based on player's move
  if (playerMove === "Rock") {
    result =
      computerMove === "Rock"
        ? "Tie"
        : computerMove === "Paper"
        ? "You Lose!"
        : "You Win!";
  } else if (playerMove === "Paper") {
    result =
      computerMove === "Rock"
        ? "You Win!"
        : computerMove === "Paper"
        ? "Tie"
        : "You Lose!";
  } else if (playerMove === "Scissors") {
    result =
      computerMove === "Rock"
        ? "You Lose!"
        : computerMove === "Paper"
        ? "You Win!"
        : "Tie";
  }

  // Update the score based on the result
  if (result === "You Win!") {
    score.wins += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  } else if (result === "You Lose!") {
    score.losses += 1;
  }

  // Save the score to localStorage
  localStorage.setItem("score", JSON.stringify(score));

  // Update result and move display
  updateScore();
  document.querySelector(".result").innerHTML = result;
  document.querySelector(".moves").innerHTML = `
    You picked: <img src="img/${playerMove}.png" class="move" />
    Computer picked: <img src="img/${computerMove}.png" class="move" />`;
}

// Event listeners for the move buttons
document.querySelector(".rock").addEventListener("click", () => {
  resultCalc("Rock");
});
document.querySelector(".paper").addEventListener("click", () => {
  resultCalc("Paper");
});
document.querySelector(".scissors").addEventListener("click", () => {
  resultCalc("Scissors");
});

// Event listener for the reset button to clear the score
document.querySelector(".reset-score").addEventListener("click", () => {
  score.wins = 0;
  score.ties = 0;
  score.losses = 0;
  localStorage.removeItem("score");
  updateScore();
});

// Keyboard shortcuts: Press R, P, or S to play a move
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    resultCalc("Rock");
  } else if (event.key === "p") {
    resultCalc("Paper");
  } else if (event.key === "s") {
    resultCalc("Scissors");
  } else {
    alert("This key isn't defined");
  }
});

// Automatically updates the copyright year
const year = document.getElementById("year");
const thisYear = new Date().getFullYear();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
