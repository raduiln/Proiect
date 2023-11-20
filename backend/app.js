const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dbConfig = require('./config/dbConfig');
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3300;

const corsOptions = {
  origin: 'http://127.0.0.1:3000',
  credentials: true,
};

// Middleware pentru CORS
app.use(cors(corsOptions));

// Middleware pentru parsarea cookie-urilor
app.use(cookieParser());

app.use(express.json());

// Conectarea la baza de date
dbConfig.connect();


app.use('', router);

app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
