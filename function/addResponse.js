const {Response}=require('../model')

async function add_reponse(reponse_info) {
    try {
        const result = await Response.insertMany({
            user_id:reponse_info.user_id ,
            question_id: reponse_info.question_id,
            response: reponse_info.response,
            date: reponse_info.date
        });
        return result;
    } catch (e) {
        console.log('error in function add reponse', e.message);
        return;
    }
}


module.exports={add_reponse};