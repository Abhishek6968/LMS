const mongoose=require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.mongoDB_URL)
.then(()=>{
    console.log('connected to database')
})
.catch(()=>{
    console.log('error connecting to database')
})