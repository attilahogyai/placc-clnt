import Ember from 'ember';

export default Ember.Route.extend({
	
    i18n: Ember.inject.service(),
	model(params) {
		return this.get('store').findRecord('level', params.level_id );
	},
  	setupController: function (controller, model) {
		Ember.Instrumentation.subscribe("signalr.setReservation", {
			before: function(name, timestamp, payload) {
				console.log('Recieved ', name, ' at ' + timestamp + ' with payload: ', payload);
				controller.send('setReservation', payload);
			},
			after: function() {}
		});
		controller.set('model',model);
	}	
});
