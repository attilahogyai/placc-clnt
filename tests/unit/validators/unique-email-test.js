import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:unique-email', 'Unit | Validator | unique-email', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  let done = assert.async();
  validator.validate('attila.hogyai@gmail.com').then((message) => {
  	  console.log('aaa:'+message);
      assert.equal(message, true);
      done();
    });  
  assert.ok(validator);
});
