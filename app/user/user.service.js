import bcrypt from 'bcryptjs';
import User from './user.model.js'
import helper from '../utilities/helper.js'
import httpStatus from "http-status";
import validation from "../validation/validation.js";

class UserService {

    register = async (body) => {
        try {
            const registerValidation = validation.registerValidation.validate(body);
            if (registerValidation.error) {
                throw Object.assign(new Error("Wrong Input Validation"), { status: (httpStatus.UNPROCESSABLE_ENTITY) }, { success: false })
            }
            const userData = await User.findOne({ email: body.email });
            if (userData) {
                throw Object.assign(new Error("User already Exist"), { status: (httpStatus.CONFLICT) }, { success: false })
            }
            return User.create(body);         
        } catch (error) {
            throw error || Object.assign(new Error("Must be an error in service layer"), { status: (httpStatus.INTERNAL_SERVER_ERROR) }, { success: false })

        }
    }

    login = async (loginInfo) => {
        const loginValidation = validation.loginValidation.validate(loginInfo);
        if (loginValidation.error) {
            throw Object.assign(new Error("Wrong Input Validation"), { status: (httpStatus.UNPROCESSABLE_ENTITY) }, { success: false })
        }
        const data = await User.findOne({ email: loginInfo.email })
        if (!data) {
            throw Object.assign(new Error("Invalid Credential"), { status: (httpStatus.NOT_FOUND) }, { success: false })
        }
        else if (data) {
            const dataResult = await bcrypt.compare(loginInfo.password, data.password);
            if (dataResult) {
                const loginData = helper.token(data);
                if (!loginData) {
                    throw Object.assign(new Error("Invalid Credential"), { status: (httpStatus.BAD_REQUEST) }, { success: false })
                }
                return loginData;
            }
            else {
                throw Object.assign(new Error("Invalid credential! Please enter correct details"), { status: (httpStatus.BAD_REQUEST) }, { success: false })
            }
        }
    }
}

export default new UserService;
