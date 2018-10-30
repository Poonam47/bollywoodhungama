var mysql = require('mysql');

var config = {
  mysql_pool: mysql.createPool({
    host: "54.254.131.27",
    user: "poonam",
    password: "poonam@1234",
  })
};

module.exports = config;
