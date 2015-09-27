angular.module('app', [
	'ionic',
	'app.controllers', 
	'app.directives', 
	'app.services',
	'ngCordova'
]).run(['$ionicPlatform', 'pushService', function($ionicPlatform, pushService) {
	
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
			.state('app.alerts', {
				url: '/alerts',
				views: {
					'menuContent': {
						templateUrl: 'pages/alerts.html',
						controller: "AlertsController"
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