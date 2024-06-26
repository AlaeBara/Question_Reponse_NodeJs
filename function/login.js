const {User}=require('../model')


async function Auth(FindUser) {
    try {
        const result = await User.findOne({ name: FindUser.username, password: FindUser.password });
        return result;
    } catch (e) {
        console.log('error in function Auth', e.message);
        return;
    }
}


module.exports={Auth};



//version by bcrypt


// const { User } = require('../model');
// const bcrypt = require('bcrypt');

// async function Authby(FindUser) {
//     try {
//         // Find the user by username
//         const user = await User.findOne({ name: FindUser.username });

//         if (!user) {
//             // User not found
//             return null;
//         }

//         // Compare the provided password with the hashed password stored in the database
//         const passwordMatch = await bcrypt.compare(FindUser.password, user.password);

//         if (passwordMatch) {
//             // Passwords match, return the user
//             return user;
//         } else {
//             // Passwords do not match
//             return null;
//         }
//     } catch (e) {
//         console.log('error in function Auth', e.message);
//         return null;
//     }
// }

