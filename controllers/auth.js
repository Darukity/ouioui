const UserModel = require('../models/User');
const {verifyUser} = require('../validator/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {emit} = require("nodemon");

module.exports = {

    register: async (req, res) => {
        try {
            const newUser = req.body;
            const isNotValidateUser = verifyUser(newUser)

            if(isNotValidateUser) {
                res.status(400).send({
                    error: isNotValidateUser.message
                })
            } else {
                newUser.password =  await bcrypt.hash(newUser.password, 10)
                const { id, lastname, firstname, email} = await UserModel.create(newUser);

                res.send({
                    sucess: true,
                    user: {
                        id, // id: id
                        lastname,
                        firstname,
                        email
                    }
                })
            }

        } catch (error) {
            res.status(500).send({
                message: error.message || 'Some error occurred while registering user'
            })
        }
    },

    login: async(req, res) => {
        try{
            const user = await UserModel.findOne({email: req.body.email})
            if(!user) {
                res.status(401).send({
                    message: 'Email or Password wrong'
                })
            } else {
                const same = await  bcrypt.compare(req.body.password, user.password)
                console.log("same =>", same)
                if(same) {
                    const userData= {
                        email: user.email
                    }
                    const secret = process.env.JWT_SECRET || 'secret';
                    const jwtData = {
                        expiresIn: process.env.JWT_TIMEOUT_DURATION || '1h'
                    };

                    const token = jwt.sign(userData, secret,  jwtData);
                    res.send({
                        message: 'Succesfully Login',
                        user: {
                            firstname: user.firstname,
                            lastname: user.lastname,
                            ...userData,
                            token
                        }
                    })
                } else {
                    res.status(401).send({
                        message: 'Email or Password wrong'
                    })
                }
            }

        }catch (error) {
            res.status(500).send({
                message: error.message || 'some error occurred while logging user'
            })
        }
    }

}