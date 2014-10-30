import Ember from 'ember';
import config from '../config/environment';
export
default Ember.ArrayController.extend({
	currentUser: false,
	image: false,
	currentUserChanged: function() {
		localStorage.currentUser = JSON.stringify(this.get('currentUser'));
	}.observes('currentUser'),
	actions: {
		login: function() {
			var self = this;
			facebookConnectPlugin.login(["email"], function(response) {
				var token = response.authResponse.accessToken;
				var data = {
					access_token: token
				};
				$.post(config.APP.API_HOST + '/login/fb', data, function(data) {
					if (data.token) {
						self.set('currentUser', data);
					}
				}).fail(function(xhr, textStatus, errorThrown) {
					alert(xhr.responseText);
				});
			}, function(response) {
				alert(JSON.stringify(response));
			});
		},
		logout: function() {
			this.set('currentUser', false);
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
				self.set('image', imageURI);
				self.transitionTo("upload");
			};
			var onFail = function(message) {};
			navigator.camera.getPicture(onSuccess, onFail, options);
		}
	},
	getAllReports: function() {
		this.set('reports', false);
		var store = this.get('store');
		var reports = store.find('report', {
			time: jQuery.now()
		});
		this.set('reports', reports);
	}
});