const jwt = require('jsonwebtoken')
const {SECRET} = process.env
const {User} = require('../db')


const verifyToken = async (req, res, next)=>{
    try {
        const token = req.headers['x-access-token']
    
        if(!token) return res.status(403).send({message: "No token provided"})
    
        const decoded = jwt.verify(token, SECRET)
    
        const user = await User.findByPk(decoded.id)

        if(!user) return res.status(404).send({message: 'User not found'})
    
        next()
    } catch (error) {
        console.log(error)
        res.status(498).send({message: 'Token expired- Please Log In'})
    }
   
}

const verifyAdminToken = async (req, res, next)=> {
    try {
        const token = req.headers['x-access-token']
    
        if(!token) return res.status(403).send({message: "No token provided"})
    
        const decoded = jwt.verify(token, SECRET)
    
        const user = await User.findByPk(decoded.id)

        if(!user) return res.status(404).send({message: 'User not found'})

        if(user.ROLE!== 'Admin') return res.status(405).send({message: 'Must be an Admin'})
    
        next()
    } catch (error) {
        console.log(error)
        res.status(498).send({message: 'Token expired- Please Log In'})
    }
   
}

module.exports= {
    verifyToken,
    verifyAdminToken
}