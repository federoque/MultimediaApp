const {Content, User, Qualification} = require('../db.js')

const qualificate = async (req,res) => {
    try {
       
        const {userId, contentId, qualification} = req.body

        const user = await User.findOne({
            where:{
                ID: userId
            }
        })
    
        const content = await Content.findOne({
            where:{
                ID: contentId
            }
        })
    
        if(!user || !content) return res.status(404).send({message:"User or Content does not exist"})
    
        const findQualification = await Qualification.findOne({
            where:{
                UserID: userId,
                ContentID: contentId
            }
        })
    
        if (findQualification) return res.status(406).send({message: 'Alredy qualificate that content'})
    
        const newQualification = await Qualification.create({QUALIFICATION: qualification})
    
        newQualification.setUser(user)
        newQualification.setContent(content)
    
        res.status(200).send({message: 'Content is qualificated'})
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    qualificate
}