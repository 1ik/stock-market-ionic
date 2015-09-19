angular.module('app.services')

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])
.factory('$ionicPushActions', [
    '$rootElement',
    '$injector',
function($rootElement, $injector) {
  return {
    run: function(notification) {
      var state = false;
      var stateParams = {};
      if (ionic.Platform.isAndroid()) {
        if (notification.payload.payload.$state) {
          state = notification.payload.payload.$state;
        }
        if (notification.payload.payload.$stateParams) {
          try {
            stateParams = JSON.parse(notification.payload.payload.$stateParams);
          } catch(e) {}
        }
      } else if (ionic.Platform.isIOS()) {
        if (notification.$state) {
          state = notification.$state;
        }
        if (notification.$stateParams) {
          try {
            stateParams = JSON.parse(notification.$stateParams);
          } catch(e) {}
        }
      }

      if (state) {
        // Auto navigate to state
        var injector = $rootElement.injector();
        $state = injector.get('$state');
        $state.go(state, stateParams);
      }
    }
  }
}]);