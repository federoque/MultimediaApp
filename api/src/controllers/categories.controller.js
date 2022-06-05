const {Category} = require('../db')
const categories = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mistery',
    'Romance',
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

module.exports = fillCategories