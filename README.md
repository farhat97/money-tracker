# Hopefully this is all worth it

### Steps for Running (Linux env)
1. Run `/.ngrok-init.sh`. This will put both client and server in ngrok tunnels.

2. Run `./ngrok-tunnel-info-update.sh`. This will get ngrok's tunnel information and create files for both client and server. This file will be used to have the most up-to-date URIs.

3. Run server (inside server/server)

    **NOTE:** On my development machine, the command was `dotnet run --roll-forward Major`

4. Run client with `npm run start`
