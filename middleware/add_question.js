// => Middleware function for adding a question

const {add_question} = require('../function/addQuestion');

const {User,Question,Response}=require('../model')


const addQuestionMiddleware = async (req, res, next) => {
    try {
      const ID = await User.findOne({ name: req.session.user.email });
      const currentDate = new Date();
      const question_info = {
        id: ID._id,
        question: req.body.question,
        date: currentDate,
      };
      const messages = await add_question(question_info);
      console.log(messages);
  
      // If adding a question is successful, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.log('Error in adding question:', error.message);
      res.status(500).send('Error in adding question.');
    }
};

module.exports={addQuestionMiddleware}