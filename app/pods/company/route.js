import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return this.get('store').findRecord('company', params.company_id );
	},
	afterModel:function(model, transition){
		if(model.get('length')===0){
			this.transitionTo('index');
		}
		/*
		if(model.get('building.length')===1){
			this.transitionTo('building',model.get('building').get('firstObject').get('id'));
		}
		*/
	}
});
