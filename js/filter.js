'use strict';
(function () {
  window.filter = function (data) {

    var housingType = document.querySelector('#housing-type');
    var housingPrice = document.querySelector('#housing-price');
    var housingRooms = document.querySelector('#housing-rooms');
    var housingGuests = document.querySelector('#housing-guests');
    var housingFeatures = document.querySelector('#housing-features').querySelectorAll('input');
    var housingFeaturesArr = Array.from(housingFeatures);

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
})();
