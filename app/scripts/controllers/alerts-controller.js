angular.module('app.controllers')
.controller('AlertsController', ['$scope','pushService', function($scope,pushService){

	$scope.notifications = pushService.getNotifications();
	console.log($scope.notifications);
	$scope.limit = 10;

}]);