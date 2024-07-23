const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

let userData = {};

// Введите свой секретный ключ Telegram для проверки подписи
const TELEGRAM_BOT_SECRET = 'your_telegram_bot_secret';

// Функция для проверки подписи запроса
function verifyTelegramSignature(data, hash) {
    const crypto = require('crypto');
    const computedHash = crypto.createHmac('sha256', TELEGRAM_BOT_SECRET)
                               .update(data)
                               .digest('hex');
    return computedHash === hash;
}

// Обработка авторизации через Telegram
app.post('/auth', async (req, res) => {
    const { auth_date, hash, id, first_name, last_name, username } = req.body;

    const queryString = Object.keys(req.body).map(key => `${key}=${req.body[key]}`).join('\n');
    if (!verifyTelegramSignature(queryString, hash)) {
        return res.status(403).send('Unauthorized');
    }

    req.session.userId = id;
    userData[id] = { username, brainCoins: 0, energy: 100, progress: 0 };
    res.json({ success: true });
});

// Получение данных пользователя
app.get('/api/user-data', (req, res) => {
    const userId = req.session.userId;
    if (userId && userData[userId]) {
        res.json({ success: true, ...userData[userId] });
    } else {
        res.json({ success: false });
    }
});

// Запуск сервера
app.listen(3000, () => console.log('Server running on port 3000'));
