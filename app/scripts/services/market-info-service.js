angular.module('app.services')

.service('marketInfoService', ['httpUtils', "constants",'$localstorage', function(httpUtils, constants, $localstorage){
	
	return {
		getMarketInformations: function() {
			var reqUrl = constants.rootURL + 'api_market/market_informations';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		}
	};
}])
