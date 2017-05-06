import Ember from 'ember';

function concat(params) {
	let r='';
	for(var i=0;i<params.length;i++){
		r+=params[i];
	}
	return r;	
}
export default Ember.Helper.helper(concat);
