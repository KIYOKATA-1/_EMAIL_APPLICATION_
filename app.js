const express = require('express'); // Подключаем библиотеку Express
const path = require('path');
const nodemailer = require('nodemailer'); // Подключаем библиотеку Nodemailer

const app = express(); // Создаем экземпляр приложения Express

const PORT = process.env.PORT || 3000; // Устанавливаем порт приложения, используя переменную окружения или порт по умолчанию (3000)

// Middleware
app.use(express.static('public')); // Подключаем статические файлы из папки 'public'
app.use(express.json()); // Позволяет приложению Express парсить JSON-запросы

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/app.html')); // Отправляем HTML-файл при обращении к корневому URL
});

app.post('/', (req, res) => { // Обработчик POST-запроса 
    console.log(req.body); 

    const transport = nodemailer.createTransport({ // Создаем объект transport для отправки электронной почты через Gmail
        service: 'gmail',
        auth:{
            user: 'f84079521@gmail.com',
            pass: 'xflf eobt ehak qaas',
        }
    });

    const mailOptions = { // Опции для отправки электронной почты
        from: 'f84079521@gmail.com',
        to: req.body.email,
        subject: `Message for ${req.body.email}: ${req.body.subject}`,
        text: req.body.message,
    };

    transport.sendMail(mailOptions, (error, info) => { // Отправляем электронное письмо
        if (error) {
            console.log(error); // Если есть ошибка, выводим её в консоль и отправляем её клиенту
            res.send(error);
        } else {
            console.log('Email sent: ' + info.response); // Выводим в консоль сообщение об успешной отправке и отправляем 'SUCCESS' клиенту
            res.send('SUCCESS');
        }
    });
});

app.listen(PORT, () => { // Прослушиваем указанный порт
    console.log(`app listening on port ${PORT}`);
});
