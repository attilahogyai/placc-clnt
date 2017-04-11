import DS from 'ember-data';
import Ember from 'ember';
export default DS.Transform.extend({
  deserialize(serialized) {
	if(Ember.isEmpty(serialized)) {
		return;
	}
	Ember.assert("Value type is not string", !!serialized.indexOf);
	return moment(serialized,'YYYY-MM-DDTHH:mm:ss.SSSZZ');  	
  },

  serialize(deserialized) {
	if(Ember.isEmpty(deserialized)) {
		return;
	}
	Ember.assert("Value type is not moment", !!deserialized.format);
	return deserialized.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
  }
});
