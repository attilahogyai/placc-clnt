import Ember from 'ember';
import AuthRoute from 'client/utils/auth-route';
export default AuthRoute.extend({
	
    i18n: Ember.inject.service(),
	model(params) {
		return this.get('store').findRecord('level', params.level_id, { reload: true } );
	},
  	setupController: function (controller, model) {
  		/*
		Ember.Instrumentation.subscribe("signalr.setReservation", {
			before: function(name, timestamp, payload) {
				console.log('Recieved ', name, ' at ' + timestamp + ' with payload: ', payload);
				controller.send('setReservation', payload);
			},
			after: function() {}
		});
		Ember.Instrumentation.subscribe("signalr.onReserve", {
			before: function(name, timestamp, payload) {
				console.log('Recieved ', name, ' at ' + timestamp + ' with payload: ', payload);
				controller.send('onReserve', payload);
			},
			after: function() {}
		});
		*/
		window.xappc.initSvg(model); 
		controller.set('model',model);
	}	
});
