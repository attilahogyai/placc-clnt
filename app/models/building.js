import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	address: DS.attr('string'),
	city: DS.attr('string'),
	company: DS.belongsTo('company'),
	img: DS.attr('string'),
	level: DS.hasMany('level')
});