angular.module('app', [
	'ionic',
	'app.controllers', 
	'app.directives', 
	'app.services',
	'ngCordova',
	'ionic-datepicker'
]).run(['$ionicPlatform', 'pushService', '$ionicPopup', '$ionicHistory', function($ionicPlatform, pushService, $ionicPopup, $ionicHistory) {
	

	$ionicPlatform.registerBackButtonAction(function(event) {
		if (true) { // your check here
		  
		  if ($ionicHistory.viewHistory().backView == null) {
			$ionicPopup.confirm({
				title: 'System warning',
				template: 'are you sure you want to exit?'
			}).then(function(res) {
				if (res) {
					ionic.Platform.exitApp();
				}
			});
		  } else {
		  	$ionicHistory.goBack();	
		  }

		}
	}, 100);
	
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}

		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	})
}])

.constant("constants", {
	"rootURL": "http://ksclbd.com/api/index.php/",
	"mock": false
})

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {  
		var media = window.innerWidth <= 450 ? 'mobile' : 'tab';
		
		document.addEventListener("deviceready", function(){
			if(media == 'mobile') {
				window.plugins.orientationLock.lock("portrait");
			} else {
				window.plugins.orientationLock.lock("landscape");
			}
		}, false);


		$stateProvider      
		.state('splash', {
			url: '/splash',
			abstract: false,
			templateUrl: 'pages/'+media+'-splash.html',
			controller: 'SplashController'
		})
		.state('app', {
			url: '/app',
			abstract: true,
			controller: 'appController',
			templateUrl: 'partials/master.html',
		})
			.state('app.dashboard', {
				url: '/dashboard',
				views: {
					'menuContent': {
						templateUrl: 'pages/dashboard.html'
					}
				}
			})
			.state('app.profile', {
				url: '/profile',
				views: {
					'menuContent': {
						templateUrl: 'pages/profile.html',
						controller: 'ProfileController'
					}
				}
			})
			.state('app.portfolio', {
				url: '/portfolio',
				views: {
					'menuContent': {
						templateUrl: 'pages/portfolio.html',
						controller: 'portfolioController'
					}
				}
			})
				.state('app.portfolio.statuses', {
					url: '/statuses',
					views: {
						'portfolioItem': {
							templateUrl: 'partials/portfolio/statuses.html',
							controller: 'portfolioStatusController'
						}
					}
				})
				.state('app.portfolio.share_balances', {
					url: '/share-balances',
					views: {
						'portfolioItem': {
							templateUrl: 'partials/portfolio/share-balance/'+media+'.html',
							controller: 'portfolioShareBalanceController'
						}
					}
				})
				.state('app.portfolio.add', {
					url: '/add',
					views: {
						'portfolioItem': {
							templateUrl: 'partials/portfolio/add.html',
							controller: 'portfolioAddController'
						}
					}
				})
			.state('app.orders', {
				url: '/orders',
				abstract:true,
				views: {
					'menuContent': {
						templateUrl: 'pages/orders.html',
						controller: "OrdersController"
					}
				}
			})
				.state('app.orders.view', {
					url: '/view',
					views: {
						'orderViews': {
							templateUrl: 'partials/orders/view-'+media+'.html'
						}
					}
				})
				.state('app.orders.manage', {
					url: '/manage',
					views: {
						'orderViews': {
							templateUrl: 'partials/orders/manage.html',
							controller: 'ManageOrderController'
						}
					}
				})
			.state('app.marketInfos', {
				url: '/market-info',
				views: {
					'menuContent': {
						templateUrl: 'pages/market-info-'+media+'.html',
						controller: "MarketInfoController"
					}
				}
			})
			.state('app.alerts', {
				url: '/alerts',
				views: {
					'menuContent': {
						templateUrl: 'pages/alerts.html',
						controller: "AlertsController"
					}
				}
			})
			.state('app.ft', {
				url: '/fund-transfers',
				views: {
					'menuContent': {
						templateUrl: 'pages/ft.html',
						controller: "FTsController"
					}
				}
			})
				.state('app.ft.view', {
					url: '/view',
					views: {
						'ftItem': {
							templateUrl: 'partials/ft/view-'+media+'.html'
						}
					}
				})
				.state('app.ft.request', {
					url: '/request',
					views: {
						'ftItem': {
							templateUrl: 'partials/ft/request-'+media+'.html'
						}
					}
				})
			.state('app.requestInformation', {
				url: '/rq-info',
				views: {
					'menuContent': {
						templateUrl: 'pages/rq-info.html',
						controller: "ReqInfoController"
					}
				}
			})
				.state('app.requestInformation.view', {
					url: '/view',
					views: {
						'rqInfoItem': {
							templateUrl: 'partials/request-info/view.html'
						}
					}
				})
				.state('app.requestInformation.create', {
					url: '/new',
					views: {
						'rqInfoItem': {
							templateUrl: 'partials/request-info/create.html'
						}
					}
				})			
			.state('app.news', {
				url: '/news',
				views: {
					'menuContent': {
						templateUrl: 'pages/news.html',
						controller: "NewsController"
					}
				}
			})
			.state('app.settings', {
				url: '/settings',
				views: {
					'menuContent': {
						templateUrl: 'pages/settings.html',
						controller: 'SettingsController'
					}
				}
			})
				.state('app.settings.index', {
					url: '/index',
					views: {
						'settingsItem': {
							templateUrl: 'partials/settings/index.html'
						}
					}
				})
				.state('app.settings.alerts', {
					url: '/alerts',
					views: {
						'settingsItem': {
							templateUrl: 'partials/settings/alerts.html',
							controller: 'AlertSettingsController'
						}
					}
				})
				.state('app.settings.add-alerts', {
					url: '/alerts-add',
					views: {
						'settingsItem': {
							templateUrl: 'partials/settings/add-alerts.html',
							controller: 'AlertSettingsController'
						}
					}
				})
				.state('app.settings.edit-alerts', {
					url: '/alerts-edit/:settings_id',
					views: {
						'settingsItem': {
							templateUrl: 'partials/settings/add-alerts.html',
							controller: 'AlertSettingsController'
						}
					}
				})				
				.state('app.settings.broker', {
					url: '/broker',
					views: {
						'settingsItem': {
							templateUrl: 'partials/settings/broker.html',
							controller: 'BrokerSettingsController'
						}
					}
				})
			.state('app.history', {
				url: '/history',
				views: {
					'menuContent': {
						templateUrl: 'pages/history-'+media+'.html',
						controller: 'HistoryController'
					}
				}
			})
			.state('app.ipo', {
				url: '/ipo',
				views: {
					'menuContent': {
						templateUrl: 'pages/ipo.html',
						controller: 'IpoController'
					}
				}
			})
				.state('app.ipo.index', {
					url: '/index',
					views: {
						'ipoViews': {
							templateUrl: 'partials/ipo/index.html'
						}
					}
				})
				.state('app.ipo.accounts', {
					url: '/accounts',
					views: {
						'ipoViews': {
							templateUrl: 'partials/ipo/accounts-'+media+'.html',
							controller: 'IpoAccountsController'
						}
					}
				})
				.state('app.ipo.withdrawal', {
					url: '/withdrawal',
					views: {
						'ipoViews': {
							templateUrl: 'partials/ipo/withdrawal.html',
							controller: 'IpoWithdrawalController'
						}
					}
				})
				.state('app.ipo.new', {
					url: '/new',
					views: {
						'ipoViews': {
							templateUrl: 'partials/ipo/new.html',
							controller: 'IpoNewApplicationController'
						}
					}
				})
				.state('app.ipo.report', {
					url: '/report',
					views: {
						'ipoViews': {
							templateUrl: 'partials/ipo/report-'+media+'.html',
							controller: 'IpoReportController'
						}
					}
				})
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/splash');
}]);


//initializations..
angular.module('app.controllers', [])
angular.module('app.directives', [])
angular.module('app.services', [])