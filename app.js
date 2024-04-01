const express=require('express')
const app=express()
const {connectMongoDb}=require('./database');
const userrouter=require('./routes/routes')
require('dotenv').config();
app.use(express.json());
const PORT=process.env.PORT;


connectMongoDb(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connectedd");
})
app.get('/',(req,res)=>{
    res.send('hi i am live')
})

app.listen(PORT, () => console.log("hi"));

app.use("/api/events",userrouter);
