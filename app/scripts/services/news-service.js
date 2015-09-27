angular.module('app.services')

.service('newsService', ['httpUtils', "constants",'$localstorage', function(httpUtils, constants, $localstorage){
	
	return {
		getDSENews: function(page) {
			var reqUrl = constants.rootURL + 'api_news?page='+page;
			return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
		}
	};
}])
