const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
/* const logger = require("morgan"); */
const cors = require("cors");
const apiRouter = require("./routes/api");
const config = require("config");
const initialData = require("./initialeData/initialData");
const chalk = require("chalk");
const logger = require("./chalkLogger");
const app = express();
/* app.use(cors()); */
app.use(
  cors({
   Origin: ["http://authorizedaddress", "http://localhost:8181/api"],

    optionsSuccessStatus: 200,
  })
);
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
initialData();
 

app.use("/api", apiRouter);
 app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
 
    res.status(404).json({ msg: "page not fond" });
  }
);

module.exports = app;
