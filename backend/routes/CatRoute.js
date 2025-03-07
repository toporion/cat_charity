const {createCat,getAllCats, deleteCat, getCatById, updateById }= require('../controllers/CatController')
const imageUpload = require('../middlewares/fileUploader')

const route=require('express').Router()

route.post('/cat',imageUpload.single('profileImage'),createCat)
route.get('/cat',getAllCats)
route.delete('/cat/:id',deleteCat)
route.get('/cat/:id',getCatById)
route.put('/cat/:id',imageUpload.single('profileImage'),updateById)

module.exports=route;