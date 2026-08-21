import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import {ADMIN_PASSWORD,ADMIN_EMAIL,JWT_SECRET} from ''

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// userlogin
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist " })
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)

          return  res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Please enter valid password" })
        }

    }
     catch (error) {
        console.log(error)
        res.json({
            success: false,
            message:error.message
        });
    }
}


// registerUser
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // chk user exit or not
        const exists = await userModel.findOne({ email })
        if (exists) {

            return res.json({ success: false, message: "User already exist" })
        }

        // validating email and pswd
        if (!validator.isEmail(email)) {

            return res.json({ success: false, massage: "Please enter valid email" })
        }
        if (!password || password.length < 8) {

            return res.json({ success: false, message: "Password must be at least 8 characters long" })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })


    }
    catch (error) {
        console.log(error)
        res.json({
            success: false,
            message:error.message
        });
    }
}

// adminlogin
const adminlogin = async (req, res) => {

    try {
        
        const {email,password}=req.body;

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){

            const token= jwt.sign(email+password,process.env.JWT_SECRET)
           return res.json({success:true,token})

        } else{
           return res.json({success:false,message:"Invalid credentials"})
        }


    } catch (error) {
        
        console.log(error)
        res.json({
            success: false,
            message:error.message
        });
        
    }

 }


export { loginUser, registerUser, adminlogin }