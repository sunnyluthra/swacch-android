import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		var data = this.store.all('report');
		if(!data.get("length")){
			data = this.store.find('report');
		}
		
		return data;
	}
});
