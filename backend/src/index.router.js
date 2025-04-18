import { connectDB } from '../DB/Connection.js';
import authRouter from './modules/authRouter/auth.router.js';
import userRouter from './modules/userRouter/user.router.js';
import courseRouter from './modules/courseRouter/course.router.js';
import orgRouter from './modules/OrgRouter/org.router.js';
import enrollRouter from './modules/EnrollmentsRouter/Enrollments.router.js';
import aiRouter from './modules/Ai/ai.router.js';
export const initApp=(app,express)=>{
    //here put use statment
    connectDB();
    app.use("/auth",authRouter);
    app.use('/user',userRouter);
    app.use('/course',courseRouter);
    app.use("/org",orgRouter);
    app.use("/enrollments",enrollRouter);
    app.use("/ai",aiRouter);
}
