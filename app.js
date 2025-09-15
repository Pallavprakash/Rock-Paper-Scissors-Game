let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll('.choice');
const msg = document.getElementById('msg');
const userScorePara = document.getElementById('user-score');
const compScorePara = document.getElementById('comp-score');
const userChoiceDisplay = document.getElementById('user-choice');
const compChoiceDisplay = document.getElementById('comp-choice');
const resetBtn = document.getElementById('reset-btn');

const drawGame = () => {
  msg.innerText = "It's a Draw! Play Again!";
  msg.style.backgroundColor = '#081b31';
  animateMsg();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = 'green';
    userScore++;
    userScorePara.innerText = userScore;
  } else {
    msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = 'red';
    compScore++;
    compScorePara.innerText = compScore;
  }
  animateMsg();
};

const animateMsg = () => {
  msg.classList.add('animate');
  setTimeout(() => msg.classList.remove('animate'), 300);
};

const genCompChoice = () => {
  const compChoices = ['Rock', 'Paper', 'Scissors'];
  const randomNum = Math.floor(Math.random() * 3);
  return compChoices[randomNum];
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  userChoiceDisplay.innerText = userChoice;
  compChoiceDisplay.innerText = compChoice;

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === 'Rock') {
      userWin = compChoice !== 'Paper';
    } else if (userChoice === 'Paper') {
      userWin = compChoice !== 'Scissors';
    } else {
      userWin = compChoice !== 'Rock';
    }
    showWinner(userWin, userChoice, compChoice);
  }

  if (userScore === 5 || compScore === 5) {
    msg.innerText = userScore === 5 ? "🎉 You are the Champion!" : "💻 Computer Wins the Game!";
    msg.style.backgroundColor = '#ff9900';
    disableChoices();
  }
};

const disableChoices = () => {
  choices.forEach(choice => choice.style.pointerEvents = "none");
};

const enableChoices = () => {
  choices.forEach(choice => choice.style.pointerEvents = "auto");
};

resetBtn.addEventListener('click', () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Make your move!";
  msg.style.backgroundColor = "#081b31";
  userChoiceDisplay.innerText = "-";
  compChoiceDisplay.innerText = "-";
  enableChoices();
});

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const userChoice = choice.getAttribute('id');
    playGame(userChoice);
  });
});
