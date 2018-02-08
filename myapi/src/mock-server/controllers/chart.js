let fs = require("fs");

module.exports = {
  getDanymicAreaData(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/dynamicAreaAnalysis.json")).list;
  },
  getCar(){

  }
};