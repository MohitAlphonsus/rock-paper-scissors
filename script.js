'use strict';
// UI ELEMENTS
const gameHeader = document.getElementById('game-header');

const computerScoreEl = document.getElementById('computer--score');
const playerScoreEl = document.getElementById('player--score');

const playerChoiceDisplay = document.getElementById('player-choice-display');
const choiceResultDisplay = document.getElementById('choice-result-display');
const gameWinDisplay = document.getElementById('game-win-display');
const choicesContainer = document.getElementById('choices');
const rulesWindow = document.getElementById('rules-window');
const btnRulesOpen = document.getElementById('btn--rules-open');
const btnRulesClose = document.getElementById('btn--rules-close');
const btnNext = document.getElementById('btn--next');

let scores = JSON.parse(localStorage.getItem('scores')) || {
	playerScore: 0,
	computerScore: 0,
};
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const PLAYER = 'PLAYER';
const COMPUTER = 'COMPUTER';

computerScoreEl.textContent = scores.computerScore;
playerScoreEl.textContent = scores.playerScore;

// UI FUNCTIONS
const handleOpenRules = () => (rulesWindow.style.display = 'block');
const handleCloseRules = () => (rulesWindow.style.display = 'none');
const handleDisplayWinningPage = () => {
	gameHeader.style.display = 'none';
	playerChoiceDisplay.style.display = 'none';
	choiceResultDisplay.style.display = 'none';
	gameWinDisplay.style.display = 'flex';
	btnNext.style.display = 'none';
};

// HELPER FUNCTION
const randomNumberGenerator = () => Math.floor(Math.random() * 3);

// GAME LOGIC

function handleUpdateUI(
	playerChoice,
	computerChoice,
	messageToDisplay,
	whoWon,
) {
	computerScoreEl.textContent = scores.computerScore;
	playerScoreEl.textContent = scores.playerScore;
	console.log(playerChoice, computerChoice, whoWon);

	const htmlForchoiceResultDisplay = `
    <div class="player ${whoWon === PLAYER ? 'winner-ring' : ''} ">
				<div class="choice choice--${playerChoice} ${
		whoWon === PLAYER ? 'result-winner' : ''
	} ">
						<img src="/assets/${playerChoice}.png" />
				</div>
		</div>
		<div class="result-message">
				<div class="message">
						<span>${messageToDisplay}</span>
						<span>${playerChoice === computerChoice ? '' : 'Against PC'}</span>
				</div>
				<button class="btn--play-again">Play again</button>
		</div>
    <div class="computer ${whoWon === COMPUTER ? 'winner-ring' : ''}">
				<div class="choice choice--${computerChoice} ${
		whoWon === COMPUTER ? 'result-winner' : ''
	}">
						<img src="/assets/${computerChoice}.png" />
				</div>
		</div>
  `;

	document.getElementById('result').innerHTML = htmlForchoiceResultDisplay;
}

function handleWinning(playerChoice, computerChoice) {
	let messageToDisplay;
	let whoWon;

	if (playerChoice === computerChoice) {
		messageToDisplay = 'Tie Up';
	}
	if (playerChoice !== computerChoice) {
		if (
			(playerChoice === ROCK && computerChoice === SCISSORS) ||
			(playerChoice === PAPER && computerChoice === ROCK) ||
			(playerChoice === SCISSORS && computerChoice === PAPER)
		) {
			messageToDisplay = 'You Win';
			scores.playerScore++;
			whoWon = PLAYER;
			btnNext.style.display = 'block';
		} else {
			messageToDisplay = 'You Lost';
			scores.computerScore++;
			whoWon = COMPUTER;
		}
	}
	localStorage.setItem('scores', JSON.stringify(scores));
	handleUpdateUI(playerChoice, computerChoice, messageToDisplay, whoWon);
}

function handlePlayerChoice(e) {
	if (!e.target.dataset.choice) return;
	playerChoiceDisplay.style.display = 'none';
	choiceResultDisplay.style.display = 'flex';

	const playerChoice = e.target.dataset.choice;
	const computerChoice = [ROCK, PAPER, SCISSORS][randomNumberGenerator()];

	handleWinning(playerChoice, computerChoice);
}

// EVENT LISTENERS
choicesContainer.addEventListener('click', handlePlayerChoice);
btnRulesOpen.addEventListener('click', handleOpenRules);
btnRulesClose.addEventListener('click', handleCloseRules);
btnNext.addEventListener('click', handleDisplayWinningPage);

//  play-again

document.getElementById('game-body').addEventListener('click', e => {
	if (e.target.classList.contains('btn--play-again')) {
		gameHeader.style.display = 'flex';
		playerChoiceDisplay.style.display = 'flex';
		choiceResultDisplay.style.display = 'none';
		gameWinDisplay.style.display = 'none';
		btnNext.style.display = 'none';
	} else return;
});
