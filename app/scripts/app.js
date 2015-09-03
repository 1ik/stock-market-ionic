
angular.module('app', ['ionic', 'app.controllers', 'app.directives', 'app.services', 'ngMockE2E'])
.run(['$ionicPlatform', '$httpBackend',function($ionicPlatform, $httpBackend) {

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
    "rootURL": "http://ksclbd.com/api/"
})


.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  
  //turn off default transition while switching views.
  $ionicConfigProvider.views.transition('none');
  
  var width = window.innerWidth;
  var masterTemplate = '';
  var splashScreen = '';
  if(width <= 450) {
    masterTemplate = 'partials/containers/mobile-container.html'; 
    splashScreen = 'pages/mobile-splash.html'; 
  } else {
    masterTemplate = 'partials/containers/tab-container.html';
    splashScreen = 'pages/tab-splash.html'; 
  }
  
  $stateProvider      
    .state('splash', {
      url: '/splash',
      abstract: false,
      templateUrl: splashScreen,
      controller: 'SplashController'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: masterTemplate,
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
            templateUrl: 'pages/profile.html'
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