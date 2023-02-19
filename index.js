const express=require("express")
const { connection } = require("./db")
const { authorize } = require("./middlewares/authorize.middleware")
const { prodRoute } = require("./routes/product.routes")
const { userRoute } = require("./routes/user.routes")
const cors=require("cors")
require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use("/login",userRoute)
app.use(authorize)
app.use("/product",prodRoute)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Database is Connected");
        console.log(`Server is running on port ${process.env.PORT}`);
        
    } catch (error) {
        console.log(error);
    }
})