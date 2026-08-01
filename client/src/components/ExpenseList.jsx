function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        <p className="mb-0">No expenses yet — add your first one to get started.</p>
      </div>
    );
  }

  const categoryColors = {
    Food: 'success', Transport: 'primary', Utilities: 'warning',
    Entertainment: 'info', Health: 'danger', Shopping: 'secondary', Other: 'dark',
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Date</th><th>Category</th><th>Description</th>
            <th className="text-end">Amount</th><th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.expense_date?.slice(0, 10)}</td>
              <td><span className={`badge bg-${categoryColors[exp.category] || 'secondary'}`}>{exp.category}</span></td>
              <td className="text-muted">{exp.description || '—'}</td>
              <td className="text-end fw-semibold">${Number(exp.amount).toFixed(2)}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(exp)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;