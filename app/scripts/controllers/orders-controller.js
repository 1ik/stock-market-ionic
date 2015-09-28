angular.module('app.controllers').controller(
	'OrdersController', ['$scope', 'ordersService','$ionicPopup', '$state',
	function($scope, ordersService, $ionicPopup, $state){
		$scope.companies = ["all"];
		
		$scope.fromDatepickerObject = {
			titleLabel: 'Select From Date',  //Optional
			todayLabel: 'Today',  //Optional
			closeLabel: 'Close',  //Optional
			setLabel: 'Set',  //Optional
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
					$scope.search.from = val.getFullYear() + "-" + (val.getMonth()+1) + "-" + val.getDate();
				}
			}
		};
		$scope.toDatepickerObject = {
			titleLabel: 'Select to date',  //Optional
			todayLabel: 'Today',  //Optional
			closeLabel: 'Close',  //Optional
			setLabel: 'Set',  //Optional
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
					$scope.search.to = val.getFullYear() + "-" + (val.getMonth()+1) + "-" + val.getDate();
				}
			}
		};

		$scope.clearFrom = function() {
			$scope.search.from = "";
		}
		$scope.clearTo = function() {
			$scope.search.to = "";
		}

		$scope.openOrder = function(order) {
			$ionicPopup.alert({
				title: order.company,
				template: '<div class="list">
								<a class="item item-avatar">
									<h2>Expire Date</h2>
									<p>'+order.expired_date+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Order ID</h2>
									<p>'+order.order_id+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Order Range</h2>
									<p>'+order.order_range+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Order Time</h2>
									<p>'+order.order_time+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Order Type</h2>
									<p>'+order.order_type+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Quantity</h2>
									<p>'+order.quantity+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Remarks</h2>
									<p>'+order.remarks+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Status</h2>
									<p>'+order.status+'</p>
								</a>
								<a class="item item-avatar">
									<h2>Submission date</h2>
									<p>'+order.submission_date+'</p>
								</a>
							</div>'
			}).then(function(d){
				$state.go('app.orders.view')
			});
		}
		
		$scope.search = {
			company: "all",
			from: "",
			to: ""
		};

		ordersService.getOrders({}).then(function(orders){
			$scope.orders = orders;
			_.each(orders, function(order){
				if($scope.companies.indexOf(order.company) == -1) {
					$scope.companies.push(order.company);
				}
			})
		});

		$scope.$watch('search.company', function(val){
			doSearch();
		});
		
		$scope.$watch('search.from', function(val){
			doSearch()
		});
		
		$scope.$watch('search.to', function(val){
			doSearch()
		});

		var doSearch = function() {
			var search = _.clone($scope.search);
			if($scope.search.company == "all") {
				delete search.company;
			}
			if($scope.search.from == "") {
				delete search.from;
			}
			if($scope.search.to == "") {
				delete search.to;
			}

			ordersService.getOrders(search).then(function(orders){
				$scope.orders = orders;
			});
		}

}]);