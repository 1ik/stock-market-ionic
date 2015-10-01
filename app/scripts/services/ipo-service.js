angular.module('app.services')

.service('ipoService', ['httpUtils', "constants",'$localstorage', function(httpUtils, constants, $localstorage){
	
	return {
		getChildAccounts: function() {
			var reqUrl = constants.rootURL + 'api_ipo/childAccounts';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		}
		/*
		sendFTReq: function(data) {
			console.log(data);
			var reqUrl = constants.rootURL + 'api_fundtransfer/saveRequest';
			var params = $.param(data);
			return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
		},
		*/
	};
}])
