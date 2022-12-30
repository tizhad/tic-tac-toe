import { module, test } from 'qunit';

import { setupTest } from 'front/tests/helpers';

module('Unit | Model | player', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('player', {});
    assert.ok(model);
  });
});
