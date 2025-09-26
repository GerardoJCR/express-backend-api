import { z } from "zod";

// Validación para REGISTER
export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }).min(3, { message: "Username must be at least 3 characters long" }),

    email: z.string({
        required_error: "Email is required"
    }).email({ message: "Invalid email format" }),

    password: z.string({
        required_error: "Password is required"
    }).min(6, { message: "Password must be at least 6 characters long" }),
});

// Validación para LOGIN
export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({ message: "Invalid email format" }),

    password: z.string({
        required_error: "Password is required"
    }).min(6, { message: "Password must be at least 6 characters long" }),
});
