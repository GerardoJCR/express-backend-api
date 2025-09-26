import User from "../models/user.model.js"

//Obtener  todos los usuarios (solo admin)

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json(users)


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//Obtener un usuario por ID 
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.json(user)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { username, email, role } = req.body

        // 🔒 Restricción: solo admin o el propio usuario
        if (req.user.role !== "admin" && req.user.id !== req.params.id) {
            return res.status(403).json({
                message: "Forbidden: you cannot update this user"
            });
        }

        // ⚠️ Si no es admin, no permitir que cambie el role
        const updateData = req.user.role === "admin"
            ? { username, email, role }
            : { username, email };

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select("-password");

        if (!updateUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.json(updateUser)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Eliminar Usario
export const deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.json({
            message: "User deleted succesfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}