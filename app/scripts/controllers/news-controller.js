angular.module('app.controllers').controller(
	'NewsController', ['$scope', 'newsService', '$localstorage', function($scope,newsService, $localstorage){
		$scope.showbn24 = false;
			
		$scope.page = 1;
		$scope.moreText = "FETCHING NEWS..";

		$scope.bn24News = [];
		if(_.isEmpty($localstorage.getObject('bn24').news)) {
			$scope.bn24News = $localstorage.getObject('bn24').news;
		}
		newsService.getBNNews().then(function(data){
			$scope.bn24News = data;
			$localstorage.setObject('bn24',{news:data});
		});

		$scope.newsItems = [];
		if(_.isEmpty($localstorage.getObject('dse').news)) {
			$scope.bn24News = $localstorage.getObject('dse').news;
		}
		newsService.getDSENews().then(function(news){
			$scope.newsItems = news;
			$localstorage.setObject('dse',{news:news});
		}).catch(function(error){
			console.log(error);
		});


}]);