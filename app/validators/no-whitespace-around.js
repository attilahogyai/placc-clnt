import BaseValidator from 'ember-cp-validations/validators/base';

const NoWhitespaceAround = BaseValidator.extend({
  validate(value, options, model, attribute) {
    return value.indexOf(' ')==-1;
  }
});

NoWhitespaceAround.reopenClass({
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

export default NoWhitespaceAround;
