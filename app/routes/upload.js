import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller){
		controller.setProperties({
			'address':"", 
			'locError': "",
			'googleAddress': "",
			'isUploading': false
		});
		controller.send('getPosition');
		
	}
});
