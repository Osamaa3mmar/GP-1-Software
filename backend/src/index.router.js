import { connectDB } from '../DB/Connection.js';
import authRouter from './modules/authRouter/auth.router.js';
import userRouter from './modules/userRouter/user.router.js';
import courseRouter from './modules/courseRouter/course.router.js';
import orgRouter from './modules/OrgRouter/org.router.js';
import enrollRouter from './modules/EnrollmentsRouter/Enrollments.router.js';
import aiRouter from './modules/Ai/ai.router.js';
import applyeRouter from './modules/applyeRouter/applye.router.js';
import notificationsRouter from './modules/Notification/Notification.router.js'
import questionRouter from './modules/question/question.router.js';
import quizRouter from './modules/quizRouter/quiz.router.js';
import lessonRouter from './modules/lessonRouter/lesson.router.js';
import couponRouter from './modules/couponRouter/coupon.router.js';
import quizSubmissionRouter from './modules/quiz-submission/quiz-submission.router.js';
import lessonSectionRouter from './modules/lessonSectionRouter/lessonSection.router.js';
import categoryRouter from './modules/categoryRouter/category.router.js';
import cartRouter from './modules/cartRouter/cart.router.js';
import cartCourseRouter from './modules/cartCourseRouter/cartCourse.router.js';
import topicRouter from './modules/topicRouter/topic.router.js';

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
    app.use("/question",questionRouter);
    app.use("/quiz",quizRouter);
    app.use("/lesson",lessonRouter);
    app.use("/copun",couponRouter);
    app.use("/submissions",quizSubmissionRouter);
    app.use("/sections",lessonSectionRouter);
    app.use("/category",categoryRouter);
    app.use("/cart",cartRouter);
    app.use("/cartcourse",cartCourseRouter);
    app.use("/topics",topicRouter);
    app.use("/applye",applyeRouter);
}
