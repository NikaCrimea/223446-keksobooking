'use strict';
(function () {
  window.successMessage = function () {

    var ESC_KEYCODE = 27;
    var main = document.querySelector('main');
    var successMessageTemplate = document.querySelector('#success').content;
    var successMessageElement = successMessageTemplate.cloneNode(true);

    var successMessageFragment = document.createDocumentFragment();

    successMessageFragment.appendChild(successMessageElement);
    main.appendChild(successMessageFragment);

    var successMessage = document.querySelector('.success');

    document.addEventListener('keydown', function (e) {

      if (e.keyCode === ESC_KEYCODE) {

        main.removeChild(successMessage);
        window.inactiveState();
        window.deletePin();

        document.querySelector('.ad-form').reset();
      }
    }, {once: true});

    successMessage.addEventListener('click', function () {

      main.removeChild(successMessage);
      window.inactiveState();
      window.deletePin();

      document.querySelector('.ad-form').reset();
    }, {once: true});

  };
})();
