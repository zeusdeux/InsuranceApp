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
    Model.InsuranceModel = InsuranceModel;
  }
  else throw new Error("Globals for the app not defined");

  InsuranceModel.prototype = Object.create(Super.prototype);

  function InsuranceModel(insuree) {

    if (!insuree || !(insuree instanceof Model.InsureeModel)) throw new Error("No/invalid insuree provided while creating insurance record");

    Super.call(this, idCount++, new Date());

    var _itemsInsured = [];
    var _agent;

    //exposed properties
    Object.defineProperty(this, "insuree", {
      configurable: false,
      enumerable: true,
      value: insuree,
      writable: false
    });

    Object.defineProperty(this, "itemsInsured", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _itemsInsured;
      }
    });

    Object.defineProperty(this, "agent", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _agent;
      },
      set: function(newAgent) {
        if (newAgent instanceof Model.AgentModel) _agent = newAgent;
        else throw new Error("Agent can only be set to an instance of Model.AgentModel");
      }
    });

    //such privilege much wow
    this.addInsuredItem = function(item) {
      if (!(item instanceof Model.InsuredItemModel)) throw new Error("only an item of type Model.InsuredItemModel can be added");
      _itemsInsured.push(item);
      //this.save();
      return this;
    };

    this.removeInsuredItem = function(id) {
      var item = Model.InsuredItemModel.find({
        _id: id
      });
      //i know i can just check for id === v.id
      _itemsInsured = _itemsInsured.filter(function(v) {
        if (v === item) return false;
        else return true;
      });
      //this.save();
      return this;
    };
  }

  //exposed public methods
  InsuranceModel.prototype.save = function() {
    //save to indexdb only when all required fields are filled
  };
  InsuranceModel.prototype.inspect = function() {
    return {
      genericInfo: Super.prototype.inspect.call(this),
      insuree: this.insuree.inspect(),
      agent: this.agent.inspect(),
      itemsInsured: this.itemsInsured.map(function(item) {
        return item.inspect();
      })
    };
  };

  //exposed static method
  InsuranceModel.find = function(findParamsObj) {
    //find based on object passed

    //find by id    
    if (typeof findParamsObj.id !== "undefined") {
      //find an InsuranceModel record based on id in indexeddb 
      //return found object (if something found) else throw
    }

    //find by insuree
    if (typeof findParamsObj.insuree !== "undefined" && findParamsObj.insuree instanceof Model.InsureeModel) {
      //test if insuree exists
      //Model.InsureeModel.find(findParamsObj.insuree); //this will throw if not found

      //find an InsuranceModel record in indexeddb based on insuree
    }

    //did you just *send* me the object you *want* me to find? wat. take it back
    if (findParamsObj instanceof Model.InsuranceModel) return findParamsObj;
  };
})();
