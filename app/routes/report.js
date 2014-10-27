import Ember from 'ember';

export default Ember.Route.extend({
	model: function(param){
		return this.store.find('report', param.report_id);
	}
});