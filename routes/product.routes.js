const express = require("express");
const { ProductModel } = require("../model/product.model");
const prodRoute = express.Router();

prodRoute.get("/", async (req, res) => {
    try {        
        let data=await ProductModel.find()
    res.send(data)
    } catch (error) {
        res.send(error)
    }
});

prodRoute.post("/addproduct", async (req, res) => {
    const payload=req.body
    //console.log(payload)
    try {
        let data=new ProductModel(payload)
        await data.save()
        res.send('Data saved successfully')
    } catch (error) {
        res.send({ msg: "Data is not saved ", error: error.message });
    }
  
});
prodRoute.patch("/updateproduct/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const data=await ProductModel.findOne({"_id":id})
    let data_userID=data.userID
    const userID_making_req=req.body.userID
    
    //console.log(userID_making_req);
try {
    if(data_userID==userID_making_req){
        let data=await ProductModel.findByIdAndUpdate({"_id":id},payload)
        res.send("Data is Updated successfully")
    }
    else{
        res.send("You have not Authority")
    }
} catch (error) {
    res.send({"msg":"Data is not Updated","error":error})
}

})
prodRoute.delete("/deleteproduct/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const data=await ProductModel.findOne({"_id":id})
    let data_userID=data.userID
    const userID_making_req=req.body.userID
try {
    if(data_userID==userID_making_req){
        let data=await ProductModel.findByIdAndDelete({"_id":id})
        res.send("Data is Deleted")
    }
    else{
        res.send("You have not Authority")
    }

} catch (error) {
    res.send({"msg":"Data is Not Deleted","error":error})
}
})

module.exports = {
  prodRoute,
};
