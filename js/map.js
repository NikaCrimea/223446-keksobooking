'use strict';

(function () {

  window.inactiveState();

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var mapOverlay = document.querySelector('.map__overlay');
    var maxXPosition = mapOverlay.getBoundingClientRect().width;
    var minXPosition = mapOverlay.getBoundingClientRect().x;
    var pinWidth = document.querySelector('.map__pin img').offsetWidth;

    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      if (startCoords.x - pinWidth <= minXPosition) {
        mainPin.style.left = 0 + 'px';
      } else if (startCoords.x - mapOverlay.getBoundingClientRect().left >= maxXPosition) {
        mainPin.style.left = maxXPosition - pinWidth + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (startCoords.y >= 630) {
        mainPin.style.top = 630 + 'px';
      } else if (startCoords.y <= 130) {
        mainPin.style.top = 130 + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.activeState();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  var submitButton = document.querySelector('.ad-form__submit');

  submitButton.addEventListener('click', function (e) {
    e.preventDefault();

    window.upload(new FormData(document.querySelector('.ad-form')), function () {
      window.successMessage();
      window.inactiveState();
      document.querySelector('.ad-form').reset();


    }, function (message) {
      window.errorMessage(message);
    });
  });

})();
