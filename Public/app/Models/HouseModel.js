(function() {
  "use strict";

  var global = (1, eval)("this || {}");
  var App = global.InsuranceApp;
  var Model;
  var Super;

  if (typeof(App && App.Model) !== "undefined") {
    Model = App.Model;
    Super = Model.ItemModel;
    Model.HouseModel = HouseModel;
  }
  else throw new Error("Globals for the app not defined");

  HouseModel.prototype = Object.create(Super.prototype);

  function HouseModel() {

    Super.call(this, "house");

    var _sqFootage;
    var _latLong;

    Object.defineProperty(this, "sqFootage", {
      configurable: false,
      enumerable: true,
      get: function(){
        return _sqFootage;
      },
      set: function(footage){
        footage = parseFloat(footage, 10);
        if (!footage) throw new Error("Invalid square footage");

        _sqFootage = footage;
      }
    });

    Object.defineProperty(this, "latLong", {
      configurable: false,
      enumerable: true,
      get: function(){
        return _latLong;
      },
      set: function(latlongObj){
        if (!latlongObj.lat || !latlongObj.long) throw new Error("Invalid lat/long pair");

        _latLong = latlongObj;
      }
    });
  }

  //exposed public methods
  HouseModel.prototype.save = function() {

  };
  HouseModel.prototype.inspect = function() {
    return {
      itemInfo: Super.prototype.inspect.call(this),
      sqFootage: this.sqFootage,
      latLong: this.latLong
    };
  };

  //exposed static methods
  HouseModel.find = function() {

  };
})();
