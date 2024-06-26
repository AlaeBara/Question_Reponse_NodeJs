// => Middleware function login: 


const {Auth} = require('../function/login');

const authenticateUser = async (req, res, next) => {
    try {
      const FindUser = {
        username: req.body.email,
        password: req.body.password,
      };

      const messages = await Auth(FindUser);

      if (messages !== null && messages) {
        req.session.user = { email: req.body.email };
        next();
      } else {
        res.render("login", { messages: "Email or password wrong" });
      }
    } catch (error) {
      console.log('Error during authentication:', error.message);
      res.status(500).send('Internal Server Error');
    }
};

module.exports={authenticateUser}