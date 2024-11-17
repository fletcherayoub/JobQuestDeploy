import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import passport from './passport/passport.js'; // Adjust the path as needed
import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';
import { updateProfile } from './controllers/userController.js';
import { isAuthenticated } from './middlewares/auth.js';
import cron from './cron/cron.js';


const app = express();
dotenv.config({ path: "./config/config.env" });

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || "yourSecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

cron.start();

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// Configure CORS
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        credentials: true,
    })
);

// Other middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);
app.put('/api/v1/user/update', isAuthenticated, updateProfile);


// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
