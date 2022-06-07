const {Category} = require('../db')
const categories = [
    'Accion',
    'Comedia',
    'Drama',
    'Fantasia',
    'Misterio',
    'Romance',
    'Terror',
    'Thriller',
    'Western'
]

const fillCategories = () => {
    categories.forEach(async (category)=> {
        await Category.findOrCreate({
            where: {
                NAME: category,
            }
        })
    })
}

module.exports = {
    fillCategories,
    categories
}