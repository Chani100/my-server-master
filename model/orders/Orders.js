const mongoose = require("mongoose");

const ordersScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 256,
  },
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 256,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 256,
  },
  street: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 256,
  },
  houseNumber: {
    type: Number,
    required: true,
    trim: true,
    minLength: 1,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  card_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
   required: true,
    trim: true,
  },
  takeAway: { type: Boolean, default: false },
  /*isBusiness: { type: Boolean, default: false }, */
  orderStatus: { type: Boolean, default: false },

  OrderMenu: [[]],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Orders = mongoose.model("orders", ordersScheme);

module.exports = Orders;
