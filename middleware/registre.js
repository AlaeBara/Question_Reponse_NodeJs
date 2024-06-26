// => Middleware function registre: 

const {signUp} = require('../function/sign');
const {User,Question,Response}=require('../model')

const signUpMiddleware = async (req, res, next) => {
    try {
      // Check if the email exists
      const existingUser = await User.findOne({ name: req.body.email });
      if (existingUser) {
        return res.render("registre", { messages: "This Email is already in use." });
      } else if (req.body.password !== req.body.Confirme_password) {
        return res.render("registre", { messages: "Passwords do NOT match" });
      } else {
        const userToAdd = {
          username: req.body.email,
          password: req.body.password,
        };
        await signUp(userToAdd);
        // If signup is successful, proceed to the next middleware or route handler
        next();
      }
    } catch (error) {
      console.log('Error during sign up:', error.message);
      return res.status(500).send("Error during sign up.");
    }
};

module.exports={signUpMiddleware}