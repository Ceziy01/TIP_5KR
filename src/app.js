require('dotenv').config();
const express = require('express');
const recipesRoutes = require('./routes/recipesRoutes');
const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use(express.static('src/public'));

app.use('/api/recipes', recipesRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} запущен на http://localhost:${PORT}`);
});