'use strict';
(function () {
  window.inactiveState = function () {
    var map = document.querySelector('.map');
    var formFieldsNodeList = document.querySelectorAll('fieldset');
    var mainPin = document.querySelector('.map__pin--main');
    var addressInput = document.querySelector('#address');
    var mainImg = mainPin.querySelector('img');

    map.classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    Array.prototype.slice.call(formFieldsNodeList).map(function (item) {
      item.setAttribute('disabled', 'disabled');
    });

    var coordsOfMainPin = {
      x: parseInt(mainPin.style.left, 10) + (parseInt(mainImg.width, 10) / 2),
      y: parseInt(mainPin.style.top, 10) - (parseInt(mainImg.height, 10) / 2)
    };

    addressInput.setAttribute('value', coordsOfMainPin.x + ', ' + coordsOfMainPin.y);

  };
})();
