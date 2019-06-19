const express = require("express");
const { setUpMiddlewares } = require("./services/middlewares");
const { connect } = require("./services/database");
const app = express();

connect();
setUpMiddlewares(app);

const url = require("./src/api/url/routes");
app.use(url);

app.listen(3001, () => {
  console.log("Server started");
});
