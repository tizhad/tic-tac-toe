import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class MyFormComponet extends Component {
  @tracked player = '';
  @tracked loadingDisplay = false;

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
    createPlayer(player).then((response) => {
      // error handling and showing message
      if(response) {
        alert('success')
      } else {
        alert('wrong')
      }
      console.log(response)
    });
  }
}

const createPlayer = async function (player) {
  const response = await fetch('http://127.0.0.1:3000/players', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(player),
  });
  return response.json()
};
