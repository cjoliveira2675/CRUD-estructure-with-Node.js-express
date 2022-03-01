const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserByToken')
const { default: mongoose } = require('mongoose')
const { schema } = require('../models/user')



module.exports = class UserController {
    static async register(req, res) {

        const { name, email, phone, password, confirmPassword } = req.body
        let itensForm = [name, email, phone, password, confirmPassword]
        let itensText = ['Nome','e-mail','Fone','Senha','Confirmação de senha']
        let count = 0

        for (let item of itensForm) {
            count += 1
            if (item == null) {
                res.status(422).json({ message: 'Campo obrigatório!', indice: itensText[count-1] })
                count = 0
                return
            }
        }

        if (password !== confirmPassword) {
            res.status(422).json({ message: 'A confirmação de senha não corresponde com a senha!' })
            return
        }

        // check if user exists
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({ message: 'Já existe um usuário cadastrado com esse e-mail!' })
            return
        }

        //create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            //res.status(201).json({ message: "Usuário criado com sucesso!", newUser})
            await createUserToken(newUser, req, res)

        } catch (error) {
            res.status(500).json({ message: error })
            console.log(error)
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(422).json({ message: 'Campo Obrigatório' })
            return
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(422).json({ message: 'Usuario e/ou senha incorreto(s)' })
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Usuario e/ou senha incorreto(s)' })
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser
        console.log(req.headers.authorization)
        if (req.headers.authorization) {

            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id
        const user = await User.findById(id).select('-password')

        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }
        res.status(200).json({
            user
        })
    }

    static async editUser(req, res) {
        const id = req.params.id
        const token = getToken(req)
        const user = await getUserByToken(token)
        const { name, email, phone, password, confirmPassword } = req.body
        let image = ''
        //validations

        if (!name || !email || !phone || !password || !confirmPassword) {
            res.status(422).json({ message: 'Campo Obrigatório' })
            return
        }

        const userExists = await User.findOne({ email: email })

        if (user.email !== email && userExists) {
            res.status(422).json({
                message: 'Já existe um usuário cadastrado com este e-mail!'
            })
            return
        }
        user.email = email
    }
}
