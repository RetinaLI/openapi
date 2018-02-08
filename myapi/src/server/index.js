let ejs = require("ejs");
let helpers = require("./lib/helpers");
let express = require("express");
let path = require('path');
let app = express();
let bodyParser = require("body-parser");
let router = require("./routes/index");
let partials = require("express-partials");
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(helpers.root("../", "client/static")));
app.use('/assets', express.static(helpers.root("../", "client/assets")));
app.use('/client', express.static(helpers.root("../", "client")));
app.use(partials());

if (process.env.NODE_ENV === "development") {
  let apiRouter = require("../mock-server/index");
  app.use(apiRouter);
  let webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('../config/webpack.config.js');
  let compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    },
    headers: { "Access-Control-Allow-Origin": "*" }
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(router);
  let bs = require('browser-sync').create();
  app.listen(9901, () => {
    bs.init({
      open: false,
      ui: false,
      notify: false,
      proxy: {
        target: 'localhost:9901',
        proxyReq: [
          function (proxyReq) {
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
          }
        ]
      },
      files: ['./views/**'],
      port: "9902"
    })
  })
} else {
  app.use(router);
  app.listen(9902);
}
module.exports = app;