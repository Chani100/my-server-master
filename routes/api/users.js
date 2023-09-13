const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  validateLoginSchema,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/users/helpers/normalitionUsea");
const usersServiceModel = require("../../model/users/usersService");
const { generateToken } = require("../../config/jwt");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsUsersMiddleware = require("../../middleware/permissionsUsersMiddleware");
const { validateIdSchema } = require("../../validation/joi/idValidation");
const _ = require("lodash");
const {
  validaterecommendationschema,
} = require("../../validation/joi/validetContact");
const { validateProfailSchema } = require("../../validation/joi/profailValidat");
//localhost:8181/api/users
// register
router.post("/", async (req, res) => {
  try {
    await registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (userData) throw new CustomError("invalid email ");
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "register" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//localhost:8181/api/users
// getAllUsers
//only admin
router.get(
  "/",
 /*  authmw,
  permissionsUsersMiddleware(true, true), */
  async (req, res) => {
    try {
      const allUsers = await usersServiceModel.getAllUsers(req.id, {
        password: 0,
        _id: 0,
      });
      res.json(allUsers);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//localhost:8181/api/users/id
//getuserById
// admin or owner
router.get(
  "/:id",
  authmw,
  permissionsUsersMiddleware(true, true),
  async (req, res) => {
    try {
      await validateIdSchema(req.params.id);
      const getId = await usersServiceModel.getuserById(req.params.id, {
        password: 0,
        _id: 0,
      });

      res.json(getId);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//localhost:8181/api/users/id
//updateUser
// only ownere
router.put(
  "/:id",
  authmw,
  permissionsUsersMiddleware(false, true),
  async (req, res) => {
    try {
      await validateProfailSchema(req.body);
      await validateIdSchema(req.params.id);
      normalizeUser(req.body);
      const updateUser = await usersServiceModel.updateUser(
        req.params.id,
        req.body
      );

      res.json(updateUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//localhost:8181/api/users/id
//updat only biz
//only ownere
router.patch(
  "/:id",
  authmw,
  permissionsUsersMiddleware(false, true),
  async (req, res) => {
    try {
      await registerUserValidation(req.body);
      await validateIdSchema(req.params.id);
      const Business = req.params.id;
      let userData = await usersServiceModel.getuserById(Business);
      if (userData.isBusiness === true) {
        userData.isBusiness = false;
        userData = await userData.save();
        res.json({ msg: "Editing was done false successfully" });
      } else {
        userData.isBusiness = true;
        userData = await userData.save();
        res.json({ msg: "Editing was done true successfully" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//localhost:8181/api/users/id
//delet
//admin or ownere
router.delete(
  "/:id",
  authmw,
  permissionsUsersMiddleware(true, true),
  async (req, res) => {
    try {
      await validateIdSchema(req.params.id);
      const DeleteUser = await usersServiceModel.DeleteUser(req.params.id);
      res.json(DeleteUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//localhost:8181/api/users/login
//only register
//Bonos

const MAX_LOGIN_ATTEMPTS = 3;
const loginAttempts = new Map();

router.post("/login", async (req, res) => {
  try {
    await validateLoginSchema(req.body);

    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");

    const email = req.body.email;
    const attempts = loginAttempts.get(email) || 0;
    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      throw new CustomError(
        "access blocked for 24 hours due to too many login attempts"
      );
    }

    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch) {
      loginAttempts.set(email, attempts + 1);
      throw new CustomError("invalid email and/or password");
    }

    loginAttempts.delete(email);

    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});
//http://localhost:8181/api/auth/users/contact/:id
router.patch(
  "/contact/:id",
  authmw,
  permissionsUsersMiddleware(false, true),
  async (req, res) => {
    try {
      await validaterecommendationschema(req.body);
      await validateIdSchema(req.params.id);
      const updateUser = await usersServiceModel.updateUser(
        req.params.id,
        req.body
      );

      res.json(updateUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
