import { registerUserService } from "./user.service.js"

export const registerUser = async (req, res) => {
    const { user, otp } = await registerUserService(req.body);

    return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            otp
        }
    })
}