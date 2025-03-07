const { requestAdoption, getAdoptionRequests, updateAdoptionStatus } = require('../controllers/AdoptionController')

const route=require('express').Router()

route.post('/adopt',requestAdoption)
route.get('/adoptions',getAdoptionRequests)
route.put('/adoptions/:id',updateAdoptionStatus)

module.exports=route