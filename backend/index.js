require('dotenv').config();

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

app.use('/ideas', require('./routes/Idea.routes'));

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});