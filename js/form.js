'use strict';

(function () {

  window.form = function () {
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    var typeOfHousing = document.querySelector('#type');
    var titleInput = document.querySelector('#title');
    var priceInput = document.querySelector('#price');
    var form = document.querySelector('.ad-form');
    var timein = document.querySelector('#timein');
    var timeout = document.querySelector('#timeout');

    function CustomValidation() {
      this.invalidities = [];
      this.invaliditiesOfHousings = [];
      this.invaliditiesOfTitles = [];
      this.invaliditiesOfTimes = [];

    }

    CustomValidation.prototype = {

      checkValidity: function () {
        var roomNumberValue = Number(roomNumber.value);
        var capacityValue = Number(capacity.value);
        var submitButton = document.querySelector('.ad-form__submit');

        if (titleInput.value.length < 30) {
          this.addInvalidityOfTitle('Заголовок должен состоять минимум из 30 символов');
        } else if (titleInput.value.length > 100) {
          this.addInvalidityOfTitle('Максимальная длина заголовка 100 символов');
        }

        if (priceInput.validity.rangeOverflow) {
          this.addInvalidityOfHousing('Максимальная цена за ночь 1 000 000');
        }

        if (typeOfHousing.value === 'bungalo' && priceInput.value < 0) {
          this.addInvalidityOfHousing('минимальная цена за ночь 0');
        } else if (typeOfHousing.value === 'flat' && priceInput.value < 1000) {
          this.addInvalidityOfHousing('минимальная цена за ночь 1000');
        } else if (typeOfHousing.value === 'house' && priceInput.value < 5000) {
          this.addInvalidityOfHousing('минимальная цена за ночь 5000');
        } else if (typeOfHousing.value === 'palace' && priceInput.value < 10000) {
          this.addInvalidityOfHousing('минимальная цена за ночь 10 000');
        }

        if (capacityValue === 0 && roomNumberValue !== 100) {
          this.addInvalidityOfRoom('не для гостей');
          submitButton.disabled = true;
        } else {
          submitButton.disabled = false;
        }

        if (capacityValue > roomNumberValue) {
          this.addInvalidityOfRoom('недопустимое количество гостей');
          submitButton.disabled = true;
        } else {
          submitButton.disabled = false;
        }

        if (this.invalidities.length > 0) {
          return false;
        } else {
          return true;
        }
      },

      addInvalidityOfTitle: function (message) {
        this.invaliditiesOfTitles.push(message);
      },

      getInvaliditiesOfTitle: function () {
        return this.invaliditiesOfTitles.join('. \n');
      },

      addInvalidityOfHousing: function (message) {
        this.invaliditiesOfHousings.push(message);
      },

      getInvaliditiesOfHousing: function () {
        return this.invaliditiesOfHousings.join('. \n');
      },

      addInvalidityOfRoom: function (message) {
        this.invalidities.push(message);
      },

      getInvaliditiesOfRoom: function () {
        return this.invalidities.join('. \n');
      }
    };

    timein.addEventListener('change', function () {
      timeout.value = timein.value;
    });
    timeout.addEventListener('change', function () {
      timein.value = timeout.value;
    });

    capacity.addEventListener('change', function (evt) {

      capacity.setCustomValidity('');

      var validation = new CustomValidation();
      validation.checkValidity(capacity);
      var validityMessage = validation.getInvaliditiesOfRoom();
      capacity.setCustomValidity(validityMessage);

      evt.target.classList.add('dirty');

      form.reportValidity();
    });


    priceInput.addEventListener('change', function (evt) {

      priceInput.setCustomValidity('');

      var validationOfHousing = new CustomValidation();
      validationOfHousing.checkValidity(priceInput);
      var validityHousingMessage = validationOfHousing.getInvaliditiesOfHousing();
      priceInput.setCustomValidity(validityHousingMessage);

      evt.target.classList.add('dirty');

      form.reportValidity();
    });


    titleInput.addEventListener('keyup', function (evt) {
      titleInput.setCustomValidity('');

      var validationOftitle = new CustomValidation();
      validationOftitle.checkValidity(titleInput);
      var validityTitleMessage = validationOftitle.getInvaliditiesOfTitle();
      titleInput.setCustomValidity(validityTitleMessage);

      evt.target.classList.add('dirty');

      form.reportValidity();

    });
  };

})();
