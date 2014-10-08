(function() {
    var app = angular.module('app', []);

    app.controller('ApplicationController', ['$scope', function ($scope) {
        $scope.message = 'Hello World';
    }]);
})();
