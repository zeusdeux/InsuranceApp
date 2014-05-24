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
    Model.ItemModel = ItemModel;
  }
  else throw new Error("Globals for the app not defined");

  ItemModel.prototype = Object.create(Super.prototype);

  function ItemModel(type) {

    if (!type || !ItemModel.types[type]) throw new Error("Invalid item type");

    Super.call(this, idCount++, new Date());

    var _type = ItemModel.types[type];

    Object.defineProperty(this, "type", {
      configurable: false,
      enumerable: true,
      value: _type,
      writable: false
    });
  }

  //exposed public methods
  ItemModel.prototype.save = function() {

  };
  ItemModel.prototype.inspect = function() {
    return {
      genericInfo: Super.prototype.inspect.call(this),
      type: this.type
    };
  };

  //exposed static methods
  ItemModel.find = function() {

  };

  Object.defineProperty(ItemModel, "types", {
    configurable: false,
    enumerable: true,
    value: {
      "life": 1,
      "house": 2,
      "car": 3,
      "bike": 4
    },
    writable: false
  });
})();
