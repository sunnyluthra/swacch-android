import Ember from 'ember';

function fromnowDate(value) {
	return moment(value).fromNow();
}

export {
	fromnowDate
};

export default Ember.Handlebars.makeBoundHelper(fromnowDate);
