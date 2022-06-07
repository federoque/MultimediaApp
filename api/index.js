const { app } = require('./src/app.js')
const { sequelize} = require('./src/db.js')
const {fillCategories} = require('./src/controllers/categories.controller')
const { signUpAdmin } = require('./src/controllers/auth.contoller')
const { bulkCreate } = require('./src/controllers/content.controller')

sequelize.sync({force: true})
.then(()=> console.log("Connected to DB"))
.then(()=>{
    fillCategories()
    signUpAdmin()
    console.log('Categories and Admin saved on DB')
})
.then(()=>{
    app.listen(3001)
    console.log('Server listen on port', 3001)
}).then(()=>setTimeout(() => {
    bulkCreate()
}, 1000))
.catch((error)=> console.log(error))
