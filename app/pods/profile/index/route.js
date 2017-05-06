import Ember from 'ember';
import ENV from 'client/config/environment';

export default Ember.Route.extend({
	model:function(params,transition){
		return transition.resolvedModels.profile.pageSetup;
	}	
});
