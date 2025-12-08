# Luna Development Server Startup Script - Windows PowerShell
# This script starts both backend and frontend in separate terminals

Write-Host "🌙 Luna - Starting Development Servers" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if backend is already running
$backendRunning = Test-Path ".\backend"

if (-not $backendRunning) {
    Write-Host "❌ Backend folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Backend folder found" -ForegroundColor Green

# Start backend in a new PowerShell window
Write-Host "🚀 Starting backend server (port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in a new PowerShell window
Write-Host "🚀 Starting frontend (port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers started!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Open your browser and navigate to:" -ForegroundColor Cyan
Write-Host "   http://localhost:5173" -ForegroundColor Blue
Write-Host ""
Write-Host "📌 Backend API available at:" -ForegroundColor Cyan
Write-Host "   http://localhost:5000/api" -ForegroundColor Blue
Write-Host ""
Write-Host "⏹️  To stop the servers, close the terminal windows or press Ctrl+C" -ForegroundColor Yellow
