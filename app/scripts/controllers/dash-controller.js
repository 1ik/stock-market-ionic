angular.module('app.controllers').controller(
	'DashController', ['$scope', '$rootScope', function($scope, $rootScope){
	  $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
	    console.log(notification);
	  });
}]);