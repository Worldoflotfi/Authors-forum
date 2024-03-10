const express= require('express')
require('dotenv').config()
const app= express()
const mainRoute= require("./routes/main")
const adminRoute=require("./routes/admin")
const methodOverride=require('method-override')
const {connectDB}=require('./config/db')
const coookieParser=require('cookie-parser')
const MongoStore = require('connect-mongo')
const session = require('express-session');



// connect to DB

connectDB();
app.use(express.urlencoded({extended:true }));
app.use(express.json())
app.use(coookieParser());
app.use(methodOverride('_method'))

app.use(session({
    secret: 'medaminelt',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    cookie: { maxAge: new Date(Date.now() + 3600000) } 
  }));
app.use(express.static('public'))

//middleware



app.use('/',mainRoute)
app.use('',adminRoute)

app.listen('3001',()=>{
    console.log("Server is running on port 3001")

})