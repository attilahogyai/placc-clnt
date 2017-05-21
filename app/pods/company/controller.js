import Ember from 'ember';

export default Ember.Controller.extend({
	actualDate: null,
	level: null,
    actualDateS:Ember.computed('actualDate',function(){
    	if(this.get('actualDate')===null){
    		return 'date';
    	}
    	return this.get('actualDate').format('YYYYMMDD');
    }),

    init(){
    	this.set('actualDate',moment().add(1,'d'));
    },
    actions:{
    	onSelectDate (date){
    		this.set('actualDate',date);
    		this.transitionToRoute('company.level', this.get('level'), this.get('actualDateS'));
    	},
    	onSelectLevel (level){
    		this.set('level',level);
    		this.transitionToRoute('company.level', level, this.get('actualDateS'));
    	}
    }
});
