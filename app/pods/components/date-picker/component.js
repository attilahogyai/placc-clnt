import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement: function(){
		this.$('.datepicker').pickadate({
    		selectMonths: false, // Creates a dropdown to control month
    		selectYears: 1 // Creates a dropdown of 15 years to control year
  		});
	}
});
