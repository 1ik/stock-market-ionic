angular.module('app.controllers')
.controller('ProfileController', ['$scope','$localstorage','profileService',function($scope,$localstorage,profileService){
	
	$scope.user = $localstorage.getObject('userData').user;

	if($scope.user.kscl == true) {
		profileService.getKSCLUserProfile().then(function(data){
			$scope.customer_details = data.customer_details;
			$scope.money_details = data.money_details;
			$scope.totalLossGain = data.totalLossGain;
		}).catch(function(data){
			console.log(data);
		});
	}

}]);