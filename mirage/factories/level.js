import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) { return `Level ${i}`; }
});