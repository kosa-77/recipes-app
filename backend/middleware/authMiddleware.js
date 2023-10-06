import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req,res,next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            let token = req.headers.authorization.split(' ')[1];

            if(token) {   
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = await User.findById(decoded.id).select('-password')
                next();
            } else {
                res.status(401).json('Not authorized, no token')
                throw new Error('Not authorized, no token')
            }
        }
    } catch (e){
        console.log(e)
        res.status(401).json('Not authorized')
        throw new Error('Not authorized')
    }
}

export default protect