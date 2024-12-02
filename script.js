const circleContainer = document.getElementById("circleContainer");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("next");

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 2;

function generateCircles() {
  circleContainer.innerHTML = "";
  const correctIndex = Math.floor(Math.random() * 3);
  const numbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 100) + 1);
  numbers[correctIndex] = randomNumber;

  numbers.forEach((num, index) => {
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.classList.add("animate__animated")
    circle.classList.add("animate__tada")
    circle.textContent = num;
    circle.addEventListener("click", () => checkGuess(num, index === correctIndex, circle));
    circleContainer.appendChild(circle);
  });
}

function checkGuess(guess, isCorrect, circle) {
  if (isCorrect) {
    messageEl.textContent = `🎉 Correct! The number was ${randomNumber}. Let us pillage further!`;
    messageEl.style.color = "#00ff00";
    disableCircles();
    restartBtn.classList.remove("hidden");
  } else {
    attempts--;
    if (attempts > 0) {
        circle.classList.remove("animate__animated")
        circle.classList.remove("animate__tada")
        circle.classList.add("animate__animated")
        circle.classList.add("animate__shakeX")
      messageEl.textContent = `❌ Wrong! You have ${attempts} attempt(s) left. Careful, matey!`;
      messageEl.style.color = "#ff4444";
    } else {
      messageEl.textContent = `💔 Game over! The correct number was ${randomNumber}. Hope ya like the taste of sea salt!`;
      messageEl.style.color = "#ff4444";
      disableCircles();
      restartBtn.classList.remove("hidden");
    }
  }
}

function disableCircles() {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => (circle.style.pointerEvents = "none"));
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 2;
  messageEl.textContent = "";
  messageEl.style.color = "#fff";
  restartBtn.classList.add("hidden");
  generateCircles();
}

function nextgame() {
  location.href = "/second.html"
}

generateCircles();
restartBtn.addEventListener("click", restartGame);
