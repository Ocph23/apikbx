angular.module("helper.service", [])
    .factory("helperServices", helperServices)
    ;

function helperServices() {
    var service = {};
    service.url = location.origin;
    calculateTotal = (model) => {
        var volume=0;
        if (model.isvolume) {
            volume = model.dimensi_panjang * model.dimensi_lebar * model.dimensi_panjang
            biaya = model.tarif * (volume / 1000000);
        } else {
            biaya = model.tarif * model.berat;
        }
        var total = biaya + model.biaya_packing + model.biaya_lain;
        return {biaya:biaya, total:total, volume:(volume/1000000)}
    }


   

    return { url: service.url, calculateTotal:calculateTotal};
}