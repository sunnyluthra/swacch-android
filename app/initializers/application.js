export var initialize = function(container, application) {
  //application.deferReadiness();
  document.addEventListener('deviceready', function(){
  	application.advanceReadiness();
  });
};

export default {
  name: 'application',

  initialize: initialize
};
