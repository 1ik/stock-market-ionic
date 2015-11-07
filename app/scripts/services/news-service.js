angular.module('app.services')

.service('newsService', ['httpUtils', "constants",'$localstorage', function(httpUtils, constants, $localstorage){
	
	return {
		getDSENews: function() {
			var reqUrl = constants.rootURL + 'api_news/getDSENews';
			return httpUtils.get(reqUrl, {}, {}).promise;
		},

		getBNNews: function() {
			var reqURL = constants.rootURL + 'api_news/getBNNews';
			return httpUtils.get(reqURL,{},{}).promise;
		}
	};
}])
