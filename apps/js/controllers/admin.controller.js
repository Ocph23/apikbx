angular
  .module("admin.controller", [])
  .controller("adminController", adminController)
  .controller("adminPenjualanController", AdminPenjualanController)
  .controller("adminPenjualanBaruController", AdminPenjualanBaruController);

function adminController($scope, $state, AuthService) {
  if (!AuthService.userIsLogin()) {
    $state.go("login");
  }

  $scope.logOff = function () {
    AuthService.logOff();
  };
}

function AdminPenjualanController($scope, $http, $state, AuthService) {
 
  $scope.data=[];
 
  $http({
    method: "get",
    url: "http://localhost:3000/api/penjualan",
  }).then(
    function successCallback(response) {
     $scope.data = response.data;
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    }
  );
}

function AdminPenjualanBaruController($scope, $state, $http, AuthService) {
  $scope.model = {};
  $scope.model.harga = 0;
  $scope.model.berat = 0;
  $scope.model.tanggal = new Date();

  if (!AuthService.userIsLogin()) {
    $state.go("login");
  }

  $scope.logOff = function () {
    AuthService.logOff();
  };

  $scope.changeHargaAndBerat = function () {
    $scope.total = $scope.model.berat * $scope.model.harga;
  };

  $scope.save = function () {
    $http({
      method: "post",
      url: "http://localhost:3000/api/penjualan",
      data: $scope.model,
    }).then(
      function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
      },
      function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      }
    );
  };
}
