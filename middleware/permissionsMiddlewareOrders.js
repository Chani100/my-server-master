const CustomError = require("../utils/CustomError");
const { getOrdersById } = require("../model/orders/ordersService");
const { validateIdSchema } = require("../validation/joi/idValidation");

const checkIfOwner = async (iduser, idorder, res, next) => {
  try {
    
    await validateIdSchema(idorder);
   
    const orderData = await getOrdersById(idorder);
    if (!orderData) {
      return res.status(400).json({ msg: "order not found" });
    }

    if (orderData.user_id == iduser) {
     next(); 
    } else {
      res.status(401).json({ msg: "you not the owner" });
    }
  } catch (err) {
  
    res.status(400).json(err);
  }
};

const permissionsMiddlewareOrder = (isAdmin, isOwner) => {
  return (req, res, next) => {
    
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }

    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }

    if (isOwner === true) {
      checkIfOwner(req.userData._id, req.params.id, res, next);
    }
    res.status(401).json({ msg: "Access to authorized persons only" });
  };
};

module.exports = permissionsMiddlewareOrder;
