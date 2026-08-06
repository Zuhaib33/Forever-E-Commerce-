import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// userlogin
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            res.json({ success: false, message: "User does not exist" })
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Please enter valid password" })
        }

    }
    catch (error) {
        console.log(error)
        res.json({
            success: true,
            token
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

            return res.json({ success: false, massage: "user already exist" })
        }

        // validating email and pswd
        if (!validator.isEmail(email)) {

            return res.json({ success: false, massage: "Please enter valid email" })
        }
        if (!password || password.length < 8) {

            return res.json({ success: false, massage: "Password must be at least 8 characters long" })
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
            success: true,
            token
        });
    }
}

// adminlogin
const adminlogin = async (req, res) => { }


export { loginUser, registerUser, adminlogin }