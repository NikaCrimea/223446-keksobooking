'use strict';
(function () {
  window.activeState = function () {
    var map = document.querySelector('.map');
    var mainPin = document.querySelector('.map__pin--main');
    var addressInput = document.querySelector('#address');
    var mainImg = mainPin.querySelector('img');
    var formFieldsNodeList = document.querySelectorAll('fieldset');

    var form = document.querySelector('.ad-form');
    var resetForm = document.querySelector('.ad-form__reset');
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');


    window.load(function (data) {
      var sliceData = data.slice(0, 5);
      window.showPinAndCard(sliceData);
      window.applyFilter(data);
    }, function (message) {
      window.errorMessage(message);
    });

    Array.prototype.slice.call(formFieldsNodeList).map(function (item) {
      item.removeAttribute('disabled');
    });

    var coordsOfMainPin = {
      x: parseInt(mainPin.style.left, 10) - (parseInt(mainImg.width, 10) / 2),
      y: parseInt(mainPin.style.top, 10) + parseInt(mainImg.height, 10)
    };
    addressInput.setAttribute('value', coordsOfMainPin.x + ', ' + coordsOfMainPin.y);

    window.form();

    form.reset();

    resetForm.addEventListener('click', function (e) {
      e.preventDefault();
      window.inactiveState();
      window.deletePin();
      form.reset();

    });
  };
})();
