@"
# Expense Tracker

Full-stack expense tracker built with React, Node.js/Express, and MySQL — deployed on Azure.

## Structure
- ``client/`` — React frontend (Vite + Bootstrap), deployed to Azure Static Web Apps
- ``server/`` — Node.js/Express backend API, deployed to Azure App Service
- MySQL database hosted on Azure Database for MySQL Flexible Server

## Live URLs
- Frontend: https://expense-tracker-web.azurestaticapps.net
- Backend API: https://expense-tracker-api.azurewebsites.net

## CI/CD
GitHub Actions auto-deploys:
- Changes in ``server/`` → Azure App Service
- Changes in ``client/`` → Azure Static Web Apps

## Local Setup
See ``server/README.md`` and ``client/README.md`` for individual setup instructions.
"@ | Out-File -FilePath README.md -Encoding utf8