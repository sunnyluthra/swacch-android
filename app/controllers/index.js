import Ember from 'ember';
export
default Ember.ArrayController.extend({
	sortProperties: ['id'],
	sortAscending: false,
	needs: ['application'],
	//reports: Ember.computed.alias("controllers.application.model"),
	actions: {
		getAllReports: function() {
			var _model = this.get('model');
			var store = this.get('store');

			var reports = store.find('report', {
				time: jQuery.now()
			});
			this.set('model', reports);
		}
	}
});