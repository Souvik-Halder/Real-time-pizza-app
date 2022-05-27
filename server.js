require('dotenv').config();//for using env files
const express =require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const PORT=process.env.PORT || 3000;
const expresslayout=require('express-ejs-layouts');
const mongoose=require('mongoose');
const session=require('express-session');
const flash=require('express-flash');
var MongoDBStore = require('connect-mongodb-session')(session);


//Database connection
const url='mongodb://localhost/pizza';
mongoose.connect(url)

.then(()=>{
    console.log("Connection is Successful");
})
.catch((err)=>{
    console.log(err);
});
const connection=mongoose.connect;

//Session Stire
let mongoStore=new MongoDBStore({
    uri:url,
    collection:'sessions'
});

//Session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
   store:mongoStore,
    cookie:{maxAge:1000*60*60*24} // 24 hours
    
}))

app.use(flash()); //for flash this function is called cookie session related
//Assests 


app.use(express.static('public'));
app.use(express.json());

//Global middleware
app.use((req,res,next)=>{
     res.locals.session=req.session;
     next()
})

//set template engine
app.use(expresslayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


 require('./routes/web')(app)//This is just a function call.
    
   
app.listen(PORT,()=>{
    console.log(`Listening on the port ${PORT}`);
})