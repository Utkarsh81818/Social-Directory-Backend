import profileService from './profile.service.js';
import httpStatus from "http-status";
import { logger } from "../../logger/logger.js";

class ProfileController {
    profile = async (req, res) => {
        try {
            const id = req.user.dataForToken.id;
            await profileService.profile(req.body, id);
            res.status(httpStatus.CREATED).json({
                message: "Profile was added successfully",
                success: true
            })
        } catch (error) {
            console.log(error.code);
            logger.error(error);
            return res.status(error.status || 500).json({ success: false, error: error, message: error.message || 'Something went wrong. Please try again later.' });
        }
    }

    searchInterest = async (req, res) => {
        try {
            const data = await profileService.search(req.body);
            res.status(httpStatus.OK).json({
                success: true,
                message: "Interest searched Successfully",
                data
            })
        } catch (error) {
            console.log(error);
            logger.error(error)
            return res.status(error.status || 500).json({ success: false, error: error, message: error.message || 'Something went wrong. Please try again later.' });
        }
    }
}

export default new ProfileController;