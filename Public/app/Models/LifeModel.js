(function() {
  "use strict";

  var global = (1, eval)("this || {}");
  var App = global.InsuranceApp;
  var Model;
  var Super;

  if (typeof(App && App.Model) !== "undefined") {
    Model = App.Model;
    Super = Model.ItemModel;
    Model.LifeModel = LifeModel;
  }
  else throw new Error("Globals for the app not defined");

  LifeModel.prototype = Object.create(Super.prototype);

  function LifeModel(age, medHistory) {

    Super.call(this, "life");

    var _age = age;
    var _medHistory = medHistory;

    Object.defineProperty(this, "age", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _age;
      },
      set: function(age) {
        age = Math.abs(parseFloat(age, 10));
        if (!age) throw new Error("Invalid age");

        _age = age;
      }
    });

    Object.defineProperty(this, "medHistory", {
      configurable: false,
      enumerable: true,
      value: _medHistory,
      writable: true
    });
  }

  //exposed public methods
  LifeModel.prototype.save = function() {

  };
  LifeModel.prototype.inspect = function() {
    return {
      itemInfo: Super.prototype.inspect.call(this),
      age: this.age,
      medHistory: this.medHistory
    };
  };

  //exposed static methods
  LifeModel.find = function() {

  };
})();
