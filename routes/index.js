var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* googl api */
/* import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

ReactDOM.render(
  <GoogleOAuthProvider clientId="77158824773-tf3qeov7n3sffg7lajd0elvcer0tv76u.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById("root")
); */
module.exports = router;
