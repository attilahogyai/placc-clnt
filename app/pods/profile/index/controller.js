import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
    isLoggedIn: Ember.computed.readOnly('session.isLoggedIn'),	
    username: Ember.computed.readOnly('session.username')

});
