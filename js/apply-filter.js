'use strict';
(function () {
  window.applyFilter = function (data) {

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
        var newData = window.filter(data);
        window.showPinAndCard(newData);

      });
    });
  };

})();
