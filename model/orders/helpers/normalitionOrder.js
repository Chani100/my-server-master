const generateBizNumber = require("./generateBizNumber");

const normaliztionOrder = async (order, userId, cardId) => {
  return {
    ...order,

    bizNumber: order.bizNumber || (await generateBizNumber()),
    user_id: order.user_id || userId,
    card_id: order.card_id || cardId,
  };
};

module.exports = normaliztionOrder;
