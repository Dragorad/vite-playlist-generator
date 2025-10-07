# Local Development Setup

## Prerequisites
- MongoDB Atlas connection string
- Firebase project with Admin SDK credentials

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

2. **Configure environment:**
   ```bash
   # Backend: Fill backend/.env with real MongoDB URI and Firebase credentials
   # Frontend: Fill .env.local with real Firebase config
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

## Runs:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Test with real database queries to Dragora_Selector collection