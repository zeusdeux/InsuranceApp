(function() {
  "use strict";

  var global = (1, eval)("this || {}");
  var App = global.InsuranceApp;
  var validations={};

  if (typeof App !== "undefined") {
    App.Validate = validations;
  }
  else throw new Error("Globals for the app not defined");

  validations.params = function(args, noOfParams, fnName) {
    args = Array.prototype.filter.call(args, function(v) {
      if (v) return v;
    });

    if (args.length === noOfParams) return true;
    else throw new Error("Invalid parameters is "+fnName);
  };

})();
