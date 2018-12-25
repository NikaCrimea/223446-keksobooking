'use strict';
(function () {
  window.errorMessage = function (message) {

    var ESC_KEYCODE = 27;
    var main = document.querySelector('main');
    var errorMessageTemplate = document.querySelector('#error').content;

    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector('.error__message').textContent = message;

    var errorMessageFragment = document.createDocumentFragment();

    errorMessageFragment.appendChild(errorMessageElement);
    main.appendChild(errorMessageFragment);

    var errorMessage = document.querySelector('.error');
    var errorButton = document.querySelector('.error__button');
    document.addEventListener('keydown', function (e) {

      if (e.keyCode === ESC_KEYCODE) {
        errorMessage.remove();
      }
    });

    errorMessage.addEventListener('click', function () {
      errorMessage.remove();
    }, {once: true});

    errorButton.addEventListener('click', function () {
      errorMessage.remove();
    }, {once: true});

  };
})();
