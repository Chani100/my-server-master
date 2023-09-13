const express = require("express");
const authRouter = require("./api/users");
const router = express.Router();
const cardRouter = require("./api/cards");
const orderRouter = require("./api/orders");
const bookRouter = require("./api/bookATable");

router.get("/", (req, res) => {
  res.json({ msg: "sub router" });
});

router.use("/cards", cardRouter);
router.use("/users", authRouter);
router.use("/orders", orderRouter);
router.use("/bookAtable", bookRouter );

module.exports = router;
