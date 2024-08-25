const express=require('express')
const connectDB=require('./db')
const NgoSchema=require('./modals/Schema')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors())

app.get('/',async(req,res)=>{
    const data= await NgoSchema.find()
   return res.json({items:data})
})


connectDB()

app.listen(5001, ()=>{
    console.log("server is running")
})

