angular.module('app.services')

.service('ordersService', ['httpUtils', "constants", '$localstorage', function(httpUtils, constants, $localstorage){
	
	return {

		getOrders : function(query) {
			var params = $.param(query);
			var reqUrl = constants.rootURL + 'api_orders/orders?' + params;
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		},

		getCompanies : function(action) {
			var reqUrl = constants.rootURL + 'api_orders/companies?action=' + action;
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		},
	};
}])
