export
default
function() {
	this.transition(this.fromRoute('index'), this.toRoute('report'), this.use('toLeft'));
	this.transition(this.fromRoute('report'), this.toRoute('index'), this.use('toRight'));
}