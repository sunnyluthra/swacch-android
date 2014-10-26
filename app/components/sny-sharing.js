import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		fb_share: function(){
			var message = "Let's clean this mess. @SwacchApp ";
			// var subject = "From Swacch App";
			// var image = this.get('report_image');
			var link = "http://swacch.com/reports/" + this.get('report_id');
			window.plugins.socialsharing.shareViaFacebook(message, null, link);
		
		},
		tw_share: function(){
			var message = "Let's clean this mess. @SwacchApp ";
			// var subject = "From Swacch App";
			// var image = this.get('report_image');
			var link = "http://swacch.com/reports/" + this.get('report_id');
			window.plugins.socialsharing.shareViaTwitter(message, null, link);
		}
	}
});
