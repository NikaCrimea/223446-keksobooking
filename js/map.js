'use strict';

var ESC_KEYCODE = 27;
/**
*
* Отрисовка пинов и карточек на карте
*/
var showPinAndCard = function (data) {
  deletePins();
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
/**
 *
 * Активное и неактивное состояние карты
 */
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var mainImg = mainPin.querySelector('img');
var formFieldsNodeList = document.querySelectorAll('fieldset');


var getInactiveState = function () {
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
getInactiveState();

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

  var errorMessage = document.querySelector('.error');
  var errorButton = document.querySelector('.error__button');
  document.addEventListener('keydown', function (e) {
    console.log('keydown');
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
};


var onError = function (message) {
  getErrorMessage(message);
};

/**
 *
 * Удаляем пины с карты
 */
var deletePins = function () {
  var pins = Array.from(document.querySelectorAll('.map__pin'));
  pins.filter(function (el) {
    return (!el.classList.contains('map__pin--main'));
  }).forEach(function (el) {
    el.remove();
  });
};


var getFilterData = function (data) {

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features').querySelectorAll('input');

  var filters = [housingType, housingPrice, housingRooms, housingGuests];
  var housingFeaturesArr = Array.from(housingFeatures);
  housingFeaturesArr.forEach(function (el) {
    filters.push(el);
  });

  var pushOrPopItem = function (arr, elementValue) {
    if (arr.indexOf(elementValue) === -1) {
      arr.push(elementValue);
    } else {
      arr.splice(arr.indexOf(elementValue), 1);
    }
  };

  var select = {
    type: '',
    price: '',
    rooms: '',
    guests: '',
    features: []
  };

  select.type = housingType.value;
	select.price = housingPrice.value;
  select.rooms = housingRooms.value;
  select.guests = housingGuests.value;
  select.features = housingFeaturesArr.filter(function (checkbox) {
    return checkbox.checked;
  })
    .map(function (checkbox) {
      return checkbox.value;
    });


  var result = data.filter(function (item) {
    var shouldBeShown = true;


    shouldBeShown = shouldBeShown && (select.type !== 'any' ? item.offer.type === select.type : true);
    shouldBeShown = shouldBeShown && (select.rooms !== 'any' ? item.offer.rooms === Number(select.rooms) : true);
    shouldBeShown = shouldBeShown && (select.guests !== 'any' ? item.offer.guests === Number(select.guests) : true);


    if (select.price === 'middle' && (item.offer.price < 10000 || item.offer.price >= 50000)) {
      shouldBeShown = shouldBeShown && false;
    } else if (select.price === 'high' && item.offer.price <= 50000) {
      shouldBeShown = shouldBeShown && false;
    } else if (select.price === 'low' && item.offer.price > 10000) {
    	shouldBeShown = shouldBeShown && false;
    } else if (select.price === 'any') {
      shouldBeShown = shouldBeShown && true;
    }

    select.features.forEach(function (filterFeatures) {
    	if (item.offer.features.indexOf(filterFeatures) === -1) {
      	shouldBeShown = shouldBeShown && false;
      }
    });

    return shouldBeShown;
  });
  return (result.length > 5 ? result.slice(0, 5) : result.slice(0, result.length));
};
/**
 *
 * подключаю фильтрацию на change
 */
var getFilterCard = function (data) {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features').querySelectorAll('input');

  var filters = [housingType, housingPrice, housingRooms, housingGuests];
  var housingFeaturesAr = Array.from(housingFeatures);
  housingFeaturesAr.forEach(function (el) {
    filters.push(el);
  });
  filters.forEach(function (el) {
    el.addEventListener('change', function () {
      var newData = getFilterData(data);
      showPinAndCard(newData);

    });
  });
};
/**
 *
 * Активное состояние карты
 */
var getActiveState = function () {
  var form = document.querySelector('.ad-form');
  var resetForm = document.querySelector('.ad-form__reset');
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');


  window.load(function (data) {
    var sliceData = data.slice(0, 5);
    showPinAndCard(sliceData);
    getFilterCard(data);
    //showPinAndCard(getFilterCard(data));
    //getFilterData(data);
  }, onError);

  Array.prototype.slice.call(formFieldsNodeList).map(function (item) {
    item.removeAttribute('disabled');
  });

  var coordsOfMainPin = {
    x: parseInt(mainPin.style.left, 10) - (parseInt(mainImg.width, 10) / 2),
    y: parseInt(mainPin.style.top, 10) + parseInt(mainImg.height, 10)
  };
  addressInput.setAttribute('value', coordsOfMainPin.x + ', ' + coordsOfMainPin.y);

  //dataOfFilters();

  window.form();

  //очищаю форму
  form.reset();

  resetForm.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('reset');
    getInactiveState();
    deletePins();
    form.reset();

  });
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
 * Сообщение об успешной отправке формы
 */
var getSuccessMessage = function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content;
  var successMessageElement = successMessageTemplate.cloneNode(true);

  var successMessageFragment = document.createDocumentFragment();

  successMessageFragment.appendChild(successMessageElement);
  main.appendChild(successMessageFragment);

  var successMessage = document.querySelector('.success');
  document.addEventListener('keydown', function (e) {

    if (e.keyCode === ESC_KEYCODE) {
      console.log('esc');
      main.removeChild(successMessage);

      getInactiveState();

      deletePins();

      document.querySelector('.ad-form').reset();
    }
  }, {once: true});

  successMessage.addEventListener('click', function () {
    console.log('click');
    main.removeChild(successMessage);
    getInactiveState();
    deletePins();
    document.querySelector('.ad-form').reset();
  }, {once: true});
};

/**
 *
 * Отправка формы
 */

var submitButton = document.querySelector('.ad-form__submit');

submitButton.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('submit');

  window.upload(new FormData(document.querySelector('.ad-form')), function () {
    getSuccessMessage();
    getInactiveState();
    document.querySelector('.ad-form').reset();


  }, function (message) {
    getErrorMessage(message);
  });
});

