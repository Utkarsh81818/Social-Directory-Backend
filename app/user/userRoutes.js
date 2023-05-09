import userController from './user.controller.js';
import express from 'express';
const userRoutes = express.Router()
    // Api for registration
    userRoutes.post('/signup', userController.register);
    // Api for login
    userRoutes.post('/signin', userController.login);

export default userRoutes;