import DS from 'ember-data';
import config from '../config/environment';
export
default DS.RESTAdapter.extend({
	coalesceFindRequests: true,
	host: config.APP.API_HOST,
	ajax: function(url, type, hash) {
		hash = hash || {};
		hash.headers = hash.headers || {};
		if (localStorage.currentUser) {
			alert(localStorage.currentUser);
			var currentUser = JSON.parse(localStorage.currentUser)
			hash.headers['X-AUTHENTICATION-TOKEN'] = currentUser.token;
		}
		return this._super(url, type, hash);
	}
});