import DS from 'ember-data';

export default DS.Model.extend({
	level: DS.belongsTo('level'),
	name: DS.attr('string'),
	img_x: DS.attr('number'),
	img_y: DS.attr('number'),
	capacity: DS.attr('number'),
	createDt: DS.attr('date'),
	reservations: DS.hasMany('reservation'),
	myReservationCount: DS.attr('number'),
	reservationCount: DS.attr('number'),
	code: DS.attr('string')
});