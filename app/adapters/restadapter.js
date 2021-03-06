import DS from 'ember-data';

var RestAdapter=DS.RESTAdapter.reopen({
	namespace:"/api",
	ajaxOptions: function(url, type, hash){
		if(url.indexOf('?')===-1){
			url+='?l='+this.get('session.language');
		}else{
			url+='&l='+this.get('session.language');
		}
    	var s=this.get('session.solution');

		if(s){
			this.set('session.solution',null);
			url=url+"&s="+s;	
		}
		var retv=this._super(url,type,hash);

		var token=this.get('session.token');
		retv.beforeSend = function (xhr) {
			if(token){
     			xhr.setRequestHeader("Authorization", "Bearer "+token);
     		}
        };
        return retv;
  	},
	ajax: function(url, type, options) {
		var retv=this._super(url,type,options);
		retv.catch(function(response){
			if(parseInt(response.status)===401){
				window.xappc.reload();
			}
		});
    	return retv;
  	}
});
export default RestAdapter;