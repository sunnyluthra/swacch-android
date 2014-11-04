import Ember from 'ember';
export
default Ember.Component.extend({
	isOwner: function() {
		return this.get('user_id') === parseInt(this.get('post_author'));
	}.property('user_id', 'post_author'),
	actions: {
		deleteReport: function() {
			var self = this;
			self.get('report').destroyRecord().then(function() {})
			.catch(function(){
				self.get('report').rollback();
			});
		}
	}
});