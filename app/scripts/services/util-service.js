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
.service('dateService', [ function(){
  
  return {
    formattedDate: function(dateObj) {
      // function to get number with leading zeros
      zeroPadded = function (num, size){ return ('000000000' + num).substr(-size); }
      var year = dateObj.getFullYear();
      // var month = dateObj.getMonth();//gave me one less than actual month
      var month = zeroPadded(dateObj.getMonth()+1,2);
      var date = zeroPadded(dateObj.getDate(),2);
      return year+'-'+month+'-'+date;
    }
  };
}])

