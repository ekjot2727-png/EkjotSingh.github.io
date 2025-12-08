#!/bin/bash
# Luna Installation Script - macOS/Linux

echo "🌙 Luna - Menstrual Health & Cycle Tracker"
echo "==========================================\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)\n"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed\n"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "✅ Backend dependencies installed\n"

# Check if .env files exist
echo "🔧 Setting up environment files...\n"

if [ ! -f ".env" ]; then
    echo "Creating frontend .env file..."
    echo "VITE_API_URL=http://localhost:5000/api" > .env
    echo "✅ Frontend .env created"
fi

if [ ! -f "backend/.env" ]; then
    echo "Creating backend .env file..."
    cat > backend/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luna-health
JWT_SECRET=luna_secret_key_2024_change_me_in_production
NODE_ENV=development
EOF
    echo "✅ Backend .env created"
fi

echo "\n✅ Installation complete!\n"

echo "📝 Next steps:"
echo "1. Make sure MongoDB is running:"
echo "   - Local: mongod"
echo "   - Atlas: Update MONGODB_URI in backend/.env"
echo ""
echo "2. Seed the database (optional):"
echo "   cd backend && node seed.js && cd .."
echo ""
echo "3. Start the application:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: npm run dev"
echo ""
echo "4. Open browser:"
echo "   http://localhost:5173"
echo ""
echo "📚 See SETUP.md for detailed instructions"
