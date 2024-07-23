const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const session = require('express-session');

const app = express();
const token = '7314016583:AAEEXsRh70jbuSgMGpoZm2cxvNl0eLYVy_0';
const bot = new TelegramBot(token, { polling: true });

app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

let userData = {};

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            keyboard: [
                [{ text: 'Play' }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
    bot.sendMessage(chatId, 'Welcome! Press "Play" to start the game.', options);
});

// Обработка нажатия кнопки "Play"
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === 'Play') {
        userData[chatId] = { brainCoins: 0, energy: 100, progress: 0 };
        bot.sendMessage(chatId, 'Game started! Click the coin to earn Brain Coins.');
        // Вы можете здесь добавить дополнительные инструкции и интерфейс для игры
    }
});

// Запуск сервера
app.listen(3000, () => console.log('Server running on port 3000'));
