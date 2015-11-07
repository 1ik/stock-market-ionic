angular.module('app.controllers')
.controller('AlertsController', ['$scope','pushService', function($scope,pushService){

	$scope.notifications = pushService.getNotifications();
	$scope.limit = 10;

}]);