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
    Model.PolicyModel = PolicyModel;
  }
  else throw new Error("Globals for the app not defined");

  PolicyModel.prototype = Object.create(Super.prototype);

  function PolicyModel(rate) {
    
    //rate is a decimal and its per annum
    rate = parseFloat(rate, 10);
    if(!rate || isNaN(rate)) throw new Error("Invalid/missing rate");

    Super.call(this, idCount++, new Date());

    var _name;
    var _validTypes = [];
    var _rate = rate;

    Object.defineProperty(this, "name", {
      configurable: false,
      enumerable: true,
      value: _name,
      writable: true
    });

    Object.defineProperty(this, "validTypes", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _validTypes;
      }
    });

    Object.defineProperty(this, "rate", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _rate;
      },
      set: function(p) {
        p = parseFloat(p, 10);
        if (isNaN(p)) throw new Error("New rate should be a number");
        _rate = p;
      }
    });

    //exposed privileged methods
    this.addNewValidType = function(type) {
      if (!Model.ItemModel.types[type]) throw new Error("Invalid type.");
      _validTypes.push(Model.ItemModel.types[type]);
      //this.save();
    };

    this.removeValidType = function(type){
      if (!Model.ItemModel.types[type]) throw new Error("Invalid type.");

      _validTypes = _validTypes.filter(function(currType){
        if (type !== currType) return true;
      });
    };
  }

  //exposed public methods
  PolicyModel.prototype.save = function() {
    //save to indexdb only when all required fields are filled
  };

  PolicyModel.prototype.inspect = function() {
    return {
      genericInfo: Super.prototype.inspect.call(this),
      offerName: this.name,
      rate: this.rate,
      validTypes: this.validTypes
    };
  };

  //exposed static method
  PolicyModel.find = function(findParamsObj) {

  };

})();
