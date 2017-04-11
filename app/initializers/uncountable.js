import Ember from 'ember';
export function initialize(/* application */) {
	Ember.Inflector.inflector.uncountable('company');
	Ember.Inflector.inflector.uncountable('level');
	Ember.Inflector.inflector.uncountable('building');
	Ember.Inflector.inflector.uncountable('seat');
	Ember.Inflector.inflector.uncountable('reservation');
	Ember.Inflector.inflector.uncountable('user');
	Ember.Inflector.inflector.uncountable('langtext');
}

export default {
  name: 'uncountable',
  initialize
};
