import Ember from 'ember';
import config from '../config/environment';

export default Ember.ArrayController.extend({
	needs: ['application'],
	image: null,
	parent: null,
	token: Ember.computed.alias("controllers.application.currentUser.token"),
	isUploading: false,
	actions: {
		upload: function(){
			var self = this;
			//start loading
			this.setProperties({isUploading: true, loadingMessage: 'Please wait, we are uploading your report.'});
			//upload options
			var options = new FileUploadOptions();
			var image = this.get('image');
			var options = {};
			options.filekey = "picture";
			options.fileName = image.substr( image.lastIndexOf('/') + 1 );
			options.mimeType = "image/jpeg";
			options.params = {
				description: this.get('description'),
				parent_id: this.get('parent'),
				type: 'present_condition'
			};
			var headers = {'X-AUTHENTICATION-TOKEN': this.get('token')};
			options.headers = headers;
			alert(JSON.stringify(options));
			var onSuccess = function(data){
				if(data.responseCode === 201){
					//sucess
					self.transitionTo('index');
				}else{
					self.setProperties({
						isUploading: false,
						loadingMessage: ''
					});
				}
			};
			var onErr = function(error){
					self.setProperties({
						isUploading: false,
						loadingMessage: ''
				});
				var errorMessage = 'Some error occurred while uploading the report.';
				navigator.notification.alert( JSON.stringify(error), null, 'Error!', 'Ok');
				
			};

			var ft = new FileTransfer();
	        ft.upload(image, encodeURI(config.APP.API_HOST + '/reports'), onSuccess, onErr, options);
		},
		
		login:  function(){
			this.get('controllers.application').send('login');
		}
	}
});
