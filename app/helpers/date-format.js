import Ember from 'ember';

export function dateFormat(params/*, hash*/) {
	let date = params[0];
	let format = params[1];

	if(typeof date === 'string'){
		date=moment(date);
	}
	if(format==='fromNow'){
		return date.fromNow();
	}
	if(date && date.format) {
		return date.format(format);
	}
	return '';
}

export default Ember.Helper.helper(dateFormat);
