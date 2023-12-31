const mongoose = require("mongoose");

const {
  URL,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidaite");
const Image = new mongoose.Schema({
  url: {...URL, required: true},
  alt: DEFAULT_STRING_SCHEMA_REQUIRED,
});

module.exports = Image;
