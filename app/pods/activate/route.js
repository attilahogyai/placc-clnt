import Ember from 'ember';
export default Ember.Route.extend({
	setupController: function(controller, model) {
		var activate=window.xappc.getData('/api/activateuser/'+model.code+"/"+model.email,true,'GET',true,false,{},null,null);
		activate.then(function(){
			controller.set('activated',true);
		},function(){
			controller.set('activated',false);
		});
	}
});
