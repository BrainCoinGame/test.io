// script.js
let brainCoins = 0;
let energy = 100;
let maxEnergy = 100;
let energyDecayRate = 0.1;
let energyIncreaseRate = 10;
let progress = 0;
let progressIncrement = 10;

const coin = document.getElementById('coin');
const brainCoinsDisplay = document.getElementById('brain-coins');
const progressBar = document.getElementById('progress-bar');
const energyBar = document.getElementById('energy-bar');
const flyingValuesContainer = document.getElementById('flying-values');
const buyEnergyButton = document.getElementById('buy-energy');

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

function showFlyingValue(amount) {
    const value = document.createElement('div');
    value.textContent = `+${amount}`;
    value.className = 'flying-value';
    value.style.left = `${Math.random() * 60 - 30}px`;
    flyingValuesContainer.appendChild(value);
    
    setTimeout(() => {
        value.style.transform = 'translateY(-100px)';
        value.style.opacity = '0';
        setTimeout(() => flyingValuesContainer.removeChild(value), 1000);
    }, 100);
}

function handleClick() {
    if (energy > 0) {
        brainCoins += 1;
        energy -= energyDecayRate;
        progress += progressIncrement;
        
        brainCoinsDisplay.textContent = `Coins: ${brainCoins}`;
        updateProgressBar();
        updateEnergyBar();
        showFlyingValue(1);
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
