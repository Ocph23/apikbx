angular.module("app",
    [
        "app.router",
        "message.service",
        "auth.service",
        "storage.services",
        "helper.service",
        "app.conponent",
        "auth.controller",
        "admin.controller",
        "main.controller",
    ]).factory('SweetAlert', ['$window', function SweetAlert($window) {
        var $swal = $window.swal;
        return {
            swal: swal
        }
        function swal(config) {
            return $swal.fire(config);
        }
    }]);;