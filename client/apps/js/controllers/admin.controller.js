angular
  .module("admin.controller", [])
  .controller("adminController", adminController)
  .controller("adminPenjualanController", AdminPenjualanController)
  .controller("adminPenjualanRiwayatTracingController", AdminPenjualanRiwayatTracingController)
  .controller("adminPenjualanBaruController", AdminPenjualanBaruController);

function adminController($scope, $state, AuthService) {
  if (!AuthService.userIsLogin()) {
    $state.go("login");
  }

  $scope.logOff = function () {
    AuthService.logOff();
  };
}

function AdminPenjualanController($scope, $http, $state, helperServices, swangular, AuthService) {

  $scope.helper = helperServices;
  $scope.data = [];
  $scope.search = () => {
    $http({
      method: "get",
      url: helperServices.url + "/api/penjualan?stt=" + $scope.searchText,
      headers: AuthService.getHeader()
    }).then(
      function successCallback(response) {
        $scope.data = response.data;
        if (!$scope.data || $scope.data.length <= 0) {
          swangular.swal({
            title: 'Not Found',
            text: "Data Tidak Ditemukan",
            type: 'warning',
            showCancelButton: false,
            confirmButtonText: 'close'
          });

        }
      },
      function errorCallback(response) {
        swangular.swal({
          title: 'Error',
          text: response.data.message,
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );


  }


}

function AdminPenjualanBaruController($scope, $state, $stateParams, $http, AuthService, helperServices, swangular) {
  this.$onInit = function () {
    if ($stateParams.id) {
      var id = $stateParams.id;
      $http({
        method: "get",
        url: helperServices.url + "/api/penjualan/" + id,
        headers: AuthService.getHeader()
      }).then(
        function successCallback(response) {
          $scope.model = response.data;
          $scope.model.tanggal = new Date(response.data.tanggal);
          var result = helperServices.calculateTotal($scope.model);
          $scope.model.isvolume = $scope.model.isvolume ? true : false;
          $scope.biaya = result.biaya;
          $scope.total = result.total;
        },
        function errorCallback(response) {
          swangular.swal({
            title: 'Error',
            text: response.data.message,
            type: 'error',
            showCancelButton: false,
            confirmButtonText: 'close'
          });
        }
      );
    } else {
      $scope.createNewModel();
    }
  }


  if (!AuthService.userIsLogin()) {
    $state.go("login");
  }

  $scope.logOff = function () {
    AuthService.logOff();
  };

  $scope.changeHargaAndBerat = function () {

    var result = helperServices.calculateTotal($scope.model);
    $scope.biaya = result.biaya;
    $scope.total = result.total;
  };

  $scope.save = function () {

    var req = {
      method: $scope.model.id ? "put" : "post",
      url: helperServices.url + "/api/penjualan",
      data: $scope.model,
      headers: AuthService.getHeader()
    };

    $http(req).then(
      function successCallback(response) {
        $scope.createNewModel();
        swangular.swal({
          title: 'Success',
          text: response.message,
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      },
      function errorCallback(response) {
        swangular.swal({
          title: 'Error',
          text: response.data.message,
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );
  };

  $scope.createNewModel = () => {
    $scope.model = {};
    $scope.model.harga = 0;
    $scope.model.berat = 0;
    $scope.model.jumlah = 0;
    $scope.model.isvolume = false;
    $scope.model.dimensi_panjang = 0;
    $scope.model.dimensi_lebar = 0;
    $scope.model.dimensi_tinggi = 0;
    $scope.model.tarif = 0;
    $scope.model.biaya_packing = 0;
    $scope.model.biaya_lain = 0;
    $scope.model.tanggal = new Date();
    $scope.model.user = AuthService.getUserName();
  }
}


function AdminPenjualanRiwayatTracingController($scope, $state, $stateParams, $http, AuthService, helperServices, swangular) {

  this.$onInit = function () {
    if ($stateParams.id) {
      var id = $stateParams.id;
      $http({
        method: "get",
        url: helperServices.url + "/api/tracking/bypenjualan/" + id,
        headers: AuthService.getHeader()
      }).then(
        function successCallback(response) {
          $scope.model = response.data;
          var result = helperServices.calculateTotal($scope.model);
          $scope.model.isvolume = $scope.model.isvolume ? true : false;
          $scope.biaya = result.biaya;
          $scope.total = result.total;
        },
        function errorCallback(response) {
          swangular.swal({
            title: 'Error',
            text: response.data.message,
            type: 'error',
            showCancelButton: false,
            confirmButtonText: 'close'
          });
        }
      );
    }
  }


  $scope.createNew = () => {
    $scope.tracking = {};
    $scope.tracking.penjualanid = $scope.model.id;
  }


  $scope.save = () => {
    $http({
      method: $scope.tracking.id ? "put" : "post",
      url: helperServices.url + "/api/tracking",
      headers: AuthService.getHeader(),
      data: $scope.tracking,
    }).then(
      function successCallback(response) {
        $('#exampleModal').modal('hide');
        swangular.swal({
          title: 'Success',
          text: response.message,
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      },
      function errorCallback(response) {
        swangular.swal({
          title: 'Error',
          text: response.data.message,
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );

  }


  $scope.edit = (data) => {
    $scope.tracking = data;
    $scope.tracking.tanggal = new Date(data.tanggal)
  }



  $scope.delete = (data) => {
    swangular.swal({
      text: 'Yakin Hapus Data ?',
      title: "Delete",
      type: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    })
      .then(x => {
        if (x.value) {
          $http({
            method: "delete",
            url: helperServices.url + "/api/tracking/" + data.id,
            headers: AuthService.getHeader()
          }).then(
            function successCallback(response) {

              var index = $scope.model.tracking.indexOf(data);
              $scope.model.tracking.splice(index, 1);
              swangular.swal({
                title: 'succes',
                text: response.data.message,
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'close'
              });
            },
            function errorCallback(response) {
              swangular.swal({
                title: 'Error',
                text: response.data.message,
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'close'
              });
            }
          );
        }

      });
  }


}
