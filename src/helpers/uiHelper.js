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
  toastr.warning(warning);
}

function showError(error) {
  toastr.error(error);
}
