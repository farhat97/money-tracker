import json
import os 

os.system("curl  http://localhost:4040/api/tunnels > ngrok-tunnels.json")

# TODO: remove
with open('ngrok-tunnels.json') as data_file:    
    datajson = json.load(data_file)

msg = "ngrok URL's: \n"
for i in datajson['tunnels']:
  msg = msg + i['public_url'] +'\n'

print (msg)