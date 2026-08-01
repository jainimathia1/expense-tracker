import { useState, useEffect } from 'react';
import api from './api';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      setError('Failed to load expenses. Is the backend running?');
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const addExpense = async (expense) => {
    try {
      await api.post('/expenses', expense);
      fetchExpenses();
    } catch (err) {
      setError('Failed to add expense.');
    }
  };

  const updateExpense = async (id, expense) => {
    try {
      await api.put(`/expenses/${id}`, expense);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      setError('Failed to update expense.');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense.');
    }
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">💰 Expense Tracker</span>
        </div>
      </nav>

      <div className="container pb-5">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm sticky-top" style={{ top: '1rem' }}>
              <div className="card-body">
                <h5 className="card-title mb-3">{editingExpense ? 'Edit Expense' : 'Add Expense'}</h5>
                <ExpenseForm onAdd={addExpense} onUpdate={updateExpense}
                  editingExpense={editingExpense} onCancelEdit={() => setEditingExpense(null)} />
              </div>
            </div>
            <div className="card shadow-sm mt-4">
              <div className="card-body text-center">
                <p className="text-muted mb-1">Total Spent</p>
                <h3 className="mb-0">${total.toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Your Expenses</h5>
                <ExpenseList expenses={expenses} onDelete={deleteExpense} onEdit={setEditingExpense} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;