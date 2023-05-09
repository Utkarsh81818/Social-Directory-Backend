import express from "express";
import user from '../user/userRoutes.js'
import profile from '../profile/profileRoutes.js'
import contact from '../contact/contactRoutes.js'

const router = express.Router()

const routes = () => {
  router.get('/', (req, res) => {
    res.send('Welcome to Social Directory Application')
  })
  router.use("/user", user)
  router.use("/profile", profile)
  router.use("/contact", contact)
  return router;
}

export default routes;