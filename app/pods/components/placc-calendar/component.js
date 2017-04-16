import Ember from 'ember';

export default Ember.Component.extend({
	calDaysLabels : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	calMonthsLabels : ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'],
    calDaysInMonth : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    startDay: moment().startOf('isoWeek'),
    days:Ember.computed(function(){
    	let start=this.get('startDay');
    	let days = [];
    	for(let i=1;i<=7;i++){
    		days.push(start.day(i));
    	} 
    	return days;
    })
});
