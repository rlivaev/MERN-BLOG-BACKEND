import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique: true
        },
        passwordHash:{
            type: String,
            require:true
        },
        avatarUrl:String
    },
    {
        timestamps:true,
    },
);
export default mongoose.model('User',userSchema);