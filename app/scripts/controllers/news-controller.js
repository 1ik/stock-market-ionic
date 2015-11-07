angular.module('app.controllers').controller(
	'NewsController', ['$scope', 'newsService', function($scope,newsService){
	
		$scope.page = 1;
		$scope.moreText = "FETCHING NEWS..";

		$scope.bn24News = [];
		
		newsService.getBNNews().then(function(data){
			$scope.bn24News = data;
		});

		$scope.fetchNews = function() {
			newsService.getDSENews().then(function(news){
				$scope.newsItems = news;
				$scope.moreText = "SHOW MORE";
			}).catch(function(error){
				console.log(error);
			});
		}

		$scope.fetchNews();

		$scope.showMore = function() {
			$scope.page++;
			$scope.moreText = "Fetching more News";
			$scope.fetchNews();
		}
}]);