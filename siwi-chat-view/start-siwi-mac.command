#!/bin/bash

# Gå till den här filens mapp
cd "$(dirname "$0")"

echo "=============================="
echo "  SIWI Chat Viewer Starter"
echo "=============================="
echo

# Installera dependencies
echo "Installing dependencies (only slow first time)..."
npm install
echo

# Starta Vite dev-server i bakgrunden
echo "Starting Vite development server..."
npm run dev &

# Vänta en stund så servern hinner starta
sleep 3

# Öppna webbläsaren
echo "Opening browser at http://localhost:5173 ..."
open http://localhost:5173

echo
echo "Server running. Close Terminal window to stop it."
echo