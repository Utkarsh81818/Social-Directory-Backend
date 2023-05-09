import Profile from "./profile.model.js";
import validation from '../validation/validation.js';
import httpStatus from "http-status";
import { logger } from "../../logger/logger.js";

class ProfileService {

    profile = async (body, id) => {
        const profileValidation = validation.profileValidation.validate(body);
        if (profileValidation.error) {
            logger.error("Wrong Input Validation");
            const error = new Error("Wrong Input Validation")
            error.status = httpStatus.UNPROCESSABLE_ENTITY;
            throw error;
        }
        const exist = await Profile.findOne({ userId: id });
        if (exist) {
            throw Object.assign(new Error("Profile already Exist"), { status: (httpStatus.CONFLICT) }, { success: false })
        }
        else {
            const userData = { userId: id, name: body.name, dob: body.dob, location: body.location, interests: body.interests }
            return Profile.create(userData);
        }
    }

    search = async (body) => {
        const searchValidation = validation.searchValidation.validate(body);
        if (searchValidation.error) {
            throw Object.assign(new Error("Wrong Input Validation"), { status: (httpStatus.UNPROCESSABLE_ENTITY) }, { success: false })
        }
        const data = await Profile.find({
            $or: [{ interests: { $regex: body.interests, $options: "i" } }],
        })
        if (!data.length) {
            throw Object.assign(new Error("Interest not found"), { status: (httpStatus.NOT_FOUND) }, { success: false })
        }
        else {
            return data;
        }
    }
}

export default new ProfileService;