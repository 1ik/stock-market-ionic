angular.module('app.directives')
	.directive('navigationMenu', function(){
		return {
			restrict: 'AE',
			replace: 'true',
			templateUrl: 'templates/navigation-menu.html'
		}
	});