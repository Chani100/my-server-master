
const BookATable = require("./BookATable");

const _ = require("lodash");

const createBookATable = async (BookATableToSave) => {
  let createBook = new BookATable(BookATableToSave);
  return createBook.save();
};
const getBookATableByEmail = (email) => {
  return BookATable.findOne({ email });
};

const getAllBookATable = (id, option) => {
  return BookATable.find(id, option);
};

const getBookATableById = (id, options) => {
  return BookATable.findById(id, options);
};
const getBookATableByBizNumbeer = (bizNumber) => {
  return Card.find({ bizNumber }); /* , { bizNumber: 1 , _id: 0  } ); */
};

const getMyBookATable = (userId) => {
  return BookATable.find(userId);
};

const updatBookATable = async (id, BookATableToUpdat) => {
  return BookATable.findByIdAndUpdate(id, BookATableToUpdat, { new: true });
};

const DeleteBookATable = (id) => {
  return BookATable.findByIdAndDelete(id);
};

module.exports = {
  getMyBookATable,
  getBookATableByBizNumbeer,
  createBookATable,
  getBookATableByEmail,
  getAllBookATable,
  getBookATableById,
  updatBookATable,
  DeleteBookATable,
};
