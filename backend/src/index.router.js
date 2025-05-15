import { connectDB } from '../DB/Connection.js';
import authRouter from './modules/authRouter/auth.router.js';
import userRouter from './modules/userRouter/user.router.js';
import courseRouter from './modules/courseRouter/course.router.js';
import orgRouter from './modules/OrgRouter/org.router.js';
import enrollRouter from './modules/EnrollmentsRouter/Enrollments.router.js';
import aiRouter from './modules/Ai/ai.router.js';
import applyeRouter from './modules/applyeRouter/applye.router.js';
import notificationsRouter from './modules/Notification/Notification.router.js'
import { cartCourseModel } from '../DB/models/CartCourseModel/CartCourse.model.js';
import { cartModel } from '../DB/models/Cart/Cart.model.js';
import { categoryModel } from '../DB/models/Category/Category.js';
import { lessonSectionModel } from '../DB/models/Section/Section.modal.js';
import { quizSubmissionModel } from '../DB/models/Submissions/submissions.js';
import { couponModel } from '../DB/models/copun/Coupon.model.js';
import { lessonModel } from '../DB/models/Lessons/Lesson.js';
import { quizModel } from '../DB/models/quizes/Quiz.js';
import { questionModel } from '../DB/models/qusetions/Qustion.js';
import { topicModel } from '../DB/models/Topic/Topic.js';
export const initApp=(app,express)=>{
    //here put use statment
    connectDB();
    app.use("/auth",authRouter);
    app.use('/user',userRouter);
    app.use('/course',courseRouter);
    app.use("/org",orgRouter);
    app.use("/enrollments",enrollRouter);
    app.use("/ai",aiRouter);
    app.use("/notifications",notificationsRouter);
    app.use("/qustion",questionModel);
    app.use("/quiz",quizModel);
    app.use("/lesson",lessonModel);
    app.use("/copun",couponModel);
    app.use("/submissions",quizSubmissionModel);
    app.use("/sections",lessonSectionModel);
    app.use("/category",categoryModel);
    app.use("/cart",cartModel);
    app.use("/cartcourse",cartCourseModel);
    app.use("/topics",topicModel);
}
