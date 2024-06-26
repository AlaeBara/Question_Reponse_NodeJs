const {User}=require('../model')
const mongoose = require('mongoose');

async function signUp(userToAdd) {
    try {
        const result = await User.insertMany({name: userToAdd.username, password: userToAdd.password });
        return result;
    } catch (e) {
        console.log('error in function Auth', e.message);
        return [];
    }
}

module.exports={signUp};



//version hash password 

// const { User } = require('../model');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// async function signUpby(userToAdd) {
//     try {
//         // Hash the user's password before storing it
//         const hashedPassword = await bcrypt.hash(userToAdd.password, 10); // 10 is the saltRounds

//         // Create a new user with the hashed password
//         const newUser = new User({
//             name: userToAdd.username,
//             password: hashedPassword
//         });

//         // Save the user to the database
//         const result = await newUser.save();
//         return result;
//     } catch (e) {
//         console.log('error in function Auth', e.message);
//         return [];
//     }
// }

