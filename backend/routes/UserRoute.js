const { createUser, userLogin, getAllUser, getUserById, deleteUserById } = require('../controllers/UserController')
const imageUpload = require('../middlewares/fileUploader')

const route=require('express').Router()


route.post('/register',imageUpload.single('profileImage'),createUser)
route.post('/login',userLogin)
route.get('/user',getAllUser)
route.get('/user/:id',getUserById)
route.delete('/user/:id',deleteUserById)
module.exports=route