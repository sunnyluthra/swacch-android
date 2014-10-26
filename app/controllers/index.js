import Ember from 'ember';

export default Ember.ArrayController.extend({
	sortProperties: ['date'],
	sortAscending: false,
	actions: {
		getAllReports: function(){
			this.set('model', false);
			var store = this.get('store');
			var reports = store.find('report', {time: jQuery.now()});
			this.set('model', reports);
		}
	}
});
