import Ember from "ember";
import App from "client/app";
export default Ember.Component.extend({
	tagName:"",
	noResultText: window.xappc.i18n.t('list.no_item'),
	enableEditLink: false,
	enableNoItemLink: true,
	actions:{
		infinityLoad() {
	      this.sendAction('infinityLoad');
	    }
	}

});