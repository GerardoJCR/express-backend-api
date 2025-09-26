export const validateSchema = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        })
    }

    // Si pasa la validación
    req.body = result.data
    next()
}