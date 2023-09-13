const Orders = require("./Orders");
const _ = require("lodash");

const createOrder = async (ordersToSave) => {
  let orders = new Orders(ordersToSave);
  return orders.save();
};
const getOrdersByEmail = (email) => {
  return Orders.findOne({ email });
};

const getAllOrders = (id, option) => {
  return Orders.find(id, option);
};

const getOrdersById = (id, options) => {
  return Orders.findById(id, options);
};
const geOrderByBizNumbeer = (bizNumber) => {
  return Card.find({ bizNumber }); /* , { bizNumber: 1 , _id: 0  } ); */
};

const getOrdersByUserIdFindOne = (userId) => {
  return Orders.findOne({ user_id: userId })
  .sort({ createdAt: -1 }).limit(1);
};

const getMyOrder = (userId) => {
  return Orders.find(userId);
};
 const getUllMyOrder = (userId) => {
  return Orders.find({ user_id: userId });
}; 

const updatOrders = async (id, ordersToUpdat) => {
  return Orders.findByIdAndUpdate(id, ordersToUpdat, { new: true });
};

const DeleteOrders = (id) => {
  return Orders.findByIdAndDelete(id);
};

module.exports = {
  getMyOrder,
  geOrderByBizNumbeer,
  createOrder,
  getOrdersByEmail,
  getAllOrders,
  getOrdersById,
  updatOrders,
  DeleteOrders,
  getOrdersByUserIdFindOne,
  getUllMyOrder,
};
