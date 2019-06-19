const mongoose = require("mongoose");

const Url = mongoose.model("Url", {
  originalUrl: String,
  shortUrl: String,
  visits: { type: Number, default: 0 }
});

module.exports = Url;
