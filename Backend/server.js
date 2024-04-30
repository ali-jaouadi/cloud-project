const express = require("express");
const bodyParser=require('body-parser')
require('./Config/dbConnect')
require('dotenv').config()
const cors = require("cors");

const authRoutes = require('./Routes/auth.routes')
const stadeRoutes = require('./Routes/stade.routes')
const reservationRoutes = require('./Routes/reservation.routes')
const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/auth',authRoutes)
app.use('/stade',stadeRoutes)
app.use('/reservation',reservationRoutes)


global.__basedir = __dirname;
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}.`);
  });