'use strict';

(function () {
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

})();
