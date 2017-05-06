import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
    isLoggedIn: Ember.computed.readOnly('session.isLoggedIn'),	
    username: Ember.computed.readOnly('session.username'),
    levels: Ember.computed('model',function(){
		let l=[];
		this.get('model').reservations.map(function(item){
			if(!l.find(function(i){ return i.name===item.seat.level.name})){
			l.push(item.seat.level);
			}
			return item.seat.level.name;
		})
		return l;
    })
});
