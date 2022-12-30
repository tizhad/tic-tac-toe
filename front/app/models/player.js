import Model from '@ember-data/model';

export default class PlayerModel extends Model {
  @att('string') name;
  @attr('string') status;
}

store.createRecord('post', {
  title: 'Rails is Omakase',
  body: 'Lorem ipsum',
});
