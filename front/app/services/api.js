import Service from '@ember/service';

export default class ApiService extends Service {
  createPlayer = async function (player) {
    const response = await fetch('http://127.0.0.1:3000/players', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });
    return response.json();
  };
  findGame = async function () {
    const cookies = document.cookie.split(';');
    const playerID = cookies[0].split('=')[1];
    const response = await fetch(
      'http://127.0.0.1:3000/games?' +
      new URLSearchParams({player_id: playerID}).toString(),
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      }
    );
    return response.json();
  };

  getGame = async function () {
    const cookies = document.cookie.split(';')
    const playerID = cookies[0].split('=')[1];
    const gameID = cookies[1].split('=')[1];
    const response = await fetch(
      `http://127.0.0.1:3000/games/${gameID}?` +
      new URLSearchParams({player_id: playerID}).toString(),
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      }
    );
    return response.json();
  };

  updateGameBoard = async function (game, board) {
    game.board = JSON.stringify(board);
    const response = await fetch(`http://127.0.0.1:3000/games/${game.id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    return response.json();
  }

  updateExistingPlayer = async function () {
    const cookies = document.cookie.split(';')
    const playerID = cookies[0].split('=')[1];
    const response = await fetch(`http://127.0.0.1:3000/players/${playerID}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerID),
    });
    return response.json();
  }
}
