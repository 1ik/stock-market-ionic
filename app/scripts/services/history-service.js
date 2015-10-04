angular.module('app.services')
.service('historyService', [ '$q', 'constants', 'httpUtils', '$localstorage', function($q, constants, httpUtils,$localstorage){
  
  return {
    getHistory: function(query) {
      var params = $.param(query);
      var reqUrl = constants.rootURL + 'api_orders/transactions?' + params;
      console.log(reqUrl);
      return httpUtils.get(reqUrl, {}, {'Token':$localstorage.getObject('userData').token}).promise;
    }
  };
}])

