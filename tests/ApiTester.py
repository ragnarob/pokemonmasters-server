import requests
import json
base_url = 'http://localhost:3000/api'

import GameHandler
gameHandler = GameHandler.GameHandler()

def test_createGame():
  req_body = {
    'playerName': 'test'
  }
  res = requests.post(base_url + '/creategame', data=req_body).json()
  if 'error' in res:
    return 'Server error: ' + res['error']
  return 0


def test_joingame():
  gameData = gameHandler.create_game()
  req_body = {
    'playerName': 'test2',
    'gameCode': gameData['gameCode']
  }
  res = requests.post(base_url + '/creategame', data=req_body).json()
  if 'error' in res:
    return 'Server error: ' + res['error']
  elif 'gameToken' not in res:
    return 'No gameToken'
  return 0


def test_getGameStatus_newGameReturns0():
  gameData = gameHandler.create_game()
  req_body = {'gameToken': gameData['gameToken']}
  res = requests.post(base_url + '/gamestatus', data=req_body).json()
  if 'gameStage' not in res:
    return 'gameStage not in response'
  if res['gameStage'] != 0:
    return 'gameStage should be 0, is ' + str(res['gameStage'])
  return 0


def test_getGameStatus_teamSetupStageReturns1():
  gameToken = gameHandler.setup_twoPlayer_game()
  req_body = {'gameToken': gameToken}
  res = requests.post(base_url + '/gamestatus', data=req_body).json()
  if 'gameStage' not in res:
    return 'gameStage not in response'
  if res['gameStage'] != 1:
    return 'gameStage should be 1, is ' + str(res['gameStage'])
  return 0


def test_getGameStatus_gameReadyStageReturns3():
  gameToken = gameHandler.setup_twoPlayerGameWithTeams()
  req_body = {'gameToken': gameToken}
  res = requests.post(base_url + '/gamestatus', data=req_body).json()
  if 'gameStage' not in res:
    return 'gameStage not in response'
  if res['gameStage'] != 3:
    return 'gameStage should be 3, is ' + str(res['gameStage'])
  return 0


def test_createTeam_doesntCrash():
  gameToken = gameHandler.setup_twoPlayer_game()
  req_body = {
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
  res = requests.post(base_url + '/createteam', data=json.dumps(req_body), headers={'Content-Type': 'application/json'}).json()
  if 'error' in res:
    return 'Server error: ' + res['error']
  if 'status' not in res or res['status'] != 'success':
    return 'Error: unexpected return value'
  return 0


def print_result(method_name):
  result = method_name()
  if not result:
    print('Pass: ' + method_name.__name__)
  else:
    print('FAILURE: ' + method_name.__name__)
    print('  ' + result)


def test_everything():
  print_result(test_createGame)
  print_result(test_joingame)
  print_result(test_createTeam_doesntCrash)
  print_result(test_getGameStatus_newGameReturns0)
  print_result(test_getGameStatus_teamSetupStageReturns1)
  print_result(test_getGameStatus_gameReadyStageReturns3)

test_everything()
