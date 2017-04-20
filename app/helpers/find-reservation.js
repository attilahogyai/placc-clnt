import Ember from 'ember';

export function findReservation(params/*, hash*/) {
	let reservation = params[0].get('content');
	var day = params[1];
	for(var i=0;i<reservation.length;i++){
		var same=reservation[i].record.get('targetDate').isSame(day);
		
		if(same){
			return reservation[i];
		}		
	}
	return 0;
}

export default Ember.Helper.helper(findReservation);
