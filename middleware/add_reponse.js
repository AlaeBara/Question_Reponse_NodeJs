// => Middleware function for adding a response

const {add_reponse} = require('../function/addResponse');
const {User,Question,Response}=require('../model')

const addResponseMiddleware = async (req, res, next) => {
    try {
      const currentDate = new Date();
      const ID = await Question.findOne({ _id: req.params.id_question });
      const reponse_info = {
        user_id: ID.user_id,
        question_id: req.params.id_question,
        response: req.body.reponse,
        date: currentDate,
      };
      await add_reponse(reponse_info);
  
      // If adding a response is successful, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.log('Error in adding response:', error.message);
      res.status(500).send('Error in adding response.');
    }
};


module.exports={addResponseMiddleware}