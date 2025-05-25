import express from 'express';
import cors from "cors";
import { initApp } from './src/index.router.js';
const app= express();
const port = 4545;
app.use(cors());
app.use(express.json());
initApp(app,express);



app.listen(port ,()=>{
    console.log("listening on port " + port);
})