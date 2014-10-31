import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application'],
	user: Ember.computed.alias("controllers.application.currentUser")
});
