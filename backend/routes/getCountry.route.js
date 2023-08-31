const route = require('express').Router();
const conn = require('../modules/conn');

route.get('/get-country' , (req,res) =>{

    const sql = "SELECT * FROM `countries`";
    conn.query(sql ,  (err,result) =>{
        if (err) {
            console.error(err);
            res.send('Internal Server Error');
        } 
        else {
            res.send(result);
        }
    })
})

module.exports = route;