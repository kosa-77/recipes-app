import User from '../models/User.js'
import createJWT from '../auth/createJWT.js'
import bcrypt from 'bcrypt'

const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            res.status(400)
            throw new Error('Please add all required fields')
        }
        const userExists = await User.findOne({email})
        if(userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const registeredUser = await User.create({
            name,
            email,
            password: hashedPassword
        })  
        if(registeredUser) {
            res.status(201).json({
                _id: registeredUser._id,
                name: registeredUser.name,
                email: registeredUser.email,
                token: createJWT(registeredUser._id)
            })
        } else {
            res.status(400)
            throw new Error("Error while creating the user")
        }
    } catch (e) {
        console.log(e);
    }
}

const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body
        
        const user = await User.findOne({email})

        const passwordCheck = await bcrypt.compare(password, user.password)

        if(user && passwordCheck) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: createJWT(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    } catch (e) {
        console.log(e)
    }
}

export {
    registerUser,
    loginUser
}