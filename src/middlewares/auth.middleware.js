import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const authRquired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({
        message: "No token, unauthorized"
    })

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({
            message: "Invalided token"
        })
        req.user = decoded
        next()
    })
}