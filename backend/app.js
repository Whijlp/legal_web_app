const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const tutelaRoutes = require('./routes/tutela.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tutelas', tutelaRoutes);

app.get('/', (req, res) => res.send('API Tutelas - OK'));

app.use(errorHandler);

module.exports = app;