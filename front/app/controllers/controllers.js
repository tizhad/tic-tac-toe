import Ember from 'ember';

const { get, set, inject, computed } = Ember;

export default Ember.Controller.extend({
  cable: inject.service(),
  eventConsumer: inject.service(),
  paperToaster: inject.service(),

  shareLink: computed(function () {
    return location.href;
  }),

  setupCable() {
    const model = get(this, 'model');
    const gameId = get(model, 'gameId');
    const consumer = this.cable.createConsumer(`ws://${location.host}/cable`);

    const subscription = consumer.subscriptions.create(
      { channel: 'GameChannel', gameId },
      {
        received: (data) => {
          console.log(data);
          const eventConsumer = get(this, 'eventConsumer');

          if (eventConsumer[data.event]) {
            eventConsumer[data.event](model, data);
          }
        },
      }
    );

    set(this, 'consumer', consumer);
    set(this, 'subscription', subscription);
  },

  actions: {
    onPlayBtnClick() {
      console.log('clicked');
      const status = get(this, 'model.status');

      if (status === 'WAIT') {
        set(this, 'showDialog', true);
      } else if (status === 'START') {
        get(this, 'subscription').perform('withdraw');
      } else if (status === 'END') {
        get(this, 'subscription').perform('join');
      }
    },
  },
});
