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
    showSVG: true,
    companyController: Ember.inject.controller('company'),
    actualDate: Ember.computed.alias("companyController.actualDate"),
	
	refreshData (){
		let levelId=this.get('model.id');
		let date=this.get('actualDate').format('YYYYMMDD');		
		this.get('store').query('level', {filter: {id: levelId, date:date }} ).then((data)=>{
				this.set('model',data.get('firstObject'));
				window.xappc.refreshSvg(this.get('model'));
		});
		this.get('store').query('reservation', {filters: {level: levelId, date:date }} ).then((data)=>{
			this.set('reservations',data);
				
		});
	},
    setReservation (day, seatId){
		var ds=day.format('YYYYMMDD');
		Ember.Logger.info('set reservation for sid:'+seatId+" date:"+ds);
		var reserv=window.xappc.getData('/api/prepareReservation',true,'POST',true,false,{
			sid:seatId,
			date: ds
		},null,null);
		this.get('loader').startLoadProcess(reserv);
		var c = this;
		reserv.then((reservation)=>{
			this.refreshData();			
		},(error)=>{
			this.set('calendarOpen',false);				
			if(error.status===400){
            	c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-'+error.responseText)});									
			}else{
            	c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-text',error.responseText)});									
			}
		});
	},
	unsetReservation (day, seatId){
			let reservation=this.get('reservations').find((element)=>{
				console.log('myReservationCount='+ element.get('seat.myReservationCount') +" -seat.id ="+element.get('seat.id'));
				return element.get('userId')==this.get('userId') && element.get('seat.id')==seatId;
			});
			reservation.deleteRecord();
			let s=reservation.save();
			this.get('loader').startLoadProcess(s);
			var c=this;
			s.then(()=>{
				this.refreshData();
			}).catch((status)=>{
                c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-delete.'+status.responseText,status.text)});									
			});
		},
	actions:{

		setReservation (seatId, code){
			if(this.get('actualDate')){
				let seat=this.get('model.seat').find((element)=>{
					return element.get('id')===seatId;
				});

				if(seat.get('myReservationCount')>0){ // set the reservation
					this.unsetReservation(this.get('actualDate'), seatId);
				}else{ // unset the reservation
					this.setReservation(this.get('actualDate'), seatId);
				}				
			}
		},
		onRelease (reservationId){
			let reservation=this.get('reservations').find((element)=>{
				return element.get('id')===reservationId;
			});
			if(!reservation){
				Ember.Logger.debug('something went wrong reservation not found for ID:'+reservationId);
				return false;
			}
			reservation.deleteRecord();
			let s=reservation.save();
			this.get('loader').startLoadProcess(s);
			var c=this;
			s.then(()=>{
				this.get('store').query('reservation', {filters: {seat: this.get('seatId')}} ).then((data)=>{
					this.set('reservations',data);
					window.xappc.refreshSvg(this.get('model'));	
				}).catch(function(){
				});				
			}).catch((status)=>{
                c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-delete.'+status.responseText,status.text)});									
			});
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
					window.xappc.refreshSvg(this.get('model')); 
				}).catch(function(){
					
				});				
			},(error)=>{
				this.set('calendarOpen',false);				
				if(error.status===400){
                	c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-'+error.responseText)});									
				}else{
                	c.get('modal').openInfoModal({header:c.get('i18n').t('reservation.error-header'),text:c.get('i18n').t('reservation.error-text',error.responseText)});									
				}
			});
		},
		onCloseCalendar(){
			this.set('calendarOpen',false);
		}
	}
});
