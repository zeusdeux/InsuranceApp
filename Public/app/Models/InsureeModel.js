(function() {
  "use strict";

  var idCount = 1;
  var global = (1, eval)("this || {}");
  var App = global.InsuranceApp;
  var Model;
  var Super;

  if (typeof(App && App.Model) !== "undefined") {
    Model = App.Model;
    Super = Model.GenericModel;
    Model.InsureeModel = InsureeModel;
  }
  else throw new Error("Globals for the app not defined");

  InsureeModel.prototype = Object.create(Super.prototype);

  function InsureeModel() {

    Super.call(this, idCount++, new Date());

    var _dob;
    var _email;

    this.firstName = "";
    this.lastName = "";
    this.phone = "";

    //make them non-deletable (amongst other things)
    Object.defineProperties(this, {
      "firstName": {
        configurable: false
      },
      "lastName": {
        configurable: false
      },
      "phone": {
        configurable: false
      }
    });

    Object.defineProperty(this, "dob", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _dob.toLocaleDateString();
      },
      set: function(dateString) { //the type accepted by Date.parse(), preferably yyyy-mm-dd
        _dob = new Date(dateString);
      }
    });

    Object.defineProperty(this, "email", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _email;
      },
      set: function(email) {
        email = email.trim();
        if (email.match(/^[\d\w]{1}([\.]?[\d\w]+)*@{1}[\d\w]+\.(com|org|net|co|gov|in){1}(\.{0,1}(?=(in|dk|us|uk))){0,1}\4$/)) _email = email;
        else throw new Error("Invalid email address");
      }
    });
  }

  //exposed public methods
  InsureeModel.prototype.save = function() {
    //save to indexdb only when all required fields are filled
  };

  InsureeModel.prototype.inspect = function() {
    return {
      genericInfo: Super.prototype.inspect.call(this),
      name: {
        first: this.firstName,
        last: this.lastName
      },
      dob: this.dob,
      email: this.email,
      phone: this.phone,
    };
  };

  //exposed static method
  InsureeModel.find = function(findParamsObj) {

  };
})();
