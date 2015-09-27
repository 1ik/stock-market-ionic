angular.module('app.controllers')
.controller('AlertSettingsController', ['$scope', 'settingsService', '$ionicPopup',
	function($scope, settingsService, $ionicPopup){
		
		settingsService.getAlertSettings().then(function(settings){
			$scope.settings = settings;
			console.log(settings);
		});

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
}]);