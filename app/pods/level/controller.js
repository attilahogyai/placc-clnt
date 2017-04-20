import Ember from 'ember';

export default Ember.Controller.extend({
	seatId: null,
	modal: Ember.inject.service(),
	i18n: Ember.inject.service(),
	session: Ember.inject.service(),
	userId: Ember.computed.readOnly('session.userid'),
    isLoggedIn: Ember.computed.readOnly('session.isLoggedIn'),	
    reservations: null,
    calendarOpen: false,

	actions:{
		setReservation (seatId){
			if(!this.get('isLoggedIn')){
				this.get('modal').openInfoModal({header:this.get('i18n').t('login.login_required'),text:this.get('i18n').t('login.login_required_for_reservation')});
			}else{
				this.get('store').query('reservation', {filters: {seat: seatId}} ).then((data)=>{
					this.set('seatId',seatId);
					this.set('reservations',data);	
					this.set('calendarOpen',true);
				});
				// call reservation update
			}
		},
		onRelease (reservation){
			reservation.deleteRecord();
			let s=reservation.save();
			this.get('loader').startLoadProcess(s);
			var c=this;
			s.then(()=>{
				this.get('store').query('reservation', {filters: {seat: this.get('seatId')}} ).then((data)=>{
					this.set('reservations',data);	
				}).catch(function(){
				});				
			}).catch((status)=>{
                c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-delete.'+status.responseText,status.text)});									
			})
		},
		onReserve (day){
			var sid=this.get('seatId');
			var ds=day.format('YYYY-MM-DD HH:mm:ss.SSSZZ');
			Ember.Logger.info('set reservation for sid:'+sid);
			var reserv=window.xappc.getData('/api/prepareReservation',true,'POST',true,false,{
				sid:sid,
				date: ds
			},null,null);
			this.get('loader').startLoadProcess(reserv);
			var c = this;
			reserv.then((reservation)=>{
				this.get('store').query('reservation', {filters: {seat: this.get('seatId')}} ).then((data)=>{
					this.set('reservations',data);	
					window.xappc.mapOnData(data);
				}).catch(function(){
					
				});				
			},(status)=>{
				this.set('calendarOpen',false);				
				if(status.responseText){
	                c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-text.'+status.responseText,status.text)});									
				}else{
	                c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-text',status.text)});									
				}
			});
		},
		onCloseCalendar(){
			this.set('calendarOpen',false);
		}
	}
});
