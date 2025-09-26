import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from '../config.js'

//Funcion para cerar el usario adminsitrador si no existe
export const createAdmin = async () => {
    try {
        //Verificar si ya eixiste un administrador
        const existingAdmin = await User.findOne(
            { role: "admin" }
        )
        if (existingAdmin) {
            console.log("Admin ya existe")
            return
        }

        //Hashear la contraseña 
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        //Crear el usuario administrador
        const adminUser = new User({
            username: ADMIN_USERNAME,
            email: ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin"
        })
        await adminUser.save()
        console.log("Admin creado con exito")

    } catch (error) {
        console.log("Error al crear el usuario administrador", error)
    }
}