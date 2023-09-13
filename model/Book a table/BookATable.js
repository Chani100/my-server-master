const mongoose = require("mongoose");


const bookAtableScheme = new mongoose.Schema({
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: String,
    required: true,
    match: new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
  },
  time: {
    type: String,
    required: true,
    match: new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
  },
  numOfPeople: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    requierd: true,
    trim: true,
  },
  OrderMenu: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  card_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const BookAtable = mongoose.model("bookAtable", bookAtableScheme);

module.exports = BookAtable;
