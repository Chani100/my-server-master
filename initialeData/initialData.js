const usersData =require("./users.json")
const cardsData = require ("./card.json")
const normalizeCard = require("../model/cards/helpers/normalitionCard");
const usersService = require("../model/users/usersService")
const cardsService = require("../model/cards/cardService")
const ordersService = require("../model/orders/ordersService")
const hashService = require("../utils/hash/hashService");


const initialData = async () => {
  try {
    let cards = await cardsService.getAllCards();
    if (cards.length) {
      return;
    }
    let users = await usersService.getAllUsers();
    if (users.length) {
      return;
    }
  let orders = await ordersService.getAllOrders();
    if (orders.length) {
      return;
    } 
     let user_id = "";
     for (let user of usersData) {
       user.password = await hashService.generateHash(user.password);
       
       user_id = await usersService.registerUser(user);
     }
    user_id = user_id._id + "";
    for (let card of cardsData) {
         card = await normalizeCard(card, user_id);
      await cardsService.createCard(card);
    }
  } catch (err) {
   
  }
};

// initialData();
module.exports = initialData;

