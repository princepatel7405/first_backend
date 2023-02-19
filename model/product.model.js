const mongoose=require("mongoose")

 const productSchema=mongoose.Schema({
    Company_name:String,
    HP:Number,
    rpm:Number,
    price:Number,
    Image:String,
    userID:String
 })

 const ProductModel=mongoose.model("product",productSchema)

 module.exports={
    ProductModel
 }