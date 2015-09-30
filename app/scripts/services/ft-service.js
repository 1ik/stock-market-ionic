angular.module('app.services')

.service('ftService', ['httpUtils', "constants",'$localstorage', function(httpUtils, constants, $localstorage){
	
	return {
		getFTRequests: function() {
			var reqUrl = constants.rootURL + 'api_fundtransfer/status';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		},

		sendFTReq: function(data) {
			console.log(data);
			var reqUrl = constants.rootURL + 'api_fundtransfer/saveRequest';
			var params = $.param(data);
			return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
		},
	};
}])
