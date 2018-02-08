let helpers = require("../../../../server/lib/helpers");
let callserver = require("../../../../server/lib/callserver");

module.exports = {
  handlerFn: (req, res, next) => {
    callserver.customRequest({
      url: "/mock-api/api/detail",
      method: "GET",
      params: {
        id: req.params.id
      }
    }).then(result => {
      req.pageInfo.api = result.data;
      next();
    });
  }
};