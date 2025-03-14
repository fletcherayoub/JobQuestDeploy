import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        validator: [validator.isEmail, "Please enter a valid email"],
        required: [true, "Please enter your email"]
        
    },
    coverLetter: {
        type: String,
        required: [true, "Please enter your application letter"]
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
    },
    address: {
        type: String,
        required: [true, "Please enter your adresse"],
    },
    resume: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    applicantID: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["Job Seeker"],
          required: true,
        },
      },
      employerID: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["Employer"],
          required: true,
        },
      },
      jobId: {
        type: mongoose.Schema.ObjectId,
        ref: "Job",
        required: true,
      }
});

export const Application = mongoose.model("Application", applicationSchema);