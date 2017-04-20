import DS from 'ember-data';

export default DS.Model.extend({
	seat: DS.belongsTo('seat'),
	user: DS.belongsTo('useracc'),
	userId: DS.attr('number'),
	targetDate: DS.attr('timestamp'), 
	createDt: DS.attr('timestamp'),
	status: DS.attr('number')
});
