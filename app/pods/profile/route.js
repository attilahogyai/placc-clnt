import Ember from 'ember';
import App from 'client/app';
export default Ember.Route.extend({
    session: Ember.inject.service(),
	model:function(){
		let pageS=window.xappc.getData('/api/profile/setup',true,"GET",true,false,null,null,null);
		let userPromise; 
		if(this.get('session.userid')){
			userPromise = this.store.findRecord('user',this.get('session.userid'));	
		}
		return Ember.RSVP.hash({
			pageSetup: pageS,
			user: userPromise
		});
	},
		
	setupController: function(controller, model) {
		controller.set('setup', model.pageSetup);
		this.get('session').set('user', model.user);
  	}
});
