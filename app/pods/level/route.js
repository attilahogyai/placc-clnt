import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	modal: Ember.inject.service(),

    isLoggedIn: Ember.computed.readOnly('session.isLoggedIn'),	
    i18n: Ember.inject.service(),
	model(params) {
		return this.get('store').findRecord('level', params.level_id );
	},
	actions:{
		setReservation:function(seatid){
			if(!this.get('isLoggedIn')){
				this.get('modal').openInfoModal({header:this.get('i18n').t('login.login_required'),text:this.get('i18n').t('login.login_required_for_reservation')});
			}else{
				// call reservation update
			}
		}
	}
});
