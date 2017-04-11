import { Model, belongsTo } from 'ember-cli-mirage';
import Ember from 'ember';
export default Model.extend({
	building: belongsTo()
});
Ember.Inflector.inflector.uncountable('level');
