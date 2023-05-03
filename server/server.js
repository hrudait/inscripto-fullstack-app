const express = require('express')
const app = express();
const cors = require('cors')
port = 5000
app.listen(port)
app.use(cors())
app.get('/', (req,res) =>{
    res.json({bruh:"hello"})
})