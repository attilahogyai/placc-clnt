import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});


Ember.onerror = function(error) {
	var status = (error.errors && error.errors[0].status) || error.status;
	var errors = (error.errors && error.errors[0].code) || 'general';
	if(status=='400'){
		Ember.Logger.info("bad request json:"+error.statusText);		
	}else if(status=='403'){
		Materialize.toast('<span style="font-size:1.2em;white-space:nowrap;max-width:800px;">Sorry, accessing this content is denined! Please sign in to access this content!<span>', 10000,"",function(){/*window.xappc.reload();*/});
		Ember.Logger.error("error:"+status+":"+error.statusText);
	}else if(status=='417'){
		Materialize.toast('<span style="font-size:1.2em;white-space:nowrap;max-width:800px;">Expectation Failed, reloading session in progress!<span>', 10000,"",function(){/*window.xappc.reload(true);*/});
		Ember.Logger.error("error:"+status+":"+error.statusText);		
	}else if(status=='404'){
		Materialize.toast('<span style="font-size:1.2em;white-space:nowrap;max-width:800px;">Sorry, The requested content was not found!', 10000,"",function(){/*window.xappc.reload();*/});
		Ember.Logger.error("error:"+status+":"+error.statusText);		
	}else{
		var headers={};
		if(window.xappc.session){
			headers["Authorization"] = "Bearer "+window.xappc.session.get('token');
		}
		Ember.$.ajax({
			type: 'POST',
			url: '/error-notification',
			headers: headers,			
			data: {
				stack: error+" : "+error.stack,
				otherInformation: error.message
			}
		});
		if(errors==='general'){
			Materialize.toast('<span style="font-size:0.8em;white-space:nowrap;max-width:800px;">Operation failed. Try later or <a href="javascript:document.location.reload();">refresh!</a></span>', 6000);
		}else{
			let t='Application error:'+errors;
			Materialize.toast('<span style="font-size:0.8em;white-space:nowrap;max-width:800px;">'+t+'</span>', 6000);			
		}	

		if(error.message){
			Ember.Logger.error("error:"+error.message+"-> "+error.stack);
		}else{
			Ember.Logger.error("error:"+error);
		}
		//console.log("error:"+error+" : "+error.stack);
	}
};





window.xappc = {
	reload:function(clean){
		if(clean){ 
			if(window.localStorage) window.localStorage.clear();
		}
		Ember.run.schedule('afterRender',function(){
	        var n = window.location.href.indexOf("#");
	    	window.location.href=window.location.href.substring(0,n);
		});
	},
	getData:function(url,async,type,processdata,cache,data,success,error){

		if(url.indexOf('ext:')===0){
			url = 'https://myplacc.hu' + url.substring(3,url.length);		
		}else{

			url = url.charAt(0)==='/'?url:'/'+url;
		}
		Ember.$.ajaxSetup({async:async});
		var headers={};
		if(window.xappc.session){
			headers["Authorization"] = "Bearer "+window.xappc.session.get('token');
		}
		return Ember.$.ajax({
			type: type,
			data: data,
			url: url,
			headers: headers,
			processdata: processdata,
			cache: cache,
			success:success,
			error: error
		});
	},
	session: null,
	appInstane: null,
	i18n: null,	
};


loadInitializers(App, config.modulePrefix);

export default App;
