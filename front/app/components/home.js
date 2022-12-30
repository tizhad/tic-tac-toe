import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { service } from '@ember/service';
import { api } from '../services/api';
import EmberObject from '@ember/object';
export default class MyFormComponet extends Component {
  @service router;
  @service api;
  @tracked player = '';
  @tracked loadingDisplay = false;
  @tracked isGameReady = false;
  @tracked isFormEnable = true;
  @tracked playerGame = undefined;
  @tracked playerID = null;
  @tracked playAs = '';
  @tracked board = [];
  @tracked result = '';
  @tracked intervId = '';

  // Disable button when name in empty
  get disableSubmit() {
    return !this.player.length;
  }

  @action async onSubmit() {
    event.preventDefault();
    this.loadingDisplay = true;
    const player = {
      name: this.player,
    };
    this.api.createPlayer(player).then((response) => {
      if (response.error) {
        alert('wrong');
      } else {
        document.cookie = 'player_id' + '=' + response.id + '; Path=/;';
        this.isFormEnable = false;
        this.searchGame();
      }
    });
  }

  @action searchGame() {
    const intervId = setInterval(() => {
      this.api.findGame().then((res) => {
        if (res.id) {
          this.board = JSON.parse(res.board);
          this.playerGame = res;
          this.loadingDisplay = false;
          this.isGameReady = true;
          document.cookie = 'game_id' + '=' + res.id + '; Path=/;';
          this.getUpdates(this.playerGame);
          clearInterval(intervId);
        }
      });
    }, 1000);
  }
  @action getUpdates(game) {
    this.intervId = setInterval(() => {
      this.api.getGame().then((res) => {
        this.board = JSON.parse(res.board);
        for (let i = 0; i < 9; i++) {
          const boardValues = this.board.join().replaceAll(',', '');
          boardValues[i] == 'E'
            ? (document.getElementById(i).innerText = '')
            : (document.getElementById(i).innerText = boardValues[i]);
        }
      });
    }, 1000);
  }
  @action onSquareClick(square) {
    const playAs = this.playerGame.play_as;
    // Place where player clicked
    const clickedSquare = square.target;
    const clickedRow = parseInt(clickedSquare.getAttribute('data-row'));
    const clickedCol = parseInt(clickedSquare.getAttribute('data-col'));
    // Update related item in the board
    this.board[clickedRow][clickedCol] = playAs;
    this.api.updateGameBoard(this.playerGame, this.board).then((res) => {
      switch (res.result) {
        case 1:
          this.result = 'WINNER : X';
          break;
        case 2:
          this.result = 'WINNER : O';
          break;
        case 0:
          this.result = 'DRAW';
          break;
      }
    });
  }
  @action restart() {
    this.isFormEnable = true;
    this.isGameReady = false;
    this.result = null;
    //clear cookie // start over
  }
}
