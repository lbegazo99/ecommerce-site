const bcrypt = require('bcryptjs')
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/ProductRouter');
const userRouter = require('./routes/userRouter');
const nbaRouter = require("./routes/nbaRouter")


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/products", productRouter);
app.use("/user",userRouter);
app.use("/nba",nbaRouter)



app.listen(3000, () => {
  console.log("Hello World");
});