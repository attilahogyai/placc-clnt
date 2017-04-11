import DS from 'ember-data';
import Ember from 'ember';
export default DS.Transform.extend({
	deserialize: function(serialized) {
		if(Ember.isEmpty(serialized)) {
			return;
		}
		Ember.assert("Value type is not integer", !isNaN(serialized));
		return moment(serialized);
	},
	serialize: function(deserialized) {
		if(Ember.isEmpty(deserialized)) {
			return;
		}
		Ember.assert("Value type is not moment", !!deserialized.format);
		return deserialized.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
	}
});
