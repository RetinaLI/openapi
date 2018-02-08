let fs = require("fs");

module.exports = {
  getCarShippingRecord(){
    return {
      summaryMap: JSON.parse(fs.readFileSync(__dirname + "/../json/car_shipping_record.json")).summaryMap
    };
  },
  getMileageOverHalfOrder(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/mileageOverHalfOrder.json"));
  },
  getCarShippingList({ tboxStatus }){
    return tboxStatus == 2 ? JSON.parse(fs.readFileSync(__dirname + "/../json/carShippingList2.json")) : tboxStatus == 3 ? JSON.parse(fs.readFileSync(__dirname + "/../json/carShippingList3.json")) : JSON.parse(fs.readFileSync(__dirname + "/../json/carShippingList4.json"));
  },
  getCarShippingMileageOverHalfOrderList(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/carShippingMileageOverHalfOrderList.json"));
  },
  getOrderInfo(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/orderInfo.json"));
  },
  getOrderTransportLocation(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/car-location-list-by-date.json"));
  },
  getOrderFence(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/order_fence.json"));
  },
  getOrderDeliveryByCarType(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/orderDeliveryByCarType.json"));
  },
  getOrderSummary(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/orderSummary.json"));
  },
  getAnomalyOrderSummary(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/anomalyOrderSummary.json"));
  }
};