const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password, username, phone, role } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, You can Login', success: false });

        }

        const userModel = new UserModel({ name, email, password, username, phone })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup Success",
                success: true
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "Either username or email already exists",
                success: false
            })
    }
}




const login = async (req, res) => {
    try {
        const { name, email, password, username, phone } = req.body;
        const user = await UserModel.findOne({ email });
        const errmsg = 'Auth Failed, Wrong Email or Password';
        if (!user) {
            return res.status(403)
                .json({ message: errmsg, success: false });

        }
        const isPassequal = await bcrypt.compare(password, user.password);
        if(!isPassequal){
            return res.status(403)
                .json({ message: errmsg, success: false });
        }

        const jwttoken = jwt.sign({email:user.email, _id:user._id},
            process.env.JWT_SECRET, 
            {expiresIn: '24h'}
        )
        res.status(200)
            .json({
                message: "Login Successfully",
                success: true,
                jwttoken,
                email,
                name:user.name
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "Internal server Error",
                success: false
            })
    }
}


module.exports = {
    signup,
    login
}