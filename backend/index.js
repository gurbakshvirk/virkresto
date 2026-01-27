const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Authrouter = require('./Routes/AuthRouter');


require('dotenv').config();
require('./Models/db')

const PORT = process.env.PORT || 5000


app.get('/hello', (req,res) => {
    res.send('LAVI');
});


app.use(bodyParser.json());
app.use(cors())

app.use('/auth' , Authrouter)


app.listen(PORT,()=>{
    console.log(`'SERVER IS RUNNING' ${PORT}`)
})