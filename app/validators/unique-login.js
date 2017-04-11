import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

export default BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, options, model, attribute) {
  	if(!value) return true;
    let id=model.get('id') || 0;
  	return window.xappc.getData("/api/common/check/login?login="+value+"&eId="+id,true,"GET",true,false,{}).then(function(result){
		if(result==='NULL') {
			return true;
		}else{
			return window.xappc.i18n("signup.alreadyexists");
		}
  	});
  }
});