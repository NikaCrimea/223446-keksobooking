'use strict';

var ESC_KEYCODE = 27;
/**
 *
 * Отрисовка пинов и карточек на карте
 */
var showPinAndCard = function () {
  var similarListElement = document.querySelector('.map__pins');
  var similarCardElement = document.querySelector('.map');
  var pinFragment = document.createDocumentFragment();
  var cardFragment = document.createDocumentFragment();
  var objects = window.data();

  objects.map(function (obj) {
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
/**
 *
 * Активное и неактивное состояние карты
 */
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var mainImg = mainPin.querySelector('img');
var formFieldsNodeList = document.querySelectorAll('fieldset');
var form = document.querySelector('.ad-form');


var getInactiveState = function () {
  map.classList.add('map--faded');

  Array.prototype.slice.call(formFieldsNodeList).map(function (item) {
    item.setAttribute('disabled', 'disabled');
  });

  var coordsOfMainPin = {
    x: parseInt(mainPin.style.left, 10) + (parseInt(mainImg.width, 10) / 2),
    y: parseInt(mainPin.style.top, 10) - (parseInt(mainImg.height, 10) / 2)
  };

  addressInput.setAttribute('value', coordsOfMainPin.x + ', ' + coordsOfMainPin.y);

};
getInactiveState();

var getActiveState = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  showPinAndCard();
  Array.prototype.slice.call(formFieldsNodeList).map(function (item) {
    item.removeAttribute('disabled');
  });
  document.querySelector('#address').setAttribute('disabled', 'disabled');

  var coordsOfMainPin = {
    x: parseInt(mainPin.style.left, 10) - (parseInt(mainImg.width, 10) / 2),
    y: parseInt(mainPin.style.top, 10) + parseInt(mainImg.height, 10)
  };
  addressInput.setAttribute('value', coordsOfMainPin.x + ', ' + coordsOfMainPin.y);
};
/**
 *
 *Перемещение метки по карте
 */
mainPin.addEventListener('mousedown', function (e) {
  e.preventDefault();

  var maxXPosition = document.querySelector('.map__overlay').offsetWidth;
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

    if (startCoords.x >= maxXPosition) {
      mainPin.style.left = maxXPosition - pinWidth + 'px';
    } else if (startCoords.x <= 0) {
      mainPin.style.left = 0 + 'px';
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
    getActiveState();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
