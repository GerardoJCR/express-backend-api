import { Router } from "express"
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js"
import { roleRequired } from "../middlewares/role.middleware.js"
import { authRquired } from "../middlewares/auth.middleware.js"




const router = Router();

//Solo el admin puede ver todos los usuarios
router.get("/users", authRquired, roleRequired("admin"), getUsers)

//Adming el propio user pueden ver su perfil
router.get("/user/:id", authRquired, getUserById)

//Admin o el propio user  pueden actualizar su info
router.put("/user/:id", authRquired, updateUser)

//Solo admin puede eliminar usuarios
router.delete("/user/:id", authRquired, roleRequired("admin"), deleteUser)

export default router

