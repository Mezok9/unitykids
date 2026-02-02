const startButton = document.querySelector("#start-game");
const gameField = document.querySelector("#game-field");
const scoreLabel = document.querySelector("#score");
const timerLabel = document.querySelector("#timer");

if (startButton && gameField && scoreLabel && timerLabel) {
  let score = 0;
  let timeLeft = 20;
  let timerId;
  let spawnId;

  const updateScore = () => {
    scoreLabel.textContent = String(score);
  };

  const updateTimer = () => {
    timerLabel.textContent = `${timeLeft}s`;
  };

  const clearGame = () => {
    gameField.innerHTML = "";
  };

  const spawnHeart = () => {
    const heart = document.createElement("button");
    heart.className = "game__heart";
    heart.setAttribute("aria-label", "Catch a heart");
    heart.style.left = `${Math.random() * 80 + 5}%`;
    heart.style.top = `${Math.random() * 60 + 10}%`;
    heart.addEventListener("click", () => {
      score += 1;
      updateScore();
      heart.remove();
    });
    gameField.appendChild(heart);

    setTimeout(() => {
      if (heart.isConnected) {
        heart.remove();
      }
    }, 1800);
  };

  const endGame = () => {
    clearInterval(timerId);
    clearInterval(spawnId);
    startButton.disabled = false;
    startButton.textContent = "Play again";
    gameField.insertAdjacentHTML(
      "beforeend",
      `<div class="game__result">Great job! You sent ${score} hearts.</div>`
    );
  };

  startButton.addEventListener("click", () => {
    score = 0;
    timeLeft = 20;
    updateScore();
    updateTimer();
    clearGame();
    startButton.disabled = true;
    startButton.textContent = "Playing...";

    spawnHeart();
    spawnId = setInterval(spawnHeart, 700);

    timerId = setInterval(() => {
      timeLeft -= 1;
      updateTimer();
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  });
}
