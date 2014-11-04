import Ember from 'ember';
export
default Ember.ArrayController.extend({
	sortProperties: ['id'],
	sortAscending: false,
	needs: ['application'],
	loadMoreLoading: false,
	noMorePosts: false,
	actions: {
		getAllReports: function() {
			var store = this.get('store');
			store.unloadAll('report');
			var reports = store.find('report');
			this.setProperties({
				'noMorePosts' : false,
				'model' : reports
			});

		},
		loadMore: function(){
			var self = this;
			self.set('loadMoreLoading', true);
			var reports = self.get('store').all('report');
			var last_record = reports.objectAt( reports.get('length') - 1 );
			var last_id = last_record.get('id');
			if(last_id){
				self.get('store').find('report', {last_seen: last_id})
				.then(function(){
					self.set('loadMoreLoading', false);
				}, function(error){
					self.set('loadMoreLoading', false);
					if(error.status === 404){
						self.set('noMorePosts', true);
					}else{
						navigator.notification.alert( "Some Error Occurred.", null, 'Error!', 'Ok');
					}
				});
			}
		}
	}
});