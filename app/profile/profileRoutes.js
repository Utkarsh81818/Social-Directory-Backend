import express from 'express';
import profileController from './profile.controller.js';
import helper from '../utilities/helper.js';

const profileRoutes = express.Router();
// Api for adding Profile
profileRoutes.post('/profile', helper.auth, profileController.profile)
// Api for adding Profile
profileRoutes.post('/search', helper.auth, profileController.searchInterest)

export default profileRoutes;
