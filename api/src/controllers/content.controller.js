const {Content, Category, Qualification} = require('../db.js')

const getContent = async (req, res) =>{
    try {
        const { search, category } = req.query
        const allContent = await Content.findAll({
            include:{
                model: Category,
                attributes: ['NAME'],
                through:{
                    attributes:[]
                }
            }
        })

        const contentToShow = allContent.map(el=>{
            return {
                ID: el.ID,
                NAME: el.NAME,
                URL: el.URL,
                CATEGORIES: el.Categories.map(category=> category.NAME)
            }
        })
        
        for(let i=0; i<contentToShow.length; i++){
            const qual = await Qualification.findAll({
                where:{
                    ContentID: contentToShow[i].ID
                }
            })

            contentToShow[i].QUALIFICATION = qual.length===0 ? 'Already not Qualifications' : (qual.map(qual=> qual.QUALIFICATION).reduce((prevValue, currentValue)=> prevValue+currentValue)/qual.length).toFixed(1)
        }

        if(search){ 
            const filterContent = contentToShow.filter(content => content.NAME.toLowerCase().includes(search.toLowerCase()))
            if (filterContent.length===0) return res.status(404).send({message: 'Not Found'})
            return res.status(200).send(filterContent)
        }

        if(category){
            const filterContent = contentToShow.filter(content => content.CATEGORIES.includes(category))
            if (filterContent.length===0) return res.status(404).send({message: 'Not Found'})
            return res.status(200).send(filterContent)
        }
        res.status(200).send(contentToShow)
    } catch (error) {
        return res.send(error)
    }
}

const createContent = async (req, res)=> {
    try {
        const {name, url, categories} = req.body
        if(!name || !url || !categories){
        return res.status(400).send({message: 'Content must have name, url and categories'})
    }

        const verifyName = await Content.findOne({
            where: {
                NAME: name
            }
        })

        if(verifyName) return res.status(409).send({message: 'Name already in use'})

        const content = await Content.create({
            NAME: name,
            URL: url,
         })

    categories.forEach(async (category) => {
        const dbCategory = await Category.findOne({
            where: {
                NAME: category
            }
        })
        content.addCategory(dbCategory)
    });
  
    return res.status(200).send(content)
    } catch (error) {
        return res.send(error)
    }
    
}

const contentDetail = async (req,res) =>{
    try {
    const {id} = req.params
    let content = await Content.findAll({
        where:{
            ID: id
        },
        include:{
            model: Category,
            attributes: ['NAME'],
            through:{
                attributes:[]
            }
        }
    })

    const contentToShow = content.map(el=>{
        return {
            ID: el.ID,
            NAME: el.NAME,
            URL: el.URL,
            CATEGORIES: el.Categories.map(category=> category.NAME)
        }
    })

    for(let i=0; i<contentToShow.length; i++){
        const qual = await Qualification.findAll({
            where:{
                ContentID: contentToShow[i].ID
            }
        })

        contentToShow[i].QUALIFICATION = qual.length===0 ? 'Already not Qualifications' : (qual.map(qual=> qual.QUALIFICATION).reduce((prevValue, currentValue)=> prevValue+currentValue)/qual.length).toFixed(1)
    }

    if(contentToShow.length === 0) return res.status(404).send({message: 'Content not found'})
    
    res.status(200).send(contentToShow) 
    
    } catch (error) {
        console.log(error)
        return res.status(404).send({message: 'Content not found'})
    }
}

const deleteContent = async(req, res)=> {

    try {
        const {id} = req.params

        await Content.destroy({
            where:{
                ID: id
            }
        })
    
        res.status(200).send({message: "Content deleted"})
    } catch (error) {
        res.send(error)
    }
}

const updateContent = async(req, res)=>{
    try {
        const {id} = req.params
        console.log(id)
        const {name, url} = req.body
        const content = await Content.findByPk(id)
        if(!name && !url) return res.status(400).send({message: 'Name or URL is required'}) 
        if(name && url) {
            await content.update({
                NAME: name,
                URL: url
            })
            return res.status(200).send({message: "Content updated"})
        }
        if(name){
            await content.update({
                NAME: name,
            })
            return res.status(200).send({message: "Content updated"})
        }

        if(url){
            await content.update({
                URL: url,
            })
            return res.status(200).send({message: "Content updated"})
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getContent,
    createContent,
    contentDetail,
    deleteContent,
    updateContent
}