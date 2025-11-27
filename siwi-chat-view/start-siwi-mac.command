#!/bin/bash

# Gå till mappen där filen ligger
cd "$(dirname "$0")"

echo "=============================="
echo "   Starting SIWI Chat Viewer"
echo "=============================="
echo ""

# Installera dependencies (går snabbt om det redan är gjort)
npm install

# Starta Vite development server in background
npm run dev &

# Vänta så servern hinner starta
sleep 2

# Öppna webbläsaren
open http://localhost:5173

echo "Server running. Close terminal to stop it."
