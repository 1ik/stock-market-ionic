angular.module('app.services')

.service('portfolioService', ['httpUtils', '$http', "$q", "constants",'$localstorage', function(httpUtils, $http, $q, constants, $localstorage){
	// rootURL = constants.rootURL;
	var mock = constants.mock;
	return {
		
		addPortfolio: function(data) {
			var reqUrl = constants.rootURL + 'api_users/setShareBalance';
			var params = $.param(data);
			return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
		},
	
		getStatus: function(data){
			var reqUrl = constants.rootURL + 'api_users/portfolio';
			return httpUtils.get(reqUrl, {},{'Token':$localstorage.getObject('userData').token}).promise;
		},
		
		getShareBalance: function(){
			var reqUrl = constants.rootURL + 'api_users/shareBalance';
			return httpUtils.get(reqUrl, {},{'Token':$localstorage.getObject('userData').token}).promise;
		},
		
		test: function(){
			console.log('again')
			console.log('testing')
			var reqUrl = 'http://ksclbd.com/api/index.php/api_users/test'
			// var params = 'company=”some value”&quantity=”some value”&matured_quantity=”some value”&buy_average=”some value”&breakeven_average=”some value”&buy_value=”some value”'
			return httpUtils.get(reqUrl, {},{'Token':'55f35ad5294d36.52045325'}).promise;
		}
	};
}])
