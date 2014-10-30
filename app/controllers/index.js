import Ember from 'ember';

export default Ember.ArrayController.extend({
	sortProperties: ['date'],
	sortAscending: false,
	needs: ['application'],
	reports: Ember.computed.alias("controllers.application.reports"),
	actions: {
		getAllReports: function(){
			this.get('controllers.application').send('getAllReports');
		}
	}
});
