const {Content, Category, Qualification} = require('../db.js')
const axios = require('axios')
const { access } = require('fs')

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
                IMG: el.IMG,
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
            if (filterContent.length===0) return res.status(200).send({NAME: 'Not Found'})
            return res.status(200).send(filterContent)
        }

        if(category){
            const filterContent = contentToShow.filter(content => content.CATEGORIES.includes(category))
            if (filterContent.length===0) return res.status(200).send({NAME: 'Not Found'})
            return res.status(200).send(filterContent)
        }
        res.status(200).send(contentToShow)
    } catch (error) {
        return res.send(error)
    }
}

const createContent = async (req, res)=> {
    try {
        const {name, url, img, categories} = req.body
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
            IMG: img
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
            IMG: el.IMG,
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
        const {name, url, img} = req.body
        const content = await Content.findByPk(id)
        if(!name || !url || !img) return res.status(400).send({message: 'Name, img and URL are required'}) 
        if(name && url && img) {
            await content.update({
                NAME: name,
                URL: url,
                IMG: img
            })
            return res.status(200).send({message: "Content updated"})
        }
    } catch (error) {
        res.send(error)
    }
}

async function bulkCreate(){
    let ADMIN = {
        name: "admin",
        password: "admin"
    }

   const admin = await axios.post(`http://localhost:3001/auth/signin`, ADMIN)
   console.log(admin.data.token)

   let token = {
       accesstoken: admin.data.token
   }
   console.log(token)

   let bulkCreate = [
    {name : "The lost city", url : "nfKO9rYDmE8", img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/neMZH82Stu91d3iqvLdNQfqPPyl.jpg", categories: ['Fantasia', 'Accion']},
    {name: "Los secretos de Dumbledore", url: "QfYgcLuxS5Y", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg", categories: ['Fantasia']},
    {name: "Sonic 2", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",url:"2OMixTIRQcY", categories: ['Accion', "Fantasia"]},
    {name: "Spiderman: No way Home", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",url:"r6t0czGbuGI", categories: ['Accion']},
    {name: "Jack in the box 2", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3Ib8vlWTrAKRrTWUrTrZPOMW4jp.jpg",url:"mLQXsSoLog8", categories: ['Terror']},
    {name: "The bad guys", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",url:"m8Xt0yXaDPU", categories: ['Comedia', 'Fantasia']},
    {name: "Encanto", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",url:"Y36sM_ctfgQ", categories: ['Fantasia','Romance']},
    {name: "Gasoline Alley", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3Ib8vlWTrAKRrTWUrTrZPOMW4jp.jpg",url:"gJ_OLd8B2Is", categories: ['Accion', 'Drama']},
    {name: "365 Days", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7qU0SOVcQ8BTJLodcAlulUAG16C.jpg",url:"pyM3z73oMAk", categories: ['Romance', 'Drama']},
    {name: "A day to die", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Kce1utfytAG5m1PbtVoDzmDZJH.jpg",url:"7pQGdEtrGHI", categories: ['Accion', 'Drama']},
    {name: "Volver al futuro", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg",url:"OCWYRkQNhOo&t=9s", categories: ['Accion', 'Fantasia', 'Western']},
    {name: "Volver al futuro 2", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hQq8xZe5uLjFzSBt4LanNP7SQjl.jpg",url:"OCWYRkQNhOo&t=9s", categories: ['Accion', 'Fantasia', 'Western']},
    {name: "Volver al futuro 3", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/crzoVQnMzIrRfHtQw0tLBirNfVg.jpg",url:"OCWYRkQNhOo&t=9s", categories: ['Accion', 'Fantasia', 'Western']},
    {name: "El padrino", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",url:"gCVj1LeYnsc", categories: ['Accion', 'Fantasia', 'Western']},
    {name : "The lost city 1", url : "nfKO9rYDmE8", img: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/neMZH82Stu91d3iqvLdNQfqPPyl.jpg", categories: ['Fantasia', 'Accion']},
    {name: "Los secretos de Dumbledore 1", url: "QfYgcLuxS5Y", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg", categories: ['Fantasia']},
    {name: "Sonic 3", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",url:"2OMixTIRQcY", categories: ['Accion', "Fantasia"]},
    {name: "Spiderman1: No way Home", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",url:"r6t0czGbuGI", categories: ['Accion']},
    {name: "Jack in the box", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3Ib8vlWTrAKRrTWUrTrZPOMW4jp.jpg",url:"mLQXsSoLog8", categories: ['Terror']},
    {name: "The bad guys 1", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",url:"m8Xt0yXaDPU", categories: ['Comedia', 'Fantasia']},
    {name: "Encanto 2", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",url:"Y36sM_ctfgQ", categories: ['Fantasia','Romance']},
    {name: "Gasoline Alley 2", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3Ib8vlWTrAKRrTWUrTrZPOMW4jp.jpg",url:"gJ_OLd8B2Is", categories: ['Accion', 'Drama']},
    {name: "365 Days 2", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7qU0SOVcQ8BTJLodcAlulUAG16C.jpg",url:"pyM3z73oMAk", categories: ['Romance', 'Drama']},
    {name: "A day to die 2", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Kce1utfytAG5m1PbtVoDzmDZJH.jpg",url:"7pQGdEtrGHI", categories: ['Accion', 'Drama']},
    {name: "Volver al futuro 4", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg",url:"OCWYRkQNhOo&t=9s", categories: ['Accion', 'Fantasia', 'Western']},
    {name: "Volver al futuro 5", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hQq8xZe5uLjFzSBt4LanNP7SQjl.jpg",url:"OCWYRkQNhOo&t=9s", categories: ['Accion', 'Fantasia', 'Western']},
    {name: "Volver al futuro 6", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/crzoVQnMzIrRfHtQw0tLBirNfVg.jpg",url:"OCWYRkQNhOo&t=9s", categories: ['Accion', 'Fantasia', 'Western']},
    {name: "El padrino 2", img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",url:"gCVj1LeYnsc", categories: ['Accion', 'Fantasia', 'Western']}
   ]

   for(let i=0; i<bulkCreate.length; i++){
       await axios.post(`http://localhost:3001/content`, bulkCreate[i], {headers: token})
   }
}

module.exports = {
    getContent,
    createContent,
    contentDetail,
    deleteContent,
    updateContent,
    bulkCreate
}