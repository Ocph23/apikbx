angular
  .module("main.controller", [])
  .controller("homeController", HomeController)
  .controller("trackingController", TrackingController)
  .controller("aboutController", AboutController)
  .controller("agenController", AgenController)
  .controller("kanwilController", KanwilController)
  .controller("contactController", ContactController)
  .controller("productController", ProductController)


function HomeController($scope, $state, $http, helperServices, AuthService, SweetAlert) {

  this.$onInit = function () {
    $('.carousel').carousel()
    var map = L.map('map').setView([-2.274, 120.141], 5);
    var om = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    om.addTo(map);
    $http({
      method: "get",
      url: helperServices.url + "/api/regional/withkanwil",
      headers: AuthService.getHeader()
    }).then(
      function successCallback(response) {
        $scope.model = response.data;
        $scope.model.forEach((x, y) => {

          if (x.items) {
            x.items.forEach((item, index) => {

              if (item.kordinat) {
                try {
                  L.marker([item.kordinat.split(',')[0], item.kordinat.split(',')[1]]).addTo(map)
                    .bindPopup(item.nama)
                    .openPopup();
                } catch (e) {

                }
              }


            })
          }
        })
      });
  }

  $scope.layanans = [
    { name: "Darat", picture: "/images/keybe-xpress-darat.png" },
    { name: "Laut", picture: "/images/keybe-xpress-laut.png" },
    { name: "Udara", picture: "/images/keybe-xpress-udara.png" },
    { name: "Kereta", picture: "/images/keybe-xpress-kereta.png" },
    { name: "Trucking", picture: "/images/keybe-layanan-trucking.png" },
    { name: "City Courier", picture: "/images/keybe-xpress-city-courier.png" },

  ];

  $scope.features = [
    { name: "Menjangkau Se-Indonesia Tanpa pihak ke 3", picture: "/images/1-300x300.png" },
    { name: "Real Time Tracking Tracking System", picture: "/images/real-time.png" },
    { name: "Harga Regular Service Premium", picture: "/images/keybe-logistik-tarif-murah.png" },
    { name: "Cepat dan Aman Sampai Tujuan", picture: "/images/keybe-xpress-truck.png" },
  ];


  $scope.tracking = (data) => {
    if (data) {
      $state.go("tracking", { id: data });
    }
  }

}

