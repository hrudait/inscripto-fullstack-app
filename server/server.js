require('dotenv').config();
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const User = require('./user');
const csv = require('./csv');
const app = express();
const stripe = require('stripe')('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')
const qs = require('qs')
const {connect} = require('amqplib')

const port = process.env.PORT || 5000
app.listen(port)

connectDB()

async function connectDB(){
  await mongoose.connect('mongodb+srv://resources:Hellome$1@umanagement.ufypp4w.mongodb.net/useraccess?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected"))
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

app.use(cors({
  origin: ['https://front-qqki.onrender.com','https://app.localemail.app','https://app.inscripto.app'],
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use('/webhook', bodyParser.raw({type: "*/*"}))
app.use(bodyParser.json({type: 'application/json'}))
app.use(bodyParser.urlencoded({extended: true}))



app.post("/sendverify", async(req,res)=>{
  const check = await User.exists({phoneNumber:req.body.phone})
  if(check){
    return res.status(200).send("al")
  }
  try{
    await axios.post("https://verify.twilio.com/v2/Services/VA1f7341b36346d0225b05a3976ddb0370/Verifications",qs.stringify({'To': req.body.phone, 'Channel': 'sms'}),{auth: {
      username: "ACc9f7abb0037099391fff3a262b15e17c",
      password: "f4dadbc5b7b908c4e7434dd69d7d259f"
    }})
  }
  catch(e){
    console.log(e)
    return res.status(200).send("fail")
  }
  return res.status(200).send("sent")
})

app.post("/verifycode", async(req,res)=>{
  try{
    
    const stat = await axios.post("https://verify.twilio.com/v2/Services/VA1f7341b36346d0225b05a3976ddb0370/VerificationCheck",qs.stringify({'To': req.body.phone, 'Code': req.body.code}),{auth: {
      username: "ACc9f7abb0037099391fff3a262b15e17c",
      password: "f4dadbc5b7b908c4e7434dd69d7d259f"
    }})
    if(stat.data.status==="approved"){
      res.status(200).send("verified")
      await User.findOneAndUpdate({email:req.body.email},{phoneNumber:req.body.phone,phoneVerified:true,$inc:{remainingUses:5}})
    }
    else{
      res.status(200).send("fail")
    }
  }
  catch(e){
    console.log(e)
    return res.status(200).send("fail")
  }
})

app.post("/sendforgot", async(req,res)=>{
  const email = req.body.email.toLowerCase()
  const check = await User.exists({email:email})
  if(check){ 
    const user = await User.findOne({email:email})
    try{
      await axios.post("https://verify.twilio.com/v2/Services/VA1f7341b36346d0225b05a3976ddb0370/Verifications",qs.stringify({'To': user.phoneNumber, 'Channel': 'sms'}),{auth: {
        username: "ACc9f7abb0037099391fff3a262b15e17c",
        password: "f4dadbc5b7b908c4e7434dd69d7d259f"
      }})
    }
    catch(e){
      console.log(e)
    } 
    return res.status(200).send("ok")
  }
  else{
    return res.status(200).send("ok")
  } 
})

app.post("/verifyforgot", async(req,res)=>{
  const email = req.body.email.toLowerCase()
  const check = await User.exists({email:email})
  if(check){
    const user = await User.findOne({email:email})
    try{  
      const stat = await axios.post("https://verify.twilio.com/v2/Services/VA1f7341b36346d0225b05a3976ddb0370/VerificationCheck",qs.stringify({'To': user.phoneNumber, 'Code': req.body.code}),{auth: {
        username: "ACc9f7abb0037099391fff3a262b15e17c",
        password: "f4dadbc5b7b908c4e7434dd69d7d259f"
      }})
      if(stat.data.status==="approved"){
        await User.findOneAndUpdate({email:email},{password:await bcrypt.hash(req.body.newpassword,10)})
      }
    }
    catch(e){
      console.log(e)
    }
    return res.status(200).send("ok")
  }
  else{
    return res.status(200).send("ok")
  }
})

app.post("/createUser" , async (req,res)=>{
  const customer = await stripe.customers.create();
  const newUser = new User({
    email: req.body.email,
    remainingUses: 0,
    phoneVerified: false,
    phoneNumber: "",
    customerId: customer.id,
    currentcsvs: [],
    pastcsvs: []
  })
  await newUser.save()
  return res.send("worked")
})


app.post('/getUser', async(req,res)=>{
  const user = await User.findOne({email:req.body.email})
  if(!user){
    return res.status(400)
  }
  return res.send({credits:user.remainingUses,phoneVerified:user.phoneVerified,customerId:user.customerId})
})

app.post('/getCurrentCsvAmount', async(req,res)=>{
  const doc = await User.findOne({email:req.body.email})
  if(doc){
    return res.send(""+doc.currentcsvs.length);
  }
  else{
    return res.status(400).send("fail")
  } 
})

app.post("/getCurrent", async(req,res)=>{
  const doc = await User.findOne({email:req.body.email})

  const csvlist = doc.currentcsvs
  const returnlist = []
  for (const csve of csvlist) {
    const csvitem = await csv.findById(new mongoose.Types.ObjectId(csve))
    const temp = {id:csve,name:csvitem.name,location:csvitem.location,status:csvitem.status}
    returnlist.push(temp)
  }
  if(returnlist.length===0){
    return res.send(null)
  }
  return res.send(returnlist)
})

app.post("/getFinished", async(req,res)=>{
  const doc = await User.findOne({email:req.body.email})
 
  const csvlist = doc.pastcsvs
  
  const page = parseInt(req.body.page)
 
  const returnlist = []
  for (let i = (page-1)*5;i<((page-1)*5)+5;i++) {
    if(i<csvlist.length){
      const csvitem = await csv.findById(new mongoose.Types.ObjectId(csvlist[i]))
      const temp = {id:csvlist[i],name:csvitem.name,location:csvitem.location,url:csvitem.url,status:csvitem.status}
      returnlist.push(temp)
    }
  }
 
  returnlist.push(csvlist.length)
  return res.send(returnlist)
})

//setup for sending message to rabbitmq
let connection;
let channel;
//connect to the queue
async function setupRabbitMQ(){
  connection = await connect("amqp://admin:password@66.29.131.229:5672")
  channel = await connection.createChannel()
  await channel.assertQueue('tasks',{durable:true,arguments:{'x-queue-type':'classic'}})
}

setupRabbitMQ()

//change it to add item to queue
app.post('/run', async (req,res)=>{
  const doc = await User.findOne({email:req.body.email})
  if(!doc) return res.send("fail")
  if(doc.remainingUses<=0){
    return res.send("fail")
  }
  else{
    const searchTerm = req.body.searchTerm.replace(" /g","+")
    const location = req.body.location.replace(" /g", "+")
    const url = "https://www.google.com/maps/search/"+searchTerm+"+near+"+location
    const newCSV = new csv({
      name:req.body.searchTerm,
      location:req.body.location,
      date:Date.now(),
      status:0,
      url:"",
    })
    await newCSV.save();
    const id = newCSV._id
    await User.findOneAndUpdate(
      { email: req.body.email }, 
      { $push: { currentcsvs: id },remainingUses:doc.remainingUses-1}
    );
    try{
      const queueItem = url+"12%%2552%%12"+id+"12%%2552%%12"+req.body.email
      await channel.sendToQueue('tasks',Buffer.from(queueItem))
    }catch{
      console.log("ok")
      return res.send("ok")
    }
    return res.send("ok")
  }
  //ok so this so far takes in a location string and searchTerm then converts it to the url to send to aws. It creates the csv document and adds the id of the csv to the 
  //User's array of csv ids
  //To Do:
  //
  //Post request to the aws function
  //aws function takes the url, userid and csv id
  //create a function on this server which the aws function sends requests to update the csv document with aws download url and status codes
  //0 means begun, 1 means finding locations on google maps, 2 means scraping emails, 3 means finished
  //create the frontend part that refreshes the status every 10 seconds with a function on the backend when status complete, show the csv with its description
  //and the download button
  //make the aws function use just one fifoqueue with the filename we generate as the groupid, change the ender to reflect these changes
  //make the frontend look nice and work
})
app.post('/finish',async (req,res)=>{
  await csv.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.csvid),{status:5,url:req.body.downloadUrl})
  await User.findOneAndUpdate({email:req.body.email},{$pull:{currentcsvs:req.body.csvid},$push:{pastcsvs:req.body.csvid}})
  return res.send("cool")
})

app.post('/update',async (req,res)=>{
  await csv.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.csvid),{$inc:{status:1}})  
  return res.send("cool")
})

app.post('/refund',async (req,res)=>{
  await csv.findByIdAndUpdate(new mongoose.Types.ObjectId(req.body.csvid),{status:-1,url:"failed"})
  await User.findOneAndUpdate({email:req.body.email},{$pull:{currentcsvs:req.body.csvid},$inc:{remainingUses:1},$push:{pastcsvs:req.body.csvid}})
  console.log("refund")
  return res.send("cool")
})

app.post('/checkout',async (req,res)=>{
  const doc = await User.findOne({email:req.body.email})
  if(parseInt(req.body.amount)===NaN){
    return res.send('fail')
  }
  let price;
  const amount = req.body.amount
  switch (amount){
    case 5:
      price = 'price_1NiqqpE8uhRktaazOVlN6y6X'
      break;
    case 10:
      price = 'price_1NiqqpE8uhRktaazQfS64ajr'
      break;
    case 25:
      price = 'price_1NiqqpE8uhRktaazZ4wVrcL7'
      break;
    case 50:
      price = 'price_1NiqqpE8uhRktaazT4AxBRWz'
      break;
    case 100:
      price = 'price_1NiqqpE8uhRktaaz0obq1Q35'
      break;
    case 200:
      price = 'price_1NiqqpE8uhRktaazeK25x6HP'
      break;
    default:
      price = 'price_1NiqqpE8uhRktaazwQ82F1pd'
  }
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price,
        quantity: amount,
      }
    ],
    customer:doc.customerId,
    mode: 'payment',
    success_url:`${process.env.FRONTEND_URL}`,
    cancel_url: `${process.env.FRONTEND_URL}`
  });
  return res.send(session.url)
})


const endpointSecret = "whsec_JHFWtgLGjm5NlLGEeiipXvl6Tghc89mF";

app.post('/webhook', bodyParser.raw({type: 'application/json'}), async (request, response) => {
  let event;

  try {
    const sig = request.headers['stripe-signature'];
    event = await stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      
      const items = await stripe.checkout.sessions.listLineItems(
        session.id,
      )
     
      const quantity = items.data[0].quantity
     
      await User.findOneAndUpdate({customerId:session.customer},{$inc : {remainingUses:quantity}})
      break;
    // ... handle other event types
    default:
  }
  response.status(200).send("success");
});