const morgan = require("morgan");
const chalk = require("chalk");

const logger = morgan((keys, req, res) => {
  let logArray = [
    keys.date(req, res),
    keys.method(req, res),
    keys.url(req, res),
    keys.status(req, res),
    keys["response-time"](req, res),
    "ms",
  ];
  if (res.statusCode >= 400) {
    console.log(chalk.redBright(logArray.join(" ")));
  } else {
    console.log(chalk.cyanBright(logArray.join(" ")));
  }
});

module.exports = logger;
