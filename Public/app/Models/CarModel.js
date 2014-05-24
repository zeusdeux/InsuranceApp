(function() {
  "use strict";

  var global = (1, eval)("this || {}");
  var App = global.InsuranceApp;
  var Model;
  var Super;

  if (typeof(App && App.Model) !== "undefined") {
    Model = App.Model;
    Super = Model.ItemModel;
    Model.CarModel = CarModel;
  }
  else throw new Error("Globals for the app not defined");

  CarModel.prototype = Object.create(Super.prototype);

  function CarModel() {

    Super.call(this, "car");

    var _make;
    var _color;
    var _model;

    Object.defineProperty(this, "make", {
      configurable: false,
      enumerable: true,
      value: _make,
      writable: true
    });

    Object.defineProperty(this, "color", {
      configurable: false,
      enumerable: true,
      value: _color,
      writable: true
    });

    Object.defineProperty(this, "model", {
      configurable: false,
      enumerable: true,
      value: _model,
      writable: true
    });

  }

  //exposed public methods
  CarModel.prototype.save = function() {

  };
  CarModel.prototype.inspect = function() {
    return {
      itemInfo: Super.prototype.inspect.call(this),
      make: this.make,
      color: this.color,
      model: this.model
    };
  };

  //exposed static methods
  CarModel.find = function() {

  };
})();
