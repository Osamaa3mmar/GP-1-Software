import { connectDB } from '../DB/Connection.js';
import authRouter from './modules/authRouter/auth.router.js';
import userRouter from './modules/userRouter/user.router.js';
export const initApp=(app,express)=>{
    //here put use statment
    connectDB();
    app.use("/auth",authRouter);
    app.use('/user',userRouter)
}
