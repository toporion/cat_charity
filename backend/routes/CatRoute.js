const {createCat,getAllCats }= require('../controllers/CatController')
const imageUpload = require('../middlewares/fileUploader')

const route=require('express').Router()

route.post('/cat',imageUpload.single('profileImage'),createCat)
route.get('/cat',getAllCats)

module.exports=route;