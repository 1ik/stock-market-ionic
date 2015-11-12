angular.module('app.controllers')
.controller('AlertSettingsController', ['$scope', 'settingsService', '$ionicPopup', '$state', '$ionicModal',
	'$stateParams', 'portfolioService', 'companyService', '$localstorage',
	function($scope, settingsService, $ionicPopup, $state, $ionicModal, $stateParams, portfolioService,companyService, $localstorage){
		
		$scope.settings = $localstorage.getObject('alertSettings').settings;

		
		var alertSettings = settingsService.getAlertSettings();

		$scope.loading = true;
		alertSettings.then(function(settings){			
			$scope.loading = false;
			if(settings == "null") {
				$scope.settings = [];	
			} else {
				$scope.settings = settings;
				$localstorage.setObject('alertSettings', {settings:settings});
			}			
		});

		portfolioService.getShareBalance().then(function(data){
			$scope.shareBalances = data.share_balance;
		});

		$scope.title = "Add new Alert";

		if($stateParams.settings_id) {
			$scope.title = "Edit Alert";
			$scope.editing = true;
			alertSettings.then(function(settings){

				$scope.newSetting = _.find(settings,function(setting){
					return setting.id == $stateParams.settings_id;
				});

				$scope.newSetting.active = $scope.newSetting.active == "1" ? true : false;
				

				$scope.company = {
					company: $scope.newSetting.company_id
				};

				companyService.getCompanies($scope.company.company).then(function(data){
					$scope.company = data[0];
					$scope.SBCompany = _.findWhere($scope.shareBalances, {company: $scope.company.company})
				});

			});
		}

		$scope.newSetting = {
			level : 'up',
			active: true
		}

		$scope.addSettings = function() {
			$state.go("app.settings.add-alerts");
		}

		$scope.submitAdd = function() {
			var message = '';
			if($scope.newSetting.company_id == undefined) {
				message = "Please select company";
			}
			if($scope.newSetting.price == undefined || $scope.newSetting.price == null) {
				message = "Please enter correct price";
			}

			if(message) {
				$ionicPopup.alert({
					title: 'Invalid Settings',
					template: message,
				});
				return;
			}

			if($scope.editing) {
				settingsService.updateAlertSetting($scope.newSetting).then(function(resp){
					$ionicPopup.alert({
						title: 'Settings updated',
						template: 'Your Settings have been updated successfully.',
					}).then(function(res){
						$state.go("app.settings.index");
					});
				});

				return;
			}
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

		$scope.edit = function(settings) {
			//console.log(settings.id);
			$state.go('app.settings.edit-alerts',{settings_id:settings.id});
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
			$scope.company = company;
			$scope.newSetting.company_id = company.company;
			$scope.modal.hide();

			$scope.SBCompany = _.findWhere($scope.shareBalances, {company: company.company})
			console.log($scope.SBCompany);
		}
		
		$scope.companyName = function() {			
			if(_.isEmpty($scope.company)) {
				return "No company (Touch To select)";
			}
			return $scope.company.company + " (Touch to change)";
		}		

}]);