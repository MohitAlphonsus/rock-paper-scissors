'use strict';
// UI ELEMENTS
const gameHeader = document.getElementById('game-header');
const playerChoiceDisplay = document.getElementById('player-choice-display');
const choiceResultDisplay = document.getElementById('choice-result-display');
const gameWinDisplay = document.getElementById('game-win-display');

const choicesContainer = document.getElementById('choices');

const rulesWindow = document.getElementById('rules-window');

const btnRulesOpen = document.getElementById('btn--rules-open');
const btnRulesClose = document.getElementById('btn--rules-close');

const btnNext = document.getElementById('btn--next');

let scores = { playerScore: 0, computerScore: 0 };

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
function handlePlayerChoice(e) {
	if (!e.target.dataset.choice) return;
	playerChoiceDisplay.style.display = 'none';
	choiceResultDisplay.style.display = 'flex';
	console.log(e.target.dataset.choice);
}

// EVENT LISTENERS
choicesContainer.addEventListener('click', handlePlayerChoice);
btnRulesOpen.addEventListener('click', handleOpenRules);
btnRulesClose.addEventListener('click', handleCloseRules);
btnNext.addEventListener('click', handleDisplayWinningPage);
