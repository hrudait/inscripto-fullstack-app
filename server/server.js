require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') 
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const User = require('./user');
const csv = require('./csv');
const user = require('./user');
const app = express();
const stripe = require('stripe')('sk_test_51IbtU4E8uhRktaazSuaLHtFdvqe1zQ2dXwmnci8Uzdj1HuT6aEMcmRAOGXOHu6AVAVgxuuQEpU5gRYFLnUGaPeUe00rTM9vVfX')


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
  optionsSuccessStatus: 200,
  credentials:true

}))
app.use('/webhook', bodyParser.raw({type: "*/*"}))
app.use(bodyParser.json({type: 'application/json'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret:"UzLz!sJym8Zt@3XP",
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser("UzLz!sJym8Zt@3XP"))

app.post("/login" , async (req,res)=>{
  const doc = await User.findOne({username: req.body.username})
  if(!doc) {
    res.send("DNE")
  }else{
    const check = await bcrypt.compare(req.body.password,doc.password)
    if(!check){
      res.send("wrong")
    }else{
      res.send(await jwt.sign(req.body.username,"UzLz!sJym8Zt@3XP"))
    }
  }
})
app.post("/register" , async (req,res)=>{
  const doc = await User.findOne({email: req.body.email})
  if(doc) res.send("Email already in use")
  const d = await User.findOne({username: req.body.username})
  if(d) res.send("Choose a different username")
  if(!d){
    const newUser = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password,10),
      email: req.body.email,
      remainingUses: 0,
      startDate: -1,
      emailVerified: false,
      subscription: null,
    })
    await newUser.save()
    res.send("/login")
  }
})
app.get("/auth", async(req,res)=>{
  try{
    const username = jwt.verify(req.headers.authorization,"UzLz!sJym8Zt@3XP")
    const user = await User.exists({username:username})
    if(!user){
      res.status(400)
      res.send("invalid token") 
    }else{
      res.status(200).send(username)
    }
  }catch(e){ 
    res.status(400)
    res.send("invalid token") 
  }
})
app.post('/run', async (req,res)=>{
  const doc = User.findOne({username:req.body.username})
  if(doc.remainingUses<=0){
    res.send("fail")
  }
  else{
    const searchTerm = req.body.searchTerm.replaceAll(" ","+")
    const location = req.body.location.replaceAll(" ", "+")
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
    User.findOneAndUpdate(
      { username: req.body.username }, 
      { $push: { csvs: id },remainingUses:doc.remainingUses-1},
      done
    );
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
app.post('/update',async (req,res)=>{
  csv.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.csvid),{status:1,url:"https://csv-storages.s3.us-east-2.amazonaws.com/"+req.body.csvid+".csv"})
})

app.post('/create-checkout-session', async (req, res) => {
  
  const doc = await User.findOne({username:req.body.username})
  if(!doc) res.status(303).redirect("/signout")
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1N7OQsE8uhRktaazD5RevTmF',
        quantity: 1,
      },
    ],
    customer_email:doc.email,
    mode: 'subscription',
    subscription_data:{
      metadata:{"username":req.body.username}
    },
    success_url: process.env.FRONTEND_URL,
    cancel_url: process.env.FRONTEND_URL+'/false',
  });

  res.send(session.url);
});

const endpointSecret = "whsec_70457b6e7d763216d551ad0837c1145d1e9f7bda2777d792dcd03cd6246c67d5";

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
    case 'invoice.paid':
      const invoicePaymentSucceeded = event.data.object;
      const subscription = await stripe.subscriptions.retrieve(invoicePaymentSucceeded.subscription)
      if(subscription.status==="active"){
        await User.findOneAndUpdate({username:subscription.metadata.username},{remainingUses:20,subscription:subscription.id})
      }

      break;
    // ... handle other event types
    default:
  }
  response.send();
});