import Ember from "ember";

export default Ember.Component.extend({
	options:{
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 300, // Transition out duration
      ready: null, // Callback for Modal open
      complete: null, // Callback for Modal close
    },
	didInsertElement:function(){
		let self=this;
		Ember.run.scheduleOnce('afterRender', this, function() {
			self.$("#infoModal").modal(self.get('options'));
			self.$("#infoModal").modal('open');
		});
	},
	actions:{
		close:function(){
			this.$("#infoModal").modal('close');
			var c=this;
			Ember.run.later(function(){
				c.sendAction('closeModal');
				if(c.get('model.action')){
					c.get('model.action').call();
				}
			},300);
		}
	}
});