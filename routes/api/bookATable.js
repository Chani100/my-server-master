const express = require("express");
const router = express.Router();
const {
  bookValidationService,
} = require("../../validation/bookValidationService");
const bookServiceModel = require("../../model/Book a table/bookAtableService");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddlewareOrder = require("../../middleware/permissionsMiddlewareOrders");
const {
  validateBookATableSchema,
} = require("../../validation/joi/bookATableValidat");
const _ = require("lodash");
const normaliztionbookAtable = require("../../model/Book a table/helpers/normalitionBookAtable");
//get all orders
//localhost:8181/api/orders
//Everyone
router.get("/", async (req, res) => {
  try {

    const allCards = await bookServiceModel.getAllBookATable();
    res.json(allCards);
  } catch (err) {
    console.log(err, "err");
    res.status(400).json(err);
  }
});
//localhost:8181/api/orders
// Create order
// authmw
router.post(
  "/",
  authmw,

  async (req, res) => {
    try {
      await validateBookATableSchema(req.body);
         let normalbookAtable = await normaliztionbookAtable(
           req.body,
           req.userData._id
         );
      await bookServiceModel.createBookATable(normalbookAtable);
      res.json(req.body);
    } catch (err) {
      console.log(err, "err");
      res.status(400).json(err);
    }
  }
);
//localhost:8181/api/orders
// my order
//authmw
/* router.get("/my-order", authmw, async (req, res) => {
  try {
    const Orders = await ordersServiceModel.getMyOrder();
    const myOrders = Orders.filter(
      (order) => order.user_id == req.userData._id
    );
    if (myOrders == 0) {
      res.json({ msg: "You don't have any tickets you've created" });
    } else {
      res.json(myOrders);
    }
  } catch (err) {
    console.log("err", err);
    res.status(400).json(err);
  }
});
 */
//get order:id
//localhost:8181/api/orders
//Everyone
/* router.get(
  "/:id",
  authmw,
  permissionsMiddlewareOrder(true, true),
  async (req, res) => {
    try {
      const getId = await ordersServiceModel.getOrdersById(req.params.id);
      if (getId === null) {
        res.json({ msg: "order does not exist." });
      } else {
        res.json(getId);
      }
    } catch (err) {
      console.log("err", err);
      res.status(400).json(err);
    }
  }
); */

//delete order
//localhost:8181/api/orders
//the owner of the order

/* router.delete(
  "/:id",
  authmw,
  permissionsMiddlewareOrder(true, false),
  async (req, res) => {
    try {
      await validateIdSchema(req.params.id);
      const deleteOrders = await ordersServiceModel.DeleteOrders(req.params.id);
      if (deleteOrders) {
        res.json({ mgs: "The order has been deleted." });
      } else {
        res.json({ mgs: "cold not find the order" });
      }
    } catch (err) {
      console.log("err", err);
      res.status(400).json(err);
    }
  }
);
 */
//like order /cardId
//localhost:8181/api/orders:id
//the owner
/* router.patch("/order-menu/:id", authmw, async (req, res) => {
  try {
    await validateIdSchema(req.params.id);
    const orderId = req.params.id;
    let orderLike = await ordersServiceModel.getOrdersById(orderId);
    if (orderLike.OrderMenu.find((cardId) => cardId == req.body.cardId)) {
      const orderFiltered = orderLike.OrderMenu.filter(
        (cardId) => cardId != req.body.cardId
      );
      orderLike.OrderMenu = orderFiltered;
      orderLike = await orderLike.save();
      res.json({ msg: "The order has been added to the favorites list." });
    } else {
      orderLike.OrderMenu = [...orderLike.OrderMenu, req.body.cardId];
      orderLike = await orderLike.save();
      res.json({ msg: "The order has been removed from the favorites list." });
    }
  } catch (err) {
    console.log("err", err);
    res.status(400).json(err);
  }
}); */

module.exports = router;
