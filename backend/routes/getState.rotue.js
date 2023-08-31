const route = require('express').Router();
const conn = require('../modules/conn');

route.get('/get-State/:id' , (req,res) =>{

    const id = req.params.id

    const sql = "SELECT * FROM `states` WHERE `country_id` = " + id;
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