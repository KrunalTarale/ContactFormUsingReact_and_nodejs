const route = require('express').Router();
const conn = require('../modules/conn')

route.post('/getInquiry', (req, res) => {
    const inquiry = req.body;
    const sql = "INSERT INTO `inquiries` (`fname`, `lname`, `country`, `phone`, `state`, `city`, `levelone`, `leveltwo`, `levelthree`, `massage`) VALUES ('" + inquiry.fname + "', '" + inquiry.lname + "', '" + inquiry.country + "', '" + inquiry.phone + "', '" + inquiry.state + "', '" + inquiry.city + "', '" + inquiry.levelone + "', '" + inquiry.leveltwo + "', '" + inquiry.levelthree + "', '" + inquiry.massage + "');"

    conn.query(sql, (err, result) => {
        if (!err) {
            res.send({ success: "Inquiry Successfully Stored" })
        } else {
            console.log(err);
            res.status(500).send({ error: "An error occurred while processing your inquiry" });
        }
    })
})

module.exports = route;
