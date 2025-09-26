import { Router } from 'express'
import { login, register, logout, profile } from '../controllers/auth.controller.js'
import { authRquired } from '../middlewares/auth.middleware.js'
import { validateSchema } from "../middlewares/validator.middleware.js"
import { loginSchema, registerSchema } from "../schemas/auth.schema.js"

const router = Router();

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.post('/profile', authRquired, profile)


export default router