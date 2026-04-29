import mongoose from 'mongoose';
const connectDB=(async()=>{
    try{
        const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB connected: ${connectioninstance.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
})
export default connectDB;