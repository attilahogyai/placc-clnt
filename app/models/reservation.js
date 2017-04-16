import DS from 'ember-data';

export default DS.Model.extend({
	seat: DS.belongsTo('seat'),
	user: DS.attr('number'),
	targetDate: DS.attr('date'), 
	createDt: DS.attr('date')
});
