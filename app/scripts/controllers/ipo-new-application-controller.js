angular.module('app.controllers').controller(
	'IpoNewApplicationController', ['$scope', '$localstorage', 'ipoService', function($scope, $localstorage, ipoService){
		
		$scope.pendingIpoLabel = "View Pending IPOs";
		$scope.busy = true;
		$scope.ipo_Session = {};

		ipoService.getChildAccounts().then(function(resp){
			$scope.busy = false;
			$scope.childAccounts = resp.childAccounts;
			console.log(resp);
		}).catch(function(data){
			alert('failed to fetch child acc info.');
		});

		$scope.user = $localstorage.getObject('userData').user;
		
		$scope.ipo = {
			ipo_Session_id: "",
			account_ids: []
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
				$scope.ipo.account_ids.push($scope.user.user_id);
			}
			
			$scope.childAccounts.map(function(acc){
				if(acc.selected){
					$scope.ipo.account_ids.push(acc.child_id);
				}
			});

			$scope.ipo.ipo_Session_id = $scope.ipo.ipo_Session.id;

		}
}]);