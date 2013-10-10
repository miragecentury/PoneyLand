'use strict';


// Declare app level module which depends on filters, and services
angular.module('PoneyLand', ['PoneyLand.filters', 'PoneyLand.services', 'PoneyLand.directives', 'PoneyLand.controllers']).
        config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/index.html', controller: 'mainCtrl'});
        $routeProvider.when('/play', {templateUrl: 'partials/play.html', controller: 'playCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

angular.module('PoneyLand.controllers',[]);