angular.module("message.service", []).factory("message", MessageServices);

function MessageServices(SweetAlert, $q) {
  return { info: info, error: error, warning: warning, dialog: dialog };

  function info(params) {
    SweetAlert.swal({
      title: "Sukses",
      text: params,
      icon: "info"
    });
  }

  function error(params) {
    SweetAlert.swal({
      title: "Error",
      text: params,
      icon: "error"
    });
  }

  function warning(params) {
    SweetAlert.swal({
      title: "Sukses",
      text: params,
      icon: "warning"
    });
  }

  function dialog(messageText, yesBtn, cancelBtn) {
    var def = $q.defer();
    var yesText = "Ya";
    var cancelText = "Batal";

    if (yesBtn) yesText = yesBtn;

    if (cancelBtn) cancelText = cancelBtn;

    SweetAlert
      .swal({
        title: "Yakin ?",
        text: messageText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: yesText,
        cancelButtonText: cancelText,
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          def.resolve(result.value);
        } else {
          def.reject(result.value);
        }
      });

    return def.promise;
  }
}
