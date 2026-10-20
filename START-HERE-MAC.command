#!/bin/bash
# Start the portfolio server from this folder so CSS, JavaScript, and images load correctly.
cd "$(dirname "$0")"
PORT=8000
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $PORT is already in use. If your portfolio is already running, visit http://localhost:$PORT."
  read -r -p "Press Return to close this window..."
  exit 0
fi
echo "Starting Shantanu's portfolio at http://localhost:$PORT"
echo "Keep this Terminal window open while viewing the site. Press Ctrl+C to stop."
python3 -m http.server "$PORT" &
SERVER_PID=$!
sleep 1
open "http://localhost:$PORT"
wait "$SERVER_PID"
