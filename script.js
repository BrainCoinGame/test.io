// script.js
let brainCoins = 0;
let energy = 100;
let maxEnergy = 100;
let energyDecayRate = 0.1;
let energyIncreaseRate = 10;
let progress = 0;
let progressIncrement = 10;

const coin = document.getElementById('coin');
const coinPush = document.getElementById('coin-push');
const brainCoinsDisplay = document.getElementById('brain-coins');
const progressBar = document.getElementById('progress-bar');
const energyBar = document.getElementById('energy-bar');
const buyEnergyButton = document.getElementById('buy-energy');
const boostButton = document.getElementById('boost');

function updateProgressBar() {
    progressBar.style.width = progress + '%';
    if (progress >= 100) {
        progress = 0;
        alert('Congratulations! Level Up!');
    }
}

function updateEnergyBar() {
    energyBar.style.width = energy + '%';
    if (energy <= 0) {
        alert('Energy depleted. Please buy more energy.');
    }
}

function handleClick() {
    if (energy > 0) {
        coin.style.display = 'none';
        coinPush.style.display = 'block';
        setTimeout(() => {
            coin.style.display = 'block';
            coinPush.style.display = 'none';
        }, 200);

        brainCoins += 1;
        energy -= energyDecayRate;
        progress += progressIncrement;

        brainCoinsDisplay.textContent = `Coins: ${brainCoins}`;
        updateProgressBar();
        updateEnergyBar();
    }
}

function buyEnergy() {
    if (brainCoins >= 10) {
        brainCoins -= 10;
        energy = Math.min(energy + energyIncreaseRate, maxEnergy);
        brainCoinsDisplay.textContent = `Coins: ${brainCoins}`;
        updateEnergyBar();
    } else {
        alert('Not enough coins to buy energy.');
    }
}

coin.addEventListener('click', handleClick);
buyEnergyButton.addEventListener('click', buyEnergy);

// Energy decay simulation
setInterval(() => {
    if (energy > 0) {
        energy -= energyDecayRate;
        updateEnergyBar();
    }
}, 1000);
