const generateBizNumber = require("./generateBizNumber");

const normaliztionbookAtable = async (bookAtable, userId, cardId) => {
  return {
    ...bookAtable,

    bizNumber: bookAtable.bizNumber || (await generateBizNumber()),
    user_id: bookAtable.user_id || userId,
    card_id: bookAtable.card_id || cardId,
  };
};

module.exports = normaliztionbookAtable;
