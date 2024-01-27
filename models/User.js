const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please provide your name'],
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please provide your email address'],
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
},{timestamps:true})

mongoose.models={}
export default mongoose.model('UserAnywear',userSchema)
// export default mongoose.models.UserAnywear || mongoose.model('UserAnywear',userSchema)

// const user = new mongoose.model('User',userSchema)
// export default user;