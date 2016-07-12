angular.module('app').
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                    .when('/output', {
                      templateUrl: 'Pac/View/output.tpl.html',
                      controller: 'pacAnalysisController'
                    }).
                    otherwise({redirectTo: '/output'});
          }]);