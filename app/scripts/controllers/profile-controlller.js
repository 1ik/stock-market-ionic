angular.module('app.controllers')
.controller('ProfileController', ['$scope','$localstorage','profileService',function($scope,$localstorage,profileService){
	$scope.loading = false;

	$scope.user = $localstorage.getObject('userData').user;
	var profile = $localstorage.getObject('profile');

	$scope.customer_details = profile.customer_details;
	$scope.money_details = profile.money_details;
	$scope.totalLossGain = profile.totalLossGain;

	if($scope.user.kscl == true) {
		$scope.loading = true;
		profileService.getKSCLUserProfile().then(function(data){
			$scope.loading = false;
			$localstorage.setObject('profile', data);
			$scope.customer_details = data.customer_details;
			$scope.money_details = data.money_details;
			$scope.totalLossGain = data.totalLossGain;
		}).catch(function(data){
			console.log(data);
		});
	}

}]);