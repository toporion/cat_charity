const express = require('express')
const app = express()
const cors=require('cors')
require('dotenv').config();
const bodyParser=require('body-parser')
require('./connection/db')
const UserRoute=require('./routes/UserRoute')
const CatRoute=require('./routes/CatRoute')
const AdoptRoute=require('./routes/AdoptionRoutes')
const port = process.env.PORT || 8080


app.use(cors());

app.use(express.json())
app.use(bodyParser.json())
app.use('/api',UserRoute)
app.use('/api',CatRoute)
app.use('/api',AdoptRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})