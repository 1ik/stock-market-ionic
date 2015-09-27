angular.module('app.controllers')
.controller('AlertSettingsController', ['$scope', 'settingsService', '$ionicPopup', '$state', '$ionicModal',
	function($scope, settingsService, $ionicPopup, $state, $ionicModal){
		
		settingsService.getAlertSettings().then(function(settings){
			$scope.settings = settings;
		});

		$scope.newSetting = {
			level : 'up',
			active: true
		}

		$scope.addSettings = function() {
			$state.go("app.settings.add-alerts");
		}

		$scope.submitAdd = function() {
			settingsService.createNewSettings($scope.newSetting).then(function(resp){
				$ionicPopup.alert({
					title: 'New Settings created',
					template: 'Your settings have been saved successfully.',
				}).then(function(res){
					$state.go("app.settings.index");
				});
			});
		}

		$scope.delete = function(setting) {
			var confirmPopUp = $ionicPopup.confirm({
				title: 'Delete Settings!',
				template: 'Are you sure that you want to completely delete this settings?',
				okText: "Yes"
			});
			confirmPopUp.then(function(confirmed){
				if(confirmed) {
					settingsService.removeSettings(setting).then(function(resp){
						$scope.settings = _.filter($scope.settings,function(s){
							return s.id != setting.id;
						});
						$ionicPopup.alert({
							title: 'Setting Deleted',
							template: 'Your setting have been deleted.',
						});
					}).catch(function(err){
						console.log(err);
					})
				}
			});
		}

		$scope.edit = function() {
			
		}
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
			console.log(company);
			$scope.company = company;
			$scope.newSetting.company_id = company.company_short_code;
			$scope.modal.hide();
		}
		
		$scope.companyName = function() {			
			if(_.isEmpty($scope.company)) {
				return "No company (Touch To select)";
			}
			return $scope.company.company_short_code + " (Touch to change)";
		}		

}]);