'use strict';

(function () {
  window.card = function (object) {

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
    if (!object.offer.checkins || !object.offer.checkout) {
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
})();
