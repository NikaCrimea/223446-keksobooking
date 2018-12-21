'use strict';

(function () {
  window.pin = function (object) {
    var similarPinTemplate = document.getElementById('pin').content.querySelector('.map__pin');
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = object.location.x.toString(10) + 'px';
    pinElement.style.top = object.location.y.toString(10) + 'px';

    pinImg.setAttribute('src', object.author.avatar);
    pinImg.setAttribute('alt', object.offer.title);

    return pinElement;
  };
})();
