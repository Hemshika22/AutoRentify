
import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Car from "../models/Car.js";

// generate jwt token
const generateToken = (id) => {
    const payload = { userId: id};
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"})
}


// register user
export const registerUser = async(req, res)=> {
 try {
       const {name, email, password} = req.body

      if (!name || !email || !password) {
  return res.json({ success: false, message: "All fields are required" });
}

if (password.length < 8) {
  return res.json({ success: false, message: "Password must be at least 8 characters long" });
}


       const userExists = await User.findOne({email})

       if(userExists) {
        return res.json({success: false, message: "User already exists"});
       }

       const hashedPassword = await bcrypt.hash(password, 10);
       const user = await User.create({name, email, password: hashedPassword})
       const token =generateToken(user._id.toString())
       res.json({success: true, token})


 } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: "Fill all the fields"})
    
   }
}

// login useer
export const loginUser = async(req, res)=> {
      try {
            const { email, password} = req.body
            const user = await User.findOne({email})

            if(!user) {
                  return res.json({ success: false, message: "User does not exist"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                  return res.json({ success: false, message: "Incorrect Credentials"})
            }

             const token = generateToken(user._id.toString())
              res.json({success: true, token})

            }
      
      catch(error) {
              console.log(error.message);
            res.json({ success: false, message: "Fill all the fields"})
      }
}

// get user data using token (JWT)
export const getUserData = async(req, res) => {
      try {
          const { user } = req;
          res.json({success: true, user})
      }
      catch(error) {
        console.log(error.message);
        res.json({ success: false, message: error.message})
      }
}

//get all cars for the frontend
export const getCars = async(req, res) => {
      try {
          const cars = await Car.find({isAvailable: true}); 
          res.json({success: true, cars})
      }
      catch(error) {
        console.log(error.message);
        res.json({ success: false, message: error.message})
      }
}