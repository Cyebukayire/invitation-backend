const mongoose = require("mongoose");
const connectToDB = async()=>{
const connect = await mongoose.connect(process.env.MONGO_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true

});
console.log(`Mongodb connected: ${connect.connection.host} ....`)
}
connectToDB();
