import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
      type: String,
        required: [true, "Please enter a job title"],
        maxLength: [50, "Title cannot exceed 50 characters"],
        minLength: [3, "Title should have more than 3 characters"],
    },
    description: {
        type: String,
        required: [true, "Please enter a job description"],
        maxLength: [1000, "Description cannot exceed 1000 characters"],
        minLength: [3, "Description should have more than 3 characters"],
    },
    category:{
        type: String,
        required: [true, "Job category is required"],
    },
    country: {
        type: String,
        required: [true, "Please select a country"],
      },
      city: {
        type: String,
        required: [true, "Please select a city"],
      },
      location: {
        type: String,
        required: [true, "Please select a location"],
        minLength: [20, "Location must contian at least 20 characters!"],
      },
      fixedSalary: {
        type: Number,
        minLength: [3, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
      salaryFrom: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [12, "Salary cannot exceed 9 digits"],
      },
      salaryTo: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
      expired: {
        type: Boolean,
        default: false,
      },
      jobPostedOn: {
        type: Date,
        default: Date.now,
      },
      postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      companyLogo: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    });
    
export const Job = mongoose.model("Job", jobSchema);