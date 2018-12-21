'use strict';

(function () {
  window.data = function () {
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
  };
})();
