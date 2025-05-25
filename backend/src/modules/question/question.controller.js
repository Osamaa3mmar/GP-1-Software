import { quizModel } from "../../../DB/models/quizes/Quiz.js";
import { questionModel } from "../../../DB/models/qusetions/Qustion.js";


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
