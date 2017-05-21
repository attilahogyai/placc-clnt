import Ember from 'ember';


export default Ember.Component.extend({
    options:{
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        opacity: 0.5, // Opacity of modal background
        inDuration: 200, // Transition in duration
        outDuration: 200, // Transition out duration
        ready: null, // Callback for Modal open
        complete: null, // Callback for Modal close
    },    
    startDay: null,
    ownerId: null,
    actualDate: null,


    items:Ember.computed('startDay','actualDate',function(){
    	let start=this.get('startDay');
    	let days = [];
        let today=moment();
        let actualDate=this.get('actualDate');
    	for(let i=0;i<7;i++){
            let d = start.clone().add(i,'days');
            let owner = false;
            let future=d.isAfter(today);
    		days.push({date:d,
                owner:owner,
                selected:(actualDate.diff(d, 'days')===0 && d.date()===actualDate.date()),
                future:future,
                inactive: d.isoWeekday()===6 || d.isoWeekday()===7 || !future
            });
    	}      
    	return days;
    }),
    prevInactive:Ember.computed('startDay',function(){
        return moment().startOf('isoWeek').isSame(this.get('startDay'));
    }),
    nextInactive:Ember.computed('startDay',function(){
        return this.get('startDay').diff(moment(), 'days') + moment().isoWeekday() >= 7;
    }),

    init(){
        this._super(...arguments);
        this.startDay = moment().startOf('isoWeek');
    },
    willDestroyElement() {
        this.$("#calendarModal").modal('close');        
    },
    actions:{
        nextWeek (){
            let d = this.get('startDay').clone().add(7,'days');
            this.set('startDay',d);
        },
        prevWeek (){
            let d = this.get('startDay').clone().subtract(7,'days');
            this.set('startDay',d);
        },
        reserv (day){
            this.get('onReserv')(day);
        },
        select (date){
            this.get('onSelectDate')(date);        	
        }

    }
});
