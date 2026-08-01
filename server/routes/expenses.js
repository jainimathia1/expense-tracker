const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM expenses ORDER BY expense_date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM expenses WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { category, amount, description, expense_date } = req.body;
    if (!category || !amount || !expense_date) {
      return res.status(400).json({ error: 'category, amount, and expense_date are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO expenses (category, amount, description, expense_date) VALUES (?, ?, ?, ?)',
      [category, amount, description || null, expense_date]
    );
    res.status(201).json({ id: result.insertId, category, amount, description, expense_date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { category, amount, description, expense_date } = req.body;
    const [result] = await pool.query(
      'UPDATE expenses SET category = ?, amount = ?, description = ?, expense_date = ? WHERE id = ?',
      [category, amount, description || null, expense_date, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM expenses WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;