const CustomError = require("../utils/CustomError");
const { getCardById } = require("../model/cards/cardService");
/* const { validateIdSchema } = require("../validation/joi/idValidation"); */

const checkIfOwner = async (iduser, idcard, res, next) => {
  try {
    /*   await validateIdSchema(req.params.id);  */
    const cardData = await getCardById(idcard);
    if (!cardData) {
    
      return res.status(400).json({ msg: "card not found" });
    }

    if (cardData.user_id == iduser) {
      next();
    } else {
      res.status(401).json({ msg: "you not the biz owner" })
    }
  } catch (err) {
  
  }
};

const permissionsMiddleware = (isBiz, isAdmin, isOwner) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }

    if (isBiz === req.userData.isBusiness && isBiz === true) {
      return next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }

    if (isOwner === true) {
      checkIfOwner(req.userData._id, req.params.id, res, next);
    }
   
   res.status(400).send({ msg: "Access to authorized persons only" });
  };
};

module.exports = permissionsMiddleware;
