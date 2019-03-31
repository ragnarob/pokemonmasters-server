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
  
  def setup_twoPlayerGameWithTeams(self):
    gameToken = self.setup_twoPlayer_game()
    req_body1 = {
      'gameToken': gameToken,
      'playerName': 'test',
      'pokemonList': [
        {'name': 'Charizard', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Charizard', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Ivysaur', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Ivysaur', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Venusaur', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Venusaur', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
      ]
    }
    req_body2 = {
      'gameToken': gameToken,
      'playerName': 'test2',
      'pokemonList': [
        {'name': 'Charizard', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Charizard', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Ivysaur', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Ivysaur', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Venusaur', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
        {'name': 'Venusaur', 'moves': ['hyperbeam', 'bodyslam', 'blizzard', 'thunder']},
      ]
    }
    requests.post(base_url + '/createteam', data=json.dumps(req_body1), headers={'Content-Type': 'application/json'})
    requests.post(base_url + '/createteam', data=json.dumps(req_body2), headers={'Content-Type': 'application/json'})
    return gameToken