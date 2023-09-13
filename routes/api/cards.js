const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cards/cardService");
const { validateCardSchema } = require("../../validation/joi/cardValidation");
const normaliztionCard = require("../../model/cards/helpers/normalitionCard");
const authmw = require("../../middleware/authMiddleware");

const { validateIdSchema } = require("../../validation/joi/idValidation");
const {
  validateBizCardSchema,
} = require("../../validation/joi/bizNumberValudet");
const CustomError = require("../../utils/CustomError");
const permissionsMiddlewareUser = require("../../middleware/permissionsUsersMiddleware");

//get all cards
//localhost:8181/api/cards
//Everyone
router.get("/", async (req, res) => {
  try {
    await validateCardSchema(req.body);
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
   
    res.status(400).json(err);
  }
});

///get my-cards
//localhost:8181/api/cards/my-cards
//the owner of the card
router.get("/my-cards", authmw, async (req, res) => {
  try {
    const Cards = await cardsServiceModel.getMyCards();
    const myCards = Cards.filter((card) => card.user_id == req.userData._id);
    if (myCards == 0) {
      res.json({ msg: "You don't have any tickets you've created" });
    } else {
      res.json(myCards);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//get card:id
//localhost:8181/api/cards/id
//Everyone
router.get("/:id", async (req, res) => {
  try {
    await validateCardSchema(req.body);
    const getId = await cardsServiceModel.getCardById(req.params.id);
    if (getId === null) {
      res.json({ msg: "Card does not exist." });
    } else {
      res.json(getId);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//creat card
//localhost:8181/api/cards
//only biz
router.post(
  "/",
  authmw,
  permissionsMiddlewareUser(true, false),
  async (req, res) => {
    try {
      await validateCardSchema(req.body);
      let normalCard = await normaliztionCard(req.body, req.userData._id);

      await cardsServiceModel.createCard(normalCard);
      res.json(normalCard);
    } catch (err) {
     
      res.status(400).json(err);
    }
  }
);

//edit card
//localhost:8181/api/cards/id
//the owner of the card
router.put(
  "/:id",
  authmw,
  permissionsMiddlewareUser(true, false),
  async (req, res) => {
    try {
      await validateCardSchema(req.body);
      await validateIdSchema(req.params.id);
      /*    await normaliztionCard(req.body, req.userData._id); */
      /*  const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
     if (req.body.bizNumber !== cardFromDB.bizNumber) {
     
        return res.status(400).json({ message: "Cannot update bizNumber" });
      } 
 */
      delete req.body.bizNumber;
      const updatedCard = await cardsServiceModel.updateCard(
        req.params.id,
        req.body
      );

      res.json(updatedCard);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//like card
//localhost:8181/api/cards:id
//the owner

router.patch("/like/:id", authmw, async (req, res) => {
  try {
    await validateIdSchema(req.params.id);
    const cardId = req.params.id;
    let cardLike = await cardsServiceModel.getCardById(cardId);
    if (cardLike.likes.find((userId) => userId == req.userData._id)) {
      const cardFiltered = cardLike.likes.filter(
        (userId) => userId != req.userData._id
      );
      cardLike.likes = cardFiltered;
      cardLike = await cardLike.save();
      res.json({ msg: "The card has been added to the favorites list." });
    } else {
      cardLike.likes = [...cardLike.likes, req.userData._id];
      cardLike = await cardLike.save();
      res.json({ msg: "The card has been removed from the favorites list." });
    }
  } catch (err) {
   
    res.status(400).json(err);
  }
});

//delete card
//localhost:8181/api/cards
//the owner of the card

router.delete(
  "/:id",
  authmw,
  permissionsMiddlewareUser(true, false),
  async (req, res) => {
    try {
      await validateIdSchema(req.params.id);
      const deleteCard = await cardsServiceModel.DeleteCard(req.params.id);
      if (deleteCard) {
        res.json({ mgs: "The card has been deleted." });
      } else {
        res.json({ mgs: "cold not find the card" });
      }
    } catch (err) {
     
      res.status(400).json(err);
    }
  }
);

//Bonus
//admin
//localhost:8181/api/cards/bizNumber
//put

router.patch(
  "/bizNum/:bizNumber",
  authmw,
  permissionsMiddlewareUser(true, false),
  async (req, res) => {
    try {
      await validateBizCardSchema(req.params.bizNumber, req.body.bizNumber);

      const cards = await cardsServiceModel.getAllCards();
      const bizNumbers = cards.map((card) => card.bizNumber);

      const updateCardBiz = await cardsServiceModel.updateCardBiz(
        req.params.bizNumber,
        req.body.bizNumber
      );

      if (!updateCardBiz) {
       
        throw new CustomError("Card does not exist!");
      }
      if (bizNumbers.includes(req.body.bizNumber)) {
        throw new CustomError("The number is occupied by another card!");
      }
      res.json(updateCardBiz);
    } catch (err) {
     
      res.status(400).json(err);
    }
  }
);

module.exports = router;
