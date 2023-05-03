const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000
app.listen(port)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
app.use(cors())
app.get('/', (req,res) =>{
    res.json({bruh:"hello"})
})