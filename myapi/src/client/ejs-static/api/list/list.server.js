let helpers = require("../../../../server/lib/helpers");
let callserver = require("../../../../server/lib/callserver");

module.exports = {
  handlerFn: (req, res, next) => {
    callserver.customRequest({
      url: "/mock-api/api/list",
      method: "GET",
      type: req.params.type
    }).then(result => {
      req.pageInfo.list = result.list || [];
      next();
    });
  }
};