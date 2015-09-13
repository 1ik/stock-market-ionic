angular.module('app.controllers')
	.controller('portfolioAddController', ['$scope','portfolioService',
		'$ionicPopup','companyService','$state','$ionicModal','$http', function($scope, portfolioService,
			$ionicPopup,companyService,$state, $ionicModal,$http){

		$scope.form = {};

		$scope.openSelectModal = function() {
			$ionicModal.fromTemplateUrl('templates/modals/company-selector.html', {
			    scope: $scope,
			    animation: 'slide-in-up',
			  }).then(function(modal) {
		    	$scope.modal = modal;
		    	$scope.modal.show();
		  	});
		}

		$scope.selectCompany = function(company) {
			$scope.company = company;
			$scope.modal.hide();
		}

		//adding for datas to portfolio
		$scope.addToPortfolio = function() {
			$scope.form.company = $scope.company.company_full_name;

			portfolioService.addPortfolio($scope.form).then(function(data){	
				var alertPopup = $ionicPopup.alert({
					title: 'Portfolio added successfully',
					template: 'You have added portfolio successfully.'
				});

				alertPopup.then(function() {
					$state.go("app.portfolio.statuses")
				});

			}).catch(function(data){
				
				var alertPopup = $ionicPopup.alert({
					title: 'Failed to add portfolio',
					template: 'Your request was invalid'
				});
				
				alertPopup.then(function() {
					$state.go("app.portfolio.statuses")
				});
			});
		}

		$scope.companyName = function() {			
			if(_.isEmpty($scope.company)) {
				return "No company (Touch To select)";
			}
			return $scope.company.company_full_name + " (Touch to change)";
		}

	}]);