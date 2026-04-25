import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const fileschema=new Schema({
    filekey:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    filesize:{
        type:Number,
        required:true
    }, 
    folder:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Folder",
    },
    filelink:{
        type: String , //url cloudinary
        required:true
    }
},{
    timestamps:true
})
fileschema.plugin(mongooseAggregatePaginate);
export const File=mongoose.model("File",fileschema);