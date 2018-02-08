let express = require("express");
let path = require("path");
let helpers = require("../lib/helpers");
let fs = require("fs");
let url = require("url");
let utilsExtend = require("utils-extend");

let app_dir = process.cwd();
let router_modules = require("../lib/requires")(helpers.root("./", "routes"), "index.js");
let router = express.Router();

let commonRouteHandler = (req, res, next) => {
  req.pageInfo = {
    url: url.parse(req.originalUrl)
  };
  next();
};

let reponseRenderHandler = (req, res, pageTemplate, pageParams) => {
  res.render(pageTemplate, utilsExtend.extend({
    layout: "",
    title: "",
    helpers: helpers,
    pageInfo: req.pageInfo
  }, pageParams));
};

router.get(/^\/((((ops)|(profile))\/.*)|((ops)|(profile)))$/, commonRouteHandler, (req, res) => {
  reponseRenderHandler(req, res, "layout-angular", {
    layout: false
  });
});

router_modules.forEach(fileInfo => {
  fileInfo.m.urls.forEach(page => {
    let layout = page.useTemplate === true ? "layout-static" : page.useTemplate === false ? false : page.useTemplate;
    let pageTemplate = helpers.root("../client/", page.page);

    let style = helpers.root("../client/", page.page + ".less");
    let existsStyle = fs.existsSync(style);

    let clientJs = helpers.root("../client/", page.page + ".client.js");
    let existsClientJs = fs.existsSync(clientJs);

    let serverJs = helpers.root("../client/", page.page + ".server.js");
    let existsServerHandler = fs.existsSync(serverJs);
    let urlHandlers = [page.url];
    urlHandlers.push(commonRouteHandler);
    if (existsServerHandler) {
      let serverHandler = require(serverJs);
      urlHandlers.push(serverHandler.handlerFn);
    }

    urlHandlers.push((req, res) => {
      if(existsStyle) {
        req.pageInfo.link = "/client/" + page.page + ".less";
      }
      if(existsClientJs) {
        req.pageInfo.script = "/client/" + page.page + ".client.js";
      }
      reponseRenderHandler(req, res, helpers.root("../client/", page.page), {
        layout: layout
      });
    })
    router.get.apply(router, urlHandlers);
  });
});
if (process.env.NODE_ENV === "production") {
  router.use("/404", (req, res) => {
    res.status(404).send("404");
  });
  router.use("/500", (req, res) => {
    res.status(500).send("500");
  });
  router.use((req, res) => {
    console.log("404: " + req.url);
    res.redirect("/404");
  });

  router.use((err, req, res) => {
    console.error("error: ", err);
    if (req.url === "/500") {
      res.send({
        err: err
      });
    } else
      res.redirect("/500");
  });
}

module.exports = router;