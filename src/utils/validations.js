import * as Joi from '@hapi/joi';

/*=======================VALIDATION SCHEMAS==================================*/
const loginValidationSchema = Joi.object({
    username: Joi.string().email({ tlds: {allow: false} }).required().min(6),
    password: Joi.string().required().min(6)
});

/*======================VALIDATION MODULES==================================*/
export const validateLogin = (data) => {
    
    let res = loginValidationSchema.validate(data)

    return res;

};
