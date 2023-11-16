const { Product, User, History } = require("../models/index");

class ProductController {
  static products(req, res, next) {
    Product.findAll({
      include: {
        model: User,
        attributes: [
          "id",
          "username",
          "email",
          "role",
          "phoneNumber",
          "address",
        ]        
      },
      order: [['id', 'DESC']]
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => next(err));
  }
  static create(req, res, next) {
    const { name, description, price, stock, imgUrl, categoryId } = req.body;
    let product;
    
    Product.create({
      name,
      description,
      price,
      stock,
      imgUrl,
      categoryId,
      authorId: req.user.id,
    })
      .then((data) => {
        product = data;
        return History.create({
          name,
          description: `new ${name} with id ${data.id} created`,
          updatedBy: req.user.email
        });
      })
      .then(() => {
        res.status(201).json(product);
      })
      .catch((err) => 
        next(err));
  }
  static productId(req, res, next) {
    const { id } = req.params;
    Product.findByPk(id)
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
  static async delete(req, res, next) {
    try {
      const id = +req.params.id;
      const product = await Product.findByPk(id);
      const deleteProduct = await Product.destroy({
        where: { id: product.id },
      });
      if (deleteProduct) {
        return res
          .status(200)
          .json({ message: product.name + ` success to delete` });
      } else {
        throw { name: "Error Not Found" };
      }
    } catch (err) {
      next(err);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const id = +req.params.id;
      const product = await Product.findByPk(id);
      const { name, description, price, stock, imgUrl } = req.body;
      const edit = await Product.update(
        { name, description, price, stock, imgUrl },
        {
          where: { id },
        }
      );
      if (edit[0] !== 0) {
        await History.create({
          name: product.name,
          description: `${product.name} with id ${id} updated`,
          updatedBy: req.user.email,
        });
        return res.status(200).json({
          message: `Product ${product.name} edit success`,
        });
      } else {
        throw { name: "Update fail" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async changeStatus(req, res, next) {
    try {
      const id = +req.params.id;
      const { status } = req.body;
      const product = await Product.findByPk(id);
      const update = await Product.update(
        { status },
        {
          where: { id },
        }
      );
      if (update[0] !== 0) {
        await History.create({
          name: product.name,
          description: `${product.name} with id ${id} status has been updated from ${product.status} into ${status}`,
          updatedBy: req.user.email,
        });
        return res.status(200).json({
          message: `Product ${product.name} success change status to ${status}`,
        });
      } else {
        throw { name: "Update fail" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async history(req, res, next){
    try {
        const histories = await History.findAll({
            order: [['createdAt', 'DESC']]
        })
        if(histories){
            return res.status(200).json(histories)
        }else{
            throw {name: "Data Not Found"}
        }
    } catch (error) {
        next(error)
    }
  }
  
}

module.exports = ProductController;
