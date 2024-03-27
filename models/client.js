const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs")


//preparing schema
const ClientSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
})

//hashing password before saving
ClientSchema.pre('save',async function (next){
    const client=this
    if(client.isModified('password')){
        client.password = await bcyrpt.hash(client.password,10);
    }
    next();
})

const Client = mongoose.model('Client',ClientSchema);
module.exports=Client;