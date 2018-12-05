'use strict';
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
    return i;
  };
  var avatar = getAvatars();
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var description = '';
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  if (typeof similarAds === 'undefined') {
    var result = [];
  }

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
        title: titles[randomI(titles)],
        address: x.toString(10) + ', ' + y.toString(10),
        price: price,
        type: types[randomI(types)],
        rooms: rooms,
        guests: guests,
        checkins: checkins[randomI(checkins)],
        checkout: checkouts[randomI(checkouts)],
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
generateObjects();

var activeState = document.querySelector('.map');
activeState.classList.remove('map--faded');


var popup = document.querySelector('.map__card');
var openPopupButton = document.querySelector('.map__pin');
var closePopupButton = document.querySelector('.popup__close');
var globalPin = document.querySelector('.map__pin--main');

openPopupButton.addEventListener('click', function (e) {
  e.preventDefault();
  popup.classList.add('.popup');
  openPopupButton.classList.add('.map__pin--active');

});

closePopupButton.addEventListener('click', function () {
  popup.classList.remove('.popup');
});

globalPin.addEventListener('click', function () {
  popup.classList.remove('.popup');
});


document.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    popup.classList.remove('.popup');
  }
});


var similarListElement = activeState.querySelector('.map__pins');
var similarPinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

var objects = generateObjects();

var renderPin = function (object) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style.left = object.location.x.toString(10) + 'px';
  pinElement.style.top = object.location.y.toString(10) + 'px';

  pinImg.setAttribute('src', object.author.avatar);
  pinImg.setAttribute('alt', object.offer.title);

  return pinElement;
};

var fragment = document.createDocumentFragment();


objects.map(function (obj) {
  fragment.appendChild(renderPin(obj));
});
similarListElement.appendChild(fragment);

/**
 *
 *
 **/

var semilarCardElement = document.querySelector('.map');
var semilarCardTimplate = document.getElementById('card').content.querySelector('.map__card');

var renderCard = function (object) {
  var cardElement = semilarCardTimplate.cloneNode(true);

  var getTypeOfHouse = function (obj) {
    var typeOfHouse = '';
    for (var i = 0; i < obj.offer.type.length; i++) {
      if (obj.offer.type === 'flat') {
        typeOfHouse = 'Квартира';
      } else if (obj.offer.type === 'bungalo') {
        typeOfHouse = 'Бунгало';
      } else if (obj.offer.type === 'house') {
        typeOfHouse = 'Дом';
      } else {
        typeOfHouse = 'Дворец';
      }
    }
    return typeOfHouse;

  };

  cardElement.querySelector('.popup__title').textContent = object.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = object.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = object.offer.price.toString(10) + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getTypeOfHouse(object);
  cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkins + ', выезд до ' + object.offer.checkout;
  cardElement.querySelector('.popup__feature').textContent = object.offer.features;
  cardElement.querySelector('.popup__description').textContent = object.offer.description;

  var cardPhoto = cardElement.querySelector('.popup__photos');

  for (var i = 0; i < object.offer.photos.length; i++) {
    var img = cardPhoto.querySelector('img').cloneNode(true);
    img.src = object.offer.photos[i];
    cardPhoto.appendChild(img);
  }
  cardElement.querySelector('.popup__avatar').src = object.author.avatar;

  return cardElement;

};

var cardFragment = document.createDocumentFragment();

objects.map(function (obj) {
  cardFragment.appendChild(renderCard(obj));
});

semilarCardElement.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

