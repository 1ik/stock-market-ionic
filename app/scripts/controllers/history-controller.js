angular.module('app.controllers')
.controller('HistoryController', ['$scope','dateService', 'historyService', '$ionicPopup',
	function($scope, dateService, historyService, $ionicPopup){
		$scope.status = "No data";

		$scope.loading = false;

		$scope.search = {
			type: "",
			from: "",
			to: ""
		};

		$scope.results = null;
	    $scope.searching = false;

		$scope.$watch('search',function(newVal,oldVal){
			$scope.showResult($scope.search);
		},true);

	    $scope.fromDatepickerObject = {
	      inputDate: new Date(),    //Optional
	      callback: function (val) {    //Mandatory
	        $scope.search.from = dateService.formattedDate(val)
	        $scope.fromDatepickerObject.inputDate = val
	      }
	    };

	    $scope.toDatepickerObject = {
	      inputDate: new Date(),    //Optional
	      callback: function (val) {    //Mandatory
	      	console.log('to val ',dateService.formattedDate(val))
	        $scope.search.to = dateService.formattedDate(val)
	        $scope.toDatepickerObject.inputDate = val
	      }
	    };

	    $scope.showResult = function (params){
	    	if(true){
	    		$scope.searching = true
	    		$scope.status = "SEARCHING .."
	    		$scope.loading = true;
	    		historyService.getHistory(params).then(function(data){
	    			$scope.loading = false;
		    		if (_.isArray(data) && data.length > 0) {
		    			$scope.results = data;
		    		} else {
		    			$scope.status = "No Data";
		    			$scope.results = [];
		    		}

		    	}).catch(function(){
		    		$scope.searching = false;
		    	});
	    	}
    	}


		$scope.openMoney = function(result) {
			$ionicPopup.alert({
				title: result.company,
				template: '<div class="list">
								<a class="item item-avatar">
									<h2>Bank</h2>
									<p>'+result.bank_name+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Chq No.</h2>
									<p>'+result.cheque_no+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Sl No.</h2>
									<p>'+result.sl_no+'</p>
								</a>
							</div>'
			});
		}
		$scope.openTrade = function(result) {
			$ionicPopup.alert({
				title: result.company,
				template: '<div class="list">
								<a class="item item-avatar">
									<h2>Price</h2>
									<p>'+result.price+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Total</h2>
									<p>'+result.total+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Comm</h2>
									<p>'+result.comm+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Workst. ID</h2>
									<p>'+result.workstation_id+'</p>
								</a>
							</div>'
			});
		}		
}]);