angular.module('app.controllers').controller(
	'IpoNewApplicationController', ['$scope', '$localstorage', 'ipoService', function($scope, $localstorage, ipoService){
		
		$scope.pendingIpoLabel = "View Pending IPOs";
		$scope.busy = true;
		$scope.user = $localstorage.getObject('userData').user;
		$scope.user.ipo_Session = {};

		ipoService.getChildAccounts().then(function(resp){
			$scope.busy = false;
			$scope.childAccounts = resp;
		}).catch(function(data){
			alert('failed to fetch child acc info.');
		});
		
		$scope.ipo = {
			ipo_Session_id: "",
			child_id: [],
			refund_option: "1"
		};

		//mock.
		$scope.user.iop_session_list = [
			{
				id: 33,
				IPOSession_Name: "KDSALTD",
				Amount: 10
			},
			{
				id: 39,
				IPOSession_Name: "SIMTEX",
				Amount:10
			},
		];

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