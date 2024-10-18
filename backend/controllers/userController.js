import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import {sendToken} from "../utils/jwtToken.js"; 

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

export const logout = catchAsyncError(async(req, res, next) => {
    res.status(201).cookie("token","", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "user logged out successfully",
    });
});

export const getUser = catchAsyncError(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
})