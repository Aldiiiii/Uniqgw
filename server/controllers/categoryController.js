const { Category, Product } = require('../models/index')

class CategoryController {
    static async categories(req, res, next){
        try {
            const categories = await Category.findAll({
                include: Product,
                order: [['id', 'ASC']]
            })
            res.status(200).json(categories)
        } catch (err) {
            next(err)   
        }
    }
}

module.exports = CategoryController