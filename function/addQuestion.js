const {Question}=require('../model')

async function add_question(question_info) {
    try {
        const result = await Question.insertMany({
            user_id: question_info.id,
            question: question_info.question,
            date: question_info.date 
        });
        return result;
    } catch (e) {
        console.log('error in function add question', e.message);
        return;
    }
}

module.exports={add_question};