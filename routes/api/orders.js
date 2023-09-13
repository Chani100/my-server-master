const express = require("express");
const router = express.Router();
const normaliztionOrder = require("../../model/orders/helpers/normalitionOrder");
const {
  orderValidationService,
} = require("../../validation/ordersValidationService");
const ordersServiceModel = require("../../model/orders/ordersService");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddlewareOrder = require("../../middleware/permissionsMiddlewareOrders");
const {
  validateOrdersSchema,
} = require("../../validation/joi/ordersValidation");
const { validateIdSchema } = require("../../validation/joi/idValidation");
const _ = require("lodash");
const { log } = require("debug/src/browser");
//get all orders
//localhost:8181/api/orders
//Everyone
router.get("/", async (req, res) => {
  try {
    await orderValidationService(req.body);
    const allOrder = await ordersServiceModel.getAllOrders();
    res.json(allOrder);
  } catch (err) {
   
    res.status(400).json(err);
  }
});
//localhost:8181/api/orders
// Create order
// authmw
router.post(
  "/",
  authmw,
  /*   permissionsMiddlewareOrder(false, false), */
  async (req, res) => {
    try {
      await validateOrdersSchema(req.body);

      let normalOrders = await normaliztionOrder(req.body, req.userData._id);
      await ordersServiceModel.createOrder(normalOrders);
      res.json(req.body);
    } catch (err) {
     
      res.status(400).json(err);
    }
  }
);
//localhost:8181/api/orders
// my order
//authmw
router.get("/my-order", authmw, async (req, res) => {
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
   
    res.status(400).json(err);
  }
});

//localhost:8181/api/orders
// my order one
//authmw
router.get("/my-order-one", authmw, async (req, res) => {
  try {
    const Orders = await ordersServiceModel.getMyOrderOne();
    const myOrders = Orders.filter(
      (order) => order.user_id == req.userData._id
    );
    if (myOrders == 0) {
      res.json({ msg: "You don't have any tickets you've created" });
    } else {
      res.json(myOrders);
    }
  } catch (err) {
   
    res.status(400).json(err);
  }
});

//get order:id
//localhost:8181/api/orders
//Everyone
router.get(
  "/:id",
  authmw,
async (req, res) => {
    try {
      const getId = await ordersServiceModel.getOrdersById(req.params.id);
      
    /*  if (getId === null) {
        res.json({ msg: "order does not exist." });
      } else { }  */
        res.json(getId);
   
    } catch (err) {
     
      res.status(400).json(err);
    }
  }
);

//delete order
//localhost:8181/api/orders
//the owner of the order

router.delete(
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
     
      res.status(400).json(err);
    }
  }
);

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
   
    res.status(400).json(err);
  }
}); */

//get order FindOne dy user id
//http://localhost:8181/api/orders/my-order-findOne
router.get("/my-order-findOne/:id", authmw, async (req, res) => {
  try {
    
    const myCards = await ordersServiceModel.getOrdersByUserIdFindOne(
      req.params.id
    );

    const orderId = myCards._id;

    res.json(orderId);
  } catch (err) {
    res.status(400).json(err);
  }
});
//get order ull dy user id
//http://localhost:8181/api/orders/my-order-ull
router.get("/my-order-ull/:id", authmw, async (req, res) => {
  try {
    const myOrders = await ordersServiceModel.getUllMyOrder(req.params.id);
    const orderId = myOrders;
   
    res.json(orderId);
  } catch (err) {
  
    res.status(400).json(err);
  }
});
//http://localhost:8181/api/orders/OrderMenu/:id
router.patch("/menuOrder/:id", authmw, async (req, res) => {
  try {
    await validateIdSchema(req.params.id);
    const orderId = req.params.id;
    let cardLike = await ordersServiceModel.getOrdersById(orderId);

    /* if (
      cardLike.OrderMenu.find((cardId) => cardId === cardLike.OrderMenu[[1]])
    ) {
      const cardFiltered = cardLike.OrderMenu.filter(
        (cardId) => cardId != cardLike.OrderMenu[[1]]
      );
      cardLike.OrderMenu = cardFiltered;
      cardLike = await cardLike.save();
      res.json({ msg: "The card has been added to the favorites list." }); */
      if (cardLike.OrderMenu.find((cardId) => cardId[1] == req.body.card_id)) {
        const cardFiltered = cardLike.OrderMenu.filter(
          (cardId) => cardId[1] != req.body.card_id
        );
        cardLike.OrderMenu = cardFiltered;
        cardLike = await cardLike.save();
      } else {
        cardLike.OrderMenu = [
          ...cardLike.OrderMenu,
          [req.body.amount, req.body.card_id],
        ];
        cardLike = await cardLike.save();
        res.json({ msg: "The card has been removed rom the favorites list." });
      }
  } catch (err) {
    res.status(400).json(err);
  }
});
// http://localhost:8181/api/orders/orderStatus/:id
router.patch(
  "/orderStatus/:id",
  authmw,
/*   permissionsMiddlewareOrder(false, true), */
  async (req, res) => {
    try {
      await validateIdSchema(req.params.id);
    
      const order = await ordersServiceModel.getOrdersById(req.params.id);
       order.orderStatus = true; 
      setTimeout(async () => {
        await order.save();
      }, 1 * 60 * 1000); 
       res.json({ msg: "An order is currently in the works" }); 
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
// http://localhost:8181/api/orders/orderStatus/crm/:id
router.patch(
  "/orderStatus/crm/:id",
  authmw,
  permissionsMiddlewareOrder(true, false),
  async (req, res) => {
    try {
      await validateIdSchema(req.params.id);
      let order = await ordersServiceModel.getOrdersById(req.params.id);
      order.orderStatus = true;
      await order.save();
      res.json({ msg: "An order is currently in the works" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);
// http://localhost:8181/api/orders/orderStatus/crmf/:id
router.patch(
  "/orderStatus/crmf/:id",
  authmw,
  permissionsMiddlewareOrder(true, false),
  async (req, res) => {
    try {
      await validateIdSchema(req.params.id);
      let order = await ordersServiceModel.getOrdersById(req.params.id);
      order.orderStatus = false;
      await order.save();
      res.json({ msg: "An order is currently in the works" });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);
module.exports = router;
