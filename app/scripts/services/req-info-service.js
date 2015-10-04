angular.module('app.services')

.service('reqInfoService', ['httpUtils', "constants",'$localstorage', function(httpUtils, constants, $localstorage){
	
	return {
		getReqInfos: function() {
			var reqUrl = constants.rootURL + 'api_ipo/requests';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		},

		saveNewReqInfo: function(data) {
			var reqUrl = constants.rootURL + 'api_ipo/saveRequest';
			var params = $.param(data);
			return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
		}
	};
}])
