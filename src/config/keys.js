if (process.env.NODE_ENV === 'STAGING') {//addd
    module.exports = require("./production");
  } else {
    module.exports = require("./dev");
  }