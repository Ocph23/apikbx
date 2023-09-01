angular.module("app.router", ["ui.router"])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main/home');
    $stateProvider

      
        .state("main",{
            url: '/main',
            templateUrl: '../apps/views/guest/base.html'
        })
        .state("home",{
            url: '/home',
            parent : 'main',
            controller:"homeController",
            templateUrl: '../apps/views/guest/home.html'
        })


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

        .state('adminIndex', {
            url: '/index',
            parent: '/admin',
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

        .state('penjualanEdit', {
            url: '/penjualan/:id',
            parent:'admin',
            controller:'adminPenjualanBaruController',
            templateUrl: '../apps/views/admins/penjualanbaru.html'
        })

        .state('adminRiwayatTracing', {
            url: '/riwayattracing/:id',
            parent:'admin',
            controller:'adminPenjualanRiwayatTracingController',
            templateUrl: '../apps/views/admins/penjualanriwayattracing.html'
        })


        .state('about', {
            // we'll get to this in a bit       
        });

});