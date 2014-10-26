import Ember from 'ember';

export default Ember.ArrayController.extend({
	needs: ['application'],
	user: Ember.computed.alias("controllers.application.currentUser"),
	actions: {
		login:  function(){
			this.get('controllers.application').send('login');
		},
		logout:  function(){
			this.get('controllers.application').send('logout');
		}
	}
});
