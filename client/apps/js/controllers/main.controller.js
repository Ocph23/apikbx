angular
  .module("main.controller", [])
  .controller("homeController", HomeController)





  function HomeController($scope){
    $scope.layanans=[
        {name:"Darat", picture:"/images/keybe-xpress-darat.png"},
        {name:"Laut", picture:"/images/keybe-xpress-laut.png"},
        {name:"Udara", picture:"/images/keybe-xpress-udara.png"},
        {name:"Kereta", picture:"/images/keybe-xpress-kereta.png"},
        {name:"Trucking", picture:"/images/keybe-layanan-trucking.png"},
        {name:"City Courier", picture:"/images/keybe-xpress-city-courier.png"},

    ];

    $scope.features=[
        {name:"Menjangkau Se-Indonesia Tanpa pihak ke 3", picture:"/images/1-300x300.png"},
        {name:"Real Time Tracking Tracking System", picture:"/images/real-time.png"},
        {name:"Harga Regular Service Premium", picture:"/images/keybe-logistik-tarif-murah.png"},
        {name:"Cepat dan Aman Sampai Tujuan", picture:"/images/keybe-xpress-truck.png"},
    ];

  }