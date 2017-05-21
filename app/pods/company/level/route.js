import Ember from 'ember';
import AuthRoute from 'client/utils/auth-route';
export default AuthRoute.extend({
	
    i18n: Ember.inject.service(),
	model(params) {
		return Ember.RSVP.hash({
			level: this.get('store').query('level', {filter:{id:params.level_id,date:params.date}}),
			reservation: this.get('store').query('reservation', {filters: {level: params.level_id, date:params.date }} )
		});
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
		if(model.level.get('length')>0){
			window.xappc.initSvg(model.level.get('firstObject')); 			
		}
		controller.set('model',model.level.get('firstObject'));
		controller.set('reservations',model.reservation);

		// in case if the users enter here with direct link, the company controller level variable remains null because there was no user interaction
		// so that we should seet a value here in order to activate the calendar and the link highlights
		if(!controller.get('companyController.level')){ 
			controller.set('companyController.level',model.level.get('firstObject.id'));
		}		
	}	
});
