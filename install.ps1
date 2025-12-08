# Luna Installation Script - Windows PowerShell

Write-Host "🌙 Luna - Menstrual Health & Cycle Tracker" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js v18 or higher." -ForegroundColor Red
    Write-Host "Visit: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
Write-Host ""

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Push-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
Write-Host ""

# Check if .env files exist
Write-Host "🔧 Setting up environment files..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path ".env")) {
    Write-Host "Creating frontend .env file..." -ForegroundColor Cyan
    "VITE_API_URL=http://localhost:5000/api" | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Frontend .env created" -ForegroundColor Green
}

if (-not (Test-Path "backend\.env")) {
    Write-Host "Creating backend .env file..." -ForegroundColor Cyan
    @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luna-health
JWT_SECRET=luna_secret_key_2024_change_me_in_production
NODE_ENV=development
"@ | Out-File -FilePath "backend\.env" -Encoding UTF8
    Write-Host "✅ Backend .env created" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""

Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure MongoDB is running:" -ForegroundColor White
Write-Host "   - Local: mongod" -ForegroundColor Gray
Write-Host "   - Atlas: Update MONGODB_URI in backend\.env" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Seed the database (optional):" -ForegroundColor White
Write-Host "   cd backend; node seed.js; cd .." -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start the application:" -ForegroundColor White
Write-Host "   Terminal 1: cd backend; npm run dev" -ForegroundColor Gray
Write-Host "   Terminal 2: npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Open browser:" -ForegroundColor White
Write-Host "   http://localhost:5173" -ForegroundColor Blue
Write-Host ""
Write-Host "📚 See SETUP.md for detailed instructions" -ForegroundColor Yellow
