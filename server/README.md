@"
# Expense Tracker — Backend

Node.js/Express REST API for the Expense Tracker app.

## Endpoints
- GET /health — health check
- GET /api/expenses — list all expenses
- GET /api/expenses/:id — get one expense
- POST /api/expenses — create expense
- PUT /api/expenses/:id — update expense
- DELETE /api/expenses/:id — delete expense

## Local setup
1. Copy .env.example to .env and fill in your DB credentials
2. npm install
3. npm run dev
"@ | Out-File -FilePath server/README.md -Encoding utf8