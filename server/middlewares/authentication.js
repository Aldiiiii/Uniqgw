const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

async function authentication (req, res, next){
    try {
        const { access_token } = req.headers
        if(!access_token){
            throw { name: 'unauthenticated' }
        }
        
        const payload = verifyToken(access_token)
        const findUser = await User.findByPk(payload.id)

        if(!findUser){
            throw {name: 'unauthenticated'}
        }
        
        req.user = {
            id: findUser.id,
            email: findUser.email,
            role: findUser.role
        }

        next()
    } catch (err) {
        
        next(err)
    }
}

module.exports = authentication