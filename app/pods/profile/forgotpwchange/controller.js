import Ember from 'ember';
import App from 'client/app';
export default Ember.Controller.extend({
    session: Ember.inject.service(),
    modal: 	Ember.inject.service(),
    requestid: '',
    i18n: Ember.inject.service(),
    actions:{
        forgotPassword:function(email, newpPassword){
            var reset=window.xappc.getData('/api/forgotchange',true,'POST',true,false,{
                email: email,
                new_password:newpPassword,
                requestid: this.get('requestid')
            },null,null);

            var self=this;

            reset.then(()=>{
                self.get('modal').openInfoModal({header:this.get('i18n').t('profile.password_changed_header'),text:this.get('i18n').t('profile.password_changed'), action:function(){
                    self.transitionToRoute('profile.index');
                }});
            },(cause)=>{
                self.get('modal').openInfoModal({header:this.get('i18n').t('profile.password_change_error'),text:''});                
            });
            return reset;
        }
    }
});
