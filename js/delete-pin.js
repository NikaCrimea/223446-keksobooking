'use strict';
(function () {
  window.deletePin = function () {

    var pins = Array.from(document.querySelectorAll('.map__pin'));
    pins.filter(function (el) {
      return (!el.classList.contains('map__pin--main'));
    }).forEach(function (el) {
      el.remove();
    });
  };

})();
