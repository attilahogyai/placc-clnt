import { Model, belongsTo } from 'ember-cli-mirage';
import Ember from 'ember';
export default Model.extend({
	company:belongsTo()
});
Ember.Inflector.inflector.uncountable('building');
