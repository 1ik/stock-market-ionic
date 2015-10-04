angular.module('app.controllers').controller(
	'MarketInfoController', ['$scope', 'marketInfoService', function($scope, marketInfoService){
		
		marketInfoService.getMarketInformations().then(function(data){
			console.log(data);
		})
}]);