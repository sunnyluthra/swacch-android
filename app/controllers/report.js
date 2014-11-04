import Ember from 'ember';
export
default Ember.ObjectController.extend({
	isLoading: false,
	needs: ['application', 'present-condition'],
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
				self.transitionToRoute('index');
			}, function(data) {
				self.setProperties({isLoading: false, loadingMessage:''});
				self.get('model').rollback();
				var errorMessage = 'Some error occurred while deleting the report.';
				navigator.notification.alert(errorMessage, function(){}, 'Error!', 'Ok');
			});
		},
		takePhoto: function() {
			var self = this;
			var pictureSource = navigator.camera.PictureSourceType;
			var destinationType = navigator.camera.DestinationType;
			var options = {
				quality: 80,
				saveToPhotoAlbum: true,
				destinationType: destinationType.FILE_URI,
				targetWidth: 1024,
				targetHeight: 1024,
				aspectX: 1,
				aspectY: 1
			};
			var onSuccess = function(imageURI) {
				self.setProperties({
					'controllers.present-condition.image': imageURI,
					'controllers.present-condition.parent' : self.get('model.id')
				});
				self.transitionToRoute("present-condition");
			};
			var onFail = function(message) {};
			navigator.camera.getPicture(onSuccess, onFail, options);
		}
	}
});