angular.module("auth.service", [])

    .factory("AuthService", AuthService)


    ;




function AuthService($http, $q, StorageService, $state, helperServices,SweetAlert) {

    var service = {};

    return {
        login: login, logOff: logoff, userIsLogin: userIsLogin, getUserName: getUserName,
        userIsLogin: userIsLogin, userInRole: userInRole,
        getHeader: getHeader, url: helperServices.url
    }

    function login(user) {
        var def = $q.defer();
        $http({
            method: 'post',
            url: helperServices.url+"/api/auth/login",
            data:user,
        }).then(res => {
            StorageService.addObject("user", res.data);
            def.resolve(res.data);
         }, err => { 
            SweetAlert.swal({
                title: 'Error',
                text: response.data.message,
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'close'
              });
         });
        return def.promise;
    }



    function getHeader() {

        try {
            if (userIsLogin()) {
                return {
                    'content-type': 'application/json',
                    'authorization': 'bearer ' + getToken()
                }
            }
            throw new Error("Not Found Token");
        } catch  {
            return {
                'content-type': 'application/json'
            }
        }
    }

    function logoff() {
        StorageService.clear();
        $state.go("login");

    }

    function getUserName() {
        if (userIsLogin) {
            var result = StorageService.getObject("user");
            return result.name;
        }
    }

    function userIsLogin() {
        var result = StorageService.getObject("user");
        if (result) {
            return true;
        }
    }

    function userInRole(role) {
        var result = StorageService.getItem("user");
        if (result && result.roles.find(x => x.name = role)) {

            return true;
        }
    }


    function getToken(){
        var result = StorageService.getObject("user");
        if(result)
            return result.token;
        return "";
    }



}