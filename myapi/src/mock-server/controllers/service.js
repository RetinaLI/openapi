
let fs = require("fs");
module.exports = {
  getDetail(_id){
    return {
      data: JSON.parse(fs.readFileSync(__dirname + "/../json/service_list.json")).list.find(e => e.id==_id)
    };
  },
  getList(){
    return JSON.parse(fs.readFileSync(__dirname + "/../json/service_list.json"));
  }
};