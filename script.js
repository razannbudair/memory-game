const gameBoard = document.getElementById('gameBoard');
const timerSpan = document.getElementById('timer');
const attemptsSpan = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');

const imageNames = [
  'bee',
  'chick',
  'crab',
  'elephant',
  'koala',
  'squirrel',
  'turtle',
  'whale',
];
let cards = [];
let flippedCards = [];
let lock = false;
let attempts = 0;
let seconds = 0;
let timerInterval;

function startGame() {
  gameBoard.innerHTML = '';
  cards = [];
  flippedCards = [];
  lock = false;
  attempts = 0;
  seconds = 0;
  timerSpan.textContent = '0';
  attemptsSpan.textContent = '0';

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    seconds++;
    timerSpan.textContent = seconds;
  }, 1000);

  imageNames.forEach((name) => {
    cards.push(name, name);
  });

  cards.sort(() => 0.5 - Math.random());

  cards.forEach((name) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-img', name);

    const front = document.createElement('div');
    front.classList.add('front');
    const img = document.createElement('img');
    img.src = `imgs/${name}.png`;
    front.appendChild(img);

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = '?';

    card.appendChild(front);
    card.appendChild(back);
    gameBoard.appendChild(card);
  });
}

function handleCardClick(e) {
  const clicked = e.target.closest('.card');
  if (!clicked || clicked.classList.contains('flipped') || lock) return;

  clicked.classList.add('flipped');
  flippedCards.push(clicked);

  if (flippedCards.length === 2) {
    lock = true;
    attempts++;
    attemptsSpan.textContent = attempts;

    const [first, second] = flippedCards;
    const val1 = first.getAttribute('data-img');
    const val2 = second.getAttribute('data-img');

    if (val1 === val2) {
      flippedCards = [];
      lock = false;

      if (document.querySelectorAll('.card:not(.flipped)').length === 0) {
        clearInterval(timerInterval);
        setTimeout(() => {
          alert(
            `🎉 Great! You completed the game in ${seconds} seconds and ${attempts} attempts.`
          );
        }, 500);
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
        lock = false;
      }, 1000);
    }
  }
}

startGame();
restartBtn.addEventListener('click', startGame);
gameBoard.addEventListener('click', handleCardClick);
