import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('building',{path:'building/:building_id'});
  this.route('level',{path:'level/:level_id'});
  this.route('profile',function(){
      this.route('index');
      this.route('places');
      this.route('signup');
      this.route('modify');
      this.route('forgotpwd');
      this.route('forgotpwchange',{ path: '/forgotpwchange/:requestid'});
  });
  this.route('terms');
  this.route('privacy');
  this.route('cpolicy');
  this.route('admin', {path: 'admin'},function() {
  this.route("language", {path: "language"}); 
  });
  this.route('company',{path:'company/:company_id'});
  this.route('activate',{path:'/activate/:code/:email'});
});

export default Router;
