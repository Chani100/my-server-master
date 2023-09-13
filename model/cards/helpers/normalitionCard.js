 const generateBizNumber = require("./generateBizNumber");

const normaliztionCard = async (card, userId) => {
  if (!card.image) {
    card.image = {};
  }
  card.image = {
    url:
      card.image.url ||
      "https://cdn.xxl.thumbs.canstockphoto.co.il/%D7%9E%D7%A2%D7%A5-%D7%9E%D7%A1%D7%92%D7%A8%D7%AA-%D7%A8%D7%99%D7%A7%D7%94-%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%A1%D7%98%D7%95%D7%A7_csp98821752.jpg",
    alt: "Default",
  };
  return {
    ...card,
   
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: card.user_id || userId,
  };
};

module.exports = normaliztionCard; 

