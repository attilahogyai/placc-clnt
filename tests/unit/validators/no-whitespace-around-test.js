import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:no-whitespace-around', 'Unit | Validator | no-whitespace-around', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
