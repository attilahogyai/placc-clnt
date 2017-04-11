import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	img: DS.attr('string'),
	building: DS.hasMany('building')
});
