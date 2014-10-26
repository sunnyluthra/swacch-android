import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model){
		controller.send("getAllReports");
	}
});
