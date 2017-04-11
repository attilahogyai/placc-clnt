import Ember from 'ember';
import App from 'client/app';
export default Ember.Route.extend({
	model:function(params){
		return params;
	},
		
	setupController: function(controller, model) {
		controller.set('requestid', model.requestid);
  	}
});
