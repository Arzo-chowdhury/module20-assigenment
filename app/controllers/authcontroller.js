

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User Registration
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: 'user already exists' });
        }

        //create new user
        const user = new User ({ username, email, password});
        await user.save();
        
        //Generate Token
        const user = jwt.sign({ id: user._id, } process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.status(201).json({ token, user: { id: user._id, username, email}});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//user Login

