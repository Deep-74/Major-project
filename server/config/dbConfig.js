const mongoose=require('mongoose')
mongoose.connect(process.env.mongo_url)   // for security purpose

const connection=mongoose.connection

connection.on('connected',()=>{
console.log('Mongodb  Connection Successfull')    
})

connection.on('error' ,(err)=>{
    console.log('Mongodb  Connection Successfull')    
    })



    module.exports=connection;