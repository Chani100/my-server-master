const Card = require("./Card");

const createCard = async (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};

const getCardById = (id) => {
  return Card.findById(id);
};



/* const getCardByUserId = (userId) => {
   return Card.findCardByUserId(userId);
 }; */

const getMyCards = (userId) => {
  return Card.find(userId);
};

const getCardByBizNumbeer = (bizNumber) => {
  return Card.find({ bizNumber });/* , { bizNumber: 1 , _id: 0  } ); */
};
const updateCard = async (id, cardToUpdat) => {
  return Card.findByIdAndUpdate(id, cardToUpdat, { new: true });
};
  const updateCardBiz = async (bizNumber, bizNumberToUpdat) => {
    const update = {
      $set: {
        bizNumber: bizNumberToUpdat
      }
    }
    return Card.findOneAndUpdate({ bizNumber }, update, {
      new: true,
    });
  }; 

 
const DeleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};

module.exports = {
  DeleteCard,
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  getCardByBizNumbeer,
  getMyCards,
  updateCardBiz,
};
