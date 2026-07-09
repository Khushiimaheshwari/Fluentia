import { upsertStreamUser } from '../lib/stream.js'; 
import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * User Signup Controller
 * Handles new user registration with validation, avatar assignment, 
 * saving to database, creating a Stream user, and JWT cookie creation
 */
export async function signup(req, res){ 
    const {email,password,fullName}= req.body

    try{ 
        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length <6){
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Invalid email format"});
        }

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists, please use a different email"});
        }

        const idx = Math.floor(Math.random() * 100)+ 1; 
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            email,
            fullName,
            password, // Assuming password hashing is handled in User model middleware
            profilePic: randomAvatar,

        });

        // Create user in Stream (for chat/video)
        try{
            await upsertStreamUser({
               id:newUser._id.toString(),
               name: newUser.fullName,
               image: newUser.profilePic || "",
            });
            console.log(`Stream User created for ${newUser.fullName}`);
        }catch(error){
            console.log("Error creating Stream user", error);
        }
        
        // Generate JWT token for authentication
        const token= jwt.sign({ userId: newUser._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });

        // Set JWT in HTTP-only cookie (secure in production)
        res.cookie("jwt",token, {
            maxAge: 7 *24 * 60 *60 *1000,
            httpOnly: true,
            sameSite: "none", 
            secure: process.env.NODE_ENV === "production"
        });

        res.status(201).json({success:true, user:newUser})

    }catch(error){
        console.log("Error in signup controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}



/**
 * User Login Controller
 * Authenticates user by email & password, then generates a JWT cookie
 */
export async function login(req, res){
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required"});
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid Email or Password"});
        }

        const isPasswordCorrect = await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(401).json({message: "Invalid email or password"});


        // Generate JWT token
        const token= jwt.sign({ userId:user._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });

        // Store token in secure cookie
        res.cookie("jwt",token, {
            maxAge: 7 *24 * 60 *60 *1000,
            httpOnly: true, 
            sameSite: "none", 
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({success: true, user});

    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal Server Error"});

    }
}


/**
 * Logout Controller
 * Clears JWT cookie from client
 */
export async function logout(req, res){
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({success: true, message: "Logout Successfully!!"});
}


/**
 * User Onboarding Controller
 * Updates user profile with extra onboarding details after signup
 */
export async function onboard(req, res){
    try{

         // Extract logged-in user details from middleware
        const userId = req.user._id
        const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body

        // Validate presence of all onboarding fields
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({message: "All fiels are required", 
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean),
            });
        }

        // Update user details in DB and mark onboarding as complete
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true,
        }, {new:true})

        if(!updatedUser){
            return res.status(404).json({message: "User not found"})
        }

        // Sync updated info with Stream
        try{
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            })
            console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);

        }catch(streamError){
            console.log("Error updating Stream user during onboarding:", streamError.message);

        }
        res.status(200).json({success:true, user:updatedUser});
    }catch(error){
        console.error("Onboarding error:", error);
        res.status(500).json({message: "Internal Server Error"});

    }
    
}
