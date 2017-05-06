import Ember from 'ember';
export default Ember.Route.extend({
	session: Ember.inject.service(),
    isLoggedIn: Ember.computed.readOnly('session.isLoggedIn'),	

	beforeModel:function(transition){
		if(!this.get('isLoggedIn')){
			this.transitionTo('profile.index');
		}
	}
});
