import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import {sendToken} from "../utils/jwtToken.js"; 
import cloudinary from "cloudinary";
export const register = catchAsyncError(async(req, res, next)=>{
    const {name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("Please Enter all fields"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("mail already exists"));

    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password
    });
    sendToken(user, 200, res, "user registered successfully");
});



export const login = catchAsyncError(async(req, res, next) => { 
    const {email, password, role} = req.body;

    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide a valid email, password or role", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if (!user) {
        return next (new ErrorHandler("user not found", 404));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(
        new ErrorHandler("Please provide a valid password ", 401));
    }
    if (user.role !== role){
        return next(new ErrorHandler("user with this role does not exist", 400));
    }
    sendToken(user, 200, res, "user logged in successfully");
});

export const logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: new Date(0), // Expire immediately
    }).status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});


export const getUser = catchAsyncError(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
})

export const updateProfile = catchAsyncError(async (req, res, next) => {
    try {
        const { name, phone, password, newPassword } = req.body;
        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        // Update basic info
        if (name) user.name = name;
        if (phone) user.phone = phone;

        // Handle password update
        if (password && newPassword) {
            const isPasswordCorrect = await user.comparePassword(password);
            if (!isPasswordCorrect) {
                return next(new ErrorHandler("Current password is incorrect", 400));
            }
            user.password = newPassword;
        }

        // Handle profile picture upload
        if (req.files && req.files.profilePicture) {
            // Delete old image if exists
            if (user.profilePicture && user.profilePicture.public_id) {
                await cloudinary.v2.uploader.destroy(user.profilePicture.public_id);
            }

            // Upload new image
            const result = await cloudinary.v2.uploader.upload(req.files.profilePicture.tempFilePath, {
                folder: "profilePictures",
                width: 150,
                crop: "scale",
              });
              user.profilePicture = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        }

        await user.save();

        // Remove password from response
        const userToSend = user.toObject();
        delete userToSend.password;

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: userToSend
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});
