import BaseValidator from 'ember-cp-validations/validators/base';
import Ember from 'ember';
const UniqueEmail = BaseValidator.extend({
  i18n: Ember.inject.service(),
  validate(value, options, model, attribute) {
    if(!value) return true;
      let id=model.get('id') || 0;
      var c=this;
    return window.xappc.getData("/api/common/check/email?email="+value+"&eId="+id,true,"GET",true,false,{}).then(function(result){
      if(result==='NULL') {
        return true;
      }else{

        return c.get('i18n').t("signup.alreadyexists")+' ';
      }
    });
  }
});

UniqueEmail.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
   * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default UniqueEmail;
