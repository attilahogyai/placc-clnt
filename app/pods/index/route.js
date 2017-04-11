import Ember from 'ember';
import QInfinityRoute from "client/utils/q-infinity-route";
import ENV from 'client/config/environment';
export default QInfinityRoute.extend({
  	appstate: Ember.inject.service(),

	model:function(){
		
		//var questionPromise=this.store.findAll('question');
		var companyPromise = this.infinityModel("company", { perPage: ENV.APP.perPage, startingPage: 1, filter:{}});
		if(!this.get('appstate.isMobile')){
			//latestQuestionPromise = this.store.query("question", { page:{limit:1,offset:1} , filter:{latest:true}});
		}

		return companyPromise;
	}
});
