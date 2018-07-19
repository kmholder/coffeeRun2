(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://localhost:2403/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var RemoteDataStore = App.RemoteDataStore;
  //var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var remoteDS = new RemoteDataStore(SERVER_URL);
  //var ds = new DataStore();
  var myTruck = new Truck('ncc-1701', remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  //var formHandler = new FormHandler(FORM_SELECTOR);

  var Refresh = App.Refresh;
  var refreshPage = new Refresh(SERVER_URL);
  var refreshFormHandler = new FormHandler(FORM_SELECTOR);

  refreshPage.refreshCoffeeRun();

  refreshFormHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  refreshFormHandler.addInputHandler(Validation.isCompanyEmail);

  console.log(refreshFormHandler);
  /*formHandler.addSubmitHandler(function (data){
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);*/
})(window);
