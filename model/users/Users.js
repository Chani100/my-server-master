const mongoose = require("mongoose");
/* const Name = require("./Name");
const Address = require("./Address");
const Image = require("./Image"); */

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 14,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 256,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
    match: RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
  },
  imageUrl: {
    type: String,
    match: RegExp(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    ),
    trim: true,

    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  imageAlt: {
    type: String,
    maxLength: 256,
    trim: true,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  street: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  houseNumber: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256,
  },
/*   zip: {
    type: Number,
    trim: true,
    minLength: 4,
    default: 0,
  }, */
  recommendations: {
    type: String,
    required: false,
    maxlength: 1400,
    default: "",
  },
  biz: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("users", schema);

module.exports = User;
