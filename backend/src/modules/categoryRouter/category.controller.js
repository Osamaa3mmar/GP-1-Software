import { categoryModel } from "../../../DB/models/Category/Category.js";

export const getAll =async  (req, res) => {
    try{
        const categores=await categoryModel.findAll();
        if(!categores || categores.length === 0){
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json({ message: "Categories retrieved successfully", data: categores });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
