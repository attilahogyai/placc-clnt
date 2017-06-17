import Ember from "ember";
/*global Cookies*/
export default Ember.Service.extend({
    browserName: '',
    fullVersion: '',
    majorVersion: '',
    agent:'',
    userForceEnter:false,

    init() {
        var nAgt = navigator.userAgent;
        var browserName = navigator.appName;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // In Opera, the true version is after "OPR" or after "Version"
        if ((verOffset = nAgt.indexOf("OPR")) !== -1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) !== -1){
                fullVersion = nAgt.substring(verOffset + 8);
            }
        } else if ((verOffset = nAgt.indexOf("Edge")) !== -1) {
            browserName = "Edge";
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) !== -1){
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = nAgt.substring(verOffset + 5);
        }
        // In Chrome, the true version is after "Chrome" 
        else if ((verOffset = nAgt.indexOf("CriOS")) !== -1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) !== -1){
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset + 7);
        }
        // In Safari, the true version is after "Safari" or after "Version" 
        else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) !== -1){
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }
        // In Firefox, the true version is after "Firefox" 
        else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset + 8);
        }
        // In most other browsers, "name/version" is at the end of userAgent 
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
            (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);

            if (Ember.compare(browserName.toLowerCase(),browserName.toUpperCase()) === 0) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) !== -1){
            fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(" ")) !== -1){
            fullVersion = fullVersion.substring(0, ix);
        }

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        this.set('browserName', browserName);
        this.set('fullVersion', fullVersion);
        this.set('majorVersion', majorVersion);
        this.set('agent',nAgt);
    },

    getBrowser() {
        return this.get('browserName');
    },

    getVersion() {
        return this.get('fullVersion');
    },

    getMajorRelease() {
        return this.get('majorVersion');
    },

    getAgent(){
        return this.get('agent');
    },

    setUserForceEnter(){
        this.set('userForceEnter',true);
    },

    isUserForceEnter(){

        var userCookie = Cookies.getJSON('user_access');
        if (userCookie) {
            var cookieForceEnter = userCookie.forceEnter;
            if(cookieForceEnter){
                return cookieForceEnter;
            }
        }

        return this.get('userForceEnter');
    },

    isSupportedBrowser() {
        var browser = this.get('browserName');
        var majorRelease = this.get('majorVersion');

        var isSupported = false;
        if (Ember.compare(browser, 'Chrome') === 0 && majorRelease >= 40) {
            isSupported = true;
        } else if (Ember.compare(browser, 'Firefox') === 0 && majorRelease >= 42) {
            isSupported = true;
        } else if (Ember.compare(browser, 'Edge') === 0) {
            isSupported = true;
        }

        return isSupported;
    }
});