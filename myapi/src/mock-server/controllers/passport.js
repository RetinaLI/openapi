let routes = {"data":"","info":"","list":[{"isParent":true,"children":[{"isParent":false,"description":"","iconUrl":"fa-bank","id":50903,"isPublic":2,"name":"领导看板","originalUrl":"\/pages\/mobile\/index.jsp","pageType":9,"sort":1,"target":"self","url":"\/model.do?id=50903"},{"isParent":false,"description":"","iconUrl":"fa-automobile","id":50904,"isPublic":2,"name":"车辆监控","originalUrl":"\/pages\/mobile\/car\/index.jsp","pageType":9,"sort":2,"target":"self","url":"\/model.do?id=50904"},{"isParent":false,"description":"","iconUrl":"fa-yahoo","id":50910,"isPublic":2,"name":"用车行为","originalUrl":"\/pages\/mobile\/run\/dynamic_area.jsp","pageType":9,"sort":3,"target":"self","url":"\/model.do?id=50910"},{"isParent":true,"children":[{"isParent":false,"description":"","iconUrl":"fa-exclamation-triangle","id":50917,"isPublic":2,"name":"在途预警","originalUrl":"\/pages\/mobile\/vlogistics\/transport_alarm.jsp","pageType":9,"sort":2,"target":"self","url":"\/model.do?id=50917"},{"isParent":false,"description":"","iconUrl":"fa-thumbs-o-up","id":50918,"isPublic":2,"name":"送达评价","originalUrl":"\/pages\/mobile\/vlogistics\/transport_evaluate.jsp","pageType":9,"sort":3,"target":"self","url":"\/model.do?id=50918"}],"description":"","iconUrl":"fa-ambulance","id":50906,"isPublic":2,"name":"整车物流","originalUrl":"","pageType":9,"sort":4,"target":"self","url":""},{"isParent":true,"children":[{"isParent":false,"description":"","iconUrl":"fa-align-left","id":51144,"isPublic":2,"name":"销售看板","originalUrl":"\/pages\/mobile\/sale\/order_delivery.jsp","pageType":9,"sort":0,"target":"self","url":"\/model.do?id=51144"},{"isParent":false,"description":"","iconUrl":"fa-list-ul","id":51145,"isPublic":2,"name":"销售分析","originalUrl":"\/pages\/mobile\/sas\/sales\/order_analyze.jsp","pageType":9,"sort":1,"target":"self","url":"\/model.do?id=51145"},{"isParent":false,"description":"","iconUrl":"fa-thumbs-o-down","id":51124,"isPublic":2,"name":"实销预警","originalUrl":"\/pages\/mobile\/sas\/sales\/effective_sale_early_alarm.jsp","pageType":9,"sort":2,"target":"self","url":"\/model.do?id=51124"}],"description":"","iconUrl":"fa-thumbs-o-up","id":50907,"isPublic":2,"name":"销售环节","originalUrl":"","pageType":9,"sort":5,"target":"self","url":""},{"isParent":false,"description":"","iconUrl":"fa-wrench","id":51123,"isPublic":2,"name":"服务真实性","originalUrl":"\/pages\/mobile\/sas\/customer\/service_validation.jsp","pageType":9,"sort":6,"target":"self","url":"\/model.do?id=51123"},{"isParent":true,"children":[{"isParent":false,"description":"","iconUrl":"fa-signal","id":51881,"isPublic":2,"name":"运营周报","originalUrl":"\/pages\/mobile\/sas\/report\/week-report.jsp","pageType":9,"sort":1,"target":"self","url":"\/model.do?id=51881"},{"isParent":false,"description":"","iconUrl":"fa-adn","id":51904,"isPublic":2,"name":"运营月报","originalUrl":"\/pages\/mobile\/sas\/report\/month-report.jsp","pageType":9,"sort":2,"target":"self","url":"\/model.do?id=51904"}],"description":"","iconUrl":"fa-clipboard","id":51903,"isPublic":2,"name":"运营报告","originalUrl":"","pageType":9,"sort":10,"target":"self","url":""}],"description":"","iconUrl":"fa-mobile-phone","id":50902,"isPublic":2,"name":"移动端","originalUrl":"","pageType":9,"sort":30,"target":"self","url":""}],"success":true,"texts":"","totalCount":0,"url":""};
routes = routes.list;
let fs = require("fs");
let findRoute = function (_url, _list) {
  let r;
  _list.forEach(function (element) {
    console.info(element.url, _url, element.url === _url);
    if (element.url === _url) {
      r = element;
    } else if (!r && element.children) {
      r = findRoute(_url, element.children);
    }
  });

  return r;
};

module.exports = {
  getMenuList() {
    return routes;
  },
  getMenu(_url) {
    return findRoute(_url, routes);
  },

  changeAccountPassword(_params) {
    return JSON.parse(fs.readFileSync(__dirname + "/../json/account-setting.json"));
  },
  getCurrentUserInfo(){
    return {"data":{"address":"","authorizetype":0,"email":"zhouweiming@foton.com.cn","fax":"","fullname":"周维明","id":65436,"mobile":"","name":"zhouweiming","phone":"","photo":"","rememberKey":"","title":1,"zip":""},"info":"","list":"","success":true,"texts":"","totalCount":0,"url":""};
  },
  getPlatformsByUser(){
    return {"data":"","info":"","list":[{"company":{"code":"E002","id":1,"name":"福田金融"},"fullname":"管理员","id":3,"name":"sa", "orginalPassword":"123"}],"success":true,"texts":"","totalCount":0,"url":""};
  },
  loginPlatform(){
    return {
      success: true
    }
  },
  addLoginPlatform(){
    return {
      success: true
    }
  }
}