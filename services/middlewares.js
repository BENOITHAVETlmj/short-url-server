const bodyParser = require("body-parser");
const cors = require("cors");

const setUpMiddlewares = app => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.text());
};

module.exports.setUpMiddlewares = setUpMiddlewares;
