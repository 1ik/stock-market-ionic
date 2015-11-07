angular.module('app.controllers').controller(
	'IpoNewApplicationController', ['$scope', '$localstorage', 'ipoService', function($scope, $localstorage, ipoService){
		
		$scope.pendingIpoLabel = "View Pending IPOs";
		$scope.busy = true;
		$scope.user = $localstorage.getObject('userData').user;
		$scope.user.ipo_Session = {};


		ipoService.getChildAccounts().then(function(resp){
			$scope.busy = false;
			$scope.childAccounts = resp;
			$scope.childAccounts.unshift(angular.copy({
				child_name: $scope.user.user_full_name,
				account_balance: $scope.user.available_balance
			}));
		
		}).catch(function(data){
			alert('failed to fetch child acc info.');
		});

		$scope.$watch('childAccounts',function(){
			var selecteds = _.reject($scope.childAccounts,function(ca){
				return ca.selected == undefined || ca.selected == false;
			})
			
			var usersSelected = selecteds.length;
			if($scope.user.selected) {
				usersSelected += 1;
			}
			$scope.totalAppliedAmount = $scope.user.ipo_Session.Amount * usersSelected;
			
		},true);
		
		$scope.ipo = {
			ipo_Session_id: "",
			child_id: [],
			refund_option: "1"
		};

		$scope.showPendings = function() {
			$scope.pendingIpoLabel = "fetching..";
			ipoService.getPendingIpoApplications().then(function(resp){
				$scope.pendingIPOs = resp;
				$scope.pendingIpoLabel = "Pending IPOs";
			})
		};


		$scope.submit = function() {
			if($scope.user.selected) {
				$scope.ipo.child_id.push($scope.user.user_id);
			}
			
			$scope.childAccounts.map(function(acc){
				if(acc.selected){
					$scope.ipo.child_id.push(acc.child_id);
				}
			});

			$scope.ipo.ipo_Session_id = $scope.user.ipo_Session.id;
			
			ipoService.createNewIpo($scope.ipo).then(function(data){
				console.log(data);
			});
		}
}]);