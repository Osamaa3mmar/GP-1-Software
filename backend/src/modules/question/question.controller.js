import { quizModel } from "../../../DB/models/quizes/Quiz.js";
import { questionModel } from "../../../DB/models/qusetions/Qustion.js";
import { generateQuizQuestion } from "../../utils/ChatGptQuizGenerator.js";


const updateQustionInfo=async(id,qustion)=>{
console.log("object");
    const newQustion=await questionModel.findByPk(id);
    await newQustion.update(qustion);
    return newQustion; 
}

const addNewQustion=async(qustion)=>{
    console.log("object2");
    const newQustion=await questionModel.create(qustion);
    return newQustion;
}


export const saveQustion=async (req,res)=>{
    try{
        const {qustion}=req.body;
        console.log(qustion);
        let newQustion;
        if(qustion?.id){
             newQustion=await updateQustionInfo(qustion.id,qustion);
        }else{
             newQustion=await addNewQustion(qustion);
        }
        return res.status(200).json({message:"success!",newQustion});

    }catch(error){
        return res.status(500).json({message:"Server error ",error})
    }
}



export const getAllByQuizId=async(req,res)=>{
    try{
        const{quizId}=req.params;
        const qustions=await questionModel.findAll({
            where:{quizId}
        })
        const quiz=await quizModel.findByPk(quizId);
        
        console.log(qustions,"osama");
        if(!qustions||!quiz){
            return res.status(400).json({message:"Not Found"})
        }
        return res.status(200).json({message:"success",qustions});
    }catch(error){
        return res.status(500).json({message:"Server error",error})
    }
}




export const deleteQustion = async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await questionModel.destroy({
      where: { id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question deleted successfully",deleted });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


export const generateAIQuestion = async (req, res) => {
  try {
    const { topic, details, difficulty, questionType = 'mcq', count = 1, quizId } = req.body;
    
    console.log('Generate AI Question request:', { topic, difficulty, questionType, count, quizId });
    
    // Validate required fields
    if (!topic || !difficulty || !quizId) {
      return res.status(400).json({ message: "Topic, difficulty, and quizId are required" });
    }
    
    // Check if quiz exists
    const quiz = await quizModel.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    // Generate questions using ChatGPT
    const generatedQuestions = await generateQuizQuestion(topic, details, difficulty, questionType, count);
    
    if (!generatedQuestions) {
      return res.status(500).json({ message: "Failed to generate questions from AI" });
    }
    
    console.log('Generated questions:', JSON.stringify(generatedQuestions, null, 2));
    
    // Handle single or multiple questions
    if (Array.isArray(generatedQuestions)) {
      // Multiple questions case
      const savedQuestions = [];
      
      // Save each question to the database
      for (const question of generatedQuestions) {
        try {
          // Add quiz ID to the question
          question.quizId = quizId;
          
          // Save the question
          const newQuestion = await addNewQustion(question);
          savedQuestions.push(newQuestion);
        } catch (saveError) {
          console.error('Error saving question:', saveError, question);
          // Continue with other questions if one fails
        }
      }
      
      return res.status(200).json({ 
        message: `${savedQuestions.length} questions generated successfully`, 
        questions: savedQuestions 
      });
    } else {
      // Single question case
      try {
        // Add quiz ID to the question
        generatedQuestions.quizId = quizId;
        
        // Save the generated question to the database
        const newQuestion = await addNewQustion(generatedQuestions);
        
        return res.status(200).json({ 
          message: "Question generated successfully", 
          question: newQuestion 
        });
      } catch (saveError) {
        console.error('Error saving question:', saveError, generatedQuestions);
        return res.status(500).json({ message: "Failed to save generated question" });
      }
    }
    
  } catch (error) {
    console.error("Error generating AI question:", error);
    return res.status(500).json({ message: "Failed to generate question", error: error.message });
  }
};
