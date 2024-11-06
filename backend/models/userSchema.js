import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        //unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone: {
        
        type: String,
        // required: [true, "Please enter your phone number"],
    },
    password: {
        type: String,
        // required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than 8 characters"],
        maxLength: [32, "Password should be less than 32 characters"],
        select: false
    },
    profilePicture: {
        public_id: {
            type: String,
          },
          url: {
            type: String,
          },
      },
    role: {
        type: String,
        // required: [true, "Please enter your role"],
        enum: ["Job Seeker", "Employer"],
    },
    googleId: {
        type: String,
    },

    createdAt:{
        type: Date,
        default: Date.now,
    },
    
});


//Hashing password
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified and exists
    if (this.isModified("password") && this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

//COMPARING PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN FOR AUTHoRISATION

userSchema.methods.getJWTToken = function() {
    return jwt.sign({  id: this.id  }, process.env.JWT_SECRET_KEY, {
        expiresIn: 15 * 24 * 60 * 60,
    });
};


export const User = mongoose.model("User", userSchema);

export default User;
