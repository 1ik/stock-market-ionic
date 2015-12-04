angular.module('app.controllers').controller(
	'MarketInfoController', ['$scope', 'companyService', '$localstorage', '$ionicPopup', function($scope, companyService, $localstorage, $ionicPopup){

		$scope.search = {
			companyName: ""
		}

		$scope.source = [];
		$scope.companies = [];
		
		$scope.loading = true;
		
		$scope.fetchData = function() {
			$scope.loading = true;
			companyService.getCompanies("").then(function(data){
				$scope.loading = false;
				$scope.companies = data;
				$scope.source = data;
				$scope.marketInfoTitle = "Market Info (" + $scope.companies[0].update_date + ")";
				$localstorage.setObject('marketInfo',{marketInfo : data});
			});
		}
		$scope.fetchData();


		$scope.$watch('search', function(newV,oldV) {
			companyName = newV.companyName.toLowerCase();
			
			if(companyName == "") {
				return;
			}

			comps = _.reject($scope.source,function(cmp){
				return cmp.company.toLowerCase().indexOf(companyName) == -1;
			});

			$scope.companies = comps;
		},true);

		$scope.refresh = function() {
			$scope.fetchData();
		}

		$scope.openCompany = function(company) {
			$ionicPopup.alert({
				title: company.company,
				template: '<div class="list">
						<a class="item item-avatar">
							<h2>Trade</h2>
							<p>'+company.trade+'</p>
						</a>
						<a class="item item-avatar">
							<h2>Value</h2>
							<p>'+company.value+'</p>
						</a>
						<a class="item item-avatar">
							<h2>Volume</h2>
							<p>'+company.volume+'</p>
						</a>
						<a class="item item-avatar">
							<h2>Change</h2>
							<p>'+company.change+'</p>
						</a>
					</div>'
			});
		}
		
}]);