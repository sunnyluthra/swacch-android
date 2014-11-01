import Ember from 'ember';
export
default Ember.ObjectController.extend({
	isLoading: false,
	needs: ['application'],
	user: Ember.computed.alias("controllers.application.currentUser"),
	isOwner: function() {
		return this.get('author.id') == this.get('controllers.application.currentUser.id');
	}.property('controllers.application.currentUser.id', 'author.id'),
	actions: {
		deleteReport: function() {
			var self = this;
			self.setProperties({isLoading: true, loadingMessage:'Deleting'});
			self.get('model').destroyRecord().then(function() {
				self.setProperties({isLoading: false, loadingMessage:''});
				self.transitionTo('index');
			}, function() {
				self.setProperties({isLoading: false, loadingMessage:''});
				self.get('model').rollback();
				navigation.notification.alert('Some error occurred while deleting the report.', function(){}, 'Error!', 'Ok');
			});
		}
	}
});