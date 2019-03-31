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

test_everything()
