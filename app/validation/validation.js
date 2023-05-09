import Joi from 'joi';

class Validation {
    registerValidation = Joi.object({
        email: Joi.string()
            .pattern(new RegExp(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/))
            .required(),

        password: Joi.string()
            .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/))
            .required(),

        phoneNo: Joi.string()
            .pattern(/^(\+91[\-]?)?[0]?(91)?[789]\d{9}$/)
            .required()
    });

    loginValidation = Joi.object({
        email: Joi.string()
        .pattern(new RegExp(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/))
            .required(),

        password: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/))
            .required()
    })

    profileValidation = Joi.object({
        name: Joi.string()
            // .pattern(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/)
            .required(),

        dob: Joi.string()
            // .pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
            .required(),

        interests: Joi.array()
            // .items(Joi.string().pattern(/^"[^"\\]*(?:\\.[^"\\]*)*"|[^,]+|(?<=^|,)(?=$|,)‌$/))
            .required(),

        location: Joi.string()
            // .pattern(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/)
            .required()
    })

    searchValidation = Joi.object({
        interests: Joi.array()
            .required(),
    })

    contactValidation = Joi.object({
        email: Joi.string()
        .pattern(new RegExp(/^[0-9a-zA-Z]+([._+-][0-9a-zA-Z]+)*@([0-9a-zA-Z][-]?)+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$/))
            .required(),
        name: Joi.string()
            .required(),
        phoneNo: Joi.string()
            .pattern(/^(\+91[\-]?)?[0]?(91)?[789]\d{9}$/)
            .required()

    })

    searchValidation = Joi.object({
        interests: Joi.string()
            .required()
    })
}

export default new Validation();
