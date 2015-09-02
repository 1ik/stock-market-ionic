
angular.module('app', ['ionic', 'app.controllers', 'app.directives'])
.run(['$ionicPlatform',function($ionicPlatform) {
  
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
  
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  })
  
}])

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
