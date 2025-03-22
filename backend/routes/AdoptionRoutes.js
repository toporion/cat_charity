const { requestAdoption, getAdoptionRequests, updateAdoptionStatus, deleteAdoptionRequest } = require('../controllers/AdoptionController')

const route=require('express').Router()

route.post('/adopt',requestAdoption)
route.get('/adoptions',getAdoptionRequests)
route.put('/adoptions/:id',updateAdoptionStatus)
route.delete('/adoptions/:id',deleteAdoptionRequest)
module.exports=route