(function() {
  "use strict";

  var global = (1, eval)("this || {}");
  var data = global.InsuranceData;
  var Model = global.InsuranceApp.Model;

  data.insuree1 = new Model.InsureeModel();
  data.insuree1.dob = "1988-01-17";
  data.insuree1.email = "mud@gmail.com";
  data.insuree1.firstName = "Mudit";
  data.insuree1.lastName = "Ameta";
  data.insuree1.phone = "+918374627367";

  data.insuree2 = new Model.InsureeModel();
  data.insuree2.dob = "1988-09-07";
  data.insuree2.email = "vip@yahoo.in";
  data.insuree2.firstName = "Vip";
  data.insuree2.lastName = "Paul";
  data.insuree2.phone = "+918123527367";

  data.car1 = new Model.CarModel();
  data.car1.make = "1990";
  data.car1.color = "Red";
  data.car1.model = "Mustang Fastback";

  data.car2 = new Model.CarModel();
  data.car2.make = "2004";
  data.car2.color = "Grey";
  data.car2.model = "Nissan Skyline GTR";

  data.bike1 = new Model.BikeModel();
  data.bike1.make = "1995";
  data.bike1.color = "Red";
  data.bike1.model = "Ducati 666";

  data.bike2 = new Model.BikeModel();
  data.bike2.make = "2010";
  data.bike2.color = "Blue";
  data.bike2.model = "Yamaha R1";

  data.house1 = new Model.HouseModel();
  data.house1.sqFootage = 1400;
  data.house1.latLong = {
    lat: 10.1231,
    long: 12.4251
  };

  data.house2 = new Model.HouseModel();
  data.house2.sqFootage = 2000;
  data.house2.latLong = {
    lat: 90.3172,
    long: 72.8334
  };

  data.life1 = new Model.LifeModel();
  data.life1.age = 20;
  data.life1.medHistory = "Clean";

  data.life2 = new Model.LifeModel();
  data.life2.age = 65;
  data.life2.medHistory = "Heart ailments";

  data.agent1 = new Model.AgentModel();
  data.agent1.dob = "1987-11-10";
  data.agent1.email = "agent1@live.com";
  data.agent1.firstName = "Agent";
  data.agent1.lastName = "One";
  data.agent1.phone = "+917834757834";

  data.agent2 = new Model.AgentModel();
  data.agent2.dob = "2.88-09-07";
  data.agent2.email = "agent2@lic.in";
  data.agent2.firstName = "Agent";
  data.agent2.lastName = "Two";
  data.agent2.phone = "+14442343254";

  data.carBikePolicy = new Model.PolicyModel(9.5);
  data.carBikePolicy.name = "Policy 1 on cars and bikes Rate 9.5pa";
  data.carBikePolicy.addNewValidType("car");
  data.carBikePolicy.addNewValidType("bike");

  data.housePolicy = new Model.PolicyModel(10.25);
  data.housePolicy.name = "Offer 2 on houses Rate 10.25pa";
  data.housePolicy.addNewValidType("house");

  data.lifePolicy = new Model.PolicyModel(7.0);
  data.lifePolicy.name = "Offer 3 on life Rate 7pa";
  data.lifePolicy.addNewValidType("life");

  data.carBikeOffer = new Model.OfferModel(7.25);
  data.carBikeOffer.name = "Offer 1 on cars and bikes Rate 7.25pa";
  data.carBikeOffer.addNewValidType("car");
  data.carBikeOffer.addNewValidType("bike");

  data.houseOffer = new Model.OfferModel(8.5);
  data.houseOffer.name = "Offer 2 on houses Rate 8.5pa";
  data.houseOffer.addNewValidType("house");

  data.insuredItem1 = new Model.InsuredItemModel(data.car1, 15000, new Date("2016-12-31"));
  data.insuredItem1.policy = data.carBikePolicy;
  data.insuredItem1.offer = data.carBikeOffer;
  
  data.insuredItem12 = new Model.InsuredItemModel(data.life1, 1750000, new Date("2096-12-31"));
  data.insuredItem12.policy = data.lifePolicy;

  
  data.insuredItem2 = new Model.InsuredItemModel(data.car2, 75000, new Date("2022-08-24"));
  data.insuredItem2.policy = data.carBikePolicy;
  data.insuredItem2.offer = data.carBikeOffer;

  data.insuredItem22 = new Model.InsuredItemModel(data.bike2, 25000, new Date("2021-06-11"));
  data.insuredItem22.policy = data.carBikePolicy;

  data.insuredItem23 = new Model.InsuredItemModel(data.life2, 1750000, new Date("2096-12-31"));
  data.insuredItem23.policy = data.lifePolicy;

  data.insuredItem24 = new Model.InsuredItemModel(data.house2, 2500000, new Date("2088-01-31"));
  data.insuredItem24.policy = data.housePolicy;
  data.insuredItem24.offer = data.houseOffer;

  data.insuranceRecord1 = new Model.InsuranceModel(data.insuree1);
  data.insuranceRecord1.agent = data.agent1;
  data.insuranceRecord1.addInsuredItem(data.insuredItem1);
  data.insuranceRecord1.addInsuredItem(data.insuredItem12);


  data.insuranceRecord2 = new Model.InsuranceModel(data.insuree2);
  data.insuranceRecord2.agent = data.agent2;
  data.insuranceRecord2.addInsuredItem(data.insuredItem2);
  data.insuranceRecord2.addInsuredItem(data.insuredItem22);
  data.insuranceRecord2.addInsuredItem(data.insuredItem23);
  data.insuranceRecord2.addInsuredItem(data.insuredItem24);

  console.log("insuranceRecord1: \n%o",data.insuranceRecord1.inspect());
  console.log("insuranceRecord2: \n%o",data.insuranceRecord2.inspect());


})();
