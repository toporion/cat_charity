const UserModel = require("../models/UserModel");
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");

const createUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if (user){
            return res.status(400).json({
                success:false,
                message:"User already exist"
            })
        }
        const blogImage=req.file?req.file.path : null;
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=await UserModel({
            ...req.body,
            blogImage,
            password:hashPassword
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"User successfully created",
            data:newUser
        })

    }catch(error){
        console.log('check controller error',error)
        res.status(500).json({
            
            success:false,
            message:"internal server error"
        })
    }
}
const updateUser=async(req,res)=>{
    try{
        const {name,email,password,role,profileIamge}=req.body;
        const {id}=req.params;
        let updateData={name,email,password,role,profileIamge}
        const blogImage=req.file?req.file.path : null;
        const updateUser=await UserModel.findByIdAndUpdate(
            id,
            updateData,
            blogImage,
            {new:true}
        )
        if(!updateData){
            return res.status(404).json({message:"employee not found"})
        }
        
        res.status(200).json({
             message: "Employee updated successfully",
             success:true,
             data:updateEmployee
             });
        
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=await UserModel({
            ...req.body,
            blogImage,
            password:hashPassword
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"User successfully created",
            data:newUser
        })

    }catch(error){
        console.log('check controller error',error)
        res.status(500).json({
            
            success:false,
            message:"internal server error"
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Received email:", email);
        console.log("Received password:", password);

        const user = await UserModel.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "User not found" });
        }

        console.log("Stored hashed password:", user.password);

        if (!password) {
            console.log("Error: Password is missing in request body!");
            return res.status(400).json({ message: "Password is required" });
        }

        const isMatch = await bcrypt.compare(String(password), user.password);

        if (!isMatch) {
            console.log("Password does not match");
            return res.status(403).json({ message: "Invalid password" });
        }

        const jwtToken = jwt.sign(
            { role: user.role, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Login successful, token generated");

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            user: { name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        console.log("Error in login function:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllUser=async(req,res)=>{
    try{
        const alluser=await UserModel.find({})
        res.status(200).json({
            success:true,
            message:"success",
            data:alluser
        })
    }catch(error){
        console.log('see if error',error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

const getUserById=async(req,res)=>{
    try{
        const {id}=req.params;
 
        const userById=await UserModel.findById({_id:id})
        res.status(201).json({
            message: "Got  User by id successfully",
            data:userById,
            success:true
            });
    }catch(error){
        console.log('see full details', err);
        res.status(500).send({ message: "Internal server error" });

    }
}

const deleteUserById=async(req,res)=>{
    try{
        const {id}=req.params;
        const userDelete=await UserModel.deleteOne({_id:id})
        res.status(201).json({
            message: "delete User by id successfully",
            data:userDelete,
            success:true
            });
    }catch(error){
        console.log('see full details', err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports={
createUser,
userLogin,
getAllUser,
getUserById,
deleteUserById,
updateUser
}