const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Authrouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');



require('dotenv').config();
require('./Models/db')

const PORT = process.env.PORT || 5000


app.get('/hello', (req,res) => {
    res.send('LAVI');
});


app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND, 
    credentials: true,               
  }))

app.use('/auth' , Authrouter);
app.use('/product' , ProductRouter)



app.listen(PORT,()=>{
    console.log(`'SERVER IS RUNNING' ${PORT}`)
})