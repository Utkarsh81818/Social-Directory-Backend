import { logger } from "../../logger/logger.js";
import httpStatus from "http-status";
import userService from "./user.service.js"

class Controller {
    register = async (req, res) => {
        try {
            const data = await userService.register(req.body);
            res.status(httpStatus.CREATED).json({
                message: 'User registered Successfully',
                success: true,
                data: data
            })
        } catch (error) {
            logger.error(error);
            return res.status(error.status || 500).json({ success: false, error: error, message: error.message || 'Something went wrong. Please try again later.' });
        }
    }

    login = async (req, res) => {
        const loginInfo = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const loginData = await userService.login(loginInfo);
            res.status(httpStatus.OK).json({
                message: "User login successfully",
                data: loginData
            })
        } catch (error) {
            logger.error(error);
            return res.status(error.status || 500).json({ success: false, message: error.message || 'Something went wrong. Please try again later.' });
        }
    }
}

export default new Controller;