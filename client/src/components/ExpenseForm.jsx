import { useState, useEffect } from 'react';

function ExpenseForm({ onAdd, onUpdate, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    description: '',
    expense_date: '',
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        category: editingExpense.category,
        amount: editingExpense.amount,
        description: editingExpense.description || '',
        expense_date: editingExpense.expense_date?.slice(0, 10),
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.expense_date) return;

    if (editingExpense) {
      onUpdate(editingExpense.id, form);
    } else {
      onAdd(form);
    }
    setForm({ category: '', amount: '', description: '', expense_date: '' });
  };

  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Shopping', 'Other'];

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-select" name="category" value={form.category} onChange={handleChange}>
          <option value="">Select category</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Amount</label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input className="form-control" name="amount" type="number" step="0.01"
            placeholder="0.00" value={form.amount} onChange={handleChange} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input className="form-control" name="description" placeholder="Optional note"
          value={form.description} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input className="form-control" name="expense_date" type="date"
          value={form.expense_date} onChange={handleChange} />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          {editingExpense ? 'Update Expense' : 'Add Expense'}
        </button>
        {editingExpense && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;