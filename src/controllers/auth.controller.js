const userModel = require('../models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
async function register(req,res){
    try {
        const {name,email,password,role}=req.body;
        const existingUser=await userModel.findOne({$or:[{email},{name}]}
        ); 
        if(existingUser){
            return res.status(400).json({message:"User with this email already exists"});
        }
        const hash=await bcrypt.hash(password,10);
        const user=await userModel.create({name,
            email,
            password:hash,
        role:role||"user"
    });
    const token=jsonwebtoken.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token)
        res.status(201).json({message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            
            
         });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message:"Internal server error"});
    }
}
async function login(req,res){
    const{name,email,password}=req.body;
    const user = await userModel.findOne({ $or: [{ name }, { email }] });

    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const token=jsonwebtoken.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token)
        res.status(200).json({message:"Login successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            
            
         });
        
}
 async function logout(req,res){
            res.clearCookie("token");
            res.status(200).json({message:"Logout successful"});
         }
module.exports={register,login,logout};     