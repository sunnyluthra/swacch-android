import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller){
		var $style = "<style>";
		$style += ".feed .media{height:"+$(window).width()+"px }";
		$style += "</style>";
		$('head').append($style);
		if(localStorage.currentUser){
			controller.set('currentUser', JSON.parse(localStorage.currentUser));
		}
	}
});
