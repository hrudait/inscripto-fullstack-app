const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000
app.listen(port)
let corsOptions = {
  origin: 'https://front-qqki.onrender.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
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

app.get('/login', (req,res)=>{
  
})