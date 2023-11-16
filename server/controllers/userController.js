const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const { createToken } = require("../helper/jwt");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      if (newUser) {
        const payload = {
          id: newUser.id,
          email: newUser.email,
        };
        const token = createToken(payload);        
        
        res.status(201).json({ token });
      } else {
        throw { name: "SequelizeValidationError" };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Email or Password cannot be null" };
      }
      const user = await User.findOne({ where: { email } });
      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!user) {
        throw { name: "invalid email/password" };
      }

      if (isValidPassword) {
        const payload = {
          id: user.id,
          email: user.email,
        };

        const token = createToken(payload);
        res.status(200).json({ token });
      } else {
        throw { name: "invalid email/password" };
      }
    } catch (err) {
      next(err);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.G_CLIENT,
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.username,
          email: payload.email,
          role: "Staff",
          password: Math.random() * 10000,
        },
        hooks: false,
      });

      let token = createToken({ id: user.id });
      res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
