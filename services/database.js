const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(
    "mongodb://localhost/short-url-BENOIT-HAVET",
    {
      useNewUrlParser: true
    },
    () => console.log("mongoose is connected")
  );
};

module.exports.connect = connect;
