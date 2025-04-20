const router=require("express").Router();

const User=require("../models/userModel")

const bcrypt=require("bcryptjs");       // not bcrypt..js


const jwt=require("jsonwebtoken");

const authMiddleware=require("../middlewares/authMiddleware");

router.post("/register",async(req,res)=>{
    try{
        const user= await User.findOne({email:req.body.email});
        if(user){
            throw new Error('User already exists');
        }

        const salt=await bcrypt.genSalt(10);    // 10 rounds
        const hashedPassword=await bcrypt.hash(req.body.password,salt);         
        req.body.password=hashedPassword;

        const newUser=new User(req.body);
        await newUser.save()         
        
        // save user to mongodb

        res.send({
            success:true,
            message:"User created successfully"
        });
    }

    catch(error){
        res.send({
            success:false,
            message:error.message
        })

    }
   
}
)


router.post("/login",async(req,res)=>{
    try{

        const user=await User.findOne({email:req.body.email});

        if(!user){
            throw new Error("User not found")
        }


           
         if(user.status!=="active"){
            throw new Error("The user account is blocked , please contact admin");
         }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
          
         if(!validPassword){  
            throw new Error("Invalid password");           // comparing the password.

         }

         const token=jwt.sign({userId:user._id},process.env.jwt_secret,{expiresIn:"1d"});    // 1 day


         res.send({
            success:true,
            message:"User logged in successfully",
            data:token
         });

    }
    catch(error){
        res.send({
            success:false,
            message:error.message,
        })
    }
})

router.get("/get-current-user",authMiddleware, async(req,res)=>{

    try{
      
const user=await User.findById(req.body.userId);
res.send({
    success:true,
    message:"User fetched successfully",
    data:user,
});

    }
    catch(error){
        res.send({
            success:false,
            message:error.message
        })
    }



})
    
// get all users

router.get("/get-users",authMiddleware,async(req,res)=>{
    try{
        const users=await User.find();
        res.send({
            success:true,
            message:"Users fetched successfully",
            data:users,
        })
    }
    catch(error){
        res.send({
            success:false,
            message:error.message
        })
    }
})


router.put("/update-user-status/:id",authMiddleware,async(req,res)=>{
    try{
          await User.findByIdAndUpdate(req.params.id,req.body);

          res.send({
            success:true,
            message:"User status updated successfully"
          })
    }catch(error){
        res.send({
            success:false,
            message:error.message
        })

    }
})

module.exports=router;