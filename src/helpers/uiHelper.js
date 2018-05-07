import toastr from 'toastr';

export default {
  showMessage,
  showWarning,
  showError
};

toastr.options.positionClass = 'toast-bottom-left';

function showMessage(message) {
  toastr.success(message);
}

function showWarning(warning) {
  toastr.success(warning);
}

function showError(error) {
  toastr.success(error);
}
