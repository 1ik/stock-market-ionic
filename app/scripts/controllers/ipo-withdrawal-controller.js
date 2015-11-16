angular.module('app.controllers').controller(
	'IpoWithdrawalController', ['$scope', '$localstorage', 'ipoService', '$ionicPopup', function($scope, $localstorage, ipoService, $ionicPopup){		
		$scope.withdrawalReqLabel = "View Withdrawal Requests";
		$scope.user = $localstorage.getObject('userData').user;
		$scope.withdrawal = {};
		$scope.submitting = false;
		$scope.tab = window.innerWidth > 450;
		$scope.fromDatepickerObject = {
			titleLabel: 'Select Date',  //Optional
			inputDate: new Date(),    //Optional
			setButtonType : 'button-assertive',  //Optional
			todayButtonType : 'button-assertive',  //Optional
			closeButtonType : 'button-assertive',  //Optional
			modalHeaderColor: 'bar-positive', //Optional
			modalFooterColor: 'bar-positive', //Optional
			callback: function (val) {    //Mandatory
				if (typeof(val) === 'undefined') {
					console.log('No date selected');
				} else {
					val = new Date(val);
					$scope.withdrawal.request_date = val.getFullYear() + "-" + (val.getMonth()+1) + "-" + val.getDate();
				}
			}
		};

		$scope.submit = function() {
			message = '';
			if($scope.withdrawal.amount == undefined || $scope.withdrawal.amount == null || $scope.withdrawal.amount < 0) {
				message = 'Please enter a valid withdrawal amount';
			}
			
			if ($scope.withdrawal.deposit_withdraw_type == undefined) {
				message = 'Please pick a withdrawal type';	
			}

			if($scope.withdrawal.request_date == undefined) {
				message = 'Please pick a withdrawal request date';		
			}

			if(message) {
				$ionicPopup.alert({
					title: 'Invalid withdrawal requests.',
					template: message
				})
				return false;
			}

			
			$scope.submitting = true;
			ipoService.saveWithdrawalReq($scope.withdrawal).then(function(resp){
				$scope.submitting = false;
				$ionicPopup.alert({
					title: 'Withdrawal Request Submitted successfully',
					template: 'Your withdrawal request have been submitted successfully.'
				}).then(function(res) {
					$scope.withdrawal = {};
				});
			}).catch(function(err){
				$scope.submitting = false;
				$ionicPopup.alert({
					title: 'Withdrawal Request Submitted successfully',
					template: 'Your withdrawal request have been submitted successfully.'
				}).then(function(res) {
					$scope.withdrawal = {};
				});
			});
		}

		$scope.showWithdrawals = function() {
			$scope.withdrawalReqLabel = "Fetching.."
			ipoService.getIpoWithdrawals().then(function(data){
				$scope.withdrawals = data;
				console.log(data);
			});
		}
}]);