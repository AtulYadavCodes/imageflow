import mongoose, { Schema } from "mongoose";
const folderschema=new Schema({
    foldername:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})
folderschema.index({ foldername: 1, owner: 1 }, { unique: true });
export const Folder=mongoose.model("Folder",folderschema);