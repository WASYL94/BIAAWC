const express = require('express')
const app = express()

const path = require('path')
const router = express.Router()

// app.get('/', (req, res) => {
//     res.status(200).send('Hello world!');
// });

app.use('/', router)
router.get('/',function(req,res){
    res.status(200).sendFile(path.join(__dirname+'/public/index.html'))
});

module.exports = app