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
    Model.InsuredItemModel = InsuredItemModel;
  }
  else throw new Error("Globals for the app not defined");

  InsuredItemModel.prototype = Object.create(Super.prototype);

  function InsuredItemModel(item, insuredAmt, insuredTill) {

    App.Validate.params(arguments, InsuredItemModel.length, InsuredItemModel.name);

    if (!(item instanceof Model.ItemModel)) throw new Error("Invalid item provided while creating an insured item");

    insuredAmt = parseFloat(insuredAmt, 10);

    if (!insuredAmt) throw new Error("Invalid insured amount");

    Super.call(this, idCount++, new Date());

    var _item = item;
    var _insuredAmt = insuredAmt;
    var _insuredTill = insuredTill; //Date object

    var _policy; //single policy can be applied at once
    var _offer; //single offer can be applied at once (all offers change currentPremium)

    var _basePremium;
    var _currentPremium; // = _basePremium if no offer applied

    Object.defineProperty(this, "item", {
      configurable: false,
      enumerable: true,
      value: _item,
      writable: false
    });

    Object.defineProperty(this, "insuredAmt", {
      configurable: false,
      enumerable: true,
      value: _insuredAmt,
      writable: false
    });

    Object.defineProperty(this, "insuredTill", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _insuredTill.toLocaleString();
      },
    });

    Object.defineProperty(this, "policy", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _policy;
      },
      set: function(policy) {
        if (!(policy instanceof Model.PolicyModel)) throw new Error("Invalid policy");
        if (policy.validTypes.indexOf(_item.type) < 0) throw new Error("Policy and item type mismatch");
        _policy = policy;
        updatePremium();
      }
    });

    Object.defineProperty(this, "offer", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _offer;
      },
      set: function(offer) {
        if (!(offer instanceof Model.OfferModel)) throw new Error("Invalid offer");
        if (offer.validTypes.indexOf(_item.type) < 0) throw new Error("Policy and item type mismatch");
        _offer = offer;
        updatePremium();
      }
    });

    Object.defineProperty(this, "premium", {
      configurable: false,
      enumerable: false,
      get: function() {
        return _currentPremium;
      }
    });

    function updatePremium() {
      _basePremium = (_insuredAmt * (_policy.rate / 100)) / 12;

      if (_offer) _currentPremium = (_insuredAmt * (_offer.rate / 100)) / 12;
      else _currentPremium = _basePremium;
    }
  }

  //exposed public methods
  InsuredItemModel.prototype.save = function() {
    //save to indexdb only when all required fields are filled
  };

  InsuredItemModel.prototype.inspect = function() {
    return {
      genericInfo: Super.prototype.inspect.call(this),
      item: this.item.inspect(),
      insuredAmt: this.insuredAmt,
      insuredTill: this.insuredTill,
      policy: this.policy.inspect(),
      offer: this.offer ? this.offer.inspect() : "No offer availed",
      premium: this.premium
    };
  };

  //exposed static method
  InsuredItemModel.find = function(findParamsObj) {

  };
})();
