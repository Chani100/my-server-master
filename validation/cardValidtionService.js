const joicardValidation= require("./joi/cardValidation")
const config= require("config")
const validatorOption = config.get("validatorOption");

const creatCardValidation = (userInput) =>{
    if(validatorOption==="Joi"){
        return joicardValidation.validateCardSchema(userInput);
    }
    throw new Error("validator undefined")
}

module.exports={
    creatCardValidation,
}

