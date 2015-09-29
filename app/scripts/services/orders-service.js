angular.module('app.services')

.service('ordersService', ['httpUtils', "constants", '$localstorage',"$q", function(httpUtils, constants, $localstorage, $q){
	
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

		saveOrder: function(order) {
			var params = $.param(order);
			var reqUrl = constants.rootURL + 'api_orders/saveOrder';
			// var dfd = $q.defer();
			// dfd.resolve({});
			// return dfd.promise;
			return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
		}
	};
}])
