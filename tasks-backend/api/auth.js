const {authSecret} = require('./../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res, next) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Dados estão incompletos!')
        }

        const user = await app.db('users')
            .where({'email': req.body.email})
            .first()

        if(user){
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if(err || !isMatch){
                    return res.status(401).send('Usuario não autorizado!')
                }else{
                    const payload = {id: user.id}

                    return res.json({
                        name: user.name,
                        email: user.email,
                        token: jwt.encode(payload, authSecret)
                    })
                }
            })
        }else{
            return res.status(400).send('Usuario não foi encontrado!')
        }
    }

    return {signin}
}