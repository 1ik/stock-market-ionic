angular.module('app.controllers').controller(
	'NewsController', ['$scope', 'newsService', '$localstorage', function($scope,newsService, $localstorage){
		$scope.showProthomAlo = false;
		$scope.updating = true;
			
		$scope.page = 1;
		$scope.moreText = "FETCHING NEWS..";

		$scope.prothomAloNews = [];
		if(!_.isEmpty($localstorage.getObject('prothomAloNews').news)) {
			$scope.prothomAloNews = $localstorage.getObject('prothomAloNews').news;
		}

		newsService.getProthomAloNews().then(function(data) {
			$scope.updating = false;
			var eachNews = $(data).find('.each_news');
			var newsItems = [];
			_.each(eachNews,function(news){
				var n = {
					title: $(news).find('h2 a').html(),
					body: $(news).find('a.content_right').html(),
					time: $(news).find('div.additional_info span:nth-child(2)').html(),
					link: 'http://m.prothom-alo.com/' + $(news).find('h2 a').attr('href')
				}
				newsItems.push(n);
			});

			$scope.prothomAloNews = newsItems;
			$localstorage.setObject('prothomAloNews',{news:newsItems});
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

		$scope.openLink = function(link) {
			window.open(link,'_blank');
		}

}]);