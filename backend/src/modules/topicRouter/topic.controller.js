import { categoryModel } from "../../../DB/models/Category/Category.js";
import { topicModel } from "../../../DB/models/Topic/Topic.js";

export const getByCategoryId = async (req, res) => {
    const { id } = req.params;
    try {
        const topics = await topicModel.findAll({
            where: { categoryId: id },
        });
        if (!topics || topics.length === 0) {
            return res.status(404).json({ message: "No topics found" });
        }
        res.status(200).json({ message: "Topics retrieved successfully", data: topics });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getByCategoryName = async (req, res) => {
    const { name } = req.params;
    try {
        const category = await categoryModel.findOne({
            where: { name: name },
        });
        console.log(category);
        const topics = await topicModel.findAll({
            where: { categoryId: category.id },
        });
        console.log(topics)
        if (!topics || topics.length === 0) {
            return res.status(404).json({ message: "No topics found" });
        }
        res.status(200).json({ message: "Topics retrieved successfully", data: topics });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}