import Ember from 'ember';
import ResetScrollMixin from 'ember-swacch/mixins/reset-scroll';

module('ResetScrollMixin');

// Replace this with your real tests.
test('it works', function() {
  var ResetScrollObject = Ember.Object.extend(ResetScrollMixin);
  var subject = ResetScrollObject.create();
  ok(subject);
});
