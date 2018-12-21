'use strict';

var ESC_KEYCODE = 27;

function generateObjects() {

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
  };
  var getAvatars = function () {
    var avatar = [];
    for (var i = 1; i < 9; i++) {
      var url = 'img/avatars/user' + '0' + i.toString(10) + '.png';
      avatar.push(url);
    }
    return avatar;
  };
  var getRandomFeature = function (arr) {
    var facilities = [];
    var maxLength = arr.length;
    for (var i = 0; i < getRandomNumber(1, maxLength); i++) {
      facilities.push(arr[i]);
    }
    return facilities;
  };

  var randomI = function (arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
  };
  var avatar = getAvatars();
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var description = '';
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var result = [];

  for (var i = 0; i < 8; i++) {
    var x = getRandomNumber(1, 585);
    var y = getRandomNumber(130, 630);
    var price = getRandomNumber(1000, 1000000);
    var rooms = getRandomNumber(1, 5);
    var guests = getRandomNumber(1, 10);
    result.push({
      author: {
        avatar: avatar.pop()
      },
      offer: {
        title: randomI(titles),
        address: x.toString(10) + ', ' + y.toString(10),
        price: price,
        type: types[randomI(Object.keys(types))],
        rooms: rooms,
        guests: guests,
        checkins: randomI(checkins),
        checkout: randomI(checkouts),
        features: getRandomFeature(features),
        description: description,
        photos: photos
      },
      location: {
        x: x,
        y: y
      }
    });
  }
  return result;
}

var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

var objects = generateObjects();

var similarCardElement = document.querySelector('.map');

var renderCard = function (object) {
  var semilarCardTimplate = document.getElementById('card').content.querySelector('.map__card');
  var cardElement = semilarCardTimplate.cloneNode(true);

  var checkAvailabilityOfElement = function (offerElement, objectOffer) {
    if (!objectOffer) {
      offerElement.remove();
    } else {
      offerElement.textContent = objectOffer;
    }
  };

  var offerTitleElement = cardElement.querySelector('.popup__title');
  checkAvailabilityOfElement(offerTitleElement, object.offer.title);

  var offerAddress = cardElement.querySelector('.popup__text--address');
  checkAvailabilityOfElement(offerAddress, object.offer.address);

  var offerPriceElement = cardElement.querySelector('.popup__text--price');
  if (!object.offer.price) {
    offerPriceElement.remove();
  } else {
    offerPriceElement.textContent = object.offer.price.toString(10) + '₽/ночь';
  }

  var offerTypeElement = cardElement.querySelector('.popup__type');
  checkAvailabilityOfElement(offerTypeElement, object.offer.type);

  var offerRoomaAndGuestsElement = cardElement.querySelector('.popup__text--capacity');
  if (!object.offer.rooms && !object.offer.guests) {
    offerRoomaAndGuestsElement.remove();
  } else {
    offerRoomaAndGuestsElement.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  }

  var offerCheckinsAdnCheckoutElement = cardElement.querySelector('.popup__text--time');
  if (!object.offer.checkins && !object.offer.checkout) {
    offerCheckinsAdnCheckoutElement.remove();
  } else {
    offerCheckinsAdnCheckoutElement.textContent = 'Заезд после ' + object.offer.checkins + ', выезд до ' + object.offer.checkout;
  }

  var offerFeaturesElement = cardElement.querySelector('.popup__feature').textContent = object.offer.features;
  checkAvailabilityOfElement(offerFeaturesElement, object.offer.features);

  var offerDescriptionElement = cardElement.querySelector('.popup__description');
  checkAvailabilityOfElement(offerDescriptionElement, object.offer.description);

  var cardPhoto = cardElement.querySelector('.popup__photos');
  var cardImgTemplate = cardPhoto.querySelector('img');

  for (var i = 0; i < object.offer.photos.length; i++) {
    var img = cardImgTemplate.cloneNode(true);
    img.src = object.offer.photos[i];
    cardPhoto.appendChild(img);
  }
  cardImgTemplate.remove();
  cardElement.querySelector('.popup__avatar').src = object.author.avatar;
  cardElement.classList.add('hidden');

  return cardElement;

};

var renderPin = function (object) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style.left = object.location.x.toString(10) + 'px';
  pinElement.style.top = object.location.y.toString(10) + 'px';

  pinImg.setAttribute('src', object.author.avatar);
  pinImg.setAttribute('alt', object.offer.title);

  return pinElement;
};

var pinFragment = document.createDocumentFragment();
var cardFragment = document.createDocumentFragment();


var showPinAndCard = function () {
  objects.map(function (obj) {
    var pin = renderPin(obj);
    var card = renderCard(obj);
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
 *
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
 *Перемещение метки по карте
 *
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
 *Валидация формы
 */
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

function CustomValidation() {
  this.invalidities = [];
}

CustomValidation.prototype = {

  checkValidity: function () {
    var roomNumberValue = Number(roomNumber.value);
    var capacityValue = Number(capacity.value);


    if (capacityValue === 0 && roomNumberValue !== 100) {
      this.addInvalidity('не для гостей');
    }
    if (capacityValue > roomNumberValue) {
      this.addInvalidity('недопустимое количество гостей');
    }
    if (this.invalidities.length > 0) {
      return false;
    } else {
      return true;
    }
  },

  addInvalidity: function (message) {
    this.invalidities.push(message);
  },

  getInvalidities: function () {
    return this.invalidities.join('. \n');
  }
};
var selects = [roomNumber, capacity];

selects.forEach(function (el) {

  el.addEventListener('change', function () {

    roomNumber.setCustomValidity('');

    var validation = new CustomValidation();
    validation.checkValidity(roomNumber, capacity);
    var validityMessage = validation.getInvalidities();
    roomNumber.setCustomValidity(validityMessage);
  });
});
