angular.module('app', ['ionic','app.controllers', 'app.directives', 'app.services','ngCordova'])
.run(['$ionicPlatform', '$httpBackend','$cordovaPush','pushService',function($ionicPlatform, $httpBackend, $cordovaPush, pushService) {
		

	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}

		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
		console.log('device initialised new')
		///android push----------------------------------------
		// var androidConfig = {
		//     "senderID": "324920710438",
		//   };
	 //    $cordovaPush.register(androidConfig).then(function(result) {
	 //      console.log('Success')
	 //    }, function(err) {
	 //      console.log('Error')
	 //    })

	 //    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
	 //      switch(notification.event) {
	 //        case 'registered':
	 //          if (notification.regid.length > 0 ) {
	 //            alert('registration ID = ' + notification.regid);
	 //            pushService.registerDevice({appleDeviceId:notification.regid})
	 //            	.then(function(data){
	 //            		console.log('successfully registered to kscl server')
	 //            	})
	 //            	.error(function(err){
	 //            		console.log('Error while registering to the kscl server')
	 //            	})
	 //          }
	 //          break;

	 //        case 'message':
	 //          // this is the actual push notification. its format depends on the data model from the push server
	 //          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
	 //          break;

	 //        case 'error':
	 //          alert('GCM error = ' + notification.msg);
	 //          break;

	 //        default:
	 //          alert('An unknown GCM event has occurred');
	 //          break;
	 //      }
	 //    });


	 //    // WARNING: dangerous to unregister (results in loss of tokenID)
	 //    $cordovaPush.unregister(options).then(function(result) {
	 //      console.log('Success')
	 //    }, function(err) {
	 //      console.log('Error')
	 //    })

	    //end of android push----------------------------------------

    // ios push ------------------------------------------
    var iosConfig = {
	    "badge": true,
	    "sound": true,
	    "alert": true,
	  };

    $cordovaPush.register(iosConfig).then(function(deviceToken) {
      // Success -- send deviceToken to server, and store for future use
      console.log("deviceToken: " + deviceToken)
      // $http.post("http://server.co/", {user: "Bob", tokenID: deviceToken})
    }, function(err) {
      alert("Registration error: " + err)
    });


    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      if (notification.alert) {
        navigator.notification.alert(notification.alert);
      }

      if (notification.sound) {
        var snd = new Media(event.sound);
        snd.play();
      }

      if (notification.badge) {
        $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
        });
      }
    });

    // WARNING! dangerous to unregister (results in loss of tokenID)
    $cordovaPush.unregister(options).then(function(result) {
      // Success!
    }, function(err) {
      // Error
    });
    // end of ios push ------------
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