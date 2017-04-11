import Ember from 'ember';
import App from 'client/app';
export default Ember.Route.extend({
	actions: {
	    loading: function(transition/*, originRoute*/) {
  		  this.get('loader').startLoadProcess(transition.promise);
    		return true;
    	}
    }
 });
