module.exports = (app) => {
  const db = require("../models")
  const { authJwt, validation } = require("../middleware");
  const { Op } = require("sequelize");
  const UserLoginToken = db.user_login_token;


  // controller initialization
  const auth = require("../controllers/auth.controller");

  // router initialization 
  var auth_route = require("express").Router();

  // auth routes 
  auth_route.post("/signin", [validation.UserLoginValidation], auth.sign_in);
  auth_route.post("/submit-otp", auth.submit_otp);


  var checkAPI = async function (req, res, next) {
    const access_token = req?.headers?.accesstoken;
    if (access_token) {
      var currentDate = new Date();
      var user_token_body = {
        token: access_token,
        expiry_date: {
          [Op.gt]: currentDate
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, ""),
        },
      };

      UserLoginToken.findAll({ where: user_token_body }).then(
        (tokens) => {
          if (tokens[0]) {
            req.user_id = tokens[0]?.user_id;
            next();
          } else {
            res.status(401).send("Authorize Parameter Invalid");
          }
        })
    } else {
      res.status(401).send("Authorize Parameter not Provided");
    }
  };

  // return api data 
  app.use("/api/*", checkAPI);

  app.use("/auth/", auth_route);
};
