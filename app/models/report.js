import DS from 'ember-data';

export default DS.Model.extend({
	image: function(){
		var image = this.get('image_thumbnail') ? this.get('image_thumbnail') : this.get('image_medium') ? this.get('image_medium') : this.get('image_large') ? this.get('image_large') : this.get('image_full');
		return image;
	}.property('image_full', 'image_medium', 'image_thumbnail', 'image_large'),
	author: DS.belongsTo("user", {async: true}),
	date: DS.attr("date"),
	description: DS.attr("string"),
	address: DS.attr("string"),
	status: DS.attr("string"),
	comment_status: DS.attr("string"),
	parent: DS.attr("number"),
	comment_count: DS.attr("number"),
	latitude: DS.attr("string"),
	longitude: DS.attr("string"),
	attachment_id: DS.attr("number"),
	is_spam: DS.attr("number"),
	image_full: DS.attr("string"),
	image_medium: DS.attr("string"),
	image_thumbnail: DS.attr("string"),
	image_large: DS.attr("string"),
});
