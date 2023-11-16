const { Customer, Product, Category, Wishlist } = require("../models");
const { createToken } = require("../helper/jwt");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const axios = require("axios");

class CustomerController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await Customer.create({
        email,
        password,
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
      const user = await Customer.findOne({ where: { email } });
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
      const [user, created] = await Customer.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.username,
          email: payload.email,
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
  static async products(req, res, next) {
    try {
      const { page, name } = req.query;
      let size = 9;
      const getPagination = (page) => {
        const offset = page ? (page - 1) * size : 0;
        return { offset };
      };
      const getPagingData = (data, page) => {
        const { count: totalItems, rows: products } = data;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(totalItems / size);
        return { totalItems, products, totalPages, currentPage };
      };

      let option = { status: 'Active'}
      name ? option.name = { [Op.iLike]: `%${name}%` } : null;
      
      const { offset } = getPagination(page);

      const data = await Product.findAndCountAll({
        where: option,
        limit: size,
        offset,
        order: [["id", "ASC"]],
        include: {
          model: Category,
        },
      });

      const response = getPagingData(data, page);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async detail(req, res, next) {
    const { id } = req.params;
    await Product.findByPk(id, {
      include: {
        model: Category,
      },
    })
      .then((data) => {
        if (!data) {
          throw { name: "Data Not Found" };
        } else {
          return res.status(200).json(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static async addWishlist(req, res, next) {
    try {
      const { id } = req.user;
      const { ProductId } = req.body;
      const create = await Wishlist.create({
        CustomerId: id,
        ProductId,
      });
      res.status(201).json(create);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async wishlist(req, res, next) {
    try {
      const { id } = req.user;
      const data = await Wishlist.findAll({
        where: {
          CustomerId: id,
        },
        include: [
          {
            model: Product,
            include: {
              model: Category,
            },
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async qrCode(req, res, next) {
    try {
      const { urlDetail } = req.body;
      const {data} = await axios({
        url: `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_ACCESS_TOKEN}`,
        method: "post",
        data: {
          "frame_name": "no-frame",
          "qr_code_text": `"${urlDetail}`,
          "image_format": "SVG",
          "qr_code_logo": "scan-me-square"
      },
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CustomerController;
