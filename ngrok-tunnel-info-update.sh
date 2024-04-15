#!/bin/bash

# # Get ngrok tunnel information
python3 ./ngrok-url-updater.py

# Copy info to client
cp ./ngrok-tunnels.json tracker-ui/src/

# Copy info to server
cp ./ngrok-tunnels.json server/server/

