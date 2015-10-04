angular.module('app.controllers')
.controller('HistoryController', ['$scope','dateService', 'historyService', '$ionicPopup',
	function($scope, dateService, historyService, $ionicPopup){
		$scope.status = "No data";

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
	    		historyService.getHistory(params).then(function(data){
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
}]);