import Joi from "joi";



export const signUpSchema=Joi.object({
    username:Joi.string().max(30).min(4).required(),
    password:Joi.string().min(8).required(),
    email:Joi.string().required(),
    profile:Joi.string(),
})


export const userTypeSchema=Joi.object({
    answer:Joi.string().valid('user', 'owner', 'tech').required(),
    id:Joi.number().required(),
})


export const loginSchema=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().min(8).required(),
});