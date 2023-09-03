angular.module("app.router", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main/home');
        $stateProvider
            .state("main", {
                url: '/main',
                templateUrl: '../apps/views/guest/base.html'
            })

            .state("home", {
                url: '/home',
                parent: 'main',
                controller: "homeController",
                templateUrl: '../apps/views/guest/home.html'
            })

            .state("tracking", {
                url: '/tracking',
                params:{id:null},
                parent: 'main',
                controller: "trackingController",
                templateUrl: '../apps/views/guest/tracking.html'
            })

            .state("about", {
                url: '/about',
                parent: 'main',
                controller: "aboutController",
                templateUrl: '../apps/views/guest/about.html'
            })

            .state("agen", {
                url: '/agen',
                parent: 'main',
                controller: "agenController",
                templateUrl: '../apps/views/guest/agen.html'
            })
            .state("product", {
                url: '/product',
                parent: 'main',
                controller: "productController",
                templateUrl: '../apps/views/guest/product.html'
            })
            .state("kanwil", {
                url: '/kanwil',
                parent: 'main',
                controller: "kanwilController",
                templateUrl: '../apps/views/guest/kanwil.html'
            })

            .state("contact", {
                url: '/contact',
                parent: 'main',
                controller: "contactController",
                templateUrl: '../apps/views/guest/contact.html'
            })

            .state("account", {
                url: '/account',
                templateUrl: '../apps/views/accounts/account.html'
            })

            .state("login", {
                url: '/login',
                parent: 'account',
                controller: "LoginController",
                templateUrl: '../apps/views/accounts/login.html'
            })
            .state("register", {
                url: '/register',
                parent: 'account',
                templateUrl: '../apps/views/accounts/register.html'
            })

            .state('admin', {
                url: '/admin',
                controller: 'adminController',
                templateUrl: '../apps/views/admins/admin.html'
            })

            .state('adminIndex', {
                url: '/index',
                parent: '/admin',
                controller: 'adminController',
                templateUrl: '../apps/views/admins/admin.html'
            })

            .state('penjualan', {
                url: '/penjualan',
                parent: 'admin',
                controller: 'adminPenjualanController',
                templateUrl: '../apps/views/admins/penjualan.html'
            })

            .state('penjualanbaru', {
                url: '/penjualanbaru',
                parent: 'admin',
                controller: 'adminPenjualanBaruController',
                templateUrl: '../apps/views/admins/penjualanbaru.html'
            })

            .state('penjualanEdit', {
                url: '/penjualan/:id',
                parent: 'admin',
                controller: 'adminPenjualanBaruController',
                templateUrl: '../apps/views/admins/penjualanbaru.html'
            })

            .state('adminRiwayatTracing', {
                url: '/riwayattracing/:id',
                parent: 'admin',
                controller: 'adminPenjualanRiwayatTracingController',
                templateUrl: '../apps/views/admins/penjualanriwayattracing.html'
            })

            .state('adminRegional', {
                url: '/regional',
                parent: 'admin',
                controller: 'adminRegionalController',
                templateUrl: '../apps/views/admins/regional.html'
            })

            .state('adminKanwil', {
                url: '/kanwil/:id',
                params:{id:null},
                parent: 'admin',
                controller: 'adminKanwilController',
                templateUrl: '../apps/views/admins/kanwil.html'
            })


    });