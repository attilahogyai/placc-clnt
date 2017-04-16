import Ember from 'ember';

export default Ember.Controller.extend({
	modal: Ember.inject.service(),
	i18n: Ember.inject.service(),
	session: Ember.inject.service(),
    isLoggedIn: Ember.computed.readOnly('session.isLoggedIn'),	
	actions:{
		setReservation:function(seatid){
			if(!this.get('isLoggedIn')){
				this.get('modal').openInfoModal({header:this.get('i18n').t('login.login_required'),text:this.get('i18n').t('login.login_required_for_reservation')});
			}else{
				this.get('store').query('reservation', {filters: {seat: seatid}} );
				// call reservation update
			}
		}
	}
});
