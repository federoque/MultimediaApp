const bcrypt = require('bcryptjs')
const {User} = require('../db')
const { SECRET } = process.env
const jwt = require('jsonwebtoken')


const encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password, salt)
    return hash
}

const comparePassword = async(bodyPassword, dbPassword) =>{
    const compare = await bcrypt.compare(bodyPassword, dbPassword)
    return compare
}

const signUp = async (req, res) => {
    const {name, password} = req.body
    const verify = await User.findAll({
        where:{
            NAME: name
        }
    })

    if(verify.length>0) return res.status(409).send({message: 'Name already in use'})

    const createUser = await User.create({
        NAME: name,
        PASSWORD: await encryptPassword(password)
    })

    const token = jwt.sign({id: createUser.ID}, SECRET, {
        expiresIn: 3600
    })

    res.status(200).send({token})
}

const signIn = async (req, res) => {
    const {name, password} = req.body

    const findUser = await User.findOne({
        where: {
            NAME: name
        }
    })
    if(!findUser) return res.status(404).send({token: null, message: "Name not found"})

    const compare = await comparePassword(password, findUser.PASSWORD)

    if(!compare) return res.status(401).send({token: null, message: "Password is Incorrect"})

    const token = jwt.sign({id: findUser.ID}, SECRET, {
        expiresIn: 86400
    })

    res.status(200).send({token, user:findUser.NAME, role: findUser.ROLE})
}

const signUpAdmin = async()=>{
    const admin = await User.findOne({
        where: {
            NAME: 'admin',
        }
    })

    if(admin) return

     await User.create({
        NAME: 'admin',
        PASSWORD: await encryptPassword('admin'),
        ROLE: 'Admin'
    })

    const user = await User.findOne({
        where: {
            NAME: 'federico',
        }
    })

    if(user) return

    return await User.create({
        NAME: 'federico',
        PASSWORD: await encryptPassword('123456'),
    })
}

module.exports = {
    signUp,
    signIn,
    signUpAdmin
}