import Ember from 'ember';

export default Ember.Route.extend({
	
    i18n: Ember.inject.service(),
	model(params) {
		return this.get('store').findRecord('level', params.level_id );
	}
});
