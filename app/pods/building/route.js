import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.get('store').findRecord('building', params.building_id, {reload:true});
	},
	afterModel:function(model, transition){
		if(model.get('level').get('length')===1){
			this.transitionTo('level', model.get('level.firstObject').get('id'));
		}
	}
});
