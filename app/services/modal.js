import Ember from 'ember';

export default Ember.Service.extend({
	showModal: false,
	modalName: null,
	modalModel: null,
	openInfoModal:function(data){
		this.set('modalName','info-modal');
		this.set('modalModel',data);
		this.set('showModal',true);
	},
	openConfirmModal:function(data){
		this.set('modalName','confirm-modal');
		this.set('modalModel',data);
		this.set('showModal',true);
	},
	openQuestionSavedModal:function(data){
		this.set('modalName','question-saved');
		this.set('modalModel',data);
		this.set('showModal',true);
	},
	toast:function(text){
		Materialize.toast('<span style="font-size:0.8em;white-space:nowrap;max-width:800px;">'+text+'</span>', 6000);
	}	
});
