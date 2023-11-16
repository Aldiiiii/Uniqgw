const { Product } = require('../models')

async function authorization(req, res, next){
    try {        
        const { id } = req.params
        const { status } = req.body
        const findProduct = await Product.findByPk(id)
        if(!findProduct){
            throw {name: 'Data Not Found'}
        }
        
        if(status && req.user.role !== 'Admin'){
            throw {name: 'Forbidden'}
        }

        if(req.user.role !== 'Admin'){
            if(req.user.id !== findProduct.authorId){
                throw {name: 'Forbidden'}
            }
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authorization