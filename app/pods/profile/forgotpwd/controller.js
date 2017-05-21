import Ember from 'ember';
import {
  validator, buildValidations
} from 'ember-cp-validations';
import App from 'client/app';

const Validations = buildValidations({
  email: [validator('presence', {presence:true, message:' '}), validator('format', { type: 'email' })],
});

export default Ember.Controller.extend(Validations,{
	email: null,
	session: Ember.inject.service(),
    modal: 	Ember.inject.service(),
		i18n: Ember.inject.service(),

	actions:{
		sendResetPasswordEmail: function(){
			var reset=window.xappc.getData('/api/forgot',true,'POST',true,false,{
				email:this.get('email'),
				l: this.get('session.language')
			},null,null);
			var c=this;
			this.get('loader').startLoadProcess(reset);
			reset.then(()=>{
                c.get('modal').openInfoModal({header:'Password change request sent',text:this.get('i18n').t('forgot.requestsent')});
				c.transitionToRoute('profile.index');
			},()=>{
                c.get('modal').openInfoModal({header:'Password change request error',text:this.get('i18n').t('forgot.requestsent_error')});				
			});
			
		}
	}
});
