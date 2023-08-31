const express = require( 'express');
const app = express();
const cors = require('cors')
app.use(cors());
const conn = require('./modules/conn');
app.use(express.json())

const getCountry = require('./routes/getCountry.route')
app.use(getCountry)

const getStates = require('./routes/getState.rotue')
app.use(getStates)

const getCities = require('./routes/getCity.route')
app.use(getCities)

const getLevelfirst = require('./routes/getFirstLevel.route')
app.use(getLevelfirst)

const getLevelsecond = require('./routes/getSecondLevel.route')
app.use(getLevelsecond)

const getLevelthird = require('./routes/getThirdLevel.route')
app.use(getLevelthird)

const getInquiry = require('./routes/getInquiry.route')
app.use(getInquiry)


app.listen("5000" , ()=>{
    console.log("Server is running on port 5000");
})