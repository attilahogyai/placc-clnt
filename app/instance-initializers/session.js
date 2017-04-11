import Ember from 'ember';


export function initialize( appInstance ) {
  let store=appInstance.lookup('service:store');
  let modal=appInstance.lookup('service:modal');

  let session=appInstance.lookup('service:session');
  window.xappc.session=session;
  window.xappc.appInstance= appInstance;
  store.findAll('session').then(function(sessioRecords){
    if(sessioRecords.get('length')===0){ // request new session
      window.xappc.getData('/api/token',false,'POST',true,false,{},function(data) {
        if(data.access_token){

          let sessionInfo=store.createRecord('session',{});
          window.xappc.session.updateSessionModel(data, sessionInfo);

          sessionInfo.save().then(
          function (/*status*/){

            window.xappc.session.setup(sessionInfo);
              /** fingerprint check
            Ember.run.later(function(){
              new Fingerprint2().get(function(fingerprint){
                App.getData('/ping',true,'POST',false,false,{1:fingerprint},function(fp) {
                    // update session 
                    var oldToken=sessionInfo.get('token');
                    if(oldToken!==fp.access_token){
                      modal.openInfoModal({header:App.locX('/token/old_found_header'), text:App.locX('/token/old_found_text'),
                          action:function(){
                            App.session.updateSessionModel(fp).then(function(){
                              App.reload();      
                            });
                      }});
                    }
                });
              });              
            },2000);
            */
          });
        }
      });

    }else{
      window.xappc.session.setup(sessioRecords.get('firstObject'));
      window.xappc.getData('/api/ping',true,'POST',false,false,{},function(data) {
        if(data!=="OK"){
          window.localStorage.clear();
          window.xappc.reload();
        }
      },function(status){
        if(parseInt(status.status)===403){ // token not found or expired
          Ember.Logger.debug('token expired request new');
          window.localStorage.clear();          
           window.xappc.reload();
        }
        
      });
    }
  });
}

export default {
  name: 'create-session',
  initialize
};
