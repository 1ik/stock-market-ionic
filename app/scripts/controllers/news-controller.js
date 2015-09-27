angular.module('app.controllers').controller(
	'NewsController', ['$scope', 'newsService', function($scope,newsService){
	
		$scope.page = 1;
		$scope.moreText = "SHOW MORE";

		$scope.fetchNews = function() {
			newsService.getDSENews($scope.page).then(function(news){
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