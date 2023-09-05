angular
  .module("admin.controller", [])
  .controller("adminController", adminController)
  .controller("adminPenjualanController", AdminPenjualanController)
  .controller("adminPenjualanRiwayatTracingController", AdminPenjualanRiwayatTracingController)
  .controller("adminPenjualanBaruController", AdminPenjualanBaruController)
  .controller("adminRegionalController", AdminRegionalController)
  .controller("adminKanwilController", AdminKanwilController)

function adminController($scope, $state, AuthService) {
  if (!AuthService.userIsLogin()) {
    $state.go("login");
  }

  $scope.logOff = function () {
    AuthService.logOff();
  };
}

function AdminPenjualanController($scope, $http, $state, helperServices, SweetAlert, AuthService) {
  $scope.helper = helperServices;
  $scope.data = [];

  this.$onInit = () => {
    $http({
      method: "get",
      url: helperServices.url + "/api/penjualan",
      headers: AuthService.getHeader()
    }).then(
      function successCallback(response) {
        $scope.data = response.data;
        if (!$scope.data || $scope.data.length <= 0) {
          SweetAlert.swal({
            title: 'Not Found',
            text: "Data Tidak Ditemukan",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: 'close'
          });

        }
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );


  }

  $scope.search = () => {
    $http({
      method: "get",
      url: helperServices.url + "/api/penjualan/search/" + $scope.searchText,
      headers: AuthService.getHeader()
    }).then(
      function successCallback(response) {
        $scope.data = response.data;
        if (!$scope.data || $scope.data.length <= 0) {
          SweetAlert.swal({
            title: 'Not Found',
            text: "Data Tidak Ditemukan",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: 'close'
          });

        }
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );


  }

  $scope.changeDate = (date) => {
    $http({
      method: "get",
      url: helperServices.url + `/api/penjualan/date?month=${date.getMonth()}&year=${date.getFullYear()}`,
      headers: AuthService.getHeader(),
      data: date
    }).then(
      function successCallback(response) {
        $scope.data = response.data;
        if (!$scope.data || $scope.data.length <= 0) {
          SweetAlert.swal({
            title: 'Not Found',
            text: "Data Tidak Ditemukan",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: 'close'
          });

        }
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );


  }


}

function AdminPenjualanBaruController($scope, $state, $stateParams, $http, AuthService, helperServices, SweetAlert) {
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
          SweetAlert.swal({
            title: 'Error',
            text: response.data.message,
            icon: 'error',
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
        SweetAlert.swal({
          title: 'Success',
          text: response.message,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
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
    $scope.biaya = 0;
    $scope.total = 0;
  }
}


function AdminPenjualanRiwayatTracingController($scope, $state, $stateParams, $http, AuthService, helperServices, SweetAlert) {

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
          SweetAlert.swal({
            title: 'Error',
            text: response.data.message,
            icon: 'error',
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
        if (!$scope.tracking.id) {
          $scope.tracking.id = response.data.id;
          $scope.model.tracking.push($scope.tracking);  
        }


        SweetAlert.swal({
          title: 'Success',
          text: response.message,
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
        $('#exampleModal').modal('hide');
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
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
    SweetAlert.swal({
      text: 'Yakin Hapus Data ?',
      title: "Delete",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Hapus'
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
              SweetAlert.swal({
                title: 'succes',
                text: response.data.message,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'close'
              });
            },
            function errorCallback(response) {
              SweetAlert.swal({
                title: 'Error',
                text: response.data.message,
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'close'
              });
            }
          );
        }

      });
  }


}

function AdminRegionalController($scope, $state, $stateParams, $http, AuthService, helperServices, SweetAlert) {
  this.$onInit = function () {
    $http({
      method: "get",
      url: helperServices.url + "/api/regional",
      headers: AuthService.getHeader()
    }).then(
      function successCallback(response) {
        $scope.data = response.data;
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );
  }

  $scope.createNew = () => {
    $scope.regional = {};
  }


  $scope.edit = (a) => {
    $scope.regional = a;
  }


  $scope.save = function () {

    var req = {
      method: $scope.regional.id ? "put" : "post",
      url: helperServices.url + "/api/regional",
      data: $scope.regional,
      headers: AuthService.getHeader()
    };

    $http(req).then(
      function successCallback(response) {
        if (!$scope.regional.id) {
          $scope.regional.id = response.data.id
          $scope.data.push($scope.regional)
        }

        SweetAlert.swal({
          title: 'Success',
          text: response.message,
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });

        $scope.createNew();
        $("#exampleModal").modal('hide');
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );
  };


  $scope.delete = (data) => {
    SweetAlert.swal({
      title: 'Are you sure?',
      text: "Yakin Hapus Data ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus !',
      cancelButtonText: 'Batal',
      reverseButtons: true
    })
      .then(x => {
        if (x.value) {
          $http({
            method: "delete",
            url: helperServices.url + "/api/regional/" + data.id,
            headers: AuthService.getHeader()
          }).then(
            function successCallback(response) {

              var index = $scope.data.indexOf(data);
              $scope.data.splice(index, 1);
              SweetAlert.swal({
                title: 'succes',
                text: "Data berhasil dihapus !",
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
              });
            },
            function errorCallback(response) {
              SweetAlert.swal({
                title: 'Error',
                text: response.data.message,
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'close'
              });
            }
          );
        }

      });



  }
}

function AdminKanwilController($scope, $state, $stateParams, $http, AuthService, helperServices, SweetAlert, SweetAlert) {
  this.$onInit = function () {
    if ($stateParams.id) {
      var id = $stateParams.id;
      $http({
        method: "get",
        url: helperServices.url + "/api/regional/" + id,
        headers: AuthService.getHeader()
      }).then(
        function successCallback(response) {
          $scope.model = response.data;
        },
        function errorCallback(response) {
          SweetAlert.swal({
            title: 'Error',
            text: response.data.message,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'close'
          });
        }
      );
    }
  }

  $scope.createNew = () => {
    $scope.kanwil = {
      regionalid: $stateParams.id
    };
  }

  $scope.edit = (a) => {
    $scope.kanwil = a;
  }

  $scope.save = function () {
    var req = {
      method: $scope.kanwil.id ? "put" : "post",
      url: helperServices.url + "/api/kanwil" + ($scope.kanwil.id ? "/" + $scope.kanwil.id : ""),
      data: $scope.kanwil,
      headers: AuthService.getHeader()
    };

    $http(req).then(
      function successCallback(response) {
        if (!$scope.kanwil.id) {
          $scope.kanwil.id = response.data.data;
          $scope.model.items.push($scope.kanwil);
        }
        $scope.createNew();

        SweetAlert.swal({
          position: 'top-end',
          icon: 'success',
          title: 'Berhasil !',
          showConfirmButton: false,
          timer: 1500
        })

        $("#exampleModal").modal('hide');
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );
  };


  $scope.delete = (data) => {
    SweetAlert.swal({
      title: 'Are you sure?',
      text: "Yakin Hapus Data ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus !',
      cancelButtonText: 'Batal',
      reverseButtons: true
    })
      .then(x => {
        if (x.value) {
          $http({
            method: "delete",
            url: helperServices.url + "/api/kanwil/" + data.id,
            headers: AuthService.getHeader()
          }).then(
            function successCallback(response) {

              var index = $scope.model.items.indexOf(data);
              $scope.model.items.splice(index, 1);
              SweetAlert.swal({
                title: 'succes',
                text: response.data.message,
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
              });
            },
            function errorCallback(response) {
              SweetAlert.swal({
                title: 'Error',
                text: response.data.message,
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'close'
              });
            }
          );
        }

      });



  }

}
