import express from 'express';
import * as contactController from './contact.controller.js'
import helper from '../utilities/helper.js';

const contactRoutes = express.Router()
// Api for contact list
contactRoutes.put('/contact/:profileId', helper.auth, contactController.addContact)

export default contactRoutes;