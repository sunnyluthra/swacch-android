import Ember from 'ember';

export default Ember.ArrayController.extend({
	sortProperties: ['date'],
	sortAscending: false,
	needs: ['application'],
	reports: Ember.computed.alias("controllers.application.model"),
	actions: {
		getAllReports: function(refresh){
			this.get('controllers.application').send('getAllReports', refresh);
		}
	}
});
