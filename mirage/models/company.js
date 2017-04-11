import { Model , hasMany } from 'ember-cli-mirage';
import Ember from 'ember';
export default Model.extend({
	building: hasMany()
});
Ember.Inflector.inflector.uncountable('company');
