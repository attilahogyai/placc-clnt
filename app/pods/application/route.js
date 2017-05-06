import Ember from 'ember';
import App from 'client/app';
export default Ember.Route.extend({
	actions: {
	    loading: function(transition/*, originRoute*/) {
  		  this.get('loader').startLoadProcess(transition.promise);
    		return true;
    	},
		error(error, transition) {
      		if (error) {
				var headers={};
				if(window.xappc.session){
					headers["Authorization"] = "Bearer "+window.xappc.session.get('token');
				}      			
				Ember.$.ajax({
					type: 'POST',
					url: '/error-notification',
					headers: headers,			
					data: {
						stack: error+" : "+error.stack,
						otherInformation: error.message
					}
				});
				Ember.Logger.error("error:"+error.message+"-> "+error.stack);
        		return this.transitionTo('errorPage');
      		}
    	}    	
    }
 });
