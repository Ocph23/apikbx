angular.module("app.router", ["ui.router"])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/admin');
    $stateProvider
        .state("account",{
            url: '/account',
            templateUrl: '../apps/views/accounts/account.html'
        })

        .state("login",{
            url: '/login',
            parent:'account',
            controller:"LoginController",
            templateUrl: '../apps/views/accounts/login.html'
        })
        .state("register",{
            url: '/register',
            parent:'account',
            templateUrl: '../apps/views/accounts/register.html'
        })
          
        .state('admin', {
            url: '/admin',
            controller:'adminController',
            templateUrl: '../apps/views/admins/admin.html'
        })

        .state('penjualan', {
            url: '/penjualan',
            parent:'admin',
            controller:'adminPenjualanController',
            templateUrl: '../apps/views/admins/penjualan.html'
        })

        .state('penjualanbaru', {
            url: '/penjualanbaru',
            parent:'admin',
            controller:'adminPenjualanBaruController',
            templateUrl: '../apps/views/admins/penjualanbaru.html'
        })


        .state('about', {
            // we'll get to this in a bit       
        });

});