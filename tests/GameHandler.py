import requests
import json
base_url = 'http://localhost:3000/api'

class GameHandler():
  def create_game(self):
    req_body = {
      'playerName': 'test'
    }
    res = requests.post(base_url + '/creategame', data=req_body)
    return res.json()

  def setup_twoPlayer_game(self):
    gameData = self.create_game()
    req_body = {
      'playerName': 'test2',
      'gameCode': gameData['gameCode']
    }
    res = requests.post(base_url + '/joingame', data=req_body)
    return gameData['gameToken']
  
