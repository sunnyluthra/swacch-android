import Ember from 'ember';
import config from '../config/environment';

export default Ember.ArrayController.extend({
	needs: ['application'],
	image: Ember.computed.alias("controllers.application.image"),
	token: Ember.computed.alias("controllers.application.currentUser.token"),
	address: "",
	googleAddress: "",
	isUploading: false,
	actions: {
		getPosition: function(){
			var self = this;
			self.setProperties({'address':"", 'locError': ""});
			var onSuccess = function(position){
				self.setProperties({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
				$.get("https://maps.googleapis.com/maps/api/geocode/json", {"latlng":position.coords.latitude + "," + position.coords.longitude})
				.done(function(data){
					var gAddress = data.results[0];
					self.set('googleAddress', gAddress);
					self.set('address', gAddress.formatted_address);
				});
			};
			var onErr = function() {
				self.set("locError", true);
			};
			var geoOptions = {timeout: 20000, enableHighAccuracy: true, maximumAge: 5000};
			navigator.geolocation.getCurrentPosition(onSuccess, onErr, geoOptions);
		},
		upload: function(){
			var self = this;
			//start loading
			this.setProperties({isUploading: true, loadingMessage: 'Please wait, we are uploading your report.'});
			//upload options
			var options = new FileUploadOptions();
			var image = this.get('image');
			options.filekey = "picture";
			options.fileName = image.substr( image.lastIndexOf('/') + 1 );
			options.mimeType = "image/jpeg";
			options.params = {
				address: this.get('address'),
				google_address: JSON.stringify( this.get('googleAddress') ),
				description: this.get('description'),
				latitude: this.get('latitude'),
				longitude: this.get('longitude')
			};
			var headers = {'X-AUTHENTICATION-TOKEN': this.get('token')};
			options.headers = headers;
			var onSuccess = function(data){
				if(data.responseCode === 201){
					//sucess
					var store = self.get('store');
					var _res = JSON.parse(data.response);
					store.push('user', _res.users[0]);
					store.push('report', _res.reports[0]);
					self.transitionToRoute('index');
				}else{
					self.setProperties({
						isUploading: false,
						loadingMessage: ''
					});
				}
			};
			var onErr = function(){
					self.setProperties({
						isUploading: false,
						loadingMessage: ''
				});
				var errorMessage = 'Some error occurred while uploading the report.';
				navigator.notification.alert( errorMessage, null, 'Error!', 'Ok');
				
			};

			var ft = new FileTransfer();
	        ft.upload(image, encodeURI(config.APP.API_HOST + '/reports'), onSuccess, onErr, options);
		},
		login:  function(){
			this.get('controllers.application').send('login');
		}
	}
});
