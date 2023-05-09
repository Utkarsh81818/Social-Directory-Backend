import httpStatus from 'http-status';
import { logger } from '../../logger/logger.js';
import * as services from './contact.service.js'

export const addContact = async (req, res) => {
  try {
    const data = await services.addContact(req.user.dataForToken.id, req.params.profileId)
    res.status(httpStatus.CREATED).json({ message: "Contact details has been added successfully", data })
  } catch (error) {
    logger.error(error);
    res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, error, message: error.message || "Error occured in controller", });
  }
}
 