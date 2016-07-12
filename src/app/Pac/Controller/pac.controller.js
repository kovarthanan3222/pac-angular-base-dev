var pacApi = angular.module('pacApi');
pacApi.controller('pacAnalysisController', ['$scope', 'ApiRequest',
  function ($scope, ApiRequest) {
    $scope.inputFormData = {};
    $scope.postData = {};
    $scope.data = {};
    ApiRequest.getFormData().success(function (data) {
      $scope.inputFormData = data;
      $scope.initializeFormData();
      $scope.resetFormPostData();
      ApiRequest.getCompositionChartData($scope.postData).
              success(function (data) {
                $scope.createHighChart("composition", data.portfolio.Allocation,
                        "Assert Class Portfolio Allocation", 100);
              }).error(function () {
      });
    });

    $scope.initializeFormData = function () {
      $scope.inputData.investment_amount = {
        value: $scope.inputFormData.InvestmentAmount.default,
        options: {
          floor: $scope.inputFormData.InvestmentAmount.start,
          ceil: $scope.inputFormData.InvestmentAmount.end,
          step: $scope.inputFormData.InvestmentAmount.step
        }
      };
      $scope.inputData.annual_distribution = {
        value: $scope.inputFormData.AnnualDistribution.default,
        options: {
          floor: $scope.inputFormData.AnnualDistribution.start,
          ceil: $scope.inputFormData.AnnualDistribution.end,
          step: $scope.inputFormData.AnnualDistribution.step,
          precision: 2
        }
      };
      $scope.inputData.fee_adjustment = {
        value: $scope.inputFormData.FeeAdjustment.default,
        options: {
          floor: $scope.inputFormData.FeeAdjustment.start,
          ceil: $scope.inputFormData.FeeAdjustment.end,
          step: $scope.inputFormData.FeeAdjustment.step,
          precision: 2
        }
      };
      $scope.inputData.compare = {
        value: 0
      };
      $scope.inputData.custom_period = {
        minValue: 1972,
        maxValue: 2016,
        options: {
          floor: 1972,
          ceil: 2016,
          step: 1
        }
      };
    };

    $scope.resetFormPostData = function () {
      $scope.postData.investment_amount = $scope.inputData.investment_amount.value;
      $scope.postData.annual_distribution = $scope.inputData.annual_distribution.value;
      $scope.postData.fee_adjustment = $scope.inputData.fee_adjustment.value;
      $scope.postData.year_from = $scope.inputData.custom_period.minValue;
      $scope.postData.year_to = $scope.inputData.custom_period.maxValue;
      $scope.postData.compare = $scope.inputData.compare.value;
      $scope.postData.compare_type = "portfolio";
      $scope.postData.portfolio_id = 10;
      $scope.postData.advisor_id = 1;
      $scope.postData.allocation = JSON.parse('{"Cash & Cash Alternatives":3,"Short Term Global Fixed Income 1-5 Years":29,"Short-Term Fixed Income 1-3 Years":28,"U.S. Market":10,"U.S. Large Value":7,"U.S. Small Value":5,"International Large Value":9,"International Small Neutral":4,"Emerging Markets":2,"REITs":3}');
    };

    $scope.createHighChart = function (element, jsonData, title, size) {
      Highcharts.chart(element, {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        title: {
          text: 'Assert Class Portfolio Allocation'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        series: [{
            type: 'pie',
            name: 'Assert',
            data: jsonData,
            size: size + "%"
          }]
      });
    };
  }
]);
