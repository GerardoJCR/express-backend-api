import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { createdAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        //Validaciones basicas
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        //Verificar si ya existe el usuario
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        //Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        //Crear usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()

        //Crear token
        const token = await createdAccessToken({ id: newUser._id });
        res.cookie('token', token)

        res.status(201).json({
            message: "User registered succesfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si envió datos
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required"
            });
        }

        // Buscar Usuario
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // 👈 Incluir también el rol en el token
        const token = await createdAccessToken({
            id: userFound._id,
            role: userFound.role
        });

        // Guardar cookie con el token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.IS_PRODUCTION === "true",
            sameSite: "strict"
        });

        res.json({
            message: "Login successfully",
            user: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                role: userFound.role,   // 👈 también lo devolvemos
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};