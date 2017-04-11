import Ember from 'ember';


export function initialize(appInstance) {
    var i18n = appInstance.lookup('service:i18n');
    var modal = appInstance.lookup('service:modal');
    window.xappc.i18n=i18n;

    //appInstance.deferReadiness();
    Ember.$.ajaxSetup({
        async: false
    });
    Ember.$.getJSON("/common/langtext", function(langtext) {
        for (var i = 0; i < langtext.length; i++) {
            let t = {};
            t[langtext[i]['type'] + '.' + langtext[i]['code']] = langtext[i]['text'];
            i18n.addTranslations(langtext[i]['language'], t);
        }
    });
    Ember.Logger.info('INIT Language DONE');
    Ember.$.ajaxSetup({
        async: true
    });
    //appInstance.advanceReadiness();

}

export default {
    name: 'language',
    initialize
};