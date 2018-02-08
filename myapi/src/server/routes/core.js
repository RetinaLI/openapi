module.exports = {
  urls: [
    { url: "/", page: "ejs-static/production", useTemplate: true },
    { url: "/api/search/list", page: "ejs-static/api/search/search", useTemplate: true },
    { url: "/api/:type/list", page: "ejs-static/api/list/list", useTemplate: true },
    { url: "/api/:id/detail", page: "ejs-static/api/detail/detail", useTemplate: true }
  ]
};