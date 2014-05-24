(function() {
  "use strict";

  var global = ((1, eval)("this || {}"));
  var App = global.InsuranceApp;
  var Model;

  var stateNames = ["closed", "active", "reopened"];

  if (typeof(App && App.Model) !== "undefined") {
    Model = App.Model;
    Model.GenericModel = GenericModel;
  }
  else throw new Error("Globals for the app not defined");

  function GenericModel(id, createdOn) {

    App.Validate.params(arguments, GenericModel.length, GenericModel.name);

    var _id = id;
    var _state = 1; //active by default
    var _createdOn = createdOn;
    var _closedOn;
    var _reopenedOn;

    Object.defineProperty(this, "id", {
      configurable: false,
      enumerable: true,
      value: _id,
      writable: false
    });

    Object.defineProperty(this, "state", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _state;
      }
    });

    Object.defineProperty(this, "createdOn", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _createdOn.toLocaleDateString();
      }
    });

    Object.defineProperty(this, "closedOn", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _closedOn && !_reopenedOn ? _closedOn.toLocaleDateString() : "This is still active";
      }
    });

    Object.defineProperty(this, "reopenedOn", {
      configurable: false,
      enumerable: true,
      get: function() {
        return _reopenedOn ? _reopenedOn.toLocaleDateString() : "This hasn't been reopened";
      }
    });

    this.close = function() {
      //close the insuree account
      _state = 0;
      _closedOn = new Date();
      _reopenedOn = null;
      return this;
    };

    this.reopen = function() {
      //reopen/reactivate something (insuree account, policy, offer, etc)

      //reopen only if closed
      if (!_closedOn) throw new Error("This hasn't been closed yet to reopen");

      _state = 2;
      _reopenedOn = new Date();
      _closedOn = null;
      return this;
    };
  }

  //exposed public methods
  GenericModel.prototype.inspect = function() {
    return {
      id: this.id,
      state: stateNames[this.state],
      createdOn: this.createdOn,
      closedOn: this.closedOn,
      reopenedOn: this.reopenedOn
    };
  };
})(); //indirect eval to get global scope i.e., window in browser
