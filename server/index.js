const express = require('express');
const cors = require('cors');
require('dotenv').config();

const expensesRouter = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Expense Tracker API running'));
app.get('/health', (req, res) => res.status(200).json({ status: 'healthy' }));
app.use('/api/expenses', expensesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));