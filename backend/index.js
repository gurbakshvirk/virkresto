const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path");
const UPLOAD_DIR = path.join(__dirname, "uploads");


const Authrouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter');
const categoryRoutes = require('./Routes/CategoryRoutes');
const productRoutes = require("./Routes/ProductRouter");


require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 5000;

app.get('/hello', (req, res) => {
  res.send('LAVI');
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true,
}));

// ROUTES
app.use('/auth', Authrouter);
// app.use('/product', ProductRouter);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(UPLOAD_DIR));
console.log("Serving uploads from:", UPLOAD_DIR);



app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
