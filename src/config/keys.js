if (process.env.NODE_ENV === "STAGING") {
    module.exports = require("./production");
  } else {
    module.exports = require("./dev");
  }