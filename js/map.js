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
//var form = document.querySelector('.ad-form');


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
/**
 *
 * Сообщение об ошибке
 */
var getErrorMessage = function (message) {
  var main = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error').content;

  var errorMessageElement = errorMessageTemplate.cloneNode(true);
  errorMessageElement.querySelector('.error__message').textContent = message;

  var errorMessageFragment = document.createDocumentFragment();

  errorMessageFragment.appendChild(errorMessageElement);
  main.appendChild(errorMessageFragment);
};

/**
 *
 * Сообщение об успешной отправке формы
 */
var getSuccessMessage = function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content;

  var successMessageElement = successMessageTemplate.cloneNode(true);

  var successMessageFragment = document.createDocumentFragment();

  successMessageFragment.appendChild(successMessageElement);
  main.appendChild(successMessageFragment);
};

var onLoad = function (data) {
  showPinAndCard()
};
var onError = function (message) {
  getErrorMessage(message);
};

/**
 *
 * Отправка формы
 */
var submitButton = document.querySelector('.ad-form__submit');
var form = document.querySelector('.ad-form');
submitButton.addEventListener('click', function (e) {
  e.preventDefault();

  var formData = new FormData();
  var inputTitle = document.querySelector('#title');
  var inputPrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  console.log(roomNumber.value, inputPrice.value, inputTitle.value);
  formData.append('room number', roomNumber.value);
  formData.append('price', inputPrice.value);
  formData.append('title', inputTitle.value);
  console.log('данные', formData.values());

  console.log('submit');

  window.upload(formData, function () {
    getSuccessMessage();
    var successMessage = document.querySelector('.success');
    var main = document.querySelector('main');
    document.addEventListener('keydown', function () {

      if (e.keyCode === ESC_KEYCODE) {
        console.log('esc');
        main.removeChild(successMessage);
      }
    }, {once: true});

    successMessage.addEventListener('click', function () {
      console.log('click');
      main.removeChild(successMessage);
    }, {once: true});
    console.log(notice);


  }, function () {
    getErrorMessage();

    var errorMessage = document.querySelector('.error');
    var errorButton = document.querySelector('.error__button');
    console.log(document.querySelector('main'));
    console.log(errorMessage);

    document.addEventListener('keydown', function () {
      console.log('click');
      if (e.keyCode === ESC_KEYCODE) {
        console.log('esc');
        errorMessage.remove();
      }
    });

    errorMessage.addEventListener('click', function () {
      console.log('click');
      errorMessage.remove();

    }, {once: true});

    errorButton.addEventListener('click', function () {
      console.log('button click');
      errorMessage.remove();

    }, {once: true});

  });
});
