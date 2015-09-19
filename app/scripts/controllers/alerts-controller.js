angular.module('app.controllers')
.controller('AlertsController', ['$scope','$localstorage', function($scope,$localstorage){
	$scope.alerts = $localstorage.getObject('alerts');
}]);