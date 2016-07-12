angular.module('pacApi').
        factory('ApiRequest', ['$http',
          function ($http) {
            return {
              getFormData: function () {
                return $http({
                  method: 'GET',
                  url: 'http://172.24.144.75:8000/api/form-inputs-data'
                });
              },
              getCompositionChartData: function (postData) {
                return $http({
                  method: 'POST',
                  url: 'http://172.24.144.75:8000/api/composition',
                  data: postData,
                  crossDomain: true,
                  withCredentials: true,
                  dataType: 'jsonp',
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });

              }
            };
          }
        ]);
