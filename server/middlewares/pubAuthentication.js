const { verifyToken } = require('../helper/jwt')
const { Customer } = require('../models')

async function pubAuthentication (req, res, next){
    try {
        const { access_token } = req.headers
        if(!access_token){
            throw { name: 'unauthenticated' }
        }
        
        const payload = verifyToken(access_token)
        const findUser = await Customer.findByPk(payload.id)

        if(!findUser){
            throw {name: 'unauthenticated'}
        }
        
        req.user = {
            id: findUser.id,
            email: findUser.email,
        }

        next()
    } catch (err) {
        
        next(err)
    }
}

module.exports = pubAuthentication