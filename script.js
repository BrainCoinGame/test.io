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
const authSection = document.getElementById('auth-section');
const gameInfo = document.getElementById('game-info');
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

function loadUserData() {
    // Example request to get user data from server
    fetch('/api/user-data', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            brainCoins = data.brainCoins;
            energy = data.energy;
            progress = data.progress;
            brainCoinsDisplay.textContent = `Coins: ${brainCoins}`;
            updateProgressBar();
            updateEnergyBar();
            authSection.style.display = 'none';
            gameInfo.style.display = 'block';
        }
    })
    .catch(err => console.error('Error loading user data:', err));
}

function handleTelegramAuth(user) {
    // Save user data to the server
    fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            telegramId: user.id,
            username: user.username
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadUserData();
        }
    })
    .catch(err => console.error('Error authenticating user:', err));
}

// Event listeners
coin.addEventListener('click', handleClick);
buyEnergyButton.addEventListener('click', buyEnergy);

// Telegram authentication callback
window.TelegramLoginWidget = function (user) {
    if (user) {
        handleTelegramAuth(user);
    }
};

// Energy decay simulation
setInterval(() => {
    if (energy > 0) {
        energy -= energyDecayRate;
        updateEnergyBar();
    }
}, 1000);
