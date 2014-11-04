import Ember from 'ember';
import resetScroll from '../mixins/reset-scroll';
export default Ember.Route.extend(resetScroll, {
	model: function(param){
		return this.store.find('report', param.report_id);
	}
});