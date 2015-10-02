angular.module('app.services')

.service('ipoService', ['httpUtils', "constants",'$localstorage', function(httpUtils, constants, $localstorage){
	
	return {
		getChildAccounts: function() {
			var reqUrl = constants.rootURL + 'api_ipo/childAccounts';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		},

		getIpoWithdrawals: function(params) {
			var reqUrl = constants.rootURL + 'api_ipo/childAccounts';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		},

		saveWithdrawalReq: function(data) {
			var reqUrl = constants.rootURL + 'api_ipo/saveWithdraw';
			var params = $.param(data);
			return httpUtils.post(reqUrl, params, {'Token':$localstorage.getObject('userData').token}).promise;
		},

		getPendingIpoApplications: function(data) {
			var reqUrl = constants.rootURL + 'api_ipo/pendingApplications';
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		}
	};
}])
