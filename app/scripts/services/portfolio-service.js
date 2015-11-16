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
		
		getCompanyDetail: function(company) {
			var reqUrl = constants.rootURL + 'api_users/company_details?company=' + company;
			return httpUtils.get(reqUrl, {},{'Token':$localstorage.getObject('userData').token}).promise;	
		}
	};
}])
