const ModelCat = require("../models/CatModel");


const createCat=async(req,res)=>{
    try{
        const catdata=req.body;
        const profileImage=req.file ? req.file.path :null;
        const newcat=await ModelCat({
            ...catdata,
            profileImage
        })
        await newcat.save()
        res.status(200).json({
            success:true,
            message:"successfully created cat profile",
            data:newcat
        })
    }catch(error){
        console.log('see cat error',error)
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

const getAllCats=async(req,res)=>{
    try{
        
        const allCats=await ModelCat.find({})
        res.status(200).json({
            success:true,
            message:"successfully get all cats",
            data:allCats
        })
    }catch(error){
        console.log('see if any error',error)
        res.status(500).json({
            success:true,
            message:"Internal server error"
        })
    }
}

module.exports={createCat,getAllCats};