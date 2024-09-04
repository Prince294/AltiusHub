const db = require("../models");
const commonUtil = require("../util/common");
const User = db.user;
const UserToken = db.user_login_token;
const { Op } = require("sequelize");


// Controller to handle user sign-in
exports.sign_in = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists by email or phone
    let user = await User.findOne({
      where: {
        email: email,
        username: username
      }
    });

    if (!user) {
      return res.status(403).send({ message: "Username or email is incorrect" });
    }
    var passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (passwordIsValid) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });;

      // Save token to the database
      UserToken.token = token;
      UserToken.save();
      res.status(200).send({ message: "User Logged in" });
    } else {
      return res.status(403).send({ message: "Incorrect Password" });

    }

  } catch (error) {
    res.status(500).send({ message: "Error signing in.", error: error.message });
  }
};

