import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model){
		if(!controller.get('reports')){
			controller.send("getAllReports");
		}
	}
});
