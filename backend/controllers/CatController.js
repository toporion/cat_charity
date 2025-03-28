const ModelCat = require("../models/CatModel");


const createCat = async (req, res) => {
    try {
        const catdata = req.body;
        const files = req.files; // Use req.files instead of req.file

        const profileImage = files.profileImage ? files.profileImage[0].path : null;
        const medicalHistoryFile = files.medicalHistoryFile ? files.medicalHistoryFile[0].path : null;

        const newCat = new ModelCat({
            ...catdata,
            profileImage,
            medicalHistoryFile
        });

        await newCat.save();

        res.status(200).json({
            success: true,
            message: "Successfully created cat profile",
            data: newCat
        });
    } catch (error) {
        console.error('see cat error', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const updateById=async(req,res)=>{
    try{
        const {id}=req.params;
        let updateData=req.body;

         // Handle profileImage if uploaded
         if (req.file) {
            updateData.profileImage = req.file.path;
        }
        const updateCat=await ModelCat.findByIdAndUpdate(
            id,
            updateData,
            {new:true}
        )
        res.status(200).json({
            success:true,
            message:"successfully created cat profile",
            data:updateCat
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
const deleteCat=async(req,res)=>{
    try{

        const{id}=req.params;
        const catDelete=await ModelCat.deleteOne({_id:id})
        res.status(200).json({
            success:true,
            message:"successfully delete by cat",
            data:catDelete
        })
    }catch(error){
        console.log("see if any error",error)
        res.status(500).json({
            success:true,
            message:"internal server problem"
        })
    }
}

const getCatById=async(req,res)=>{
    try{
        const {id}=req.params;
        const getCat=await ModelCat.findById(id)
        res.status(200).json({
            success:true,
            message:"successfully get by id",
            getCat
        })
    }catch(error){
        console.log("see if any error",error)
        res.status(500).json({
            success:true,
            message:"internal server problem"
        })
    }
}

module.exports={createCat,getAllCats,deleteCat,getCatById,updateById};