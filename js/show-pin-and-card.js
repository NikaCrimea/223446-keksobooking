'use strict';
(function () {
  window.showPinAndCard = function (data) {
    var ESC_KEYCODE = 27;

    window.deletePin();
    var similarListElement = document.querySelector('.map__pins');
    var similarCardElement = document.querySelector('.map');
    var pinFragment = document.createDocumentFragment();
    var cardFragment = document.createDocumentFragment();

    data.map(function (obj) {
      var pin = window.pin(obj);
      var card = window.card(obj);
      pinFragment.appendChild(pin);
      cardFragment.appendChild(card);
      var cardClose = card.querySelector('.popup__close');

      var openCard = function () {
        var currentlyActiveCard = document.querySelector('.visible');
        var currentlyActivePin = document.querySelector('.map__pin--active');

        if (currentlyActivePin) {
          currentlyActivePin.classList.remove('map__pin--active');
        }

        if (currentlyActiveCard) {
          currentlyActiveCard.classList.remove('visible');
        }

        card.classList.add('visible');
        pin.classList.add('map__pin--active');

        document.addEventListener('keydown', function (e) {
          if (e.keyCode === ESC_KEYCODE) {
            card.classList.remove('visible');
            pin.classList.remove('map__pin--active');
          }
        }, {once: true});
      };

      var closeCard = function () {
        card.classList.remove('visible');
        pin.classList.remove('map__pin--active');
      };

      pin.addEventListener('click', function () {
        openCard();
      });

      cardClose.addEventListener('click', function () {
        closeCard();
      });
    });

    similarListElement.appendChild(pinFragment);
    similarCardElement.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

  };
})();
