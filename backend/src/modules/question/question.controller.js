import { nanoid } from 'nanoid'; // or any ID generator
import { quizModel } from "../../../DB/models/quizes/Quiz.js";
import { questionModel } from "../../../DB/models/qusetions/Qustion.js";
import { generateQuizQuestion } from "../../utils/ChatGptQuizGenerator.js";


const updateQustionInfo=async(id,qustion)=>{
    const newQustion=await questionModel.findByPk(id);
    await newQustion.update(qustion);
    return newQustion; 
}

const addNewQustion=async(qustion)=>{
    const newQustion=await questionModel.create(qustion);
    return newQustion;
}


export const saveQustion=async (req,res)=>{
    try{
        const {qustion}=req.body;
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

    if (!topic || !difficulty || !quizId) {
      return res.status(400).json({ message: "Topic, difficulty, and quizId are required" });
    }

    const quiz = await quizModel.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const generatedQuestions = await generateQuizQuestion(topic, details, difficulty, questionType, count);

    if (!generatedQuestions) {
      return res.status(500).json({ message: "Failed to generate questions from AI" });
    }

    console.log('Generated questions:', JSON.stringify(generatedQuestions, null, 2));

    const normalize = (val) => {
      if (typeof val === 'string') {
        const trimmed = val.trim().toLowerCase();
        console.log(trimmed, "trimmed");
        if (trimmed === 'true' || trimmed === 'false') return trimmed;
        return val.trim();
      }
      return val;
    };

    const formatOptions = (question) => {
      const formattedOptions = (question.options || []).map(opt => {
        const text = typeof opt === 'string' ? opt : opt.text;
        return {
          id: Date.now() + Math.floor(Math.random() * 1000),
          text: normalize(text),
        };
      });

      const correct = formattedOptions.find(opt =>
        opt.text.toLowerCase() === normalize(question.correctAnswer || '').toLowerCase()
      );

      return {
        options: formattedOptions,
        correctAnswerId: correct ? correct.id : null
      };
    };

    const processQuestion = async (questionObj) => {
      questionObj.quizId = quizId;
      console.log(questionObj,"osama");
      const { options, correctAnswerId } = formatOptions(questionObj);
      questionObj.options = options;
      if(questionObj.type=='true_false'){
        questionObj.correctAnswer = questionObj.correctAnswer === 'True' ? 'true' : 'false';

      }
      else if(questionObj.type=="mcq"){
      questionObj.correctAnswer = correctAnswerId?correctAnswerId:questionObj.correctAnswer ;
      }
      else{
        questionObj.type = "fill_blank";
      }
      const newQuestion = await addNewQustion(questionObj);
      return newQuestion;
    };

    if (Array.isArray(generatedQuestions)) {
      const savedQuestions = [];

      for (const question of generatedQuestions) {
        try {
          const saved = await processQuestion(question);
          savedQuestions.push(saved);
        } catch (error) {
          console.error("Failed to save one question:", error);
        }
      }

      return res.status(200).json({
        message: `${savedQuestions.length} questions generated successfully`,
        questions: savedQuestions
      });
    } else {
      try {
        const saved = await processQuestion(generatedQuestions);
        return res.status(200).json({
          message: "Question generated successfully",
          question: saved
        });
      } catch (error) {
        console.error("Failed to save question:", error);
        return res.status(500).json({ message: "Failed to save generated question" });
      }
    }

  } catch (error) {
    console.error("Error generating AI question:", error);
    return res.status(500).json({ message: "Failed to generate question", error: error.message });
  }
};




