let request = require("request");
let utils_ext = require("utils-extend");

let requestConfig = {
  method: "GET",
  url: "",
  baseUrl: "http://localhost:9901/",
  gzip: true,
  //jar: true,
  headers: {
    "Accept": "application/json"
  }
};

let customRequest = (_cfg, _req) => {
  let url = _cfg.url;
  let method = _cfg._method;
  let params = _cfg.params;
  return new Promise((resolve) => {
    let urlCfg = utils_ext.extend({}, requestConfig, {
      url: url,
      qs: params,
      method: method,
      headers: {
        "User-Agent": _req && _req.headers["user-agent"],
        "X-Real-IP": _req && _req.headers["x-real-ip"],
        "X-Forwarded-For": _req && _req.headers['x-forwarded-for'],
        "Host": _req && _req.headers.host,
        "Cookie": _req && _req.headers.cookie + ""
      },
      jar: false
    });
    request(urlCfg, (error, response, body) => {
      let result = body;
      if (urlCfg.headers["Accept"] === "application/json") {
        try {
          result = JSON.parse(body);
        } catch (ex) {
          //ex
        }
      }
      if (response && response.statusCode !== 200 && !result) {
        result = {
          error_code: response && response.statusCode || 500,
          error_msg: JSON.stringify(_urlCfg),
          server_msg: result
        };
      }

      if (result.error_code) {
        result.request_cfg = _urlCfg;
      }
      resolve(result);
    });

  });

};

module.exports = {
  customRequest: customRequest
};
