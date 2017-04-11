import DS from 'ember-data';

export default DS.Model.extend({
	seat: DS.belongsTo('seat'),
	user: DS.attr('number'),
	createDt: DS.attr('date')
});
