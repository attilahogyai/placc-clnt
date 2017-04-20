import Ember from 'ember';


function findReservation(reservations,day) {
    for(var i=0;i<reservations.length;i++){
        var same=reservations[i].getRecord().get('targetDate').isSame(day);
        if(same){
            return reservations[i];
        }       
    }
    return 0;
}


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
    reservations: null,
    ownerId: null,



    items:Ember.computed('startDay','reservations',function(){
    	let start=this.get('startDay');
    	let days = [];
    	for(let i=0;i<7;i++){
            let d = start.clone().add(i,'days');
            let r=findReservation(this.get('reservations.content'),d);
            let owner = false;
            if(r){
                owner=parseInt(this.get('ownerId'))===r.getRecord().get('userId');
            }
    		days.push({date:d,reservation:r,owner:owner});
    	}      
    	return days;
    }),
    init(){
        this._super(...arguments);
        this.startDay = moment().startOf('isoWeek');
    },
    didInsertElement(){
        let self=this;
        Ember.run.scheduleOnce('afterRender', this, ()=>{
            this.$("#calendarModal").modal(self.get('options'));
            this.$("#calendarModal").modal('open');
        });
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
        release (reservation){
            this.get('onRelease')(reservation);
        },
        close (){
            this.get('onClose')();
        }

    }
});
