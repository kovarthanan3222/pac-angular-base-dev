var pacApi = angular.module('pacApi', ['rzModule', 'ngMaterial']).
        config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                    .when('/output', {
                      templateUrl: 'Pac/View/output.tpl.html',
                      controller: 'pacAnalysisController'
                    }).
                    otherwise({redirectTo: '/output'});
          }]);