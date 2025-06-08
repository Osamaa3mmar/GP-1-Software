import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { rateModel } from "../../../DB/models/Rate/Rate.js";

export const chackIsRate = async (req, res) => {
    try{
        const {user}=req.body;
        const { courseId } = req.query;
        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }
        const rate = await rateModel.findOne({

            where: {
                userId: user.id,
                courseId: courseId
            }
        });
        if (rate) {
            return res.status(200).json({ hasRated: true, rating: rate.rating });
        } else {
            return res.status(200).json({ hasRated: false });
        }
    }catch(err){
        console.error("Error checking if user has rated the course:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const rateCourse = async (req, res) => {
    // try {
        const { user } = req.body;
        const { courseId, rating } = req.body;
        if (!courseId || !rating) {
            return res.status(400).json({ error: "Course ID and rating are required" });
        }
        
        const [rate, created] = await rateModel.findOrCreate({
            where: {
                userId: user.id,
                courseId: courseId
            },
            defaults: {
                rating: rating
            }
        });
        
        if (!created) {
            rate.rating = rating;
            await rate.save();
        }
        const course=await courseModel.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        course.numberRating += 1;
        course.rating += rating;
        console.log(rating,"osama58");
        await course.save();
        console.log(rating,"osama60");
        return res.status(200).json({ message: "Rating submitted successfully", rating: rate.rating,course });
    // } catch (err) {
        console.error("Error submitting course rating:", err);
        return res.status(500).json({ error: "Internal server error" });
    // }
}
    