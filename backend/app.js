const express=require('express');
const app=express();
app.use(express.json());

const cors=require('cors');
const morgan=require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
app.use(cors());
const PORT=process.env.PORT
require('./db/connection');
// Import routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);
const authRoutes=require('./routes/authRoutes');
app.use('/api/auth', authRoutes);  // Authentication routes
const mentorRoutes=require('./routes/mentorRoutes');
app.use('/mentor',mentorRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})