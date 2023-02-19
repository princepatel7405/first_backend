const express = require("express");
const { UserModel } = require("../model/user.model");
var jwt = require("jsonwebtoken");
const userRoute = express.Router();
const bcrypt = require("bcrypt");

userRoute.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secured_pass) => {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
      } else {
        const data = new UserModel({ name, password: secured_pass, email });
        await data.save();
        res.send("user Sign up successfully");
      }
    });
  } catch (error) {
    res.send({ msg: "Try once again to sign up", error: error.message });
  }
});

userRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await UserModel.findOne({ email });
    if (data) {
      bcrypt.compare(password, data.password, (err, result) => {
        // result == true
        if (result) {
          var token = jwt.sign({"_id":data._id}, "motors");
          res.send({
            msg: "User has been logged in successfully",
            token: token,
          });
        } else {
          res.send("Password is incorrect");
        }
      });
    }
     else {
      res.send("Wrong Cridentials");
    }
  } catch (error) {
    res.send({ msg: "Try again to Log in ", error: error.message });
  }
});

module.exports = {
  userRoute,
};
