import Joi from "joi";



export const signUpSchema=Joi.object({
    username:Joi.string().max(30).min(4).required(),
    password:Joi.string().min(8).required(),
    email:Joi.string().required(),
    profile:Joi.string(),
})