function TrackingController($scope, $stateParams, $http, helperServices, AuthService, SweetAlert) {

  this.$onInit = () => {
    if ($stateParams.id) {
      $scope.resi = $stateParams.id;
      $scope.tracking($scope.resi);
    }
  }

  $scope.tracking = (resi) => {
    $scope.model = null;
    $http({
      method: "get",
      url: helperServices.url + "/api/tracking/bystt/" + resi,
      headers: AuthService.getHeader()
    }).then(
      function successCallback(response) {
        $scope.model = response.data;
      },
      function errorCallback(response) {
        SweetAlert.swal({
          title: 'Error',
          text: response.data.message,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'close'
        });
      }
    );


  }

}
function AboutController($scope) { }
function AgenController($scope) {

  $scope.tanyajawab = [
    {
      id: "1", pertanyaan: "Apa itu Agen KeyBe Xpress?",
      jawaban: "KeyBe Agency adalah konsep pengembangan jaringan melalui kerjasama kemitraan antara KeyBe Express dengan perorangan atau badan usaha dalam rangka memberikan pelayanan KeyBe Express secara lebih luas kepada Masyarakat. Selain untuk lebih mendekatkan diri dengan konsumen, keberadaan KeyBe Agency dimaksudkan juga sebagai bentuk pemberdayaan sektor ekonomi mikro melalui pengembangan pola-pola kemitraan dalam bisnis. "
    },
    {
      id: "2", pertanyaan: "Berapa biaya yang harus saya keluarkan?",
      jawaban: "Pendaftaran Agen KeyBe Xpress Gratis, namun kamu harus menyiapakan sendiri untuk budget operasional"
    },
    {
      id: "3", pertanyaan: "Apa yang harus saya siapkan untuk menjadi Agen KeyBe Xpress?",
      jawaban: "Memiliki tempat usaha, seperangkat komputer/laptop dengan printer, android (Aplikasi Barcode) dan alat komunikasi"
    },
    {
      id: "4", pertanyaan: "Berapa pendapatan yang saya dapatkan?",
      jawaban: "Sharing fee yang diberikan menarik hingga 21 % dan bersifat progresif."
    },
    {
      id: "5", pertanyaan: "Apa yang harus saya lakukan jika menemukan masalah?",
      jawaban: "Sharing fee yang diberikan menarik hingga 21 % dan bersifat progresif."
    },
  ]

}
function KanwilController($scope, $http, AuthService, helperServices, SweetAlert) {
  this.$onInit = function () {
    $http({
      method: "get",
      url: helperServices.url + "/api/regional/withkanwil",
      headers: AuthService.getHeader()
    }).then(
      function successCallback(response) {
        $scope.model = response.data;

        setTimeout(() => {
          var map = L.map('map').setView([-2.274, 120.141], 5);
          var om = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })

          om.addTo(map);

          $scope.model.forEach((x, y) => {

            if (x.items) {
              x.items.forEach((item, index) => {

                if (item.kordinat) {
                  try {
                    L.marker([item.kordinat.split(',')[0], item.kordinat.split(',')[1]]).addTo(map)
                      .bindPopup(item.nama)
                      .openPopup();
                  } catch (e) {

                  }
                }


              })
            }




          })
        }, 1000)




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
function ContactController($scope) { }
function ProductController($scope) {
  $scope.products = [
    {
      id: 1,
      title: "DARAT",
      content: "DARAT yaitu layanan jasa pengiriman ekspress melalui transportasi darat dengan tarif bersaing dan biaya yang efektif untuk pengiriman barang-barang ke seluruh indonesia. Jasa layanan ini diciptakan untuk menjawab kebutuhan pelanggan terhadap pengiriman barang berskala kecil maupun berskala besar ke daerah-daerah yang mudah dan sudah terjangkau di seluruh Indonesia dengan pengiriman yang sesuai dengan estimasi pengiriman.",
      picture: "/images/keybe-xpress-darat.png"
    },
    {
      id: 2,
      title: "LAUT",
      content: "LAUT yaitu layanan jasa pengiriman barang via laut dengan tarif cargo laut yang terjangkau, serta estimasi pengiriman akan dilakukan secara tepat dan akurat. Jasa pengiriman barang via laut menjadi pilihan tepat untuk bisa kirim barang dalam jumlah banyak atau dan mempunyai beban yang sangat berat. KeyBe Xpress hadir dengan prosedur yang memudahkan anda untuk mengirim barang via laut. Semua jenis barang akan kami layani.",
      picture: "/images/keybe-xpress-laut.png"
    },
    {
      id: 3,
      title: "UDARA",
      content: "UDARA yaitu layanan jasa pengiriman barang via udara, KeyBe Xpress saat ini telah menjadi sub agen cargo resmi dari maskapai terbesar di Indonesia. Dimana pelayanan kami lebih terkordinasi dan terpercaya dengan menerbitkan resi/airway bill Oleh Agen Utama kami. Pelayanan via udara kami dengan performance estimasi yang sesuai dengan barang tiba ditujuan dan untuk seluruh kota besar di Indonesia menjadikan kami sebagai cargo terpercaya dalam hal ketepatan waktu penyampaian.",
      picture: "/images/keybe-xpress-udara.png"
    },
    {
      id: 4,
      title: "KERETA API",
      content: "KERETA API yaitu layanan jasa pengiriman melalui transportasi kereta api. Dengan cakupan bisnis Door To Door (DTD) service demi memaksimalkan layanan paripurna bagi pelanggan kereta api yang didukung dengan angkutan pra dan lanjutan serta layanan penunjangnya dan pengiriman di seluruh stasiun di Indonesia.",
      picture: "/images/keybe-xpress-kereta.png"
    },
    {
      id: 5,
      title: "TRUCKING",
      content: "TRUCKING yaitu layanan jasa pengiriman barang via darat menggunakan armada mobil dan truk antar kota hingga antar pulau dimana barang yang akan dikirim dalam jumlah besar/charter dan untuk memenuhi kebutuhan pengiriman barang yang lebih murah dan cepat. Jasa pengiriman barang dengan truk dan mobil lebih efektif dapat memuat barang atau perabotan, peralatan elektronik bahkan sepeda motor dalam jumlah yang banyak.",
      picture: "/images/keybe-layanan-trucking.png"
    },
    {
      id: 6,
      title: "CITY COURIER",
      content: "CITY KURIR yaitu layanan pickup dan delivery dalam satu wilayah dan layanan ini mengedepankan lead time proses pickup dan delivery dalam rentang waktu yang singkat dalam hitungan jam yang tersebar dibeberapa kota di Indonesia dengan waktu pengiriman waktu yang cepat.",
      picture: "/images/keybe-xpress-city-courier.png"
    },

  ]


}