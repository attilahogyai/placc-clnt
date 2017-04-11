import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) { return `Building ${i}`; },
  city: 'Budapest',
  address(i) { return `Teszt utca ${i}`; }
});