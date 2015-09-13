angular.module('app.directives')
	.directive('infoList', function(){
		return {
			scope: {
				'title' : '=infoName'
			},
			restrict: 'AE',
			replace: 'true',
			templateUrl: 'templates/info-list.html'
		}
	});